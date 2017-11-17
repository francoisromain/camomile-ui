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
    <div class="blobs" v-if="typeUsers">
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
      element: { ...this.$store.state.cml.popup.config.element }
    }
  },
  computed: {
    ...mapState({
      id: state => state.cml.popup.config.id,
      type: state => state.cml.popup.config.type,
      typeUsers: state => state.cml.popup.config.type === 'users',
      rolesPermission: state => state.cml.user.id !== state.cml.popup.config.id,
      roles: state => state.cml.config.roles
    })
  },
  methods: {
    save () {
      if (this.element.id) {
        this.$store.dispatch(`cml/${this.type}/update`, this.element)
      } else {
        this.$store.dispatch(`cml/${this.type}/add`, this.element)
      }
      this.$store.commit('cml/popup/close')
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
