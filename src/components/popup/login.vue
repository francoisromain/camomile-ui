<template>
  <div>
    <div class="blobs">
      
      <div class="blob-1-4">
        <h4 class="pt-s mb-0">Name</h4>
      </div>
      <div class="blob-3-4">
        <input type="text" v-model="config.user.name" class="input-alt" placeholder="Name">
      </div>
      
      <div class="blob-1-4">
        <h4 class="pt-s mb-0">Password</h4>
      </div>
      <div class="blob-3-4">
        <input type="password" v-model="config.user.password" class="input-alt" placeholder="Password">
      </div>

      <div class="blob-1-4">
      </div>
      <div class="blob-3-4">
        <button @click="login(config)" class="btn-alt p-s full-x">Login</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'camomile-login-popup',

  computed: {
    config () {
      return this.$store.state.cml.config
    }
  },

  methods: {
    login (config) {
      return this.$store.dispatch('cml/user/login', config)
    },
    keyup (e) {
      if ((e.which || e.keyCode) === 13) {
        this.login(this.config)
      }
    }
  },

  created () {
    document.addEventListener('keyup', this.keyup)
  },

  beforeDestroy () {
    document.removeEventListener('keyup', this.keyup)
  }
}
</script>
