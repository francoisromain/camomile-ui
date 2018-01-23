<template>
  <div>
    <div class="flex flex-start">
      <h2 class="mt-s mb-s">Media</h2>
      <button @click="popupOpen({ config: popupAddConfig, element: { id: null, corpuId, description: {} } })" class="flex-right btn p-s" v-if="permission === 3"><i class="icon-24 icon-24-plus"></i></button>
    </div>
    <div v-if="medias && medias.length > 0">
      <table class="table mb-0">
        <tr>
          <th></th><th>Name</th><th></th>
        </tr>
        <tr v-for="media in medias" :key="media.id">
          <td><input type="radio" @change="set" :value="media.id" :checked="media.id === mediaId"></td>
          <td>{{ media.name }}</td>
          <td class="text-right">
            <button @click="popupOpen({ config: popupEditConfig, element: media })" class="btn px-s py-s my--s h6" v-if="permission === 3">Edit</button>
            <button @click="popupOpen({ config: popupRemoveConfig, element: media })" class="btn px-s py-s my--s h6" v-if="permission === 3">Remove</button>
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
import popupEdit from './popup/edit.vue'
import popupRemove from './popup/remove.vue'

export default {
  name: 'camomile-medias',

  props: {
    uid: {
      type: String,
      default: 'default'
    }
  },

  data() {
    return {
      popupEditConfig: {
        type: 'medias',
        closeBtn: true,
        title: 'Edit medium',
        component: popupEdit
      },
      popupAddConfig: {
        type: 'medias',
        closeBtn: true,
        title: 'Add medium',
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
    corpuId() {
      return this.$store.state.cml.corpus.actives[this.uid]
    },
    mediaId() {
      return this.$store.state.cml.medias.actives[this.uid]
    },
    medias() {
      return this.$store.state.cml.medias.lists[this.uid]
    },
    permission() {
      const corpus = this.$store.state.cml.corpus.lists
      const corpu =
        corpus[this.uid] && corpus[this.uid].find(c => c.id === this.corpuId)
      return corpu ? corpu.permission : 0
    }
  },

  methods: {
    popupOpen({ config, element }) {
      return this.$store.commit('cml/popup/open', { config, element })
    },
    set(e) {
      this.$store.dispatch('cml/medias/set', {
        id: e.target.value,
        uid: this.uid
      })
    }
  }
}
</script>
