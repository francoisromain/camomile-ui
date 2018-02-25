<template>
  <div class="dropdown">
    <div v-if="isAdmin">
      <button
        class="btn px-m py-s full-x"
        @click="popupOpen({ config: popupEditConfig, element: user })">Settings…</button>
    </div>
    <div>
      <button
        class="btn px-m py-s full-x mr home"
        @click="logout">Logout</button>
    </div>
  </div>
</template>

<script>
import popupEdit from '../popup/edit.vue'

export default {
  name: 'CamomileHeaderUserbuttonDropdown',

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
      return this.$store.state.cml.user.isAdmin
    }
  },

  methods: {
    close () {
      this.$store.commit('cml/dropdown/close')
    },
    logout () {
      return this.$store.dispatch('cml/user/logout')
    },
    popupOpen ({ config, element }) {
      this.$store.commit('cml/popup/open', { config, element })
      this.close()
    }
  }
}
</script>
