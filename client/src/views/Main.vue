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
          <div class="col-4" v-for="ad in advertisements">
            <div class="card mb-4">

              <div 
                class="card-img-wrapper"
                :style="{ 'background-image': ad.Images?.[0] ? `url(${imageBaseUrl + ad.Images[0].path})` : 'none' }"
                >
              </div>

              <div class="card-body">
                <div class="title-wrapper mb-2">
                  <h6 class="card-title">
                    <RouterLink :to="{ name: 'advertisement', params: { id: ad.id } }" class="text-dark text-decoration-none stretched-link">
                      {{ ad.headline }}
                    </RouterLink>
                  </h6>
                </div>
                <h6 class="card-subtitle text-muted">{{ ad.price }}₽</h6>
              </div>

            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import SidebarCategories from '@/components/SidebarCategories.vue';
import SidebarManufacturers from '@/components/SidebarManufacturers.vue';

import { useAdvertisementsStore } from "@/stores/advertisements";

export default {
  components: {
    SidebarCategories,
    SidebarManufacturers,
  },
  setup() {
    let advertisementsStore = useAdvertisementsStore();
    advertisementsStore.getAll();

    return { 
      advertisementsStore,
      imageBaseUrl: `${import.meta.env.VITE_API_URL}/upload/images/`,
    }
  },
  data() {
    return {
    }
  },
  computed: {
    advertisements() {
      return this.advertisementsStore.ads;
    }
  },
  methods: {
  }
}
</script>

<style>
.card-img-wrapper {
  height: 300px;
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
}
.title-wrapper {
  height: 40px;
  display: flex;
  align-items: center;
}
</style>