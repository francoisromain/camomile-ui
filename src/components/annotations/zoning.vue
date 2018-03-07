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
    
    <slot :media-uid="mediaUid" />
  </div>
</template>

<script>
import zoningAnnotations from './zoning/annotations.vue'

export default {
  components: { zoningAnnotations },

  props: {
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
        a.fragment.positions &&
        a.fragment.positions instanceof Array &&
        a
    }
  },

  computed: {
    mediaUid () {
      return this.$store.state.annotations.lists[this.uid].mediaUid
    },
    layersUid () {
      return this.$store.state.annotations.lists[this.uid].layersUid
    },
    mediaProperties () {
      return this.$store.state.medias.properties[this.mediaUid] || {}
    },
    timeCurrent () {
      return this.mediaProperties.timeCurrent || 0
    },
    timeTotal () {
      return this.mediaProperties.timeTotal || 0
    },
    annotations () {
      return this.$store.getters['annotations/filter'](this.uid, this.filter)
    },
    layers () {
      const active = this.$store.state.layers.actives[this.layersUid]
      return active ? this.$store.state.layers.lists[active.corpuUid] : []
    }
  }
}
</script>
