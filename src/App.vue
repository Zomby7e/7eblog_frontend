<template>
  <NavigationBar></NavigationBar>
  <router-view/>
  <BottomBar></BottomBar>
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
import BottomBar from '@/components/BottomBar.vue'

export default {
  components: { BottomBar, NavigationBar },
  mounted () {
    console.groupCollapsed('%cThis site is powered by an open source microblogging system (Click this message to view source code)',
      'font-size: 1.2rem;')
    console.log('https://github.com/Zomby7e/7eblog_frontend')
    console.log('https://github.com/Zomby7e/7eblog_backend')
    console.groupEnd()
    window.document.title = "Zomby7e's Blog"
  }
}
</script>
