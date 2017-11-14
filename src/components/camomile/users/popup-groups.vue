<template>
  <div>
    <div class="blobs">
      <div class="blob-1-4">
        <h3 class="pt-s mb-0">Name</h3>
      </div>
      <div class="blob-3-4">
        <input type="text" v-model="user.name" class="input-alt" placeholder="Name" disabled>
      </div>
      <div class="blob-1-4">
        <h3 class="pt-s mb-0">Users</h3>
      </div>
      <div class="blob-3-4">
        <ul class="list-inline">
          <li v-for="group in groups" :key="group.id" :class="{ active: groupActive(group.id) }" class="tag">
            <button class="btn px-s py-xs h5 pill" @click="groupToggle(group)">{{ group.name }}</button>
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
    groups () {
      return this.$store.state.camomile.groups.list
    },
    user () {
      return this.$store.state.camomile.users.list.find(user => user.id === this.$store.state.camomile.popup.config.id)
    }
  },
  methods: {
    groupToggle (group) {
      if (this.groupActive(group.id)) {
        this.$store.dispatch('camomile/groups/userRemove', { user: this.user, group: group })
          .then(r => this.groupIdsList())
      } else {
        this.$store.dispatch('camomile/groups/userAdd', { user: this.user, group: group })
          .then(r => this.groupIdsList())
      }
    },
    groupActive (groupId) {
      return this.user.groupIds.indexOf(groupId) > -1
    },
    groupIdsList () {
      this.$store.dispatch('camomile/users/groupIdsList', this.user)
    }
  },
  created () {
    this.groupIdsList()
  }
}
</script>
