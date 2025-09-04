import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { VueQueryPlugin } from '@tanstack/vue-query'
import { queryClient } from '@/api/query-client'
import router from '@/router'
import App from './App.vue'
import './assets/main.css'

// Naive UI 样式
import 'vfonts/Lato.css'
import 'vfonts/FiraCode.css'

const app = createApp(App)

// 注册插件
app.use(createPinia())
app.use(VueQueryPlugin, {
  queryClient,
})
app.use(router)

app.mount('#app')
