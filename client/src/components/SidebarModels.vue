<template>
  <div class="accordion" id="manufacturersAccordion">
    <div class="accordion-item">
      <div class="accordion-header">
        <button class="accordion-button bg-primary" type="button" data-bs-toggle="collapse" data-bs-target="#manufacturersAccordionBody" aria-expanded="true" aria-controls="manufacturersAccordionBody">
          <h5 class="card-title m-0 text-white">Модели</h5>
        </button>
      </div>
      <div id="manufacturersAccordionBody" class="accordion-collapse collapse show" data-bs-parent="#manufacturersAccordion">
        <div class="accordion-body p-0">
          <ul class="list-group list-group-flush"> 
            <li v-for="item in models" class="list-group-item" >
              <div class="form-check">
                <input class="form-check-input" type="checkbox" 
                  v-model="checkedModels" :value="item.id" :id="'modelCheck-' + item.id">
                <label class="form-check-label" :for="'modelCheck-' + item.id">
                  {{ item.name }}
                </label>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useModelsStore } from "@/stores/models";

export default {
  props: ['manufacturerId'],
  setup() {
    let modelsStore = useModelsStore();

    return { 
      modelsStore,
    }
  },
  data() {
    return {
      checkedModels: [],
    }
  },
  computed: {
    models() {
      return this.modelsStore.models;
    },
  },
  created() {
    this.modelsStore.getAll(this.manufacturerId);
  },
  watch: {
    checkedModels: function (val) {
      this.$emit('checkedModels', val);
    },
  }
}
</script>