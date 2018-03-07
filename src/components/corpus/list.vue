<template>
  <div>
    <div class="flex flex-start">
      <h2 class="mt-xs">Corpora</h2>
      <button
        v-if="isAdmin"
        class="flex-right btn px-s py-xs"
        @click="popupOpen({ config: popupAddConfig, element: { id: null, description: {} } })"><i class="icon-24 icon-24-plus" /></button>
    </div>
    <div v-if="corpus && corpus.length > 0">
      <table class="table mb-0">
        <tr>
          <th /><th>Name</th><th />
        </tr>
        <tr
          v-for="corpu in corpus"
          :key="corpu.id">
          <td>
            <input
              :value="corpu.id"
              :checked="corpu.id === corpuId"
              type="radio"
              @change="set">
          </td>
          <td>{{ corpu.name }}</td>
          <td class="text-right">
            <button
              v-if="corpu.permission === 3"
              class="btn p-s my--s h6"
              @click="popupOpen({ config: popupPermissionsConfig, element: corpu })">Permissions</button>
            <button
              v-if="corpu.permission === 3"
              class="btn p-s my--s h6"
              @click="popupOpen({ config: popupEditConfig, element: corpu })">Edit</button>
            <button
              v-if="isAdmin && corpu.permission === 3"
              class="btn p-s my--s h6"
              @click="popupOpen({ config: popupRemoveConfig, element: corpu })">Remove</button>
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
  name: 'CamomileCorpus',

  props: {
    uid: {
      type: String,
      default: 'default'
    }
  },

  data () {
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
    corpus () {
      return this.$store.state.cml.corpus.lists[this.uid]
    },
    corpuId () {
      return this.$store.state.cml.corpus.actives[this.uid]
    },
    isAdmin () {
      return this.$store.state.cml.user.isAdmin
    }
  },

  created () {
    this.$store.dispatch('cml/corpus/register', this.uid)
  },

  methods: {
    popupOpen ({ config, element }) {
      this.$store.commit('cml/popup/open', { config, element })
    },
    set (e) {
      this.$store.dispatch('cml/corpus/set', {
        id: e.target.value,
        uid: this.uid
      })
    }
  }
}
</script>
