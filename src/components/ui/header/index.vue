<template>
  <header class="bg-inverse color-bg header">
    <div class="container">
      <div class="blobs">
        <div class="blob-1-4 mb-0">
          <cml-title />
        </div>
        <div
          v-if="isLogged"
          class="blob-1-2 mb-0">
          <div class="blobs-default">
            <div class="blob-default">
              <cml-sync class="mb-0 left" />
            </div>
            <div class="blob-auto mb-0">  
              <cml-infos />
            </div>
          </div>
        </div>
        <div
          v-if="isLogged"
          class="blob mb-0 flex-right">
          <cml-userbutton />
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
  name: 'CamomileHeader',

  components: {
    cmlTitle,
    cmlInfos,
    cmlUserbutton,
    cmlSync
  },

  computed: {
    isLogged () {
      return this.$store.state.cml.user.isLogged
    }
  }
}
</script>
