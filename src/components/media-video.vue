<template>
  <div v-if="media">media {{ media }}
    <video-youtube :uid="uid" :media="media"></video-youtube>
  </div>
</template>

<script>
import spinner from './utils/spinner.vue'
import videoYoutube from './media-video-youtube.vue'

import youtube from '../js/youtube'

export default {
  name: 'camomile-media-video',

  props: {
    uid: {
      type: String,
      default: 'default'
    }
  },

  components: {
    videoYoutube
  },

  computed: {
    media () {
      const medias = this.$store.state.cml.medias
      return medias.lists[this.uid] && medias.lists[this.uid].find(m => m.id === medias.actives[this.uid].id) || {}
    }
  }
}

</script>
