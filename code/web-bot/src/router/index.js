import { createRouter, createWebHistory } from 'vue-router'
import Home from "@/views/home.vue";
import messageReply from "@/views/messageReply/messageReply.vue";
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      // path: '/',
      path: '/messageReply',
      name: 'home',
      component: Home
    },
    {
      path: '/',
      // path: '/messageReply',
      name: 'messageReply',
      component: messageReply
    },
  ]
})

export default router
