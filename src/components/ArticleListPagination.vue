<template>
  <div id="pagination-root">
    <div id="pagination-click">
      <div>Previous</div>
      <div>{{ 2 }}</div>
      <div>Next</div>
    </div>

    <div id="pagination-go">
      <div>Total: {{ 12 }}</div>
      <div>
        <input type="number" >
        <button>Go</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'ArticleListPagination',
  setup () {
    const startPage = ref(1)
    const endPage = ref(5)
    return {
      startPage,
      endPage
    }
  }
})
</script>

<style scoped>

#pagination-root {
  user-select: none;
  width: 100%;
  display: flex;
  gap: 1rem;
  overflow: scroll;
  scrollbar-width: none;
  justify-content: center;
  flex-direction: column;
}

#pagination-click, #pagination-go {
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
}
</style>
