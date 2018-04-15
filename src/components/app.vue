<template>
  <div class="page relative">

    <header class="header bg-inverse color-bg shadow">
      <div class="container">
        <cml-header />
      </div>
    </header>

    <main class="main">
      <div class="container pt">
        <slot v-if="isLogged" />
        <cml-login v-else />
      </div>
      <transition name="transition-top">
        <cml-popup v-if="popup.visible" />
      </transition>
      <cml-messages />
      <cml-dropdown />
      <viewport />
    </main>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import store from '../store/index'
import viewport from './ui/utils/viewport.vue'
import cmlDropdown from './ui/utils/dropdown.vue'
import cmlPopup from './ui/popup/index.vue'
import cmlMessages from './ui/utils/messages.vue'
import cmlHeader from './ui/header/index.vue'
import cmlLogin from './ui/login.vue'

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

  props: {
    userName: {
      type: String,
      default: ''
    },
    userPassword: {
      type: String,
      default: ''
    },
    url: {
      type: String,
      default: 'http://localhost:3000'
    },
    title: {
      type: String,
      default: 'Camomile UI'
    }
  },

  computed: {
    ...mapState({
      isLogged: state => state.user.isLogged,
      popup: state => state.popup
    })
  },

  created () {
    this.$store.commit('register', {
      url: this.url,
      title: this.title,
      user: {
        name: this.userName,
        password: this.userPassword
      }
    })
  }
};
</script>
