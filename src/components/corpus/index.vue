<template>
  <div>
    <h2>Corpus</h2>
    <pre>Corpus: {{ uid }}</pre>
  </div>
</template>

<script>

export default {
  name: 'CamomileCorpus',

  props: {
    uid: {
      type: String,
      default: 'default'
    }
  },

  created () {
    this.$store.dispatch('cml/corpus/register', this.uid)
  }
}
</script>
