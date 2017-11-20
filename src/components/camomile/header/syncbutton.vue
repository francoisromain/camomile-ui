<template>
  <button @click="sync" class="btn-menubar px-m py-s full-x"><i class="icon-24 icon-24-dot" :class="{ blink: active }" ></i></button>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'camomile-sync',
  computed: {
    active () {
      return this.$store.getters['cml/sync/active']
      // return true
    }
  },
  methods: {
    sync () {
      this.$store.dispatch('cml/sync/all')
    }
  }
}
</script>



