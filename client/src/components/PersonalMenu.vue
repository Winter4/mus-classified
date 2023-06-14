<template>
  <div class="w-100">
    <template v-if="userStore?.user">
        <ul class="nav flex-column w-100">
          <li class="nav-item w-100 mb-2">
            <RouterLink :to="{ name: 'personalArea' }" class="btn btn-sm btn-outline-primary w-100">
              Личный кабинет
            </RouterLink>
          </li>

          <template v-if="userStore?.user?.role == userRoles.USER">
            <li class="nav-item w-100 mb-2">
              <RouterLink :to="{ name: 'personalAds' }" class="btn btn-sm btn-outline-primary w-100">
                Мои объявления
              </RouterLink>
            </li>
            <li class="nav-item w-100 mb-2">
              <RouterLink :to="{ name: 'personalMessages' }" class="btn btn-sm btn-outline-primary w-100">
                Мои сообщения
              </RouterLink>
            </li>
          </template>

          <template v-if="userStore?.user?.role == userRoles.MODER">
            <li class="nav-item w-100 mb-2">
              <RouterLink :to="{ name: 'personalModerAds' }" class="btn btn-sm btn-outline-primary w-100">
                Объявления
              </RouterLink>
            </li>
          </template>

          <template v-if="userStore?.user?.role == userRoles.EXPERT">
            <li class="nav-item w-100 mb-2">
              <RouterLink :to="{ name: 'personalExpertAds' }" class="btn btn-sm btn-outline-primary w-100">
                Объявления
              </RouterLink>
            </li>
          </template>

          <template v-else-if="userStore?.user?.role == userRoles.ADMIN">
            <li class="nav-item w-100 mb-2">
              <RouterLink :to="{ name: 'personalCategories' }" class="btn btn-sm btn-outline-primary w-100">
                Категории
              </RouterLink>
            </li>
            <li class="nav-item w-100 mb-2">
              <RouterLink :to="{ name: 'personalManufacturers' }" class="btn btn-sm btn-outline-primary w-100">
                Производители
              </RouterLink>
            </li>
            <li class="nav-item w-100 mb-2">
              <RouterLink :to="{ name: 'personalModels' }" class="btn btn-sm btn-outline-primary w-100">
                Модели
              </RouterLink>
            </li>
            <li class="nav-item w-100 mb-2">
              <RouterLink :to="{ name: 'personalUsers' }" class="btn btn-sm btn-outline-primary w-100">
                Пользователи
              </RouterLink>
            </li>
          </template>

          <li class="nav-item">
            <RouterLink :to="{ name: 'personalSettings' }" class="btn btn-sm btn-outline-primary w-100 mb-2">
              Настройки
            </RouterLink>
          </li>
          <li class="nav-item">
            <button class="btn btn-sm btn-outline-primary w-100" @click="exit">
              Выход
            </button>
          </li>
        </ul>
    </template>
  </div>
</template>

<script>
import { useUserStore } from "@/stores/user";
import userRoles from "@/helpers/userRoles";

export default {
  setup() {
    const userStore = useUserStore();

    return { 
      userStore,
      userRoles,
    }
  },
  data() {
    return {
    }
  },
  methods: {
    exit() {
      this.userStore.exit();
    }
  }
}
</script>