import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useAuthentication = defineStore('authentication', () => {
  const isAuth = ref(false)
  const token = ref(false)
  function getToken() {
    token.value = localStorage.getItem('Token')
    if (token.value == null) {
      isAuth.value = false
    } else {
      isAuth.value = true
    }
  }
  function logout() {
    localStorage.removeItem('Token')
    isAuth.value = false
    token.value = null
    location.reload()
  }

  return { getToken, isAuth, token, logout }
})
