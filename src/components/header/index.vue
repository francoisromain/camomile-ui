<template>
  <div class="bg-inverse color-bg header">
    <div class="container">
      <div class="blobs">
        <div class="blob-1-4 mb-0">
          <cml-title></cml-title>
        </div>
        <div class="blob-1-2 mb-0">
          <div class="blobs-default">
            <div class="blob-default">
              <cml-syncbutton class="mb-0 left" v-if="isLogged"></cml-syncbutton>
            </div>
            <div class="blob-auto mb-0">  
              <cml-infos v-if="isLogged"></cml-infos>
            </div>
          </div>
        </div>
        <div class="blob mb-0 flex-right">
          <cml-userbutton v-if="isLogged"></cml-userbutton>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import cmlTitle from './title.vue'
import cmlInfos from './infos.vue'
import cmlUserbutton from './userbutton.vue'
import cmlSyncbutton from './syncbutton.vue'

export default {
  name: 'camomile-header',

  components: {
    cmlTitle,
    cmlInfos,
    cmlUserbutton,
    cmlSyncbutton
  },

  computed: {
    isLogged () {
      return this.$store.state.cml.user.isLogged
    }
  }
}
</script>

