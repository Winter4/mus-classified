import { createRouter, createWebHistory } from 'vue-router';

import MainLayout from '@/layouts/MainLayout.vue';

import MainView from '@/views/MainView.vue';
import AdvertisementAddView from '@/views/AdvertisementAddView.vue';

const routes = [
  {
    path: '/',
    component: MainLayout,
    children: [
      {
        path: '/',
        name: 'main',
        component: MainView,
        meta: { 
          requiresAuth: false,
          title: 'Трунь - Музыкальные инструменты!',
        }
      },
      {
        path: '/add',
        name: 'advertisementAdd',
        component: AdvertisementAddView,
        meta: { 
          requiresAuth: true,
          title: 'Трунь - Добавить объявление!',
        }
      },
    ]
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;