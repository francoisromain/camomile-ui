<template>
  <div class="p bg-bg mb">
    <h2 class="mt-xs">Layers</h2>
    <div v-if="layers && layers.length > 0">
      <table class="table mb-0">
        <tr>
          <th /><th>Name</th><th />
        </tr>
        <tr
          v-for="layer in layers"
          :key="layer.id">
          <td>
            <input
              :value="layer.id"
              :checked="activeIds.indexOf(layer.id) !== -1"
              type="checkbox"
              @change="set">
          </td>
          <td>
            {{ layer.name }}
          </td>
        </tr>
      </table>
    </div>
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

  methods: {
    set (e) {
      if (e.target.checked) {
        this.$store.dispatch('layers/set', {
          id: e.target.value,
          uid: this.uid
        })
      } else {
        this.$store.dispatch('layers/unset', {
          id: e.target.value,
          uid: this.uid
        })
      }
    }
  }
};
</script>
