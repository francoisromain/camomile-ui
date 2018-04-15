<template>
  <div>
    <div
      v-if="type !== 'annotations'"
      class="tablet-blobs">
      <div class="tablet-blob-1-4">
        <h4 class="pt-s">Name</h4>
      </div>
      <div class="tablet-blob-3-4">
        <input
          v-model="element.name"
          :disabled="element.id"
          type="text"
          placeholder="Name"
          class="mb">
      </div>
    </div>
    <div 
      v-if="type === 'annotations'"
      class="tablet-blobs">
      <div class="tablet-blob-1-4">
        <h4 class="pt-s">Id</h4>
      </div>
      <div class="tablet-blob-3-4">
        <input
          v-model="element.id"
          :disabled="element.id"
          type="text"
          placeholder="Name"
          class="mb">
      </div>
    </div>
    <div class="tablet-blobs">
      <div class="tablet-blob-1-4" />
      <div class="tablet-blob-3-4">
        <button
          class="btn-alt p-s full-x mb"
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
      element: state => state.popup.element,
      type: state => state.popup.config.type
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
      this.$store.dispatch(`${this.type}/remove`, { id: this.element.id })
      this.$store.commit(`popup/close`)
    },
    keyup (e) {
      if ((e.which || e.keyCode) === 13) {
        this.remove()
      }
    }
  }
};
</script>
