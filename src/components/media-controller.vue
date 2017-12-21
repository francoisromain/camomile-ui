<template>
  <div class="mediacontroller">
    <div class="mediacontroller-controls clearfix pb-s">
      <button class="mediacontroller-button btn" ref="button" @click="mediaToggle" :disabled="!active.isLoaded">{{ playButton }}</button>
      <div class="mediacontroller-counter" ref="counter">{{ msToMinutesAndSeconds(active.timeCurrent) }} / {{ msToMinutesAndSeconds(active.timeTotal) }}
      </div>
    </div>

    <div class="mediacontroller-progress" ref="progress" :class="{ loaded: active.isLoaded }"
      @click="progressClick"
      @mousemove="progressMousemove"
      @mousedown="progressMousedown"
      @mouseup="progressMouseup">
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
    uid: {
      type: String,
      default: 'default'
    }
  },

  data () {
    return {
      mousedown: false
    }
  },

  computed: {
    active () {
      return this.$store.state.cml.medias.actives[this.uid] || {}
    },
    progressBarWidth () {
      return `${this.active.timeCurrent / this.active.timeTotal * 100}%`
    },
    playButton () {
      return this.active.isPlaying ? '❚ ❚' : '►'
    }
  },

  methods: {
    mediaToggle () {
      if (this.active.isPlaying) {
        this.$store.commit('cml/medias/pause', this.uid)
      } else {
        this.$store.commit('cml/medias/play', this.uid)
      }
    },
    progressClick (e) {
      this.seek(e.offsetX / this.$refs.progress.offsetWidth, true, this.uid)
    },
    progressMousemove (e) {
      this.mousedown && this.seek(e.offsetX / this.$refs.progress.offsetWidth, false, this.uid)
    },
    progressMousedown () {
      this.mousedown = true
    },
    progressMouseup () {
      this.mousedown = false
    },
    seek (ratio, serverRequest, uid) {
      if (this.active.isLoaded) {
        this.$store.dispatch('cml/medias/seek', { ratio, serverRequest, uid })
      }
    },
    msToMinutesAndSeconds (ms) {
      const minutes = Math.floor(ms / 60000)
      const seconds = ((ms % 60000) / 1000).toFixed(0)
      return minutes + ':' + (seconds < 10 ? '0' : '') + seconds
    }
  }
}

</script>
