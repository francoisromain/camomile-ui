<template>
  <div>
    <div class="flex flex-start">
      <h2 class="mt-s">Layers</h2>
      <button @click="popupOpen({ config: popupAddConfig, element: { id: null, corpuId, description: {}, metadataType: {}, fragmentType: {} } })" class="flex-right btn p-s" v-if="permission === 3"><i class="icon-24 icon-24-plus"></i></button>
    </div>
    <div>
      <table class="table mb-0">
        <tr>
          <th></th><th>Name</th><th></th>
        </tr>
        <tr v-for="layer in layers" :key="layer.id">
          <td><input type="radio" @change="set" :value="layer.id" :checked="layer.id === layerId"></td>
          <td>{{ layer.name }}</td>
          <td class="text-right">
            <button @click="popupOpen({ config: popupPermissionsConfig, element: layer })" class="btn px-s py-s my--s h6" v-if="layer.permission === 3">Permissions</button>
            <button @click="popupOpen({ config: popupEditConfig, element: layer })" class="btn px-s py-s my--s h6" v-if="layer.permission === 3">Edit</button>
            <button @click="popupOpen({ config: popupRemoveConfig, element: layer })" class="btn px-s py-s my--s h6" v-if="layer.permission === 3">Remove</button>
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
import popupPermissions from './popup/permissions.vue'

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
      popupAddConfig: {
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
      corpuId: state => state.cml.corpus.id,
      corpus: state => state.cml.corpus.list,
      layerId: state => state.cml.layers.id
    }),
    permission () {
      const corpu = this.corpus.find(c => c.id === this.corpuId)
      return corpu ? corpu.permission : 0
    }
  },

  methods: {
    popupOpen (config) {
      return this.$store.commit('cml/popup/open', config)
    },
    set (e) {
      this.$store.dispatch('cml/layers/set', e.target.value)
    }
  }
}
</script>
