<template>
  <div v-if="user.loggedin">
    <button @click="dropdownToggle" class="btn-menubar px-m py-s full-x" :class="{ active: user.dropdown }">{{ user.name }}</button>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState({
      user: state => state.camomile.user
    })
  },
  methods: {
    dropdownToggle () {
      this.$store.commit('camomile/user/dropdownToggle')
    }
  }
}
</script>



