<script setup>

import {ref} from "vue";
import axios from "axios";

const userIdInput = ref()
const loading = ref(false)
const error = ref(null)
const currentUser = ref(null)
const userCache = ref([])
const currentRequest = ref()
const latestRequest = ref(0)


const fetchUserData = async () => {
  const userId = userIdInput.value.toString().trim()

  if (!userId) return;

  if (userCache.value[userId]) {
    currentUser.value = userCache.value[userId];
    return;
  }

  if (currentRequest.value) {
    currentRequest.value.cancel('request cancel')
  }

  const cancelToken = axios.CancelToken
  const source = cancelToken.source()
  currentRequest.value = source

  const requestID = ++latestRequest.value

  loading.value = true
  error.value = null

  try {
    const res = await axios.get(`https://jsonplaceholder.typicode.com/users/${userId}`, {
      cancelToken: source.token
    })
    console.log(requestID)
    console.log(latestRequest.value)
    if (requestID === latestRequest.value) {
      currentUser.value = res.data
      userCache.value[userId] = res.data
    }
  }catch (e) {
    if (!axios.isCancel(e)) {
      if (requestID === latestRequest.value) {
        error.value = e.message
      }
    }
  } finally {
    if (requestID === latestRequest.value) {
      loading.value = false
      currentRequest.value = null
    }
  }

}
</script>
<template>
  <div class="dashboard">
    <div>
      <input v-model="userIdInput" @input="fetchUserData"/>
      <button @click="fetchUserData">fetch user Data</button>
      <br />
      <div v-if="loading">loading...</div>
      <div v-if="error">{{error}}</div>
    </div>
    <div v-if="currentUser">
      user Detail: {{currentUser}}
    </div>
    <div>
      cache:
      <div>{{userCache}}</div>
    </div>
  </div>
</template>