<template>
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title w-100 text-center">Авторизация!</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <form @submit.prevent="login">
          <div class="form-floating">
            <input v-model="username" type="text" class="form-control" id="inputAuthUsername" placeholder="name@example.com" required>
            <label for="inputAuthUsername">Имеил или телефон</label>
          </div>
          <div class="form-floating">
            <input v-model="password" type="password" class="form-control" id="inputAuthPassword" placeholder="Пароль" required>
            <label for="inputAuthPassword">Пароль</label>
          </div>

          <button class="w-100 btn btn-lg btn-primary" type="submit">Поехали!</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { useUserStore } from "@/stores/user";
import { Modal } from 'bootstrap';

export default {
  setup() {
    const userStore = useUserStore();
    return { 
      userStore 
    };
  },
  data() {
    return {
      username: '',
      password: '',
    };
  },
  methods: {
    async login() {
      const res = await this.userStore.authorize(this.username, this.password);
      if (res) {
        const modalAuth = Modal.getInstance(document.getElementById('modalAuth'));
        modalAuth.hide();
      }
    }
  }
}
</script>

<style scoped>
.modal-body {
  padding: 30px;
}

#inputAuthUsername {
  margin-bottom: -1px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}

#inputAuthPassword {
  margin-bottom: 10px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}
.form-floating:focus-within {
  z-index: 2;
}
</style>