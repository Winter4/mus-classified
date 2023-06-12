<template>
  <div class="container-lg">
    <div class="row">

      <div class="col-3">
        <SidebarCategories />
        <SidebarManufacturers />
      </div>

      <div class="col-9">
        <h3 class="mt-2 mb-3">Все объявления</h3>
        
        <div class="row">
          <div class="col-4 mb-4" v-for="ad in advertisements">
            <Advertisement :ad="ad" />
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import SidebarCategories from '@/components/SidebarCategories.vue';
import SidebarManufacturers from '@/components/SidebarManufacturers.vue';
import Advertisement from '@/components/Advertisement.vue';

import { useAdvertisementsStore } from "@/stores/advertisements";

export default {
  components: {
    SidebarCategories,
    SidebarManufacturers,
    Advertisement,
  },
  setup() {
    let advertisementsStore = useAdvertisementsStore();
    advertisementsStore.getAll();

    return { 
      advertisementsStore,
      imageBaseUrl: `${import.meta.env.VITE_API_URL}/upload/images/`,
    }
  },
  computed: {
    advertisements() {
      return this.advertisementsStore.ads;
    }
  },
}
</script>