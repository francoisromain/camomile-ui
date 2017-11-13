<template>
  <div>
    <div class="blobs">
      <div class="blob-1-4">
        <h3 class="pt-s mb-0">Name</h3>
      </div>
      <div class="blob-3-4">
        <input type="text" v-model="group.name" class="input-alt" placeholder="Name" disabled>
      </div>
      <div class="blob-1-4">
        <h3 class="pt-s mb-0">Users</h3>
      </div>
      <div class="blob-3-4">
        <ul class="list-inline">
          <li v-for="user in users" :key="user.id" class="tag" :class="{ active: userActive(user.id) }">
            <button class="btn px-s py-xs h5 pill" @click="userToggle(user)">{{ user.name }}</button>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'camomile-popup-user-edit',
  computed: {
    users () {
      return this.$store.state.camomile.users.list
    },
    group () {
      return this.$store.state.camomile.groups.list.find(group => group.id === this.$store.state.camomile.popup.config.id)
    }
  },
  methods: {
    userToggle (user) {
      if (this.userActive(user.id)) {
        this.$store.dispatch('camomile/groups/userRemove', { user: user, group: this.group })
      } else {
        this.$store.dispatch('camomile/groups/userAdd', { user: user, group: this.group })
      }
    },
    userActive (userId) {
      return this.group.userIds.indexOf(userId) > -1
    }
  }
}
</script>
