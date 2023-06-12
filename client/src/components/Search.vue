<template>
  <div class="row">
    <div class="col-4">
      <div class="form-floating">
        <input v-model="searchQuery" type="text" class="form-control" id="searchQuery">
        <label for="searchQuery">Поиск</label>
      </div>
    </div>

    <div class="col-2">
      <div class="form-floating">
        <select v-model="categoryId" class="form-select" id="searchCategories">
          <template v-if="categories.length">
            <option v-for="item in categories" :key="item.id" :value="item.id">
              {{ item.name }}
            </option>
          </template>
        </select>
        <label for="searchCategories">Категория</label>
      </div>
    </div>

    <div class="col-2">
      <div class="form-floating">
        <select v-model="manufacturerId" class="form-select" id="searchManufacturers">
          <template v-if="manufacturers.length">
            <option v-for="item in manufacturers" :key="item.id" :value="item.id">{{ item.name }}</option>
          </template>
        </select>
        <label for="searchManufacturers">Производитель</label>
      </div>
    </div>

    <div class="col-2">
      <div class="form-floating">
        <select v-model="modelId" class="form-select" id="searchModels">
          <template v-if="models.length">
            <option v-for="item in models" :key="item.id" :value="item.id">{{ item.name }}</option>
          </template>
        </select>
        <label for="searchModels">Модель</label>
      </div>
    </div>

    <div class="col-2">
      <RouterLink 
        :to="{ name: 'search', query: { searchQuery, categoryId, manufacturerId, modelId, } }" 
        class="btn btn-primary w-100 h-100 d-flex align-items-center justify-content-center">
        Поиск
      </RouterLink>
    </div>
  </div>
</template>

<script>
import { useCategoriesStore } from "@/stores/categories";
import { useManufacturersStore } from "@/stores/manufacturers";
import { useModelsStore } from "@/stores/models";

export default {
  setup() {
    let сategoriesStore = useCategoriesStore();
    сategoriesStore.getAll();

    let manufacturersStore = useManufacturersStore();
    manufacturersStore.getAll();

    let modelsStore = useModelsStore();

    return { 
      сategoriesStore,
      manufacturersStore,
      modelsStore,
    }
  },
  data() {
    return {
      searchQuery : this.$route.query.searchQuery || '',
      categoryId: this.$route.query.categoryId || 0,
      manufacturerId: this.$route.query.manufacturerId || 0, 
      modelId: this.$route.query.modelId || 0, 
    }
  },
  computed: {
    categories() {
      return this.сategoriesStore.categories;
    },
    manufacturers() {
      return this.manufacturersStore.manufacturers;
    },
    models() {
      return this.modelsStore.models;
    }
  },
  watch: {
    manufacturerId(val) {
      this.modelsStore.getAll(val);
    },
  },
}
</script>