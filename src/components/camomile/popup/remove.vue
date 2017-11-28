<template>
  <div>
    <div class="blobs" v-if="type !== 'annotations'">
      <div class="blob-1-4">
        <h4 class="pt-s mb-0">Name</h4>
      </div>
      <div class="blob-3-4">
        <input type="text" v-model="element.name" class="input-alt" placeholder="Name" :disabled="element.id">
      </div>
    </div>
    <div class="blobs" v-if="type === 'annotations'">
      <div class="blob-1-4">
        <h4 class="pt-s mb-0">Id</h4>
      </div>
      <div class="blob-3-4">
        <input type="text" v-model="element.id" class="input-alt" placeholder="Name" :disabled="element.id">
      </div>
    </div>
    <div class="blobs">
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
  name: 'camomile-popup-remove',
  computed: {
    ...mapState({
      element: state => state.cml.popup.element,
      id: state => state.cml.popup.config.id,
      type: state => state.cml.popup.config.type
    })
  },
  methods: {
    remove () {
      this.$store.dispatch(`cml/${this.type}/remove`, this.element)
      this.$store.commit(`cml/popup/close`)
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
