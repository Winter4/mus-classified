import { defineStore } from "pinia";
import apiRequest from '@/helpers/apiRequest';

export const useCategoriesStore = defineStore("categories", {
  state: () => ({
    categories: [],
  }),

  actions: {
    async getAll() {
      let response = await apiRequest(
        "/category/getAll", 
        { method: 'GET', }
      );

      this.categories = await response.json();
    },
    async add(name) {
      await apiRequest(
        "/category/add",
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
        "/category/remove",
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