<template>
  <div class="full-y flex flex-direction-column">
    <cml-header></cml-header>
    <div class="relative page">
      <transition name="transition-top">
        <cml-popup v-if="popup.visible"></cml-popup>
      </transition>
      <cml-messages></cml-messages>
      <cml-dropdown></cml-dropdown>
      <div class="container pt">
        <div class="blobs" v-if="isAdmin">
          <cml-users class="blob-1-2 p border"></cml-users>
          <cml-groups class="blob-1-2 p border"></cml-groups>
        </div>
        <div class="blobs" v-if="isLogged">
          <cml-corpus class="blob-1-2 p border"></cml-corpus>
          <cml-medias class="blob-1-2 p border"></cml-medias>
          <cml-layers class="blob-1-2 p border"></cml-layers>
          <cml-annotations class="blob-1-2 p border"></cml-annotations>
        </div>
      </div> 
    </div>
    <cml-login v-if="!isLogged"></cml-login>
    <viewport></viewport>
    <debug></debug>
  </div>
</template>

<script>
import './css/styles.css'
import { mapState } from 'vuex'
import store from './store/index'
import debug from './components/utils/debug.vue'
import viewport from './components/utils/viewport.vue'
import cmlDropdown from './components/utils/dropdown.vue'
import cmlPopup from './components/popup/index.vue'
import cmlMessages from './components/utils/messages.vue'
import cmlHeader from './components/header/index.vue'
import cmlLogin from './components/login.vue'

import cmlUsers from './components/users.vue'
import cmlGroups from './components/groups.vue'

import cmlCorpus from './components/corpus.vue'
import cmlMedias from './components/medias.vue'
import cmlLayers from './components/layers.vue'
import cmlAnnotations from './components/annotations.vue'

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
    cmlDropdown,
    cmlUsers,
    cmlGroups,
    cmlCorpus,
    cmlMedias,
    cmlLayers,
    cmlAnnotations
  },

  computed: {
    ...mapState({
      isAdmin: state => state.cml.user.isAdmin,
      isLogged: state => state.cml.user.isLogged,
      popup: state => state.cml.popup
    })
  }
}
</script>

