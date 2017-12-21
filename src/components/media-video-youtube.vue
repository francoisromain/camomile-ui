<template>
  <div class="mb-xl" ref="container">
    <div id="player"></div>
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
    uid: {
      type: String,
      default: 'default'
    },
    media: Object
  },

  data () {
    return {
      player: null,
      videoNew: false
    }
  },

  computed: {
    active () {
      return this.$store.state.cml.medias.actives[this.uid] || {}
    },
    isPlaying () {
      return this.active && this.active.isPlaying || null
    },
    isLoaded () {
      return this.active && this.active.isLoaded || null
    },
    seek () {
      return this.active && this.active.seek || null
    },
    timeCurrent () {
      return this.active && this.active.timeCurrent || null
    },
    viewportWidth () {
      return this.$store.state.cml.viewport.width || null
    }
  },

  mounted () {

    console.log('media', this.media)
    if (this.media.url) {
      this.playerLoad(this.media.url)
    }
    // if (media.description.embed === 'youtube') {
  },

  methods: {
    videoLoad (mediaUrl) {
      if (this.player) {
        const videoId = this.parseYouTubeId(mediaUrl)
        this.player.loadVideoById(videoId)
      } else {
        this.playerLoad(this.media.url)
      }
    },

    playerLoad (mediaUrl) {
      const videoId = this.parseYouTubeId(mediaUrl)
      const width = this.$refs.container.offsetWidth
      const height = width * 9 / 16
      const events = {
        onReady: event => {
          console.log('onReady', event)
          this.$store.commit('cml/medias/loaded', true)
          this.$store.commit('cml/medias/timeTotal', this.player.getDuration() * 1000)
        },
        onStateChange: event => {
          console.log('onStateChange', event.data)
          if (event.data === -1) {
          } else if (event.data === 1) {
            if (this.videoNew) {
              this.videoNew = false
              this.$store.commit('cml/medias/timeTotal', this.player.getDuration() * 1000)
              this.player.pauseVideo()
            } else {
              this.$store.dispatch('cml/medias/play')
            }
          } else if (event.data === 2) {
            // to-do: handle buffering
            this.$store.dispatch('cml/medias/pause')
          } else if (event.data === 0) {
            this.$store.dispatch('cml/medias/stop')
          } else if (event.data === 5) {
            console.log('once cued', event, this.player.getDuration())
            this.$store.commit('cml/medias/loaded', true)
            this.$store.commit('cml/medias/timeTotal', this.player.getDuration() * 1000)
          }
        },
        onApiChange: event => {
          console.log('onApiChange', event)
          if (!this.isLoaded) {
            this.videoNew = true
            this.$store.commit('cml/medias/loaded', true)
          }
        }
      }
      const playerVars = {
        autoplay: 0,
        controls: 0,
        modestbranding: 1,
        rel: 0,
        showinfo: 0,
        iv_load_policy: 3,
        enablejsapi: 1,
        disablekb: 1
      }

      const tag = document.createElement('script')
      const scriptTags = document.getElementsByTagName('script')
      const scriptTagLast = scriptTags[scriptTags.length - 1]

      tag.src = 'https://www.youtube.com/iframe_api'
      scriptTagLast.parentNode.insertBefore(tag, scriptTagLast.nextSibling)

      window.onYouTubeIframeAPIReady = () => {
        this.player = new YT.Player('player', {
          width,
          height,
          videoId,
          playerVars,
          events
        })
      }

      // youtube(videoId, width, height,playerVars, events)

    },
    videoSeek (serverRequest) {
      this.player.seekTo(this.timeCurrent / 1000, serverRequest)
      this.$store.commit('cml/medias/seek', { seekign: false })
    },
    parseYouTubeId (url) {
      var regex = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/
      return url.match(regex) ? RegExp.$2 : url
    }
  },

  beforeDestroy () {
    console.log('before destroy')
    if (this.player !== null && this.player.destroy) {
      this.player.destroy()
    }

    this.player = null
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
    },
    media (media) {
      this.videoLoad(media.url)
    }
  }
}

</script>
