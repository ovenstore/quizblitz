# Phase 1

## Milestone 2

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

## Milestone 3

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

## Milestone 4

#### Prompt: 

Using this template, add 10 sample questions:

```JS
data() {
  return {
    questions: [], // you will fill this with your 10 questions
    currentIndex: 0,
    score: 0,
    gameState: "start" // "start" | "playing" | "end"
  }
}
```

#### Response: 

```JS
data() {
  return {
    questions: [
      {
        question: 'What is 2 + 2?',
        answers: ['1', '2', '3', '4'],
        correct: 3
      },
      {
        question: 'Capital of France?',
        answers: ['Paris', 'London', 'Rome', 'Berlin'],
        correct: 0
      },
      {
        question: 'Vue.js is a ___ framework?',
        answers: ['Backend', 'Frontend', 'Database', 'Operating System'],
        correct: 1
      },
      {
        question: 'Which planet is known as the Red Planet?',
        answers: ['Earth', 'Mars', 'Jupiter', 'Venus'],
        correct: 1
      },
      {
        question: 'Who wrote "Romeo and Juliet"?',
        answers: ['Charles Dickens', 'William Shakespeare', 'Jane Austen', 'Mark Twain'],
        correct: 1
      },
      {
        question: 'What is the largest ocean on Earth?',
        answers: ['Atlantic', 'Indian', 'Arctic', 'Pacific'],
        correct: 3
      },
      {
        question: 'What is the chemical symbol for water?',
        answers: ['O2', 'H2O', 'CO2', 'HO2'],
        correct: 1
      },
      {
        question: 'Which country hosted the 2016 Summer Olympics?',
        answers: ['China', 'Brazil', 'UK', 'Russia'],
        correct: 1
      },
      {
        question: 'What is the square root of 64?',
        answers: ['6', '7', '8', '9'],
        correct: 2
      },
      {
        question: 'Which gas do plants absorb from the atmosphere?',
        answers: ['Oxygen', 'Carbon Dioxide', 'Nitrogen', 'Hydrogen'],
        correct: 1
      }
    ],
    currentIndex: 0,
    score: 0,
    gameState: "start" // "start" | "playing" | "end"
  }
}
```

#### Prompt: 

Implement the following methods and tell me where to put them in the `App.vue` file:

- `startGame()` — sets `gameState` to `"playing"` and resets `currentIndex` and `score` to `0`.

- `handleAnswer(isCorrect)` — increments `score` if `isCorrect` is `true`, then increments `currentIndex`. If `currentIndex` equals `questions.length`, set `gameState` to `"end"`.

- `resetGame()` — sets `gameState` back to `"start"`.

#### Response:

```JS
methods: {
    startGame() {
      this.gameState = 'playing';
      this.currentIndex = 0;
      this.score = 0;
    },

    handleAnswer(isCorrect) {
      if (isCorrect) {
        this.score++;
      }

      this.currentIndex++;

      if (this.currentIndex >= this.questions.length) {
        this.gameState = 'end';
      }
    },

    resetGame() {
      this.gameState = 'start';
    }
  }
```

## Stretch Goal

#### Prompt: 

How can I add a visual indicator of "Question x of 10" below the question card?
