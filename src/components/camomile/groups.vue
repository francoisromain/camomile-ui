<template>
  <div>
    <div class="flex flex-start">
      <h2 class="mt-s">Groups</h2>
      <button @click="popupOpen({ ...popupEditConfig, element: { description: {} }, title: 'Add group' })" class="btn p-s flex-right"><i class="icon-24 icon-24-plus"></i></button>
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
            <button @click="popupOpen({ ...popupUsersConfig, groupId: group.id })" class="btn px-s py-s my--s h5">Users</button>
            <button @click="popupOpen({ ...popupEditConfig, element: group })" class="btn px-s py-s my--s h5">Edit</button>
            <button @click="popupOpen({ ...popupRemoveConfig, element: group })" class="btn px-s py-s my--s h5" v-if="isRoot">Remove</button>
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import popupEdit from './utils/popup-edit.vue'
import popupRemove from './utils/popup-remove.vue'
import popupUsers from './groups/popup-users.vue'

export default {
  name: 'camomile-groups',

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
      popupUsersConfig: {
        closeBtn: true,
        title: 'Group users',
        component: popupUsers
      }
    }
  },

  computed: {
    ...mapState({
      groups: state => state.cml.groups.list,
      isLogged: state => state.cml.isLogged,
      isRoot: state => state.cml.isRoot
    })
  },

  methods: {
    popupOpen (config) {
      return this.$store.commit('cml/popup/open', config)
    },
    refresh () {
      return this.$store.dispatch('cml/groups/list')
    }
  }
}
</script>
