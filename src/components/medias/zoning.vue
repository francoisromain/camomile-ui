<template>
  <div
    ref="container"
    class="relative full-y">
    <zoning-annotations
      v-for="layer in layers" 
      v-if="annotations[layer.id]"
      :key="`annotations-${layer.id}`"
      :uid="uid"
      :layers-uid="layersUid"
      :layer-id="layer.id"
      :annotations="annotations[layer.id]"
      :time-total="timeTotal"
      :time-current="timeCurrent"
      class="absolute full" />
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
    layers: {
      type: Array,
      default: () => []
    },
    filter: {
      type: Function,
      default: a =>
        a.fragment &&
        a.fragment.time &&
        !isNaN(a.fragment.time.start) &&
        !isNaN(a.fragment.time.end) &&
        a.fragment.positions &&
        a.fragment.positions instanceof Array &&
        a
    }
  },

  computed: {
    mediaProperties () {
      return this.$store.state.cml.medias.properties[this.mediaUid] || {}
    },
    timeCurrent () {
      return this.mediaProperties.timeCurrent || 0
    },
    timeTotal () {
      return this.mediaProperties.timeTotal || 0
    },
    annotations () {
      return this.$store.getters['cml/annotations/filter'](this.uid, this.filter)
    }
  }
}
</script>
