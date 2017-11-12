<template>
  <div @click.self="close" class="absolute full bg-alpha">
    <div class="container relative">
      <component :is="config.component"></component>
    </div>
  </div>
</template>

<script>

export default {
  name: 'camomile-dropdown-user',
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

