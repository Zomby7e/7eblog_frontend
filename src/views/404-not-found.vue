<template>
  <div id="root">
    <h1>404 Not found</h1>
    <span>After 3 seconds it will be redirect to the home page.</span>
  </div>
</template>

<script>
import { defineComponent, onMounted } from 'vue'

export default defineComponent({
  name: '404-not-found',
  setup () {
    onMounted(() => {
      setTimeout(() => {
        location.href = location.origin
      }, 3000)
    })
  }
})
</script>

<style scoped>

</style>
