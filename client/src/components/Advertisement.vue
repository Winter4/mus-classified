<template>
  <div class="card">

    <div 
      class="card-img-wrapper"
      :style="{ 'background-image': ad.Images?.[0] ? `url(${imageBaseUrl + ad.Images[0].path})` : 'none' }"
      >
    </div>

    <div class="card-body">
      <div class="title-wrapper mb-2">
        <h6 class="card-title">
          <RouterLink :to="{ name: 'advertisement', params: { id: ad.id } }" class="text-dark text-decoration-none stretched-link">
            {{ ad.headline }}
          </RouterLink>
        </h6>
      </div>
      <h6 class="card-subtitle text-muted d-flex justify-content-between">
        <span>{{ ad.InstrumentModel.Manufacturer.name }} {{ ad.InstrumentModel.name }}</span>
        <span>{{ ad.price }}₽</span>
      </h6>
    </div>

  </div>
</template>

<script>
export default {
  props: ['ad'],
  setup() {
    return { 
      imageBaseUrl: `${import.meta.env.VITE_API_URL}/upload/images/`,
    }
  },
  computed: {
  },
}
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
</style>