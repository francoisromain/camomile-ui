<template>
  <div>
    <div class="blobs">
      
      <div class="blob-1-4">
        <h4 class="pt-s mb-0">Name</h4>
      </div>
      <div class="blob-3-4">
        <input
          v-model="config.user.name"
          type="text"
          placeholder="Name">
      </div>
      
      <div class="blob-1-4">
        <h4 class="pt-s mb-0">Password</h4>
      </div>
      <div class="blob-3-4">
        <input
          v-model="config.user.password"
          type="password"
          placeholder="Password">
      </div>

      <div class="blob-1-4" />
      <div class="blob-3-4">
        <button
          class="btn-alt p-s full-x"
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
