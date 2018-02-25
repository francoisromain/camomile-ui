<template>
  <div>
  </div>
</template>
<script>
export default {
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
      return this.$store.getters['cml/annotations/actives'](this.uid)
    },
    mediaId () {
      return this.$store.state.cml.medias.actives[this.mediaUid].id
    },
    layers () {
      return this.$store.getters['cml/layers/actives'](this.layersUid)
    }
  },

}
</script>
