<template>
  <div>
    <h3 class="pt-s cap">{{ name }}</h3>
    <div class="blobs" v-for="(value, key) in fields" :key="key">
      <div class="blob-1-4">
        <h4 class="pt-s mb-0">{{ key }}</h4>
      </div>
      <div class="blob-3-4-btn">
        <input type="text" v-model="fields[key]" class="input-alt" placeholder="key">
      </div>
      <div class="blob-btn">
        <button class="btn-alt p-s btn-icon" @click="remove(key)"><i class="icon-24 icon-24-minus"></i></button>
      </div>
    </div>
    <div class="blobs">
      <div class="blob-1-4">
        <input type="text" v-model="newKey" class="input-alt" placeholder="key">
      </div>
      <div class="blob-3-4-btn">
        <input type="text" v-model="newValue" class="input-alt" placeholder="value">
      </div>
      <div class="blob-btn">
        <button class="btn-alt p-s btn-icon" @click="add" :disabled="!newKey || !newValue"><i class="icon-24 icon-24-plus"></i></button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'camomile-popup-edit',
  props: {
    name: String
  },
  data () {
    return {
      newKey: '',
      newValue: ''
    }
  },
  computed: {
    fields () {
      return this.$store.state.cml.popup.config.element[this.name]
    }
  },
  methods: {
    add () {
      this.$store.commit('cml/popup/objectFieldAdd', { name: this.name, field: { key: this.newKey, value: this.newValue } })
      this.newKey = ''
      this.newValue = ''
    },
    remove (key) {
      this.$store.commit('cml/popup/objectFieldRemove', { name: this.name, key })
    }
  }
}
</script>
