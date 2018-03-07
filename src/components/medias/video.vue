<template>
  <div
    v-if="media"
    ref="container">
    <video
      v-cloak
      v-show="isLoaded"
      id="bgvid"
      ref="video"
      class="object-fit"
      @ended="videoEnded"
      @click="videoToggle"
      @play="buttonToggle"
      @pause="buttonToggle"
      @timeupdate="videoTimeupdate"
      @canplay="videoLoad">
      <source
        :src="media.url"
        type="video/mp4">
    </video>
    <spinner v-if="!isLoaded" />
  </div>
</template>

<script>
import spinner from '../ui/utils/spinner.vue'

export default {
  name: 'CamomileMediaVideo',

  components: {
    spinner
  },

  props: {
    mediaUid: {
      type: String,
      default: 'default'
    },
    filter: {
      type: Function,
      default: media =>
        media &&
        media.description &&
        media.description.type && media.description.type === 'video' && media
    }
  },

  data () {
    return {
      mousedown: false,
      videoLoaded: false,
      timeTotal: 0
    }
  },

  computed: {
    media () {
      return this.$store.getters['cml/medias/active'](this.mediaUid, this.filter)
    },
    properties () {
      return this.$store.getters['cml/medias/properties'](this.mediaUid, this.filter)
    },
    isPlaying () {
      return this.properties.isPlaying || false
    },
    isLoaded () {
      return this.properties.isLoaded || false
    },
    seek () {
      return this.properties.seek || {}
    },
    timeCurrent () {
      return this.properties.timeCurrent || 0
    },
    viewportWidth () {
      return this.$store.state.cml.viewport.width || 0
    }
  },

  watch: {
    isPlaying (val) {
      if (val) {
        this.$refs.video.play()
      } else {
        this.$refs.video.pause()
      }
    },
    seek (options) {
      if (options.seeking) {
        this.videoSeek()
      }
    },
    viewportWidth () {
      const width = this.$refs.container.offsetWidth
      const height = width * 9 / 16
    },
    media (media, mediaOld) {
      if (
        media &&
        media.url &&
        mediaOld &&
        mediaOld.url &&
        media.url !== mediaOld.url
      ) {
        this.videoLoad()
      }
    }
  },

  methods: {
    videoEnded () {
      this.$store.dispatch('cml/medias/stop', { uid: this.mediaUid })
    },
    videoToggle () {
      if (this.$refs.video.paused) {
        this.$refs.video.play()
      } else {
        this.$refs.video.pause()
      }
    },
    buttonToggle () {
      if (this.$refs.video.paused) {
        this.$store.dispatch('cml/medias/pause', { uid: this.mediaUid })
      } else {
        this.$store.dispatch('cml/medias/play', { uid: this.mediaUid })
      }
    },
    videoTimeupdate () {
      if (this.$refs.video) {
        const percent =
          this.$refs.video.currentTime / this.$refs.video.duration * 100
      }
    },
    videoSeek (e) {
      this.$refs.video.currentTime = this.timeCurrent / 1000
    },
    videoLoad () {
      this.$store.commit('cml/medias/loaded', {
        isLoaded: true,
        uid: this.mediaUid
      })

      this.$store.commit('cml/medias/timeTotal', {
        time: this.$refs.video.duration * 1000,
        uid: this.mediaUid
      })
      this.$refs.video.volume = 0
    }
  }
}
</script>
