<template>
  <div id="navbar-root">
    <div id="navbar-background">
      <div id="header-center-title">Zomby7e's Blog</div>
      <div id="header-center-links">
        <router-link to="/" class="header-center-link" @click="closeModalWindow()">Home</router-link>
        <router-link to="/about" class="header-center-link" @click="closeModalWindow()">About Me</router-link>
        <a href="javascript:void(0);" class="header-center-link" @click="changeVisible(1)">Friend Links</a>
        <a href="javascript:void(0);" class="header-center-link" @click="changeVisible(2)"
           v-if="visibleToolbox()">Article Tools</a>
      </div>
    </div>
    <div style="background-color: #c7c7c7; width: 100%; height: 1px;"></div>
    <ModalWindow ref="modalWindow" :title="modalTitle" @modalClosed="modalType = 0">
      <MoreLinks :links="linksOtherSite" v-if="modalType === 1"></MoreLinks>
      <ArticleToolBox :links="linksOtherSite" v-if="modalType === 2"></ArticleToolBox>
    </ModalWindow>
  </div>
</template>

<script lang="ts">
import ModalWindow from '@/components/ModalWindow.vue'
import ArticleToolBox from '@/components/ModalSlot/ArticleToolBox.vue'
import MoreLinks from '@/components/ModalSlot/MoreLinks.vue'
import { defineComponent, ref, getCurrentInstance } from 'vue'
import emitter from '@/utils/emitter'

export default defineComponent({
  name: 'NavigationBar',
  components: {
    ModalWindow,
    ArticleToolBox,
    MoreLinks
  },
  setup () {
    const currentInstance = getCurrentInstance()?.appContext.config.globalProperties
    const modalType = ref(0)
    const modalTitle = ref('')
    const modalWindow = ref()
    const linksOtherSite = ref([
      {
        name: 'The Free Software Foundation',
        link: 'https://www.fsf.org/'
      },
      {
        name: 'The Modern JavaScript Tutorial',
        link: 'https://javascript.info/'
      },
      {
        name: 'AlternativeTo',
        link: 'https://alternativeto.net/'
      }
    ])

    const changeVisible = (mModaltype: number) => {
      switch (modalType.value) {
        case 0:
          modalWindow.value?.changeVisible()
          modalType.value = mModaltype
          break
        case 1:
        case 2:
          if (modalType.value === mModaltype) {
            modalWindow.value?.changeVisible()
            modalType.value = 0
          } else {
            modalType.value = mModaltype
          }
          break
      }
      switch (modalType.value) {
        case 1:
          modalTitle.value = '可以看看这些链接'
          break
        case 2:
          modalTitle.value = '工具盒'
      }
    }

    const visibleToolbox = () => {
      let visible = false
      const allowedPath = ['/read', '/note', '/about']
      allowedPath.forEach((path) => {
        if (path === currentInstance?.$route.path) {
          visible = true
        }
      })
      return visible
    }

    const closeModalWindow = () => {
      emitter.emit('closeModalWindow', null)
    }

    return {
      linksOtherSite,
      visibleToolbox,
      closeModalWindow,
      changeVisible,
      modalWindow,
      modalType,
      modalTitle
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
