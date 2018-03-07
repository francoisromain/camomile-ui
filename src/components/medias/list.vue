<template>
  <div>
    <div class="flex flex-start">
      <h2 class="mt-xs">Media</h2>
      <button
        v-if="corpuPermission === 3"
        class="flex-right btn px-s py-xs"
        @click="popupOpen({ config: popupAddConfig, element: { id: null, corpuId, description: {} } })"><i class="icon-24 icon-24-plus" /></button>
    </div>
    <div v-if="medias && medias.length > 0">
      <table class="table mb-0">
        <tr>
          <th /><th>Name</th><th />
        </tr>
        <tr
          v-for="media in medias"
          :key="media.id">
          <td>
            <input
              :value="media.id"
              :checked="media.id === mediaId"
              type="radio"
              @change="setEvent">
          </td>
          <td>{{ media.name }}</td>
          <td class="text-right">
            <button
              v-if="corpuPermission === 3"
              class="btn p-s my--s h6"
              @click="popupOpen({ config: popupEditConfig, element: media })">Edit</button>
            <button
              v-if="corpuPermission === 3"
              class="btn p-s my--s h6"
              @click="popupOpen({ config: popupRemoveConfig, element: media })">Remove</button>
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
import popupEdit from '../ui/popup/edit.vue'
import popupRemove from '../ui/popup/remove.vue'

export default {
  name: 'CamomileMedias',

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
    corpuId () {
      return this.$store.state.cml.corpus.actives[this.corpusUid]
    },
    mediaId () {
      return this.$store.state.cml.medias.actives[this.uid].id
    },
    medias () {
      return this.$store.state.cml.medias.lists[this.corpusUid]
    },
    corpuPermission () {
      return this.$store.getters['cml/corpus/permission'](this.corpusUid)
    }
  },

  created () {
    this.$store.dispatch('cml/medias/register', { uid: this.uid, corpuUid: this.corpusUid })
  },

  methods: {
    popupOpen ({ config, element }) {
      return this.$store.commit('cml/popup/open', { config, element })
    },
    setEvent (e) {
      this.set(e.target.value)
    },
    set (id) {
      this.$store.dispatch('cml/medias/set', {
        id,
        corpuUid: this.corpusUid,
        uid: this.uid
      })
    }
  }
}
</script>
