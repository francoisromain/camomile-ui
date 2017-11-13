<template>
  <div>
    <div class="blobs">
      <div class="blob-1-4">
        <h3 class="pt-s mb-0">Name</h3>
      </div>
      <div class="blob-3-4">
        <input type="text" v-model="element.name" class="input-alt" placeholder="Name" :disabled="element.id">
      </div>
    </div>
    <div class="blobs" v-if="isAdmin && typeUsers">
      <div class="blob-1-4">
        <h3 class="pt-s mb-0">Role</h3>
      </div>
      <div class="blob-3-4">
        <select type="text" v-model="element.role" class="select-alt" :disabled="!rolesPermission">
          <option v-for="role in roles" :value="role" :key="role">
            {{ role }}
          </option>
        </select>
      </div>
    </div>
    <div class="blobs" v-if="typeUsers">
      <div class="blob-1-4">
        <h3 class="pt-s mb-0">Password</h3>
      </div>
      <div class="blob-3-4">
        <input type="password" v-model="element.password" class="input-alt" placeholder="••••••••">
      </div>
    </div>
    <div class="blobs">
      <div class="blob-1-4">
        <h3 class="pt-s mb-0">Description</h3>
      </div>
      <div class="blob-3-4">
        <textarea v-model="element.description" class="textarea-alt" placeholder="Description"></textarea>
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
  name: 'camomile-popup-edit',
  data () {
    return {
      element: this.$store.state.camomile.popup.config.id === this.$store.state.camomile.user.id
        ? { ...this.$store.state.camomile.user }
        : { ...this.$store.state.camomile[this.$store.state.camomile.popup.config.type].list.find(element => element.id === this.$store.state.camomile.popup.config.id) }
    }
  },
  computed: {
    ...mapState({
      isAdmin: state => state.camomile.isAdmin,
      id: state => state.camomile.popup.config.id,
      type: state => state.camomile.popup.config.type,
      typeUsers: state => state.camomile.popup.config.type === 'users',
      rolesPermission: state => state.camomile.isAdmin && state.camomile.user.id !== state.camomile.popup.config.id,
      roles: state => state.camomile.config.roles
    })
  },
  methods: {
    save () {
      if (this.element.id) {
        this.$store.dispatch(`camomile/${this.type}/update`, this.element)
      } else {
        this.$store.dispatch(`camomile/${this.type}/add`, this.element)
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
