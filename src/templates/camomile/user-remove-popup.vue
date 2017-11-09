<template>
  <popup title="Remove user" :close-btn="true" commit="camomile/utils/userEditPopupHide">
    <div class="blobs" v-if="user.id">
      <div class="blob-1-4">
        <h3 class="pt-s mb-0">Id</h3>
      </div>
      <div class="blob-3-4">
        <input type="text" v-model="user.id" class="input-alt" placeholder="Id" disabled>
      </div>
    </div>
    <div class="blobs">
      <div class="blob-1-4">
        <h3 class="pt-s mb-0">Name</h3>
      </div>
      <div class="blob-3-4">
        <input type="text" v-model="user.name" class="input-alt" placeholder="Name" :disabled="user.id">
      </div>
      <div class="blob-1-4">
      </div>
      <div class="blob-3-4 mb-0">
        <button @click="remove" @keyup.enter="remove" class="btn-alt p-s full-x">Remove</button>
      </div>
    </div>
  </popup>
</template>

<script>
import { mapState } from 'vuex'
import popup from './_popup.vue'

export default {
  components: {
    popup
  },
  computed: {
    ...mapState({
      userCurrent: state => state.camomile.user,
      config: state => state.camomile.utils.userRemovePopup.config,
      user: state => state.camomile.utils.userRemovePopup.config.user
    })
  },
  methods: {
    remove () {
      this.$store.dispatch('camomile/users/remove', this.user)
      this.$store.commit('camomile/utils/userRemovePopupHide')
    },
    keypress (e) {
      if ((e.which || e.keyCode) === 13) {
        this.remove()
      }
    }
  },
  created () {
    document.addEventListener('keypress', this.keypress)
  },
  beforeDestroy () {
    document.removeEventListener('keypress', this.keypress)
  }
}
</script>
