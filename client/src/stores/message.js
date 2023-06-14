import { defineStore } from "pinia";
import apiRequest from '@/helpers/apiRequest';

export const useMessageStore = defineStore("message", {
  state: () => ({
    data: [],
    messages: [],
  }),

  actions: {
    async add(userId, text) {
      return await apiRequest("/message/add", {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId, text}),
      })
    },
    async getAll(userId) {
      let response = await apiRequest(
        "/message/getAll?" + new URLSearchParams({ userId }), 
        { method: 'GET', }
      );

      this.messages = await response.json();
    },
    async getDialogs() {
      let response = await apiRequest(
        "/message/getDialogs", 
        { method: 'GET', }
      );

      this.dialogs = await response.json();
    },
  },
});