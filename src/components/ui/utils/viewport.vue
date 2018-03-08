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
};
</script>

