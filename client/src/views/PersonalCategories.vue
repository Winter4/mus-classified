<template>
  <div class="d-flex justify-content-between mb-3">
    <h4>Категории</h4>
    <button class="btn btn-sm btn-primary" @click="addCategory">
      Создать категорию
    </button>
  </div>

  <table class="table">
    <thead>
      <tr>
        <th scope="col">#</th>
        <th scope="col">Имя категории</th>
        <th scope="col">Действия</th>
      </tr>
    </thead>
    <tbody>
      <template v-if="categories.length">
        <tr v-for="(item, index) in categories" :key="item.id">
          <th scope="row">{{ index + 1 }}</th>
          <td>{{ item.name }}</td>
          <td>
            <button class="btn btn-sm btn-outline-danger" @click="removeCategory(item.id)">
              <i class="fa-solid fa-trash"></i>
            </button>
          </td>
        </tr>
      </template>
      <template v-else>
        <tr><td colspan="3" class="text-center">Категорий нет</td></tr>
      </template>
    </tbody>
  </table>

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
    }
  },
  methods: {
    addCategory() {
      let name = prompt("Введите имя категории:");
      if (name) this.сategoriesStore.add(name);
    },
    removeCategory(id) {
      if (confirm("Вы действительно хотите удалить категорию?")) {
        this.сategoriesStore.remove(id);
      }
    }
  }
}
</script>