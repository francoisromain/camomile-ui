<template>
  <div>
    <div
      class="absolute full bg-alpha" 
      @click="closeDefault" />
    <div class="popup fixed shadow full bg-bg">
      <div class="popup-header flex flex-start p">
        <h2 class="mb-0 mt-s">{{ config.title }}</h2>
        <button
          v-if="config.closeBtn"
          class="btn-border flex-right px-s py-xs"
          @click="close"><i class="icon-24 icon-24-close" /></button>
      </div>
      <div class="popup-content px pt">
        <component
          :is="config.component"
          @popup-close="close" />
      </div>
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
      this.$store.commit('popup/close')
    },
    closeDefault () {
      if (this.config.closeBtn) {
        this.close()
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
