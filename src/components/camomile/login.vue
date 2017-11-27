<template>
  <login v-if="!isLogged" />
</template>

<script>
import login from './login/index.vue'

export default {
  name: 'camomile-login',

  components: {
    login
  },

  computed: {
    isLogged () {
      return this.$store.state.cml.user.isLogged
    }
  }
}
</script>
