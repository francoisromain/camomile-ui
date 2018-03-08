<template>
  <div v-if="isAdmin">
    <div class="flex flex-start">
      <h2 class="mt-xs">Groups</h2>
      <button 
        class="btn-border flex-right px-s py-xs"
        @click="popupOpen({ config: popupAddConfig, element: { description: {} } })"><i class="icon-24 icon-24-plus" /></button>
    </div>
    <div>
      <table class="table mb-0">
        <tr>
          <th>Name</th><th>Users</th><th />
        </tr>
        <tr
          v-for="group in groups"
          :key="group.id">
          <td>{{ group.name }}</td>
          <td>{{ group.userIds.length }}</td>
          <td class="text-right">
            <button
              class="btn-border p-s my--s h6"
              @click="popupOpen({ config: popupUsersConfig, element: group })">Users</button>
            <button
              class="btn-border p-s my--s h6"
              @click="popupOpen({ config: popupEditConfig, element: group })">Edit</button>
            <button
              v-if="isRoot"
              class="btn-border p-s my--s h6"
              @click="popupOpen({ config: popupRemoveConfig, element: group })">Remove</button>
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
import popupUsers from '../ui/popup/users.vue'

export default {
  name: 'CamomileGroups',

  data () {
    return {
      popupRemoveConfig: {
        type: 'groups',
        closeBtn: true,
        title: 'Remove group',
        component: popupRemove
      },
      popupEditConfig: {
        type: 'groups',
        closeBtn: true,
        title: 'Edit group',
        component: popupEdit
      },
      popupAddConfig: {
        type: 'groups',
        closeBtn: true,
        title: 'Add group',
        component: popupEdit
      },
      popupUsersConfig: {
        closeBtn: true,
        title: 'Group users',
        component: popupUsers
      }
    }
  },

  computed: {
    ...mapState({
      isAdmin: state => state.user.isAdmin,
      groups: state => state.groups.list,
      isRoot: state => state.user.isRoot
    })
  },

  methods: {
    popupOpen ({ config, element }) {
      return this.$store.commit('popup/open', { config, element })
    },
    refresh () {
      return this.$store.dispatch('groups/list')
    }
  }
};
</script>
