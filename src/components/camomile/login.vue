<template>
  <login v-if="!logged" />
</template>

<script>
import login from './login/index.vue'

export default {
  name: 'camomile-login',
  components: {
    login
  },
  computed: {
    logged () {
      return this.$store.state.camomile.logged
    }
  }
}
</script>
