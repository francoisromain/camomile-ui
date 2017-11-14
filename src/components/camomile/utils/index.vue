<template>
  <div>
    <transition name="transition-top">
      <cml-popup  v-if="popup.visible" />
    </transition>
    <transition name="transition-top">
      <cml-dropdown v-if="dropdown.visible" />
    </transition>
    <cml-messages />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import cmlMessages from './messages.vue'
import cmlPopup from './popup.vue'
import cmlDropdown from './dropdown.vue'

export default {
  name: 'camomile-utils',
  components: {
    cmlMessages,
    cmlPopup,
    cmlDropdown
  },
  computed: {
    ...mapState({
      popup: state => state.camomile.popup,
      dropdown: state => state.camomile.dropdown
    })
  }
}
</script>

