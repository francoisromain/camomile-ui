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
        <h3 class="pt-s mb-0">Description</h3>
      </div>
      <div class="blob-3-4">
        <textarea v-model="group.description" class="textarea-alt" placeholder="Description"></textarea>
      </div>
      <div class="blob-1-4">
      </div>
      <div class="blob-3-4">
        <button @click="save" @keyup.enter="save" class="btn-alt p-s full-x">Save</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'camomile-popup-user-edit',
  data () {
    return {
      group: Object.assign({}, this.$store.state.camomile.groups.list.find(group => group.id === this.$store.state.camomile.popup.config.groupId))
    }
  },
  methods: {
    save () {
      if (this.group.id) {
        this.$store.dispatch('camomile/groups/update', this.group)
      } else {
        this.$store.dispatch('camomile/groups/add', this.group)
      }
      this.$store.commit('camomile/popup/close')
    },
    keyup (e) {
      if ((e.which || e.keyCode) === 13) {
        this.save()
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
