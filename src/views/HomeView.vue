<template>
  <div class="home-root">
    <ArticleList
      :currentPage="0"
      :pageSize='10'
    ></ArticleList>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import ArticleList from '@/components/ArticleList.vue'

export default defineComponent({
  name: 'HomeView',
  components: {
    ArticleList
  }
})

</script>
