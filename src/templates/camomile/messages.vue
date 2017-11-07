<template>
  <div>
    <div class="px-m py-s mb color-bg" :class="`bg-${message.type}`" v-if="message.content" v-for="(message, name) in messages" :key="name">{{ message.content }}</div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  data () {
    return {
    }
  },
  computed: {
    ...mapState({
      messages: state => state.camomile.messages
    })
  }
}
</script>
