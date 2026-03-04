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

    <p class="progress">Question {{ current + 1 }} of {{ total }}</p>
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
            },
            current: { type: Number, required: true }, 
            total: { type: Number, required: true }
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


