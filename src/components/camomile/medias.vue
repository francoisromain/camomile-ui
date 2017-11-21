<template>
  <div v-if="isLogged">
    <div class="flex flex-start">
      <h2 class="mt-s">Media</h2>
      <button @click="popupOpen({ ...popupEditConfig, title: 'Add Medium', element: { id: null, corpuId } })" class="flex-right btn p-s" v-if="permission === 3"><i class="icon-24 icon-24-plus"></i></button>
    </div>
    <div>
      <table class="table mb-0">
        <tr>
          <th>Name</th><th></th>
        </tr>
        <tr v-for="media in medias" :key="media.id">
          <td>{{ media.name }}</td>
          <td class="text-right">
            <button @click="popupOpen({ ...popupEditConfig, element: media })" class="btn px-s py-s my--s h5" v-if="permission === 3">Edit</button>
            <button @click="popupOpen({ ...popupRemoveConfig, element: media })" class="btn px-s py-s my--s h5" v-if="permission === 3">Remove</button>
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

export default {
  name: 'camomile-medias',
  data () {
    return {
      popupEditConfig: {
        type: 'medias',
        closeBtn: true,
        title: 'Edit medium',
        component: popupEdit
      },
      popupRemoveConfig: {
        type: 'medias',
        closeBtn: true,
        title: 'Remove medium',
        component: popupRemove
      }
    }
  },
  computed: {
    ...mapState({
      medias: state => state.cml.medias.list,
      isLogged: state => state.cml.isLogged,
      isAdmin: state => state.cml.isAdmin,
      corpuId: state => state.cml.corpus.selected
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
