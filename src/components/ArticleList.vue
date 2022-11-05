<template>
  <div id="article-list-root">
    <div v-for="(item, index) in articleList"
         :key="index"
    >
      <div class="article-time">{{ formatDate(item.timestamp) }}</div>
      <div class="article-title" @click="goRead(item)">{{ item.title }}</div>
      <div class="hashtag-container">
        <text
          class="hashtag-name"
          v-for="(hashtagItem, index) in item.hashtag" :key="index" :title="hashtagItem.comment">
          {{ hashtagItem.name + ' ' }}
        </text>
      </div>
      <br>
    </div>
    <ArticleListPagination v-if="false"></ArticleListPagination>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onBeforeMount, watch, toRefs, getCurrentInstance } from 'vue'
import { getReadList } from '@/utils/web-api'
import { toDateChinese } from '@/utils/time-format'
import { Article } from '@/utils/bean'
import ArticleListPagination from '@/components/ArticleListPagination.vue'

export default defineComponent({
  name: 'ArticleList',
  props: {
    currentPage: Number,
    pageSize: Number
  },
  components: {
    ArticleListPagination
  },
  setup (props) {
    const currentInstance = getCurrentInstance()?.appContext.config.globalProperties
    let mCurrentPage = 0
    let mPageSize = 10
    let webApiLock = false
    const articleList = ref([])
    const {
      currentPage,
      pageSize
    } = toRefs(props)
    /**
     * @description get article list from api
     */
    const getList = () => {
      if (!webApiLock) {
        webApiLock = true
        getReadList(mCurrentPage, mPageSize).then(
          response => {
            articleList.value = response.data ?? []
            webApiLock = false
          }
        ).catch(
          error => {
            console.log(error)
            webApiLock = false
          }
        )
      }
    }
    /**
     * Convert timestamp(milliseconds) to readable text
     * @param timestamp Accurate to milliseconds
     * @return {string} formatted time information
     */
    const formatDate = (timestamp: number) => {
      return toDateChinese(timestamp)
    }
    const goRead = (article: Article) => {
      currentInstance?.$router.push({
        path: '/read',
        query: {
          id: article.id,
          type: 'read'
        }
      })
    }
    onBeforeMount(() => {
      getList()
    })
    watch(currentPage, () => {
      mCurrentPage = currentPage.value ?? 0
      getList()
    })
    watch(pageSize, () => {
      mPageSize = pageSize.value ?? 0
      getList()
    })
    return {
      articleList,
      formatDate,
      goRead
    }
  }
})
</script>

<style scoped>
#article-list-root {
  user-select: none;
}

.article-time {
  margin-top: 2rem;
  color: gray;
  font-size: 0.8rem;
  margin-bottom: 0.2rem;
}

.article-title {
  color: #4d73dc;
  font-size: 1.5rem;
  display: inline-block;
  margin-bottom: 0.2rem;
}

.article-title:hover {
  cursor: pointer;
  color: #363636;
}

.hashtag-name {
  font-size: 0.8rem;
  padding: 0.25rem;
  border-radius: 0.6rem;
  color: gray;
}

.hashtag-name:hover {
  color: #2c3e50;
  text-decoration: underline #2c3e50 solid;
}

.hashtag-container {
  display: flex;
}
</style>
