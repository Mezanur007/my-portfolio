<template>
  <div class="conv-list">
    <div class="conv-list-header">CONVERSATIONS</div>
    <div v-if="conversations.length === 0" class="conv-empty">
      No conversations yet.<br/>Waiting for visitors...
    </div>
    <div
      v-for="conv in conversations"
      :key="conv.id"
      class="conv-item"
      :class="{ active: activeId === conv.id }"
      @click="$emit('select', conv.id)"
    >
      <div class="conv-item-main">
        <div class="conv-name">{{ conv.visitorName || 'Visitor' }}</div>
        <div class="conv-last">{{ conv.lastMessage || 'No messages yet' }}</div>
      </div>
      <div v-if="conv.unreadByAdmin > 0" class="conv-badge">{{ conv.unreadByAdmin }}</div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  conversations: { type: Array, default: () => [] },
  activeId: { type: String, default: null },
})
defineEmits(['select'])
</script>
