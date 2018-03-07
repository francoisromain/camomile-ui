<template>
  <div/>
</template>

<script>
export default {
  name: 'CamomileUtilsViewport',

  mounted () {
    window.addEventListener('resize', this.resize)
    this.resize()
  },

  methods: {
    resize () {
      return this.$store.dispatch('viewport/set')
    }
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
