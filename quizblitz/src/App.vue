<template>
  <div id="app">
    <nav class="navbar">
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/leaderboard">Leaderboard</RouterLink>
      <RouterLink v-if="!store.token" to="/login" class="btn-secondary">Login</RouterLink>
      <RouterLink v-if="!store.token" to="/register" class="btn-primary">Register</RouterLink>
      <span v-if="store.token" class="user-info">{{ store.userEmail }}</span>
    </nav>
    <RouterView />
  </div>
</template>

<script>
import { useGameStore } from './stores/gameStore.js'

export default {
  name: 'App',

  setup() {
    const store = useGameStore()
    return { store }
  }
}
</script>


<style scoped>
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background: rgba(20, 20, 30, 0.8);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 100;
  box-sizing: border-box;
}

.nav-left,
.nav-right {
  display: flex;
  gap: 1rem;
  align-items: center;
}

a {
  color: var(--text);
  text-decoration: none;
  transition: color 0.2s ease;
  padding: 0.5rem 1rem;
  border-radius: 6px;
}

a:hover {
  color: var(--primary);
}

a.btn-primary {
  background: var(--primary);
  color: #000;
  font-weight: 600;
}

a.btn-primary:hover {
  opacity: 0.9;
}

a.btn-secondary {
  background: transparent;
  color: var(--text);
  border: 1px solid rgba(255, 255, 255, 0.3);
  font-weight: 600;
}

a.btn-secondary:hover {
  border-color: rgba(255, 255, 255, 0.6);
  background: rgba(255, 255, 255, 0.05);
}

.user-info {
  color: var(--success);
  font-weight: 600;
}
</style>