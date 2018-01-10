<template>
  <div class="relative annotations" ref="container">co: {{ containerWidth}}
    <annotations-blocs class="absolute annotation"
      v-for="annotation in annotations"
      :key="annotation.id"
      :uid="uid"
      :id="annotation.id"
      :layer-id="layer.id"
      :time-total="timeTotal"
      :container-width="containerWidth"
      :container-left="containerLeft"
      @click="zindexSet($event)"
      ref="annotations">
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
    timeCurrent: Number
  },

  data () {
    return {
      containerWidth: 0,
      containerLeft: 0
    }
  },

  methods: {
    zindexSet (e) {
      console.log('e target', e)
      this.$refs.annotations.forEach(a => {
        a.style.zIndex = 0
      })
      e.target.style.zIndex = 10;
    }
  },

  mounted () {
    this.containerWidth = this.$refs.container.offsetWidth
    this.containerLeft = this.$refs.container.offsetLeft
    console.log('ref', this.$refs.annotations)
  }
}
</script>

<style scoped>
.annotations {
  height: 40px;
}
</style>
