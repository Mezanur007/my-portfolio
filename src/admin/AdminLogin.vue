<template>
  <div class="admin-auth">
    <div class="login-card">
      <div class="login-logo">MARUF</div>
      <div class="login-sub">// ADMIN PORTAL</div>

      <label class="login-label">Email</label>
      <input
        v-model="email"
        type="email"
        class="login-input"
        placeholder="admin@example.com"
        autocomplete="email"
        @keydown.enter="submit"
      />

      <label class="login-label">Password</label>
      <input
        v-model="password"
        type="password"
        class="login-input"
        placeholder="••••••••"
        autocomplete="current-password"
        @keydown.enter="submit"
      />

      <div v-if="error" class="login-error">{{ error }}</div>

      <button class="login-btn" :disabled="loading || !email || !password" @click="submit">
        {{ loading ? 'SIGNING IN...' : 'SIGN IN' }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({ loginFn: Function })

const email = ref('')
const password = ref('')
const loading = ref(false)
const error = ref('')

async function submit() {
  if (!email.value || !password.value) return
  loading.value = true
  error.value = ''
  try {
    await props.loginFn(email.value, password.value)
  } catch (e) {
    error.value = e.code === 'auth/invalid-credential'
      ? 'Invalid email or password.'
      : e.message || 'Login failed.'
  } finally {
    loading.value = false
  }
}
</script>
