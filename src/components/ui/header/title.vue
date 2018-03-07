<template>
  <h1 class="mb-0">{{ title }}</h1>
</template>

<script>
export default {
  name: 'CamomileHeaderTitle',

  computed: {
    title () {
      return this.$store.state.config.title
    }
  }
}
</script>
