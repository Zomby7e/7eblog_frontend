<template>
  <div class="about">
    <MarkdownArticle id="none" type="about"></MarkdownArticle>
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
