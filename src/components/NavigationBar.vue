<template>
  <div id="navbar-root">
    <div id="navbar-background">
      <div id="header-center-title">Zomby7e's Blog</div>
      <div id="header-center-links">
        <router-link to="/" class="header-center-link">主页</router-link>
        <router-link to="/about" class="header-center-link">关于</router-link>
        <a href="javascript:void(0);" class="header-center-link" @click="changeVisible(1)">更多链接</a>
        <a href="javascript:void(0);" class="header-center-link" @click="changeVisible(2)" v-if="visibleToolbox()">工具盒</a>
      </div>
    </div>
    <ModalWindow ref="modalWindow" :icon="modalIcon" :title="modalTitle" @modalClosed="this.modalType = 0">
      <MoreLinks :links="linksOtherSite" v-if="modalType === 1"></MoreLinks>
      <ArticleToolBox :links="linksOtherSite" v-if="modalType === 2"></ArticleToolBox>
    </ModalWindow>
  </div>
</template>

<script>
import ModalWindow from '@/components/ModalWindow'
import ArticleToolBox from '@/components/ModalSlot/ArticleToolBox'
import MoreLinks from '@/components/ModalSlot/MoreLinks'

export default {
  components: {
    ModalWindow,
    ArticleToolBox,
    MoreLinks
  },
  name: 'NavigationBar',
  data () {
    return {
      isModalVisible: false,
      modalType: 0,
      modalTitle: '',
      modalIcon: '',
      linksOtherSite: [
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
      ]
    }
  },
  methods: {
    changeVisible (modalType) {
      switch (this.modalType) {
        case 0:
          this.$refs.modalWindow.changeVisible()
          this.modalType = modalType
          break
        case 1:
        case 2:
          if (this.modalType === modalType) {
            this.$refs.modalWindow.changeVisible()
            this.modalType = 0
          } else {
            this.modalType = modalType
          }
          break
      }
      switch (this.modalType) {
        case 1:
          this.modalTitle = '可以看看这些链接'
          this.modalIcon = 'fa-link'
          break
        case 2:
          this.modalTitle = '工具盒'
          this.modalIcon = 'fa-cog'
      }
    },
    visibleToolbox () {
      let visible = false
      const allowedPath = ['/read', '/note', '/about']
      allowedPath.forEach((path) => {
        if (path === this.$route.path) {
          visible = true
        }
      })
      return visible
    }
  }
}
</script>

<style scoped>
#navbar-root {
  top: 0;
  left: 0;
  right: 0;
}

@media (orientation: landscape ) {
  #navbar-background {
    padding: 0 80px;
    background-color: #21D4FD;
    background-image: linear-gradient(248deg, #21D4FD 0%, #B721FF 100%);
    display: flex;
    flex-direction: column;
    height: 80px;
    justify-content: space-around;
  }
}

@media (orientation: portrait ) {
  #navbar-background {
    padding: 0 8px;
    background-color: #21D4FD;
    background-image: linear-gradient(248deg, #21D4FD 0%, #B721FF 100%);
    display: flex;
    flex-direction: column;
    height: 80px;
    justify-content: space-around;
  }
}

#header-center {
  display: flex;
  flex-direction: column;
  height: 80px;
  justify-content: space-around;
}

#header-center-title {
  font-size: 1.5rem;
  color: white;
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
  margin-right: 8px;
  flex-shrink: 0;
}

a:link, a:visited {
  color: white;
  text-decoration: none;
}

a:hover {
  color: white;
  text-decoration: underline;
}

a:active {
  text-shadow: 5px 5px 5px #21D4FD;
}
</style>
