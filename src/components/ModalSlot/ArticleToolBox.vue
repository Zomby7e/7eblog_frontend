<template>
  <div id="article-toolbox-root">
    <div v-for="(item, index) in menuOptions" :key="index" class="option" @click="onOptionClick(index)">
      {{ item }}
    </div>
    <div style="color: gray; margin-top: 15px; font-size: 0.85rem;">这是一篇内容的工具菜单</div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import emitter from '@/utils/emitter'

export default defineComponent({
  name: 'ArticleToolBox',
  setup () {
    const menuOptions = ref([
      '保存本篇内容',
      '复制分享链接'
    ])

    /**
     * When some option clicked, this will be executed.
     * @param optionId Option number which decides what to do
     */
    const onOptionClick = (optionId: number) => {
      switch (optionId) {
        case 0:
          saveAndDownload()
          break
        case 1:
          navigator.clipboard.writeText(window.location.href).then(
            () => {
              menuOptions.value[1] = '复制成功！'
              setTimeout(() => {
                menuOptions.value[1] = '复制分享链接'
              }, 3000)
            }
          ).catch(
            (error) => {
              console.log('Copy to clipboard failed: ', error)
              menuOptions.value[1] = '复制失败（可能是因为浏览器阻止本网站访问剪切板）'
              setTimeout(() => {
                menuOptions.value[1] = '复制分享链接'
              }, 3000)
            }
          )
          break
        default:
          break
      }
    }
    /**
     * Save the currently read article to a Markdown text file.
     */
    const saveAndDownload = () => {
      emitter.emit('onSavingArticle', null)
    }
    return {
      menuOptions,
      onOptionClick
    }
  }
})
</script>

<style scoped>
#article-toolbox-root {
  user-select: none;
  text-align: center;
}

.option {
  color: #B721FF;
}

.option:hover {
  color: #21D4FD;
  cursor: pointer;
}
</style>
