<template>
  <div class="dropdown">
    <div v-if="isAdmin">
      <button @click="popupOpen({ config: popupEditConfig, element: user })" class="btn px-m py-s full-x">Settings…</button>
    </div>
    <div>
      <button @click="logout" class="btn px-m py-s full-x mr home">Logout</button>
    </div>
  </div>
</template>

<script>
import popupEdit from '../popup/edit.vue'

export default {
  name: 'camomile-header-userbutton-dropdown',

  data() {
    return {
      popupEditConfig: {
        type: 'users',
        closeBtn: true,
        title: 'Edit user',
        component: popupEdit
      }
    }
  },

  computed: {
    user() {
      return this.$store.state.cml.user
    },
    isAdmin() {
      return this.$store.state.cml.user.isAdmin
    }
  },

  methods: {
    close() {
      this.$store.commit('cml/dropdown/close')
    },
    logout() {
      return this.$store.dispatch('cml/user/logout')
    },
    popupOpen({ config, element }) {
      this.$store.commit('cml/popup/open', { config, element })
      this.close()
    }
  }
}
</script>
