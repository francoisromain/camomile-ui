<template>
  <div>
    <h2>Annotations</h2>
    <annotation-button 
      v-for="layer in layers" 
      v-if="annotations[layer.id] && layer.permission === 3"
      :key="`annotation-button-${layer.id}`"
      :layer-id="layer.id"
      :layer-name="layer.name"
      :media-id="mediaId"
      :time-current="timeCurrent"
      :time-total="timeTotal"
      :fragment-type="layer.fragmentType" />
  </div>
</template>

<script>
import annotationButton from './buttons/button.vue'

export default {
  components: {
    annotationButton
  },

  props: {
    uid: {
      type: String,
      default: 'default'
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
      return this.$store.getters['annotations/lists'](this.uid)
    },
    mediaId () {
      return this.$store.state.medias.actives[this.mediaUid].id
    },
    layers () {
      return this.$store.getters['layers/actives'](this.layersUid)
    }
  },

  methods: {
    resize () { }
  }
}
</script>
