<template>
  <div>
    <div class="blobs">
      <div class="blob-1-4">
        <h4 class="pt-s mb-0">Name</h4>
      </div>
      <div class="blob-3-4">
        <input type="text" v-model="group.name" class="input-alt" placeholder="Name" disabled>
      </div>
    </div>
    <div class="blobs">
      <div class="blob-1">
        <h3 class="pt-s mb-s">Users</h3>
        <ul class="list-inline">
          <li v-for="user in users" :key="user.id" class="tag" :class="{ active: userActive(user.id) }">
            <button class="btn px-m py-xs h5 pill" @click="userToggle(user)">{{ user.name }}</button>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'camomile-popup-users',

  computed: {
    users () {
      return this.$store.state.cml.users.list
    },
    group () {
      return this.$store.state.cml.groups.list.find(group => group.id === this.$store.state.cml.popup.element.id)
    }
  },

  methods: {
    userToggle (user) {
      if (this.userActive(user.id)) {
        this.$store.dispatch('cml/groups/userRemove', { user: user, group: this.group })
      } else {
        this.$store.dispatch('cml/groups/userAdd', { user: user, group: this.group })
      }
    },

    userActive (userId) {
      return this.group.userIds.indexOf(userId) > -1
    }
  }
}
</script>
