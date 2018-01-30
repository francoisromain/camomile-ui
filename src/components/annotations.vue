<template>
  <div>
    <div class="flex flex-start">
      <h2 class="mt-s mb-s">Annotations</h2>
    </div>
    <div v-for="layer in layers" :key="layer.id" class="mt" v-if="annotations[layer.id]">
      <div class="flex flex-start">
        <h2 class="mt-s">{{ layer.name }}</h2>
        <button @click="popupOpen({ config: popupAddConfig, element: { id: null, layerId: layer.id, mediaId, fragment: {}, metadata: {}, mediaName: mediaName(mediaId) } })" class="flex-right btn p-s" v-if="layer.permission === 3"><i class="icon-24 icon-24-plus"></i></button>
      </div>
      <table class="table mb-0">
        <tr>
          <th></th><th>Id</th><th>Medium</th><th></th>
        </tr>
        <tr v-for="annotation in annotations[layer.id]" :key="annotation.id">
          <td><input type="radio" @change="set($event, layer.id)" :value="annotation.id" :checked="activeId && activeId === annotation.id" :layer-id="layer.id"></td>
          <td><span class="h6 bold bg-neutral color-bg py-xxs px-xs rnd">…{{ annotation.id | stringEnd }}</span></td>
          <td>{{ mediaName(annotation.mediaId) }}</td>
          <td class="text-right">
            <button @click="popupOpen({ config: popupEditConfig, element: annotation })" class="btn px-s py-s my--s h6" v-if="layer.permission === 3">Edit</button>
            <button @click="popupOpen({ config: popupRemoveConfig, element: annotation })" class="btn px-s py-s my--s h6" v-if="layer.permission === 3">Remove</button>
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
  name: 'camomile-annotations',

  props: {
    mediaUid: {
      type: String,
      default: 'default'
    },
    layersUid: {
      type: String,
      default: 'default'
    },
    uid: {
      type: String,
      default: 'default'
    }
  },

  data() {
    return {
      popupEditConfig: {
        type: 'annotations',
        closeBtn: true,
        title: 'Edit annotation',
        component: popupEdit
      },
      popupAddConfig: {
        type: 'annotations',
        closeBtn: true,
        title: 'Add annotation',
        component: popupEdit
      },
      popupRemoveConfig: {
        type: 'annotations',
        closeBtn: true,
        title: 'Remove annotation',
        component: popupRemove
      }
    }
  },

  computed: {
    annotations() {
      return (
        (this.$store.state.cml.annotations.lists[this.uid] &&
          this.$store.state.cml.annotations.lists[this.uid].layers) ||
        {}
      )
    },
    mediaId() {
      return this.$store.state.cml.medias.actives[this.mediaUid].id
    },
    layers() {
      const actives = this.$store.state.cml.layers.actives[this.layersUid]
      const layers = this.$store.state.cml.layers.lists[actives.corpuUid]
      return actives && layers
        ? layers.filter(l => actives.ids.indexOf(l.id) !== -1)
        : {}
    },
    activeId() {
      const actives = this.$store.state.cml.annotations.actives[this.uid]
      return actives ? actives.id : null
    },
    medias() {
      const active = this.$store.state.cml.medias.actives[this.mediaUid]
      return active ? this.$store.state.cml.medias.lists[active.corpuUid] : {}
    },
    properties() {
      return this.$store.state.cml.medias.properties[this.mediaUid] || {}
    },
    timeCurrent() {
      return this.properties.timeCurrent || 0
    }
  },

  methods: {
    popupOpen({ config, element }) {
      return this.$store.commit('cml/popup/open', { config, element })
    },
    set(e, layerId) {
      if (e.target.checked) {
        this.$store.commit('cml/annotations/set', {
          id: e.target.value,
          uid: this.uid
        })
      } else {
        this.$store.commit('cml/annotations/unset', {
          id: e.target.value,
          uid: this.uid
        })
      }
    },
    mediaName(mediaId) {
      if (!mediaId) return ''
      const media = this.medias.find(m => m.id === mediaId)
      return media ? media.name : ''
    },
    annotationsUpdate(layer) {
      const mediaId = this.$store.state.cml.medias.actives[this.mediaUid].id
      const layerId = layer.id
      this.$store.dispatch(
        'cml/annotations/list',
        { uid: this.uid, layerId, layersUid: this.layersUid, mediaId },
        { root: true }
      )
    }
  },

  created() {
    this.$store.dispatch('cml/annotations/register', {
      uid: this.uid,
      mediaUid: this.mediaUid,
      layersUid: this.layersUid
    })
  },

  filters: {
    stringEnd(value) {
      if (!value) return ''
      return value.substr(value.length - 6)
    }
  }
}
</script>
