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
<script lang="ts">
import NavigationBar from '@/components/NavigationBar.vue'

export default {
  components: { NavigationBar },
  mounted () {
    console.groupCollapsed('%cThis site is powered by an open source microblogging system (Click this message to view source code)',
      'font-size: 1.2rem;')
    console.log('https://github.com/Zomby7e/7eblog_frontend')
    console.log('https://github.com/Zomby7e/7eblog_backend')
    console.groupEnd()
  }
}
</script>
