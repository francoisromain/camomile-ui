<template>
  <popup :title="config.title" :close-btn="true" commit="camomile/utils/userPopupHide">
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
    </div>
    <div class="blobs" v-if="rolesVisible">
      <div class="blob-1-4">
        <h3 class="pt-s mb-0">Role</h3>
      </div>
      <div class="blob-3-4">
        <select type="text" v-model="user.role" class="select-alt" :disabled="!rolesPermission">
          <option v-for="role in roles" :value="role" :key="role">
            {{ role }}
          </option>
        </select>
      </div>
    </div>
    <div class="blobs">
      <div class="blob-1-4">
        <h3 class="pt-s mb-0">Password</h3>
      </div>
      <div class="blob-3-4">
        <input type="password" v-model="user.password" class="input-alt" placeholder="••••••••">
      </div>
      <div class="blob-1-4">
        <h3 class="pt-s mb-0">Description</h3>
      </div>
      <div class="blob-3-4">
        <textarea v-model="user.description" class="textarea-alt" placeholder="Description"></textarea>
      </div>
      <div class="blob-1-4">
      </div>
      <div class="blob-3-4 mb-0">
        <button @click="save" @keyup.enter="update" class="btn-alt p-s full-x">Save</button>
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
      roles: state => state.camomile.config.roles,
      config: state => state.camomile.utils.userPopup.config,
      user: state => Object.assign({}, state.camomile.utils.userPopup.config.user)
    }),
    rolesPermission () {
      return this.userCurrent.role === 'admin' && this.userCurrent.id !== this.user.id
    },
    rolesVisible () {
      return this.userCurrent.role === 'admin'
    }
  },
  methods: {
    save () {
      if (this.user.id) {
        this.$store.dispatch('camomile/users/update', this.user)
      } else {
        this.$store.dispatch('camomile/users/create', this.user)
      }
      this.$store.commit('camomile/utils/userPopupHide')
    },
    keypress (e) {
      if ((e.which || e.keyCode) === 13) {
        this.save()
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
