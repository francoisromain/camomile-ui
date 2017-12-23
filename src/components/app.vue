<template>
  <div class="full-y flex flex-direction-column">
    <cml-header></cml-header>
    <div class="relative page">
      <transition name="transition-top">
        <cml-popup v-if="popup.visible"></cml-popup>
      </transition>
      <cml-messages></cml-messages>
      <cml-dropdown></cml-dropdown>
      <slot v-if="isLogged"></slot>        
      <cml-login v-else></cml-login>
    </div>
    <viewport></viewport>
    <debug></debug>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import store from '../store/index'
import debug from './utils/debug.vue'
import viewport from './utils/viewport.vue'
import cmlDropdown from './utils/dropdown.vue'
import cmlPopup from './popup/index.vue'
import cmlMessages from './utils/messages.vue'
import cmlHeader from './header/index.vue'
import cmlLogin from './login.vue'


export default {
  store,

  name: 'camomile',

  components: {
    debug,
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
      media: state => state.cml.medias.list.find(m => m.id === state.cml.medias.id)
    })
  }
}
</script>

