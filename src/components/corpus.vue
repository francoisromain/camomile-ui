<template>
  <div>
    <div class="flex flex-start">
      <h2 class="mt-s mb-s">Corpora</h2>
      <button @click="popupOpen({ config: popupAddConfig, element: { id: null, description: {} } })" class="flex-right btn p-s" v-if="isAdmin"><i class="icon-24 icon-24-plus"></i></button>
    </div>
    <div v-if="corpus && corpus.length > 0">
      <table class="table mb-0">
        <tr>
          <th></th><th>Name</th><th></th>
        </tr>
        <tr v-for="corpu in corpus" :key="corpu.id">
          <td><input type="radio" @change="set" :value="corpu.id" :checked="corpu.id === corpuId"></td>
          <td>{{ corpu.name }}</td>
          <td class="text-right">
            <button @click="popupOpen({ config: popupPermissionsConfig, element: corpu })" class="btn px-s py-s my--s h6" v-if="corpu.permission === 3">Permissions</button>
            <button @click="popupOpen({ config: popupEditConfig, element: corpu })" class="btn px-s py-s my--s h6" v-if="corpu.permission === 3">Edit</button>
            <button @click="popupOpen({ config: popupRemoveConfig, element: corpu })" class="btn px-s py-s my--s h6" v-if="isAdmin && corpu.permission === 3">Remove</button>
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
  name: 'camomile-corpus',

  props: {
    uid: {
      type: String,
      default: 'default'
    }
  },

  data() {
    return {
      popupEditConfig: {
        type: 'corpus',
        closeBtn: true,
        title: 'Edit corpus',
        component: popupEdit
      },
      popupAddConfig: {
        type: 'corpus',
        closeBtn: true,
        title: 'Add corpus',
        component: popupEdit
      },
      popupRemoveConfig: {
        type: 'corpus',
        closeBtn: true,
        title: 'Remove corpus',
        component: popupRemove
      },
      popupPermissionsConfig: {
        type: 'corpus',
        closeBtn: true,
        title: 'Corpus permissions',
        component: popupPermissions,
        uid: this.uid
      }
    }
  },

  computed: {
    corpus() {
      return this.$store.state.cml.corpus.lists[this.uid]
    },
    corpuId() {
      return this.$store.state.cml.corpus.actives[this.uid]
    },
    isAdmin() {
      return this.$store.state.cml.user.isAdmin
    }
  },

  methods: {
    popupOpen({ config, element }) {
      this.$store.commit('cml/popup/open', { config, element })
    },
    set(e) {
      this.$store.dispatch('cml/corpus/set', {
        id: e.target.value,
        uid: this.uid
      })
    }
  },

  created() {
    this.$store.dispatch('cml/corpus/register', this.uid)
  }
}
</script>
