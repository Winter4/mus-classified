<template>
  <div class="col-4 mb-4" v-for="ad in specialAds" :key="ad.id">
    <Advertisement :ad />
  </div>
</template>

<script setup>
import Advertisement from "@/components/Advertisement.vue";
import { computed } from "vue";

const props = defineProps(["ads"]);

const specialAds = computed(() => {
  return [...props.ads].sort(() => 0.5 - Math.random()).slice(0, 3);
});
</script>

<style lang="scss" scoped></style>
