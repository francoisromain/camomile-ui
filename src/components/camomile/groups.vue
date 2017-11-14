<template>
  <div>
    <div class="flex flex-start">
      <h2 class="mt-s">Groups</h2>
      <button @click="popupOpen({ ...popupEditConfig, id: null, title: 'Add group' })" class="flex-right btn p-s"><i class="icon-24 icon-24-plus"></i></button>
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
            <button @click="popupOpen({ ...popupUsersConfig, id: group.id })" class="btn px-s py-s my--s h5">Users</button>
            <button @click="popupOpen({ ...popupEditConfig, id: group.id })" class="btn px-s py-s my--s h5">Edit</button>
            <button @click="popupOpen({ ...popupRemoveConfig, id: group.id })" class="btn px-s py-s my--s h5" v-if="isRoot">Remove</button>
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapActions, mapState } from 'vuex'
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
      groups: state => state.camomile.groups.list,
      isLogged: state => state.camomile.isLogged,
      isRoot: state => state.camomile.isRoot
    })
  },
  methods: {
    ...mapMutations({
      popupOpen: 'camomile/popup/open'
    })
  },
  created () {
    console.log('grrrourprprprp')
  }
}
</script>
