<template>
  <div>
    <div @click.self="hide" class="absolute full bg-alpha">
      <div class="container relative">
        <div class="dropdown">
          <div>
            <button @click="settingsShow({ user: user, closeBtn: true, title: 'User settings' })" class="btn px-m py-s full-x">Settings…</button>
          </div>
          <div>
            <button @click="logout" class="btn px-m py-s full-x mr home">Logout</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapActions } from 'vuex'

export default {
  computed: {
    user () {
      return this.$store.state.camomile.user
    }
  },
  methods: {
    ...mapMutations({
      hide: 'camomile/utils/userDropdownHide',
      settingsShow: 'camomile/utils/userPopupShow'
    }),
    ...mapActions({
      logout: 'camomile/user/logout'
    })
  }
}
</script>

