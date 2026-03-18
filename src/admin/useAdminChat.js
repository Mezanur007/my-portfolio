import { ref, onUnmounted } from 'vue'
import {
  signInWithEmailAndPassword, signOut, onAuthStateChanged
} from 'firebase/auth'
import {
  collection, onSnapshot, query, orderBy,
  addDoc, serverTimestamp, updateDoc, doc
} from 'firebase/firestore'
import { db, auth } from '../firebase.js'

export function useAdminChat() {
  const user = ref(null)
  const authLoading = ref(true)
  const conversations = ref([])
  const activeSessionId = ref(null)
  const messages = ref([])
  const visitorTyping = ref(false)

  let unsubConversations = null
  let unsubMessages = null
  let unsubSession = null

  // Auth state listener
  const unsubAuth = onAuthStateChanged(auth, u => {
    user.value = u
    authLoading.value = false
    if (u) startConversationsListener()
    else stopConversationsListener()
  })

  async function login(email, password) {
    await signInWithEmailAndPassword(auth, email, password)
  }

  async function logout() {
    await signOut(auth)
    activeSessionId.value = null
    messages.value = []
    conversations.value = []
  }

  function startConversationsListener() {
    const q = query(collection(db, 'conversations'), orderBy('lastMessageAt', 'desc'))
    unsubConversations = onSnapshot(q, snap => {
      conversations.value = snap.docs.map(d => ({ id: d.id, ...d.data() }))
    })
  }

  function stopConversationsListener() {
    if (unsubConversations) { unsubConversations(); unsubConversations = null }
  }

  function selectConversation(sessionId) {
    if (unsubMessages) { unsubMessages(); unsubMessages = null }
    if (unsubSession) { unsubSession(); unsubSession = null }

    activeSessionId.value = sessionId

    const messagesRef = collection(db, 'conversations', sessionId, 'messages')
    const q = query(messagesRef, orderBy('sentAt', 'asc'))
    unsubMessages = onSnapshot(q, snap => {
      messages.value = snap.docs.map(d => ({ id: d.id, ...d.data() }))
    })

    const sessionRef = doc(db, 'conversations', sessionId)
    unsubSession = onSnapshot(sessionRef, snap => {
      const data = snap.data()
      if (data) visitorTyping.value = data.visitorTyping || false
    })

    // Mark as read
    updateDoc(sessionRef, { unreadByAdmin: 0 })
  }

  async function sendReply(text) {
    if (!activeSessionId.value || !text.trim()) return
    const messagesRef = collection(db, 'conversations', activeSessionId.value, 'messages')
    await addDoc(messagesRef, {
      text: text.trim(),
      sender: 'admin',
      sentAt: serverTimestamp(),
      read: false,
    })
    const sessionRef = doc(db, 'conversations', activeSessionId.value)
    await updateDoc(sessionRef, {
      lastMessage: text.trim(),
      lastMessageAt: serverTimestamp(),
      adminTyping: false,
    })
  }

  let adminTypingTimer = null
  function onAdminTyping() {
    if (!activeSessionId.value) return
    const sessionRef = doc(db, 'conversations', activeSessionId.value)
    updateDoc(sessionRef, { adminTyping: true })
    clearTimeout(adminTypingTimer)
    adminTypingTimer = setTimeout(() => {
      updateDoc(sessionRef, { adminTyping: false })
    }, 1500)
  }

  onUnmounted(() => {
    unsubAuth()
    stopConversationsListener()
    if (unsubMessages) unsubMessages()
    if (unsubSession) unsubSession()
  })

  return {
    user,
    authLoading,
    conversations,
    activeSessionId,
    messages,
    visitorTyping,
    login,
    logout,
    selectConversation,
    sendReply,
    onAdminTyping,
  }
}
