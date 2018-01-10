<template>
  <div>
    <div class="flex flex-start">
      <h2 class="mt-s mb-s">Annotations</h2>
    </div>
    <div v-for="layer in layers" :key="layer.id" class="mt" v-if="annotations[layer.id]">
      <div class="flex flex-start">
        <h2 class="mt-s">{{ layer.name }}</h2>
        <button @click="popupOpen({ config: popupAddConfig, element: { id: null, layerId: layer.id, mediaId, fragment: {}, metadata: {}, mediaName: mediaName(mediaId), mediaLink: true } })" class="flex-right btn p-s" v-if="layer.permission === 3"><i class="icon-24 icon-24-plus"></i></button>
      </div>
      <table class="table mb-0">
        <tr>
          <th></th><th>Id</th><th>Medium</th><th></th>
        </tr>
        <tr v-for="annotation in annotations[layer.id]" :key="annotation.id">
          <td><input type="checkbox" @change="set($event, layer.id)" :value="annotation.id" :checked="actives[layer.id] && actives[layer.id].indexOf(annotation.id) !== -1" :layer-id="layer.id"></td>
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
    uid: {
      type: String,
      default: 'default'
    }
  },

  data () {
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
    annotations () {
      return this.$store.state.cml.annotations.lists[this.uid]
    },
    mediaId () {
      return this.$store.state.cml.medias.actives[this.uid]
    },
    layers () {
      return this.$store.state.cml.layers.lists[this.uid]
    },
    actives () {
      return this.$store.state.cml.annotations.actives[this.uid]
    },
    medias () {
      return this.$store.state.cml.medias.lists[this.uid]
    }
  },

  methods: {
    popupOpen ({ config, element }) {
      return this.$store.commit('cml/popup/open', { config, element })
    },
    set (e, layerId) {
      if (e.target.checked) {
        this.$store.dispatch('cml/annotations/set', { id: e.target.value, layerId: layerId, uid: this.uid })
      } else {

        this.$store.dispatch('cml/annotations/unset', { id: e.target.value, layerId: layerId, uid: this.uid })
      }
    },
    mediaName (mediaId) {
      if (!mediaId) return ''
      const media = this.medias.find(m => m.id === mediaId)
      return media ? media.name : ''
    }
  },

  filters: {
    stringEnd (value) {
      if (!value) return ''
      return value.substr(value.length - 6)
    }
  }
}
</script>
