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
              :to="{ name: 'category', params: { id: item.id } }" 
              class="list-group-item list-group-item-action"
            >
              {{ item.name }}
            </RouterLink>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useCategoriesStore } from "@/stores/categories";

export default {
  setup() {
    let сategoriesStore = useCategoriesStore();
    сategoriesStore.getAll();

    return { 
      сategoriesStore,
    }
  },
  data() {
    return {
    }
  },
  computed: {
    categories() {
      return this.сategoriesStore.categories;
    },
  }
}
</script>