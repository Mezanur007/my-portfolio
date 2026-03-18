<template>
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
          <div
            v-for="msg in messages"
            :key="msg.id"
            class="chat-msg"
            :class="msg.sender === 'bot' ? 'bot' : msg.sender"
          >
            <div class="chat-bubble">{{ msg.text }}</div>
            <span v-if="msg.sender === 'bot'" class="chat-bot-label">🤖 Bot</span>
            <span class="chat-time">{{ formatTime(msg.sentAt) }}</span>
          </div>
          <!-- Typing indicator -->
          <div v-if="adminTyping" class="chat-msg admin">
            <div class="chat-bubble" style="padding:6px 10px">
              <div class="typing-indicator">
                <span></span><span></span><span></span>
              </div>
            </div>
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
import { ref, watch, nextTick, computed } from 'vue'
import { useChatSession } from './useChatSession.js'
import './chat.css'

const { sessionId, messages, adminTyping, isOpen, initSession, sendMessage: doSend, onTyping } = useChatSession()

const nameInput = ref('')
const inputText = ref('')
const messagesEl = ref(null)
const sessionStarted = ref(false)

const unreadCount = computed(() => {
  return messages.value.filter(m => m.sender === 'admin' && !m.read).length
})

function togglePanel() {
  isOpen.value = !isOpen.value
}

function startChat() {
  if (!nameInput.value.trim()) return
  initSession(nameInput.value.trim())
  sessionStarted.value = true
}

async function sendMessage() {
  if (!inputText.value.trim()) return
  const text = inputText.value
  inputText.value = ''
  await doSend(text)
}

function formatTime(ts) {
  if (!ts) return ''
  const d = ts.toDate ? ts.toDate() : new Date(ts)
  return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}

watch(messages, async () => {
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
</style>
