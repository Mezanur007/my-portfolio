<template>
  <section id="play-zone">
    <div class="inner">
      <div class="play-center reveal">
        <div class="play-label">// MINI GAME UNLOCKED</div>
        <button class="play-btn" @click="$emit('open-game')">
          <svg viewBox="0 0 24 24"><polygon points="5,3 19,12 5,21"/></svg>
        </button>
        <div class="play-title">PLAY TIC-TAC-TOE</div>
        <div class="play-sub">Challenge a friend or battle the AI</div>
      </div>
    </div>
  </section>
</template>

<script setup>
defineEmits(['open-game'])
</script>
