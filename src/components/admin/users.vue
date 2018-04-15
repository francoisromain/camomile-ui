<template>
  <div
    v-if="isAdmin"
    class="p bg-bg mb">
    <div class="flex flex-start">
      <h2 class="mt-xs">Users</h2>
      <button
        class="btn-border flex-right px-s py-xs"
        @click="popupOpen({ config: popupAddConfig, element: { description: {}, role: 'user' } })" ><i class="icon-24 icon-24-plus" /></button>
    </div>
    <div>
      <table class="table mb-0">
        <tr>
          <th>Name</th><th>Role</th><th />
        </tr>
        <tr
          v-for="user in users"
          :key="user.id">
          <td>{{ user.name }}</td>
          <td>{{ user.role }}</td>
          <td class="text-right">
            <button
              class="btn-border p-s my--s h6"
              @click="popupOpen({ config: popupGroupsConfig, element: user })">Groups</button>
            <button
              class="btn-border p-s my--s h6"
              @click="popupOpen({ config: popupEditConfig, element: user })">Edit</button>
            <button
              v-if="user.id !== userId"
              class="btn-border p-s my--s h6"
              @click="popupOpen({ config: popupRemoveConfig, element: user })">Remove</button>
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import popupEdit from '../ui/popup/edit.vue'
import popupRemove from '../ui/popup/remove.vue'
import popupGroups from '../ui/popup/groups.vue'

export default {
  name: 'CamomileUsers',

  data () {
    return {
      popupEditConfig: {
        type: 'users',
        closeBtn: true,
        title: 'Edit user',
        component: popupEdit
      },
      popupAddConfig: {
        type: 'users',
        closeBtn: true,
        title: 'Add user',
        component: popupEdit
      },
      popupGroupsConfig: {
        closeBtn: true,
        title: 'User groups',
        component: popupGroups
      },
      popupRemoveConfig: {
        type: 'users',
        closeBtn: true,
        title: 'Remove user',
        component: popupRemove
      }
    }
  },

  computed: {
    ...mapState({
      isAdmin: state => state.user.isAdmin,
      users: state => state.users.list,
      userId: state => state.user.id
    })
  },

  methods: {
    popupOpen ({ config, element }) {
      return this.$store.commit('popup/open', { config, element })
    }
  }
};
</script>
