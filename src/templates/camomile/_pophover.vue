<template>
  <div>
    <div @click="hide" class="absolute full bg-alpha" v-if="commit">
    </div>
    <div class="pophover absolute full bg-alt p-l">
      <div class="flex flex-start">
        <h2>{{ title }}</h2>
        <button @click="hide" v-if="commit" class="flex-right btn p-s h5 mt--m"><i class="icon-24 icon-24-close"></i></button>
      </div>
      <hr class="border-bg">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  props: {
    commit: String,
    title: String
  },
  methods: {
    hide () {
      this.$store.commit(this.commit)
    }
  }
}
</script>
