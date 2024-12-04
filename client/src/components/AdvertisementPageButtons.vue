<template>
  <template v-if="userStore.user">
    <template v-if="ad?.User?.id == userStore.user.id">
      <RouterLink
        :to="{ name: 'advertisementEdit', params: { id: ad.id } }"
        class="btn btn-primary w-100 mb-3"
      >
        Редактировать объявление
      </RouterLink>

      <button
        type="button"
        class="btn btn-outline-danger w-100"
        @click="removeAd()"
      >
        Удалить объявление
      </button>
    </template>

    <template
      v-else-if="
        userStore.user.role == userRoles.MODER &&
        ad.moderStatus == adModerStatus.CREATED
      "
    >
      <button
        type="button"
        class="btn btn-primary w-100 mb-3"
        @click="publish()"
      >
        Опубликовать объявление
      </button>

      <button
        type="button"
        class="btn btn-outline-danger w-100"
        @click="refuse()"
      >
        Отказать в публикации
      </button>
    </template>

    <template
      v-else-if="
        userStore.user.role == userRoles.EXPERT &&
        ad.expertStatus == adExpertStatus.REQUESTED
      "
    >
      <button type="button" class="btn btn-primary w-100" @click="setReview()">
        Оставить экспертную оценку
      </button>
    </template>

    <template
      v-else-if="
        userStore.user.role == userRoles.USER &&
        ad?.User?.id != userStore.user.id
      "
    >
      <button
        type="button"
        class="btn btn-primary w-100 mb-3"
        data-bs-toggle="modal"
        data-bs-target="#messagesModal"
      >
        Написать сообщение
      </button>

      <MessagesModal v-if="ad?.User?.id" :userId="ad?.User?.id" />

      <button
        v-if="ad?.expertStatus == adExpertStatus.CREATED"
        type="button"
        class="btn btn-primary w-100"
        @click="requestReview()"
      >
        Запросить экспертную оценку
      </button>
      <div
        v-else-if="ad?.expertStatus == adExpertStatus.REQUESTED"
        class="card text-white bg-success"
      >
        <div class="card-body">
          Экспертная оценка объявления скоро появится!
        </div>
      </div>
    </template>
  </template>

  <div v-else class="card">
    <div class="card-body">
      Зарегистрируйтесь или войдите в систему, чтобы написать сообщение продавцу
      или запросить экспертную оценку объявления.
      <button
        type="button"
        class="btn btn-primary w-100 mb-3"
        data-bs-toggle="modal"
        data-bs-target="#messagesModal"
      >
        Написать сообщение
      </button>

      <MessagesModal v-if="ad?.User?.id" :userId="{}" />
    </div>
  </div>
</template>

<script>
import { RouterLink } from "vue-router";
import MessagesModal from "@/components/MessagesModal.vue";
import { useUserStore } from "@/stores/user";
import userRoles from "@/helpers/userRoles";
import adModerStatus from "@/helpers/adModerStatus";
import adExpertStatus from "@/helpers/adExpertStatus";
import { useAdvertisementsStore } from "@/stores/advertisements";
import router from "@/router";

export default {
  props: ["ad"],
  components: {
    RouterLink,
    MessagesModal,
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
    async requestReview() {
      if (confirm("Вы действительно хотите запросить экспертную оценку?")) {
        await this.advertisementsStore.requestReview(this.ad.id);
        this.$router.go();
      }
    },
    async setReview() {
      if (confirm("Вы действительно хотите оставить экспертную оценку?")) {
        let review = prompt("Введите текст экспертной оценки: ");
        await this.advertisementsStore.editExpert(
          this.ad.id,
          adExpertStatus.REVIEWED,
          review
        );
        this.$router.go();
      }
    },
    async publish() {
      if (confirm("Вы действительно хотите опубликовать объявление?")) {
        await this.advertisementsStore.editModer(
          this.ad.id,
          adModerStatus.PUBLISHED
        );
      }
    },
    async refuse() {
      if (confirm("Вы действительно хотите отказать в публикации?")) {
        let reason = prompt("Введите причину: ");
        await this.advertisementsStore.editModer(
          this.ad.id,
          adModerStatus.REFUSED,
          reason
        );
      }
    },
    async removeAd() {
      if (confirm("Вы действительно хотите удалить объявление?")) {
        await this.advertisementsStore.remove(this.ad.id);
        router.push({ name: "personalAds" });
      }
    },
  },
};
</script>
