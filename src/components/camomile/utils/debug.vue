<template>
  <pre v-if="visible"><code>{{ state }}</code></pre>
</template>

<script>
export default {
  name: 'camomile-utils-debug',

  data () {
    return {
      visible: false
    }
  },

  computed: {
    state () {
      return this.$store.state.cml.popup
    }
  },

  methods: {
    keydown (e) {
      if (e.keyCode >= 65 && e.keyCode <= 90) {
        const char = (e.metaKey ? 'meta-' : '') + e.keyCode;
        if (char === 'meta-69') {
          this.visible = !this.visible
        }
      }
    }
  },

  created () {
    document.addEventListener('keydown', this.keydown)
  },
  beforeDestroy () {
    document.removeEventListener('keydown', this.keydown)
  }
}
</script>
<style scoped>
pre {
  position: absolute;
  left: 0;
  bottom: 0;
}
</style>

