**\[GPT 5.3]** Write a Vue 3 single-file component called StartScreen. It should display a heading that says 'QuizBlitz', a short tagline, and a button labelled 'Play'. When the button is clicked, it emits an event called 'start'. Use the Options API (not Composition API). No props needed. Don't do any styling

**\[GPT 5.3]** Write a Vue 3 single-file component called ScoreBoard. It receives a prop called score (Number). It displays a heading 'Game Over', the player's score out of 10, and a 'Play Again' button. When Play Again is clicked, it emits 'restart'. Use the Options API. Don't do any styling. 

**\[GPT 5.3]** I'm building a Vue 3 quiz game using Vite and the Options API. Write a single-file component called QuestionCard. It receives one prop called question shaped like { question: String, answers: Array, correct: Number }. The template should display the question text and render four answer buttons using v-for. When a button is clicked: disable all buttons immediately, apply a green CSS class to the correct answer button and a red class to the clicked button if it was wrong, wait 1 second using setTimeout, then emit an event called 'answer' with the value true if the answer was correct or false if it was wrong. Reset the highlight state after emitting. Do not use TypeScript.

**\[GPT 5.3]** Using what i just gave you, how can I quickly test whether it works using a hardcoded question example?

**\[GPT 5.3]** Using this template, add 10 sample questions:

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

**\[GPT 5.3]** Implement the following methods and tell me where to put them in the `App.vue` file:
- `startGame()` — sets `gameState` to `"playing"` and resets `currentIndex` and `score` to `0`.
- `handleAnswer(isCorrect)` — increments `score` if `isCorrect` is `true`, then increments `currentIndex`. If `currentIndex` equals `questions.length`, set `gameState` to `"end"`.
- `resetGame()` — sets `gameState` back to `"start"`.

**\[GPT 5.3]** How can I add a visual indicator of "Question x of 10" below the question card?
