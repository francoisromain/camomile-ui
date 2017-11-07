<template>
  <div class="dropdown" v-if="user.dropdown">
    <div>
      <button @click="settingsShow" class="btn px-m py-s full-x">Settings</button>
    </div>
    <div>
      <button @click="logout" class="btn px-m py-s full-x mr home">Logout</button>
    </div>
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
    logout () {
      this.$store.dispatch('camomile/user/logout')
    },
    settingsShow () {
      this.$store.commit('camomile/user/settingsShow')
    }
  }
}
</script>

<style scoped>
@import '../../css/settings.css';
.dropdown {
  margin-bottom: var(--unit);
}
@media (--viewport-tablet) {
  .dropdown {
    position: absolute;
    right: var(--gutter);
    top: 0;
  }
}
</style>

