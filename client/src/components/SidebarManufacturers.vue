<template>
  <div class="accordion" id="manufacturersAccordion">
    <div class="accordion-item">
      <div class="accordion-header">
        <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#manufacturersAccordionBody" aria-expanded="true" aria-controls="manufacturersAccordionBody">
          <h5 class="card-title m-0">Производители</h5>
        </button>
      </div>
      <div id="manufacturersAccordionBody" class="accordion-collapse collapse show" data-bs-parent="#manufacturersAccordion">
        <div class="accordion-body p-0">
          <ul class="list-group list-group-flush"> 
            <li class="list-group-item" v-for="item in manufacturers">
              {{ item.name }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
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
    },
  },
}
</script>