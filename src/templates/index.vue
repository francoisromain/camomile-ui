<template>
  <div class="container pt-xl">
    <h1>{{ title }}</h1>
    <button v-on:click="login" class="btn p-m mb mr">Login</button><br>
    <button v-on:click="loginC" class="btn p-m mb mr">
      Login C</button>
    <button v-on:click="create" class="btn p-m mb mr">
      Create C</button>

    <br>

    <button v-on:click="usersList" class="btn p-m mb mr">
      Users list</button>

    <button v-on:click="mediumCreate" class="btn p-m mb mr">Medium Create</button>
    <button v-on:click="corpusCreate" class="btn p-m mb mr">Corpus Create</button>
  </div>
</template>

<script>
import store from '../js/store.js'
/* global Camomile */
import axios from 'axios'

// var host = process.argv[2]
// var user = process.argv[3]
// var password = process.argv[4]
// var corpusId = process.argv[5]

export default {
  store,
  name: 'HelloWorld',
  data () {
    return {
      host: `http://localhost:3000`,
      cookie: undefined,
      client: new Camomile('http://localhost:3000'),
      loginBody: {
        username: 'root',
        password: 'roO7p4s5wOrD'
      },
      mediumBody: {
        name: 'test',
        description:
        'Donec sed odio dui. Aenean lacinia bibendum nulla sed consectetur. Donec id elit non mi porta gravida at eget metus.'
      },
      corpus: {
        name: 'Corpus trois',
        description:
        'Donec sed odio dui. Aenean lacinia bibendum nulla sed consectetur. Donec id elit non mi porta gravida at eget metus.',
        licence: 'MIT'
      },
      title: 'Camomile UI',
      errors: []
    }
  },
  methods: {
    resize () {
      this.$store.dispatch('set')
    },
    post () {
      axios
        .post(`${this.host}/login`, this.loginBody)
        .then(response => {
          console.log('response', response.headers)
        })
        .catch(e => {
          this.errors.push(e)
        })
    },

    loginC () {
      return this.client
        .login(this.loginBody.username, this.loginBody.password)
        .then(r => {
          console.log(r)
          return this.authenticate()
        })
        .catch(e => {
          console.log(e)
          this.login_status = 'Login failed : ' + e.message
        })
    },

    create (e) {
      e.preventDefault()
      this.client
        .createCorpus(this.corpus.name, this.corpus.description, {
          returns_id: false
        })
        .then(response => {
          console.log('Creation succeeded.', response)
        })
        .catch(e => {
          this.creation_status = 'Creation failed : ' + e
        })
    },

    authenticate () {
      return this.client
        .me()
        .then(({ username }) => {
          this.username = username
          this.logged_in = true
          console.log('username', username)
          // return this.dispatchEvent(new CustomEvent('login', {}))
        })
        .catch(err => {
          console.log('err', err)
          this.logged_in = false
        })
    },

    async login () {
      try {
        const data = await axios.post(`${this.host}/login`, this.loginBody)
        if (data.headers['set-cookie'] && data.headers['set-cookie'][0]) {
          this.cookie = data.headers['set-cookie'][0]
        }
        console.log('data: ', data.data)
        return data
      } catch (e) {
        this.errors.push(e)
      } finally {
        console.log('finally')
      }
    },

    async usersList () {
      try {
        const test =
          await axios.get(`${this.host}/user`, this.corpus)
        console.log(
          'response', test
        )
      } catch (e) {
        this.errors.push(e)
      }
    },

    async mediumCreate () {
      try {
        console.log(
          'response',
          await axios.post(`${this.host}/medium`, this.mediumBody)
        )
      } catch (e) {
        this.errors.push(e)
      }
    },

    async corpusCreate () {
      try {
        console.log(
          'response',
          await axios.post(`${this.host}/corpus`, this.corpus)
        )
      } catch (e) {
        this.errors.push(e)
      }
    }
  },
  mounted () {
    window.addEventListener('resize', this.resize)
    this.resize()
  }
}
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>

