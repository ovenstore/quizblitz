<!-- <template>
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

    <p class="progress">Question {{ current + 1 }} of {{ total }}</p>
  </div>
</template> -->

<template>
    <div class="question-card">
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
    export default {
        name: 'QuestionCard',
        props: {
            question: {
                type: Object,
                required: true,
            },
            // current: { type: Number, required: true }, 
            // total: { type: Number, required: true }

            selectedAnswer: {
                type: Number,
                default: null
            }
        },
        data() {
            return {};
        },
        methods: {
            // selectAnswer(index) {
            //     this.buttonsDisabled = true;
            //     this.clickedIndex = index;

            //     const isCorrect = index === this.question.correct;

            //     setTimeout(() => {
            //         this.$emit('answer', isCorrect);
            //         // Reset state for next question
            //         this.buttonsDisabled = false;
            //         this.clickedIndex = null;
            //     }, 1000);
            // },

            // buttonClass(index) {
            //     if (this.clickedIndex === null) return '';
            //     if (index === this.question.correct) return 'correct';
            //     if (index === this.clickedIndex && index !== this.question.correct)
            //         return 'wrong';
            //     return '';
            // }

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
    button.correct {
        background-color: green;
        color: white;
    }
    button.wrong {
        background-color: red;
        color: white;
    }
    button:disabled {
        cursor: not-allowed;
        opacity: 0.8;
    }
</style>


