import { ref, onUnmounted } from 'vue'
import {
  doc, collection, addDoc, onSnapshot,
  serverTimestamp, updateDoc, query, orderBy, setDoc
} from 'firebase/firestore'
import { db } from '../firebase.js'

export function useChatSession() {
  const sessionId = ref(null)
  const messages = ref([])
  const adminTyping = ref(false)
  const visitorName = ref('')
  const isOpen = ref(false)
  const unsubMessages = ref(null)
  const unsubSession = ref(null)
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

  function autoReply(text) {
    const lower = text.toLowerCase()
    let reply = null

    if (/contact|number|mobile|whatsapp|phone/.test(lower)) {
      reply = 'You can reach Maruf directly at 📞 +966510609881 (also on WhatsApp).'
    } else if (/website|company|b-it|firm/.test(lower)) {
      reply = 'Sure! You can visit the company website here 👉 https://b-it.co'
    } else if (/available|availability|online|when|busy/.test(lower)) {
      reply = "Maruf isn't available right now but will be back soon! If it's urgent, feel free to call or WhatsApp 📲 +966510609881"
    } else if (/hi|hello|hey|morning|evening|afternoon|greetings|salam|howdy|sup/.test(lower)) {
      reply = "Hey there! 👋 Maruf will connect with you soon. If it's an emergency, reach out at 📞 +966510609881 (WhatsApp too)."
    }

    if (!reply) return

    setTimeout(async () => {
      const lastMsg = messages.value[messages.value.length - 1]
      if (lastMsg && lastMsg.sender !== 'visitor') return
      const messagesRef = collection(db, 'conversations', sessionId.value, 'messages')
      await addDoc(messagesRef, {
        text: reply,
        sender: 'bot',
        sentAt: serverTimestamp(),
        read: true,
      })
    }, 1500)
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
    visitorName,
    isOpen,
    initSession,
    sendMessage,
    onTyping,
    closeSession,
  }
}
