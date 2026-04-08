<template>
  <div class="leaderboard container card">
    <h1>Leaderboard</h1>

    <p v-if="loading">Loading scores...</p>

    <p v-else-if="error">Could not load scores. Is the server running?</p>

    <ul v-else-if="scores.length > 0" class="leaderboard-list">
      <li v-for="entry in scores" :key="entry._id" class="leaderboard-row">
        <span class="rank">{{ entry.rank ?? (scores.indexOf(entry) + 1) }}</span>
        <span class="name">{{ entry.playerName }}</span>
        <span class="score">{{ entry.score }} / {{ entry.totalQuestions }}</span>
      </li>
    </ul>

    <p v-else>No scores yet. Be the first to play!</p>

    <RouterLink class="btn-secondary" to="/">← Back to home</RouterLink>
  </div>
</template>

<script>
export default {
  name: 'LeaderboardView',
  data() {
    return {
      scores: [],
      loading: true,
      error: false
    }
  },
  async mounted() {
    try {
      const response = await fetch('${import.meta.env.VITE_API_URL}/api/scores')
      if (!response.ok) throw new Error('Server error')
      this.scores = await response.json()
    } catch (err) {
      this.error = true
    } finally {
      this.loading = false
    }
  }
}
</script>

<style scoped>
.leaderboard {
  width: 100%;
  max-width: 760px;
  margin: 0 auto;
  text-align: left;
}

.leaderboard h1 {
  text-align: center;
  margin-bottom: 1rem;
  color: #f8fafc;
}

.leaderboard p {
  color: #cbd5e1;
  margin: 0.6rem 0;
}

.leaderboard-list {
  list-style: none;
  margin: 0.75rem 0 1.25rem;
  padding: 0;
  border-top: 1px solid rgba(148, 163, 184, 0.2);
}

.leaderboard-row {
  display: grid;
  grid-template-columns: 40px 1fr 110px;
  align-items: center;
  gap: 0.75rem;
  padding: 0.85rem 0;
  border-bottom: 1px solid rgba(148, 163, 184, 0.15);
}

.rank {
  font-weight: 700;
  color: #facc15;
  text-align: center;
}

.name {
  font-weight: 600;
  color: #e2e8f0;
}

.score {
  text-align: right;
  font-weight: 700;
  color: #38bdf8;
}

.btn-secondary {
  display: inline-block;
  margin-top: 1rem;
}
</style>