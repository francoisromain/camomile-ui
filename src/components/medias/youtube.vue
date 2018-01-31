<template>
  <div v-if="media" ref="container">
    <div v-show="isLoaded">
      <div id="player"></div>
    </div>
    <spinner v-if="!isLoaded"></spinner>
  </div>
</template>

<script>
import spinner from '../utils/spinner.vue'

export default {
  name: 'camomile-media-youtube',

  props: {
    mediaUid: {
      type: String,
      default: 'default'
    },
    filter: {
      type: Function,
      default: media =>
        media.description.type && media.description.type === 'youtube' && media
    }
  },

  components: {
    spinner
  },

  data() {
    return {
      player: null,
      videoNew: false
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
      return (
        (this.media &&
          this.$store.state.cml.medias.properties[this.mediaUid]) ||
        {}
      )
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

  mounted() {
    if (this.media && this.media.url) {
      this.playerLoad(this.media.url)
    }
  },

  methods: {
    videoLoad(mediaUrl) {
      if (this.player) {
        const videoId = this.parseYouTubeId(mediaUrl)
        this.player.loadVideoById(videoId)
      } else {
        this.playerLoad(this.media.url)
      }
    },

    playerLoad(mediaUrl) {
      const videoId = this.parseYouTubeId(mediaUrl)
      const width = this.$refs.container.offsetWidth
      const height = width * 9 / 16
      const events = {
        onReady: event => {
          // console.log('onReady', event)
          this.$store.commit('cml/medias/loaded', {
            isLoaded: true,
            uid: this.mediaUid
          })
          this.$store.commit('cml/medias/timeTotal', {
            time: this.player.getDuration() * 1000,
            uid: this.mediaUid
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
              this.$store.commit('cml/medias/loaded', {
                isLoaded: true,
                uid: this.mediaUid
              })
              this.$store.commit('cml/medias/timeTotal', {
                time: this.player.getDuration() * 1000,
                uid: this.mediaUid
              })
              this.player.pauseVideo()
            } else {
              this.$store.dispatch('cml/medias/play', { uid: this.mediaUid })
            }
          } else if (event.data === 2) {
            // paused
            this.$store.dispatch('cml/medias/pause', { uid: this.mediaUid })
          } else if (event.data === 3) {
            // buffering
            this.$store.dispatch('cml/medias/buffering', { uid: this.mediaUid })
          } else if (event.data === 0) {
            // ended
            this.$store.dispatch('cml/medias/stop', { uid: this.mediaUid })
          } else if (event.data === 5) {
            // cued
            this.$store.commit('cml/medias/loaded', {
              isLoaded: true,
              uid: this.mediaUid
            })
            this.$store.commit('cml/medias/timeTotal', {
              time: this.player.getDuration() * 1000,
              uid: this.mediaUid
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

      window.onYouTubeIframeAPIReady = () => {
        this.player = new YT.Player('player', {
          width,
          height,
          videoId,
          playerVars,
          events
        })
      }
    },
    videoSeek(serverRequest) {
      this.player.seekTo(this.timeCurrent / 1000, serverRequest)
      this.$store.commit('cml/medias/seek', {
        options: { seeking: false },
        uid: this.mediaUid
      })
    },
    parseYouTubeId(url) {
      var regex = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/
      return url.match(regex) ? RegExp.$2 : url
    }
  },

  beforeDestroy() {
    if (this.player !== null && this.player.destroy) {
      this.player.destroy()
    }

    this.player = null
  },

  watch: {
    isPlaying(val) {
      if (val) {
        this.player.playVideo()
      } else {
        this.player.pauseVideo()
      }
    },
    seek(options) {
      if (options.seeking) {
        this.videoSeek(options.serverRequest)
      }
    },
    viewportWidth() {
      const width = this.$refs.container.offsetWidth
      const height = width * 9 / 16
      this.player.setSize(width, height)
    },
    media(media, mediaOld) {
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
  }
}
</script>
