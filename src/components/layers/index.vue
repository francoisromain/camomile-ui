<template>
  <span />
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
    this.$store.commit('layers/register', {
      uid: this.uid,
      corpuUid: this.corpusUid
    })
  }
}
</script>
