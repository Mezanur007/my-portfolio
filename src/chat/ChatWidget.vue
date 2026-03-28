<template>
  <!-- Popup Bubble -->
  <Transition name="bubble-pop">
    <div
      v-if="showBubble && !isOpen"
      class="chat-bubble-popup"
      @click="openFromBubble"
    >
      <p class="bubble-greeting">Hello 👋</p>
      <p class="bubble-msg">Do you have something in your mind to discuss?</p>
      <button class="bubble-dismiss" @click.stop="dismissBubble" aria-label="Dismiss">✕</button>
    </div>
  </Transition>

  <!-- FAB Button -->
  <button class="chat-fab" @click="togglePanel" aria-label="Open chat">
    <span v-if="!isOpen" class="chat-fab-emoji">🤙</span>
    <span v-else class="chat-fab-emoji">👋</span>
    <span v-if="!isOpen && unreadCount > 0" class="chat-unread">{{ unreadCount }}</span>
  </button>

  <!-- Chat Panel -->
  <Transition name="chat-panel-fade">
    <div v-if="isOpen" class="chat-panel">
      <!-- Header -->
      <div class="chat-header">
        <div class="chat-header-info">
          <div class="chat-avatar">M</div>
          <div class="chat-header-text">
            <h4>MEZANUR MARUF</h4>
            <p class="chat-status">
              <span class="chat-status-dot"></span>
              Online · Usually replies fast
            </p>
          </div>
        </div>
        <button class="chat-close" @click="togglePanel" aria-label="Close chat">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round">
            <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>
      </div>

      <!-- Name Gate -->
      <div v-if="!sessionStarted" class="chat-name-gate">
        <p>Hi there! What's your name so I know who I'm talking to?</p>
        <input
          v-model="nameInput"
          class="chat-name-input"
          placeholder="Your name..."
          maxlength="40"
          @keydown.enter="startChat"
        />
        <button class="chat-start-btn" :disabled="!nameInput.trim()" @click="startChat">
          START CHAT
        </button>
      </div>

      <!-- Messages -->
      <template v-else>
        <div class="chat-messages" ref="messagesEl">
          <template v-for="msg in messages" :key="msg.id">
            <div
              class="chat-msg"
              :class="msg.sender === 'bot' ? 'bot' : msg.sender"
            >
              <div class="chat-bubble" v-html="formatMsg(msg.text)"></div>
              <span v-if="msg.sender === 'bot'" class="chat-bot-label">🤖 Bot</span>
              <span class="chat-time">{{ formatTime(msg.sentAt) }}</span>
            </div>
            <div v-if="msg.sender === 'bot' && msg.quickReplies?.length" class="quick-replies">
              <button
                v-for="opt in msg.quickReplies"
                :key="opt"
                class="quick-reply-btn"
                @click="sendQuickReply(opt)"
              >{{ opt }}</button>
            </div>
            <div
              v-if="msg.type === 'date_picker' && !submittedPickers.has(msg.id)"
              class="date-picker-card"
            >
              <div class="dp-row">
                <label>Date</label>
                <input type="date" v-model="pickerDate" :min="todayStr" class="dp-input" />
              </div>
              <div class="dp-row">
                <label>Time</label>
                <input type="time" v-model="pickerTime" class="dp-input" />
              </div>
              <button
                class="dp-confirm-btn"
                :disabled="!pickerDate || !pickerTime"
                @click="confirmBooking(msg.id)"
              >Confirm Meeting</button>
            </div>
          </template>

          <!-- Typing indicator -->
          <div v-if="adminTyping || botTyping" class="chat-msg admin">
            <div class="chat-bubble" style="padding:6px 10px">
              <div class="typing-indicator"><span></span><span></span><span></span></div>
            </div>
            <span class="chat-bot-label">{{ botTyping ? '🤖 Bot' : '💬 Maruf' }}</span>
          </div>
        </div>

        <!-- Input -->
        <div class="chat-input-bar">
          <textarea
            v-model="inputText"
            class="chat-input"
            placeholder="Type a message..."
            rows="1"
            @input="onTyping"
            @keydown.enter.exact.prevent="sendMessage"
          ></textarea>
          <button class="chat-send" :disabled="!inputText.trim()" @click="sendMessage">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <line x1="22" y1="2" x2="11" y2="13"/>
              <polygon points="22 2 15 22 11 13 2 9 22 2"/>
            </svg>
          </button>
        </div>
      </template>
    </div>
  </Transition>
</template>

<script setup>
import { ref, watch, nextTick, computed, onMounted, onUnmounted } from 'vue'
import { useChatSession } from './useChatSession.js'
import './chat.css'

const { sessionId, messages, adminTyping, botTyping, isOpen, initSession, sendMessage: doSend, submitBooking, onTyping, greetVisitor } = useChatSession()

const submittedPickers = ref(new Set())
const pickerDate = ref('')
const pickerTime = ref('')
const todayStr = computed(() => new Date().toISOString().slice(0, 10))

const nameInput = ref('')
const inputText = ref('')
const messagesEl = ref(null)
const sessionStarted = ref(false)

const unreadCount = computed(() => {
  return messages.value.filter(m => m.sender === 'admin' && !m.read).length
})

// Popup bubble logic
const showBubble = ref(false)
let bubbleTimer = null

function scheduleBubble() {
  // Show for 5s, hide for 20s, repeat
  showBubble.value = true
  bubbleTimer = setTimeout(() => {
    showBubble.value = false
    bubbleTimer = setTimeout(scheduleBubble, 20000)
  }, 5000)
}

function dismissBubble() {
  showBubble.value = false
  clearTimeout(bubbleTimer)
  bubbleTimer = setTimeout(scheduleBubble, 20000)
}

function openFromBubble() {
  showBubble.value = false
  clearTimeout(bubbleTimer)
  isOpen.value = true
}

onMounted(() => {
  // First appearance after 1.5s
  bubbleTimer = setTimeout(scheduleBubble, 1500)
})

onUnmounted(() => clearTimeout(bubbleTimer))

function togglePanel() {
  isOpen.value = !isOpen.value
}

function startChat() {
  if (!nameInput.value.trim()) return
  initSession(nameInput.value.trim())
  sessionStarted.value = true
  greetVisitor()
}

async function sendMessage() {
  if (!inputText.value.trim()) return
  const text = inputText.value
  inputText.value = ''
  await doSend(text)
}

async function sendQuickReply(label) {
  inputText.value = ''
  await doSend(label)
}

async function confirmBooking(msgId) {
  if (!pickerDate.value || !pickerTime.value) return
  submittedPickers.value.add(msgId)
  submittedPickers.value = new Set(submittedPickers.value)
  await submitBooking(pickerDate.value, pickerTime.value)
  pickerDate.value = ''
  pickerTime.value = ''
}

function formatMsg(text) {
  if (!text) return ''
  // Escape HTML first
  let safe = text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
  // Phone numbers → WhatsApp link (formats: +966xxxxxxxxx, 05xxxxxxxx, etc.)
  safe = safe.replace(
    /(\+?\d[\d\s\-().]{7,}\d)/g,
    (match) => {
      const digits = match.replace(/\D/g, '')
      return `<a href="https://wa.me/${digits}" target="_blank" rel="noopener" class="chat-link chat-link-wa">${match}</a>`
    }
  )
  // URLs → clickable links
  safe = safe.replace(
    /(https?:\/\/[^\s<]+)/g,
    (url) => `<a href="${url}" target="_blank" rel="noopener" class="chat-link">${url}</a>`
  )
  return safe
}

function formatTime(ts) {
  if (!ts) return ''
  const d = ts.toDate ? ts.toDate() : new Date(ts)
  return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}

watch([messages, adminTyping, botTyping], async () => {
  await nextTick()
  if (messagesEl.value) {
    messagesEl.value.scrollTop = messagesEl.value.scrollHeight
  }
})
</script>

<style>
.chat-panel-fade-enter-active,
.chat-panel-fade-leave-active {
  transition: opacity .2s, transform .2s;
}
.chat-panel-fade-enter-from,
.chat-panel-fade-leave-to {
  opacity: 0;
  transform: translateY(12px) scale(.97);
}

/* Popup bubble */
.chat-bubble-popup {
  position: fixed;
  bottom: 90px;
  right: 24px;
  background: var(--bg);
  box-shadow: var(--neu-lg);
  border-radius: var(--r-md) var(--r-md) 0 var(--r-md);
  padding: 14px 36px 14px 16px;
  max-width: 230px;
  cursor: pointer;
  z-index: 999;
  border-left: 3px solid var(--primary);
}

/* Tail pointing to FAB */
.chat-bubble-popup::after {
  content: '';
  position: absolute;
  bottom: -10px;
  right: 20px;
  border-width: 10px 10px 0 0;
  border-style: solid;
  border-color: var(--bg) transparent transparent transparent;
  filter: drop-shadow(2px 2px 2px rgba(0,0,0,0.06));
}

.bubble-greeting {
  font-family: var(--orb);
  font-size: 0.78rem;
  font-weight: 700;
  color: var(--primary);
  margin: 0 0 5px;
  letter-spacing: 0.04em;
}

.bubble-msg {
  font-family: var(--sans);
  font-size: 0.8rem;
  color: var(--text);
  margin: 0;
  line-height: 1.45;
}

.bubble-dismiss {
  position: absolute;
  top: 8px;
  right: 8px;
  background: none;
  border: none;
  font-size: 0.65rem;
  color: var(--text-muted);
  cursor: pointer;
  padding: 2px 4px;
  line-height: 1;
  border-radius: 4px;
  transition: color 0.2s, background 0.2s;
}

.bubble-dismiss:hover {
  color: var(--text);
  background: rgba(var(--primary-rgb), 0.08);
}

/* Clickable links inside chat bubbles */
.chat-link {
  color: var(--primary);
  text-decoration: underline;
  text-underline-offset: 2px;
  word-break: break-all;
  transition: color 0.2s;
}
.chat-link:hover { color: var(--orange); }
.chat-link-wa { text-decoration: none; font-weight: 600; }
.chat-link-wa:hover { color: var(--green); }

/* Bubble animation */
.bubble-pop-enter-active {
  transition: opacity 0.35s ease, transform 0.35s cubic-bezier(.22,1,.36,1);
}
.bubble-pop-leave-active {
  transition: opacity 0.25s ease, transform 0.25s ease;
}
.bubble-pop-enter-from {
  opacity: 0;
  transform: translateY(12px) scale(0.92);
}
.bubble-pop-leave-to {
  opacity: 0;
  transform: translateY(8px) scale(0.95);
}
</style>
