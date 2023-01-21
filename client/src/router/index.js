import { createRouter, createWebHistory } from 'vue-router';

import MainLayout from '@/layouts/MainLayout.vue';

import MainView from '@/views/MainView.vue';

const routes = [
  {
    path: '/',
    component: MainLayout,
    children: [
      {
        path: '/',
        component: MainView,
        meta: { 
          requiresAuth: true,
          title: 'Трунь - Музыкальные инструменты',
        }
      }
    ]
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;