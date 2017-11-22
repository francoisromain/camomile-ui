<template>
  <div>
    <div class="blobs">
      <div class="blob-1-4">
        <h4 class="pt-s mb-0">Name</h4>
      </div>
      <div class="blob-3-4">
        <input type="text" v-model="user.name" class="input-alt" placeholder="Name" disabled>
      </div>
    </div>
    <div class="blobs">
      <div class="blob-1">
        <h3 class="mb-s">Groups</h3>
        <ul class="list-inline clearfix">
          <li v-for="group in groups" :key="group.id" :class="{ active: groupActive(group.id) }" class="tag"><button class="btn px-s py-xs h5 pill" @click="groupToggle(group)">{{ group.name }}</button>
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
      return this.$store.state.cml.groups.list
    },
    user () {
      return this.$store.state.cml.users.list.find(user => user.id === this.$store.state.cml.popup.config.userId)
    }
  },
  methods: {
    groupToggle (group) {
      if (this.groupActive(group.id)) {
        this.$store.dispatch('cml/groups/userRemove', { user: this.user, group: group })
      } else {
        this.$store.dispatch('cml/groups/userAdd', { user: this.user, group: group })
      }
    },
    groupActive (groupId) {
      return this.groups.find(group => group.id === groupId)
        .userIds.indexOf(this.user.id) !== -1
    }
  }
}
</script>
