<template>
  <div>
    <annotations-bloc
      v-for="annotation in annotations"
      :key="annotation.id"
      :annotation="annotation"
      :uid="uid"
      :layers-uid="layersUid"
      :layer-id="layerId"
      :time-total="timeTotal"
      :container-width="width"
      :container-left="left"
      :class="{ active: annotation.id === activeId }"
      class="absolute annotation" />
  </div>
</template>

<script>
import annotationsBloc from './annotations-bloc.vue'

export default {
  components: {
    annotationsBloc
  },

  props: {
    uid: {
      type: String,
      default: 'default'
    },
    layersUid: {
      type: String,
      default: 'default'
    },
    layerId: {
      type: String,
      default: 'layerIdHash'
    },
    annotations: {
      type: Array,
      default: () => []
    },
    timeTotal: {
      type: Number,
      default: 0
    },
    width: {
      type: Number,
      default: 0
    },
    left: {
      type: Number,
      default: 0
    }
  },

  computed: {
    activeId () {
      return this.$store.state.annotations.actives[this.uid]
    }
  }
}
</script>
