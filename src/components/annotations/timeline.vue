<template>
  <div ref="container">
    <div
      v-if="layers"
      :style="{ height: `${40 * layers.length}px` }"
      class="relative overflow-hidden bg-bg">
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
    uid: {
      type: String,
      default: 'default'
    }
  },

  data () {
    return {
      width: 3000,
      containerWidth: 0,
      containerLeft: 0,
      fragmentType: {
        time: {
          start: 0,
          end: 0
        }
      },
      metadataType: {
        label: ""
      }
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
      return this.$store.getters['medias/properties'](this.mediaUid)
    },
    timeCurrent () {
      return this.mediaProperties.timeCurrent || 0
    },
    timeTotal () {
      return this.mediaProperties.timeTotal || 0
    },
    annotations () {
      return this.$store.getters['annotations/filtered'](this.uid)
    },
    layers () {
      return this.$store.getters['layers/actives'](this.layersUid)
    },
    left () {
      return (
        this.containerWidth / 2 - this.timeCurrent / this.timeTotal * this.width
      )
    }
  },

  created () {
    this.$store.commit('annotations/filterRegister', {
      uid: this.uid,
      filter: this.filter
    })

    this.$store.commit('layers/typesRegister', {
      uid: this.layersUid,
      fragmentType: this.fragmentType,
      metadataType: this.metadataType
    })
  },

  mounted () {
    window.addEventListener('resize', this.resize)
    this.containerWidth = this.$refs.container.offsetWidth
    this.containerLeft = this.$refs.container.offsetLeft
  },

  methods: {
    filter (a) {
      return a.fragment &&
        a.fragment.time &&
        !isNaN(a.fragment.time.start) &&
        !isNaN(a.fragment.time.end) &&
        a
    },
    resize () { }
  }
}
</script>
