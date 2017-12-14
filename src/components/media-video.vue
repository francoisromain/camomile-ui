<template>
  <div class="mb-xl" ref="container">
    <div v-if="media.description.embed === 'youtube'" id="player"/>
    <spinner v-if="!isLoaded"></spinner>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import spinner from './utils/spinner.vue'

import youtube from '../js/youtube'

export default {
  components: {
    spinner
  },

  props: {
    media: Object
  },

  data () {
    return {
      player: {}
    }
  },

  computed: {
    ...mapState({
      isPlaying: state => state.cml.medias.properties.isPlaying,
      isLoaded: state => state.cml.medias.properties.isLoaded,
      seek: state => state.cml.medias.properties.seek,
      timeCurrent: state => state.cml.medias.properties.timeCurrent,
      viewportWidth: state => state.cml.viewport.width
    })
  },

  mounted () {
    this.videoLoad(this.media)
  },

  methods: {
    videoLoad (media) {
      if (media.description.embed === 'youtube') {
        const width = this.$refs.container.offsetWidth
        const height = width * 9 / 16
        this.player = youtube(media.url, width, height,
          {
            autoplay: 0,
            controls: 0,
            modestbranding: 1,
            rel: 0,
            showinfo: 0,
            iv_load_policy: 3,
            enablejsapi: 1,
            disablekb: 1
          },
          {
            onReady: event => {
              this.player = event.target
              this.$store.commit('cml/medias/loaded', true)
              this.$store.commit('cml/medias/timeTotal', this.player.getDuration() * 1000)
            },
            onStateChange: event => {
              if (event.data === 1) {
                this.$store.dispatch('cml/medias/play')
              } else if (event.data === 2) {
                this.$store.dispatch('cml/medias/pause')
              } else if (event.data === 0) {
                this.$store.dispatch('cml/medias/stop')
              }
            }
          })
      }
    },
    videoSeek (serverRequest) {
      this.player.seekTo(this.timeCurrent / 1000, serverRequest)
      this.$store.commit('cml/medias/seek', { seekign: false })
    }
  },

  watch: {
    isPlaying (val) {
      if (val) {
        this.player.playVideo()
      } else {
        this.player.pauseVideo()
      }
    },
    seek (options) {
      if (options.seeking) {
        this.videoSeek(options.serverRequest)
      }
    },
    viewportWidth () {
      const width = this.$refs.container.offsetWidth
      const height = width * 9 / 16
      this.player.setSize(width, height)
    }
  }
}

</script>
