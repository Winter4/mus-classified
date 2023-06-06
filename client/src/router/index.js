import { createRouter, createWebHistory } from 'vue-router';
import { useUserStore } from "@/stores/user";
import userRoles from "@/helpers/userRoles";

const routes = [
  {
    path: '/',
    component: () => import('@/layouts/MainLayout.vue'),
    children: [
      {
        path: '/',
        name: 'main',
        component: () => import('@/views/MainView.vue'),
        meta: { 
          requiresAuth: false,
          title: 'Трунь - Музыкальные инструменты!',
        }
      },
      {
        path: '/add',
        name: 'advertisementAdd',
        component: () => import('@/views/AdvertisementAddView.vue'),
        meta: { 
          requiresAuth: true,
          title: 'Трунь - Добавить объявление!',
        }
      },
      {
        path: '/advertisement/:id',
        name: 'advertisement',
        component: () => import('@/views/AdvertisementView.vue'), 
        props: true,
        meta: { 
          requiresAuth: false,
          title: 'Трунь - Объявление!',
        }
      },
      {
        path: '/personal',
        component: () => import('@/layouts/PersonalAreaLayout.vue'), 
        children: [
          {
            path: '/personal',
            name: 'personalArea',
            component: () => import('@/views/PersonalArea.vue'), 
            props: true,
            meta: { 
              requiresAuth: true,
              title: 'Трунь - Личный кабинет',
            }
          },
          {
            path: '/personal/ads',
            name: 'personalAds',
            component: () => import('@/views/PersonalAds.vue'), 
            props: true,
            meta: { 
              requiresAuth: true,
              userRole: userRoles.USER,
              title: 'Трунь - Мои объявления',
            }
          },
          {
            path: '/personal/moders',
            name: 'personalModers',
            component: () => import('@/views/PersonalModers.vue'), 
            props: true,
            meta: { 
              requiresAuth: true,
              userRole: userRoles.ADMIN,
              title: 'Трунь - Модераторы',
            }
          },
          {
            path: '/personal/experts',
            name: 'personalExperts',
            component: () => import('@/views/PersonalExperts.vue'), 
            props: true,
            meta: { 
              requiresAuth: true,
              userRole: userRoles.ADMIN,
              title: 'Трунь - Эксперты',
            }
          },
          {
            path: '/personal/categories',
            name: 'personalCategories',
            component: () => import('@/views/PersonalCategories.vue'), 
            props: true,
            meta: { 
              requiresAuth: true,
              userRole: userRoles.ADMIN,
              title: 'Трунь - Категории',
            }
          },
          {
            path: '/personal/manufacturers',
            name: 'personalManufacturers',
            component: () => import('@/views/PersonalManufacturers.vue'), 
            props: true,
            meta: { 
              requiresAuth: true,
              userRole: userRoles.ADMIN,
              title: 'Трунь - Производители',
            }
          },
          {
            path: '/personal/models',
            name: 'personalModels',
            component: () => import('@/views/PersonalModels.vue'), 
            props: true,
            meta: { 
              requiresAuth: true,
              userRole: userRoles.ADMIN,
              title: 'Трунь - Модели инструментов',
            }
          },
          {
            path: '/personal/settings',
            name: 'personalSettings',
            component: () => import('@/views/PersonalSettings.vue'), 
            props: true,
            meta: { 
              requiresAuth: true,
              title: 'Трунь - Мои настройки',
            }
          },
        ]
      },
    ]
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  linkActiveClass: "",
  linkExactActiveClass: "active",
});

router.beforeEach((to) => {
  const userStore = useUserStore();

  const authorized = userStore.user && userStore.user.token;

  if (to.meta.requiresAuth && !authorized) {
    return { name: 'main' }
  }

  if (to.meta?.userRole != undefined && userStore.user.role != to.meta.userRole) {
    return { name: 'main' }
  }

  return true;
});

export default router;