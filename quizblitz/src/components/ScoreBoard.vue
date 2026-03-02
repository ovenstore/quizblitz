<template>
    <div>
        <h1>Game Over</h1>
        <p>Your score: {{ score }}/10</p>
        <button @click="restartGame">Play Again</button>
    </div>
</template>

<script>
    export default {
        name: 'ScoreBoard',
        props: {
            score: {
                type: Number,
                required: true
            }
        },
        methods: {
            restartGame() {
                this.$emit('restart');
            }
        }
    }
</script>