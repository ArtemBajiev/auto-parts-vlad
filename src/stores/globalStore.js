import { ref } from 'vue'
import { defineStore } from 'pinia'
import orders from '@/composition/orders'

export const useGlobalStore = defineStore('globalStore', () => {
  const { GetOrders } = orders()
  const url = ref('http://api.work.custom-development-team.su/')
  const dataProducts = ref([])
  const search = ref('')
  const user = ref('')
  const fullNameCar = ref([{ name: '' }, { name: '' }, { name: '' }, { name: '' }])
  function getUser(){
    GetOrders().then((res) => {
      user.value = res.data.user
    })
  }
  getUser()
  return { url, dataProducts, search, fullNameCar, user, getUser }
})
