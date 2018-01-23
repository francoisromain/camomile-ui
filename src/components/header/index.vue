<template>
  <header class="bg-inverse color-bg header">
    <div class="container">
      <div class="blobs">
        <div class="blob-1-4 mb-0">
          <cml-title></cml-title>
        </div>
        <div class="blob-1-2 mb-0" v-if="isLogged">
          <div class="blobs-default">
            <div class="blob-default">
              <cml-sync class="mb-0 left"></cml-sync>
            </div>
            <div class="blob-auto mb-0">  
              <cml-infos></cml-infos>
            </div>
          </div>
        </div>
        <div class="blob mb-0 flex-right" v-if="isLogged">
          <cml-userbutton></cml-userbutton>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import cmlTitle from './title.vue'
import cmlInfos from './infos.vue'
import cmlUserbutton from './userbutton.vue'
import cmlSync from './sync.vue'

export default {
  name: 'camomile-header',

  components: {
    cmlTitle,
    cmlInfos,
    cmlUserbutton,
    cmlSync
  },

  computed: {
    isLogged() {
      return this.$store.state.cml.user.isLogged
    }
  }
}
</script>
