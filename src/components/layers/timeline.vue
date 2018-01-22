<template>
  <div ref="container">
    <timeline-button 
      v-for="layer in layers" 
      :key="`button-${layer.id}`"
      v-if="annotations[layer.id] && layer.permission === 3"
      :layer-id="layer.id"
      :media-id="mediaId"
      :time-current="timeCurrent"
    ></timeline-button> left: {{ left }}
    <div class="relative overflow-hidden" :style="{ height: `${40 * layers.length}px` }" v-if="layers">
      <div class="absolute timeline-annotations" :style="{
        top: 0, bottom: 0, left: `${left}px`, width: `${width}px`
      }" ref="container">
        <timeline-annotations 
          v-for="layer in layers" 
          :key="`annotations-${layer.id}`"
          v-if="annotations[layer.id]"
          :uid="uid"
          :layer="layer"
          :annotations="annotations[layer.id]"
          :media-id="mediaId"
          :time-total="timeTotal"
          :time-current="timeCurrent"
          :width="width"
          :left="left + containerLeft"
          >
        </timeline-annotations>
      </div>
    </div>
  </div>
</template>

<script>
import timelineButton from './timeline/button.vue'
import timelineAnnotations from './timeline/annotations.vue'

export default {
  components: {
    timelineButton,
    timelineAnnotations
  },

  props: {
    uid: {
      type: String,
      default: 'default'
    }
  },

  data() {
    return {
      width: 3000,
      containerWidth: 0,
      containerLeft: 0
    }
  },

  computed: {
    viewbox() {
      return `0 0 ${this.svg.w} ${this.svg.h}`
    },
    properties() {
      return this.$store.state.cml.medias.properties[this.uid] || {}
    },
    timeCurrent() {
      return this.properties.timeCurrent || 0
    },
    timeTotal() {
      return this.properties.timeTotal || 0
    },
    annotations() {
      return this.$store.state.cml.annotations.lists[this.uid]
    },
    mediaId() {
      return this.$store.state.cml.medias.actives[this.uid]
    },
    layers() {
      return this.$store.state.cml.layers.lists[this.uid]
    },
    actives() {
      return this.$store.state.cml.annotations.actives[this.uid]
    },
    left() {
      return (
        this.containerWidth / 2 - this.timeCurrent / this.timeTotal * this.width
      )
    }
  },

  mounted() {
    window.addEventListener('resize', this.resize)
    this.containerWidth = this.$refs.container.offsetWidth
    this.containerLeft = this.$refs.container.offsetLeft
  },

  methods: {
    resize() {}
  }
}
</script>
