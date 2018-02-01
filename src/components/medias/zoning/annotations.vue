<template>
  <div ref="container">
    <annotations-bloc class="absolute annotation"
      v-for="annotation in annotations"
      :key="annotation.id"
      :annotation="annotation"
      :uid="uid"
      :layers-uid="layersUid"
      :layer-id="layerId"
      :time-total="timeTotal"
      :time-current="timeCurrent"
      :container-width="containerWidth"
      :container-height="containerHeight"
      :style="{ zIndex: annotation.id === activeId ? 1 : 0}">
    </annotations-bloc>
  </div>
</template>

<script>
import annotationsBloc from './annotations-bloc.vue'
export default {
  components: {
    annotationsBloc
  },

  props: {
    uid: String,
    layersUid: String,
    layerId: String,
    annotations: Array,
    timeTotal: Number,
    timeCurrent: Number
  },

  data() {
    return {
      containerWidth: 0,
      containerHeight: 0
    }
  },

  computed: {
    activeId() {
      return this.$store.state.cml.annotations.actives[this.uid]
    }
  },

  methods: {
    resize() {}
  },

  mounted() {
    window.addEventListener('resize', this.resize)
    this.containerWidth = this.$refs.container.offsetWidth
    this.containerHeight = this.$refs.container.offsetHeight
  }
}
</script>
