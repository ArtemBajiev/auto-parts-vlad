import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useShoppingCard = defineStore('shoppingCard', () => {
  const ShoppingListCart = ref([])

  function addCard(id) {
    const find = ShoppingListCart.value.find((x) => x.id == id)
    if (find == undefined) {
      ShoppingListCart.value.push({ id: id, quantity: 1 })
    } else {
      find.quantity += 1
    }
    localStorage.setItem('cart', JSON.stringify(ShoppingListCart.value))
  }
  function getCart() {
    ShoppingListCart.value =
      localStorage.getItem('cart') != null ? JSON.parse(localStorage.getItem('cart')) : []
  }
  function updateShoppingCard(newData) {
    ShoppingListCart.value = []
    for (let i = 0; i < newData.length; i++) {
      ShoppingListCart.value.push({ id: newData[i].id, quantity: newData[i].quantity })
    }
    localStorage.setItem('cart', JSON.stringify(ShoppingListCart.value))
  }

  return { getCart, addCard, ShoppingListCart, updateShoppingCard }
})
