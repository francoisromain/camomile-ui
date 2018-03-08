<template>
  <div
    v-if="visible"
    ref="annotation"
    :style="{ left: `${left}%`, top: `${top}%`, width:`${width}%`, height:`${height}%` }">
    <div
      class="relative full-y"
      @mousedown="set($event)">
      <div
        class="absolute handle handle-topleft"
        @mousedown="dragTopleftOn($event)" />
      <div
        class="absolute handle handle-bottomright"
        @mousedown="dragBottomrightOn($event)"/>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    uid: {
      type: String,
      default: 'default'
    },
    layersUid: {
      type: String,
      default: 'default'
    },
    annotation: {
      type: Object,
      default: () => ({})
    },
    timeTotal: {
      type: Number,
      default: 0
    },
    timeCurrent: {
      type: Number,
      default: 0
    },
    containerWidth: {
      type: Number,
      default: 0
    }
  },

  data () {
    return {
      leftDragging: null,
      topDragging: null,
      rightDragging: null,
      bottomDragging: null,
      handleWidth: 32
    }
  },

  computed: {
    timeStart () {
      return this.annotation.fragment.time.start
    },
    timeEnd () {
      return this.annotation.fragment.time.end
    },
    positionIndex () {
      return this.annotation.fragment.positions
        .slice()
        .reverse()
        .findIndex(pos => pos.time <= this.timeCurrent)
    },
    visible () {
      return (
        this.positionIndex !== -1 &&
        this.timeStart <= this.timeCurrent &&
        this.timeEnd >= this.timeCurrent
      )
    },
    position () {
      return this.annotation.fragment.positions[this.positionIndex]
    },
    left () {
      if (this.visible) {
        return this.leftDragging !== null
          ? this.leftDragging
          : this.position.left
      }
    },
    top () {
      if (this.visible) {
        return this.topDragging !== null ? this.topDragging : this.position.top
      }
    },
    width () {
      if (this.visible) {
        return this.bottomDragging !== null
          ? this.bottomDragging
          : this.position.width
      }
    },
    height () {
      if (this.visible) {
        return this.bottomDragging !== null
          ? this.bottomDragging
          : this.position.height
      }
    }
  },

  methods: {
    positionUpdate (positions) {
      const element = Object.assign({}, this.annotation)
      positions.forEach(
        position => (element.fragment.position[position.type] = position.value)
      )
      return this.$store.dispatch('annotations/update', { element })
    },
    dragTopleftOn (e) {
      document.addEventListener('mousemove', this.dragTopleft)
      document.addEventListener('mouseup', this.dragTopleftOff)
    },
    dragTopleftOff (e) {
      document.removeEventListener('mousemove', this.dragTopleft)
      document.removeEventListener('mouseup', this.dragTopleftOff)
      const positions = [
        {
          type: 'top',
          value: this.$refs.annotation.offsetTop
        },
        {
          type: 'top',
          value: this.$refs.annotation.offsetLeft
        }
      ]
      this.positionUpdate(positions)
      this.topleftDragging = null
    },
    dragTopleft (e) {
      const c = e.clientX - this.containerLeft + this.handleWidth / 2

      if (c < 0) {
        this.topDragging = 0
      } else if (c > this.containerWidth - this.right) {
        this.topDragging = this.containerWidth - this.right
      } else {
        this.topDragging = c
      }
    },
    dragBottomrightOn (e) {
      document.addEventListener('mousemove', this.dragRight)
      document.addEventListener('mouseup', this.dragRightOff)
    },
    dragRightOff (e) {
      document.removeEventListener('mousemove', this.dragRight)
      document.removeEventListener('mouseup', this.dragRightOff)
      const time = Math.round(
        (this.$refs.annotation.offsetLeft + this.$refs.annotation.offsetWidth) *
        this.timeTotal /
        this.containerWidth
      )
      this.positionUpdate(time, 'end')
      this.bottomDragging = null
    },
    dragRight (e) {
      const c =
        this.containerWidth +
        this.containerLeft -
        e.clientX +
        this.handleWidth / 2

      this.bottomDragging = c > 0 ? c : 0
    },
    set (e) {
      this.$store.commit('annotations/set', {
        id: this.annotation.id,
        uid: this.uid
      })
    }
  }
};
</script>
