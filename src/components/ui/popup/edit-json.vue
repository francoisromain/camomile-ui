<template>
  <div>
    <h3 class="pt-s">{{ title }}</h3>
    <div class="blobs">
      <div class="blob-1">
        <textarea
          ref="field"
          v-model="fields"
          @keyup="resize" ></textarea>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CamomilePopupEditJson',

  props: {
    name: {
      type: String,
      default: 'default'
    },
    title: {
      type: String,
      default: 'default'
    }
  },

  computed: {
    fields: {
      get () {
        return JSON.stringify(
          this.$store.state.popup.element[this.name],
          undefined,
          2
        )
      },
      set (value) {
        if (this.jsonCheck(value)) {
          this.$store.commit('popup/fieldUpdate', {
            name: this.name,
            value: JSON.parse(value)
          })
        }
      }
    }
  },

  mounted () {
    const el = this.$refs.field
    el.style.height = `${el.scrollHeight}px`
  },

  methods: {
    jsonCheck (str) {
      try {
        JSON.parse(str)
      } catch (e) {
        return false
      }
      return true
    },
    resize (e) {
      const el = e.target
      el.style.height = `${el.scrollHeight}px`
    }
  }
}
</script>
