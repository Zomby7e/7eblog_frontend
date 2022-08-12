<template>
  <NavigationBar></NavigationBar>
  <router-view/>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
<script>
import NavigationBar from '@/components/NavigationBar'

export default {
  components: { NavigationBar }
}
</script>
