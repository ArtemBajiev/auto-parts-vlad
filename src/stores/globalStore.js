import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useGlobalStore = defineStore('globalStore', () => {
  const url = ref('http://api.work.custom-development-team.su/')

  return { url }
})
