<template>
  <aside class="admin-layout">
    <ul class="list-admin-menu">
      <li class="my-3" v-for="item in dataMenu" :key="item.path">
        <router-link :to="item.path"><Icon :icon="item.icon"></Icon> {{ item.name }}</router-link>
      </li>
    </ul>
  </aside>
  <router-view />
</template>

<script lang="js" setup>
import { ref } from 'vue'
import { Icon } from '@iconify/vue'
const dataMenu = ref([
  {
    name: 'Список заказов',
    path: '/admin/home',
    icon: 'icon-park-outline:transaction-order'
  },
  {
    name: 'Товары и Автомобили',
    path: '/admin/cars-and-products',
    icon: 'icon-park-outline:ad-product'
  }
])
</script>

<style>
.list-admin-menu {
  width: 300px;
  position: absolute;
  top: 130px;

  a {
    color: black;
  }
}
</style>
