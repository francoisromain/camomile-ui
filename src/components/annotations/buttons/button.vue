<template>
  <button class="btn p-s"
    @click="annotationCreate">
    <i class="icon-24 icon-24-plus"></i>
  </button>
</template>

<script>
export default {
  props: {
    layerId: String,
    annotations: Array,
    mediaId: String,
    timeTotal: Number,
    timeCurrent: Number,
    fragmentType: Object
  },
  methods: {
    annotationCreate() {
      const element = {
        id: null,
        layerId: this.layerId,
        mediaId: this.mediaId,
        fragment: this.fragmentTypeFormat(this.fragmentType),
        metadata: {}
      }
      this.$store.dispatch(`cml/annotations/add`, { element })
    },

    fragmentTypeFormat(fragmentType) {
      if (!fragmentType.time) {
        fragmentType.time = {}
      }
      fragmentType.time.start = this.timeCurrent
      fragmentType.time.end = this.timeCurrent + 25000
      return fragmentType
    }
  }
}
</script>
