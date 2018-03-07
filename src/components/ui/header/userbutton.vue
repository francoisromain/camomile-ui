<template>
  <button
    :class="{ active: visible }"
    class="btn-menubar px-m py-s full-x"
    @click="dropdownToggle">{{ user.name }}</button>
</template>

<script>
import { mapState } from 'vuex'
import userbuttonDropdown from './userbutton-dropdown.vue'

export default {
  name: 'CamomileHeaderUserbutton',
  computed: {
    ...mapState({
      user: state => state.cml.user,
      visible: state => state.cml.dropdown.visible
    })
  },
  methods: {
    dropdownToggle () {
      if (this.visible) {
        this.$store.commit('cml/dropdown/close')
      } else {
        this.$store.commit('cml/dropdown/open', {
          component: userbuttonDropdown
        })
      }
    }
  }
}
</script>
