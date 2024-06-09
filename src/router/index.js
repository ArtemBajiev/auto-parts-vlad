import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/pages/HomePage.vue'
import IndexPage from '@/pages/products/IndexPage.vue'
import CartPage from '@/pages/CartPage.vue'
import LoginPage from '@/pages/LoginPage.vue'
import ProductItem from '@/pages/products/ProductItem.vue'
import OrdersPage from '../pages/OrdersPage.vue'
import HomeAdmin from '@/pages/admin/HomeAdmin.vue'
import AdminLayout from '@/pages/admin/AdminLayout.vue'
import CarsAndProducts from '@/pages/admin/CarsAndProducts.vue'
import ProductItemAdmin from '@/pages/admin/ProductItemAdmin.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage
    },
    {
      path: '/products',
      name: 'products',
      component: IndexPage
    },
    {
      path: '/cart',
      name: 'cart',
      component: CartPage
    },
    {
      path: '/login',
      name: 'login',
      component: LoginPage
    },
    {
      path: '/detail/:id',
      name: 'detail',
      component: ProductItem
    },
    {
      path: '/orders',
      name: 'orders',
      component: OrdersPage,
      meta: { auth: true }
    },
    {
      path: '/admin',
      name: 'HomeAdmin',
      component: AdminLayout,
      // meta: { auth: true }
      children: [
        {
          path: '/admin/home',
          name: 'home-admin',
          component: HomeAdmin
        },
        {
          path: '/admin/cars-and-products',
          name: 'cars-and-products',
          component: CarsAndProducts
        },
        {
          path: '/admin/product-item/:id/:mod?',
          name: 'product-item',
          component: ProductItemAdmin
        }
      ]
    }
  ]
})
router.beforeEach((to, from, next) => {
  const currentUser = localStorage.getItem('Token')
  const requireAuth = to.matched.some((record) => record.meta.auth)
  if (currentUser == null && requireAuth) {
    next('/login')
  } else {
    next()
  }
})
export default router
