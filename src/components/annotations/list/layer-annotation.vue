<template>
  <tr :class="{ 'bg-alt': disabled }">
    <td><input
      :value="annotation.id"
      :checked="activeId && activeId === annotation.id"
      :disabled="disabled"
      type="radio"
      @change="set($event)">
    </td>
    <td><span class="h6 bold bg-neutral color-bg py-xxs px-xs rnd">…{{ annotation.id | stringEnd }}</span></td>
    <td>{{ mediaName }}</td>
    <td class="text-right">
      <button
        v-if="layerPermission === 3"
        class="btn-border p-s my--s h6"
        @click="popupOpen({ config: popupEditConfig, element: annotation })">Edit</button>
      <button
        v-if="layerPermission === 3"
        class="btn-border p-s my--s h6"
        @click="popupOpen({ config: popupRemoveConfig, element: annotation })">Remove</button>
    </td>
  </tr>
</template>

<script>
import popupEdit from '../../ui/popup/edit.vue'
import popupRemove from '../../ui/popup/remove.vue'

export default {
  name: 'CamomileAnnotations',

  props: {
    uid: {
      type: String,
      default: 'default'
    },
    annotation: {
      type: Object,
      default: () => ({})
    },
    disabled: {
      type: Boolean,
      default: true
    },
    layerPermission: {
      type: Number,
      default: 0
    },
    mediaName: {
      type: String,
      default: 'hash'
    },
    mediaId: {
      type: String,
      default: 'hash'
    },
    activeId: {
      type: String,
      default: 'hash'
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
      }
    }
  },

  methods: {
    popupOpen ({ config, element }) {
      return this.$store.commit('popup/open', { config, element })
    },
    set (e) {
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
};
</script>
