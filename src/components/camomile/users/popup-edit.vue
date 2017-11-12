<template>
  <div>
    <div class="blobs">
      <div class="blob-1-4">
        <h3 class="pt-s mb-0">Name</h3>
      </div>
      <div class="blob-3-4">
        <input type="text" v-model="user.name" class="input-alt" placeholder="Name" :disabled="user.id">
      </div>
    </div>
    <div class="blobs" v-if="adminIs">
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
      user: Object.assign({}, this.$store.state.camomile.users.list.find(user => user.id === this.$store.state.camomile.popup.config.userId))
    }
  },
  computed: {
    ...mapState({
      userCurrent: state => state.camomile.user,
      roles: state => state.camomile.config.roles,
      adminIs: state => state.camomile.adminIs
    }),
    rolesPermission () {
      return this.adminIs && this.userCurrent.id !== this.user.id
    }
  },
  methods: {
    save () {
      if (this.user.id) {
        this.$store.dispatch('camomile/users/update', this.user)
      } else {
        this.$store.dispatch('camomile/users/add', this.user)
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
