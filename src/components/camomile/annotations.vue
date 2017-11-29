<template>
  <div>
    <div class="flex flex-start">
      <h2 class="mt-s">Annotations</h2>
      <button @click="popupOpen({ config: popupAddConfig, element: { id: null, layerId, mediaId, fragment: {}, metadata: {} } })" class="flex-right btn p-s" v-if="permission === 3"><i class="icon-24 icon-24-plus"></i></button>
    </div>
    <div>
      <table class="table mb-0">
        <tr>
          <th></th><th>Id</th><th>Medium</th><th></th>
        </tr>
        <tr v-for="annotation in annotations" :key="annotation.id">
          <td><input type="radio" @change="set" :value="annotation.id" :checked="annotation.id === annotationId"></td>
          <td><span class="h6 bold bg-neutral color-bg py-xxs px-xs rnd">…{{ annotation.id | stringEnd }}</span></td>
          <td>{{ mediaName(annotation.mediaId) }}</td>
          <td class="text-right">
            <button @click="popupOpen({ config: popupEditConfig, element: annotation })" class="btn px-s py-s my--s h6" v-if="permission === 3">Edit</button>
            <button @click="popupOpen({ config: popupRemoveConfig, element: annotation })" class="btn px-s py-s my--s h6" v-if="permission === 3">Remove</button>
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import popupEdit from './popup/edit.vue'
import popupRemove from './popup/remove.vue'

export default {
  name: 'camomile-annotations',

  data () {
    return {
      popupEditConfig: {
        type: 'annotations',
        closeBtn: true,
        title: 'Edit annotation',
        component: popupEdit
      },
      popupAddConfig: {
        type: 'annotations',
        closeBtn: true,
        title: 'Add annotation',
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

  computed: {
    ...mapState({
      annotations: state => state.cml.annotations.list,
      mediaId: state => state.cml.medias.id,
      layerId: state => state.cml.layers.id,
      annotationId: state => state.cml.annotations.id,
      medias: state => state.cml.medias.list
    }),
    permission () {
      const layer = this.$store.state.cml.layers.list.find(layer => layer.id === this.layerId)
      return layer ? layer.permission : 0
    }
  },

  methods: {
    popupOpen ({ config, element }) {
      return this.$store.commit('cml/popup/open', { config, element })
    },
    set (e) {
      this.$store.dispatch('cml/annotations/set', e.target.value)
    },
    mediaName (mediaId) {
      if (!mediaId) return ''
      const media = this.medias.find(m => m.id === mediaId)
      return media ? media.name : ''
    }
  },

  filters: {
    stringEnd (value) {
      if (!value) return ''
      return value.substr(value.length - 6)
    }
  }
}
</script>
