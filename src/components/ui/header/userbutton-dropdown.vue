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
      return this.$store.state.user
    },
    isAdmin () {
      return this.$store.state.user.isAdmin
    }
  },

  methods: {
    close () {
      this.$store.commit('dropdown/close')
    },
    logout () {
      return this.$store.dispatch('user/logout')
    },
    popupOpen ({ config, element }) {
      this.$store.commit('popup/open', { config, element })
      this.close()
    }
  }
};
</script>
