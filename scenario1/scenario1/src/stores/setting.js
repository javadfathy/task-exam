import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useSettingStore = defineStore('setting', () => {
  const theme = ref('light')
  const fontSize = ref('small')
  const getSetting = computed(() => {
    theme.value = localStorage.getItem('theme') ?? 'light'
    fontSize.value = localStorage.getItem('fontSize') ?? 'small'
  })
  function changeTheme(value) {
    theme.value = value
    updateStorage()
  }

  function changeFontSize(value) {
    fontSize.value = value
    updateStorage()
  }

  function updateStorage() {
    localStorage.setItem('theme', theme.value)
    localStorage.setItem('fontSize', fontSize.value)
  }

  return { fontSize, theme, getSetting, changeTheme, changeFontSize }
})
