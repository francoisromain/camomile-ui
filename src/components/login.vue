<template>
</template>

<script>
import popupLogin from './popup/login.vue'

export default {
  name: 'camomile-login',

  created () {
    this.$store.commit('cml/popup/open', {
      config: {
        title: 'Login',
        closeBtn: false,
        component: popupLogin
      },
      element: {}
    })
  }
}
</script>
