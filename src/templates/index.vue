<template>
  <div class="container pt-l">
    <h1>{{ title }}</h1>
    <messages></messages>
    <user></user>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import store from '../store'
import user from './components/user.vue'
import messages from './components/messages.vue'
import viewport from './components/viewport.vue'

export default {
  store,
  name: 'camomile-ui',
  components: {
    user,
    messages,
    viewport
  },
  data () {
    return {
      title: 'Camomile UI'
    }
  }
}
</script>
