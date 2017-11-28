<template>
  <transition name="transition-top">
    <div v-if="popup.visible">
      <div @click="close" class="absolute full bg-alpha">
      </div>
      <div class="pophover absolute full bg-alt p-l pb-s">
        <div class="flex flex-start">
          <h2>{{ config.title }}</h2>
          <button @click="close" v-if="config.closeBtn" class="flex-right btn p-s mt--m"><i class="icon-24 icon-24-close"></i></button>
        </div>
        <hr class="border-bg">
        <component :is="config.component"></component>
      </div>
    </div>
  </transition>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'camomile-popup',
  computed: {
    ...mapState({
      config: state => state.cml.popup.config,
      popup: state => state.cml.popup
    })
  },
  methods: {
    close () {
      if (this.config.closeBtn) {
        this.$store.commit('cml/popup/close')
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
