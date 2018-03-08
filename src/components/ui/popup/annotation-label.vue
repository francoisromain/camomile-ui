<template>
  <div>
    <div class="blobs">
      <div class="blob-1-4">
        <h4 class="pt-s mb-0">Label</h4>
      </div>
      <div class="blob-3-4">
        <input
          ref="label"
          v-model="element.metadata.label"
          type="text"
          placeholder="Label">
      </div>
    </div>
    <div class="blobs">
      <div class="blob-1-4" />
      <div class="blob-3-4">
        <button
          :disabled="!element.name && type !== 'annotations'"
          class="btn-alt p-s full-x"
          @click="save"
          @keyup.enter="save">Save</button>
        <div
          v-if="error"
          class="p-s bg-error color-bg italic mt">{{ error }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'CamomileAnnotationsPopupEdit',

  data () {
    return {
      error: null
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
    this.$refs.label.focus()
  },

  beforeDestroy () {
    document.removeEventListener('keyup', this.keyup)
  },

  methods: {
    save () {
      if (this.element.metadata.label !== '') {
        this.$store.dispatch('annotations/add', { element: this.element })
        this.$store.commit('popup/close')
      } else {
        this.error = 'Fill in the label.'
      }
    },
    keyup (e) {
      if ((e.which || e.keyCode) === 13) {
        this.save()
      }
    }
  }
};
</script>
