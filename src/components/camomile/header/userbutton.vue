<template>
  <button @click="dropdownToggle" class="btn-menubar px-m py-s full-x" :class="{ active: user.dropdown }">{{ user.name }}</button>
</template>

<script>
import { mapState } from 'vuex'
import userbuttonDropdown from './userbutton-dropdown.vue'

export default {
  name: 'camomile-userbutton',
  computed: {
    ...mapState({
      user: state => state.camomile.user,
      visible: state => state.camomile.dropdown.visible
    })
  },
  methods: {
    dropdownToggle () {
      if (this.visible) {
        this.$store.commit('camomile/dropdown/close')
      } else {
        this.$store.commit('camomile/dropdown/open', {
          component: userbuttonDropdown
        })
      }
    }
  }
}
</script>



