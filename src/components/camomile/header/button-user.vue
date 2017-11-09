<template>
  <button @click="dropdownToggle" class="btn-menubar px-m py-s full-x" :class="{ active: user.dropdown }">{{ user.name }}</button>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'camomile-button',
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
          content: 'dropdownUser'
        })
      }
    }
  }
}
</script>



