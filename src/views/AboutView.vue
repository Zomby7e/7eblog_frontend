<template>
  <div class="about">
    <MarkdownArticle id="rust-tutorial"></MarkdownArticle>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import MarkdownArticle from '@/components/MarkdownArticle.vue'

export default defineComponent({
  name: 'AboutView',
  components: {
    MarkdownArticle
  }
})
</script>
<!--https://cdn.jsdelivr.net/gh/highlightjs/cdn-release@11.6.0/build/styles/atom-one-dark-reasonable.min.css-->
