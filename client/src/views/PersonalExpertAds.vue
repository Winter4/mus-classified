<template>
  <div class="d-flex justify-content-between mb-3">
    <h4>Запросы на экспертную оценку</h4>
  </div>

  <div class="row">

    <div class="col-3 mb-4" v-for="ad in advertisements">
      <Advertisement :ad="ad" />
    </div>
    
  </div>
</template>

<script>
import Advertisement from '@/components/Advertisement.vue';

import { RouterLink } from 'vue-router';
import { useAdvertisementsStore } from "@/stores/advertisements";

export default {
  components: {
    Advertisement,
    RouterLink,
  },
  setup() {
    let advertisementsStore = useAdvertisementsStore();
    advertisementsStore.getExpert();

    return { 
      advertisementsStore,
      imageBaseUrl: `${import.meta.env.VITE_API_URL}/upload/images/`,
    }
  },
  computed: {
    advertisements() {
      return this.advertisementsStore.expertAds;
    }
  }
}
</script>