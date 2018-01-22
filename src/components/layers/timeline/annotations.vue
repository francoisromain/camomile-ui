<template>
  <div class="relative annotations" ref="container">
    <annotations-blocs class="absolute annotation"
      v-for="annotation in annotations"
      :key="annotation.id"
      :uid="uid"
      :id="annotation.id"
      :layer-id="layer.id"
      :time-total="timeTotal"
      :container-width="width"
      :container-left="left"
      ref="annotations"
      :style="{ zIndex: annotation.id === activeId ? 1 : 0}">
    </annotations-blocs>
  </div>
</template>

<script>
import annotationsBlocs from './annotations-bloc.vue'

export default {
  components: {
    annotationsBlocs
  },

  props: {
    uid: String,
    layer: Object,
    annotations: Array,
    mediaId: String,
    timeTotal: Number,
    timeCurrent: Number,
    width: Number,
    left: Number
  },

  computed: {
    activeId() {
      return this.$store.state.cml.annotations.actives[this.uid]
    }
  }
}
</script>

<style>
.annotations {
  height: 40px;
}
</style>
