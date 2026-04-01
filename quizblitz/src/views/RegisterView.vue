<template>
  <div class="auth-container">
    <h1>Register</h1>

    <form @submit.prevent="handleRegister">
      <div class="form-group">
        <label>Email</label>
        <input v-model="email" type="email" required />
      </div>

      <div class="form-group">
        <label>Password</label>
        <input v-model="password" type="password" required />
      </div>

      <button type="submit" :disabled="loading">
        {{ loading ? "Creating account..." : "Register" }}
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

const handleRegister = async () => {
    error.value = null
    loading.value = true

    try {
        await store.register(email.value, password.value)

        // optional: auto-login after register
        await store.login(email.value, password.value)

        router.push('/')
    } catch (err) {
        error.value = err.message || 'Registration failed'
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