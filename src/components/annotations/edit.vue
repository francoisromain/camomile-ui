<template>
  <div>
    <h2>Annotation 
      <span class="h6 bold bg-neutral color-bg py-xxs px-xs rnd right mt-xxs">…{{ annotation ? annotation.id : '' | stringEnd }}</span>
    </h2>
    <div>
      <button
        v-if="layer.permission === 3"
        class="btn-border p-s h6"
        @click="popupEditOpen">Edit</button>
      <button
        v-if="layer.permission === 3"
        class="btn-border p-s h6"
        @click="popupRemoveOpen">Remove</button>
    </div>
  </div>
</template>
<script>
import popupEdit from '../ui/popup/edit.vue'
import popupRemove from '../ui/popup/remove.vue'

export default {
  props: {
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
    mediaUid () {
      return this.$store.state.annotations.lists[this.uid].mediaUid
    },
    layersUid () {
      return this.$store.state.annotations.lists[this.uid].layersUid
    },
    annotation () {
      return this.$store.getters['annotations/active'](this.uid)
    },
    layer () {
      return this.annotation ? this.$store.getters['layers/details'](this.layersUid, this.annotation.layerId) : {}
    }
  },

  methods: {
    popupEditOpen () {
      return this.$store.commit('popup/open', { config: this.popupEditConfig, element: this.annotation })
    },
    popupRemoveOpen () {
      return this.$store.commit('popup/open', { config: this.popupRemoveConfig, element: this.annotation })
    }
  }
};
</script>
