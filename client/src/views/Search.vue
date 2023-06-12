<template>
  <div class="container-lg">
    <Search />
    
    <h3 class="mt-2 my-3">Результаты поиска</h3>

    <div class="row mt-3">
      <template v-if="advertisements.length">
        <div class="col-3 mb-4" v-for="ad in advertisements">
          <Advertisement :ad="ad" />
        </div>
      </template>
      <h4 v-else>Объявлений не найдено</h4>
    </div>
  </div>
</template>

<script>
import Search from '@/components/Search.vue';
import Advertisement from '@/components/Advertisement.vue';

import { useAdvertisementsStore } from "@/stores/advertisements";

export default {
  components: {
    Search,
    Advertisement,
  },
  setup() {
    let advertisementsStore = useAdvertisementsStore();

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
  created() {
    this.advertisementsStore.getAll({
      categoryId: this.$route.query.categoryId,
      manufacturerId: this.$route.query.manufacturerId, 
      modelIds: Number(this.$route.query.modelId) || [], 
      searchQuery: this.$route.query.searchQuery
    });
  }
}
</script>