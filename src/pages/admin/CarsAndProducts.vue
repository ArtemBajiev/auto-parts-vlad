<template>
  <div class="container">
    <div class="filter-car" :class="{ 'close-filter-car': !showFilter }">
      <button class="btn btn-light m-2" @click="editMode()" v-show="showFilter">
        Режим редактирования
      </button>
      <h3>Выбор автомобиля</h3>
      <form class="form" action="">
        <input
          class="form-control"
          :disabled="step != 2"
          v-model="fullNameCar[0].name"
          type="text"
          placeholder="Введите марку"
        />

        <input
          :disabled="step != 3"
          class="form-control"
          v-model="fullNameCar[1].name"
          type="text"
          placeholder="Введите модель"
        />
        <input
          :disabled="step != 4"
          class="form-control"
          v-model="fullNameCar[2].name"
          type="text"
          placeholder="Введите поколение модели"
        />
        <input
          :disabled="step.value == 5 && dataProducts.length == 0 ? false : true"
          class="form-control"
          v-model="fullNameCar[3].name"
          type="text"
          placeholder="Введите модификацию"
        />
        <button class="btn btn-light" @click="previousStep()">сбросить фильтр</button>
      </form>

      <ul v-if="showFilter" class="filter-car__list">
        <li class="filter-car__item" v-show="showForm">
          <form @submit.prevent="createData(step, newElement.name)" action="">
            <label class="w-100" for=""
              >Название<input
                v-model="newElement.name"
                required
                class="form-control w-100"
                type="text"
            /></label>
            <label v-if="step == 2 || step == 4" for=""
              >Картинка<input @change="addFile" required class="form-control w-100" type="file"
            /></label>
            <button class="btn btn-danger my-2 w-100" type="submit">Добавить</button>
          </form>
        </li>
        <li
          @click="(selectItem = item), nextStep()"
          class="filter-car__item"
          v-for="item in searchCar"
          :key="item.id"
        >
          <img
            v-if="item.image != 'default'"
            height="80"
            :src="useGlobalStore().url + item?.image"
            alt=""
          />
          {{ item.name }}
          <form @submit.prevent="editData(step, item.id, item.name)" action="" v-show="showForm">
            <label class="w-100" for=""
              >Название<input v-model="item.name" required class="form-control w-100" type="text"
            /></label>
            <label v-if="step == 2 && step == 4" for=""
              >Картинка<input @change="addFile" required class="form-control w-100" type="file"
            /></label>
            <button type="submit" class="btn btn-danger my-2 w-100">Сохранить</button>
          </form>
        </li>
      </ul>
    </div>
    <div class="filter-type">
      <select
        v-if="step != 2"
        class="form-select"
        v-model="filterType"
        @change="FilterType()"
        name=""
        id=""
      >
        <option selected value="">Тип детали</option>
        <option v-for="itemType in typeData" :key="itemType.id" :value="itemType.id">
          {{ itemType.name }}
        </option>
      </select>
    </div>
    <div>
      <ul class="products-list">
        <li v-if="fullNameCar[3].name != ''" class="create-detail">
          <router-link :to="{ name: 'product-item', params: { id: 'new', mod: selectItem.id } }">
            Добавить новую деталь
          </router-link>
        </li>
        <ProductCardAdmin
          v-for="item in dataProducts"
          :brand="item.detail_brand"
          :key="item.id"
          :price="item.price"
          :count="item.count"
          :descr="item.descr"
          :type="item.type.name"
          :id="item.id"
          :img="item.image"
          @push-shopping="PushShopping"
        ></ProductCardAdmin>
      </ul>
    </div>
  </div>
</template>

<script lang="js" setup>
import { onMounted } from 'vue'
import getCar from '@/composition/getCar'
import getProduct from '@/composition/getProduct'
import ProductCardAdmin from '@/components/admin/ProductCardAdmin.vue'
import { ref } from 'vue'
import { computed } from 'vue'
import getType from '@/composition/getType'
import adminCars from '@/composition/adminCars'
import { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'
import { useGlobalStore } from '@/stores/globalStore'

const {
  createBrand,
  editBrand,
  createDesign,
  editDesign,
  createGenerations,
  editGenerations,
  createModifications,
  editModifications,
  addImageBrand,
  addImageGenerations
} = adminCars()

const { Type } = getType()
const { getProductModification } = getProduct()
const { getBrand, getModification, getGenerations, getDesigns } = getCar()

const data = ref([])
const selectItem = ref()
const step = ref(1)
const dataProducts = ref([])
const showFilter = ref(true)
const fullNameCar = ref([{ name: '' }, { name: '' }, { name: '' }, { name: '' }])
const typeData = ref()
const filterType = ref('')
const loading = ref(true)
const newElement = ref({})
const file = ref('')
const searchCar = computed(() => {
  return data.value.filter((x) => x.name.includes(fullNameCar.value[step.value - 2].name))
})
let showForm = ref(false)

function editMode() {
  showForm.value = !showForm.value
}
function FilterType() {
  getData(step.value, selectItem.value.id, filterType.value, false)
}
const formData = new FormData()
function addFile(e) {
  file.value = e.target.files[0]
  formData.append('file', file.value)
}

function createData(step, text) {
  switch (step) {
    case 2:
      createBrand(text).then((res) => {
        addImageBrand(file.value, res.data.brand.id).then(() => {
          toast.success('Бренд добавлен')
          previousStep()
        })
      })
      return
    case 3:
      createDesign(text, selectItem.value.id).then(() => {
        toast.success('Модель добавлена')
        previousStep()
      })
      return
    case 4:
      createGenerations(text, selectItem.value.id).then((res) => {
        addImageGenerations(file.value, res.data.generation.id).then(() => {
          toast.success('Поколение добавлено')
          previousStep()
        })
      })
      return
    case 5:
      createModifications(text, selectItem.value.id).then(() => {
        toast.success('Модификация добавлена')
        previousStep()
      })
      return
  }
}
function editData(step, id, text) {
  switch (step) {
    case 2:
      editBrand(text, id).then(() => {
        addImageBrand(file.value, id).then(() => {
          previousStep()
        })
        toast.success('Бренд добавлен')
      })
      return
    case 3:
      editDesign(text, id).then(() => {
        toast.success('Модель добавлена')
        previousStep()
      })
      return
    case 4:
      editGenerations(text, id).then(() => {
        toast.success('Поколение добавлено')
        addImageGenerations(file.value, id).then(() => {
          previousStep()
        })
        previousStep()
      })
      return
    case 5:
      editModifications(text, id).then(() => {
        toast.success('Модификация добавлена')
        previousStep()
      })
      return
  }
}
function getData(step, select, type, nextStep) {
  switch (step) {
    case 1:
      getBrand().then((res) => {
        data.value = res.data.brands
      })
      return

    case 2:
      getDesigns(select, type).then((res) => {
        data.value = res.data.designs
        dataProducts.value = res.data.details
        if (nextStep) {
          fillFullNameCar(0)
        }
      })
      return

    case 3:
      getGenerations(select, type).then((res) => {
        data.value = res.data.generations
        dataProducts.value = res.data.details
        if (nextStep) {
          fillFullNameCar(1)
        }
      })
      return

    case 4:
      getModification(select, type).then((res) => {
        data.value = res.data.modifications
        dataProducts.value = res.data.details
        if (nextStep) {
          fillFullNameCar(2)
        }
      })
      return
    case 5:
      getProductModification(select, type).then((res) => {
        dataProducts.value = res.data.details
        if (nextStep) {
          fillFullNameCar(3)
        }
        showFilter.value = false
      })
      return
  }
}
Type().then((res) => {
  typeData.value = res.data.types
})
function nextStep() {
  if (!showForm.value) {
    getData(step.value, selectItem.value?.id, filterType.value, true)

    step.value = step.value + 1 == 6 ? 5 : step.value + 1
  }
}

function previousStep() {
  showFilter.value = true
  step.value = 1
  getData(step.value, fullNameCar.value[step.value - 1].id, '', true)
  step.value += 1
  fullNameCar.value = [{ name: '' }, { name: '' }, { name: '' }, { name: '' }]
  showForm.value = false
}
function fillFullNameCar(i) {
  fullNameCar.value[i] = selectItem.value
  loading.value = false
}
onMounted(() => {
  nextStep()
})
</script>

<style scoped lang="scss">
.filter-car {
  color: black;
  padding: 20px 12px;
  box-shadow: 0px 5px 5px -4px rgba(0, 0, 0, 0.63);
  border-radius: 0px 0px 8px 8px;
  height: 500px;
  transition: all 1s ease-in-out;
  li {
    cursor: pointer;
  }
}
.products-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 300px));
  grid-gap: 20px;
  padding: 0px 20px;
  padding-top: 40px;
  justify-content: center;
  align-items: center;
  text-align: center;
  width: 100%;
}
.filter-car__list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 300px));
  grid-gap: 20px;
  padding: 0px 20px;
  padding-top: 40px;
  justify-content: center;
  align-items: center;
  text-align: center;
  overflow: auto;
  height: 70%;
}
.filter-car__item {
  border: 1px solid rgba(128, 128, 128, 0.23);
  padding: 20px;
  border-radius: 15px;
  transition: all 0.3s ease-in-out;
  &:hover {
    background-color: rgba(128, 128, 128, 0.112);
  }
}
.form {
  display: flex;
  input {
    margin: 0px 5px;
  }
}
select {
  width: 300px;
  color: black;
}
.form-select {
  margin-top: 20px;
  margin-left: auto;
}
.create-detail {
  background-color: rgb(236, 236, 236);
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  a {
    color: black;
    padding: 40% 10%;
  }
}

.close-filter-car {
  height: 150px;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
