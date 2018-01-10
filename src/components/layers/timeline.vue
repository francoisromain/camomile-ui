<template>
  <div ref="container">
    <timeline-button 
      v-for="layer in layers" 
      :key="`button-${layer.id}`"
      v-if="annotations[layer.id] && layer.permission === 3"
    ></timeline-button>
    <timeline-annotations 
      v-for="layer in layers" 
      :key="`annotations-${layer.id}`"
      v-if="annotations[layer.id]"
      :uid="uid"
      :layer="layer"
      :annotations="annotations[layer.id]"
      :media-id="mediaId"
      :time-total="timeTotal"
      :time-current="timeCurrent"
      >
    </timeline-annotations>
  </div>
</template>

<script>
import timelineButton from './timeline/button.vue'
import timelineAnnotations from './timeline/annotations.vue'

export default {
  components: {
    timelineButton,
    timelineAnnotations
  },

  props: {
    uid: {
      type: String,
      default: 'default'
    }
  },

  data () {
    return {
      svg: {
        w: 0,
        h: 0
      }
    }
  },

  computed: {
    viewbox () {
      return `0 0 ${this.svg.w} ${this.svg.h}`;
    },
    properties () {
      return this.$store.state.cml.medias.properties[this.uid] || {}
    },
    timeCurrent () {
      return this.properties.timeCurrent || 0
    },
    timeTotal () {
      return this.properties.timeTotal || 0
    },
    annotations () {
      return this.$store.state.cml.annotations.lists[this.uid]
    },
    mediaId () {
      return this.$store.state.cml.medias.actives[this.uid]
    },
    layers () {
      return this.$store.state.cml.layers.lists[this.uid]
    },
    actives () {
      return this.$store.state.cml.annotations.actives[this.uid]
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
