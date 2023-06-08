<template>
  <div class="d-flex justify-content-between mb-3">
    <h4>Пользователи</h4>
    <div>
      <div class="btn-group">
        <input type="radio" class="btn-check" id="usersRoleRadio1" 
          :value="userRoles.ALL" v-model="usersRole" @change="updateUsers()">
        <label class="btn btn-outline-primary" for="usersRoleRadio1">Все</label>

        <input type="radio" class="btn-check" id="usersRoleRadio2" 
          :value="userRoles.MODER" v-model="usersRole" @change="updateUsers()">
        <label class="btn btn-outline-primary" for="usersRoleRadio2">Модераторы</label>

        <input type="radio" class="btn-check" id="usersRoleRadio3"
          :value="userRoles.EXPERT" v-model="usersRole" @change="updateUsers()">
        <label class="btn btn-outline-primary" for="usersRoleRadio3">Эксперты</label>
      </div>
    </div>
  </div>

  <table class="table">
    <thead>
      <tr>
        <th scope="col">#</th>
        <th scope="col">Имя пользователя</th>
        <th scope="col">Электронная почта</th>
        <th scope="col">Номер телефона</th>
        <th scope="col">Действия</th>
      </tr>
    </thead>
    <tbody>
      <template v-if="users.length">
        <tr v-for="item in users" :key="item.id">
          <th scope="row">{{ item.id }}</th>
          <td>{{ item.firstName }} {{ item.lastName }}</td>
          <td>{{ item.email }}</td>
          <td>{{ item.phoneNumber }}</td>
          <td>
            <button v-if="item.role == userRoles.MODER || item.role == userRoles.EXPERT" 
              class="btn btn-sm btn-outline-primary me-2" @click="editRole(item.id, userRoles.USER)">
              <i class="fa-solid fa-user"></i>
            </button>
            <button v-if="item.role == userRoles.USER" 
              class="btn btn-sm btn-outline-primary me-2" @click="editRole(item.id, userRoles.MODER)">
              <i class="fa-solid fa-user-shield"></i>
            </button>
            <button v-if="item.role == userRoles.USER" 
              class="btn btn-sm btn-outline-primary me-2"  @click="editRole(item.id, userRoles.EXPERT)">
              <i class="fa-solid fa-user-check"></i>
            </button>
            <button class="btn btn-sm btn-outline-danger" @click="removeUser(item.id)">
              <i class="fa-solid fa-trash"></i>
            </button>
          </td>
        </tr>
      </template>
      <template v-else>
        <tr><td colspan="5" class="text-center">Пользоветелей нет</td></tr>
      </template>
    </tbody>
  </table>

</template>

<script>
import { useUserStore } from "@/stores/user";
import userRoles from "@/helpers/userRoles";

export default {
  setup() {
    const userStore = useUserStore();
    userStore.getAll();

    return { 
      userStore,
    }
  },
  data() {
    return {
      usersOffset: 0, 
      usersCount: 20,
      usersRole: userRoles.ALL,
      userRoles,
    }
  },
  computed: {
    users() {
      return this.userStore.users;
    }
  },
  methods: {
    updateUsers() {
      this.userStore.getAll(this.usersOffset, this.usersCount, this.usersRole);
    },
    async removeUser(id) {
      await this.userStore.removeAdmin(id);
      this.updateUsers();
    },
    async editRole(id, role) {
      await this.userStore.editAdmin(id, role);
      this.updateUsers();
    }
  }
}
</script>