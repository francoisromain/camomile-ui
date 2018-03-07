<template>
  <div>
    <div
      class="absolute full bg-alpha" 
      @click="close" />
    <div class="pophover absolute full bg-bg p-l pb-s">
      <div class="flex flex-start">
        <h2>{{ config.title }}</h2>
        <button
          v-if="config.closeBtn"
          class="flex-right btn p-s mt--m"
          @click="close"><i class="icon-24 icon-24-close" /></button>
      </div>
      <hr>
      <component :is="config.component" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'CamomilePopup',

  computed: {
    config () {
      return this.$store.state.popup.config
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
  },

  methods: {
    close () {
      if (this.config.closeBtn) {
        this.$store.commit('popup/close')
      }
    },
    keyup (e) {
      if ((e.which || e.keyCode) === 27) {
        this.close()
      }
    }
  }
}
</script>
