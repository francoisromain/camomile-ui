<template>
  <div>
    <div class="blobs" v-if="group.id">
      <div class="blob-1-4">
        <h3 class="pt-s mb-0">Id</h3>
      </div>
      <div class="blob-3-4">
        <input type="text" v-model="group.id" class="input-alt" placeholder="Id" disabled>
      </div>
    </div>
    <div class="blobs">
      <div class="blob-1-4">
        <h3 class="pt-s mb-0">Name</h3>
      </div>
      <div class="blob-3-4">
        <input type="text" v-model="group.name" class="input-alt" placeholder="Name" :disabled="group.id">
      </div>
      <div class="blob-1-4">
      </div>
      <div class="blob-3-4 mb-0">
        <button @click="remove" @keyup.enter="remove" class="btn-alt p-s full-x">Remove</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'camomile-popup-group-remove',
  computed: {
    ...mapState({
      group: state => state.camomile.popup.config.group
    })
  },
  methods: {
    remove () {
      this.$store.dispatch('camomile/groups/remove', this.group)
      this.$store.commit('camomile/popup/close')
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
