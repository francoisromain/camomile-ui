<template>
  <transition name="transition-top">
    <div
      v-if="dropdown.visible" 
      class="absolute full bg-alpha"
      @click.self="close">
      <div class="container relative">
        <component :is="dropdown.config.component" />
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'CamomileUtilsDropdown',

  computed: {
    dropdown () {
      return this.$store.state.dropdown
    }
  },

  methods: {
    close () {
      this.$store.commit('dropdown/close')
    }
  }
};
</script>
