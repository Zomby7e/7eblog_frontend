<template>
  <div id="article-toolbox-root">
    <div v-for="(item, index) in menuOptions" :key="index" class="option" @click="onOptionClick(index)">
      {{ item }}
    </div>
    <div style="color: gray; margin-top: 15px; font-size: 0.85rem;">这是一篇内容的工具菜单</div>
  </div>
</template>

<script>
import { saveAs } from 'file-saver'

export default {
  name: 'ArticleToolBox',
  data () {
    return {
      menuOptions: [
        '保存本篇内容',
        '复制分享链接'
      ]
    }
  },
  methods: {
    /**
     * When some option clicked, this will be executed.
     * @param optionId Option number which decides what to do
     */
    onOptionClick (optionId) {
      switch (optionId) {
        case 0:
          this.saveAndDownload()
          break
        case 1:
          navigator.clipboard.writeText(window.location.href).then(
            () => {
              this.menuOptions[1] = '复制成功！'
              setTimeout(() => {
                this.menuOptions[1] = '复制分享链接'
              }, 3000)
            }
          ).catch(
            (error) => {
              console.log('Copy to clipboard failed: ', error)
              this.menuOptions[1] = '复制失败（可能是因为浏览器阻止本网站访问剪切板）'
              setTimeout(() => {
                this.menuOptions[1] = '复制分享链接'
              }, 3000)
            }
          )
          break
        default:
          break
      }
    },
    /**
     * Save the currently read article to a Markdown text file.
     */
    saveAndDownload () {
      // TODO: Get and convert markdown string to blob.
      // TODO: I need a method to get a string data from another page, maybe 'mitt'?
      const params = new URLSearchParams(window.location.search)
      const fileName = params.get('id') ?? 'text'
      const blob = new Blob(['Hello, file.md'], { type: 'text/plain;charset=utf-8' })
      saveAs(blob, `${fileName}.md`)
    }
  }
}
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
