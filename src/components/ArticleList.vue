<template>
  <div class="article-list">
    <div v-for="(item, index) in articleList"
         :key="index"
    >
      <div class="article-title" @click="goRead(item)">{{ item.title }}</div>
      <div>
        <text>{{ formatDate(item.timestamp) }}</text>&nbsp;
        <text
          v-for="(hashtagItem, index) in item.hashtag" :key="index" :title="hashtagItem.comment">
          {{ '#' + hashtagItem.name + ' ' }}
        </text>
      </div>
      <br>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onBeforeMount, watch, toRefs, getCurrentInstance } from 'vue'
import { getReadList } from '@/utils/web-api'
import { toDateChinese } from '@/utils/time-format'

export default defineComponent({
  name: 'ArticleList',
  props: {
    currentPage: Number,
    pageSize: Number
  },
  setup (props) {
    const currentInstance = getCurrentInstance()?.appContext.config.globalProperties
    let mCurrentPage = 0
    let mPageSize = 10
    let webApiLock = false
    const articleList = ref([])
    const { currentPage, pageSize } = toRefs(props)
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
    const goRead = (article: any) => {
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
    return { articleList, formatDate, goRead }
  }
})
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
