<template>
  <div>
    <div
      v-if="type !== 'annotations'"
      class="blobs">
      <div class="blob-1-4">
        <h4 class="pt-s mb-0">Name</h4>
      </div>
      <div class="blob-3-4">
        <input
          ref="name"
          v-model="element.name"
          :disabled="element.id && (type === 'users' || type === 'groups')"
          type="text"
          placeholder="Name">
      </div>
    </div>
    <div
      v-if="type === 'users'"
      class="blobs">
      <div class="blob-1-4">
        <h4 class="pt-s mb-0">Role</h4>
      </div>
      <div class="blob-3-4">
        <select
          v-model="element.role"
          :disabled="!rolesPermission"
          type="text">
          <option
            v-for="role in roles"
            :value="role"
            :key="role">
            {{ role }}
          </option>
        </select>
      </div>
    </div>
    <div
      v-if="type === 'users'"
      class="blobs">
      <div class="blob-1-4">
        <h4 class="pt-s mb-0">Password</h4>
      </div>
      <div class="blob-3-4">
        <input
          v-model="element.password"
          type="password"
          placeholder="••••••••">
      </div>
    </div>
    <div
      v-if="type === 'medias'"
      class="blobs">
      <div class="blob-1-4">
        <h4 class="pt-s mb-0">Url</h4>
      </div>
      <div class="blob-3-4">
        <input
          v-model="element.url"
          type="text"
          placeholder="http://…">
      </div>
    </div>
    <object-field
      v-if="type === 'annotations'"
      :name="'fragment'"
      :title="'Fragment'" />
    <object-field
      v-if="type === 'annotations'"
      :name="'metadata'"
      :title="'Meta-data'" />
    <object-field
      v-if="type === 'layers'"
      :name="'fragmentType'"
      :title="'Fragment type'" />
    <object-field
      v-if="type === 'layers'"
      :name="'metadataType'"
      :title="'Meta-data type'" />
    <object-field
      v-if="type !== 'annotations'"
      :name="'description'"
      :title="'Description'" />
    <div class="blobs">
      <div class="blob-1-4" />
      <div class="blob-3-4">
        <button
          :disabled="!element.name && type !== 'annotations'"
          class="btn-alt p-s full-x"
          @click="save"
          @keyup.enter="save">Save</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import objectField from './edit-json.vue'

export default {
  name: 'CamomilePopupEdit',

  components: {
    objectField
  },

  data () {
    return {
      roles: ['admin', 'user']
    }
  },

  computed: {
    ...mapState({
      element: state => state.popup.element,
      type: state => state.popup.config.type,
      rolesPermission: state =>
        state.user.id !== state.popup.element.id
    })
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
  },

  methods: {
    save () {
      if (this.element.id) {
        this.$store.dispatch(`${this.type}/update`, {
          element: this.element
        })
      } else {
        this.$store.dispatch(`${this.type}/add`, { element: this.element })
      }
      this.$store.commit('popup/close')
    },
    keyup (e) {
      if ((e.which || e.keyCode) === 13) {
        this.save()
      }
    }
  }
}
</script>
