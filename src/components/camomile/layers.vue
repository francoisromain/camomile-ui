<template>
  <div v-if="isLogged">
    <div class="flex flex-start">
      <h2 class="mt-s">Layers</h2>
      <button @click="popupOpen({ ...popupEditConfig, title: 'Add layer', element: { id: null, corpuId, description: {}, metadata: {}, fragment: {} } })" class="flex-right btn p-s" v-if="permission === 3"><i class="icon-24 icon-24-plus"></i></button>
    </div>
    <div>
      <table class="table mb-0">
        <tr>
          <th>Name</th><th></th>
        </tr>
        <tr v-for="layer in layers" :key="layer.id">
          <td>{{ layer.name }}</td>
          <td class="text-right">
            <button @click="popupOpen({ ...popupPermissionsConfig, id: layer.id })" class="btn px-s py-s my--s h5" v-if="layer.permission === 3">Permissions</button>
            <button @click="popupOpen({ ...popupEditConfig, element: layer })" class="btn px-s py-s my--s h5" v-if="permission === 3">Edit</button>
            <button @click="popupOpen({ ...popupRemoveConfig, element: layer })" class="btn px-s py-s my--s h5" v-if="permission === 3">Remove</button>
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
import popupPermissions from './utils/popup-permissions.vue'

export default {
  name: 'camomile-layers',
  data () {
    return {
      popupEditConfig: {
        type: 'layers',
        closeBtn: true,
        title: 'Edit layer',
        component: popupEdit
      },
      popupRemoveConfig: {
        type: 'layers',
        closeBtn: true,
        title: 'Remove layer',
        component: popupRemove
      },
      popupPermissionsConfig: {
        type: 'layers',
        closeBtn: true,
        title: 'Layer permissions',
        component: popupPermissions
      }
    }
  },
  computed: {
    ...mapState({
      layers: state => state.cml.layers.list,
      isLogged: state => state.cml.isLogged,
      isAdmin: state => state.cml.isAdmin,
      corpuId: state => state.cml.corpus.id
    }),
    permission () {
      const corpu = this.$store.state.cml.corpus.list.find(corpu => corpu.id === this.corpuId)
      return corpu ? corpu.permission : 0
    }
  },
  methods: {
    popupOpen (config) {
      return this.$store.commit('cml/popup/open', config)
    }
  }
}
</script>
