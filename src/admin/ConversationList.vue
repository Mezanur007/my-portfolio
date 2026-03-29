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
      <div class="conv-item-actions">
        <div v-if="conv.unreadByAdmin > 0" class="conv-badge">{{ conv.unreadByAdmin }}</div>
        <button
          class="conv-delete-btn"
          title="Delete conversation"
          @click.stop="$emit('delete-conv', conv.id)"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/>
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  conversations: { type: Array, default: () => [] },
  activeId: { type: String, default: null },
})
defineEmits(['select', 'delete-conv'])
</script>
