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

## Q5
**B** - it is better practice to use props for a component because it keeps the code more modular and allows for easier testing. Also, answer D is just wrong. 

## Q6

## Q7
**B** - problems are only introduced if the array might be modified, but in our case this will never happen so everything should be fine. 

## Q8

## Q9
**B** - `v-show` just hides elements via CSS, so they are always present which could cause issues and introduces unnecessary complexity. 

## Q10

