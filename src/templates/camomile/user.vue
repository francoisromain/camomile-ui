<template>
  <div v-if="user.loggedin">
    <button @click="dropdownToggle" class="btn px-m py-s full-x">{{ user.name }}</button>
    <user-dropdown v-if="dropdownVisible" @logout="logout" @settings-show="settingsShow" />
    <user-settings v-if="settingsVisible" @settings-hide="settingsHide" />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import userSettings from './user-settings.vue'
import userDropdown from './user-dropdown.vue'

export default {
  components: {
    userSettings,
    userDropdown
  },
  data () {
    return {
      dropdownVisible: false,
      settingsVisible: false
    }
  },
  computed: {
    ...mapState({
      user: state => state.camomile.user
    })
  },
  methods: {
    dropdownShow () {
      this.dropdownVisible = true
    },
    dropdownHide () {
      this.dropdownVisible = false
    },
    dropdownToggle () {
      this.dropdownVisible = !this.dropdownVisible
    },
    settingsShow () {
      console.log('bam')
      this.dropdownHide()
      this.settingsVisible = true
    },
    settingsHide () {
      this.settingsVisible = false
    },
    logout () {
      this.dropdownHide()
      this.settingsHide()
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

