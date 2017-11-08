<template>
  <div class="relative full-y">
    <div class="bg-inverse color-bg header">
      <div class="container">
        <div class="blobs">
          <cml-title class="blob-1-4 mb-0" />
          <cml-infos class="blob-1-4 mb-0" />
          <cml-user-button  class="blob-icon mb-0 flex-right" />
        </div>
      </div>
    </div>
    
    <div class="container pt relative">
      <transition name="transition-fade">
        <cml-user-dropdown  v-if="user.dropdown" />
      </transition>
    </div>
    <transition name="transition-top">
      <cml-user-settings v-if="user.settings" />
      <cml-user-login  v-if="!user.loggedin" />
    </transition>
    <cml-messages />
  </div>
</template>

<script>
import store from '../store'
import viewport from './components/viewport.vue'
import cmlTitle from './camomile/title.vue'
import cmlInfos from './camomile/infos.vue'
import cmlMessages from './camomile/messages.vue'
import cmlUserLogin from './camomile/user-login.vue'
import cmlUserButton from './camomile/user-button.vue'
import cmlUserSettings from './camomile/user-settings.vue'
import cmlUserDropdown from './camomile/user-dropdown.vue'

export default {
  store,
  name: 'camomile-ui',
  components: {
    viewport,
    cmlTitle,
    cmlInfos,
    cmlMessages,
    cmlUserLogin,
    cmlUserButton,
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

