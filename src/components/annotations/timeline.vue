<template>
  <div ref="container">
    <div class="relative overflow-hidden" :style="{ height: `${40 * layers.length}px` }" v-if="layers">
      <div class="absolute timeline-annotations" :style="{
        top: 0, bottom: 0, left: `${left}px`, width: `${width}px`
      }" ref="container">
        <timeline-annotations 
          v-for="layer in layers" 
          :key="`annotations-${layer.id}`"
          v-if="annotations[layer.id]"
          :uid="uid"
          :layers-uid="layersUid"
          :layer-id="layer.id"
          :annotations="annotations[layer.id]"
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
import timelineAnnotations from './timeline/annotations.vue'

export default {
  components: {
    timelineAnnotations
  },

  props: {
    mediaUid: {
      type: String,
      default: 'default'
    },
    layersUid: {
      type: String,
      default: 'default'
    },
    uid: {
      type: String,
      default: 'default'
    },
    filter: {
      type: Function,
      default: a =>
        a.fragment &&
        a.fragment.time &&
        !isNaN(a.fragment.time.start) &&
        !isNaN(a.fragment.time.end) &&
        a
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
    mediaProperties() {
      return this.$store.state.cml.medias.properties[this.mediaUid] || {}
    },
    timeCurrent() {
      return this.mediaProperties.timeCurrent || 0
    },
    timeTotal() {
      return this.mediaProperties.timeTotal || 0
    },
    annotations() {
      const annotationsList = this.$store.state.cml.annotations.lists[this.uid]
      return (
        annotationsList &&
        Object.keys(annotationsList.layers).reduce(
          (res, layer) =>
            Object.assign(res, {
              [layer]: annotationsList.layers[layer].filter(a => this.filter(a))
            }),
          {}
        )
      )
    },
    layers() {
      const active = this.$store.state.cml.layers.actives[this.layersUid]
      return active ? this.$store.state.cml.layers.lists[active.corpuUid] : {}
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
