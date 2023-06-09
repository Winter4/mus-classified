import { createRouter, createWebHistory } from 'vue-router';
import { useUserStore } from "@/stores/user";
import userRoles from "@/helpers/userRoles";

const routes = [
  {
    path: '/',
    component: () => import('@/layouts/Main.vue'),
    children: [
      {
        path: '/',
        name: 'main',
        component: () => import('@/views/Main.vue'),
        meta: { 
          requiresAuth: false,
          title: 'Трунь - Музыкальные инструменты!',
        }
      },
      {
        path: '/add',
        name: 'advertisementAdd',
        component: () => import('@/views/AdvertisementAdd.vue'),
        meta: { 
          requiresAuth: true,
          title: 'Трунь - Добавить объявление!',
        }
      },
      {
        path: '/advertisement/:id',
        name: 'advertisement',
        component: () => import('@/views/Advertisement.vue'), 
        props: true,
        meta: { 
          requiresAuth: false,
          title: 'Трунь - Объявление!',
        }
      },
      {
        path: '/advertisement/:id/edit',
        name: 'advertisementEdit',
        component: () => import('@/views/AdvertisementEdit.vue'), 
        props: true,
        meta: { 
          requiresAuth: false,
          title: 'Трунь - Редактировать объявление!',
        }
      },
      {
        path: '/personal',
        component: () => import('@/layouts/PersonalArea.vue'), 
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
            path: '/personal/users',
            name: 'personalUsers',
            component: () => import('@/views/PersonalUsers.vue'), 
            props: true,
            meta: { 
              requiresAuth: true,
              userRole: userRoles.ADMIN,
              title: 'Трунь - Пользователи',
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

const DEFAULT_TITLE = 'Трунь!';
router.afterEach((to, from) => {
  document.title = to.meta.title || DEFAULT_TITLE;
});

export default router;