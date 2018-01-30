<template>
  <div>
    <h3 class="pt-s">{{ title }}</h3>
    <div class="blobs">
      <div class="blob-1">
        <textarea v-model="fields" class="textarea-alt" @keyup="resize" ref="field"></textarea>
      </div>
    </div>
  </div>
</template>

<script>
import JSONfn from 'json-fn'

export default {
  name: 'camomile-popup-edit-json',
  props: {
    name: String,
    title: String
  },

  computed: {
    fields: {
      get() {
        return JSONfn.stringify(this.$store.state.cml.popup.element[this.name])
      },
      set(value) {
        if (this.jsonCheck(value)) {
          this.$store.commit('cml/popup/fieldUpdate', {
            name: this.name,
            value: JSONfn.parse(value)
          })
        }
      }
    }
  },

  methods: {
    jsonCheck(str) {
      try {
        JSONfn.parse(str)
      } catch (e) {
        return false
      }
      return true
    },
    resize(e) {
      const el = e.target
      el.style.height = `${el.scrollHeight}px`
    }
  },

  mounted() {
    const el = this.$refs.field
    el.style.height = `${el.scrollHeight}px`
  }
}
</script>
