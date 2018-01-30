<template>
  <tr>
    <td><input type="radio" @change="set($event)" :value="annotation.id" :checked="activeId && activeId === annotation.id"></td>
    <td><span class="h6 bold bg-neutral color-bg py-xxs px-xs rnd">…{{ annotation.id | stringEnd }}</span></td>
    <td>{{ mediaName }}</td>
    <td class="text-right">
      <button @click="popupOpen({ config: popupEditConfig, element: annotation })" class="btn px-s py-s my--s h6" v-if="layerPermission === 3">Edit</button>
      <button @click="popupOpen({ config: popupRemoveConfig, element: annotation })" class="btn px-s py-s my--s h6" v-if="layerPermission === 3">Remove</button>
    </td>
  </tr>
</template>

<script>
import popupEdit from './popup/edit.vue'
import popupRemove from './popup/remove.vue'

export default {
  name: 'camomile-annotations',

  props: {
    uid: {
      type: String,
      default: 'default'
    },
    annotation: Object,
    layerPermission: Number,
    mediaName: String,
    mediaId: String,
    activeId: String
  },

  data() {
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
      }
    }
  },

  methods: {
    popupOpen({ config, element }) {
      return this.$store.commit('cml/popup/open', { config, element })
    },
    set(e) {
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
  },

  filters: {
    stringEnd(value) {
      if (!value) return ''
      return value.substr(value.length - 6)
    }
  }
}
</script>
