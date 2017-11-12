<template>
  <div class="dropdown">
    <div>
      <button @click="popupOpen({ user: user, title: 'User settings', closeBtn: true, component: popupUserEdit })" class="btn px-m py-s full-x">Settings…</button>
    </div>
    <div>
      <button @click="logout" class="btn px-m py-s full-x mr home">Logout</button>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapActions } from 'vuex'
import popupUserEdit from '../users/popup-edit.vue'

export default {
  name: 'camomile-userbutton-dropdown',
  data () {
    return {
      popupUserEdit: popupUserEdit
    }
  },
  computed: {
    user () {
      return this.$store.state.camomile.user
    }
  },
  methods: {
    close () {
      this.$store.commit('camomile/dropdown/close')
    },
    logout () {
      return this.$store.dispatch('camomile/user/logout')
    },
    popupOpen (config) {
      this.$store.commit('camomile/popup/open', config)
      this.close()
    }
  }
}
</script>

