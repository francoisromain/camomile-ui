<template>
  <div class="dropdown">
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
      this.$emit('logout')
      this.$store.dispatch('camomile/user/logout')
    },
    settingsShow () {
      this.$emit('settings-show')
    }
  }
}
</script>

<style scoped>
@import '../../css/settings.css';

.dropdown {
  position: absolute;
  right: var(--gutter);
  top: var(--unit-xl);
}
</style>

