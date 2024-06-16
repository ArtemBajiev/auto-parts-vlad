<template>
  <div class="container">
    <div class="card-wraper">
      <h1>
        <span v-if="data.type">{{ data.type?.name }} &nbsp;</span
        ><span>{{ data?.detail_brand }}</span>
      </h1>
      <img width="230" :src="useGlobalStore().url + data?.image" alt="" /><br />
      <div class="text-and-cart">
        <div class="type">
          <form @submit.prevent="createType(newType)" action="">
            <p>cоздайте новый тип</p>
            <input required class="form-control" placeholder="Тип" v-model="newType" type="text" />
            <button class="btn btn-danger w-100">Создать</button>
          </form>
        </div>
        <form @submit.prevent="editProd()" class="specifications">
          <div v-if="route.params.id == 'new'">
            <p>Выберите тип</p>
            <select required v-model="data.type.id" class="form-select" name="" id="">
              <option selected value="">Тип детали</option>
              <option v-for="itemType in typeData" :key="itemType.id" :value="itemType.id">
                {{ itemType.name }}
              </option>
            </select>
          </div>
          <label for="">
            Картинка
            <input @change="selectFile" required class="form-control" type="file" name="" id=""
          /></label>
          <label for=""
            >Бренд<input required class="form-control" v-model="data.detail_brand" type="text"
          /></label>
          <label for=""
            >Код<input required class="form-control" v-model="data.number" type="text"
          /></label>
          <label for=""
            >Количество<input required class="form-control" v-model="data.count" type="text"
          /></label>
          <label for=""
            >Цена<input required class="form-control" v-model="data.price" type="number"
          /></label>
          <label for=""
            >Описание
            <textarea
              required
              class="form-control h-50"
              placeholder="Описание"
              name=""
              v-model="data.descr"
              id=""
            ></textarea>
          </label>
          <button type="submit" class="btn btn-danger">Сохранить</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script lang="js" setup>
import getProduct from '@/composition/getProduct'
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import ButtonBy from '@/components/ui/ButtonBy.vue'
import { useAuthentication } from '@/stores/authentication'
import { useGlobalStore } from '@/stores/globalStore'
import adminProducts from '@/composition/adminProducts'
import { toast } from 'vue3-toastify'
import router from '@/router'

const { editProducts, createProducts, uploadImage, getTypes, postTypes } = adminProducts()
const authStore = useAuthentication()
const route = useRoute()
const { getProductItem } = getProduct()
const data = ref({
  type: { name: '', id: '' },
  detail_brand: '',
  number: '',
  count: '',
  price: '',
  descr: '',
  name: ''
})
const file = ref('')
const newType = ref('')
const typeData = ref([])
function selectFile(e) {
  file.value = e.target.files[0]
}
function createType(text) {
  postTypes(text).then(() => {
    toast.success('Тип добавлен')
    getTypes().then((res) => {
      typeData.value = res.data.types
    })
  })
}
function getData() {
  if (route.params.id != 'new') {
    getProductItem(route.params.id).then((res) => {
      data.value = res.data.detail
    })
  } else {
    getTypes().then((res) => {
      typeData.value = res.data.types
    })
  }
}
getData()

const editProd = () => {
  if (route.params.id == 'new') {
    createProducts(
      data.value.detail_brand,
      data.value.number,
      data.value.descr,
      data.value.count,
      data.value.price,
      route.params.mod,
      data.value.type.id
    ).then((res) => {
      if (file.value) {
        uploadImage(file.value, res.data.detail.id).then(() => {
          toast.success('Картинка загружена')
          router.push({ name: 'product-item', params: { id: res.data.detail.id, type: null } })
          getData()
        })
      } else {
        getData()
      }
      toast.success('Данные обновлены')
    })
  } else {
    editProducts(
      data.value.id,
      data.value.detail_brand,
      data.value.number,
      data.value.descr,
      data.value.count,
      data.value.price
    ).then(() => {
      if (file.value != '') {
        uploadImage(file.value, data.value.id)
        toast.success('Картинка загружена')
      }
      toast.success('Данные обновлены')
    })
  }
}
</script>

<style scoped>
.type {
  width: 700px;
  margin: auto;
  display: flex;
  * {
    margin: 10px;
    flex: 1 1 auto;
  }
}
.line {
  border-bottom: 1px dashed gray;
  flex: 1 1 auto;
  margin-bottom: 1.3rem;
  margin-left: 4px;
  margin-right: 4px;
}
.authorization {
  background-color: rgb(227, 227, 227);
  height: 100px;
  border-radius: 12px;
  background-repeat: no-repeat;
  background-size: 70px;
  display: flex;
  padding: 10%;
  a {
    color: rgb(0, 106, 255);
    font-weight: bold;
  }
}
.icon-right {
  background-image: url('../../assets/img/login_mmyigzscke6s.svg');
  background-repeat: no-repeat;
  height: 100px;
  width: 90px;
  opacity: 0.7;
}
.specifications {
  width: 100%;
  padding: 0px 15%;
  margin-top: 40px;
  label {
    width: 100%;
    display: block;
    margin-top: 20px;
  }
}
.specifications-item {
  border-bottom: 1px;
  display: flex;
  justify-content: space-between;
}
.text-and-cart {
}
.add-cart {
  background-color: rgb(227, 227, 227);
  margin-top: 20px;
  padding: 10%;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  .price {
    font-size: 1.3rem;
  }
}
.receive {
  background-color: rgb(227, 227, 227);
  margin-top: 20px;
  padding: 10%;
  border-radius: 12px;
}
.in-cart {
  width: 300px;
  margin-left: 40px;
}
.card-wraper {
  padding-top: 40px;
  .text {
    text-align: end;
  }
  h1 {
    text-align: center;
  }
  img {
    float: left;
  }
}
</style>
