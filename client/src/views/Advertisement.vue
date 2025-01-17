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
        <h2 class="my-2">Описание: </h2>
        <div class="card card-body description-card">
          {{ advertisement.description }}
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
          <h3 class="card-header border-success mb-3 bg-primary rounded p-2 d-flex justify-content-between text-white align-items-center">Популярное в комплекте <i class="fa-solid fa-star me-2"></i></h3>
          <div class="card-body" v-if="accessories.length > 0">
            <div v-for="item in accessories" class="card mb-3">
<!--              <h4 class="card-header">{{accessory.name}}</h4>-->
<!--              <img :src="`/mocks/${accessory.image}`" class="card-img-top" alt="Изображение товара">-->
<!--              <div class="card-body">-->
<!--                <p class="card-text">{{accessory.description}}</p>-->
<!--              </div>-->
<!--              <div class="card-body">-->
<!--                <p class="card-text">-->
<!--                  Продавец: {{accessory.contact.name}}-->
<!--                </p>-->
<!--                <p class="d-flex justify-content-between">-->
<!--                  <button class="btn btn-primary d-flex align-items-center" @click.once="clickAlert('mail', accessory.id)">Написать <i class="fa-solid fa-envelope ms-2"/></button>-->
<!--                  <button class="btn btn-primary d-flex align-items-center" @click.once="clickAlert('phone', accessory.id)">Позвонить <i class="fa-solid fa-phone ms-2"/></button>-->
<!--                </p>-->
<!--              </div>-->
              <Advertisement :ad="item"/>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import AdvertisementPageButtons from "@/components/AdvertisementPageButtons.vue";
import Advertisement from "@/components/Advertisement.vue";
import { useUserStore } from "@/stores/user";
import { useAdvertisementsStore } from "@/stores/advertisements";
import adModerStatus from "@/helpers/adModerStatus";
import adExpertStatus from "@/helpers/adExpertStatus";
import {computed, onBeforeMount, onMounted, ref} from "vue";

const props = defineProps(['id']);
const userStore = useUserStore();
const advertisementsStore = useAdvertisementsStore();

const accessories = ref([])

const imageBaseUrl = `${import.meta.env.VITE_API_URL}/upload/images/`;
const advertisement = computed(() => advertisementsStore.ad);

// const clickAlert = (type, id) => {
//   if (type === 'mail'){
//     alert(`Почта продавца: ${accessories[id - 1].contact.email}`);
//
//   }
//   else {
//     alert(`Телефон продавца: ${accessories[id - 1].contact.phone}`);
//   }
// }

onBeforeMount(async ()=> {
  accessories.value = [Math.floor(Math.random()*10 + 1), Math.floor(Math.random()*10 + 1)];
  while (accessories.value[0] === accessories.value[1]) {
    accessories.value[0] = Math.floor(Math.random()*10 + 1)
  }
  const items = [];
  for (let item of accessories.value) {
    items.push(advertisementsStore.ads[item - 1]);
  }
  accessories.value = items;
  await advertisementsStore.get(props.id);
})
</script>

<style scoped>
.image-display {
  height: 60vh;
}
.image-slide {
  display: block;
  margin: auto;
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

.card-img-top{
  object-fit: contain;
  height: 166px;
}
</style>