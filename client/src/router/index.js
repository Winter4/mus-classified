import { createRouter, createWebHistory } from "vue-router";
import { useUserStore } from "@/stores/user";
import userRoles from "@/helpers/userRoles";
import { useCategoriesStore } from "../stores/categories";

const routes = [
  {
    path: "/",
    component: () => import("@/layouts/Main.vue"),
    children: [
      {
        path: "/",
        name: "main",
        component: () => import("@/views/Main.vue"),
        meta: {
          requiresAuth: false,
          title: "Трунь - Музыкальные инструменты!",
        },
      },
      {
        path: "/add",
        name: "advertisementAdd",
        component: () => import("@/views/AdvertisementAdd.vue"),
        meta: {
          requiresAuth: true,
          title: "Трунь - Добавить объявление!",
        },
      },
      {
        path: "/advertisement/:id",
        name: "advertisement",
        component: () => import("@/views/Advertisement.vue"),
        props: true,
        meta: {
          requiresAuth: false,
          title: "Трунь - Объявление!",
        },
      },
      {
        path: "/advertisement/:id/edit",
        name: "advertisementEdit",
        component: () => import("@/views/AdvertisementEdit.vue"),
        props: true,
        meta: {
          requiresAuth: false,
          title: "Трунь - Редактировать объявление!",
        },
      },
      {
        path: "/category/:id",
        name: "category",
        component: () => import("@/views/Category.vue"),
        props: true,
        meta: {
          requiresAuth: false,
          title: "Трунь - Категория!",
        },
      },
      {
        path: "/manufacturer/:id",
        name: "manufacturer",
        component: () => import("@/views/Manufacturer.vue"),
        props: true,
        meta: {
          requiresAuth: false,
          title: "Трунь - Производитель!",
        },
      },
      {
        path: "/search",
        name: "search",
        component: () => import("@/views/Search.vue"),
        meta: {
          requiresAuth: false,
          title: "Трунь - Поиск!",
        },
      },
      {
        path: "/personal",
        component: () => import("@/layouts/PersonalArea.vue"),
        children: [
          {
            path: "/personal",
            name: "personalArea",
            component: () => import("@/views/PersonalArea.vue"),
            meta: {
              requiresAuth: true,
              title: "Трунь - Личный кабинет",
            },
          },
          {
            path: "/personal/ads",
            name: "personalAds",
            component: () => import("@/views/PersonalAds.vue"),
            meta: {
              requiresAuth: true,
              userRole: userRoles.USER,
              title: "Трунь - Мои объявления",
            },
          },
          {
            path: "/personal/moderAds",
            name: "personalModerAds",
            component: () => import("@/views/PersonalModerAds.vue"),
            meta: {
              requiresAuth: true,
              userRole: userRoles.MODER,
              title: "Трунь - Объявления для модерации!",
            },
          },
          {
            path: "/personal/expertAds",
            name: "personalExpertAds",
            component: () => import("@/views/PersonalExpertAds.vue"),
            meta: {
              requiresAuth: true,
              userRole: userRoles.EXPERT,
              title: "Трунь - Запросы на экспертную оценку!",
            },
          },
          {
            path: "/personal/categories",
            name: "personalCategories",
            component: () => import("@/views/PersonalCategories.vue"),
            meta: {
              requiresAuth: true,
              userRole: userRoles.ADMIN,
              title: "Трунь - Категории",
            },
          },
          {
            path: "/personal/manufacturers",
            name: "personalManufacturers",
            component: () => import("@/views/PersonalManufacturers.vue"),
            meta: {
              requiresAuth: true,
              userRole: userRoles.ADMIN,
              title: "Трунь - Производители",
            },
          },
          {
            path: "/personal/models",
            name: "personalModels",
            component: () => import("@/views/PersonalModels.vue"),
            meta: {
              requiresAuth: true,
              userRole: userRoles.ADMIN,
              title: "Трунь - Модели инструментов",
            },
          },
          {
            path: "/personal/users",
            name: "personalUsers",
            component: () => import("@/views/PersonalUsers.vue"),
            meta: {
              requiresAuth: true,
              userRole: userRoles.ADMIN,
              title: "Трунь - Пользователи",
            },
          },
          {
            path: "/personal/messages",
            name: "personalMessages",
            component: () => import("@/views/PersonalMessages.vue"),
            meta: {
              requiresAuth: true,
              title: "Трунь - Мои сообщения",
            },
          },
          {
            path: "/personal/settings",
            name: "personalSettings",
            component: () => import("@/views/PersonalSettings.vue"),
            meta: {
              requiresAuth: true,
              title: "Трунь - Мои настройки",
            },
          },
        ],
      },
    ],
  },
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
    return { name: "main" };
  }

  if (
    to.meta?.userRole != undefined &&
    userStore.user.role != to.meta.userRole
  ) {
    return { name: "main" };
  }

  return true;
});

const DEFAULT_TITLE = "Трунь!";
router.afterEach((to, from) => {
  document.title = to.meta.title || DEFAULT_TITLE;
});

router.beforeEach(async (to, from) => {
  if (from.name === "category" && to.name === "advertisement") {
    const { category } = useCategoriesStore();

    ["Электрогитары", "Бас-гитары"].includes(category.name)
      ? window.ym(98709910, "reachGoal", "hypothesis2")
      : null;
  }
});

export default router;
