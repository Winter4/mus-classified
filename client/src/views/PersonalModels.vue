<template>
  <div class="d-flex justify-content-between mb-3">
    <h4>Модели инструментов</h4>
    <button type="button" class="btn btn-sm btn-primary" data-bs-toggle="modal" data-bs-target="#addModelModal">
      Создать модель
    </button>
  </div>

  <table class="table">
    <thead>
      <tr>
        <th scope="col">#</th>
        <th scope="col">Производитель</th>
        <th scope="col">Имя модели</th>
        <th scope="col">Действия</th>
      </tr>
    </thead>
    <tbody>
      <template v-if="models.length">
        <tr v-for="(item, index) in models" :key="item.id">
          <th scope="row">{{ index + 1 }}</th>
          <td>{{ item.Manufacturer.name }}</td>
          <td>{{ item.name }}</td>
          <td>
            <button class="btn btn-sm btn-outline-danger" @click="removeModel(item.id)">
              <i class="fa-solid fa-trash"></i>
            </button>
          </td>
        </tr>
      </template>
      <template v-else>
        <tr><td colspan="4" class="text-center">Моделей инструментов нет</td></tr>
      </template>
    </tbody>
  </table>

  <div class="modal fade" id="addModelModal">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Добавить модель инструмента</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div class="row mb-3">
            <div class="col-4">Производитель</div>
            <div class="col-8">
              <select v-model="manufacturerId" class="form-select" placeholder="Производитель">
                <template v-if="manufacturers.length">
                  <option v-for="item in manufacturers" :key="item.id" :value="item.id">{{ item.name }}</option>
                </template>
              </select>
            </div>
          </div>
          <div class="row">
            <div class="col-4">Имя модели</div>
            <div class="col-8">
              <input v-model="modelName" type="text" class="form-control">
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-primary" data-bs-dismiss="modal" @click="addManufacturer()">OK</button>
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Отмена</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useManufacturersStore } from "@/stores/manufacturers";
import { useModelsStore } from "@/stores/models";

export default {
  setup() {
    let manufacturersStore = useManufacturersStore();
    manufacturersStore.getAll();

    let modelsStore = useModelsStore();
    modelsStore.getAll();

    return { 
      manufacturersStore,
      modelsStore,
    }
  },
  data() {
    return {
      manufacturerId: null,
      modelName: null,
    }
  },
  computed: {
    manufacturers() {
      return this.manufacturersStore.manufacturers;
    },
    models() {
      return this.modelsStore.models;
    }
  },
  methods: {
    addManufacturer() {
      if (this.modelName.length && this.manufacturerId != null) {
        this.modelsStore.add(this.manufacturerId, this.modelName);
        this.manufacturerId = null;
        this.modelName = null;
      }
    },
    removeModel(id) {
      if (confirm("Вы действительно хотите удалить производителя?")) {
        this.modelsStore.remove(id);
      }
    }
  }
}
</script>