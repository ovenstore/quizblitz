<template>
    <div v-if="store.gameState === 'end'" class="score-board card">
        <h2>Game Over</h2>
        <p>You scored {{ store.score }} / {{ store.questions.length }}</p>

        <div v-if="store.token">
            <p>Playing as {{ store.userEmail }}</p>
            <button class="btn-success" v-if="!store.scoreSubmitted" @click="store.submitScore()">
            Submit Score
        </button>
        <p v-else>Score submitted ✓</p>
        </div>

        <div v-else>
            <p>
            <RouterLink to="/login">Log in</RouterLink> to save your score to the leaderboard.
            </p>
        </div>

        <button class="btn-secondary" @click="restartGame">Play Again</button>
    </div>
</template>

<script>
import { useGameStore } from '../stores/gameStore.js'
export default {
    name: 'ScoreBoard',
    props: {
        score: {
            type: Number,
            required: true
        },
        total: {
            type: Number,
            default: 10
        }
    },

    setup() {
        const store = useGameStore()
        return { store }
    },
    
    methods: {
        restartGame() {
            this.$emit('restart');
        }
    }
}
</script>

<style scoped>
h1 {
  font-size: 2rem;
  margin-bottom: 1rem;
}

p {
  color: #ccc;
  margin-bottom: 1rem;
}

input {
  padding: 0.6rem;
  border-radius: 6px;
  border: 1px solid #555;
  background: #222;
  color: white;
  margin-right: 0.5rem;
}

button {
  padding: 0.6rem 1rem;
  margin: 25px;
  border: none;
  border-radius: 6px;
  background: #4caf50;
  color: white;
  cursor: pointer;
}

button:hover {
  background: #43a047;
}
</style>