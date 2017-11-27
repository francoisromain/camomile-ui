<template>
  <div class="full-y flex flex-direction-column">
    <cml-header />
    <div class="relative page">
      <cml-utils />
      <div class="container pt">
        <div class="blobs" v-if="isAdmin">
          <cml-users class="blob-1-2 p border"/>
          <cml-groups class="blob-1-2 p border"/>
        </div>
        <div class="blobs">
          <cml-corpus class="blob-1-2 p border" />
          <cml-medias class="blob-1-2 p border" />
          <cml-layers class="blob-1-2 p border" />
          <cml-annotations class="blob-1-2 p border" />
        </div>
      </div> 
      <debug />
    </div>
    <viewport />
    <cml-login />
  </div>
</template>

<script>
import store from '../store'
import debug from './camomile/debug.vue'
import viewport from './camomile/viewport.vue'
import cmlUtils from './camomile/utils/index.vue'
import cmlHeader from './camomile/header/index.vue'
import cmlLogin from './camomile/login.vue'

import cmlUsers from './camomile/users.vue'
import cmlGroups from './camomile/groups.vue'

import cmlCorpus from './camomile/corpus.vue'
import cmlMedias from './camomile/medias.vue'
import cmlLayers from './camomile/layers.vue'
import cmlAnnotations from './camomile/annotations.vue'

export default {
  store,

  name: 'camomile-ui',

  components: {
    debug,
    viewport,
    cmlHeader,
    cmlLogin,
    cmlUtils,
    cmlUsers,
    cmlGroups,
    cmlCorpus,
    cmlMedias,
    cmlLayers,
    cmlAnnotations
  },

  computed: {
    isAdmin () {
      return this.$store.state.cml.user.isAdmin
    }
  }
}
</script>

