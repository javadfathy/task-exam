<script setup>
import {ref} from "vue";

const customers = [
  { id: 1, name: "Ahmad", city: "Tehran" },
  { id: 2, name: "Mehran", city: "Shiraz" },
  { id: 3, name: "Ali", city: "Esfahan" },
];
const products = [
  { id: 101, name: "Laptop", category: "Electronics" },
  { id: 102, name: "Mouse", category: "Electronics" },
  { id: 103, name: "Monitor", category: "Electronics" },
  { id: 104, name: "Coffee Maker", category: "Home Appliances" },
  { id: 105, name: "Blender", category: "Home Appliances" },
  { id: 106, name: "Headphones", category: "Electronics" },
];

const purchases = [
  { customerId: 1, productId: 101, date: "2025-03-01" },
  { customerId: 1, productId: 102, date: "2025-02-02" },
  { customerId: 2, productId: 103, date: "2025-02-05" },
  { customerId: 2, productId: 104, date: "2025-02-06" },
  { customerId: 3, productId: 105, date: "2025-02-07" },
  { customerId: 3, productId: 106, date: "2025-02-08" },
  { customerId: 1, productId: 104, date: "2025-02-10" },
];

const getCustomerProducts = (purchases, customerId) => {
  const customerPurchases = purchases.filter(p => p.customerId === customerId)
  return customerPurchases.map(purchase => {
    return products.find(p => p.productId === purchase.id);
  })
}


const getMostPurchaseCategory = (purchases, customerId) => {
  const customerPurchases = purchases.filter(p => p.customerId === customerId)
  const categoryCount = []
  customerPurchases.forEach(purchase => {
    const product = products.find(p => p.id === purchase.productId)
    if (product) {
      categoryCount[product.category] = (categoryCount[product.category] || 0) + 1
    }
  })

  const mostPurchased = Object.entries(categoryCount).sort((a, b) => b[1] - a[1])[0]

  return mostPurchased ? mostPurchased[0] : null
}
const recommandProducts = ref([])
const recommendProducts = (customerId) => {
  const currentCustomerPurchase = purchases.filter(p => p.customerId === customerId)

  const popularCategory = []

  currentCustomerPurchase.forEach(purchase => {
    const product = products.find(p => p.id === purchase.productId)
    if (product && !popularCategory.includes(product.category)) {
      popularCategory.push(product.category)
    }
  })

  const similarCustomers = customers.filter(customer => {
    return (
        customer.id !== customerId && customer.city === customers[customerId].city
    )
  })

  const similarProducts = []

  similarCustomers.forEach(customer => {
    const thierPurchases = purchases.filter(p => p.customerId === customer.id)
    thierPurchases.forEach(p => {
      const product = products.find(prod => prod.id === p.productId)

      if (product && popularCategory.includes(product.category) && !currentCustomerPurchase.some(p => p.productId === product.id)) {
        similarProducts.push(product)
      }
    })
  })

  recommandProducts.value = [...new Set(similarProducts)]
}

recommendProducts(1)
</script>

<template>
  <section>
   {{getCustomerProducts(purchases, 1)}}

 {{getMostPurchaseCategory(purchases, 1)}}
    {{recommandProducts}}
  </section>
</template>