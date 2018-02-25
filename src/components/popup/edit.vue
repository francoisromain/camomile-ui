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
          class="input-alt"
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
          type="text"
          class="select-alt">
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
          type="password"
          v-model="element.password"
          class="input-alt"
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
          type="text"
          v-model="element.url"
          class="input-alt"
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
      :name="'description'"
      :title="'Description'"
      v-if="type !== 'annotations'" />
    <div class="blobs">
      <div class="blob-1-4" />
      <div class="blob-3-4">
        <button
          @click="save"
          @keyup.enter="save"
          class="btn-alt p-s full-x"
          :disabled="!element.name && type !== 'annotations'">Save</button>
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

  computed: {
    ...mapState({
      element: state => state.cml.popup.element,
      type: state => state.cml.popup.config.type,
      rolesPermission: state =>
        state.cml.user.id !== state.cml.popup.element.id,
      roles: state => state.cml.config.roles
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
        this.$store.dispatch(`cml/${this.type}/update`, {
          element: this.element
        })
      } else {
        this.$store.dispatch(`cml/${this.type}/add`, { element: this.element })
      }
      this.$store.commit('cml/popup/close')
    },
    keyup (e) {
      if ((e.which || e.keyCode) === 13) {
        this.save()
      }
    }
  }
}
</script>
