<template>
  <header class="p-3 mb-3 border-bottom bg-primary">
    <div class="container-lg">
      <div class="d-flex align-items-center justify-content-between">
        <div class="col-4">
          <RouterLink :to="{ name: 'main' }" class="text-white text-decoration-none fs-4">
            <i class="fa-solid fa-music me-2"></i>
            <i class="fa-solid fa-microphone me-2"></i>
            <i class="fa-solid fa-headphones me-2"></i>
            <i class="fa-solid fa-guitar me-2"></i>
            <i class="fa-solid fa-drum me-2"></i>
            <i class="fa-solid fa-compact-disc"></i>
          </RouterLink>
        </div>

        <div class="col-4 d-flex align-items-center justify-content-center">
          <RouterLink :to="{ name: 'main' }" class="text-white text-decoration-none">
            <span class="fs-2 fw-bold fst-italic">Трунь!</span>
          </RouterLink>
        </div>

        <div class="col-4 d-flex align-items-center justify-content-end">
          <template v-if="userStore.user && userStore.user.token">
            <ul class="nav d-flex align-items-center">
              <li class="nav-item">
                <RouterLink :to="{ name: 'advertisementAdd' }" class="btn btn-sm btn-secondary">
                  Добавить объявление!
                </RouterLink>
              </li>
              <li class="nav-item">
                <RouterLink :to="{ name: 'personalArea' }" class="nav-link link-light px-2 py-0">
                  Личный кабинет
                </RouterLink>
              </li>
            </ul>
          </template>
          <template v-else>
            <ul class="nav">
              <li class="nav-item">
                <button type="button" class="btn btn-sm btn-dark me-2" data-bs-toggle="modal" data-bs-target="#modalAuth">Вход</button>
              </li>
              <li class="nav-item">
                <button type="button" class="btn btn-sm btn-dark" data-bs-toggle="modal" data-bs-target="#modalReg">Регистрация</button>
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
  }
}
</script>
