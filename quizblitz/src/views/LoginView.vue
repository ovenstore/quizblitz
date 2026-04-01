<template>
  <div class="auth-container">
    <h1>Login</h1>

    <form @submit.prevent="handleLogin">
      <div class="form-group">
        <label>Email</label>
        <input v-model="email" type="email" required />
      </div>

      <div class="form-group">
        <label>Password</label>
        <input v-model="password" type="password" required />
      </div>

      <button type="submit" :disabled="loading">
        {{ loading ? "Logging in..." : "Login" }}
      </button>

      <p v-if="error" class="error">{{ error }}</p>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useGameStore } from '../stores/gameStore'

const router = useRouter()
const store = useGameStore()

const email = ref('')
const password = ref('')
const loading = ref(false)
const error = ref(null)

const handleLogin = async () => {
    error.value = null
    loading.value = true

    try {
        await store.login(email.value, password.value)
        router.push('/') // redirect after success
    } catch (err) {
        error.value = err.message || 'Login failed'
    } finally {
        loading.value = false
    }
}
</script>

<style scoped>
.auth-container {
  max-width: 400px;
  margin: 60px auto;
}

.form-group {
  margin-bottom: 1rem;
}

.error {
  color: red;
  margin-top: 10px;
}
</style>