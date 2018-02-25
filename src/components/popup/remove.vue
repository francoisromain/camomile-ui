<template>
  <div>
    <div
      v-if="type !== 'annotations'"
      class="blobs">
      <div class="blob-1-4">
        <h4 class="pt-s mb-0">Name</h4>
      </div>
      <div class="blob-3-4">
        <input
          v-model="element.name"
          :disabled="element.id"
          type="text"
          class="input-alt"
          placeholder="Name">
      </div>
    </div>
    <div 
      v-if="type === 'annotations'"
      class="blobs">
      <div class="blob-1-4">
        <h4 class="pt-s mb-0">Id</h4>
      </div>
      <div class="blob-3-4">
        <input
          v-model="element.id"
          :disabled="element.id"
          type="text"
          class="input-alt"
          placeholder="Name">
      </div>
    </div>
    <div class="blobs">
      <div class="blob-1-4" />
      <div class="blob-3-4">
        <button
          class="btn-alt p-s full-x"
          @click="remove"
          @keyup.enter="remove">Remove</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'CamomilePopupRemove',

  computed: {
    ...mapState({
      element: state => state.cml.popup.element,
      type: state => state.cml.popup.config.type
    })
  },

  created () {
    document.addEventListener('keyup', this.keyup)
  },

  beforeDestroy () {
    document.removeEventListener('keyup', this.keyup)
  },

  methods: {
    remove () {
      this.$store.dispatch(`cml/${this.type}/remove`, { id: this.element.id })
      this.$store.commit(`cml/popup/close`)
    },
    keyup (e) {
      if ((e.which || e.keyCode) === 13) {
        this.remove()
      }
    }
  }
}
</script>
