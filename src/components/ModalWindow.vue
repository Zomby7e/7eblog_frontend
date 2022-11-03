<template>
  <dialog id="dialog">
    <!--Title bar for the dialog element-->
    <div id="dialog-title" ref="dialog_title">
      <div id="dialog-title-text">
        <span class="title-text">{{ title }}&nbsp;</span>
      </div>
      <div id="dialog-title-icon" @click="changeVisible">
        <span class="title-text">❌</span>
      </div>
    </div>
    <!--Content of the dialog element-->
    <div id="dialog-content">
      <slot></slot>
    </div>
  </dialog>
</template>

<script lang="ts">
import { defineComponent, onBeforeUnmount, onMounted } from 'vue'
import emitter from '@/utils/emitter'

export default defineComponent({
  props: {
    title: String
  },
  name: 'ModalWindow',
  setup (props, { emit }) {
    let visible = false
    const changeVisible = () => {
      visible = !visible
      const dialog: any = document.getElementById('dialog')
      visible ? dialog.show() : dialog.close()
      emit('modalClosed', null)
    }

    const hide = () => {
      visible = false
      const dialog: any = document.getElementById('dialog')
      dialog.close()
      emit('modalClosed', null)
    }

    onMounted(() => {
      emitter.on('closeModalWindow', () => {
        hide()
      })
    })
    onBeforeUnmount(() => {
      emitter.off('closeModalWindow')
    })
    return { changeVisible }
  }
})
</script>

<style scoped>

#dialog {
  z-index: 1;
  border: none;
  border-radius: 8px;
  overflow: hidden;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  padding: 8px;
  background-color: gray;
}

#dialog-title {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 8px;
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
