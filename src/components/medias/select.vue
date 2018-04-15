<template>
  <div class="p bg-bg mb">
    <h2 class="mt-xs">Media</h2>
    <select
      v-if="medias && medias.length > 0"
      @change="set">
      <option
        v-for="media in medias"
        :key="media.id"
        :value="media.id"
        :selected="media.id === mediaId">
        {{ media.name }}
      </option>
    </select>
  </div>
</template>

<script>

export default {
  name: 'CamomileMediasSelect',

  props: {
    uid: {
      type: String,
      default: 'default'
    }
  },

  computed: {
    corpuUid () {
      return this.$store.state.medias.actives[this.uid].corpuUid
    },
    mediaId () {
      return this.$store.state.medias.actives[this.uid].id
    },
    medias () {
      return this.$store.state.medias.lists[this.corpuUid]
    }
  },

  methods: {
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
