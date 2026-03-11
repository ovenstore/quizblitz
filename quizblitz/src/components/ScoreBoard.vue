<template>
    <div>
        <h1>Game Over</h1>
        <p>You scored {{ score }} out of {{ total }}</p>
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
            },
            total: {
                type: Number,
                default: 10
            }
        },
        methods: {
            restartGame() {
                this.$emit('restart');
            }
        }
    }
</script>