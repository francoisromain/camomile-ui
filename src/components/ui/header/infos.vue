<template>
  <h6 class="menubar-infos mb-0">{{ url }}</h6>
</template>

<script>
export default {
  name: 'CamomileHeaderInfos',

  computed: {
    url () {
      return this.$store.state.config.url
    }
  }
}
</script>
