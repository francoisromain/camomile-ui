<template>
  <h1 class="mb-0">{{ title }}</h1>
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
