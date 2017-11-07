<template>
  <div>
    <div class="bg-alt">
      <div class="container mb relative">
        <div class="right"><cml-user /></div>
        <h1 class="mb-0">{{ $store.state.camomile.config.title }} | {{ $store.getters['camomile/__a'] ? 'axios' : 'rp' }} | {{ url }}</h1>
      </div>
    </div>
    <div class="container">
      <cml-messages />
      <cml-user-login />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import store from '../store'
import viewport from './components/viewport.vue'
import cmlMessages from './camomile/messages.vue'
import cmlUserLogin from './camomile/user-login.vue'
import cmlUser from './camomile/user.vue'

export default {
  store,
  name: 'camomile-ui',
  components: {
    viewport,
    cmlMessages,
    cmlUserLogin,
    cmlUser,
  },
  computed: {
    ...mapState({
      url: state => state.camomile.url
    })
  }
}
</script>
