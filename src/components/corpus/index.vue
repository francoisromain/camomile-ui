<template>
  <span />
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
