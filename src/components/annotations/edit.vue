<template>
  <div>
    <button
      v-if="layer.permission === 3"
      class="btn px-s py-s my--s h6"
      @click="popupEditOpen">Edit</button>
    <button
      v-if="layer.permission === 3"
      class="btn px-s py-s my--s h6"
      @click="popupRemoveOpen">Remove</button>
  </div>
</template>
<script>
import popupEdit from '../popup/edit.vue'
import popupRemove from '../popup/remove.vue'

export default {
  props: {
    mediaUid: {
      type: String,
      default: 'default'
    },
    layersUid: {
      type: String,
      default: 'default'
    },
    uid: {
      type: String,
      default: 'default'
    }
  },

  data () {
    return {
      popupEditConfig: {
        type: 'annotations',
        closeBtn: true,
        title: 'Edit annotation',
        component: popupEdit
      },
      popupRemoveConfig: {
        type: 'annotations',
        closeBtn: true,
        title: 'Remove annotation',
        component: popupRemove
      },
      layerPermission: 3
    }
  },

  computed: {
    annotation () {
      return this.$store.getters['cml/annotations/active'](this.uid)
    },
    layer () {
      return this.annotation ? this.$store.getters['cml/layers/details'](this.layersUid, this.annotation.layerId) : {}
    }
  },

  methods: {
    popupEditOpen () {
      return this.$store.commit('cml/popup/open', { config: this.popupEditConfig, element: this.annotation })
    },
    popupRemoveOpen () {
      return this.$store.commit('cml/popup/open', { config: this.popupRemoveConfig, element: this.annotation })
    }
  }
}
</script>
