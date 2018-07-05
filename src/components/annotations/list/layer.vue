<template>
  <div>
    <div class="flex flex-start">
      <h2 class="mt-s">{{ layer.name }}</h2>
      <button
        v-if="layer.permission === 3"
        class="btn-border flex-right px-s py-xs"
        @click="popupOpen({ config: popupAddConfig, element: { id: null, layerId: layer.id, mediaId, fragment: layer.fragmentType, metadata: layer.metadataType } })"><i class="icon-24 icon-24-plus" /></button>
    </div>
    <table class="table mb-0">
      <tr>
        <th /><th>Id</th><th>Medium</th><th />
      </tr>
      <annotations-layer-detail
        v-for="annotation in annotations"
        :key="annotation.id"
        :annotation="annotation"
        :disabled="annotationsFiltered.findIndex(a => a.id === annotation.id) === -1"
        :uid="uid"
        :layer-permission="layer.permission"
        :media-name="mediaName"
        :media-id="mediaId"
        :active-id="activeId" />
    </table>
  </div>
</template>

<script>
import popupEdit from '../../ui/popup/edit.vue'
import annotationsLayerDetail from './layer-annotation.vue'

export default {
  name: 'CamomileLayers',

  components: {
    annotationsLayerDetail
  },

  props: {
    uid: {
      type: String,
      default: 'default'
    },
    layer: {
      type: Object,
      default: () => ({})
    },
    annotations: {
      type: Array,
      default: () => []
    },
    annotationsFiltered: {
      type: Array,
      default: () => []
    },
    activeId: {
      type: String,
      default: 'hash'
    },
    mediaId: {
      type: String,
      default: 'hash'
    },
    mediaName: {
      type: String,
      default: 'hash'
    }
  },

  data () {
    return {
      popupAddConfig: {
        type: 'annotations',
        closeBtn: true,
        title: 'Add annotation',
        component: popupEdit
      }
    }
  },

  methods: {
    popupOpen ({ config, element }) {
      return this.$store.commit('popup/open', { config, element })
    },
    set (e, layerId) {
      if (e.target.checked) {
        this.$store.commit('annotations/set', {
          id: e.target.value,
          uid: this.uid
        })
      } else {
        this.$store.commit('annotations/unset', {
          id: e.target.value,
          uid: this.uid
        })
      }
    }
  }
}
</script>
