<template>
  <button
    class="btn px-s py-xs mr-s h6"
    @click="popupAnnotationLabelOpen">
    <i class="icon-24 icon-24-plus mr-xs" />
    {{ layerName }}
  </button>
</template>

<script>
import popupAnnotationLabel from '../../ui/popup/annotation-label.vue'

export default {
  props: {
    layerId: {
      type: String,
      default: 'layerIdHash'
    },
    layerName: {
      type: String,
      default: ''
    },
    mediaId: {
      type: String,
      default: 'mediaIdHash'
    },
    annotations: {
      type: Array,
      default: () => []
    },
    fragmentType: {
      type: Object,
      default: () => ({})
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
      popupAnnotationLabelConfig: {
        type: 'annotations',
        closeBtn: true,
        title: 'Add annotation',
        component: popupAnnotationLabel
      }
    }
  },

  methods: {
    popupAnnotationLabelOpen () {
      const element = {
        id: null,
        layerId: this.layerId,
        mediaId: this.mediaId,
        fragment: this.fragmentTypeFormat(this.fragmentType),
        metadata: { label: '' }
      }
      return this.$store.commit('cml/popup/open', {
        config: this.popupAnnotationLabelConfig,
        element
      })
    },

    fragmentTypeFormat (fragmentType) {
      if (!fragmentType.time) {
        fragmentType.time = {}
      }
      fragmentType.time.start = this.timeCurrent
      fragmentType.time.end = this.timeCurrent + this.timeTotal / 10
      return fragmentType
    }
  }
}
</script>
