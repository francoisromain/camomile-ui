<template>
  <div class="p bg-bg mb">
    <div class="flex flex-start">
      <h2 class="mt-xs">Media</h2>
      <button
        v-if="corpuPermission === 3"
        class="btn-border flex-right px-s py-xs"
        @click="popupOpen({ config: popupAddConfig, element: mediaNew })"><i class="icon-24 icon-24-plus" /></button>
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
              @change="set">
          </td>
          <td>{{ media.name }}</td>
          <td class="text-right">
            <button
              v-if="corpuPermission === 3"
              class="btn-border p-s my--s h6"
              @click="popupOpen({ config: popupEditConfig, element: media })">Edit</button>
            <button
              v-if="corpuPermission === 3"
              class="btn-border p-s my--s h6"
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
  name: 'CamomileMediasList',

  props: {
    uid: {
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
    corpuUid () {
      return this.$store.state.medias.actives[this.uid].corpuUid
    },
    corpuId () {
      return this.$store.state.corpus.actives[this.corpuUid]
    },
    mediaId () {
      return this.$store.state.medias.actives[this.uid].id
    },
    medias () {
      return this.$store.state.medias.lists[this.corpuUid]
    },
    mediaActive () {
      return this.$store.state.medias.actives[this.uid]
    },
    corpuPermission () {
      return this.$store.getters['corpus/permission'](this.corpuUid)
    },
    mediaNew () {
      return { id: null, corpuId: this.corpuId, description: this.mediaActive.description }
    }
  },

  methods: {
    popupOpen ({ config, element }) {
      return this.$store.commit('popup/open', { config, element })
    },
    set (e) {
      this.$store.dispatch('medias/set', {
        id: e.target.value,
        corpuUid: this.corpuUid,
        uid: this.uid
      })
    }
  }
};
</script>
