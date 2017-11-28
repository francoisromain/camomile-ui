<template>
  <transition name="transition-top">
    <div v-if="popup.visible">
      <div @click="close" class="absolute full bg-alpha">
      </div>
      <div class="pophover absolute full bg-alt p-l pb-s">
        <div class="flex flex-start">
          <h2>{{ popup.config.title }}</h2>
          <button @click="close" v-if="popup.config.closeBtn" class="flex-right btn p-s mt--m"><i class="icon-24 icon-24-close"></i></button>
        </div>
        <hr class="border-bg">
        <component :is="popup.config.component"></component>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'camomile-popup',

  computed: {
    popup () {
      return this.$store.state.cml.popup
    }
  },

  methods: {
    close () {
      if (this.popup.config.closeBtn) {
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
    if (this.popup.config.closeBtn) {
      document.addEventListener('keyup', this.keyup)
    }
  },

  beforeDestroy () {
    if (this.popup.config.closeBtn) {
      document.removeEventListener('keyup', this.keyup)
    }
  }
}
</script>
