<template>
  <div class="card bg cursor" @click="router.push({name: 'advertisement', params: {id: ad.id, rating: currentRating}})">

    <div 
      class="card-img-wrapper"
      :style="{ 'background-image': ad.Images?.[0] ? `url(${imageBaseUrl + ad.Images[0].path})` : 'none' }"
      >
    </div>

    <div class="card-body">
      <div class="title-wrapper mb-2">
        <h6 class="card-title d-flex flex-column">
          <div class="text-dark text-decoration-none">
              {{ ad.headline }}
          </div>

          <div class="rating mt-2">
            <span
                v-for="index in 5"
                :key="index"
                class="star"
                :class="{ filled: index <= currentRating }"
            >
              ★
            </span>
          </div>
        </h6>
      </div>
      <h6 class="card-subtitle text-muted d-flex justify-content-between mt-2">
        <span>{{ ad.InstrumentModel.Manufacturer.name }} {{ ad.InstrumentModel.name }}</span>
        <span>{{ ad.price }}₽</span>
      </h6>
    </div>

  </div>
</template>

<script setup>
import {defineProps, ref} from 'vue';
import router from "@/router";

// Определение пропсов с использованием defineProps
const props = defineProps({
  ad: Object
});

// Объявляем реактивные переменные
const currentRating = ref(Math.floor(Math.random() * (5-3+1) + 3));

const setRating = (index) => {
  currentRating.value = index;
};

// Определение переменной для базового URL изображения
const imageBaseUrl = `${import.meta.env.VITE_API_URL}/upload/images/`;
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
.rating {
  font-size: 2rem;
  color: #ddd; /* Цвет неокрашенных звезд */
  user-select: none;
}

.star {
  cursor: pointer;
  transition: color 0.2s;
}

.star.filled {
  color: rgb(var(--bs-primary-rgb));
}

.cursor {
  cursor: pointer;
}
</style>