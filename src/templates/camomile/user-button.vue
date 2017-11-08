<template>
  <div v-if="logged">
    <button @click="dropdownToggle" class="btn-menubar px-m py-s full-x" :class="{ active: user.dropdown }">{{ user.name }}</button>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState({
      logged: state => state.camomile.logged,
      user: state => state.camomile.user
    })
  },
  methods: {
    dropdownToggle () {
      this.$store.commit('camomile/utils/userDropdownToggle')
    }
  }
}
</script>



