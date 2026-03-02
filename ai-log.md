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

#### Prompt: 

I'm building a Vue 3 quiz game using Vite and the Options API. Write a single-file component called QuestionCard. It receives one prop called question shaped like { question: String, answers: Array, correct: Number }. The template should display the question text and render four answer buttons using v-for. When a button is clicked: disable all buttons immediately, apply a green CSS class to the correct answer button and a red class to the clicked button if it was wrong, wait 1 second using setTimeout, then emit an event called 'answer' with the value true if the answer was correct or false if it was wrong. Reset the highlight state after emitting. Do not use TypeScript.

#### Response: 

```JS
<template>
  <div>
    <h2>{{ question.question }}</h2>
    <div>
      <button
        v-for="(answer, index) in question.answers"
        :key="index"
        :disabled="buttonsDisabled"
        :class="buttonClass(index)"
        @click="selectAnswer(index)"
      >
        {{ answer }}
      </button>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'QuestionCard',
    props: {
      question: {
        type: Object,
        required: true,
        validator(q) {
            return (
                typeof q.question === 'string' &&
                Array.isArray(q.answers) &&
                typeof q.correct === 'number'
            );
        }
      }
    },
    data() {
      return {
        buttonsDisabled: false,
        clickedIndex: null
      };
    },
    methods: {
      selectAnswer(index) {
        this.buttonsDisabled = true;
        this.clickedIndex = index;

        const isCorrect = index === this.question.correct;

        setTimeout(() => {
          this.$emit('answer', isCorrect);
          // Reset state for next question
          this.buttonsDisabled = false;
          this.clickedIndex = null;
        }, 1000);
      },

      buttonClass(index) {
        if (this.clickedIndex === null) return '';
        if (index === this.question.correct) return 'correct';
        if (index === this.clickedIndex && index !== this.question.correct)
          return 'wrong';
        return '';
      }
    }
  };
</script>

<style scoped>
    .correct {
        background-color: green;
        color: white;
    }
    .wrong {
        background-color: red;
        color: white;
    }
</style>
```

#### Prompt: 

Using what i just gave you, how can I quickly test whether it works using a hardcoded question example?

#### Response: 

Put the following into `App.vue`:

```JS
<template>
  <div id="app">
    <h1>QuizBlitz</h1>

    <!-- Hardcoded question for quick test -->
    <QuestionCard
      :question="sampleQuestion"
      @answer="handleAnswer"
    />
  </div>
</template>

<script>
  import QuestionCard from './components/QuestionCard.vue';

  export default {
    name: 'App',
    components: {
      QuestionCard
    },
    data() {
      return {
        sampleQuestion: {
          question: 'What is 2 + 2?',
          answers: ['1', '2', '3', '4'],
          correct: 3
        }
      };
    },
    methods: {
      handleAnswer(isCorrect) {
        alert(isCorrect ? 'Correct!' : 'Wrong!');
      }
    }
  };
</script>
```


