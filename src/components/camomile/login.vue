<template>
  <login v-if="!loggedIs" />
</template>

<script>
import login from './login/index.vue'

export default {
  name: 'camomile-login',
  components: {
    login
  },
  computed: {
    loggedIs () {
      return this.$store.state.camomile.loggedIs
    }
  }
}
</script>
