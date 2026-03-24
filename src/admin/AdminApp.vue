<template>
  <div>
    <template v-if="authLoading">
      <div style="min-height:100vh;display:flex;align-items:center;justify-content:center;color:rgba(255,255,255,.3);font-family:'Share Tech Mono',monospace;font-size:13px;">
        LOADING...
      </div>
    </template>
    <template v-else-if="!user">
      <AdminLogin :login-fn="login" />
    </template>
    <template v-else>
      <AdminPortal
        :conversations="conversations"
        :active-session-id="activeSessionId"
        :messages="messages"
        :visitor-typing="visitorTyping"
        :select-fn="selectConversation"
        :send-fn="sendReply"
        :typing-fn="onAdminTyping"
        :delete-fn="deleteMessage"
        :send-file-fn="sendFile"
        @logout="logout"
      />
    </template>
  </div>
</template>

<script setup>
import AdminLogin from './AdminLogin.vue'
import AdminPortal from './AdminPortal.vue'
import { useAdminChat } from './useAdminChat.js'
import './admin.css'

const {
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
} = useAdminChat()
</script>
