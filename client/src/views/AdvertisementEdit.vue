<template>
  <div class="container-lg">
    <form @submit.prevent="editAdvertisement">
      <div class="row mb-4">
        <div class="col-6">
          <div class="form-floating">
            <input v-model="headline" type="text" class="form-control" id="inputAdAddHeadline" placeholder="Заголовок" required>
            <label for="inputAdAddHeadline">Заголовок</label>
          </div>
        </div>
        <div class="col-6">
          <div class="form-floating">
            <select v-model="categoryId" class="form-select" id="inputAdAddCategory">
              <template v-if="categories.length">
                <option v-for="item in categories" :key="item.id" :value="item.id">
                  {{ item.name }}
                </option>
              </template>
            </select>
            <label for="inputAdAddCategory">Категория</label>
          </div>
        </div>
      </div>
      <div class="row mb-4">
        <div class="col-6">
          <div class="form-floating">
            <select v-model="manufacturerId" class="form-select" id="inputAdAddManufacturer">
              <template v-if="manufacturers.length">
                <option v-for="item in manufacturers" :key="item.id" :value="item.id">{{ item.name }}</option>
              </template>
            </select>
            <label for="inputAdAddManufacturer">Производитель</label>
          </div>
        </div>
        <div class="col-6">
          <div class="form-floating">
            <select v-model="modelId" class="form-select" id="inputAdAddModel">
              <template v-if="models.length">
                <option v-for="item in models" :key="item.id" :value="item.id">{{ item.name }}</option>
              </template>
            </select>
            <label for="inputAdAddModel">Модель</label>
          </div>
        </div>
      </div>
      <div class="row mb-4">
        <div class="col-12">
          <div class="card card-body pb-0">
            <h6 class="mb-3">Фотографии товара</h6>
            <div class="row d-flex">
              <div 
                v-for="image in uploadedImages"
                class="col-2 mb-3"
              >
                <div 
                  class="card card-image card-body flex-row justify-content-center align-items-center"
                  :style="{ 'background-image': 'url(' + imageBaseUrl + image.path + ')' }"
                >
                  <div class="remove-image justify-content-center align-items-center" @click="removeImage(image.id)">
                    <i class="fa-solid fa-xmark fs-1"></i>
                  </div>
                </div>
              </div>
              <div class="col-2 mb-3">
                <div 
                  @click="startUploadImage()" 
                  class="uploadImageButton card card-image card-body flex-row justify-content-center align-items-center">
                  <i class="fa-solid fa-plus fs-1"></i>
                </div>
              </div>
            </div>
          </div>
        </div>

        <input ref='uploadImageField' @change="onImageFieldChange($event)" type='file' accept=".gif,.jpg,.jpeg,.png" hidden/>
      </div>
      <div class="row mb-4">
        <div class="col-12">
          <div class="form-floating">
            <textarea v-model="description" class="form-control" placeholder="Описание товара" id="inputAdAddDescription"></textarea>
            <label for="inputAdAddDescription">Описание товара</label>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-6">
          <div class="form-floating">
            <input v-model="price" type="number" class="form-control" id="inputAdAddPrice" placeholder="Цена товара" required>
            <label for="inputAdAddPrice">Цена товара</label>
          </div>
        </div>
        <div class="col-6">
          <button type="submit" class="btn btn-primary btn-lg w-100 h-100">Сохранить</button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import { useCategoriesStore } from "@/stores/categories";
import { useManufacturersStore } from "@/stores/manufacturers";
import { useModelsStore } from "@/stores/models";
import { useAdvertisementsStore } from "@/stores/advertisements";
import { useImagesStore } from "@/stores/images";

export default {
  props: ['id'],
  setup() {
    let сategoriesStore = useCategoriesStore();
    сategoriesStore.getAll();

    let manufacturersStore = useManufacturersStore();
    manufacturersStore.getAll();

    let modelsStore = useModelsStore();
    let advertisementsStore = useAdvertisementsStore();
    let imagesStore = useImagesStore();

    return { 
      сategoriesStore,
      manufacturersStore,
      modelsStore,
      advertisementsStore,
      imagesStore,
      imageBaseUrl: `${import.meta.env.VITE_API_URL}/upload/images/`,
    }
  },
  data() {
    return {
      headline: '',
      categoryId: 0,
      manufacturerId: 0,
      modelId: 0,
      uploadedImages: [],
      description: '',
      price: 0,
    }
  },
  async created() {
    await this.advertisementsStore.get(this.id);

    this.headline = this.advertisement.headline;
    this.categoryId = this.advertisement.categoryId;
    this.manufacturerId = this.advertisement.InstrumentModel.manufacturerId;
    this.modelId = this.advertisement.modelId;
    this.uploadedImages = this.advertisement.Images,
    this.description = this.advertisement.description;
    this.price = this.advertisement.price;
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
    },
    advertisement() {
      return this.advertisementsStore.ad;
    },
  },
  watch: {
    categories(val) {
      this.categoryId = val.length ? val[0].id : 0;
    },
    manufacturers(val) {
      this.manufacturerId = val.length ? val[0].id : 0;
    },
    models(val) {
      this.modelId = val.length ? val[0].id : 0;
    },
    manufacturerId(val) {
      this.modelsStore.getAll(val);
    },
  },
  methods: {
    startUploadImage() {
      this.$refs.uploadImageField.click();
    },
    async onImageFieldChange(event) {
      if (event?.target?.files) {
        let image = event.target.files[0];
        let data = await this.imagesStore.upload(image);
        if (data) this.uploadedImages.push(data);
      }
    },
    removeImage(id) {
      if (confirm("Вы действительно хотите удалить это изображение?")) {
        this.uploadedImages = this.uploadedImages.filter(img => img.id != id);
      }
    },
    editAdvertisement() {
      let images = this.uploadedImages.map(image => image.id);
      this.advertisementsStore.edit(this.id, this.headline, this.description, this.price, this.categoryId, this.modelId, images);
    }
  }
}
</script>

<style scoped>
.card-image {
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
}
.card-image:before {
  content: '';
  padding-bottom: 100%;
}
#inputAdAddDescription {
  height: 300px;
  resize: none;
}
.uploadImageButton {
  cursor: pointer;
}

.remove-image {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: #fff;
  display: none;
  cursor: pointer;
}
.card-image:hover .remove-image {
  display: flex;
}
</style>