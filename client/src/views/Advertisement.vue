<template>
  <div class="container-lg">

    <template v-if="advertisement?.User?.id == userStore?.user?.id">
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

          <div class="row d-flex mt-3" v-if="advertisement?.Images?.length > 1">

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
        <div class="row mt-4">
          <div class="col-12">
            <div class="card card-body description-card">
              {{ advertisement.description }}
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

        <div v-if="advertisement.expertStatus == adExpertStatus.REVIEWED" class="card border-success mb-3">
          <div class="card-header text-success border-success">Экспертная оценка</div>
          <div class="card-body">
            <p class="card-text text-success">{{ advertisement.expertReview }}</p>
          </div>
        </div>

        <div class="bg-primary bg-opacity-25 p-2 rounded mt-3">
          <h3 class="card-header border-success mb-3 bg-primary rounded p-2 d-flex justify-content-between text-white ali gn-items-center">
            Рейтинг товара:
            <div class="d-flex align-items-center gap-2">
              {{rating}}
              <i class="fa-solid fa-star me-2" />
            </div>
          </h3>
          <div class="card-body">
            <div v-for="review in reviews" :key="review.id" class="card mb-3">
              <h4 class="card-header">{{review.name}}</h4>
              <div class="card-body">
                <p class="card-text">{{review.description}}</p>
              </div>
              <div class="card-body">
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup>
import { useUserStore } from "@/stores/user";
import { useAdvertisementsStore } from "@/stores/advertisements";
import {computed, onBeforeMount, ref} from "vue";
import adExpertStatus from "@/helpers/adExpertStatus";
import adModerStatus from "@/helpers/adModerStatus";
import AdvertisementPageButtons from "@/components/AdvertisementPageButtons.vue";
import mock_reviews from "@/mocks/reviews.json";

// Определение пропсов
const props = defineProps({
  id: {
    type: [String, Number],
    required: true,
  },
  rating: {
    type: [String, Number],
    required: true,
  }
});

// Использование стора
const userStore = useUserStore();
const advertisementsStore = useAdvertisementsStore();

const reviews = ref([]);

// Базовый URL для изображений
const imageBaseUrl = `${import.meta.env.VITE_API_URL}/upload/images/`;

// Компьютед свойство для объявления
const advertisement = computed(() => advertisementsStore.ad);

// Метод, который будет вызываться при монтировании компонента
onBeforeMount(async () => {
  await advertisementsStore.get(props.id);

  console.log(props.rating)

  if (advertisement.value.headline.toLowerCase().includes('гитара')){
    reviews.value = mock_reviews.filter(review => (review.for === 'ac_guitar' && review.rating == props.rating));
  }
  else if (advertisement.value.headline.toLowerCase().includes('электрогитара')){
    reviews.value = mock_reviews.filter(review => (review.for === 'el_guitar' && review.rating == props.rating))
  }
  else if (advertisement.value.headline.toLowerCase().includes('барабаны')){
    reviews.value = mock_reviews.filter(review => (review.for === 'drums' && review.rating == props.rating))
  }
});
</script>

<style scoped>
.image-display {
  height: 60vh;
}
.image-slide {
  height: 100%;
  display: block;
  margin: 0 auto;
  object-fit: contain;
  width: 100%;
  height: 100%;
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