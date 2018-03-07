<template>
  <span />
</template>


<script>

export default {
  name: 'CamomileAnnotations',

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

  created () {
    this.$store.commit('annotations/register', {
      uid: this.uid,
      mediaUid: this.mediaUid,
      layersUid: this.layersUid
    })
  }
}
</script>
