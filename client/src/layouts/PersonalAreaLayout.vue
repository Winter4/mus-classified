<script setup>
import { RouterView } from 'vue-router';
import PersonalMenu from '@/components/PersonalMenu.vue';
</script>

<template>
  <div class="container-lg">
    <div class="row">
      <div class="col-2">
        <PersonalMenu />
      </div>
      
      <div class="col-10">
        <RouterView />
      </div>
    </div>
  </div>
</template>