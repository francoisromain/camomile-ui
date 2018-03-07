<template>
  <div>
    <h2>Layers</h2>
    <button
      v-if="corpuPermission === 3"
      class="btn px-s py-xs"
      @click="popupOpen({ config: popupAddConfig, element: { id: null, corpuId, description: {}, metadataType: {}, fragmentType: {} } })"><i class="icon-24 icon-24-plus" /></button>
  </div>
</template>

<script>
import popupEdit from '../ui/popup/edit.vue'

export default {
  name: 'CamomileLayers',

  props: {
    uid: {
      type: String,
      default: 'default'
    }
  },

  data () {
    return {
      popupAddConfig: {
        type: 'layers',
        closeBtn: true,
        title: 'Edit layer',
        component: popupEdit
      }
    }
  },

  computed: {
    corpuUid () {
      return this.$store.state.cml.layers.actives[this.uid].corpuUid
    },
    corpuPermission () {
      return this.$store.getters['cml/corpus/permission'](this.corpuUid)
    },
    corpuId () {
      return this.$store.state.cml.corpus.actives[this.corpuUid]
    }
  },

  methods: {
    popupOpen ({ config, element }) {
      return this.$store.commit('cml/popup/open', { config, element })
    }
  }
}
</script>
