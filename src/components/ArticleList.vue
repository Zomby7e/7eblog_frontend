<template>
  <div class="article-list">
    <div v-for="(item, index) in articleList"
         :key="index"
    >
      <div class="article-title" @click="goRead(item)">{{ item.title }}</div>
      <div><text>{{ formatDate(item.timestamp) }}</text>&nbsp;&nbsp;&nbsp;&nbsp;<text>{{ 'hashtags: ' + item.hashtag }}</text></div>
      <br>
    </div>
  </div>
</template>

<script>
import { getReadList } from '@/utils/web-api'
import { toDateChinese } from '@/utils/time-format'

export default {
  name: 'ArticleList',
  props: ['currentPage', 'pageSize'],
  data () {
    return {
      mCurrentPage: 0,
      mPageSize: 10,
      webApiLock: false,
      articleList: []
    }
  },
  methods: {
    /**
     * [GET] Get article list from back-end.
     */
    getList () {
      if (!this.webApiLock) {
        this.webApiLock = true
        getReadList(this.mCurrentPage, this.mPageSize).then(
          response => {
            this.articleList = response.data ?? []
            console.log(response)
            this.webApiLock = false
          }
        ).catch(
          error => {
            console.log(error)
            this.webApiLock = false
          }
        )
      }
    },
    /**
     * Convert timestamp(milliseconds) to readable text
     * @param timestamp Accurate to milliseconds
     * @return {string} formatted time information
     */
    formatDate (timestamp) {
      return toDateChinese(timestamp)
    },
    goRead (article) {
      this.$router.push({
        path: '/read',
        query: {
          id: article.id,
          type: 'read'
        }
      })
    }
  },
  watch: {
    currentPage: function () {
      this.mCurrentPage = this.currentPage()
      this.getList()
    },
    pageSize: function () {
      this.mPageSize = this.pageSize()
      this.getList()
    }
  },
  beforeMount () {
    this.getList()
  }
}
</script>

<style scoped>
.article-title {
  color: #B721FF;
  font-size: 1.2rem;
  font-weight: bold;
  display: inline-block;
}

.article-title:hover {
  cursor: pointer;
}
.article-title:hover:before {
  content: "> ";
}
.article-title:hover:after {
  content: " <";
}
</style>
