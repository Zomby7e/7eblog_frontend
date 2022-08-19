<template>
  <div class="article-list">
    <div v-for="(item, index) in articleList"
         :key="index"
    >
      <div @click="goRead(item)">{{ item.title }}</div>
      <div>{{ 'content of this title' }}</div>
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

</style>
