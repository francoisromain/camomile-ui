<template>
  <popup title="Login">
    <div class="blobs">
      <div class="blob-1-4">
        <h3 class="pt-s mb-0">Api url</h3>
      </div>
      <div class="blob-3-4">
        <input type="text" v-model="config.url" class="input-alt" placeholder="Url">
      </div>
      
      <div class="blob-1-4">
        <h3 class="pt-s mb-0">Name</h3>
      </div>
      <div class="blob-3-4">
        <input type="text" v-model="config.user.name" class="input-alt" placeholder="Name">
      </div>
      
      <div class="blob-1-4">
        <h3 class="pt-s mb-0">Password</h3>
      </div>
      <div class="blob-3-4">
        <input type="password" v-model="config.user.password" class="input-alt" placeholder="Password">
      </div>

      <div class="blob-1-4">
      </div>
      <div class="blob-3-4 mb-0">
        <button @click="login(config)" class="btn-alt p-s full-x">Login</button>
      </div>
    </div>
  </popup>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import popup from './_popup.vue'

export default {
  components: {
    popup
  },
  computed: {
    ...mapState({
      user: state => state.camomile.user,
      config: state => state.camomile.config
    })
  },
  methods: {
    ...mapActions({
      login: 'camomile/user/login'
    }),
    keypress (e) {
      if ((e.which || e.keyCode) === 13) {
        this.login(this.config)
      }
    }
  },
  created () {
    document.addEventListener('keypress', this.keypress)
  },
  beforeDestroy () {
    document.removeEventListener('keypress', this.keypress)
  }

}
</script>
