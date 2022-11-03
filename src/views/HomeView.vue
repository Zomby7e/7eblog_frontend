<template>
  <div id="home-root">
    <div class="list-border">
      <ArticleList
        :currentPage="0"
        :pageSize='10'
      ></ArticleList>
    </div>
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

<style scoped>
@media (orientation: portrait ) {
  .list-border {
    padding: 8px 8px;
  }
}
@media (orientation: landscape ) {
  .list-border {
    padding: 8px 30vw;
  }
}

</style>
