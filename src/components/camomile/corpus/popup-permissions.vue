<template>
  <div>
    <div class="blobs">
      <div class="blob-1-4">
        <h3 class="pt-s mb-0">Name</h3>
      </div>
      <div class="blob-3-4">
        <input type="text" v-model="corpu.name" class="input-alt" placeholder="Name" disabled>
      </div>
      <div class="blob-1-2">
        <h3 class="pt-s">Groups</h3>
        <ul class="list-sans">
          <li v-for="group in groups" :key="group.id">
            <div class="blobs">
              <div class="blob-1-3 mb-xs">
                {{ group.name }}
              </div>
              <div class="blob-2-3 mb-xs">
                <ul class="list-inline">
                  <li class="tag" :class="{ active: groupActive(group.id, 1) }">
                    <button class="btn px-s py-xs h5 pill" @click="groupToggle(group, 1)">R</button>
                  </li>
                  <li class="tag" :class="{ active: groupActive(group.id, 2) }">
                    <button class="btn px-s py-xs h5 pill" @click="groupToggle(group, 2)">W</button>
                  </li>
                  <li class="tag" :class="{ active: groupActive(group.id, 3) }">
                    <button class="btn px-s py-xs h5 pill" @click="groupToggle(group, 3)">A</button>
                  </li>
                </ul>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <div class="blob-1-2">
        <h3 class="pt-s">Users</h3>
        <ul class="list-sans">
          <li v-for="user in users" :key="user.id">
            <div class="blobs">
              <div class="blob-1-3 mb-xs">
                {{ user.name }}
              </div>
              <div class="blob-2-3 mb-xs">
                <ul class="list-inline">
                  <li class="tag" :class="{ active: userActive(user.id, 1) }">
                    <button class="btn px-s py-xs h5 pill" @click="userToggle(user, 1)">R</button>
                  </li>
                  <li class="tag" :class="{ active: userActive(user.id, 2) }">
                    <button class="btn px-s py-xs h5 pill" @click="userToggle(user, 2)">W</button>
                  </li>
                  <li class="tag" :class="{ active: userActive(user.id, 3) }">
                    <button class="btn px-s py-xs h5 pill" @click="userToggle(user, 3)">A</button>
                  </li>
                </ul>
              </div>
            </div>
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
    groups () {
      return this.$store.state.camomile.groups.list
    },
    corpu () {
      return this.$store.state.camomile.corpus.list.find(corpu => corpu.id === this.$store.state.camomile.popup.config.id)
    }
  },
  methods: {
    userToggle (user, permission) {
      if (this.userActive(user.id, permission)) {
        this.$store.dispatch('camomile/corpus/userPermissionRemove', { corpu: this.corpu, user: user })
      } else {
        this.$store.dispatch('camomile/corpus/userPermissionSet', { corpu: this.corpu, user: user, permission: permission })
      }
    },
    groupToggle (group, permission) {
      if (this.groupActive(group.id, permission)) {
        this.$store.dispatch('camomile/corpus/groupPermissionRemove', { corpu: this.corpu, group: group })
      } else {
        this.$store.dispatch('camomile/corpus/groupPermissionSet', { corpu: this.corpu, group: group, permission: permission })
      }
    },
    userActive (userId, permission) {
      return this.corpu.userIds.hasOwnProperty(userId) && this.corpu.userIds[userId] === permission
    },
    groupActive (groupId, permission) {
      return this.corpu.groupIds.hasOwnProperty(groupId) && this.corpu.groupIds[groupId] === permission
    },
    permissionIdsList () {
      this.$store.dispatch('camomile/corpus/permissionIdsList', this.corpu)
    }
  },
  created () {
    this.permissionIdsList()
  }
}
</script>
