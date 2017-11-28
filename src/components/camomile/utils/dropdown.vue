<template>
  <transition name="transition-top">
    <div @click.self="close" class="absolute full bg-alpha" v-if="dropdown.visible" >
      <div class="container relative">
        <component :is="dropdown.config.component"></component>
      </div>
    </div>
  </transition>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'camomile-utils-dropdown',
  computed: {
    ...mapState({
      dropdown: state => state.cml.dropdown,
    })
  },
  methods: {
    close () {
      this.$store.commit('cml/dropdown/close')
    }
  }
}
</script>

