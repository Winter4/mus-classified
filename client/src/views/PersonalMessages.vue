<template>
  <h4>Мои сообщения</h4>
  <div class="row">
    <div class="col-4">
      <ul class="list-group">
        <li 
          v-for="user in dialogs" 
          @click="selectUser(user)"
          :class="'list-group-item list-group-item-action ' + (selectedUser?.id == user.id ? 'active' : '')">
          {{ user.firstName }} {{ user.lastName }}
        </li>
      </ul>
    </div>
    <div class="col-8">
      <div :class="'card ' + (selectedUser != null ? 'd-flex' : 'd-none')">
        <div class="card-body">
          <div class="messages-wrapper p-3">
            
            <div 
              v-for="msg in messages"
              style="overflow: hidden;"
            >
              <div 
                :class="'p-2 border rounded mb-2 border-secondary ' + (msg.fromId == selectedUser?.id ? 'float-start' : 'float-end') ">
                {{ msg.text }}
              </div>
            </div>

          </div>

          <div class="row">
            <div class="col-10">
              <input v-model="message" type="text" class="form-control" placeholder="Введите сообщение">
            </div>
            <div class="col-2">
              <button type="button" class="btn btn-primary w-100" @click="sendMessage()">Отп</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useMessageStore } from "@/stores/message";

export default {
  setup() {
    const messageStore = useMessageStore();
    messageStore.getDialogs();

    return { 
      messageStore,
    }
  },
  data() {
    return {
      selectedUser: null,
      message: '',
      intervalId: null,
    }
  },
  computed: {
    dialogs() {
      return this.messageStore.dialogs;
    },
    messages() {
      return this.messageStore.messages;
    }
  },
  methods: {
    selectUser(user) {
      this.selectedUser = user;
      
      this.messageStore.getAll(user.id);

      clearInterval(this.intervalId);
      this.intervalId = setInterval(() => {
        this.messageStore.getAll(user.id);
      }, 500);
    },
    async sendMessage() {
      await this.messageStore.add(this.selectedUser.id, this.message);
      this.message = '';
      this.messageStore.getAll(this.userId);
    }
  },
  // created() {
  //   this.messageStore.getAll(this.userId);
  //   let intervalID = setInterval(() => {
  //     this.messageStore.getAll(this.userId);
  //   }, 500);
  // },
}
</script>

<style>
.messages-wrapper {
  height: 50vh;
  overflow-y: auto;
}
</style>