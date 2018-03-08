<template>
  <div />
</template>

<script>
import popupLogin from './popup/login.vue'

export default {
  name: 'CamomileLogin',

  created () {
    this.$store.commit('popup/open', {
      config: {
        title: 'Login',
        closeBtn: false,
        component: popupLogin
      },
      element: {}
    })
  }
};
</script>
