<template>
  <div class="p bg-bg mb">
    <h2>Annotation</h2>
    <table class="table mb-0">
      <tr>
        <th>Label</th><th>ID</th><th />
      </tr>
      <tr v-if="annotation">
        <td>{{ annotation.metadata.label }}</td>
        <td>
          <span class="h6 bold bg-neutral color-bg py-xxs px-xs rnd mt-xxs">…{{ annotation.id | stringEnd }}</span>
        </td>
        <td class="text-right">
          <button
            v-if="layer.permission === 3"
            class="btn-border p-s my--s h6"
            @click="popupEditOpen">Edit</button>
          <button
            v-if="layer.permission === 3"
            class="btn-border p-s my--s h6"
            @click="popupRemoveOpen">Remove</button>
        </td>
      </tr>
    </table>
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
}
</script>
