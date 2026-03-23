<template>
    <div>
        <h1>Game Over</h1>
        <p>You scored {{ score }} out of {{ total }}</p>
        <div v-if="!store.scoreSubmitted">
            <input
                v-model="store.playerName"
                placeholder="Enter your name"
            />
            <button @click="store.submitScore()">Submit Score</button>
        </div>
        <p v-else>Score submitted! ✓</p>
        <button @click="restartGame">Play Again</button>
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