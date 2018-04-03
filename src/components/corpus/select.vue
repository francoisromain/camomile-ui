<template>
  <div v-if="corpus && corpus.length > 0">
    <h2 class="mt-xs">Corpora</h2>
    <select @change="set">
      <option
        v-for="corpu in corpus"
        :key="corpu.id"
        :value="corpu.id"
        :selected="corpu.id === corpuId">
        {{ corpu.name }}
      </option>
    </select>
  </div>
</template>

<script>

export default {
  name: 'CamomileCorpusSelect',

  props: {
    uid: {
      type: String,
      default: 'default'
    }
  },

  computed: {
    corpus () {
      return this.$store.state.corpus.lists[this.uid]
    },
    corpuId () {
      return this.$store.state.corpus.actives[this.uid]
    }
  },

  methods: {
    set (e) {
      this.$store.dispatch('corpus/set', {
        id: e.target.value,
        uid: this.uid
      })
    }
  }
};
</script>
