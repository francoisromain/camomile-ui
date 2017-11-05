<template>
  <div class="container pt-xl">
    <h1>{{ title }}</h1>
    <login></login>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import store from '../js/store.js'
import login from './components/login.vue'

export default {
  store,
  name: 'camomile-ui',
  components: {
    login
  },
  data () {
    return {
      title: 'Camomile UI'
    }
  },
  methods: {
    ...mapActions({
      resize: 'viewport/set'
    })
  },
  mounted () {
    window.addEventListener('resize', this.resize)
    this.resize()
  }
}
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped>

</style>

