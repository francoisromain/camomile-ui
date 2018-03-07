<template>
  <div>
    <h2>Annotation 
      <span class="h6 bold bg-neutral color-bg py-xxs px-xs rnd right mt-xxs">…{{ annotation ? annotation.id : '' | stringEnd }}</span>
    </h2>
    <div>
      <button
        v-if="layer.permission === 3"
        class="btn p-s h6"
        @click="popupEditOpen">Edit</button>
      <button
        v-if="layer.permission === 3"
        class="btn p-s h6"
        @click="popupRemoveOpen">Remove</button>
    </div>
  </div>
</template>
<script>
import popupEdit from '../ui/popup/edit.vue'
import popupRemove from '../ui/popup/remove.vue'

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
