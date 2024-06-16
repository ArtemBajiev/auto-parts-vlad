<template>
  <header>
    <div class="container">
      <nav class="menu-container">
        <div class="logo p-4"><img height="60px" src="/src/assets/img/logo.png" alt="" /></div>
        <ul class="menu">
          <li
            v-show="
              (storeAuthentication.isAuth == true && item.auth != false) ||
              (storeAuthentication.isAuth == false && item.auth != true)
            "
            class="menu-item"
            v-for="item in menuData"
            :key="item.url"
          >
            <Icon color="white" class="me-2" :icon="item.icon" /><router-link :to="item.url">{{
              item.name
            }}</router-link>
          </li>
          <li v-if="storeAuthentication.isAuth == true" class="menu-item">
            <button class="btn" @click="storeAuthentication.logout()">
              <Icon color="white" class="me-2" icon="icon-park-outline:logout" />
              Выйти
            </button>
          </li>
          <li v-if="storeAuthentication.isAuth == true" class="menu-item">
            <router-link v-if="store.user?.admin" to="/admin">
              <Icon color="white" class="me-2" icon="icon-park-outline:add-mode" />
              Админ
            </router-link>
          </li>
        </ul>
        <div class="shopping-card">
          <router-link to="/cart">
            <Icon height="30" color="white" :icon="'iconamoon:shopping-card-bold'" />
            <span v-if="storeShopping.ShoppingListCart.length > 0">
              {{ storeShopping.ShoppingListCart.length }}
            </span>
          </router-link>
        </div>
      </nav>
    </div>
  </header>
</template>

<script lang="js" setup>
import { ref } from 'vue'
import { Icon } from '@iconify/vue'
import { useShoppingCard } from '@/stores/shoppingCard'
import { onMounted } from 'vue'
import { useAuthentication } from '@/stores/authentication'
import { useGlobalStore } from '@/stores/globalStore'
const store = useGlobalStore()
const storeAuthentication = useAuthentication()
const storeShopping = useShoppingCard()
onMounted(() => {
  storeShopping.getCart()
})
const menuData = ref([
  {
    name: 'Главная',
    url: '/',
    icon: 'radix-icons:home'
  },
  {
    name: 'Каталог',
    url: '/products',
    icon: 'icon-park-outline:ad-product'
  },
  {
    name: 'Заказы',
    url: '/orders',
    icon: 'icon-park-outline:transaction-order',
    auth: true
  },
  {
    name: 'Войти',
    url: '/login',
    icon: 'icon-park-outline:login',
    auth: false
  }
])
</script>

<style scoped>
header {
  height: 100px;
  background-color: var(--secondary);
}
.menu-container {
  display: flex;
  justify-content: space-between;
}
.menu {
  display: flex;
  justify-content: space-between;
  flex: 1 1 auto;
  padding-top: 10px;
  align-items: center;
}
.shopping-card {
  margin: 25px;
  background-color: var(--primary);
  border-radius: 20px;
  width: 80px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.menu-item {
  .btn {
    color: white;
  }
}
</style>
