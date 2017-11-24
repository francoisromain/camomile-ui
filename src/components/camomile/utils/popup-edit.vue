<template>
  <div>
    <div class="blobs">
      <div class="blob-1-4">
        <h4 class="pt-s mb-0">Name</h4>
      </div>
      <div class="blob-3-4">
        <input type="text" v-model="element.name" class="input-alt" placeholder="Name" :disabled="element.id && (type === 'users' || type === 'groups')" ref="nameee">
      </div>
    </div>
    <div class="blobs" v-if="type === 'users'">
      <div class="blob-1-4">
        <h4 class="pt-s mb-0">Role</h4>
      </div>
      <div class="blob-3-4">
        <select type="text" v-model="element.role" class="select-alt" :disabled="!rolesPermission">
          <option v-for="role in roles" :value="role" :key="role">
            {{ role }}
          </option>
        </select>
      </div>
    </div>
    <div class="blobs" v-if="type === 'users'">
      <div class="blob-1-4">
        <h4 class="pt-s mb-0">Password</h4>
      </div>
      <div class="blob-3-4">
        <input type="password" v-model="element.password" class="input-alt" placeholder="••••••••">
      </div>
    </div>
    <div class="blobs" v-if="type === 'medias'">
      <div class="blob-1-4">
        <h4 class="pt-s mb-0">Url</h4>
      </div>
      <div class="blob-3-4">
        <input type="text" v-model="element.url" class="input-alt" placeholder="http://…">
      </div>
    </div>
    <object-field :name="'fragment'" v-if="type === 'layers' || type === 'annotations'"/>
    <object-field :name="'metadata'" v-if="type === 'layers' || type === 'annotations'"/>
    <object-field :name="'description'" v-if="type !== 'annotations'"/>
    <div class="blobs">
      <div class="blob-1-4">
      </div>
      <div class="blob-3-4">
        <button @click="save" @keyup.enter="save" class="btn-alt p-s full-x" :disabled="!element.name">Save</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import objectField from './popup-edit-object.vue'

export default {
  name: 'camomile-popup-edit',
  components: {
    objectField
  },
  data () {
    return {
      element: { ...this.$store.state.cml.popup.config.element }
    }
  },
  computed: {
    ...mapState({
      id: state => state.cml.popup.config.id,
      type: state => state.cml.popup.config.type,
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
  mounted () {
    this.$refs.nameee.focus()
  },
  beforeDestroy () {
    document.removeEventListener('keyup', this.keyup)
  }
}
</script>
