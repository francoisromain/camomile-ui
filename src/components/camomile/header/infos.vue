<template>
  <h6 class="menubar-infos">{{ api }} : {{ url }}</h6>
</template>

<script>
export default {
  name: 'camomile-infos',
  computed: {
    url () {
      return this.$store.state.cml.url
    },
    api () {
      return this.$store.state.cml.config.axios ? 'axios api' : 'rp api';
    }
  }
}
</script>
