import { ref, onUnmounted } from 'vue'
import {
  signInWithEmailAndPassword, signOut, onAuthStateChanged
} from 'firebase/auth'
import {
  collection, onSnapshot, query, orderBy,
  addDoc, serverTimestamp, updateDoc, doc, deleteDoc
} from 'firebase/firestore'
import { ref as storageRef, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import { db, auth, storage } from '../firebase.js'

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

  async function deleteMessage(messageId) {
    if (!activeSessionId.value) return
    const msgRef = doc(db, 'conversations', activeSessionId.value, 'messages', messageId)
    await deleteDoc(msgRef)
  }

  async function sendFile(file) {
    if (!activeSessionId.value || !file) return
    const path = `chat/${activeSessionId.value}/${Date.now()}_${file.name}`
    const fileRef = storageRef(storage, path)
    const uploadTask = uploadBytesResumable(fileRef, file)
    await new Promise((resolve, reject) => {
      uploadTask.on('state_changed', null, reject, resolve)
    })
    const fileUrl = await getDownloadURL(fileRef)
    let type = 'document'
    if (file.type.startsWith('image/')) type = 'image'
    else if (file.type.startsWith('video/')) type = 'video'
    const messagesRef = collection(db, 'conversations', activeSessionId.value, 'messages')
    await addDoc(messagesRef, {
      type,
      fileUrl,
      fileName: file.name,
      sender: 'admin',
      sentAt: serverTimestamp(),
      read: false,
    })
    const lastMessage = type === 'image' ? '[Image]' : type === 'video' ? '[Video]' : `[Document: ${file.name}]`
    const sessionRef = doc(db, 'conversations', activeSessionId.value)
    await updateDoc(sessionRef, {
      lastMessage,
      lastMessageAt: serverTimestamp(),
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
    deleteMessage,
    sendFile,
  }
}
