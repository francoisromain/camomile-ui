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
      return this.$store.state.cml.dropdown.config
    }
  },
  methods: {
    close () {
      this.$store.commit('cml/dropdown/close')
    }
  }
}
</script>

