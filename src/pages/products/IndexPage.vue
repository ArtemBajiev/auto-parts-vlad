<template>
  <div class="container">
    <div class="filter-car" :class="{ 'close-filter-car': !showFilter }">
      <div class="my-2" v-if="!store.fullNameCar[0].name">
        <h3>Поиск детали</h3>
        <input
          @input.prevent="searchProd(store.search)"
          v-model="store.search"
          type="text"
          class="form-control"
        />
      </div>
      <div v-if="showFilter">
        <h3>Выбор автомобиля</h3>
        <form class="form" action="">
          <input
            class="form-control"
            :disabled="step != 2"
            v-model="store.fullNameCar[0].name"
            type="text"
            placeholder="Введите марку"
          />

          <input
            :disabled="step != 3"
            class="form-control"
            v-model="store.fullNameCar[1].name"
            type="text"
            placeholder="Введите модель"
          />
          <input
            :disabled="step != 4"
            class="form-control"
            v-model="store.fullNameCar[2].name"
            type="text"
            placeholder="Введите поколение модели"
          />
          <input
            :disabled="step.value == 5 && store.dataProducts.length == 0 ? false : true"
            class="form-control"
            v-model="store.fullNameCar[3].name"
            type="text"
            placeholder="Введите модификацию"
          />
        </form>
      </div>

      <ul v-if="showFilter" class="filter-car__list">
        <li
          class="filter-car__item"
          @click="(selectItem = item), (store.search = ''), nextStep()"
          v-for="item in searchCar"
          :key="item.id"
        >
          <img v-if="item.image" height="80" :src="useGlobalStore().url + item?.image" alt="" />
          {{ item?.name }}{{ item?.text }}
        </li>
      </ul>
      <button class="btn btn-light btn-reset" @click.prevent="previousStep()">
        сбросить фильтр
      </button>
    </div>
    <div class="filter-type">
      <select
        v-if="step != 2 && !store.search"
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
      <Transition name="fade">
        <ul v-if="store.dataProducts.length != 0" class="products-list">
          <CardProduct
            v-for="item in store.dataProducts"
            :brand="item.detail_brand"
            :key="item.id"
            :price="item.price"
            :count="item.count"
            :descr="item.descr"
            :type="item.type.name"
            :id="item.id"
            :img="item.image"
            @push-shopping="PushShopping"
          ></CardProduct>
        </ul>
      </Transition>
    </div>
    <p class="btn m-auto" v-if="store.dataProducts.length == 0 && step != 2 && loading == false">
      Данной детали сейчас нет на складе
    </p>
    <LoaderComp v-if="loading"></LoaderComp>
  </div>
</template>

<script lang="js" setup>
import LoaderComp from '@/components/LoaderComp.vue'
import { onMounted } from 'vue'
import getCar from '@/composition/getCar'
import getProduct from '@/composition/getProduct'
import CardProduct from '@/components/CardProduct.vue'
import { ref } from 'vue'
import { computed } from 'vue'
import getType from '@/composition/getType'
import { useGlobalStore } from '@/stores/globalStore'

const store = useGlobalStore()
const { Type } = getType()
const { getProductModification, searchProduct } = getProduct()
const { getBrand, getModification, getGenerations, getDesigns } = getCar()

const data = ref([])
const selectItem = ref()
const step = ref(1)

const showFilter = ref(true)

const typeData = ref()
const filterType = ref('')
const loading = ref(true)

const searchCar = computed(() => {
  return data.value.filter((x) => x.name.includes(store.fullNameCar[step.value - 2].name))
})
function FilterType() {
  getData(step.value, selectItem.value.id, filterType.value, false)
}

function searchProd(text) {
  store.fullNameCar = [{ name: '' }, { name: '' }, { name: '' }, { name: '' }]
  if (text) {
    showFilter.value = false
    searchProduct(text).then((res) => {
      store.dataProducts = res.data.details
      showFilter.value = false
    })
  } else {
    store.dataProducts = []
    previousStep()
  }
}
// Выбор автомибиля
function getData(step, select, type, nextStep) {
  loading.value = true
  switch (step) {
    case 1:
      getBrand().then((res) => {
        data.value = res.data.brands
        loading.value = false
      })
      return

    case 2:
      getDesigns(select, type).then((res) => {
        data.value = res.data.designs
        store.dataProducts = res.data.details
        loading.value = false
        if (nextStep) {
          fillFullNameCar(0)
        }
      })
      return

    case 3:
      getGenerations(select, type).then((res) => {
        data.value = res.data.generations
        store.dataProducts = res.data.details
        loading.value = false
        if (nextStep) {
          fillFullNameCar(1)
        }
      })
      return

    case 4:
      getModification(select, type).then((res) => {
        data.value = res.data.modifications
        store.dataProducts = res.data.details
        loading.value = false
        if (nextStep) {
          fillFullNameCar(2)
        }
      })
      return
    case 5:
      getProductModification(select, type).then((res) => {
        store.dataProducts = res.data.details
        loading.value = false
        if (nextStep) {
          fillFullNameCar(3)
        }
        showFilter.value = false
      })
      return
  }
}
// получение типов
Type().then((res) => {
  typeData.value = res.data.types
})
// следующий шаг
function nextStep() {
  getData(step.value, selectItem.value?.id, filterType.value, true)
  step.value = step.value + 1 == 6 ? 5 : step.value + 1
}
// сбросить фильтр
function previousStep() {
  showFilter.value = true
  store.search = ''
  store.dataProducts = []
  step.value = 1
  getData(step.value, store.fullNameCar[step.value - 1].id, '', true)
  step.value += 1
  store.fullNameCar = [{ name: '' }, { name: '' }, { name: '' }, { name: '' }]
}
// Заполнить input выбранными авто
function fillFullNameCar(i) {
  store.fullNameCar[i] = selectItem.value
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
  overflow: hidden;
  position: relative;
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
}
.btn-reset {
  bottom: 10px;
  right: 10px;
  width: 100%;
  display: block;
}

.filter-car__item {
  border: 1px solid rgba(128, 128, 128, 0.23);
  padding: 20px;
  border-radius: 15px;
  transition: all 0.3s ease-in-out;

  img {
    border-radius: 10px;
  }
  &:hover {
    background-color: rgba(128, 128, 128, 0.112);
  }
}
.form {
  display: flex;
  padding-bottom: 10px;
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

.close-filter-car {
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
