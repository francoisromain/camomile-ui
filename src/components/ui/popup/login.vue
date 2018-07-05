<template>
  <div>
    <div class="tablet-blobs">
      
      <div class="tablet-blob-1-4">
        <h4 class="pt-s">Name</h4>
      </div>
      <div class="tablet-blob-3-4">
        <input
          v-model="config.user.name"
          type="text"
          placeholder="Name"
          class="mb">
      </div>
      
      <div class="tablet-blob-1-4">
        <h4 class="pt-s">Password</h4>
      </div>
      <div class="tablet-blob-3-4">
        <input
          v-model="config.user.password"
          type="password"
          placeholder="Password"
          class="mb">
      </div>

      <div class="tablet-blob-1-4" />
      <div class="tablet-blob-3-4">
        <button
          class="btn-alt p-s full-x mb"
          @click="login(config)">Login</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CamomileLoginPopup',

  computed: {
    config () {
      return this.$store.state.config
    }
  },

  created () {
    document.addEventListener('keyup', this.keyup)
  },

  beforeDestroy () {
    document.removeEventListener('keyup', this.keyup)
  },

  methods: {
    login (config) {
      return this.$store.dispatch('user/login', config)
    },
    keyup (e) {
      if ((e.which || e.keyCode) === 13) {
        this.login(this.config)
      }
    }
  }
}
</script>
