<template>
  <h1 class="mb-0">{{ title }}</h1>
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
