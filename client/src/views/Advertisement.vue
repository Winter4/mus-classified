<template>
  <div class="container-lg">

    <template v-if="advertisement?.User?.id == userStore.user.id">
      <div v-if="advertisement.moderStatus == adModerStatus.CREATED" class="card text-dark bg-warning mb-3">
        <div class="card-body">
          <h5 class="card-title">Объявление на рассмотрении</h5>
          <p class="card-text">Ваше объявление находится на рассмотрении. Пожалуйста, пожодите, пока модераторы рассмотрят ваше объявление.</p>
        </div>
      </div>

      <div v-if="advertisement.moderStatus == adModerStatus.REFUSED" class="card text-dark bg-danger mb-3">
        <div class="card-body">
          <h5 class="card-title">Объявлению отказано в публикации</h5>
          <p class="card-text">Вашему объявлению отказано в публикации.
            Отредактируйте его согласно правилам или предъявленным требованиям, и модераторы снова рассмотрят его. 
            Причину отказа вы можете увидеть ниже:</p>
          <p class="card-text">{{ advertisement.moderReason }}</p>
        </div>
      </div>
    </template>

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
            <template v-if="advertisement?.Images?.length">
              <div class="image-display">
                <img class="image-slide" :src="imageBaseUrl + advertisement.Images[0].path" />
              </div>
            </template>
            <template v-else>
            </template>

          <div class="row d-flex mt-3">

            <div 
              v-for="image in advertisement.Images"
              class="col-2 mb-3"
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

        <AdvertisementPageButtons :ad="advertisement" />
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
import AdvertisementPageButtons from "@/components/AdvertisementPageButtons.vue";
import { useUserStore } from "@/stores/user";
import { useAdvertisementsStore } from "@/stores/advertisements";
import adModerStatus from "@/helpers/adModerStatus";

export default {
  props: ['id'],
  components: {
    AdvertisementPageButtons,
  },
  setup() {
    const userStore = useUserStore();
    let advertisementsStore = useAdvertisementsStore();

    return { 
      userStore,
      advertisementsStore,
      adModerStatus,
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
.image-display {
  height: 60vh;
}
.image-slide {
  height: 100%;
  display: block;
  margin: 0 auto;
}
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