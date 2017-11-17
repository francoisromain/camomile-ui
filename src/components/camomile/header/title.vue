<template>
  <h1>{{ title }}</h1>
</template>

<script>
export default {
  name: 'camomile-title',
  computed: {
    title () {
      return this.$store.state.cml.config.title
    }
  }
}
</script>
