<template>
  <div class="relative">
    <zoning
      v-if="layers"
      :media-uid="mediaUid"
      :uid="uid"
      :layers-uid="layersUid"
      :filter="annotationsFilter"
      :layers="layers" 
      class="absolute full"/>

    <video-player 
      :media-uid="mediaUid"
      :filter="mediaFilter" />
  </div>  
</template>

<script>
import videoPlayer from './video.vue'
import zoning from './zoning.vue'

export default {
  name: 'CamomileMediaVideo',

  components: {
    videoPlayer,
    zoning
  },

  props: {
    mediaUid: {
      type: String,
      default: 'default'
    },
    layersUid: {
      type: String,
      default: 'default'
    },
    uid: {
      type: String,
      default: 'default'
    },
    annotationsFilter: Function,
    mediaFilter: Function
  },

  computed: {
    layers () {
      const active = this.$store.state.cml.layers.actives[this.layersUid]
      return active ? this.$store.state.cml.layers.lists[active.corpuUid] : {}
    }
  }
}
</script>
