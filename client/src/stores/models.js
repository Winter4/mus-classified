import { defineStore } from "pinia";
import apiRequest from '@/helpers/apiRequest';

export const useModelsStore = defineStore("models", {
  state: () => ({
    models: [],
  }),

  actions: {
    async getAll(manufacturerId = 0) {
      let response = await apiRequest(
        "/model/getAll?" + new URLSearchParams({ manufacturerId }), 
        { method: 'GET', }
      );

      this.models = await response.json();
    },
    async add(manufacturerId, name) {
      await apiRequest(
        "/model/add",
        { 
          method: 'POST', 
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ manufacturerId, name }),
        }
      );

      return await this.getAll();
    },
    async remove(id) {
      await apiRequest(
        "/model/remove",
        { 
          method: 'DELETE', 
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id }),
        }
      );

      return await this.getAll();
    },
  },
});