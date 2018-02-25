<template>
  <div ref="container">
    <div
      v-if="layers"
      :style="{ height: `${40 * layers.length}px` }"
      class="relative overflow-hidden">
      <div class="absolute timeline-cursor"/>
      <div
        :style="{ top: 0, bottom: 0, left: `${left}px`, width: `${width}px` }"
        class="absolute timeline-annotations">
        <timeline-annotations
          v-for="layer in layers" 
          v-if="annotations[layer.id]"
          :key="`annotations-${layer.id}`"
          :uid="uid"
          :layers-uid="layersUid"
          :layer-id="layer.id"
          :annotations="annotations[layer.id]"
          :time-total="timeTotal"
          :width="width"
          :left="left + containerLeft"
          :fragment-type="layer.fragmentType"
          class="relative annotations" />
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

  data () {
    return {
      width: 3000,
      containerWidth: 0,
      containerLeft: 0
    }
  },

  computed: {
    mediaProperties () {
      return this.$store.getters['cml/medias/properties'](this.mediaUid)
    },
    timeCurrent () {
      return this.mediaProperties.timeCurrent || 0
    },
    timeTotal () {
      return this.mediaProperties.timeTotal || 0
    },
    annotations () {
      return this.$store.getters['cml/annotations/filter'](this.uid, this.filter)
    },
    layers () {
      return this.$store.getters['cml/layers/actives'](this.layersUid)
    },
    left () {
      return (
        this.containerWidth / 2 - this.timeCurrent / this.timeTotal * this.width
      )
    }
  },

  mounted () {
    window.addEventListener('resize', this.resize)
    this.containerWidth = this.$refs.container.offsetWidth
    this.containerLeft = this.$refs.container.offsetLeft
  },

  methods: {
    resize () { }
  }
}
</script>

<style>
.timeline-annotations {
  z-index: 0;
}
.annotations {
  height: 40px;
}
</style>
