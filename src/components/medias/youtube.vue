<template>
  <div
    v-if="media"
    ref="container">
    <div v-show="isLoaded">
      <div id="player" />
    </div>
    <spinner v-if="!isLoaded" />
  </div>
</template>

<script>
import spinner from '../ui/utils/spinner.vue'

export default {
  name: 'CamomileMediaYoutube',

  components: {
    spinner
  },

  props: {
    uid: {
      type: String,
      default: 'default'
    }
  },

  data () {
    return {
      player: null,
      videoNew: false
    }
  },

  computed: {
    media () {
      return this.$store.getters['medias/filter'](this.uid, this.filter)
    },
    properties () {
      return this.$store.getters['medias/properties'](this.uid, this.filter)
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
      return this.$store.state.viewport.width || 0
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
      if (this.media) {
        const width = this.$refs.container.offsetWidth
        const height = width * 9 / 16
        this.player.setSize(width, height)
      }
    },
    media (media, mediaOld) {
      if (
        media &&
        media.url &&
        mediaOld &&
        mediaOld.url &&
        media.url !== mediaOld.url
      ) {
        this.videoLoad(media.url)
      }
    }
  },

  mounted () {
    if (this.media && this.media.url) {
      this.playerLoad(this.media.url)
    }
  },

  beforeDestroy () {
    if (this.player !== null && this.player.destroy) {
      this.player.destroy()
    }

    this.player = null
  },

  methods: {
    filter (media) {
      return media &&
        media.description &&
        media.description.type && media.description.type === 'youtube' && media
    },
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
          // console.log('onReady', event)
          this.$store.commit('medias/loaded', {
            isLoaded: true,
            uid: this.uid
          })
          this.$store.commit('medias/timeTotal', {
            time: this.player.getDuration() * 1000,
            uid: this.uid
          })
        },
        onStateChange: event => {
          // console.log('onStateChange', event.data, this.videoNew)
          if (event.data === -1) {
            // unstarted
          } else if (event.data === 1) {
            // playing
            if (this.videoNew) {
              this.videoNew = false
              this.$store.commit('medias/loaded', {
                isLoaded: true,
                uid: this.uid
              })
              this.$store.commit('medias/timeTotal', {
                time: this.player.getDuration() * 1000,
                uid: this.uid
              })
              this.player.pauseVideo()
            } else {
              this.$store.dispatch('medias/play', { uid: this.uid })
            }
          } else if (event.data === 2) {
            // paused
            this.$store.dispatch('medias/pause', { uid: this.uid })
          } else if (event.data === 3) {
            // buffering
            this.$store.dispatch('medias/buffering', { uid: this.uid })
          } else if (event.data === 0) {
            // ended
            this.$store.dispatch('medias/stop', { uid: this.uid })
          } else if (event.data === 5) {
            // cued
            this.$store.commit('medias/loaded', {
              isLoaded: true,
              uid: this.uid
            })
            this.$store.commit('medias/timeTotal', {
              time: this.player.getDuration() * 1000,
              uid: this.uid
            })
          }
        },
        onApiChange: event => {
          // console.log('onApiChange', event, this.isLoaded)
          if (!this.isLoaded) {
            this.videoNew = true
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

      // @ts-ignore
      window.onYouTubeIframeAPIReady = () => {
        /* global YT */
        // @ts-ignore
        this.player = new YT.Player('player', {
          width,
          height,
          videoId,
          playerVars,
          events
        })
      }
    },
    videoSeek (serverRequest) {
      this.player.seekTo(this.timeCurrent / 1000, serverRequest)
      this.$store.commit('medias/seek', {
        options: { seeking: false },
        uid: this.uid
      })
    },
    parseYouTubeId (url) {
      var regex = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
      return url.match(regex) ? RegExp.$2 : url
    }
  }
}
</script>
