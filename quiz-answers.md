# Quiz 2 Answers
**Name:** Owen Story
**Date:** 11 March 2026

## Q1
**D** - props should not be modified by the children, instead the component should use $emit which is used to propogate information upward to the parent. 

## Q2
Add the `lastAnswerCorrect` boolean to the state:

```JS
state: () => ({
    ...
    lastAnswerCorrect: false
  }),
```

Add a line to update the boolean when `submitAnswer()` is called:
```JS
submitAnswer(answerIndex) {
    this.lastAnswerCorrect = answerIndex === this.questions[this.currentIndex].correct
    ...
}
```

It is better to access the `lastAnswerCorrect` boolean directly from the store because it is unnecessary for the parent to call the `submitAnswer()` function in the `gameStore.js` just to propogate the state down. It is simpler to access the store directly from the `QuestionCard.vue` component. 

## Q3
**C** - the state should be a function that returns an object, otherwise if it is just an object then it will be shared by all components which use `useGameStore()`, which would cause unintended functionality. 

## Q4
**Part A** - The mistake is that the student has set up routes but is not using the router in `App.js`. The `RouterView` needs to be present in `App.js` otherwise the Vue router will never be called to render `GameView` template. 

**Part B** - The following adds `RouterView` to the code to correctly render `GameView`:

```JS
<template>
  <div>
    <h1>QuizBlitz</h1>
    <RouterView />
  </div>
</template>
```

## Q5
**B** - it is better practice to use props for a component because it keeps the code more modular and allows for easier testing. Also, answer D is just wrong. 

## Q6
The issue with this code is that when `currentIndex` is set to `state.questions.length`, then `state.questions[currentIndex]` is undefined because we are indexing outside of the array. 

One way to fix this is to never allow `nextQuestion()` to set the index to an invalid index:

```JS
nextQuestion(state) {
  if (state.currentIndex < state.questions.length - 1) {
    state.currentIndex++
  }
}
```

This is a simple approach that solves the issue because we will never try to access an index that is outside of the array. As long as we avoid accessing outside of the array, there should be no error. 

## Q7
**B** - problems are only introduced if the array might be modified, but in our case this will never happen so everything should be fine. 

## Q8
#### Local File Approach
- **Advantage:** This approach is simple and can be maintained in a single repository on a single server, allowing us to keep our app very simple. 
- **Disadvantage:** It is difficult to add or modify questions without restarting the server. 

#### Remote API Approach
- **Advantage:** We can add and modify questions freely in a database or other data management system without restarting our web server. 
- **Disadvantage:** This requires maintaining two different servers which adds to the complexity of running the project. 

#### My Choice and Reasoning:
At this stage I would start moving toward using a remote API, this way we can begin expanding the question set more easily without needing to redeploy the web application. I think this approach sets up the application better in the long run. It seems fairly simple to modify the `startGame()` action to be asynchronous. 

## Q9
**B** - `v-show` just hides elements via CSS, so they are always present which could cause issues and introduces unnecessary complexity. 

## Q10
#### `gameStore.js` Changes: 
First, we need to add the `timeLeft: 15` and `_timerInterval: null` to the game store. 

Next, we create actions to start and stop the timer, as well as a function to check whether we ran out of time and need to move to the next question:
```JS
_startTimer() {
    this._stopTimer()
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
```

In `startGame()`, we need to reset the `timeLeft` and call `_startTimer()`:
```JS
startGame() {
  ...
  this.timeLeft = 15;
  this._startTimer()
}
```

In `submitAnswer()` we should call `_stopTimer()`. In `nextQuestion()`, we should stop the timer if the game is over and start the timer otherwise. Finally, in `resetGame()`, we should stop the timer. 

#### `QuestionCard.vue` Changes:
We need to import the game store:
```JS
import { useGameStore } from '../stores/gameStore.js'
```

Also declare `store` so that we can use it in the template:
```JS
setup() {
    const store = useGameStore()
    return { store }
},
```

Finally, we can access it inside the template:
```JS
<p class="timer">Time left: {{ store.timeLeft }}</p>
```

#### Explanation
The timer logic belongs in the store because `timeLeft` is a shared state that multiple components need to react to simultaneously. If the timer were inside a component, it could stop or reset unexpectedly when that component unmounts. Placing it in the store centralizes control and keeps the individual components focused on display rather than game logic.