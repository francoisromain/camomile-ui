<template>
  <div>
    <div class="flex flex-start">
      <h2 class="mt-xs">Annotations</h2>
    </div>
    <annotations-layer
      v-for="layer in layers" 
      v-if="annotations[layer.id]"
      :key="layer.id"
      :layer="layer"
      :annotations="annotations[layer.id]"
      :active-id="activeId"
      :media-id="mediaId"
      :media-name="mediaName"
      class="mt" />
  </div>
</template>

<script>
import annotationsLayer from './annotations-layer.vue'

export default {
  name: 'CamomileAnnotations',

  components: {
    annotationsLayer
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
    }
  },

  computed: {
    annotations () {
      return this.$store.getters['cml/annotations/lists'](this.uid)
    },
    activeId () {
      return this.$store.state.cml.annotations.actives[this.uid] || null
    },
    layers () {
      return this.$store.getters['cml/layers/actives'](this.layersUid)
    },
    mediaId () {
      return this.$store.state.cml.medias.actives[this.mediaUid].id
    },
    mediaName () {
      const media = this.$store.getters['cml/medias/active'](this.mediaUid)
      return media ? media.name : ''
    }
  },

  created () {
    this.$store.dispatch('cml/annotations/register', {
      uid: this.uid,
      mediaUid: this.mediaUid,
      layersUid: this.layersUid
    })
  }
}
</script>
