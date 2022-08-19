<template>
  <div>
    <MarkdownArticle :id="$route.query.id" :type="$route.query.type"></MarkdownArticle>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import MarkdownArticle from '@/components/MarkdownArticle.vue'

export default defineComponent({
  name: 'ReadView',
  components: {
    MarkdownArticle
  }
})
</script>
