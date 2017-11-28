<template>
  <div class="messages absolute center">
    <transition-group name="transition-bottom" tag="div">
      <div class="px-m py-s mb color-bg" :class="`bg-${message.type}`" v-if="message.content" v-for="message in messages" :key="message.id">
        {{ message.content }}
      </div>
    </transition-group>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'camomile-utils-messages',
  data () {
    return {
    }
  },
  computed: {
    ...mapState({
      messages: state => state.cml.messages.list
    })
  }
}
</script>
