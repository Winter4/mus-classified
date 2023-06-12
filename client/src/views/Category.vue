<template>
  <div class="container-lg">
    <div class="row">

      <div class="col-3">
        <RouterLink :to="{ name: 'main' }" class="btn btn-sm btn-primary w-100 mt-2 mb-3">
          На главную
        </RouterLink>
        
        <SidebarCategories />
        <SidebarManufacturers />
      </div>

      <div class="col-9">
        <h3 class="mt-2 mb-3">Категория: {{ category.name }}</h3>
        
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

import { useCategoriesStore } from "@/stores/categories";
import { useAdvertisementsStore } from "@/stores/advertisements";

export default {
  props: ['id'],
  components: {
    SidebarCategories,
    SidebarManufacturers,
    Advertisement,
  },
  setup() {
    let сategoriesStore = useCategoriesStore();
    let advertisementsStore = useAdvertisementsStore();

    return { 
      сategoriesStore,
      advertisementsStore,
      imageBaseUrl: `${import.meta.env.VITE_API_URL}/upload/images/`,
    }
  },
  computed: {
    category() {
      return this.сategoriesStore.category;
    },
    advertisements() {
      return this.advertisementsStore.ads;
    }
  },
  created() {
    this.сategoriesStore.get(this.id);
    this.advertisementsStore.getAll({categoryId: this.id});
  }
}
</script>