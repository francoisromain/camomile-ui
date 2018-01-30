<template>
  <div class="mediacontroller">
    <div class="mediacontroller-controls clearfix pb-s">
      <button class="mediacontroller-button btn" ref="button" @click="mediaToggle" :disabled="!isLoaded">{{ playButton }}</button>
      <div class="mediacontroller-counter" ref="counter">{{ msToMinutesAndSeconds(timeCurrent) }} / {{ msToMinutesAndSeconds(timeTotal) }}
      </div>
    </div>

    <div class="mediacontroller-progress" ref="progress" :class="{ loaded: isLoaded }"
      @mousedown="progressMousedown($event)">
      <div class="pointer-none full-y">
        <div class="mediacontroller-progress-bar" :style="{ width: progressBarWidth }">
        </div>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  props: {
    mediaUid: {
      type: String,
      default: 'default'
    }
  },

  data() {
    return {
      mousedown: false
    }
  },

  computed: {
    properties() {
      return this.$store.state.cml.medias.properties[this.mediaUid] || {}
    },
    timeCurrent() {
      return this.properties.timeCurrent || 0
    },
    timeTotal() {
      return this.properties.timeTotal || 0
    },
    playButton() {
      return (this.properties.isPlaying && '❚ ❚') || '►'
    },
    isLoaded() {
      return this.properties.isLoaded || false
    },
    progressBarWidth() {
      return this.timeTotal ? `${this.timeCurrent / this.timeTotal * 100}%` : 0
    }
  },

  methods: {
    mediaToggle() {
      if (this.properties.isPlaying) {
        this.$store.commit('cml/medias/pause', { uid: this.mediaUid })
      } else {
        this.$store.commit('cml/medias/play', { uid: this.mediaUid })
      }
    },
    progressMousemove(e) {
      let x
      if (e.clientX - this.$refs.progress.offsetLeft < 0) {
        x = 0
      } else if (
        e.clientX >
        this.$refs.progress.offsetLeft + this.$refs.progress.offsetWidth
      ) {
        x = 1
      } else {
        x =
          (e.clientX - this.$refs.progress.offsetLeft) /
          this.$refs.progress.offsetWidth
      }
      this.seek(x, false)
    },
    progressMousedown(e) {
      document.addEventListener('mousemove', this.progressMousemove)
      document.addEventListener('mouseup', this.progressMouseup)
      this.progressMousemove(e)
    },
    progressMouseup() {
      document.removeEventListener('mousemove', this.progressMousemove)
      document.removeEventListener('mouseup', this.progressMouseup)
    },
    seek(ratio, serverRequest, uid) {
      if (this.properties.isLoaded) {
        this.$store.dispatch('cml/medias/seek', {
          ratio,
          serverRequest,
          uid: this.mediaUid
        })
      }
    },
    msToMinutesAndSeconds(ms) {
      const minutes = Math.floor(ms / 60000)
      const seconds = ((ms % 60000) / 1000).toFixed(0)
      return minutes + ':' + (seconds < 10 ? '0' : '') + seconds
    }
  }
}
</script>
