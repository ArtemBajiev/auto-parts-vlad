<template>
  <ul class="orders-list">
    <li v-for="item in dataOrders" :key="item.id" class="orders-item">
      <h5>Номер заказа:&nbsp;{{ item.id }}</h5>
      <div class="orders-list__buttons">
        <button class="btn" @click="change(item.id, 'В обработке')">В обработке</button
        ><button class="btn" @click="change(item.id, 'В сборке')">В сборке</button
        ><button class="btn" @click="change(item.id, 'Готов к выдаче')">Готов к выдаче</button>
        <button class="btn" @click="change(item.id, 'Завершён')">Завершён</button>
      </div>
      <div class="orders-item_wrapper">
        <p>
          Стоимость заказа:&nbsp; <strong>{{ item.total }}₽</strong>
        </p>
        <p>{{ item.created_at }}</p>
        <p>Статус: &nbsp;{{ item.status }}</p>
      </div>
      <strong>Состав заказа:</strong>
      <ul class="order-list__products">
        <li class="order-list__products__item" v-for="itemProd in item.list" :key="itemProd.id">
          <router-link :to="{ name: 'detail', params: { id: itemProd.detail.id } }"
            ><img width="80px" :src="useGlobalStore().url + itemProd.detail.image" alt=""
          /></router-link>
          <div class="order-list__products__text">
            <p>{{ itemProd.detail.type?.name }}&nbsp;{{ itemProd.detail.brand?.name }}</p>
            <p>цена: {{ itemProd.detail.price * itemProd.quantity }}₽</p>
            <p>Количество: {{ itemProd.quantity }}шт.</p>
          </div>
        </li>
      </ul>
    </li>
  </ul>
</template>

<script lang="js" setup>
import adminOrders from '@/composition/adminOrders'
import { useGlobalStore } from '@/stores/globalStore'
import { toast } from 'vue3-toastify'
import { ref } from 'vue'
const dataOrders = ref([])
const { getOrders, changeStatus } = adminOrders()
function ParseList() {
  dataOrders.value.forEach((item) => {
    item.list = JSON.parse(item.list)
    const date = new Date(item.created_at)
    item.created_at =
      date.getDate() +
      '/' +
      (date.getMonth() + 1) +
      '/' +
      date.getFullYear() +
      '/' +
      date.getHours() +
      ':' +
      date.getMinutes()
  })

  dataOrders.value = dataOrders.value.reverse()
}
function change(id, status) {
  changeStatus(id, status).then(() => {
    toast.success('Статус изменён')
    getData()
  })
}
function getData() {
  getOrders().then((res) => {
    dataOrders.value = res.data.orders
    ParseList()
  })
}
getData()
</script>

<style scoped lang="scss">
.orders-list {
  max-width: 1200px;
  margin: auto;
}
.orders-item_wrapper {
  display: flex;
  p {
    margin: 10px;
  }
}
.orders-item {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-shadow: 0px 0px 1px 0px;
  padding: 20px;
  border-radius: 8px;
  margin-top: 10px;
}
.order-list__products {
  display: flex;
  width: 100%;
  overflow: auto;
}
.order-list__products__item {
  display: flex;
  margin: 10px;
  border: 1px solid rgba(128, 128, 128, 0.23);
  border-radius: 8px;
  padding: 5px;
}
.order-list__products__text {
  height: 100px;
  min-width: 140px;
  p {
    margin: 0;
  }
}
.orders-list__buttons {
  button {
    margin: 5px;
    &:nth-child(1) {
      background-color: rgb(142, 0, 0);
    }
    &:nth-child(2) {
      background-color: rgb(179, 0, 0);
    }
    &:nth-child(3) {
      background-color: rgb(204, 0, 0);
    }
    &:nth-child(4) {
      background-color: rgb(255, 0, 0);
    }
  }
}
</style>
