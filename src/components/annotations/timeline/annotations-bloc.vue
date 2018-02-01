<template>
  <div ref="annotation"
    :style="{ left: `${left}px`, right: `${right}px` }">
    <div class="relative full-y"
      @mousedown="set($event)">
      <div class="absolute handle handle-left"
        @mousedown="dragLeftOn($event)"></div>
      <div class="absolute handle handle-right"
        @mousedown="dragRightOn($event)"></div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    uid: String,
    annotation: Object,
    layerId: String,
    layersUid: String,
    timeTotal: Number,
    containerWidth: Number,
    containerLeft: Number
  },

  data() {
    return {
      leftDragging: null,
      rightDragging: null,
      handleWidth: 32
    }
  },

  computed: {
    time() {
      return this.annotation.fragment.time
    },
    left() {
      return this.leftDragging !== null
        ? this.leftDragging
        : this.time.start * this.containerWidth / this.timeTotal
    },
    right() {
      return this.rightDragging !== null
        ? this.rightDragging
        : (this.timeTotal - this.time.end) *
            this.containerWidth /
            this.timeTotal
    }
  },

  methods: {
    timeUpdate(time, type) {
      const element = Object.assign({}, this.annotation)
      element.fragment.time[type] = time
      return this.$store.dispatch('cml/annotations/update', { element })
    },
    dragLeftOn(e) {
      document.addEventListener('mousemove', this.dragLeft)
      document.addEventListener('mouseup', this.dragLeftOff)
    },
    dragLeftOff(e) {
      document.removeEventListener('mousemove', this.dragLeft)
      document.removeEventListener('mouseup', this.dragLeftOff)
      const time = Math.round(
        this.$refs.annotation.offsetLeft * this.timeTotal / this.containerWidth
      )
      this.timeUpdate(time, 'start')
      this.leftDragging = null
    },
    dragLeft(e) {
      const c = e.clientX - this.containerLeft + this.handleWidth / 2

      if (c < 0) {
        this.leftDragging = 0
      } else if (c > this.containerWidth - this.right) {
        this.leftDragging = this.containerWidth - this.right
      } else {
        this.leftDragging = c
      }
    },
    dragRightOn(e) {
      document.addEventListener('mousemove', this.dragRight)
      document.addEventListener('mouseup', this.dragRightOff)
    },
    dragRightOff(e) {
      document.removeEventListener('mousemove', this.dragRight)
      document.removeEventListener('mouseup', this.dragRightOff)
      const time = Math.round(
        (this.$refs.annotation.offsetLeft + this.$refs.annotation.offsetWidth) *
          this.timeTotal /
          this.containerWidth
      )
      this.timeUpdate(time, 'end')
      this.rightDragging = null
    },
    dragRight(e) {
      const c =
        this.containerWidth +
        this.containerLeft -
        e.clientX +
        this.handleWidth / 2

      this.rightDragging = c > 0 ? c : 0
    },
    set(e) {
      this.$store.commit('cml/annotations/set', {
        id: this.annotation.id,
        uid: this.uid
      })
    }
  }
}
</script>
