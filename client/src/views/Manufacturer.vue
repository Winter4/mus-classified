<template>
  <div class="container-lg">
    <div class="row">

      <div class="col-3">
        <RouterLink :to="{ name: 'main' }" class="btn btn-sm btn-primary w-100 mt-2 mb-3">
          На главную
        </RouterLink>
        
        <SidebarModels :manufacturerId="id" @checkedModels="onCheckModels"/>
      </div>

      <div class="col-9">
        <h3 class="mt-2 mb-3">Производитель: {{ manufacturer.name }}</h3>
        
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
import SidebarModels from '@/components/SidebarModels.vue';
import Advertisement from '@/components/Advertisement.vue';

import { useManufacturersStore } from "@/stores/manufacturers";
import { useAdvertisementsStore } from "@/stores/advertisements";

export default {
  props: ['id'],
  components: {
    SidebarModels,
    Advertisement,
  },
  setup() {
    let manufacturersStore = useManufacturersStore();
    let advertisementsStore = useAdvertisementsStore();

    return { 
      manufacturersStore,
      advertisementsStore,
      imageBaseUrl: `${import.meta.env.VITE_API_URL}/upload/images/`,
    }
  },
  data() {
    return {
    }
  },
  computed: {
    manufacturer() {
      return this.manufacturersStore.manufacturer;
    },
    advertisements() {
      return this.advertisementsStore.ads;
    }
  },
  created() {
    this.manufacturersStore.get(this.id);
    this.advertisementsStore.getAll({manufacturerId: this.id});
  },
  methods: {
    onCheckModels(modelIds) {
      this.advertisementsStore.getAll({ manufacturerId: this.id, modelIds });
    }
  }
}
</script>