<template>
  <div class="relative annotations" ref="container">
    <annotations-blocs class="absolute annotation"
      v-for="annotation in annotations"
      :key="annotation.id"
      :uid="uid"
      :layers-uid="layersUid"
      :id="annotation.id"
      :layer-id="layerId"
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
    layersUid: String,
    layerId: String,
    annotations: Array,
    timeTotal: Number,
    timeCurrent: Number,
    width: Number,
    left: Number,
    uid: String
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
