<template>
  <div>
    <div class="blobs" v-if="type !== 'annotations'">
      <div class="blob-1-4">
        <h4 class="pt-s mb-0">Name</h4>
      </div>
      <div class="blob-3-4">
        <input type="text" v-model="element.name" class="input-alt" placeholder="Name" :disabled="element.id && (type === 'users' || type === 'groups')" ref="name">
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
    <object-field :name="'fragment'" :title="'Fragment'" v-if="type === 'annotations'"></object-field>
    <object-field :name="'metadata'" :title="'Meta-data'" v-if="type === 'annotations'"></object-field>
    <object-field :name="'fragmentType'" :title="'Fragment type'" v-if="type === 'layers'"></object-field>
    <object-field :name="'metadataType'" :title="'Meta-data type'" v-if="type === 'layers'"></object-field>
    <object-field :name="'description'" :title="'Description'" v-if="type !== 'annotations'"></object-field>
    <div class="blobs">
      <div class="blob-1-4">
      </div>
      <div class="blob-3-4">
        <button @click="save" @keyup.enter="save" class="btn-alt p-s full-x" :disabled="!element.name && type !== 'annotations'">Save</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import objectField from './edit-json.vue'

export default {
  name: 'camomile-popup-edit',

  components: {
    objectField
  },

  data () {
    return {
      element: this.$store.state.cml.popup.element
    }
  },

  computed: {
    ...mapState({
      type: state => state.cml.popup.config.type,
      rolesPermission: state => state.cml.user.id !== state.cml.popup.element.id,
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
    if (this.type !== 'annotations') {
      this.$refs.name.focus()
    }
  },

  beforeDestroy () {
    document.removeEventListener('keyup', this.keyup)
  }
}
</script>
