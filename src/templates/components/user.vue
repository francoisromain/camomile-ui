<template>
  <div>
    <div class="blobs" v-if="user.loggedin">
      <div class="blob-1-4 p-s">
        {{ api.url }}
      </div>
      
      <div class="blob-1-4 p-s">
        {{ api.user.name }}
      </div>
      
      <div class="blob-1-4 p-s">
        <i>••••••••</i>
      </div>
      <div class="blob-1-4">
        <button v-on:click="logout" class="btn p-s full-x mr home">Logout</button>
      </div>
    </div>
    <div class="blobs" v-else>
      
      <div class="blob-1-4">
        <input type="text" v-model="api.url" placeholder="Url">
      </div>
      
      <div class="blob-1-4">
        <input type="text" v-model="api.user.name" placeholder="Name">
      </div>
      
      <div class="blob-1-4">
        <input type="password" v-model="api.user.password" placeholder="Password">
      </div>
      <div class="blob-1-4">
        <button v-on:click="login(api)" class="btn p-s full-x mr home">Login</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  data () {
    return {
      api: {
        user: {
          name: 'root',
          password: 'roO7p4s5wOrD'
        },
        url: 'http://localhost:3000'
      }
    }
  },
  computed: {
    ...mapState({
      user: state => state.camomile.user
    })
  },
  methods: {
    ...mapActions({
      login: 'camomile/user/login',
      logout: 'camomile/user/logout'
    })
  }
}
</script>
