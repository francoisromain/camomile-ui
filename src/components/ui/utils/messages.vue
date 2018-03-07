<template>
  <div class="messages absolute center">
    <transition-group
      name="transition-bottom"
      tag="div">
      <div
        v-for="message in messages"
        v-if="message.content"
        :class="`bg-${message.type}`"
        :key="message.id"
        class="px-m py-s mb color-bg b">{{ message.content }}
      </div>
    </transition-group>
  </div>
</template>

<script>
export default {
  name: 'CamomileUtilsMessages',

  computed: {
    messages () {
      return this.$store.state.messages.list
    }
  }
}
</script>
