<template>
  <div>
    <h2>Layers</h2>
    <pre>Corpus: {{ corpusUid }}
Layers: {{ uid }}</pre>
  </div>
</template>

<script>

export default {
  name: 'CamomileLayers',

  props: {
    uid: {
      type: String,
      default: 'default'
    },
    corpusUid: {
      type: String,
      default: 'default'
    }
  },

  created () {
    this.$store.dispatch('cml/layers/register', {
      uid: this.uid,
      corpuUid: this.corpusUid
    })
  }
}
</script>
