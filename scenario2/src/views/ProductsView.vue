<script setup>
import {ref} from "vue";
import {useStoreData} from "@/stores/storeData.js";
import {storeToRefs} from "pinia";

const store = useStoreData();

const { userInfo } = storeToRefs(store)

const products = ref([
  { id: 101, name: "Laptop", category: "Electronics" },
  { id: 102, name: "Mouse", category: "Electronics" },
  { id: 103, name: "Monitor", category: "Electronics" },
  { id: 104, name: "Coffee Maker", category: "Home Appliances" },
  { id: 105, name: "Blender", category: "Home Appliances" },
  { id: 106, name: "Headphones", category: "Electronics" },
])
</script>

<template>
  <div v-for="product in products" :key="product.id">
    <p>{{product}}</p> <button @click="store.addToCart(product.id)">add to cart</button>
  </div>
</template>