<template>
  <div class="modal fade" id="messagesModal" tabindex="-1">
    <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Сообщения</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <div v-for="msg in messages" :key="msg.id" style="overflow: hidden">
            <div
              :class="
                'p-2 border rounded mb-2 border-secondary ' +
                (msg.fromId == userId ? 'float-start' : 'float-end')
              "
            >
              {{ msg.text }}
            </div>
          </div>
        </div>
        <div class="modal-footer d-block">
          <div class="row">
            <div class="col-10">
              <input
                v-model="message"
                type="text"
                class="form-control"
                placeholder="Введите сообщение"
              />
            </div>
            <div class="col-2">
              <button
                type="button"
                class="btn btn-primary"
                @click="sendMessage()"
              >
                Отп
              </button>
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
  props: ["userId"],
  setup() {
    const messageStore = useMessageStore();

    return {
      messageStore,
    };
  },

  data() {
    return {
      message: "",
      intervalId: null,
    };
  },
  computed: {
    messages() {
      return this.messageStore.messages || [];
    },
  },
  methods: {
    async sendMessage() {
      if (this.userId) {
        await this.messageStore.add(this.userId, this.message);
        this.message = "";
        this.messageStore.getAll(this.userId);
      }
    },
  },
  created() {
    // this.messageStore.getAll(this.userId);
    // clearInterval(this.intervalId);
    // this.intervalId = setInterval(() => {
    //   this.messageStore.getAll(this.userId);
    // }, 500);
  },
};
</script>
