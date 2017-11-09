<template>
  <div class="full-y flex flex-direction-column">
    <div class="bg-inverse color-bg header">
      <div class="container">
        <div class="blobs">
          <cml-title class="blob-1-4 mb-0" />
          <cml-infos class="blob-1-4 mb-0" />
          <cml-user-button  class="blob-icon mb-0 flex-right" />
        </div>
      </div>
    </div>
    
    <div class="relative page">
      <cml-utils />
      <div class="container pt">
        <div class="blobs">
          <cml-users class="blob-1-2 p border" />
        </div>
      </div> 
      <debug />
    </div>
  </div>
</template>

<script>
import store from '../store'
import debug from './components/_debug.vue'
import viewport from './components/viewport.vue'
import cmlTitle from './camomile/title.vue'
import cmlInfos from './camomile/infos.vue'
import cmlUtils from './camomile/utils.vue'
import cmlUserButton from './camomile/user-button.vue'
import cmlUsers from './camomile/users.vue'

export default {
  store,
  name: 'camomile-ui',
  components: {
    debug,
    viewport,
    cmlTitle,
    cmlInfos,
    cmlUtils,
    cmlUserButton,
    cmlUsers,
  }
}
</script>

