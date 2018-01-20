<template>
  <button class="btn p-s"
    @click="annotationCreate({ id: null, layerId, mediaId, fragment: { time: { end: timeCurrent + 25000, start: timeCurrent } }, metadata: {} })">
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
    timeCurrent: Number
  },
  methods: {
    annotationCreate(element) {
      this.$store.dispatch(`cml/annotations/add`, { element })
    }
  }
}
</script>
