import { defineStore } from "pinia";
import apiRequest from '@/helpers/apiRequest';

export const useCategoriesStore = defineStore("categories", {
  state: () => ({
    category: {},
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
    async get(id) {
      let response = await apiRequest(
        "/category/get?" + new URLSearchParams({ id }), 
        { method: 'GET', }
      );

      this.category = await response.json();
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