<template>
</template>

<script>
import popupLogin from './popup-login.vue'

export default {
  name: 'camomile-login-index',
  data () {
    return {
      popupLogin: popupLogin
    }
  },
  created () {
    this.$store.commit('camomile/popup/open', {
      title: 'Login',
      closeBtn: false,
      component: this.popupLogin
    })
  }
}
</script>
