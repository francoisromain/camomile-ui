<template>
  <div v-if="loggedIs">
    <div class="flex flex-start">
      <h2 class="mt-s">Corpus</h2>
      <button @click="popupOpen({ corpu: {}, closeBtn: true, title: 'Add corpus', component: popupcorpuEdit })" class="flex-right btn p-s"><i class="icon-24 icon-24-plus"></i></button>
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

export default {
  name: 'camomile-corpus',
  data () {
    return {
    }
  },
  computed: {
    ...mapState({
      corpus: state => state.camomile.corpus.list,
      loggedIs: state => state.camomile.loggedIs,
      adminIs: state => state.camomile.adminIs
    })
  },
  methods: {
    ...mapMutations({
      popupOpen: 'camomile/popup/open'
    })
  }
}
</script>
