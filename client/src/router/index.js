import { createRouter, createWebHistory } from 'vue-router';
import { useUserStore } from "@/stores/user";

import MainLayout from '@/layouts/MainLayout.vue';

import MainView from '@/views/MainView.vue';
import AdvertisementAddView from '@/views/AdvertisementAddView.vue';
import AdvertisementView from '@/views/AdvertisementView.vue';

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
      {
        path: '/advertisement/:id',
        name: 'advertisement',
        component: AdvertisementView, 
        props: true,
        meta: { 
          requiresAuth: false,
          title: 'Трунь - Объявление!',
        }
      },
    ]
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to) => {
  const userStore = useUserStore();

  const authorized = userStore.user && userStore.user.token;

  if (to.meta.requiresAuth && !authorized) {
    return { name: 'main' }
  }

  return true;
});

export default router;