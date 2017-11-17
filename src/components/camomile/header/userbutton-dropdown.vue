<template>
  <div class="dropdown">
    <div v-if="isAdmin">
      <button @click="popupOpen({ ...popupEditConfig, element: user })" class="btn px-m py-s full-x">Settings…</button>
    </div>
    <div>
      <button @click="logout" class="btn px-m py-s full-x mr home">Logout</button>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapActions } from 'vuex'
import popupEdit from '../utils/popup-edit.vue'

export default {
  name: 'camomile-userbutton-dropdown',
  data () {
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
    user () {
      return this.$store.state.cml.user
    },
    isAdmin () {
      return this.$store.state.cml.isAdmin
    }
  },
  methods: {
    close () {
      this.$store.commit('cml/dropdown/close')
    },
    logout () {
      return this.$store.dispatch('cml/user/logout')
    },
    popupOpen (config) {
      this.$store.commit('cml/popup/open', config)
      this.close()
    }
  }
}
</script>

