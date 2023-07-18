// import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './firebase/init.js'

const app = createApp(App)

app.use(router)

app.mount('#app')
