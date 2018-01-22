<template>
  <div class="absolute annotation"
    :style="{ left: `${left}px`, right: `${right}px` }"
    ref="annotation">
    <div class="relative full-y"
      @mousedown="set($event)">
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
    containerLeft: Number
  },

  data() {
    return {
      leftDragging: null,
      rightDragging: null,
      handlerWidth: 32
    }
  },

  computed: {
    annotation() {
      return this.$store.state.cml.annotations.lists[this.uid][
        this.layerId
      ].find(e => e.id === this.id)
    },
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
      const c = e.clientX - this.containerLeft + this.handlerWidth / 2

      console.log(c, this.containerWidth - this.right)
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
        this.handlerWidth / 2

      this.rightDragging = c > 0 ? c : 0
    },
    set(e) {
      this.$store.commit('cml/annotations/set', {
        id: this.id,
        uid: this.uid
      })
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
  right: -32px;
}

.handler-left {
  left: -32px;
}
</style>
