<template>
  <div class="d-flex justify-content-between mb-3">
    <h4>Производители</h4>
    <button class="btn btn-sm btn-primary" @click="addManufacturer">
      Создать производителя
    </button>
  </div>

  <table class="table">
    <thead>
      <tr>
        <th scope="col">#</th>
        <th scope="col">Имя производителя</th>
        <th scope="col">Действия</th>
      </tr>
    </thead>
    <tbody>
      <template v-if="manufacturers.length">
        <tr v-for="(item, index) in manufacturers" :key="item.id">
          <th scope="row">{{ index + 1 }}</th>
          <td>{{ item.name }}</td>
          <td>
            <button class="btn btn-sm btn-outline-danger" @click="removeManufacturer(item.id)">
              <i class="fa-solid fa-trash"></i>
            </button>
          </td>
        </tr>
      </template>
      <template v-else>
        <tr><td colspan="3" class="text-center">Производителей нет</td></tr>
      </template>
    </tbody>
  </table>

</template>

<script>
import { useManufacturersStore } from "@/stores/manufacturers";

export default {
  setup() {
    let manufacturersStore = useManufacturersStore();
    manufacturersStore.getAll();

    return { 
      manufacturersStore,
    }
  },
  data() {
    return {
    }
  },
  computed: {
    manufacturers() {
      return this.manufacturersStore.manufacturers;
    }
  },
  methods: {
    addManufacturer() {
      let name = prompt("Введите имя производителя:");
      if (name) this.manufacturersStore.add(name);
    },
    removeManufacturer(id) {
      if (confirm("Вы действительно хотите удалить производителя?")) {
        this.manufacturersStore.remove(id);
      }
    }
  }
}
</script>