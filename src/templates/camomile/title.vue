<template>
  <h1>{{ title }}</h1>
</template>

<script>
export default {
  computed: {
    title () {
      return this.$store.state.camomile.config.title
    }
  }
}
</script>
