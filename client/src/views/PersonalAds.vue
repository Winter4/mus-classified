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

    <div class="col-3 mb-4" v-for="ad in advertisements">
      <Advertisement :ad="ad" />
    </div>
    
  </div>
</template>

<script>
import Advertisement from '@/components/Advertisement.vue';
import { RouterLink } from 'vue-router';
import { useUserStore } from "@/stores/user";
import { useAdvertisementsStore } from "@/stores/advertisements";

export default {
  components: {
    RouterLink,
    Advertisement,
  },
  setup() {
    const userStore = useUserStore();

    let advertisementsStore = useAdvertisementsStore();
    advertisementsStore.getAll({ userId: userStore.user.id });

    return { 
      userStore,
      advertisementsStore,
      imageBaseUrl: `${import.meta.env.VITE_API_URL}/upload/images/`,
    }
  },
  computed: {
    advertisements() {
      return this.advertisementsStore.ads;
    }
  }
}
</script>