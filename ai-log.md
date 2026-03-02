# Phase 1

#### Prompt: 

Write a Vue 3 single-file component called StartScreen. It should display a heading that says 'QuizBlitz', a short tagline, and a button labelled 'Play'. When the button is clicked, it emits an event called 'start'. Use the Options API (not Composition API). No props needed.

Don't do any styling

#### Response: 

```JS
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
```

#### Prompt: 

Write a Vue 3 single-file component called ScoreBoard. It receives a prop called score (Number). It displays a heading 'Game Over', the player's score out of 10, and a 'Play Again' button. When Play Again is clicked, it emits 'restart'. Use the Options API. Don't do any styling. 

#### Response: 

```JS
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
```