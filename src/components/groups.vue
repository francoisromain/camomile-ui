<template>
  <div v-if="isAdmin">
    <div class="flex flex-start">
      <h2 class="mt-s">Groups</h2>
      <button @click="popupOpen({ config: popupAddConfig, element: { description: {} } })" class="btn p-s flex-right"><i class="icon-24 icon-24-plus"></i></button>
    </div>
    <div>
      <table class="table mb-0">
        <tr>
          <th>Name</th><th>Users</th><th></th>
        </tr>
        <tr v-for="group in groups" :key="group.id">
          <td>{{ group.name }}</td>
          <td>{{ group.userIds.length }}</td>
          <td class="text-right">
            <button @click="popupOpen({ config: popupUsersConfig, element: group })" class="btn px-s py-s my--s h6">Users</button>
            <button @click="popupOpen({ config: popupEditConfig, element: group })" class="btn px-s py-s my--s h6">Edit</button>
            <button @click="popupOpen({ config: popupRemoveConfig, element: group })" class="btn px-s py-s my--s h6" v-if="isRoot">Remove</button>
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import popupEdit from './popup/edit.vue'
import popupRemove from './popup/remove.vue'
import popupUsers from './popup/users.vue'

export default {
  name: 'camomile-groups',

  data() {
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
      isAdmin: state => state.cml.user.isAdmin,
      groups: state => state.cml.groups.list,
      isRoot: state => state.cml.user.isRoot
    })
  },

  methods: {
    popupOpen({ config, element }) {
      return this.$store.commit('cml/popup/open', { config, element })
    },
    refresh() {
      return this.$store.dispatch('cml/groups/list')
    }
  }
}
</script>
