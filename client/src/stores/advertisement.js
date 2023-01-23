import { defineStore } from "pinia";
import apiRequest from '@/helpers/apiRequest';

export const useAdvertisementStore = defineStore("advertisement", {
  state: () => ({
    ad: [],
  }),

  actions: {
    async loadAd(id) {
      let response = await apiRequest(
        "/ads/get?" + new URLSearchParams({ id }), 
        { method: 'GET', }
      );

      this.ad = await response.json();
    },
  },
});