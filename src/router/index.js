import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/pages/Home.vue';
import CoreGame from '@/pages/CoreGame.vue';
import GameOver from '@/pages/GameOver.vue';

const routes = [
  { path: '/', component: Home },
  { path: '/game', component: CoreGame },
  { path: '/gameover', component: GameOver }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;