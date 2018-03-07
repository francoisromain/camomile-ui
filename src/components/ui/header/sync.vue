<template>
  <button
    class="btn-menubar px-m py-s full-x"
    @click="sync">
    <i
      :class="{ blink: active }"
      class="icon-24 icon-24-dot" />
  </button>
</template>

<script>
export default {
  name: 'CamomileHeaderSyncbutton',

  computed: {
    active () {
      return this.$store.getters['sync/active']
    }
  },

  methods: {
    sync () {
      this.$store.dispatch('sync/all')
    }
  }
}
</script>
