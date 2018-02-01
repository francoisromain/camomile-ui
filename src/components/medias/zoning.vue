<template>
  <div class="relative full-y" ref="container">
    <zoning-annotations class="absolute full"
      v-for="layer in layers" 
      :key="`annotations-${layer.id}`"
      v-if="annotations[layer.id]"
      :uid="uid"
      :layers-uid="layersUid"
      :layer-id="layer.id"
      :annotations="annotations[layer.id]"
      :time-total="timeTotal"
      :time-current="timeCurrent"
      >
    </zoning-annotations>
  </div>
</template>

<script>
import zoningAnnotations from './zoning/annotations.vue'

export default {
  components: { zoningAnnotations },

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
    },
    layers: Array
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
    }
  }
}
</script>
