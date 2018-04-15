<template>
  <div class="p bg-bg mb">
    <div class="flex flex-start">
      <h2 class="mt-xs">Annotations</h2>
    </div>
    <annotations-layer
      v-for="layer in layers" 
      v-if="annotations[layer.id]"
      :key="layer.id"
      :layer="layer"
      :annotations="annotations[layer.id]"
      :annotations-filtered="annotationsFiltered[layer.id]"
      :active-id="activeId"
      :media-id="mediaId"
      :media-name="mediaName"
      class="mt" />
  </div>
</template>

<script>
import annotationsLayer from './list/layer.vue'

export default {
  name: 'CamomileAnnotationsList',

  components: {
    annotationsLayer
  },

  props: {
    uid: {
      type: String,
      default: 'default'
    }
  },

  computed: {
    annotations () {
      return this.$store.getters['annotations/lists'](this.uid)
    },
    annotationsFiltered () {
      return this.$store.getters['annotations/filtered'](this.uid)
    },
    activeId () {
      return this.$store.state.annotations.actives[this.uid] || null
    },
    mediaUid () {
      return this.$store.state.annotations.lists[this.uid].mediaUid
    },
    layersUid () {
      return this.$store.state.annotations.lists[this.uid].layersUid
    },
    layers () {
      return this.$store.getters['layers/actives'](this.layersUid)
    },
    mediaId () {
      return this.$store.state.medias.actives[this.mediaUid].id
    },
    mediaName () {
      const media = this.$store.getters['medias/active'](this.mediaUid)
      return media ? media.name : ''
    }
  }
};
</script>
