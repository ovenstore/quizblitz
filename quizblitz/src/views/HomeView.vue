<template>
  <div>
    <h1>QuizBlitz</h1>
    <p>Test your knowledge and challenge your friends!</p>
    <button @click="startGame">Play</button>
  </div>
</template>

<script>
    import { useGameStore } from '../stores/gameStore.js'

    export default {
        name: 'HomeView',

        setup() {
            return { store: useGameStore() }
        },

        methods: {
            startGame() {
            this.store.startGame()
            this.$router.push({ name: 'play' })
            }
        }
    }
</script>

