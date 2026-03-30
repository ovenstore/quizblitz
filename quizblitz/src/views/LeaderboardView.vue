<template>
  <div class="leaderboard">
    <h1>Leaderboard</h1>

    <p v-if="loading">Loading scores...</p>

    <p v-else-if="error">Could not load scores. Is the server running?</p>

    <ol v-else-if="scores.length > 0">
      <li v-for="entry in scores" :key="entry._id">
        <span class="name">{{ entry.playerName }}</span>
        <span class="score">{{ entry.score }} / {{ entry.totalQuestions }}</span>
      </li>
    </ol>

    <p v-else>No scores yet. Be the first to play!</p>

    <RouterLink to="/">← Back to home</RouterLink>
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
      const response = await fetch('http://localhost:3000/api/scores')
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
.name {
    padding-right: 20px;
}
</style>