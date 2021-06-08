import { createApp } from 'vue'
import App from './App.vue'
import store from './store/index'
import router from './router/index'
import ElementPlus from 'element-plus'
import 'element-plus/lib/theme-chalk/index.css';
import '@/styles/reset.css' 
import '@/styles/index.less'
const app = createApp(App)

app.use(store)
app.use(router)
app.use(ElementPlus)
app.mount('#app')
