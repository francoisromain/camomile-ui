<template>
  <span />
</template>

<script>

export default {
  name: 'CamomileMedias',

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
    this.$store.commit('medias/register', { uid: this.uid, corpuUid: this.corpusUid })
  }
};
</script>
