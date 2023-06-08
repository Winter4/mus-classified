<template>
  <h4 class="mb-3">Мои Настройки</h4>

  <div class="row">
    <div class="col-4">
      <div class="mb-3">
        <label class="form-label">Имя</label>
        <div class="input-group">
          <input v-model="firstName" type="text" class="form-control" placeholder="Имя">
          <button class="btn btn-outline-secondary" type="button" @click="editSelf({firstName})">
            <i class="fa-solid fa-floppy-disk"></i>
          </button>
        </div>
      </div>

      <div class="mb-3">
        <label class="form-label">Фамилия</label>
        <div class="input-group">
          <input v-model="lastName" type="text" class="form-control" placeholder="Фамилия">
          <button class="btn btn-outline-secondary" type="button" @click="editSelf({lastName})">
            <i class="fa-solid fa-floppy-disk"></i>
          </button>
        </div>
      </div>
    </div>

    <div class="col-4">
      <div class="mb-3">
        <label class="form-label">E-mail</label>
        <div class="input-group">
          <input v-model="email" type="text" class="form-control" placeholder="E-mail">
          <button class="btn btn-outline-secondary" type="button" @click="editSelf({email})">
            <i class="fa-solid fa-floppy-disk"></i>
          </button>
        </div>
      </div>

      <div class="mb-3">
        <label class="form-label">Номер телефона</label>
        <div class="input-group">
          <input v-model="phoneNumber" type="text" class="form-control" placeholder="Номер телефона">
          <button class="btn btn-outline-secondary" type="button" @click="editSelf({phoneNumber})">
            <i class="fa-solid fa-floppy-disk"></i>
          </button>
        </div>
      </div>

      <div class="mb-3">
        <label class="form-label">Город</label>
        <div class="input-group">
          <input v-model="city" type="text" class="form-control" placeholder="Город">
          <button class="btn btn-outline-secondary" type="button" @click="editSelf({city})">
            <i class="fa-solid fa-floppy-disk"></i>
          </button>
        </div>
      </div>
    </div>
    
    <div class="col-4">
      <div class="mb-3">
        <label class="form-label">Старый пароль</label>
        <input v-model="oldPass" type="password" class="form-control" placeholder="Старый пароль">
      </div>

      <div class="mb-3">
        <label class="form-label">Новый пароль</label>
        <input v-model="newPass" type="password" class="form-control" placeholder="Новый пароль">
      </div>

      <div class="mb-3">
        <label class="form-label">Повторите новый пароль</label>
        <input v-model="repeatPass" type="password" class="form-control" placeholder="Повторите новый пароль">
      </div>

      <div class="mb-3">
        <button class="btn btn-outline-secondary w-100" type="button" 
          @click="editSelf({oldPass, newPass, repeatPass})">
          Сменить пароль
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { useUserStore } from "@/stores/user";

export default {
  setup() {
    const userStore = useUserStore();

    return { 
      userStore,
    }
  },
  data() {
    return {
      firstName: this.userStore.user.firstName, 
      lastName: this.userStore.user.lastName, 
      email: this.userStore.user.email, 
      phoneNumber: this.userStore.user.phoneNumber, 
      city: this.userStore.user.city, 
      oldPass: "", 
      newPass: "", 
      repeatPass: ""
    }
  },
  computed: {
  },
  methods: {
    async editSelf(values) {
      if (values?.newPass?.length && values?.repeatPass?.length) {
        if (values.newPass != values.repeatPass) return alert("Пароли не совпадают!");
      }

      const res = await this.userStore.editSelf(values);
      
      if (res.ok != true) {
        if (res.status == 401) {
          alert("Неверный пароль!");
        }
        else alert("Какая-то ошибка...");
      }
      else {
        this.userStore.getSelf();
        alert("Настройки сохранены!");  
      }
      
      this.oldPass = ""; 
      this.newPass = "";
      this.repeatPass = "";
    }
  }
}
</script>