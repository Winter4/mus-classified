<template>
  <div class="container-lg">
    <Search />

    <div class="row mt-3">
      <div class="col-3">
        <SidebarCategories />
        <SidebarManufacturers />
      </div>

      <div class="col-9">
        <div class="row" v-if="userStore.user">
          <h3 class="mt-2 mb-3">Специально для вас!</h3>
          <Special4U :ads="advertisements" />
        </div>
        <div class="row">
          <h3 class="mt-2 mb-3">Все объявления</h3>
          <div class="col-4 mb-4" v-for="ad in advertisements">
            <Advertisement :ad="ad" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Search from "@/components/Search.vue";
import SidebarCategories from "@/components/SidebarCategories.vue";
import SidebarManufacturers from "@/components/SidebarManufacturers.vue";
import Advertisement from "@/components/Advertisement.vue";

import { useAdvertisementsStore } from "@/stores/advertisements";
import { useUserStore } from "@/stores/user";
import Special4U from "@/components/Special4U.vue";

export default {
  components: {
    Search,
    SidebarCategories,
    SidebarManufacturers,
    Advertisement,
    Special4U,
  },
  setup() {
    let advertisementsStore = useAdvertisementsStore();
    advertisementsStore.getAll();

    let userStore = useUserStore();

    return {
      advertisementsStore,
      userStore,
      imageBaseUrl: `${import.meta.env.VITE_API_URL}/upload/images/`,
    };
  },
  computed: {
    advertisements() {
      return this.advertisementsStore.ads;
    },
  },
};
</script>
