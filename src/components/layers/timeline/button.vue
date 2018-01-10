<template>
  <button class="btn p-s"
    @click="annotationCreate({ element: { id: null, layerId: layer.id, mediaId, fragment: {}, metadata: {} } })">
    <i class="icon-24 icon-24-plus"></i>
  </button>
</template>

<script>
export default {
  props: {
    layer: Object,
    annotations: Array,
    mediaId: String,
    timeTotal: Number,
    timeCurrent: Number
  }
}
</script>

