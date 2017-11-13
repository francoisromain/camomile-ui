<template>
  <div v-if="isLogged">
    <div class="flex flex-start">
      <h2 class="mt-s">Corpus</h2>
      <button @click="popupOpen({ ...popupEditConfig, id: null, title: 'Add corpus' })" class="flex-right btn p-s"><i class="icon-24 icon-24-plus"></i></button>
    </div>
    <div>
      <table class="table mb-0">
        <tr>
          <th>Name</th><th></th>
        </tr>
        <tr v-for="corpu in corpus" :key="corpu.id">
          <td>{{ corpu.name }}</td>
          <td class="text-right">
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
import popupEdit from './utils/popup-edit.vue'

export default {
  name: 'camomile-corpus',
  data () {
    return {
      popupEditConfig: {
        type: 'corpus',
        closeBtn: true,
        title: 'Edit corpus',
        component: popupEdit
      }
    }
  },
  computed: {
    ...mapState({
      corpus: state => state.camomile.corpus.list,
      isLogged: state => state.camomile.isLogged,
      isAdmin: state => state.camomile.isAdmin
    })
  },
  methods: {
    ...mapMutations({
      popupOpen: 'camomile/popup/open'
    })
  }
}
</script>
