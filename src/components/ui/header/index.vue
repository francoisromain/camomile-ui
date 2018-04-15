<template>
  <div class="tablet-blobs">
    <div class="tablet-blob-1-4">
      <cml-title />
    </div>
    <div
      v-if="isLogged"
      class="tablet-blob-1-2">
      <div class="blobs">
        <div class="blob">
          <cml-sync class="mb-0" />
        </div>
        <div class="blob-auto">  
          <cml-infos />
        </div>
      </div>
    </div>
    <div
      v-if="isLogged"
      class="blob flex-right">
      <cml-userbutton />
    </div>
  </div>
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
      return this.$store.state.user.isLogged
    }
  }
};
</script>
