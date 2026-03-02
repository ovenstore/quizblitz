<template>
  <div id="app">
    <StartScreen v-if="gameState === 'start'" @start="startGame" />
    
    <QuestionCard
      v-else-if="gameState === 'playing'"
      :question="questions[currentIndex]"
      @answer="handleAnswer"
    />
    
    <ScoreBoard
      v-else
      :score="score"
      @restart="resetGame"
    />
  </div>
</template>

<script>
import StartScreen from './components/StartScreen.vue';
import QuestionCard from './components/QuestionCard.vue';
import ScoreBoard from './components/ScoreBoard.vue';

export default {
  name: 'App',
  components: {
    StartScreen,
    QuestionCard,
    ScoreBoard
  },

  data() {
    return {
      questions: [
        { question: 'What is 2 + 2?', answers: ['1','2','3','4'], correct: 3 },
        { question: 'Capital of France?', answers: ['Paris','London','Rome','Berlin'], correct: 0 },
        { question: 'Vue.js is a ___ framework?', answers: ['Backend','Frontend','Database','OS'], correct: 1 },
        { question: 'Which planet is known as the Red Planet?', answers: ['Earth','Mars','Jupiter','Venus'], correct: 1 },
        { question: 'Who wrote "Romeo and Juliet"?', answers: ['Charles Dickens','William Shakespeare','Jane Austen','Mark Twain'], correct: 1 },
        { question: 'What is the largest ocean on Earth?', answers: ['Atlantic','Indian','Arctic','Pacific'], correct: 3 },
        { question: 'What is the chemical symbol for water?', answers: ['O2','H2O','CO2','HO2'], correct: 1 },
        { question: 'Which country hosted the 2016 Summer Olympics?', answers: ['China','Brazil','UK','Russia'], correct: 1 },
        { question: 'What is the square root of 64?', answers: ['6','7','8','9'], correct: 2 },
        { question: 'Which gas do plants absorb from the atmosphere?', answers: ['Oxygen','Carbon Dioxide','Nitrogen','Hydrogen'], correct: 1 }
      ],
      currentIndex: 0,
      score: 0,
      gameState: 'start' // "start" | "playing" | "end"
    };
  },

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
};
</script>