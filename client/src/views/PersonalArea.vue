<template>
  <h4>Личный кабинет</h4>

  <div class="row">
    <div class="col-4">
      Пользователь:
    </div>
    <div class="col-8">
      {{ userStore.user.firstName }} {{ userStore.user.lastName }} 
    </div>
  </div>

  <div class="row">
    <div class="col-4">
      Объявлений:
    </div>
    <div class="col-8">
      5
    </div>
  </div>

  <div class="row">
    <div class="col-4">
      Общее количество просмотров:
    </div>
    <div class="col-8">
      356
    </div>
  </div>

  <div class="row">
    <div class="col-4">
      Количество успешных сделок:
    </div>
    <div class="col-8">
      3
    </div>
  </div>

  <div class="row">
    <div class="col-4">
      Сумма успешных сделок:
    </div>
    <div class="col-8">
      56000₽
    </div>
  </div>
</template>

<script>
import { useUserStore } from "@/stores/user";

export default {
  setup() {
    const userStore = useUserStore();
    return { 
      userStore 
    };
  }
}
</script>