<template>
  <div>
    <transition name="transition-top">
      <cml-user-popup v-if="utils.userPopup.visible" />
    </transition>
    <transition name="transition-top">
      <cml-user-dropdown  v-if="utils.userDropdown.visible" />
    </transition>
    <transition name="transition-top">
      <cml-user-login  v-if="!logged" />
    </transition>
    <cml-messages />
  </div>
</template>

<script>
import cmlMessages from './messages.vue'
import cmlUserLogin from './user-login.vue'
import cmlUserPopup from './user-popup.vue'
import cmlUserDropdown from './user-dropdown.vue'

export default {
  components: {
    cmlMessages,
    cmlUserLogin,
    cmlUserPopup,
    cmlUserDropdown
  },
  computed: {
    utils () {
      return this.$store.state.camomile.utils
    },
    logged () {
      return this.$store.state.camomile.logged
    }
  }
}
</script>

