import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useGlobalStore = defineStore('globalStore', () => {
  const url = ref('http://api.work.custom-development-team.su/')
  const dataProducts = ref([])
  const search = ref('')
  const fullNameCar = ref([{ name: '' }, { name: '' }, { name: '' }, { name: '' }])
  return { url, dataProducts, search,fullNameCar }
})
