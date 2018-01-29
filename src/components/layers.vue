<template>
  <div>
    <div class="flex flex-start">
      <h2 class="mt-s mb-s">Layers</h2>
      <button @click="popupOpen({ config: popupAddConfig, element: { id: null, corpuId, description: {}, metadataType: {}, fragmentType: {} } })" class="flex-right btn p-s" v-if="permission === 3"><i class="icon-24 icon-24-plus"></i></button>
    </div>
    <div v-if="layers && layers.length > 0">
      <table class="table mb-0">
        <tr>
          <th></th><th>Name</th><th></th>
        </tr>
        <tr v-for="layer in layers" :key="layer.id">
          <td><input type="checkbox" @change="set" :value="layer.id" :checked="actives.indexOf(layer.id) !== -1"></td>
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
import popupEdit from './popup/edit.vue'
import popupRemove from './popup/remove.vue'
import popupPermissions from './popup/permissions.vue'

export default {
  name: 'camomile-layers',

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

  data() {
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
    layers() {
      return this.$store.state.cml.layers.lists[this.corpusUid]
    },
    actives() {
      return (
        (this.$store.state.cml.layers.actives[this.uid] &&
          this.$store.state.cml.layers.actives[this.uid].ids) ||
        []
      )
    },
    corpus() {
      return this.$store.state.cml.corpus.lists[this.corpusUid]
    },
    corpuId() {
      return this.$store.state.cml.corpus.actives[this.corpusUid]
    },
    permission() {
      const corpus = this.$store.state.cml.corpus.lists
      const corpu =
        corpus[this.corpusUid] &&
        corpus[this.corpusUid].find(c => c.id === this.corpuId)
      return corpu ? corpu.permission : 0
    }
  },

  methods: {
    popupOpen({ config, element }) {
      return this.$store.commit('cml/popup/open', { config, element })
    },
    set(e) {
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
  },

  created() {
    this.$store.dispatch('cml/layers/register', {
      uid: this.uid,
      corpuUid: this.corpusUid
    })
  }
}
</script>
