import { defineStore } from "pinia";
import apiRequest from '@/helpers/apiRequest';
import router from '@/router';

export const useAdvertisementsStore = defineStore("advertisements", {
  state: () => ({
    ad: {},
    ads: [],
    moderAds: [],
    expertAds: [],
  }),

  actions: {
    async get(id) {
      let response = await apiRequest(
        "/advertisements/get?" + new URLSearchParams({ id }), 
        { method: 'GET', }
      );

      this.ad = await response.json();
    },
    async getAll({ offset = 0, count = 20, userId = 0, categoryId = 0, manufacturerId = 0, modelIds = [], searchQuery = '' } = {}) {
      let response = await apiRequest(
        "/advertisements/getAll?" + new URLSearchParams({ offset, count, userId, categoryId, manufacturerId, modelIds, searchQuery }), 
        { method: 'GET', }
      );

      this.ads = await response.json();
    },
    async getModer(offset = 0, count = 20) {
      let response = await apiRequest(
        "/advertisements/getModer?" + new URLSearchParams({ offset, count }), 
        { method: 'GET', }
      );

      this.moderAds = await response.json();
    },
    async editModer(id, moderStatus, moderReason = "") {
      let response = await apiRequest("/advertisements/editModer", {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id, moderStatus, moderReason }),
      })
      
      if (response.ok == true) {
        router.push({ name: 'personalModerAds' });
      }
    },
    async getExpert(offset = 0, count = 20) {
      let response = await apiRequest(
        "/advertisements/getExpert?" + new URLSearchParams({ offset, count }), 
        { method: 'GET', }
      );

      this.expertAds = await response.json();
    },
    async editExpert(id, expertStatus, expertReview) {
      let response = await apiRequest("/advertisements/editExpert", {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id, expertStatus, expertReview }),
      })
    },
    async requestReview(id) {
      return await apiRequest("/advertisements/requestReview", {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      })
    },
    async add(headline, description, price, categoryId, modelId, images) {
      let response = await apiRequest("/advertisements/add", {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ headline, description, price, categoryId, modelId, images }),
      })
      
      if (response.ok == true) {
        let ad = await response.json();
        router.push({ name: 'advertisement', params: { id: ad.id } });
      }
    },
    async edit(id, headline, description, price, categoryId, modelId, images) {
      let response = await apiRequest("/advertisements/edit", {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id, headline, description, price, categoryId, modelId, images }),
      })
      
      if (response.ok == true) {
        let ad = await response.json();
        router.push({ name: 'advertisement', params: { id: ad.id } });
      }
    },
    async remove(id) {
      await apiRequest(
        "/advertisements/remove",
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