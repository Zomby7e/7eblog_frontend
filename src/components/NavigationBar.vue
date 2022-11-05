<template>
  <div id="navbar-root">
    <div id="navbar-background">
      <div id="header-center-title">Zomby7e's Blog</div>
      <div id="header-center-links">
        <router-link to="/" class="header-center-link">Home</router-link>
        <router-link to="/about" class="header-center-link">About</router-link>
        <a href="javascript:void(0);" class="header-center-link" @click="goDownload()"
           v-if="isSaveVisible()">Download</a>
      </div>
    </div>
    <div style="background-color: #c7c7c7; width: 100%; height: 1px;"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent, getCurrentInstance } from 'vue'
import emitter from '@/utils/emitter'

export default defineComponent({
  name: 'NavigationBar',
  setup () {
    const currentInstance = getCurrentInstance()?.appContext.config.globalProperties
    const isSaveVisible = () => {
      let visible = false
      const allowedPath = ['/read', '/note', '/about']
      allowedPath.forEach((path) => {
        if (path === currentInstance?.$route.path) {
          visible = true
        }
      })
      return visible
    }
    const goDownload = () => {
      emitter.emit('saveArticle', null)
    }
    return {
      isSaveVisible,
      goDownload
    }
  }
})
</script>

<style scoped>
#navbar-root {
  top: 0;
  left: 0;
  right: 0;
}

@media (orientation: landscape ) {
  #navbar-background {
    padding: 0 30vw;
    display: flex;
    flex-direction: column;
    height: 80px;
    justify-content: space-around;
  }
}

@media (orientation: portrait ) {
  #navbar-background {
    max-width: 90vw;
    margin-right: auto;
    margin-left: auto;
    padding: 30px;
    display: flex;
    flex-direction: column;
    height: 80px;
    justify-content: space-around;
  }
}

#header-center-title {
  font-size: 2rem;
  color: #424242;
  text-align: left;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  user-select: none;
}

#header-center-links {
  display: flex;
  overflow-x: auto;
  /*Only supports Firefox*/
  scrollbar-width: none;
  user-select: none;
}

/*Supports Chromium and Safari*/
#header-center-links::-webkit-scrollbar {
  display: none;
}

.header-center-link {
  margin-right: 1.5rem;
  flex-shrink: 0;
}

a:link, a:visited {
  color: #424242;
  text-decoration: none;
}

a:hover {
  color: #424242;
  text-decoration: underline;
}

a:active {
  text-shadow: 5px 5px 5px #21D4FD;
}
</style>
