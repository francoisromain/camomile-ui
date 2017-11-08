<template>
  <pophover title="User settings" commit="camomile/user/settingsHide">
    <div class="blobs">
      <div class="blob-1-4">
        <h3 class="pt-s mb-0">Id</h3>
      </div>
      <div class="blob-3-4">
        <input type="text" v-model="user.id" class="input-alt" placeholder="Id" disabled>
      </div>
      <div class="blob-1-4">
        <h3 class="pt-s mb-0">Name</h3>
      </div>
      <div class="blob-3-4">
        <input type="text" v-model="user.name" class="input-alt" placeholder="Name" disabled>
      </div>
      <div class="blob-1-4">
        <h3 class="pt-s mb-0">Role</h3>
      </div>
      <div class="blob-3-4">
        <select type="text" v-model="user.role" class="select-alt" disabled>
          <option v-for="role in roles" :value="role" :key="role">
            {{ role }}
          </option>
        </select>
      </div>
      <div class="blob-1-4">
        <h3 class="pt-s mb-0">Password</h3>
      </div>
      <div class="blob-3-4">
        <input type="password" v-model="user.password" class="input-alt" placeholder="Password">
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
        <button @click="update" @keyup.enter="update" class="btn-alt p-s full-x">Save</button>
      </div>
    </div>
  </pophover>
</template>

<script>
import { mapState } from 'vuex'
import pophover from './_pophover.vue'

export default {
  components: {
    pophover
  },
  computed: {
    ...mapState({
      user: state => state.camomile.user,
      roles: state => state.camomile.admin.roles
    })
  },
  methods: {
    update () {
      this.$store.dispatch('camomile/user/update', this.user)
    },
    keypress (e) {
      if ((e.which || e.keyCode) === 13) {
        this.update()
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
