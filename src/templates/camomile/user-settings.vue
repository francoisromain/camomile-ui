<template>
  <div v-if="user.settings" class="absolute full bg-alpha">
    <div class="relative full-y">
      <div class="pophover absolute full bg-highlight p">
        user settings <button @click="hide">Hide</button>
      </div>
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
    hide () {
      this.$store.commit('camomile/user/settingsHide')
    }
  }
}
</script>
