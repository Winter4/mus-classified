<template>
  <div class="accordion mb-3" id="categoriesAccordion">
    <div class="accordion-item">
      <div class="accordion-header">
        <button class="accordion-button bg-primary" type="button" data-bs-toggle="collapse" data-bs-target="#categoriesAccordionBody" aria-expanded="true" aria-controls="categoriesAccordionBody">
          <h5 class="card-title m-0 text-white">Категории</h5>
        </button>
      </div>
      <div id="categoriesAccordionBody" class="accordion-collapse collapse show" data-bs-parent="#categoriesAccordion">
        <div class="accordion-body p-0">
          <ul class="list-group list-group-flush"> 
            <RouterLink 
              v-for="item in categories"
              :key="item.id"
              :to="{ name: 'category', params: { id: item.id } }" 
              class="list-group-item list-group-item-action text-center"
              :class="['Электрогитары', 'Бас-гитары'].includes(item.name)? 'text-primary' : ''"
            >
              {{ item.name }}
              <i v-if="['Электрогитары', 'Бас-гитары'].includes(item.name)" class="fa-solid fa-star me-2"></i>
            </RouterLink>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useCategoriesStore } from "@/stores/categories";
import {computed} from "vue";
import {useRoute} from "vue-router";

const route = useRoute();

const categoriesStore = useCategoriesStore();
categoriesStore.getAll();

const categories = computed(() => categoriesStore.categories);
</script>

<style>
.active {
  color: white !important;
}
</style>