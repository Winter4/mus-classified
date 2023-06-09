import { defineStore } from "pinia";
import apiRequest from '@/helpers/apiRequest';
import router from '@/router';

export const useAdvertisementsStore = defineStore("advertisements", {
  state: () => ({
    ad: {},
    ads: [],
  }),

  actions: {
    async get(id) {
      let response = await apiRequest(
        "/ads/get?" + new URLSearchParams({ id }), 
        { method: 'GET', }
      );

      this.ad = await response.json();
    },
    async getAll(offset = 0, count = 20) {
      let response = await apiRequest(
        "/ads/getAll?" + new URLSearchParams({ offset, count }), 
        { method: 'GET', }
      );

      this.ads = await response.json();
    },
    async getMy(offset = 0, count = 20) {
      let response = await apiRequest(
        "/ads/getMy?" + new URLSearchParams({ offset, count }), 
        { method: 'GET', }
      );

      this.ads = await response.json();
    },
    async add(headline, description, price, categoryId, modelId, images) {
      let response = await apiRequest("/ads/add", {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ headline, description, price, categoryId, modelId, images }),
      })
      
      if (response.ok == true) {
        let ad = await response.json();
        router.push({ name: 'advertisement', params: { id: ad.id} });
      }
    },
    async remove(id) {
      await apiRequest(
        "/ads/remove",
        { 
          method: 'DELETE', 
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id }),
        }
      );
    },
  },
});