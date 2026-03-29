import { ref, onUnmounted } from 'vue'
import {
  doc, collection, addDoc, onSnapshot,
  serverTimestamp, updateDoc, query, orderBy, setDoc
} from 'firebase/firestore'
import { db } from '../firebase.js'
import {
  intents, flows, leadCaptureSteps, leadTriggerPatterns,
  finalConversionBlock, proTipMessage
} from './botKnowledge.js'

export function useChatSession() {
  const sessionId = ref(null)
  const messages = ref([])
  const adminTyping = ref(false)
  const botTyping = ref(false)
  const visitorName = ref('')
  const isOpen = ref(false)
  const unsubMessages = ref(null)
  const unsubSession = ref(null)
  const botState = ref({
    flow: 'idle',
    step: 0,
    data: {
      service: null,
      projectType: null,
      readiness: 'low',
      interactions: 0,
      pricingAskedCount: 0,
      proTipShown: false,
    },
  })
  let typingTimer = null

  function initSession(name) {
    visitorName.value = name
    let sid = sessionStorage.getItem('chat_session_id')
    if (!sid) {
      sid = crypto.randomUUID()
      sessionStorage.setItem('chat_session_id', sid)
    }
    sessionId.value = sid

    const sessionRef = doc(db, 'conversations', sid)
    setDoc(sessionRef, {
      visitorName: name,
      startedAt: serverTimestamp(),
      lastMessageAt: serverTimestamp(),
      lastMessage: '',
      unreadByAdmin: 0,
      visitorTyping: false,
      adminTyping: false,
      status: 'active',
    }, { merge: true })

    const messagesRef = collection(db, 'conversations', sid, 'messages')
    const q = query(messagesRef, orderBy('sentAt', 'asc'))
    unsubMessages.value = onSnapshot(q, snapshot => {
      messages.value = snapshot.docs.map(d => ({ id: d.id, ...d.data() }))
    })

    unsubSession.value = onSnapshot(sessionRef, snap => {
      const data = snap.data()
      if (data) adminTyping.value = data.adminTyping || false
    })
  }

  async function sendMessage(text) {
    if (!sessionId.value || !text.trim()) return
    const messagesRef = collection(db, 'conversations', sessionId.value, 'messages')
    await addDoc(messagesRef, {
      text: text.trim(),
      sender: 'visitor',
      sentAt: serverTimestamp(),
      read: false,
    })
    const sessionRef = doc(db, 'conversations', sessionId.value)
    await updateDoc(sessionRef, {
      lastMessage: text.trim(),
      lastMessageAt: serverTimestamp(),
      unreadByAdmin: messages.value.filter(m => m.sender === 'visitor' && !m.read).length + 1,
      visitorTyping: false,
    })

    // Update readiness based on quick-reply selections
    updateReadiness(text.trim())

    autoReply(text.trim())
  }

  function updateReadiness(text) {
    const lower = text.toLowerCase()
    const high = ['book a meeting', 'share my idea', 'share details first', 'yes, book a meeting', 'yes, book meeting']
    const medium = ['pricing', 'timeline', 'get pricing', 'get timeline', 'i need pricing', 'i want timeline']

    if (high.some(h => lower.includes(h))) {
      botState.value.data.readiness = 'high'
    } else if (medium.some(m => lower.includes(m))) {
      if (botState.value.data.readiness === 'low') botState.value.data.readiness = 'medium'
    } else if (botState.value.data.readiness === 'low') {
      botState.value.data.readiness = 'medium'
    }
  }

  function classifyIntent(text) {
    const lower = text.toLowerCase()
    for (const intent of intents) {
      if (intent.patterns.some(p => lower.includes(p))) return intent
    }
    return null
  }

  function isLeadIntent(text) {
    const lower = text.toLowerCase()
    return leadTriggerPatterns.some(p => lower.includes(p))
  }

  function shouldBotReply() {
    if (adminTyping.value) return false
    const msgs = messages.value
    for (let i = msgs.length - 1; i >= 0; i--) {
      if (msgs[i].sender === 'admin') {
        const ts = msgs[i].sentAt?.toDate?.() || new Date(msgs[i].sentAt)
        if (Date.now() - ts.getTime() < 5 * 60 * 1000) return false
        break
      }
    }
    return true
  }

  async function sendBotMessage(text, quickReplies) {
    if (!sessionId.value) return
    const messagesRef = collection(db, 'conversations', sessionId.value, 'messages')
    const payload = {
      text,
      sender: 'bot',
      sentAt: serverTimestamp(),
      read: true,
    }
    if (quickReplies && quickReplies.length) {
      payload.quickReplies = quickReplies
    }
    await addDoc(messagesRef, payload)
    botTyping.value = false
  }

  function getFlowSteps(flowName) {
    if (flowName === 'lead_capture') return leadCaptureSteps
    return flows[flowName] || []
  }

  async function submitContact(contact) {
    if (!sessionId.value || !contact.trim()) return
    await updateDoc(doc(db, 'conversations', sessionId.value), {
      visitorContact: contact.trim(),
    })
    const messagesRef = collection(db, 'conversations', sessionId.value, 'messages')
    await addDoc(messagesRef, {
      type: 'date_picker',
      text: 'Great! Now please select a date and time for your meeting.',
      sender: 'bot',
      sentAt: serverTimestamp(),
      read: true,
    })
  }

  async function submitBooking(date, time) {
    if (!sessionId.value || !date || !time) return
    const messagesRef = collection(db, 'conversations', sessionId.value, 'messages')
    await addDoc(messagesRef, {
      text: `Meeting request: ${date} at ${time}`,
      type: 'booking_request',
      bookingDate: date,
      bookingTime: time,
      sender: 'visitor',
      sentAt: serverTimestamp(),
      read: false,
    })
    await updateDoc(doc(db, 'conversations', sessionId.value), {
      bookingRequest: { date, time, requestedAt: serverTimestamp() },
      lastMessage: `Meeting request: ${date} at ${time}`,
      lastMessageAt: serverTimestamp(),
      unreadByAdmin: messages.value.filter(m => m.sender === 'visitor' && !m.read).length + 1,
    })
    await sendBotMessage(
      `Your meeting is requested for ${formatDateDisplay(date)} at ${time}. Maruf will confirm very soon! 📅`,
      ['Talk to human now', 'Share more details']
    )
  }

  function formatDateDisplay(dateStr) {
    return new Date(dateStr + 'T00:00:00').toLocaleDateString('en-US', {
      weekday: 'long', year: 'numeric', month: 'short', day: 'numeric'
    })
  }

  async function transitionFlow(flowName) {
    if (flowName === 'book_meeting') {
      const messagesRef = collection(db, 'conversations', sessionId.value, 'messages')
      await addDoc(messagesRef, {
        type: 'contact_capture',
        text: 'Please share your email or phone number so we can confirm your booking.',
        sender: 'bot',
        sentAt: serverTimestamp(),
        read: true,
      })
      botState.value = { ...botState.value, flow: 'idle' }
      return
    }
    if (flowName === 'talk_human') {
      await sendBotMessage(
        'Understood! Maruf will connect with you shortly. You can also reach him directly via WhatsApp 📲 +966510609881.',
        []
      )
      botState.value = { ...botState.value, flow: 'idle' }
      return
    }
    if (flowName === 'lead_capture') {
      botState.value = { ...botState.value, flow: 'lead_capture', step: 0 }
      const first = leadCaptureSteps[0]
      await sendBotMessage(first.question, first.quickReplies || [])
      return
    }
    const steps = getFlowSteps(flowName)
    if (!steps || !steps.length) return
    botState.value = { ...botState.value, flow: flowName, step: 0 }
    await sendBotMessage(steps[0].question, steps[0].quickReplies || [])
  }

  async function maybeShowProTip() {
    const d = botState.value.data
    if (d.interactions >= 2 && !d.proTipShown && d.readiness !== 'low') {
      botState.value.data.proTipShown = true
      setTimeout(async () => {
        await sendBotMessage(proTipMessage.text, proTipMessage.quickReplies)
      }, 2000)
    }
  }

  function autoReply(text) {
    botTyping.value = true
    setTimeout(async () => {
      if (!shouldBotReply()) {
        botTyping.value = false
        return
      }

      botState.value.data.interactions++

      const currentFlow = botState.value.flow

      // ── LEAD CAPTURE FLOW ──────────────────────────────────────────────────
      if (currentFlow === 'lead_capture') {
        const stepIndex = botState.value.step
        const currentStep = leadCaptureSteps[stepIndex]
        botState.value.data[currentStep.field] = text
        const nextIndex = stepIndex + 1

        if (nextIndex < leadCaptureSteps.length) {
          botState.value = { ...botState.value, step: nextIndex }
          const next = leadCaptureSteps[nextIndex]
          await sendBotMessage(next.question, next.quickReplies || [])
        } else {
          const leadData = { ...botState.value.data }
          botState.value = {
            flow: 'idle', step: 0,
            data: { ...botState.value.data, service: null, projectType: null },
          }
          await sendBotMessage(
            "Thank you! 🎉 Maruf will review your details and reach out very soon. You can also WhatsApp him directly at +966510609881.",
            ['Book a meeting', 'Talk to human now']
          )
          if (sessionId.value) {
            await updateDoc(doc(db, 'conversations', sessionId.value), {
              leadData,
              isLead: true,
            })
          }
        }
        await maybeShowProTip()
        return
      }

      // ── OTHER NAMED FLOWS ─────────────────────────────────────────────────
      if (currentFlow !== 'idle') {
        const steps = getFlowSteps(currentFlow)
        const stepIndex = botState.value.step
        const currentStep = steps[stepIndex]

        // Special rule: pricing "Advanced" → immediate meeting offer
        if (currentFlow === 'pricing' && text === 'Advanced') {
          botState.value = { ...botState.value, flow: 'idle' }
          await sendBotMessage(
            'Advanced projects need a tailored approach. I recommend booking a direct meeting with Maruf for a proper scoping session.',
            ['Book a meeting', 'Share my idea', 'Talk to human now']
          )
          await maybeShowProTip()
          return
        }

        // Check routes
        if (currentStep?.routes && currentStep.routes[text]) {
          await transitionFlow(currentStep.routes[text])
          await maybeShowProTip()
          return
        }

        // Advance linearly
        const nextIndex = stepIndex + 1
        if (nextIndex < steps.length) {
          botState.value = { ...botState.value, step: nextIndex }
          const next = steps[nextIndex]
          await sendBotMessage(next.question, next.quickReplies || [])
        } else {
          // End of flow — show conversion block
          botState.value = { ...botState.value, flow: 'idle' }
          await sendBotMessage(finalConversionBlock.text, finalConversionBlock.quickReplies)
        }
        await maybeShowProTip()
        return
      }

      // ── IDLE: CLASSIFY INTENT ─────────────────────────────────────────────
      const intent = classifyIntent(text)
      if (intent) {
        // Track pricing asks
        if (intent.id === 'pricing') {
          botState.value.data.pricingAskedCount++
          if (botState.value.data.pricingAskedCount >= 2) {
            await sendBotMessage(
              'I notice you are really focused on pricing — the best way to get accurate numbers is a quick meeting with Maruf.',
              ['Book a meeting', 'Share my idea', 'Talk to human now']
            )
            await maybeShowProTip()
            return
          }
        }

        // Send answer if present
        if (intent.answer) {
          await sendBotMessage(intent.answer, intent.quickReplies || [])
        }

        // Route to flow
        if (intent.flow) {
          if (intent.flow === 'book_meeting' || intent.flow === 'talk_human') {
            await transitionFlow(intent.flow)
          } else if (intent.flow === 'pricing' || intent.flow === 'timeline' || intent.flow === 'portfolio') {
            // Jump straight into these flows (no global_followup)
            await transitionFlow(intent.flow)
          } else {
            // Service intents → global_followup first
            botState.value = { ...botState.value, flow: 'global_followup', step: 0 }
            const gf = flows.global_followup[0]
            await sendBotMessage(gf.question, gf.quickReplies)
          }
        }

        await maybeShowProTip()
        return
      }

      // Lead trigger detected
      if (isLeadIntent(text)) {
        await transitionFlow('lead_capture')
        await maybeShowProTip()
        return
      }

      // Single word or no intent → confused flow
      await transitionFlow('confused')
      await maybeShowProTip()
    }, 10000)
  }

  function greetVisitor() {
    botTyping.value = true
    setTimeout(async () => {
      botTyping.value = false
      botState.value.data.interactions++
      await sendBotMessage(
        `Hello ${visitorName.value}! 👋 Welcome! I'm Maruf's assistant. How can I help you today?`,
        ['Services', 'Pricing', 'Timeline', 'Portfolio', 'Book a Meeting']
      )
    }, 1000)
  }

  function onTyping() {
    if (!sessionId.value) return
    const sessionRef = doc(db, 'conversations', sessionId.value)
    updateDoc(sessionRef, { visitorTyping: true })
    clearTimeout(typingTimer)
    typingTimer = setTimeout(() => {
      updateDoc(sessionRef, { visitorTyping: false })
    }, 1500)
  }

  function closeSession() {
    if (unsubMessages.value) unsubMessages.value()
    if (unsubSession.value) unsubSession.value()
  }

  onUnmounted(closeSession)

  return {
    sessionId,
    messages,
    adminTyping,
    botTyping,
    visitorName,
    isOpen,
    initSession,
    sendMessage,
    submitContact,
    submitBooking,
    onTyping,
    greetVisitor,
    closeSession,
  }
}
