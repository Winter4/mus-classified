<template>
  <div class="container-lg">
    <div class="row">

      <div class="col-3">
        
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

      </div>

      <div class="col-9">
        <h3 class="mt-2 mb-3">Категория: {{ category.name }}</h3>
        
        <div class="row">
          <div class="col-4" v-for="ad in advertisements">
            <div class="card mb-4">

              <div 
                class="card-img-wrapper"
                :style="{ 'background-image': ad.Images?.[0] ? `url(${imageBaseUrl + ad.Images[0].path})` : 'none' }"
                >
              </div>

              <div class="card-body">
                <div class="title-wrapper mb-2">
                  <h6 class="card-title">
                    <RouterLink :to="{ name: 'advertisement', params: { id: ad.id } }" class="text-dark text-decoration-none stretched-link">
                      {{ ad.headline }}
                    </RouterLink>
                  </h6>
                </div>
                <h6 class="card-subtitle text-muted">{{ ad.price }}₽</h6>
              </div>

            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import { useCategoriesStore } from "@/stores/categories";
import { useManufacturersStore } from "@/stores/manufacturers";
import { useAdvertisementsStore } from "@/stores/advertisements";

export default {
  props: ['id'],
  setup() {
    let сategoriesStore = useCategoriesStore();

    let manufacturersStore = useManufacturersStore();
    manufacturersStore.getAll();

    let advertisementsStore = useAdvertisementsStore();

    return { 
      сategoriesStore,
      manufacturersStore,
      advertisementsStore,
      imageBaseUrl: `${import.meta.env.VITE_API_URL}/upload/images/`,
    }
  },
  data() {
    return {
    }
  },
  computed: {
    category() {
      return this.сategoriesStore.category;
    },
    manufacturers() {
      return this.manufacturersStore.manufacturers;
    },
    advertisements() {
      return this.advertisementsStore.ads;
    }
  },
  created() {
    this.сategoriesStore.get(this.id);
    this.advertisementsStore.getAll({categoryId: this.id});
  },
  methods: {
  }
}
</script>

<style>
.card-img-wrapper {
  height: 300px;
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
}
.title-wrapper {
  height: 40px;
  display: flex;
  align-items: center;
}
</style>