<template>
  <h6 class="menubar-infos mb-0">{{ url }}</h6>
</template>

<script>
export default {
  name: 'camomile-header-infos',

  computed: {
    url () {
      return this.$store.state.cml.config.url
    }
  }
}
</script>
