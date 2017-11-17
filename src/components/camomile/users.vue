<template>
  <div>
    <div class="flex flex-start">
      <h2 class="mt-s">Users</h2>
      <button @click="popupOpen({ ...popupEditConfig, element: {}, title: 'Add user' })" class="flex-right btn p-s"><i class="icon-24 icon-24-plus"></i></button>
    </div>
    <div>
      <table class="table mb-0">
        <tr>
          <th>Name</th><th>Role</th><th></th>
        </tr>
        <tr v-for="user in users" :key="user.id">
          <td>{{ user.name }}</td>
          <td>{{ user.role }}</td>
          <td class="text-right">
            <button @click="popupOpen({ ...popupGroupsConfig, userId: user.id })" class="btn px-s py-s my--s h5">Groups</button>
            <button @click="popupOpen({ ...popupEditConfig, element: user })" class="btn px-s py-s my--s h5">Edit</button>
            <button @click="popupOpen({ ...popupRemoveConfig, element: user })" class="btn px-s py-s my--s h5">Remove</button>
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
import popupGroups from './users/popup-groups.vue'

export default {
  name: 'camomile-users',
  data () {
    return {
      popupEditConfig: {
        type: 'users',
        closeBtn: true,
        title: 'Edit user',
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
      users: state => state.cml.users.list,
      isLogged: state => state.cml.isLogged
    })
  },
  methods: {
    ...mapMutations({
      popupOpen: 'cml/popup/open'
    })
  }
}
</script>
