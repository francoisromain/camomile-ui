<template>
  <div>
    <div class="blobs">
      <div class="blob-1-4">
        <h4 class="pt-s mb-0">Name</h4>
      </div>
      <div class="blob-3-4">
        <input
          v-model="user.name"
          type="text"
          placeholder="Name"
          disabled>
      </div>
    </div>
    <div class="blobs">
      <div class="blob-1">
        <h3 class="mb-s">Groups</h3>
        <ul class="list-inline clearfix">
          <li
            v-for="group in groups"
            :key="group.id"
            :class="{ active: groupActive(group.id) }"
            class="tag">
            <button
              class="btn px-m py-xs h5 pill"
              @click="groupToggle(group)">{{ group.name }}</button>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CamomilePopupGroups',

  computed: {
    groups () {
      return this.$store.state.groups.list
    },
    user () {
      return this.$store.state.users.list.find(
        u => u.id === this.$store.state.popup.element.id
      )
    }
  },

  methods: {
    groupToggle (group) {
      if (this.groupActive(group.id)) {
        this.$store.dispatch('groups/userRemove', {
          userId: this.user.id,
          group
        })
      } else {
        this.$store.dispatch('groups/userAdd', {
          userId: this.user.id,
          group
        })
      }
    },
    groupActive (groupId) {
      return (
        this.groups
          .find(group => group.id === groupId)
          .userIds.indexOf(this.user.id) !== -1
      )
    }
  }
};
</script>
