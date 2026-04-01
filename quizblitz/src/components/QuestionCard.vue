<template>
    <div class="question-card card">
        <p class="timer">Time left: {{ store.timeLeft }}</p>
        <p class="question-text">{{ question.question }}</p>
        <div class="answers">
        <button
            v-for="(answer, index) in question.answers"
            :key="index"
            :class="buttonClass(index)"
            :disabled="selectedAnswer !== null"
            @click="selectAnswer(index)"
        >
            {{ answer }}
        </button>
        </div>
    </div>
</template>

<script>
import { useGameStore } from '../stores/gameStore.js'

export default {
    name: 'QuestionCard',
    props: {
        question: {
            type: Object,
            required: true,
        },
        selectedAnswer: {
            type: Number,
            default: null
        }
    },
    data() {
        return {};
    },
    setup() {
        const store = useGameStore()
        return { store }
    },
    methods: {
        selectAnswer(index) {
            if (this.selectedAnswer !== null) return  // already answered, ignore
            this.$emit('answer', index)
        },

        buttonClass(index) {
            if (this.selectedAnswer === null) return ''
            if (index === this.question.correct) return 'correct'
            if (index === this.selectedAnswer) return 'wrong'
            return ''
        }
    }
};
</script>

<style scoped>
.question-card {
  width: 100%;
  max-width: 760px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  text-align: center;
}

.question-card .question-text {
  font-size: 1.3rem;
  color: var(--text);
  margin: 0.7rem 0;
}

.answers {
  width: 100%;
  display: grid;
  gap: 0.75rem;
}

.answers button {
  width: 100%;
  min-height: 48px;
  padding: 0.75rem;
  border-radius: 10px;
  border: 1px solid rgba(255,255,255,0.22);
  background: rgba(255,255,255,0.06);
  color: #edf2f7;
  font-weight: 600;
  transition: background 0.2s ease, transform 0.1s ease;
}

.answers button:hover:not(:disabled) {
  background: rgba(255,255,255,0.12);
  transform: translateY(-1px);
}

button.correct {
  background-color: rgba(34, 197, 94, 0.95);
  border-color: rgba(34, 197, 94, 0.8);
  color: #fff;
}

button.wrong {
  background-color: rgba(239, 68, 68, 0.95);
  border-color: rgba(239, 68, 68, 0.8);
  color: #fff;
}

button:disabled {
  cursor: not-allowed;
  opacity: 0.75;
}
</style>


