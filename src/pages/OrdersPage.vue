<template>
  <section name="orders">
    <div class="container">
      <ul class="orders-list">
        <li v-for="item in dataOrders.orders" :key="item.id" class="orders-item">
          <h5>Номер заказа:&nbsp;{{ item.id }}</h5>
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
    </div>
  </section>
</template>
<script setup>
import orders from '@/composition/orders'
import { onMounted, ref } from 'vue'
import { useGlobalStore } from '@/stores/globalStore'
const { GetOrders } = orders()
const dataOrders = ref([])
function ParseList() {
  dataOrders.value.orders.forEach((item) => (item.list = JSON.parse(item.list)))
}
onMounted(() => {
  GetOrders().then((res) => {
    dataOrders.value = res.data.user
    dataOrders.value.orders = dataOrders.value.orders.reverse()
    dataOrders.value.orders.forEach((item) => {
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
    ParseList()
  })
})
</script>
<style lang="scss">
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
</style>
