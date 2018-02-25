<template>
  <div class="page">
    <cml-header />
    <main class="main relative">
      <div class="content">
        <slot v-if="isLogged" />
        <cml-login v-else />
      </div>
      <div class="overlay">
        <transition name="transition-top">
          <cml-popup v-if="popup.visible" />
        </transition>
        <cml-messages />
        <cml-dropdown />
        <viewport />
      </div>
    </main>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import store from '../store/index'
import viewport from './utils/viewport.vue'
import cmlDropdown from './utils/dropdown.vue'
import cmlPopup from './popup/index.vue'
import cmlMessages from './utils/messages.vue'
import cmlHeader from './header/index.vue'
import cmlLogin from './login.vue'

export default {
  store,

  name: 'Camomile',

  components: {
    viewport,
    cmlHeader,
    cmlLogin,
    cmlPopup,
    cmlMessages,
    cmlDropdown
  },

  computed: {
    ...mapState({
      isLogged: state => state.cml.user.isLogged,
      popup: state => state.cml.popup,
      media: state =>
        state.cml.medias.list.find(m => m.id === state.cml.medias.id)
    })
  }
}
</script>
