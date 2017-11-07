<template>
  <div class="blobs" v-if="!user.loggedin">      
    <div class="blob-1-4">
      <input type="text" v-model="config.url" placeholder="Url">
    </div>
    
    <div class="blob-1-4">
      <input type="text" v-model="config.user.name" placeholder="Name">
    </div>
    
    <div class="blob-1-4">
      <input type="password" v-model="config.user.password" placeholder="Password">
    </div>
    <div class="blob-1-4">
      <button v-on:click="login(config)" class="btn p-s full-x mr home">Login</button>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  computed: {
    ...mapState({
      user: state => state.camomile.user,
      config: state => state.camomile.config
    })
  },
  methods: {
    ...mapActions({
      login: 'camomile/user/login'
    })
  }
}
</script>
