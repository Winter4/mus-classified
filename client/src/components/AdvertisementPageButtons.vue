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
      <button type="button" class="btn btn-primary w-100 mb-3" @click="publish(ad.id)">
        Опубликовать объявление
      </button>

      <button type="button" class="btn btn-outline-danger w-100" @click="refuse(ad.id)">
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
import { useAdvertisementsStore } from "@/stores/advertisements";

export default {
  props: ["ad"],
  components: {
    RouterLink,
  },
  setup() {
    const userStore = useUserStore();
    let advertisementsStore = useAdvertisementsStore();
    
    return { 
      userStore,
      userRoles,
      advertisementsStore,
      adModerStatus,
      adExpertStatus,
    };
  },
  methods: {
    async publish(id) {
      if (confirm("Вы действительно хотите опубликовать объявление?")) {
        await this.advertisementsStore.editModer(id, adModerStatus.PUBLISHED);
      }
    },
    async refuse(id) {
      if (confirm("Вы действительно хотите отказать в публикации?")) {
        let reason = prompt("Введите причину: ");
        await this.advertisementsStore.editModer(id, adModerStatus.REFUSED, reason);
      }
    },
    async removeAd(id) {
      if (confirm("Вы действительно хотите удалить объявление?")) {
        await this.advertisementsStore.remove(id);
        await this.advertisementsStore.getMy();
      }
    }
  }
}
</script>