<template>
  <div class="dropdown">
    <div>
      <button @click="popupOpen(popupConfig)" class="btn px-m py-s full-x">Settings…</button>
    </div>
    <div>
      <button @click="logout" class="btn px-m py-s full-x mr home">Logout</button>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapActions } from 'vuex'

export default {
  name: 'camomile-dropdown',
  computed: {
    popupConfig () {
      return {
        user: this.$store.state.camomile.user,
        title: 'User settings',
        closeBtn: true,
        content: 'popupUserEdit'
      }
    }
  },
  methods: {
    ...mapMutations({
      close: 'camomile/dropdown/close',
    }),
    ...mapActions({
      logout: 'camomile/user/logout'
    }),
    popupOpen () {
      this.$store.commit('camomile/popup/open', this.popupConfig)
      this.close()
    }
  }
}
</script>

