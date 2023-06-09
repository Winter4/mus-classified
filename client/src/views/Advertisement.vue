<template>
  <div class="container-lg">
    <div class="row mb-4">
      <div class="col-8">
        <h1>{{ advertisement.headline }}</h1>
      </div>
      <div class="col-4">
        <h1>{{ advertisement.price }}₽</h1>
      </div>
    </div>
    <div class="row mb-4">
      <div class="col-8">
        <div class="card card-body pb-0">
          <div class="row d-flex">
            <div 
              v-for="image in advertisement.Images"
              class="col-6 mb-3"
            >
              <div 
                class="card card-image card-body card-buttons flex-row justify-content-center align-items-center"
                :style="{ 'background-image': 'url(' + imageBaseUrl + image.path + ')' }"
              >
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-4">
        <ul v-if="advertisement?.User" class="list-group mb-3">
          <li class="list-group-item">
            <h5 class="my-0">{{ advertisement.User.firstName }} {{ advertisement.User.lastName }}</h5>
            <small class="text-muted">Продавец</small>
          </li>
          <li class="list-group-item">
            <h5 class="my-0">{{ advertisement.User.city }}</h5>
            <small class="text-muted">Город</small>
          </li>
          <li class="list-group-item">
            <h5 class="my-0">{{ advertisement.User.phoneNumber }}</h5>
            <small class="text-muted">Телефон</small>
          </li>
        </ul>
      </div>
    </div>
    <div class="row">
      <div class="col-8">
        <div class="card card-body description-card">
          {{ advertisement.description }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useAdvertisementsStore } from "@/stores/advertisements";

export default {
  props: ['id'],
  setup() {
    let advertisementsStore = useAdvertisementsStore();

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
    advertisement() {
      return this.advertisementsStore.ad;
    },
  },
  created() {
    this.advertisementsStore.get(this.id)
  },
}
</script>

<style scoped>
.card-image {
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
}
.card-image:before {
  content: '';
  padding-bottom: 100%;
}
.description-card {
  min-height: 200px;
}
</style>