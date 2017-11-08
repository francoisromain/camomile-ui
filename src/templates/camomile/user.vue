<template>
  <div>
    <transition name="transition-top">
      <cml-user-dropdown  v-if="user.dropdown" />
    </transition>
    <transition name="transition-top">
      <cml-user-settings v-if="user.settings" />
    </transition>
    <transition name="transition-top">
      <cml-user-login  v-if="!user.loggedin" />
    </transition>
  </div>
</template>

<script>
import cmlUserLogin from './user-login.vue'
import cmlUserSettings from './user-settings.vue'
import cmlUserDropdown from './user-dropdown.vue'

export default {
  components: {
    cmlUserLogin,
    cmlUserDropdown,
    cmlUserSettings
  },
  computed: {
    user () {
      return this.$store.state.camomile.user
    }
  }
}
</script>

