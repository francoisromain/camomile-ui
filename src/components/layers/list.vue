<template>
  <div>
    <div class="flex flex-start">
      <h2 class="mt-xs">Layers</h2>
      <button
        v-if="corpuPermission === 3"
        class="flex-right btn px-s py-xs"
        @click="popupOpen({ config: popupAddConfig, element: { id: null, corpuId, description: {}, metadataType: {}, fragmentType: {} } })"><i class="icon-24 icon-24-plus" /></button>
    </div>
    <div v-if="layers && layers.length > 0">
      <table class="table mb-0">
        <tr>
          <th /><th>Name</th><th />
        </tr>
        <tr
          v-for="layer in layers"
          :key="layer.id">
          <td>
            <input
              :value="layer.id"
              :checked="activeIds.indexOf(layer.id) !== -1"
              type="checkbox"
              @change="set">
          </td>
          <td>{{ layer.name }}</td>
          <td class="text-right">
            <button
              v-if="layer.permission === 3"
              class="btn p-s my--s h6"
              @click="popupOpen({ config: popupPermissionsConfig, element: layer })">Permissions</button>
            <button
              v-if="layer.permission === 3"
              class="btn p-s my--s h6"
              @click="popupOpen({ config: popupEditConfig, element: layer })">Edit</button>
            <button
              v-if="layer.permission === 3"
              class="btn p-s my--s h6"
              @click="popupOpen({ config: popupRemoveConfig, element: layer })">Remove</button>
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
import popupEdit from '../ui/popup/edit.vue'
import popupRemove from '../ui/popup/remove.vue'
import popupPermissions from '../ui/popup/permissions.vue'

export default {
  name: 'CamomileLayersList',

  props: {
    uid: {
      type: String,
      default: 'default'
    },
    corpusUid: {
      type: String,
      default: 'default'
    }
  },

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
        component: popupPermissions,
        uid: this.corpusUid
      }
    }
  },

  computed: {
    layers () {
      return this.$store.state.cml.layers.lists[this.corpusUid]
    },
    activeIds () {
      return this.$store.getters['cml/layers/activeIds'](this.uid)
    },
    corpus () {
      return this.$store.state.cml.corpus.lists[this.corpusUid]
    },
    corpuId () {
      return this.$store.state.cml.corpus.actives[this.corpusUid]
    },
    corpuPermission () {
      return this.$store.getters['cml/corpus/permission'](this.corpusUid)
    }
  },

  methods: {
    popupOpen ({ config, element }) {
      return this.$store.commit('cml/popup/open', { config, element })
    },
    set (e) {
      if (e.target.checked) {
        this.$store.dispatch('cml/layers/set', {
          id: e.target.value,
          uid: this.uid
        })
      } else {
        this.$store.dispatch('cml/layers/unset', {
          id: e.target.value,
          uid: this.uid
        })
      }
    }
  }
}
</script>
