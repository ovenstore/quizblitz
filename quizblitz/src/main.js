import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './style.css'
import App from './App.vue'
import router from './router'

// temporary, so that we can see state in dev tools
import { useGameStore } from './stores/gameStore'

const app = createApp(App)
app.use(createPinia())
app.use(router)
app.mount('#app')

// temporary, so that we can see state in dev tools
const store = useGameStore();