<template>
  <header class="p-3 mb-3 border-bottom">
    <div class="container-lg">
      <div class="d-flex align-items-center justify-content-between">
        <div class="col-4"></div>

        <div class="col-4 d-flex align-items-center justify-content-center">
          <RouterLink :to="{ name: 'main' }" class="text-dark text-decoration-none">
            <span class="fs-3 fw-bold fst-italic">Трунь!</span>
          </RouterLink>
        </div>

        <div class="col-4 d-flex align-items-center justify-content-end">
          <template v-if="userStore.user && userStore.user.token">
            <ul class="nav d-flex align-items-center">
              <li class="nav-item">
                <RouterLink :to="{ name: 'advertisementAdd' }" class="btn btn-sm btn-primary">
                  Добавить объявление!
                </RouterLink>
              </li>
              <li class="nav-item"><a @click="exit" href="#" class="nav-link link-dark px-2 py-0">Выход</a></li>
            </ul>
          </template>
          <template v-else>
            <ul class="nav">
              <li class="nav-item">
                <button type="button" class="btn btn-sm btn-outline-primary me-2" data-bs-toggle="modal" data-bs-target="#modalAuth">Вход</button>
              </li>
              <li class="nav-item">
                <button type="button" class="btn btn-sm btn-primary" data-bs-toggle="modal" data-bs-target="#modalReg">Регистрация</button>
              </li>
            </ul>
          </template>
        </div>
      </div>
    </div>
  </header>

  <div class="modal fade" id="modalAuth" tabindex="-1" aria-labelledby="modalAuthLabel" aria-hidden="true">
    <TheHeaderModalAuth />
  </div>
  <div class="modal fade" id="modalReg" tabindex="-1" aria-labelledby="modalRegLabel" aria-hidden="true">
    <TheHeaderModalReg />
  </div>
</template>

<script>
import { RouterLink } from 'vue-router';

import TheHeaderModalAuth from '@/components/TheHeaderModalAuth.vue';
import TheHeaderModalReg from '@/components/TheHeaderModalReg.vue';

import { useUserStore } from "@/stores/user";

export default {
  components: {
    RouterLink,
    TheHeaderModalAuth,
    TheHeaderModalReg,
  },
  setup() {
    const userStore = useUserStore();
    return { 
      userStore 
    };
  },
  methods: {
    exit() {
      this.userStore.exit();
    }
  }
}
</script>
