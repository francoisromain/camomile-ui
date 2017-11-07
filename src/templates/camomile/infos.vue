<template>
  <div class="h6">{{ api }} <br>{{ url }}</div>
</template>

<script>
export default {
  computed: {
    url () {
      return this.$store.state.camomile.url
    },
    api () {
      console.log(this.$store.state.camomile.config.axios)
      return this.$store.state.camomile.config.axios ? 'axios api' : 'rp api';
    }
  }
}
</script>
