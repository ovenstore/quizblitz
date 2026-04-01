<template>
  <div class="play-view container card">

    <!-- Timer bar -->
    <div class="timer-bar">
      <div
        class="timer-fill"
        :style="{ width: timerPercent + '%' }"
        :class="{ urgent: store.timeLeft <= 5 }"
      ></div>
    </div>

    <!-- Progress indicator -->
    <p class="progress">
      Question {{ store.progress.current }} of {{ store.progress.total }}
    </p>

    <!-- Streak indicator -->
    <p v-if="store.streak >= 3" class="streak">
  🔥 {{ store.streak }} in a row!
    </p>

    <!-- Question -->
    <QuestionCard
      v-if="store.gameState === 'playing' && store.currentQuestion"
      :question="store.currentQuestion"
      :selectedAnswer="store.selectedAnswer"
      @answer="store.submitAnswer"
    />

    <!-- Score screen -->
    <ScoreBoard
      v-else-if="store.gameState === 'end'"
      :score="store.score"
      :total="store.questions.length"
      @restart="handleRestart"
    />
  </div>
</template>

<script>
import { useGameStore } from '../stores/gameStore.js'
import QuestionCard from '../components/QuestionCard.vue'
import ScoreBoard from '../components/ScoreBoard.vue'

export default {
  name: 'PlayView',
  components: { QuestionCard, ScoreBoard },

  setup() {
    const store = useGameStore()
    return { store }
  },

  computed: {
    timerPercent() {
      return (this.store.timeLeft / 15) * 100
    }
  },

  methods: {
    handleRestart() {
      this.store.resetGame()
      this.$router.push({ name: 'home' })
    }
  }
}
</script>

<style scoped>
.timer-bar {
  width: 100%;
  max-width: 760px;
  height: 10px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 999px;
  margin-bottom: 1rem;
  overflow: hidden;
}

.timer-fill {
  height: 100%;
  background: linear-gradient(90deg, #38bdf8, #0ea5e9);
  transition: width 0.9s linear;
}

.timer-fill.urgent {
  background: linear-gradient(90deg, #ef4444, #dc2626);
}

.progress {
  text-align: center;
  color: #cbd5e1;
  margin-bottom: 1rem;
}

.play-view {
  width: 100%;
  max-width: 780px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.25rem;
}

</style>