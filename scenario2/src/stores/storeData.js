import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useStoreData = defineStore('data', () => {
  const userInfo = ref({ customerId: 1}) // user ID has login
  const cart = ref([])
  const purchases = ref([])
  const cartCount = computed(() => cart.value.length)
  function addToCart(productId) {
    cart.value.push({productId, customerId: userInfo.value.customerId})
  }
  function removeFromCart(index) {
    cart.value.splice(index, 1)
  }

  function checkout() {
    let data = cart.value.map((item, index) => {
      return { customerId: userInfo.value.customerId, productId: item.productId, data: new Date().toISOString() }
    })
    purchases.value.push(...data)
  }

  return { userInfo, cartCount, addToCart, removeFromCart, cart , purchases, checkout}
})
