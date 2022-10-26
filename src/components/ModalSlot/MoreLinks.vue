<template>
  <div id="modal-slot">
    <div class="modal-link" v-for="(item, index) in links" :key="index" @click="navigateTo(item.link)">
      {{ item.name }}
    </div>
    <div style="color: gray; margin-top: 15px; font-size: 0.85rem;">点击链接即可跳转</div>
  </div>
</template>

<script lang="ts">
export default {
  props: ['links'],
  name: 'MoreLinks',
  methods: {
    /**
     * Open a link in a new page
     * @param url A url link
     */
    navigateTo (url: string) {
      window.open(url)
    }
  }
}
</script>

<style scoped>
#modal-slot {
  user-select: none;
  display: flex;
  flex-direction: column;
  text-align: center;
}

.modal-link {
  color: #B721FF !important;
}

.modal-link:hover {
  cursor: pointer;
  color: #21D4FD !important;
}
</style>
