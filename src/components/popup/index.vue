<template>
  <div>
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
</template>

<script>
export default {
  name: 'camomile-popup',

  computed: {
    config() {
      return this.$store.state.cml.popup.config
    }
  },

  methods: {
    close() {
      if (this.config.closeBtn) {
        this.$store.commit('cml/popup/close')
      }
    },
    keyup(e) {
      if ((e.which || e.keyCode) === 27) {
        this.close()
      }
    }
  },

  created() {
    if (this.config.closeBtn) {
      document.addEventListener('keyup', this.keyup)
    }
  },

  beforeDestroy() {
    if (this.config.closeBtn) {
      document.removeEventListener('keyup', this.keyup)
    }
  }
}
</script>
