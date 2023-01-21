<template>
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title w-100 text-center">Регистрация!</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <form @submit.prevent="register">
          <div class="form-floating">
            <input v-model="email" type="email" class="form-control" id="inputRegEmail" placeholder="name@example.com" required>
            <label for="inputRegEmail">Email</label>
          </div>
          <div class="form-floating">
            <input v-model="phoneNumber" type="text" class="form-control" id="inputRegPhone" placeholder="+71234567890" required>
            <label for="inputRegPhone">Номер телефона</label>
          </div>
          <div class="form-floating">
            <input v-model="password" type="password" class="form-control" id="inputRegPassword" placeholder="Пароль" required>
            <label for="inputRegPassword">Пароль</label>
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
      email: '',
      phoneNumber: '',
      password: '',
    };
  },
  methods: {
    async register() {
      const res = await this.userStore.register(this.email, this.phoneNumber, this.password);
      if (res) {
        const modalReg = Modal.getInstance(document.getElementById('modalReg'));
        modalReg.hide();
      }
    }
  }
}
</script>

<style scoped>
.modal-body {
  padding: 30px;
}

#inputRegEmail {
  margin-bottom: -1px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}

#inputRegPhone {
  margin-top: -1px;
  margin-bottom: -1px;
  border-radius: 0;
}

#inputRegPassword {
  margin-bottom: 10px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}

.form-floating:focus-within {
  z-index: 2;
}
</style>