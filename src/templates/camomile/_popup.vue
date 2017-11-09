<template>
  <div>
    <div @click="hide" class="absolute full bg-alpha" v-if="closeBtn">
    </div>
    <div class="pophover absolute full bg-alt p-l">
      <div class="flex flex-start">
        <h2>{{ title }}</h2>
        <button @click="hide" v-if="closeBtn" class="flex-right btn p-s mt--m"><i class="icon-24 icon-24-close"></i></button>
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
    title: String,
    closeBtn: Boolean
  },
  methods: {
    hide () {
      this.$store.commit(this.commit)
    }
  }
}
</script>
