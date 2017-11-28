<template>
</template>

<script>
export default {
  name: 'camomile-utils-viewport',

  methods: {
    resize () {
      return this.$store.dispatch('cml/viewport/set')
    }
  },

  mounted () {
    window.addEventListener('resize', this.resize)
    this.resize()
  }
}
</script>
<style scoped>
@import '../../../css/settings.css';
@media (--viewport-desktop) {
  .home {
    background-color: var(--color-highlight);
  }
}
</style>
