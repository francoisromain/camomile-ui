<template>
  <div class="absolute annotation"
    :style="{ left, right }"
    ref="annotation">
    <div class="relative full-y">
      <div class="absolute handler handler-left"
        @mousedown="dragLeftOn($event)"></div>
      <div class="absolute handler handler-right"
        @mousedown="dragRightOn($event)"></div>
    </div>
  </div>
</template>
<script>
export default {

  props: {
    id: String,
    layerId: String,
    uid: String,
    timeTotal: Number,
    containerWidth: Number,
    containerLeft: Number,
  },

  data () {
    return {
      leftDragging: 0,
      rightDragging: 0,
      leftPosition: 0,
      rightPosition: 0,
      handlerWidth: 32
    }
  },

  computed: {
    annotation () {
      return this.$store.state.cml.annotations.lists[this.uid][this.layerId].find(e => e.id === this.id)
    },
    time () {
      return this.annotation.fragment.time
    },
    left () {
      return this.leftDragging ? `${this.leftDragging}px` : `${this.time.start * this.containerWidth / this.timeTotal}px`
    },
    right () {
      return this.rightDragging ? `${this.rightDragging}px` : `${(this.timeTotal - this.time.end) * this.containerWidth / this.timeTotal}px`
    }
  },

  methods: {
    timeUpdate (time, type) {
      const element = Object.assign({}, this.annotation)
      element.fragment.time[type] = time
      return this.$store.dispatch('cml/annotations/update', { element })
    },
    dragLeftOn (e) {
      document.addEventListener('mousemove', this.dragLeft)
      document.addEventListener('mouseup', this.dragLeftOff)
    },
    dragLeftOff (e) {
      document.removeEventListener('mousemove', this.dragLeft)
      document.removeEventListener('mouseup', this.dragLeftOff)
      const time = Math.round(this.$refs.annotation.offsetLeft * this.timeTotal / this.containerWidth)
      this.timeUpdate(time, 'start')
      this.leftDragging = 0
    },
    dragLeft (e) {
      this.leftDragging = e.clientX - this.containerLeft - this.handlerWidth / 2
    },
    dragRightOn (e) {
      document.addEventListener('mousemove', this.dragRight)
      document.addEventListener('mouseup', this.dragRightOff)
    },
    dragRightOff (e) {
      document.removeEventListener('mousemove', this.dragRight)
      document.removeEventListener('mouseup', this.dragRightOff)
      const time = Math.round((this.$refs.annotation.offsetLeft + this.$refs.annotation.offsetWidth) * this.timeTotal / this.containerWidth)
      this.timeUpdate(time, 'end')
      this.rightDragging = 0
    },
    dragRight (e) {
      this.rightDragging = this.containerWidth + this.containerLeft - e.clientX - this.handlerWidth / 2
    }
  }

}
</script>


<style scoped>
.annotation {
  background-color: rgba(255, 0, 0, 0.5);
  top: 0;
  bottom: 0;
  text-align: center;
}

.handler {
  width: 32px;
  background-color: yellow;
  top: 0;
  bottom: 0;
  cursor: ew-resize;
}

.handler-right {
  right: 0;
}

.handler-left {
  left: 0;
}
</style>
