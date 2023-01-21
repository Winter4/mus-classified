<template>
  <header class="p-3 mb-3 border-bottom">
    <div class="container-lg">
      <div class="d-flex flex-wrap align-items-center justify-content-between">
        <a href="/" class="d-flex align-items-center mb-2 mb-lg-0 text-dark text-decoration-none">
          <span calss="fs-1 fw-bold fst-italic">Трунь!</span>
        </a>

        <div v-if="userStore.user && userStore.user.token" class="dropdown text-end">
          <a href="#" class="d-block link-dark text-decoration-none dropdown-toggle" id="dropdownUser" data-bs-toggle="dropdown" aria-expanded="false">
            <img src="https://github.com/mdo.png" alt="mdo" width="32" height="32" class="rounded-circle">
          </a>
          <ul class="dropdown-menu text-small" aria-labelledby="dropdownUser">
            <li><a @click="exit" class="dropdown-item" href="#">Выход</a></li>
          </ul>
        </div>
        <ul v-else class="nav">
          <li class="nav-item"><a href="#" class="nav-link link-dark px-2" data-bs-toggle="modal" data-bs-target="#modalAuth">Вход</a></li>
          <li class="nav-item"><a href="#" class="nav-link link-dark px-2" data-bs-toggle="modal" data-bs-target="#modalReg">Регистрация</a></li>
        </ul>
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
import TheHeaderModalAuth from '@/components/TheHeaderModalAuth.vue';
import TheHeaderModalReg from '@/components/TheHeaderModalReg.vue';

import { useUserStore } from "@/stores/user";

export default {
  components: {
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


