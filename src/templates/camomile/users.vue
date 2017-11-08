<template>
  <div v-if="visible">
    <div class="flex flex-start">
      <h2>Users</h2>
      <button @click="create()" class="flex-right btn p-s mt--m"><i class="icon-24 icon-24-plus"></i>p</button>
    </div>
  </div>
</template>


<script>
import { mapActions } from 'vuex'

export default {
  computed: {
    user () {
      return this.$store.state.camomile.user
    },
    visible () {
      return this.user.role === 'admin' && this.$store.state.camomile.logged
    }
  },
  methods: {
    ...mapActions({
      create: 'camomile/utils/userPopupShow'
    })
  }
}
</script>
