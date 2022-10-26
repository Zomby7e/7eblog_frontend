<template>
  <dialog ref="dialog" id="dialog">
    <!--Title bar for the dialog element-->
    <div id="dialog-title" ref="dialog_title">
      <div id="dialog-title-text">
        <span :class="setTitleIcon()" aria-hidden="true">&nbsp;</span>
        <span class="title-text">{{ title }}&nbsp;</span>
      </div>
      <div id="dialog-title-icon" @click="changeVisible">
        <span class="fa fa-window-close-o title-text" aria-hidden="true"></span>
      </div>
    </div>
    <!--Content of the dialog element-->
    <div id="dialog-content">
      <slot></slot>
    </div>
  </dialog>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  props: {
    title: String,
    icon: String
  },
  name: 'ModalWindow',
  data () {
    return {
      visible: false
    }
  },
  methods: {
    changeVisible () {
      this.visible = !this.visible
      // this.visible ? this.$refs.dialog.show() : this.$refs.dialog.close()
      const dialog: any = document.getElementById('dialog')
      this.visible ? dialog.show() : dialog.close()
      this.$emit('modalClosed')
    },
    setTitleIcon () {
      return this.icon + ' fa title-text'
    }
  }
})
</script>

<style scoped>
@import url("/src/assets/font-awesome-4.7.0/css/font-awesome.css");

#dialog {
  z-index: 1;
  border: none;
  border-radius: 8px;
  overflow: hidden;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  padding: 8px;
  background-color: #21D4FD;
  background-image: linear-gradient(248deg, #21D4FD 0%, #B721FF 100%);
}

#dialog-title {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}

#dialog-title-text {
  display: flex;
  flex-direction: row;
  align-items: center;
}

#dialog-content {
  background-color: #fff;
  padding: 5px;
  margin-top: 2px;
}

.title-text {
  color: white;
  user-select: none;
  text-align: center;
}
</style>
