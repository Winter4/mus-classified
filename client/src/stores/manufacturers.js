import { defineStore } from "pinia";
import apiRequest from '@/helpers/apiRequest';

export const useManufacturersStore = defineStore("manufacturers", {
  state: () => ({
    manufacturers: [],
  }),

  actions: {
    async getAll(offset = 0, count = 20) {
      let response = await apiRequest(
        "/manufacturer/getAll?" + new URLSearchParams({ offset, count }), 
        { method: 'GET', }
      );

      this.manufacturers = await response.json();
    },
    async add(name) {
      await apiRequest(
        "/manufacturer/add",
        { 
          method: 'POST', 
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name }),
        }
      );

      return await this.getAll();
    },
    async remove(id) {
      await apiRequest(
        "/manufacturer/remove",
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