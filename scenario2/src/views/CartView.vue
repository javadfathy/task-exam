<script setup>
import {useStoreData} from "@/stores/storeData.js";
import {storeToRefs} from "pinia";

const store = useStoreData();

const { cart, purchases } = storeToRefs(store)
</script>

<template>
  <section>
    <p v-for="(item, index) in cart" :key="item">{{item}}<button @click="store.removeFromCart(index)">remove</button></p>
    <p><button @click="store.checkout">Checkout</button></p>
    {{purchases}}
  </section>
</template>