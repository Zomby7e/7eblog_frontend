<template>
  <div id="article-container" @click="closeModalWindow()">
    <div id="markdownHtml" v-html="markdownHtml" v-show="showHtml"></div>
    <!--    This HTML fragment is used to show the loading animation and hint-->
    <div id="loading" v-if="!showHtml">
      <div class="lds-heart">
        <div></div>
      </div>
      <div id="loading-text">
        <text>正在加载内容，如果加载出错请点击</text>
        <text id="loading-reload" @click="reload">刷新</text>
        <text>。</text>
      </div>
    </div>
    <!--    Loading animation - END-->
  </div>

</template>

<script lang="ts">
import { defineComponent } from 'vue'
import showdown from 'showdown'
import { getReadData, getNoteData, getAboutData } from '@/utils/web-api'
import hljs from 'highlight.js'
import 'highlight.js/styles/atom-one-dark-reasonable.css'
import { saveAs } from 'file-saver'
import emitter from '@/utils/emitter'

export default defineComponent({
  name: 'MarkdownArticle',
  props: ['id', 'type'],
  data () {
    return {
      articleData: {
        content: '',
        hashtag: '',
        id: '',
        timestamp: 0,
        title: ''
      },
      markdownHtml: '',
      showHtml: false
    }
  },
  methods: {
    initData () {
      const onSuccess = (response: any) => {
        this.articleData = response.data
        this.markdownHtml = converter.makeHtml(response.data.content)
        window.document.title = this.articleData.title
        // It doesn't work without it written like this, I don't know why.
        setTimeout(() => {
          hljs.highlightAll()
          this.showHtml = true
        }, 0)
      }

      const onError = (error: string) => {
        console.error(error)
      }

      const onAboutSuccess = (response: any) => {
        this.articleData.content = response.data
        this.articleData.title = 'about'
        this.markdownHtml = converter.makeHtml(response.data)
        window.document.title = this.articleData.title
        // It doesn't work without it written like this, I don't know why.
        setTimeout(() => {
          hljs.highlightAll()
          this.showHtml = true
        }, 0)
      }

      const converter = new showdown.Converter()

      switch (this.type) {
        case 'about':
          getAboutData().then(onAboutSuccess).catch(onError)
          break
        case 'read':
          getReadData(this.id).then(onSuccess).catch(onError)
          break
        case 'note':
          getNoteData(this.id).then(onSuccess).catch(onError)
          break
      }
    },
    reload () {
      location.reload()
    },
    closeModalWindow () {
      emitter.emit('closeModalWindow', null)
    }
  },
  beforeMount () {
    this.initData()
    emitter.on('onSavingArticle', () => {
      const params = new URLSearchParams(window.location.search)
      const fileName = this.articleData.title ?? params.get('id') ?? 'Blog content'
      const blob = new Blob([this.articleData.content], { type: 'text/plain;charset=utf-8' })
      saveAs(blob, `${fileName}.md`)
    })
  },
  beforeUnmount () {
    emitter.off('onSavingArticle')
  }
})
</script>

<style scoped lang="scss">
@media (orientation: portrait) {
  #article-container {
    max-width: 90vw;
    margin-right: auto;
    margin-left: auto;
    padding: 0 30px;
  }
}

@media (orientation: landscape) {
  #article-container {
    max-width: 90vw;
    margin-right: auto;
    margin-left: auto;
    padding: 0 30vw;
  }
}

#markdownHtml :deep(h1), #markdownHtml :deep(h2), #markdownHtml :deep(h3), #markdownHtml :deep(h4), #markdownHtml :deep(h5),
#markdownHtml :deep(h6) {
  color: #2c3e50;
}

#markdownHtml :deep(h1) {
  font-size: 2rem;
}

#markdownHtml :deep(h2) {
  font-size: 1.8rem;
}

#markdownHtml :deep(h3) {
  font-size: 1.6rem;
}

#markdownHtml :deep(h4) {
  font-size: 1.4rem;
}

#markdownHtml :deep(h5) {
  font-size: 1.2rem;
}

#markdownHtml :deep(h6) {
  font-size: 1.2rem;
}

#markdownHtml :deep(blockquote) {
  background-color: rgba(208, 243, 252, 0.1);
  border: #e5e5e5 solid 1px;
  border-radius: 1px;
  padding: 0 12px;
  margin: 0;
  position: relative;
  overflow: hidden;
}

#markdownHtml :deep(blockquote::before) {
  background-color: gray;
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: .30rem;
}

// red heart loading animation - START
// https://loading.io/css/
.lds-heart {
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;
  transform: rotate(45deg);
  transform-origin: 40px 40px;
}

.lds-heart div {
  top: 32px;
  left: 32px;
  position: absolute;
  width: 32px;
  height: 32px;
  background: rgb(165, 4, 255);
  animation: lds-heart 1.2s infinite cubic-bezier(0.215, 0.61, 0.355, 1);
}

.lds-heart div:after,
.lds-heart div:before {
  content: " ";
  position: absolute;
  display: block;
  width: 32px;
  height: 32px;
  background: rgb(165, 4, 255);
}

.lds-heart div:before {
  left: -24px;
  border-radius: 50% 0 0 50%;
}

.lds-heart div:after {
  top: -24px;
  border-radius: 50% 50% 0 0;
}

@keyframes lds-heart {
  0% {
    transform: scale(0.95);
  }
  5% {
    transform: scale(1.1);
  }
  39% {
    transform: scale(0.85);
  }
  45% {
    transform: scale(1);
  }
  60% {
    transform: scale(0.95);
  }
  100% {
    transform: scale(0.9);
  }
}

// red heart loading animation - END
#loading {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

#loading-text {
  margin-top: 15px;
  color: gray;
}

#loading-reload {
  color: #B721FF;
  cursor: pointer;
}
</style>
