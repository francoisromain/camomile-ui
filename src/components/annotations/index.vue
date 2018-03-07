<template>
  <div>
    <h2>Annotations</h2>
    <pre>Layers: {{ layersUid }}
Media: {{ mediaUid }}
Annotations: {{ uid }}</pre>
  </div>
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
    this.$store.dispatch('cml/annotations/register', {
      uid: this.uid,
      mediaUid: this.mediaUid,
      layersUid: this.layersUid
    })
  }
}
</script>
