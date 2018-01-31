<template>
  <div v-if="media" ref="container">
    <video id="bgvid" ref="video" class="object-fit"
      v-show="isLoaded"
      v-on:ended="videoEnded"
      v-on:click="videoToggle"
      v-on:play="buttonToggle"
      v-on:pause="buttonToggle"
      v-on:timeupdate="videoTimeupdate"
      v-on:canplay="videoLoad"
      v-cloak>
      <source :src="media.url" type="video/mp4">
    </video> 
    <spinner v-if="!isLoaded"></spinner>
  </div>
</template>

<script>
import spinner from '../utils/spinner.vue'

export default {
  name: 'camomile-media-video',

  props: {
    mediaUid: {
      type: String,
      default: 'default'
    },
    filter: {
      type: Function,
      default: media =>
        media.description.type && media.description.type === 'video' && media
    }
  },

  components: {
    spinner
  },

  data() {
    return {
      mousedown: false,
      videoLoaded: false,
      timeTotal: 0
    }
  },

  computed: {
    media() {
      const active = this.$store.state.cml.medias.actives[this.mediaUid]
      return active
        ? this.filter(
            this.$store.state.cml.medias.lists[active.corpuUid].find(
              m => m.id === active.id
            )
          )
        : null
    },
    properties() {
      return this.$store.state.cml.medias.properties[this.mediaUid] || {}
    },
    isPlaying() {
      return this.properties.isPlaying || false
    },
    isLoaded() {
      return this.properties.isLoaded || false
    },
    seek() {
      return this.properties.seek || {}
    },
    timeCurrent() {
      return this.properties.timeCurrent || 0
    },
    viewportWidth() {
      return this.$store.state.cml.viewport.width || 0
    }
  },

  methods: {
    videoEnded() {
      this.$store.dispatch('cml/medias/stop', { uid: this.mediaUid })
    },
    videoToggle() {
      if (this.$refs.video.paused) {
        this.$refs.video.play()
      } else {
        this.$refs.video.pause()
      }
    },
    buttonToggle() {
      if (this.$refs.video.paused) {
        this.$store.dispatch('cml/medias/pause', { uid: this.mediaUid })
      } else {
        this.$store.dispatch('cml/medias/play', { uid: this.mediaUid })
      }
    },
    videoTimeupdate() {
      if (this.$refs.video) {
        const percent =
          this.$refs.video.currentTime / this.$refs.video.duration * 100
      }
    },
    videoSeek(e) {
      this.$refs.video.currentTime = this.timeCurrent / 1000
    },
    videoLoad() {
      console.log('videoLoad')
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
  },

  beforeDestroy() {
    this.video = null
  },

  watch: {
    isPlaying(val) {
      if (val) {
        this.$refs.video.play()
      } else {
        this.$refs.video.pause()
      }
    },
    seek(options) {
      if (options.seeking) {
        this.videoSeek()
      }
    },
    viewportWidth() {
      const width = this.$refs.container.offsetWidth
      const height = width * 9 / 16
    },
    media(media, mediaOld) {
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
  }
}
</script>
