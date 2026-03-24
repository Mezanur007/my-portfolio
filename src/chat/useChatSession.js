import { ref, onUnmounted } from 'vue'
import {
  doc, collection, addDoc, onSnapshot,
  serverTimestamp, updateDoc, query, orderBy, setDoc
} from 'firebase/firestore'
import { db } from '../firebase.js'
import { intents, followUpSets, leadCaptureSteps, leadTriggerPatterns } from './botKnowledge.js'

export function useChatSession() {
  const sessionId = ref(null)
  const messages = ref([])
  const adminTyping = ref(false)
  const botTyping = ref(false)
  const visitorName = ref('')
  const isOpen = ref(false)
  const unsubMessages = ref(null)
  const unsubSession = ref(null)
  const botState = ref({ flow: 'idle', step: 0, data: {} })
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
    autoReply(text.trim())
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

  function autoReply(text) {
    botTyping.value = true
    setTimeout(async () => {
      if (!shouldBotReply()) {
        botTyping.value = false
        return
      }

      // Continue lead capture flow
      if (botState.value.flow === 'lead_capture') {
        const currentStep = leadCaptureSteps[botState.value.step]
        botState.value.data[currentStep.field] = text
        const nextStep = botState.value.step + 1

        if (nextStep < leadCaptureSteps.length) {
          botState.value = { ...botState.value, step: nextStep }
          const next = leadCaptureSteps[nextStep]
          await sendBotMessage(next.question, next.quickReplies)
        } else {
          // Lead capture complete
          const leadData = { ...botState.value.data }
          botState.value = { flow: 'idle', step: 0, data: {} }
          await sendBotMessage(
            "Thank you! 🎉 I've captured all your project details. Maruf will review them and reach out to you very soon. If you'd like to speak directly, WhatsApp +966510609881 is always open."
          )
          if (sessionId.value) {
            await updateDoc(doc(db, 'conversations', sessionId.value), {
              leadData,
              isLead: true,
            })
          }
        }
        return
      }

      // Start lead capture if trigger detected
      if (isLeadIntent(text) && botState.value.flow === 'idle') {
        botState.value = { flow: 'lead_capture', step: 0, data: {} }
        const first = leadCaptureSteps[0]
        await sendBotMessage(
          "Great! Let me help you plan your project. I'll ask a few quick questions. 📋\n\n" + first.question,
          first.quickReplies
        )
        return
      }

      // Classify intent
      const intent = classifyIntent(text)
      if (intent) {
        await sendBotMessage(intent.answer, intent.quickReplies)
        return
      }

      // Single word — ask for clarification
      if (!text.includes(' ')) {
        await sendBotMessage(
          followUpSets.general.question,
          followUpSets.general.options
        )
        return
      }

      // No intent matched — send fallback
      await sendBotMessage(
        "I may need a little more detail to help properly. Please choose one of the options below.",
        followUpSets.general.options
      )
    }, 10000)
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
    onTyping,
    closeSession,
  }
}
