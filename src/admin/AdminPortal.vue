<template>
  <div class="admin-portal">
    <header class="portal-header">
      <div>
        <div class="portal-logo">MARUF // ADMIN</div>
        <div class="portal-sub">CHAT PORTAL</div>
      </div>
      <button class="logout-btn" @click="$emit('logout')">SIGN OUT</button>
    </header>

    <div class="portal-body">
      <ConversationList
        :conversations="conversations"
        :active-id="activeSessionId"
        @select="onSelect"
        @delete-conv="onDeleteConv"
      />
      <MessagePane
        :active-session-id="activeSessionId"
        :active-conv="activeConv"
        :messages="messages"
        :visitor-typing="visitorTyping"
        @send="onSend"
        @typing="onAdminTyping"
        @delete="onDelete"
        @send-file="onSendFile"
      />
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import ConversationList from './ConversationList.vue'
import MessagePane from './MessagePane.vue'

const props = defineProps({
  conversations: { type: Array, default: () => [] },
  activeSessionId: { type: String, default: null },
  messages: { type: Array, default: () => [] },
  visitorTyping: { type: Boolean, default: false },
  selectFn: Function,
  sendFn: Function,
  typingFn: Function,
  deleteFn: Function,
  deleteConvFn: Function,
  sendFileFn: Function,
})
defineEmits(['logout'])

const activeConv = computed(() =>
  props.conversations.find(c => c.id === props.activeSessionId) || null
)

function onSelect(id) {
  props.selectFn(id)
}

function onSend(text) {
  props.sendFn(text)
}

function onAdminTyping() {
  props.typingFn()
}

function onDelete(messageId) {
  props.deleteFn(messageId)
}

function onDeleteConv(sessionId) {
  props.deleteConvFn(sessionId)
}

function onSendFile(file) {
  props.sendFileFn(file)
}
</script>
