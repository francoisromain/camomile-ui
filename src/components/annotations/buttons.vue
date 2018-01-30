<template>
  <div>
    <annotation-button 
      v-for="layer in layers" 
      :key="`annotation-button-${layer.id}`"
      v-if="annotations[layer.id] && layer.permission === 3"
      :layer-id="layer.id"
      :media-id="mediaId"
      :time-current="timeCurrent"
      :fragmentType="layer.fragmentType"
    ></annotation-button>
  </div>
</template>

<script>
import annotationButton from './buttons/button.vue'

export default {
  components: {
    annotationButton
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
      default: (a, d) => {
        return true
      }
    }
  },

  computed: {
    properties() {
      return this.$store.state.cml.medias.properties[this.mediaUid] || {}
    },
    timeCurrent() {
      return this.properties.timeCurrent || 0
    },
    annotations() {
      return (
        this.$store.state.cml.annotations.lists[this.uid] &&
        this.$store.state.cml.annotations.lists[this.uid].layers
      )
    },
    mediaId() {
      return this.$store.state.cml.medias.actives[this.mediaUid].id
    },
    layers() {
      const active = this.$store.state.cml.layers.actives[this.layersUid]
      return active ? this.$store.state.cml.layers.lists[active.corpuUid] : {}
    }
  },

  methods: {
    resize() {}
  }
}
</script>
