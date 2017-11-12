<template>
  <div class="bg-inverse color-bg header">
    <div class="container">
      <div class="blobs">
        <cml-title class="blob-1-4 mb-0" />
        <cml-infos class="blob-1-4 mb-0" />
        <cml-userbutton class="blob-icon mb-0 flex-right" v-if="logged" />
      </div>
    </div>
  </div>
</template>

<script>

import cmlTitle from './title.vue'
import cmlInfos from './infos.vue'
import cmlUserbutton from './userbutton.vue'

export default {
  name: 'camomile-header',
  components: {
    cmlTitle,
    cmlInfos,
    cmlUserbutton
  },
  computed: {
    logged () {
      return this.$store.state.camomile.logged
    }
  }
}
</script>

