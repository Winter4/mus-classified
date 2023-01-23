<template>
  <div class="container-lg">
    <div class="row">

      <div 
        v-for="ad in advertisements"
        class="col-3"
      >
        <div class="card">
          <img :src="imageBaseUrl + ad.Images[0].path" class="card-img-top">
          <div class="card-body">
            <h6 class="card-title">
              <RouterLink :to="{ name: 'advertisement', params: { id: ad.id } }" class="text-dark text-decoration-none stretched-link">
                {{ ad.headline }}
              </RouterLink>
            </h6>
            <h6 class="card-subtitle text-muted">{{ ad.price }}₽</h6>
          </div>
        </div>
      </div>
      
    </div>
  </div>
</template>

<script>
import { useAdvertisementsStore } from "@/stores/advertisements";

export default {
  setup() {
    let advertisementsStore = useAdvertisementsStore();
    advertisementsStore.loadAds();

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