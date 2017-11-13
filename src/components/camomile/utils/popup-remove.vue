<template>
  <div>
    <div class="blobs">
      <div class="blob-1-4">
        <h3 class="pt-s mb-0">Name</h3>
      </div>
      <div class="blob-3-4">
        <input type="text" v-model="element.name" class="input-alt" placeholder="Name" :disabled="element.id">
      </div>
      <div class="blob-1-4">
      </div>
      <div class="blob-3-4">
        <button @click="remove" @keyup.enter="remove" class="btn-alt p-s full-x">Remove</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'camomile-popup-element-remove',
  computed: {
    ...mapState({
      element: state => state.camomile[state.camomile.popup.config.type].list.find(element => element.id === state.camomile.popup.config.id),
      id: state => state.camomile.popup.config.id,
      type: state => state.camomile.popup.config.type
    })
  },
  methods: {
    remove () {
      this.$store.dispatch(`camomile/${this.type}/remove`, this.element)
      this.$store.commit(`camomile/popup/close`)
    },
    keyup (e) {
      if ((e.which || e.keyCode) === 13) {
        this.remove()
      }
    }
  },
  created () {
    document.addEventListener('keyup', this.keyup)
  },
  beforeDestroy () {
    document.removeEventListener('keyup', this.keyup)
  }
}
</script>
