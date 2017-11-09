<template>
  <h6 class="menubar-infos">{{ api }} : {{ url }}</h6>
</template>

<script>
export default {
  computed: {
    url () {
      return this.$store.state.camomile.url
    },
    api () {
      return this.$store.state.camomile.config.axios ? 'axios api' : 'rp api';
    }
  }
}
</script>
