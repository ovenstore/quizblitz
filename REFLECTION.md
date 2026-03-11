## Q1 - Props

A prop is how parent components pass data to child components in `Vue.js`. In `Vue.js`, data flows down from parents to their children, and props are the medium through which they are passed down. Since `QuestionCard` is a component, it should not handle the logic of calculating score or correctness, instead those calculations should be done by the parent and passed down to `QuestionCard` so that we maintain better modularity. This is better so that we can access the data calculated by the parent from other components if needed. 

## Q2 - $emit

`$emit` allows a child component to send an event upward to its parent component. The parent listens for the event using an event listener. If the parent forgets to handle the emitted event, nothing would happen, the event would simply be ignored. The user interaction would not trigger any state changes, so the game would appear broken.

## Q3 - Pinia Store

Storing `currentIndex`, `score`, and `gameState` in `App.vue` causes problems as the component tree grows because data must be passed through many intermediate components. Prop drilling is when components pass props they don’t actually need just to reach other components. A component "owns state" when it is responsible for storing and managing that data. Moving state into a Pinia store solves this by creating a centralized place to store data that any component can access directly, thus eliminating prop drilling. 

## Q4 - Vue Router

A traditional multi-page website loads a completely new HTML page from the server every time the user navigates to a new page. A Single-Page Application loads one HTML page initially and then dynamically updates the content using JavaScript without reloading the browser. 

`<router-view>` is a placeholder component where Vue Router renders the component that matches the current route. Navigating between routes does not reload the page because Vue Router intercepts navigation events and swaps components in the `<router-view>` instead of requesting an entirely new page. 

## Q5 - v-if vs v-show

`v-if` creates and removes elements in the DOM, while `v-show` keeps the element in the DOM and simply toggles its CSS display property. In our case, `v-if` is better for switching in between game screens because the screens should only exist when needed. `v-show` would keep all of the screens mounted at the same time which would be an unnecessary use of resources. 