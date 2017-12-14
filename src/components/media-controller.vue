<template>
  <div class="mediacontroller relative" v-if="isLoaded">
    <button class="mediacontroller-button" ref="button" @click="mediaToggle">{{ playButton }}</button>
    <div class="mediacontroller-counter" ref="counter">{{ timeCurrentFormat }} / {{ timeTotalFormat }}
    </div>

    <div class="mediacontroller-progress" ref="progress"
      @click="progressClick"
      @mousemove="progressMousemove"
      @mousedown="progressMousedown"
      @mouseup="progressMouseup">
      <div class="relative pointer-none full-y">
        <div class="mediacontroller-progress-bar" :style="{ width: progressBarWidth }">
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  props: {
    controls: Object
  },
  data () {
    return {
      mousedown: false
    }
  },
  computed: {
    ...mapState({
      timeTotal: state => state.cml.medias.properties.timeTotal,
      timeCurrent: state => state.cml.medias.properties.timeCurrent,
      isPlaying: state => state.cml.medias.properties.isPlaying,
      isLoaded: state => state.cml.medias.properties.isLoaded
    }),
    timeCurrentFormat () {
      return this.msToMinutesAndSeconds(this.timeCurrent)
    },
    timeTotalFormat () {
      return this.msToMinutesAndSeconds(this.timeTotal)
    },
    progressBarWidth () {
      return `${this.timeCurrent / this.timeTotal * 100}%`
    },
    playButton () {
      return this.isPlaying ? '❚ ❚' : '►'
    }
  },
  methods: {
    mediaToggle () {
      if (this.isPlaying) {
        this.$store.commit('cml/medias/play', false)
      } else {
        this.$store.commit('cml/medias/play', true)
      }
    },
    progressClick (e) {
      this.seek(e.offsetX / this.$refs.progress.offsetWidth, true)
    },
    progressMousemove (e) {
      this.mousedown && this.seek(e.offsetX / this.$refs.progress.offsetWidth, false)
    },
    progressMousedown () {
      this.mousedown = true
    },
    progressMouseup () {
      this.mousedown = false
    },
    seek (ratio, serverRequest) {
      this.$store.dispatch('cml/medias/seek', { ratio, serverRequest })
    },
    msToMinutesAndSeconds (ms) {
      const minutes = Math.floor(ms / 60000)
      const seconds = ((ms % 60000) / 1000).toFixed(0)
      return minutes + ':' + (seconds < 10 ? '0' : '') + seconds
    }
  }
}

</script>
