<script setup>
import {useSettingStore} from "@/stores/setting.js";
import {storeToRefs} from "pinia";
import {onMounted} from "vue";

const settingStore = useSettingStore()

const { theme, fontSize } = storeToRefs(settingStore)

onMounted(() => {
  settingStore.getSetting
})
</script>

<template>
  <section>
    <div class="setting-button">
      <button @click="counterStore.changeFontSize('small')">
        change FontSize to small
      </button>
      <button @click="counterStore.changeFontSize('medium')">
        change FontSize to medium
      </button>
      <button @click="counterStore.changeFontSize('large')">
        change FontSize to large
      </button>
    </div>
    <div class="setting-button">
      <button @click="counterStore.changeTheme('light')">
        change Theme to light
      </button>
      <button @click="counterStore.changeTheme('dark')">
        change Theme to dark
      </button>
    </div>
    <div>
      <p>YOUR FONT SIZE IS: {{fontSize}}</p>
      <p>YOUR THEME IS: {{theme}}</p>
    </div>
  </section>
</template>

<style scoped>
.setting-button {
  display: flex;
  gap: 5px;
  margin-top: 10px;
}
.setting-button button {
  background: #2c3e50;
  color: white;
  outline: none;
  border: 0;
  padding: 10px;
  cursor: pointer;
}
</style>