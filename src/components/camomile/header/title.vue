<template>
  <h1 class="mb-0">{{ title }}</h1>
</template>

<script>
export default {
  name: 'camomile-header-title',
  computed: {
    title () {
      return this.$store.state.cml.config.title
    }
  }
}
</script>
