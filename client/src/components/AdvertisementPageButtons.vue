<template>
  <template v-if="userStore.user">
    <template v-if="ad?.User?.id == userStore.user.id">
      <RouterLink 
        :to="{ name: 'advertisementEdit', params: { id: ad.id } }" 
        class="btn btn-primary w-100 mb-3">
        Редактировать объявление
      </RouterLink>

      <button type="button" class="btn btn-outline-danger w-100" @click="removeAd(ad.id)">
        Удалить объявление
      </button>
    </template>

    <template v-else-if="userStore.user.role == userRoles.MODER && ad.moderStatus == adModerStatus.CREATED">
      <button type="button" class="btn btn-primary w-100 mb-3">
        Опубликовать объявление
      </button>

      <button type="button" class="btn btn-outline-danger w-100">
        Отказать в публикации
      </button>
    </template>

    <template v-else-if="userStore.user.role == userRoles.EXPERT && ad.expertStatus == adExpertStatus.REQUESTED">
      <button type="button" class="btn btn-primary w-100">
        Оставить экспертную оценку
      </button>
    </template>

    <template v-else-if="ad?.User?.id != userStore.user.id">
      <button type="button" class="btn btn-primary w-100">
        Написать сообщение
      </button>
    </template>
  </template>
</template>

<script>
import { RouterLink } from 'vue-router';
import { useUserStore } from "@/stores/user";
import userRoles from "@/helpers/userRoles";
import adModerStatus from "@/helpers/adModerStatus";
import adExpertStatus from "@/helpers/adExpertStatus";

export default {
  props: ["ad"],
  components: {
    RouterLink,
  },
  setup() {
    const userStore = useUserStore();
    return { 
      userStore,
      userRoles,
      adModerStatus,
      adExpertStatus,
    };
  },
  methods: {
    async removeAd(id) {
      if (confirm("Вы действительно хотите удалить объявление?")) {
        await this.advertisementsStore.remove(id);
        await this.advertisementsStore.getMy();
      }
    }
  }
}
</script>