import { defineStore } from "pinia";
import apiRequest from '@/helpers/apiRequest';

export const useAdvertisementsStore = defineStore("advertisements", {
  state: () => ({
    ads: [],
  }),

  actions: {
    async loadAds(offset = 0, count = 20) {
      let response = await apiRequest(
        "/ads/getAll?" + new URLSearchParams({ offset, count }), 
        { method: 'GET', }
      );

      this.ads = await response.json();
    },
  },
});