<template>
  <div>
    <div class="blobs">
      <div class="blob-1-4">
        <h4 class="pt-s mb-0">Name</h4>
      </div>
      <div class="blob-3-4">
        <input
          v-model="group.name"
          type="text"
          placeholder="Name"
          disabled>
      </div>
    </div>
    <div class="blobs">
      <div class="blob-1">
        <h3 class="pt-s mb-s">Users</h3>
        <ul class="list-inline">
          <li
            v-for="user in users"
            :class="{ active: userActive(user.id) }"
            :key="user.id"
            class="tag">
            <button
              class="btn px-m py-xs h5 pill"
              @click="userToggle(user.id)">{{ user.name }}</button>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CamomilePopupUsers',

  computed: {
    users () {
      return this.$store.state.users.list
    },
    group () {
      return this.$store.state.groups.list.find(
        g => g.id === this.$store.state.popup.element.id
      )
    }
  },

  methods: {
    userToggle (userId) {
      if (this.userActive(userId)) {
        this.$store.dispatch('groups/userRemove', {
          userId,
          group: this.group
        })
      } else {
        this.$store.dispatch('groups/userAdd', {
          userId,
          group: this.group
        })
      }
    },

    userActive (userId) {
      return this.group.userIds.indexOf(userId) > -1
    }
  }
};
</script>
