import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App)
//需要先安装ElementPlus的依赖
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import Avue from '@smallwei/avue';
import '@smallwei/avue/lib/index.css';
import {http} from '@/api/https';
app.provide("$https",http)
app.use(createPinia())
app.use(router)
app.use(ElementPlus)
app.use(Avue);
app.mount('#app')
