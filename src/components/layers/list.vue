<template>
  <div class="p bg-bg mb">
    <div class="flex flex-start">
      <h2 class="mt-xs">Layers</h2>
      <button
        v-if="corpuPermission === 3"
        class="btn-border flex-right px-s py-xs"
        @click="popupOpen({ config: popupAddConfig, element: layerNew })"><i class="icon-24 icon-24-plus" /></button>
    </div>
    <table
      v-if="layers && layers.length > 0"
      class="table mb-0">
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
            class="btn-border p-s my--s h6"
            @click="popupOpen({ config: popupPermissionsConfig, element: layer })">Permissions</button>
          <button
            v-if="layer.permission === 3"
            class="btn-border p-s my--s h6"
            @click="popupOpen({ config: popupEditConfig, element: layer })">Edit</button>
          <button
            v-if="layer.permission === 3"
            class="btn-border p-s my--s h6"
            @click="popupOpen({ config: popupRemoveConfig, element: layer })">Remove</button>
        </td>
      </tr>
    </table>
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
      }
    }
  },

  computed: {
    corpuUid () {
      return this.$store.state.layers.actives[this.uid].corpuUid
    },
    layers () {
      return this.$store.state.layers.lists[this.corpuUid]
    },
    layersActive () {
      return this.$store.state.layers.actives[this.uid]
    },
    activeIds () {
      return this.$store.getters['layers/activeIds'](this.uid)
    },
    corpus () {
      return this.$store.state.corpus.lists[this.corpuUid]
    },
    corpuId () {
      return this.$store.state.corpus.actives[this.corpuUid]
    },
    corpuPermission () {
      return this.$store.getters['corpus/permission'](this.corpuUid)
    },
    layerNew () {
      return { id: null, corpuId: this.corpuId, description: {}, metadataType: this.layersActive.metadataType, fragmentType: this.layersActive.fragmentType }
    },
    popupPermissionsConfig () {
      return {
        type: 'layers',
        closeBtn: true,
        title: 'Layer permissions',
        component: popupPermissions,
        uid: this.corpuUid
      }
    }
  },

  methods: {
    popupOpen ({ config, element }) {
      return this.$store.commit('popup/open', { config, element })
    },
    set (e) {
      if (e.target.checked) {
        this.$store.dispatch('layers/set', {
          id: e.target.value,
          uid: this.uid
        })
      } else {
        this.$store.dispatch('layers/unset', {
          id: e.target.value,
          uid: this.uid
        })
      }
    }
  }
}
</script>
