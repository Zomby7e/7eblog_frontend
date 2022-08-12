<template>
  <div id="article-container">
    <div id="markdownHtml" v-html="markdownHtml"></div>
  </div>
</template>

<script>
import showdown from 'showdown'
import { getReadData } from '@/utils/web-api'

export default {
  name: 'MarkdownArticle',
  props: ['id'],
  data () {
    return {
      articleData: {
        content: '',
        hashtag: '',
        id: '',
        timestamp: 0,
        title: ''
      },
      markdownHtml: ''
    }
  },
  methods: {
    initData () {
      const converter = new showdown.Converter()
      getReadData(this.id).then(
        response => {
          this.articleData = response.data
          this.markdownHtml = converter.makeHtml(response.data.content)
        }
      ).catch(
        error => {
          console.log(error)
        }
      )
    }
  },
  beforeMount () {
    this.initData()
  }
}
</script>

<style scoped lang="scss">
#article-container {
  padding: 0 80px;
}

#markdownHtml :deep h1, #markdownHtml :deep h2, #markdownHtml :deep h3, #markdownHtml :deep h4, #markdownHtml :deep h5,
#markdownHtml :deep h6 {
  color: #c360fd;
}

#markdownHtml :deep h1 {
  font-size: 2rem;
}

#markdownHtml :deep h2 {
  font-size: 1.8rem;
}

#markdownHtml :deep h3 {
  font-size: 1.6rem;
}

#markdownHtml :deep h4 {
  font-size: 1.4rem;
}

#markdownHtml :deep h5 {
  font-size: 1.2rem;
}

#markdownHtml :deep h6 {
  font-size: 1.2rem;
}

#markdownHtml :deep blockquote {
  background-color: rgba(213, 175, 248, 0.1);
  border: #e5e5e5 solid 1px;
  border-radius: 5px;
  padding: 0 12px;
  margin: 0;
  position: relative;
  overflow: hidden;
}

#markdownHtml :deep blockquote::before {
  background-color: #c360fd;
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: .30rem;
}

</style>
