<template>
  <div class="container">
    <div class="shopping-cart">
      <h2>Корзина</h2>
      <div v-if="storeShopping.ShoppingListCart.length === 0">
        <p>Корзина пуста</p>
      </div>
      <div v-else>
        <div v-for="item in dataCart" :key="item.id">
          <div class="cart-item">
            <div class="left">
              <div class="item-image">
                <img :src="useGlobalStore().url + item.image" :alt="item.name" />
              </div>
              <div class="item-details">
                <h3>{{ item.detail_brand }}</h3>
                <p>Осталось на складе:&nbsp;{{ item.count }}</p>
                <p>Цена: {{ item.price * item.quantity }}₽</p>
              </div>
            </div>
            <div class="right">
              <p>Количество:</p>
              <div class="input-count">
                <button
                  class="btn-input-count"
                  @click="item.quantity < item.count ? item.quantity++ : item.count, updateItem()"
                >
                  <Icon height="20" color="black" :icon="'eva:arrow-up-fill'" />
                </button>
                <input :value="item.quantity" min="1" disabled :max="item.count" type="text" />
                <button
                  class="btn-input-count"
                  @click="item.quantity > 0 ? item.quantity-- : 0, updateItem()"
                >
                  <Icon height="20" color="black" :icon="'eva:arrow-down-fill'" />
                </button>
              </div>
              <button class="item-details-remove" @click="removeItem(item.id)">
                <Icon height="20" color="black" :icon="'maki:cross'" />
              </button>
            </div>
          </div>
        </div>
        <div class="cart-total">
          <p>Всего: {{ totalPrice }}₽</p>
        </div>
        <button v-if="storeAuthentication.isAuth" class="order" @click="postCart()">
          Заказать
        </button>
        <button v-if="!storeAuthentication.isAuth" class="order" @click="router.push('/login')">
          Авторизоваться
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { Icon } from '@iconify/vue'
import { useShoppingCard } from '@/stores/shoppingCard'
import getProduct from '@/composition/getProduct'
import orders from '@/composition/orders'
import { onMounted } from 'vue'
import router from '@/router'
import { useAuthentication } from '@/stores/authentication'
import { useGlobalStore } from '@/stores/globalStore'
const storeAuthentication = useAuthentication()
const { PostOrders } = orders()
const { getProductItem } = getProduct()
const storeShopping = useShoppingCard()
const dataCart = ref([])

function getAllProduct() {
  for (let i = 0; i < storeShopping.ShoppingListCart.length; i++) {
    getProductItem(storeShopping.ShoppingListCart[i].id).then((res) => {
      res.data.detail.quantity = storeShopping.ShoppingListCart[i].quantity
      dataCart.value.push(res.data.detail)
    })
  }
}
function postCart() {
  PostOrders(storeShopping.ShoppingListCart).then(() => {
    localStorage.removeItem('cart')
    router.push('./orders')
  })
}

onMounted(() => {
  getAllProduct()
})
const totalPrice = computed(() => {
  return dataCart.value.reduce((total, item) => total + item.price * item.quantity, 0)
})

function removeItem(id) {
  dataCart.value = dataCart.value.filter((x) => x.id != id)
  storeShopping.updateShoppingCard(dataCart.value)
}
function updateItem() {
  storeShopping.updateShoppingCard(dataCart.value)
}
</script>

<style scoped lang="scss">
.shopping-cart {
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;

  background-color: #fff;
}

h2 {
  font-size: 24px;
  margin-bottom: 20px;
  color: #333;
}

.cart-item {
  display: flex;
  margin-bottom: 20px;
  border-bottom: 1px solid #eee;
  padding-bottom: 20px;
  position: relative;
  justify-content: space-between;
  padding-right: 60px;
  .item-details-remove {
    position: absolute;
    top: 0;
    right: 0;
    border: 0;
    background-color: transparent;
  }
}
.left {
  display: flex;
}
.right {
  display: flex;
  align-items: center;
  p {
    margin: 0px 5px;
  }
}

.item-image img {
  width: 100px;
  height: 100px;
  object-fit: cover;
  margin-right: 20px;
}

.item-details h3 {
  font-size: 18px;
  margin-bottom: 10px;
  color: #333;
}

.item-details p {
  font-size: 14px;
  color: #666;
  margin-bottom: 5px;
}

.item-details button {
  background-color: transparent;
  color: #000000;
  border: none;
  padding: 5px 10px;
  font-size: 14px;
  cursor: pointer;
  margin-top: 10px;
}

.cart-total {
  text-align: right;
  margin-top: 30px;
}

.cart-total p {
  font-size: 18px;
  font-weight: bold;
  color: #333;
}

.order {
  display: block;
  width: 100%;
  max-width: 200px;
  margin: 20px auto 0;
  padding: 10px;
  background-color: var(--secondary);
  color: #fff;
  border: none;
  font-size: 16px;
  cursor: pointer;
  border-radius: 8px;
  transition: all 0.4s ease-in-out;
  &:hover {
    background-color: var(--primary);
  }
}
.input-count {
  display: flex;
  align-items: center;
  flex-direction: column;
  align-items: stretch;
  width: 35px;
  input {
    text-align: center;
    border: 0px;
  }
  .btn-input-count {
    border: 0px;
    border-radius: 0px 0px 10px 10px;
    &:nth-child(1) {
      border-radius: 10px 10px 0px 0px;
    }
  }
}
</style>
