<template>
  <div class="d-flex justify-content-between mb-3">
    <h4>Мои объявления</h4>
    <div>
      <RouterLink :to="{ name: 'advertisementAdd' }" class="btn btn-sm btn-primary">
        Добавить объявление!
      </RouterLink>
    </div>
  </div>

  <div class="row">

    <div 
      v-for="ad in advertisements"
      class="col-3"
    >
      <div class="card mb-4">
        <div 
          class="card-img-wrapper"
          :style="{ 'background-image': ad.Images?.[0] ? `url(${imageBaseUrl + ad.Images[0].path})` : 'none' }"
          >
        </div>
        <div class="card-body">
          <div class="title-wrapper mb-2">
            <h6 class="card-title">
              <RouterLink :to="{ name: 'advertisement', params: { id: ad.id } }" class="text-dark text-decoration-none">
                {{ ad.headline }}
              </RouterLink>
            </h6>
          </div>
          <div class="d-flex justify-content-between align-items-center">
            <h6 class="card-subtitle text-muted">{{ ad.price }}₽</h6>
            <div>
              <RouterLink :to="{ name: 'advertisementEdit', params: { id: ad.id } }" class="badge bg-secondary ad-btn me-1 text-decoration-none">
                <i class="fa-solid fa-pen"></i>
              </RouterLink>
              <span class="badge bg-danger ad-btn" @click="removeAd(ad.id)">
                <i class="fa-solid fa-trash"></i>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
    
  </div>
</template>

<script>
import { RouterLink } from 'vue-router';
import { useAdvertisementsStore } from "@/stores/advertisements";

export default {
  components: {
    RouterLink,
  },
  setup() {
    let advertisementsStore = useAdvertisementsStore();
    advertisementsStore.getMy();

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
      return this.advertisementsStore.myAds;
    }
  },
  methods: {
    editAd() {
      alert("editAd");
    },
    async removeAd(id) {
      if (confirm("Вы действительно хотите удалить объявление?")) {
        await this.advertisementsStore.remove(id);
        await this.advertisementsStore.getMy();
      }
    }
  }
}
</script>

<style>
.card-img-wrapper {
  height: 250px;
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
}
.ad-btn {
  cursor: pointer;
}
.ad-btn:hover {
  opacity: .8;
}
.title-wrapper {
  height: 40px;
  display: flex;
  align-items: center;
}
</style>