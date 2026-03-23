import { defineStore } from 'pinia'
import { questions as questionBank } from '../data/questions.js'

export const useGameStore = defineStore('game', {

    state: () => ({
        questions: [],
        currentIndex: 0,
        score: 0,
        gameState: 'start',    // 'start' | 'playing' | 'end'
        selectedAnswer: null,  // index of the button the player clicked, or null
        timeLeft: 15,
        _timerInterval: null,   // internal — managed by the store only
        streak: 0,
        bestStreak: 0
    }),

    getters: {

        // The question the player is currently looking at
        currentQuestion: (state) => state.questions[state.currentIndex],

        // True when the current question is the last one
        isLastQuestion: (state) => state.currentIndex >= state.questions.length - 1,

        // Progress info for the "Question X of Y" display
        progress: (state) => ({
            current: state.currentIndex + 1,
            total: state.questions.length
        })

    },

    actions: {
        _startTimer() {
            this._stopTimer()           // always clear any existing timer first
            this._timerInterval = setInterval(() => {
                this.tick()
            }, 1000)
        },

        _stopTimer() {
            if (this._timerInterval) {
                clearInterval(this._timerInterval)
                this._timerInterval = null
            }
        },

        tick() {
            if (this.timeLeft > 0) {
                this.timeLeft--
            } else {
                this.nextQuestion()   // time's up — skip to next, no points
            }
        },

        async startGame() {
            const response = await fetch('http://localhost:3000/api/questions/random')
            const questions = await response.json()
            this.questions = questions
            
            this.currentIndex = 0
            this.score = 0
            this.gameState = 'playing'
            this.selectedAnswer = null
            this.timeLeft = 15
            this._startTimer()
        },

        submitAnswer(answerIndex) {
            if (this.selectedAnswer !== null) return  // ignore double-clicks
            this._stopTimer()
            this.selectedAnswer = answerIndex
            const isCorrect = answerIndex === this.currentQuestion.correct

            if (isCorrect) {
                this.score++
                this.streak++
                if (this.streak > this.bestStreak) this.bestStreak = this.streak
                if (this.streak % 3 === 0) this.score++  // bonus every 3 in a row
            } else {
                this.streak = 0
            }

            setTimeout(() => {
                this.nextQuestion()
            }, 1000)
        },

        nextQuestion() {
            this.selectedAnswer = null
            this.timeLeft = 15
            if (this.isLastQuestion) {
                this._stopTimer()
                this.gameState = 'end'
            } else {
                this.currentIndex++
                this._startTimer()
            }
        },

        resetGame() {
            this._stopTimer()
            this.questions = []
            this.currentIndex = 0
            this.score = 0
            this.streak = 0
            this.gameState = 'start'
            this.selectedAnswer = null
            this.timeLeft = 15
        }
    }
})