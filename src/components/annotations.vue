<template>
  <div>
    <div class="flex flex-start">
      <h2 class="mt-s mb-s">Annotations</h2>
    </div>
    <annotations-layer v-for="layer in layers" 
      :key="layer.id" class="mt" 
      v-if="annotations[layer.id]"
      :layer="layer"
      :annotations="annotations[layer.id]"
      :active-id="activeId"
      :media-id="mediaId"
      :media-name="mediaName"
      >
    </annotations-layer>
  </div>
</template>

<script>
import annotationsLayer from './annotations-layer.vue'

export default {
  name: 'camomile-annotations',

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
    annotations() {
      return (
        (this.$store.state.cml.annotations.lists[this.uid] &&
          this.$store.state.cml.annotations.lists[this.uid].layers) ||
        {}
      )
    },
    activeId() {
      const actives = this.$store.state.cml.annotations.actives[this.uid]
      return actives ? actives : null
    },
    layers() {
      const actives = this.$store.state.cml.layers.actives[this.layersUid]
      const layers = this.$store.state.cml.layers.lists[actives.corpuUid]
      return actives && layers
        ? layers.filter(l => actives.ids.indexOf(l.id) !== -1)
        : {}
    },
    medias() {
      const active = this.$store.state.cml.medias.actives[this.mediaUid]
      return active ? this.$store.state.cml.medias.lists[active.corpuUid] : {}
    },
    mediaId() {
      return this.$store.state.cml.medias.actives[this.mediaUid].id
    },
    mediaName() {
      if (!this.mediaId) return ''
      const media = this.medias.find(m => m.id === this.mediaId)
      return media ? media.name : ''
    }
  },

  created() {
    this.$store.dispatch('cml/annotations/register', {
      uid: this.uid,
      mediaUid: this.mediaUid,
      layersUid: this.layersUid
    })
  }
}
</script>
