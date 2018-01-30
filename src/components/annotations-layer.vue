<template>
  <div>
    <div class="flex flex-start">
      <h2 class="mt-s">{{ layer.name }}</h2>
      <button @click="popupOpen({ config: popupAddConfig, element: { id: null, layerId: layer.id, mediaId, fragment: layer.fragmentType, metadata: {} } })" class="flex-right btn p-s" v-if="layer.permission === 3"><i class="icon-24 icon-24-plus"></i></button>
    </div>
    <table class="table mb-0">
      <tr>
        <th></th><th>Id</th><th>Medium</th><th></th>
      </tr>
      <annotations-layer-detail v-for="annotation in annotations"
        :key="annotation.id"
        :annotation="annotation"
        :uid="uid"
        :layer-permission="layer.permission"
        :media-name="mediaName"
        :media-id="mediaId"
        :active-id="activeId">
      </annotations-layer-detail>
    </table>
  </div>
</template>

<script>
import popupEdit from './popup/edit.vue'
import annotationsLayerDetail from './annotations-layer-detail.vue'

export default {
  name: 'camomile-annotations',

  components: {
    annotationsLayerDetail
  },

  props: {
    uid: {
      type: String,
      default: 'default'
    },
    layer: Object,
    annotations: Array,
    activeId: String,
    mediaId: String,
    mediaName: String
  },

  data() {
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
    popupOpen({ config, element }) {
      return this.$store.commit('cml/popup/open', { config, element })
    },
    set(e, layerId) {
      if (e.target.checked) {
        this.$store.commit('cml/annotations/set', {
          id: e.target.value,
          uid: this.uid
        })
      } else {
        this.$store.commit('cml/annotations/unset', {
          id: e.target.value,
          uid: this.uid
        })
      }
    }
  }
}
</script>
