<template>
  <div ref="container">
    <annotations-bloc
      v-for="annotation in annotations"
      :key="annotation.id"
      :annotation="annotation"
      :uid="uid"
      :layers-uid="layersUid"
      :time-total="timeTotal"
      :time-current="timeCurrent"
      :container-width="containerWidth"
      :container-height="containerHeight"
      :style="{ zIndex: annotation.id === activeId ? 1 : 0}"
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
    annotations: {
      type: Array,
      default: () => []
    },
    timeTotal: {
      type: Number,
      default: 0
    },
    timeCurrent: {
      type: Number,
      default: 0
    }
  },

  data () {
    return {
      containerWidth: 0,
      containerHeight: 0
    }
  },

  computed: {
    activeId () {
      return this.$store.state.cml.annotations.actives[this.uid]
    }
  },

  mounted () {
    window.addEventListener('resize', this.resize)
    this.containerWidth = this.$refs.container.offsetWidth
    this.containerHeight = this.$refs.container.offsetHeight
  },

  methods: {
    resize () { }
  }
}
</script>
