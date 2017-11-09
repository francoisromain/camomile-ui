<template>
  <div>
    <transition name="transition-top">
      <cml-user-edit-popup v-if="utils.userEditPopup.visible" />
    </transition>
    <transition name="transition-top">
      <cml-user-remove-popup v-if="utils.userRemovePopup.visible" />
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
import cmlUserEditPopup from './user-edit-popup.vue'
import cmlUserDropdown from './user-dropdown.vue'
import cmlUserRemovePopup from './user-remove-popup.vue'

export default {
  components: {
    cmlMessages,
    cmlUserLogin,
    cmlUserEditPopup,
    cmlUserRemovePopup,
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

