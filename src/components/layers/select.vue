<template>
  <div class="p bg-bg mb">
    <h2 class="mt-xs">Layers</h2>
    <select
      v-if="layers && layers.length > 0"
      @change="setTarget">
      <option
        v-for="layer in layers"
        :key="layer.id"
        :value="layer.id"
        :selected="activeIds.indexOf(layer.id) !== -1">
        {{ layer.name }}
      </option>
    </select>
  </div>
</template>

<script>

export default {
  name: 'CamomileLayersSelect',

  props: {
    uid: {
      type: String,
      default: 'default'
    }
  },

  computed: {
    corpuUid () {
      return this.$store.state.layers.actives[this.uid].corpuUid
    },
    layers () {
      return this.$store.state.layers.lists[this.corpuUid]
    },
    activeIds () {
      return this.$store.getters['layers/activeIds'](this.uid)
    }
  },

  watch: {
    layers (val, oldVal) {
      if (!oldVal) {
        this.set(val[0])
      }
    }
  },

  methods: {
    set (layer) {
      this.layers.forEach(l => this.$store.dispatch('layers/unset', {
        id: l.id,
        uid: this.uid
      }))

      this.$store.dispatch('layers/set', {
        id: layer.id,
        uid: this.uid
      })
    },

    setTarget (e) {
      this.set({ id: e.target.value })
    }
  }
}
</script>
