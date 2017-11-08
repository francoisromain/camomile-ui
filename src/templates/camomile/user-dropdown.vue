<template>
  <div class="dropdown">
    <div>
      <button @click="settingsShow" class="btn px-m py-s full-x">Settings…</button>
    </div>
    <div>
      <button @click="logout" class="btn px-m py-s full-x mr home">Logout</button>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
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

