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
        bestStreak: 0,
        playerName: '',
        scoreSubmitted: false,
        token: localStorage.getItem('quizblitz_token') || null,
        userEmail: localStorage.getItem('quizblitz_email') || null
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
            const response = await fetch('${import.meta.env.VITE_API_URL}/api/questions/random')
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
            this.scoreSubmitted = false
        },

        async submitScore() {
            const response = await fetch('${import.meta.env.VITE_API_URL}/api/scores', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.token}`
                },
                body: JSON.stringify({
                    score: this.score,
                    totalQuestions: this.questions.length
                })
            })
            
            if (response.ok) {
                this.scoreSubmitted = true
            }
        },

        async register(email, password) {
            const response = await fetch('${import.meta.env.VITE_API_URL}/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            })
            const data = await response.json()
            if (!response.ok) throw new Error(data.error)
            return data
        },

        async login(email, password) {
            const response = await fetch('${import.meta.env.VITE_API_URL}/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            })
            const data = await response.json()
            if (!response.ok) throw new Error(data.error)
            this.token = data.token
            this.userEmail = data.email
            localStorage.setItem('quizblitz_token', data.token)
            localStorage.setItem('quizblitz_email', data.email)
            return data
        },

        logout() {
            this.token = null
            this.userEmail = null
            localStorage.removeItem('quizblitz_token')
            localStorage.removeItem('quizblitz_email')
        }
    }
})