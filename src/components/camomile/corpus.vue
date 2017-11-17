<template>
  <div v-if="isLogged">
    <div class="flex flex-start">
      <h2 class="mt-s">Corpus</h2>
      <button @click="popupOpen({ ...popupEditConfig, id: null, title: 'Add corpus' })" class="flex-right btn p-s" v-if="isAdmin"><i class="icon-24 icon-24-plus"></i></button>
    </div>
    <div>
      <table class="table mb-0">
        <tr>
          <th>Name</th><th></th>
        </tr>
        <tr v-for="corpu in corpus" :key="corpu.id">
          <td>{{ corpu.name }}</td>
          <td class="text-right">
            <button @click="popupOpen({ ...popupPermissionsConfig, corpu })" class="btn px-s py-s my--s h5" v-if="corpu.permission === 3">Permissions</button>
            <button @click="popupOpen({ ...popupEditConfig, element: corpu })" class="btn px-s py-s my--s h5" v-if="corpu.permission === 3">Edit</button>
            <button @click="popupOpen({ ...popupRemoveConfig, element: corpu })" class="btn px-s py-s my--s h5" v-if="corpu.permission === 3">Remove</button>
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
import popupPermissions from './corpus/popup-permissions.vue'

export default {
  name: 'camomile-corpus',
  data () {
    return {
      popupEditConfig: {
        type: 'corpus',
        closeBtn: true,
        title: 'Edit corpus',
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
        component: popupPermissions
      }
    }
  },
  computed: {
    ...mapState({
      corpus: state => state.cml.corpus.list,
      isLogged: state => state.cml.isLogged,
      isAdmin: state => state.cml.isAdmin
    })
  },
  methods: {
    popupOpen (config) {
      return this.$store.commit('cml/popup/open', config)
    }
  }
}
</script>
