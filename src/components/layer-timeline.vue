<template>
  <div ref="container">
    <svg :view-box.camel="viewbox">
      <layer-timeline-axis :o="options" :svg="svg"></layer-timeline-axis>
    </svg>
  </div>
</template>

<script>
import layerTimelineAxis from './layer-timeline-axis.vue'
export default {
  components: {
    layerTimelineAxis
  },

  props: {
    uid: {
      type: String,
      default: 'default'
    }
  },

  data () {
    return {
      options: {
        xMin: -53,
        xMax: 198,
        yMin: -32,
        yMax: 128
      },
      svg: {
        w: 0,
        h: 0
      }
    }
  },

  computed: {
    viewbox () {
      return `0 0 ${this.svg.w} ${this.svg.h}`;
    }
  },

  mounted () {
    window.addEventListener("resize", this.resize);
    this.resize();
  },

  methods: {
    resize () {
      this.svg.w = this.$refs.container.offsetWidth;
      this.svg.h = this.$refs.container.offsetHeight;
    }
  }
}
</script>
