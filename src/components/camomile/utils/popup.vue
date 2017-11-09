<template>
  <div>
    <div @click="close" class="absolute full bg-alpha">
    </div>
    <div class="pophover absolute full bg-alt p-l">
      <div class="flex flex-start">
        <h2>{{ config.title }}</h2>
        <button @click="close" v-if="config.closeBtn" class="flex-right btn p-s mt--m"><i class="icon-24 icon-24-close"></i></button>
      </div>
      <hr class="border-bg">
      <component :is="config.content"></component>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import popupUserRemove from '../user/popup-remove.vue'
import popupUserLogin from '../user/popup-login.vue'
import popupUserEdit from '../user/popup-edit.vue'

export default {
  name: 'camomile-popup',
  components: {
    popupUserRemove,
    popupUserLogin,
    popupUserEdit
  },
  props: {
    config: Object
  },
  methods: {
    close () {
      if (this.config.closeBtn) {
        this.$store.commit('camomile/popup/close')
      }
    },
    keyup (e) {
      if ((e.which || e.keyCode) === 27) {
        this.close()
      }
    }
  },
  created () {
    if (this.config.closeBtn) {
      document.addEventListener('keyup', this.keyup)
    }
  },
  beforeDestroy () {
    if (this.config.closeBtn) {
      document.removeEventListener('keyup', this.keyup)
    }
  }
}
</script>
