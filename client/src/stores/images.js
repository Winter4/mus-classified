import { defineStore } from "pinia";
import apiRequest from '@/helpers/apiRequest';

export const useImagesStore = defineStore("images", {
  state: () => ({
    ads: [],
  }),

  actions: {
    async upload(image) {
      let data = new FormData();
      data.append('image', image);

      let resp = await apiRequest("/images/upload", {
        method: 'POST',
        body: data
      });

      if (resp.ok == true) 
        return await response.json();
      else return false;
    }
  },
});