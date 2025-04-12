<script setup>
import {ref, watch} from "vue";
import {useStoreData} from "@/stores/storeData.js";
import {storeToRefs} from "pinia";

const store = useStoreData();

const { userInfo, cartCount } = storeToRefs(store)

const customers = ref([
  { id: 1, name: "Ahmad", city: "Tehran" },
  { id: 2, name: "Mehran", city: "Shiraz" },
  { id: 3, name: "Ali", city: "Esfahan" },
])

const userLogin = ref(1)

watch(userLogin, value => {
  userInfo.value.customerId = value;
})
</script>

<template>
  <header class="header">
    <router-link :to="{name: 'home'}" tag="a">home</router-link>
    <router-link :to="{name: 'products'}" tag="a">products</router-link>
    <router-link :to="{name: 'cart'}" tag="a">cart({{ cartCount }})</router-link>
    <select v-model="userLogin">
      <option v-for="customer in customers" :value="customer.id" :label="customer.name"></option>
    </select>
    {{userInfo}}
  </header>

  <RouterView />
</template>

<style scoped>
.header {
  display: flex;
  gap: 3px;
  color: #2c3e50;
  font-size: 1.2rem;
}
</style>
