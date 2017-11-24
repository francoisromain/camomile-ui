<template>
  <div v-if="isLogged">
    <div class="flex flex-start">
      <h2 class="mt-s">Annotations</h2>
      <button @click="popupOpen({ ...popupEditConfig, title: 'Add annotation', element: { id: null, layerId, mediaId, fragment: {}, data: {} } })" class="flex-right btn p-s" v-if="permission === 3"><i class="icon-24 icon-24-plus"></i></button>
    </div>
    <div>
      <table class="table mb-0">
        <tr>
          <th></th><th>Name</th><th></th>
        </tr>
        <tr v-for="annotation in annotations" :key="annotation.id">
          <td><input type="radio" @change="set" :value="annotation.id" :checked="annotation.id === annotationId"></td>
          <td>{{ annotation.name }}</td>
          <td class="text-right">
            <button @click="popupOpen({ ...popupEditConfig, element: annotation })" class="btn px-s py-s my--s h5" v-if="permission === 3">Edit</button>
            <button @click="popupOpen({ ...popupRemoveConfig, element: annotation })" class="btn px-s py-s my--s h5" v-if="permission === 3">Remove</button>
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import popupEdit from './utils/popup-edit.vue'
import popupRemove from './utils/popup-remove.vue'

export default {
  name: 'camomile-annotations',
  data () {
    return {
      popupEditConfig: {
        type: 'annotations',
        closeBtn: true,
        title: 'Edit medium',
        component: popupEdit
      },
      popupRemoveConfig: {
        type: 'annotations',
        closeBtn: true,
        title: 'Remove medium',
        component: popupRemove
      }
    }
  },
  computed: {
    ...mapState({
      annotations: state => state.cml.annotations.list,
      isLogged: state => state.cml.isLogged,
      isAdmin: state => state.cml.isAdmin,
      mediaId: state => state.cml.medias.id,
      layerId: state => state.cml.layers.id,
      annotationId: state => state.cml.annotations.id
    }),
    permission () {
      const layer = this.$store.state.cml.layers.list.find(layer => layer.id === this.layerId)
      return layer ? layer.permission : 0
    }
  },
  methods: {
    popupOpen (config) {
      return this.$store.commit('cml/popup/open', config)
    },
    set (e) {
      this.$store.dispatch('cml/annotations/set', e.target.value)
    }
  }
}
</script>
