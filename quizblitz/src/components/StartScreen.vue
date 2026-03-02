<template>
  <div>
    <h1>QuizBlitz</h1>
    <p>Test your knowledge and challenge your friends!</p>
    <button @click="startGame">Play</button>
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