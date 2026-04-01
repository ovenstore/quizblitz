<template>
  <div class="start-screen container card">
    <h1>QuizBlitz</h1>
    <p>Test your knowledge and challenge your friends!</p>
    <button class="btn-primary" @click="startGame">Play</button>
  </div>
</template>

<script>
    export default {
        name: 'StartScreen',
        methods: {
            startGame() {
                this.$emit('start');
            }
        }
    }
</script>

