<template>
  <div>
    user settings <button @click="hide">Hide</button>
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
      this.$emit('settings-hide')
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

