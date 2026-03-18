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
            {{ visitorTyping ? 'typing...' : 'Active conversation' }}
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
          <div class="msg-bubble">{{ msg.text }}</div>
          <span class="msg-time">{{ formatTime(msg.sentAt) }}</span>
        </div>
        <div v-if="visitorTyping" class="visitor-typing">Visitor is typing...</div>
      </div>

      <div class="msg-input-bar">
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
import { ref, watch, nextTick, computed } from 'vue'

const props = defineProps({
  activeSessionId: { type: String, default: null },
  activeConv: { type: Object, default: null },
  messages: { type: Array, default: () => [] },
  visitorTyping: { type: Boolean, default: false },
})
const emit = defineEmits(['send', 'typing'])

const reply = ref('')
const listEl = ref(null)

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

watch(() => props.messages, async () => {
  await nextTick()
  if (listEl.value) listEl.value.scrollTop = listEl.value.scrollHeight
}, { deep: true })
</script>
