<template>
  <h6 class="menubar-infos mb-0">{{ api }}: {{ url }}</h6>
</template>

<script>
export default {
  name: 'camomile-header-infos',
  computed: {
    url () {
      return this.$store.state.cml.config.url
    },
    api () {
      return this.$store.state.cml.config.axios ? 'axios' : 'rp';
    }
  }
}
</script>
