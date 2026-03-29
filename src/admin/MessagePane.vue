<template>
  <div class="msg-pane">
    <!-- Empty state -->
    <template v-if="!activeSessionId">
      <div class="msg-pane-empty">
        <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
        </svg>
        Select a conversation to start replying
      </div>
    </template>

    <!-- Active conversation -->
    <template v-else>
      <div class="msg-pane-header">
        <div class="msg-pane-avatar">{{ nameInitial }}</div>
        <div>
          <div class="msg-pane-name">{{ activeConv?.visitorName || 'Visitor' }}</div>
          <div class="msg-pane-sub">
            <template v-if="visitorTyping">typing...</template>
            <template v-else-if="activeConv?.visitorContact">📞 {{ activeConv.visitorContact }}</template>
            <template v-else>Active conversation</template>
          </div>
        </div>
      </div>

      <div class="msg-list" ref="listEl">
        <div
          v-for="msg in messages"
          :key="msg.id"
          class="msg-row"
          :class="msg.sender"
        >
          <div class="msg-bubble">
            <template v-if="msg.type === 'image'">
              <img :src="msg.fileUrl" :alt="msg.fileName" />
            </template>
            <template v-else-if="msg.type === 'video'">
              <video :src="msg.fileUrl" controls></video>
            </template>
            <template v-else-if="msg.type === 'document'">
              <a :href="msg.fileUrl" target="_blank" rel="noopener noreferrer">📄 {{ msg.fileName }}</a>
            </template>
            <template v-else-if="msg.type === 'booking_request'">
              <div class="booking-request-badge">
                📅 <strong>Meeting Request</strong><br>
                {{ msg.bookingDate }} at {{ msg.bookingTime }}
              </div>
            </template>
            <template v-else>{{ msg.text }}</template>
          </div>
          <span class="msg-time">{{ formatTime(msg.sentAt) }}</span>
          <button class="msg-delete-btn" title="Delete message" @click="$emit('delete', msg.id)">
            <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/>
            </svg>
          </button>
        </div>
        <div v-if="visitorTyping" class="visitor-typing">Visitor is typing...</div>
      </div>

      <!-- Emoji picker -->
      <div v-if="showEmojiPicker" class="emoji-picker-wrap" ref="pickerWrap">
        <em-emoji-picker ref="emojiPickerEl"></em-emoji-picker>
      </div>

      <div class="msg-input-bar">
        <button class="icon-btn emoji-btn" title="Emoji" @click="toggleEmojiPicker">😊</button>
        <button class="icon-btn attach-btn" title="Attach file" @click="triggerFileInput">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66L9.64 17.2a2 2 0 0 1-2.83-2.83l8.49-8.49"/>
          </svg>
        </button>
        <input
          type="file"
          ref="fileInput"
          accept="image/*,video/*,.pdf,.doc,.docx,.xlsx,.txt"
          style="display:none"
          @change="onFileSelected"
        />
        <textarea
          v-model="reply"
          class="msg-input"
          placeholder="Type a reply..."
          rows="1"
          @input="$emit('typing')"
          @keydown.enter.exact.prevent="send"
        ></textarea>
        <button class="msg-send-btn" :disabled="!reply.trim()" @click="send">
          SEND
        </button>
      </div>
    </template>
  </div>
</template>

<script setup>
import { ref, watch, nextTick, computed, onMounted, onUnmounted } from 'vue'
import data from '@emoji-mart/data'
import { init } from 'emoji-mart'
import 'emoji-mart'

const props = defineProps({
  activeSessionId: { type: String, default: null },
  activeConv: { type: Object, default: null },
  messages: { type: Array, default: () => [] },
  visitorTyping: { type: Boolean, default: false },
})
const emit = defineEmits(['send', 'typing', 'delete', 'send-file'])

const reply = ref('')
const listEl = ref(null)
const showEmojiPicker = ref(false)
const pickerWrap = ref(null)
const emojiPickerEl = ref(null)
const fileInput = ref(null)

const nameInitial = computed(() => {
  const name = props.activeConv?.visitorName || 'V'
  return name.charAt(0).toUpperCase()
})

function send() {
  if (!reply.value.trim()) return
  emit('send', reply.value)
  reply.value = ''
}

function formatTime(ts) {
  if (!ts) return ''
  const d = ts.toDate ? ts.toDate() : new Date(ts)
  return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}

function toggleEmojiPicker(e) {
  e.stopPropagation()
  showEmojiPicker.value = !showEmojiPicker.value
}

function onEmojiSelect(e) {
  const native = e.detail?.native || e.detail?.emoji?.native || ''
  if (native) reply.value += native
  showEmojiPicker.value = false
}

// Attach listener directly on the web component element — Vue's @event
// binding doesn't reliably capture CustomEvents from web components
watch(showEmojiPicker, async (val) => {
  if (!val) return
  await nextTick()
  if (emojiPickerEl.value) {
    emojiPickerEl.value.addEventListener('emoji-click', onEmojiSelect)
  }
})

function triggerFileInput() {
  fileInput.value?.click()
}

function onFileSelected(e) {
  const file = e.target.files?.[0]
  if (!file) return
  emit('send-file', file)
  e.target.value = ''
}

function onOutsideClick(e) {
  if (!showEmojiPicker.value) return
  if (pickerWrap.value && !pickerWrap.value.contains(e.target)) {
    showEmojiPicker.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', onOutsideClick, true)
  init({ data })
})

onUnmounted(() => {
  document.removeEventListener('click', onOutsideClick, true)
})

watch(() => props.messages, async () => {
  await nextTick()
  if (listEl.value) listEl.value.scrollTop = listEl.value.scrollHeight
}, { deep: true })
</script>
