<template>
  <div @click.self="close" class="absolute full bg-alpha">
    <div class="container relative">
      <component :is="config.content"></component>
    </div>
  </div>
</template>

<script>
import dropdownUser from '../user/dropdown.vue'

export default {
  name: 'camomile-dropdown-user',
  components: {
    dropdownUser
  },
  computed: {
    config () {
      return this.$store.state.camomile.dropdown.config
    }
  },
  methods: {
    close () {
      this.$store.commit('camomile/dropdown/close')
    }
  }
}
</script>

