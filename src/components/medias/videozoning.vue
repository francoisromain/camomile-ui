<template>
  <div class="relative">
    <zoning class="absolute full"
      :media-uid="mediaUid">

    </zoning>
    <video-player 
      :media-uid="mediaUid"
      :filter="mediafilter">

    </video-player>
  </div>  
</template>

<script>
import videoPlayer from './video.vue'
import zoning from './zoning.vue'

export default {
  name: 'camomile-media-video',

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
    annotationsFilter: {
      type: Function,
      default: a =>
        a.fragment &&
        a.fragment.time &&
        !isNaN(a.fragment.time.start) &&
        !isNaN(a.fragment.time.end) &&
        a
    },
    mediaFilter: {
      type: Function,
      default: media =>
        media.description.type && media.description.type === 'video' && media
    }
  },

  components: {
    videoPlayer,
    zoning
  }
}
</script>
