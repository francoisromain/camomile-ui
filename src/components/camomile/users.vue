<template>
  <div v-if="adminIs">
    <div class="flex flex-start">
      <h2 class="mt-s">Users</h2>
      <button @click="popupOpen({ type: 'users', id: null, closeBtn: true, title: 'Add user', component: popupEdit })" class="flex-right btn p-s"><i class="icon-24 icon-24-plus"></i></button>
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
            <button @click="popupOpen({ id: user.id, closeBtn: true, title: 'User groups', component: popupUserGroups })" class="btn px-s py-s my--s h5">Groups</button>
            <button @click="popupOpen({ type: 'users', id: user.id, closeBtn: true, title: 'Edit user', component: popupEdit })" class="btn px-s py-s my--s h5">Edit</button>
            <button @click="popupOpen({ type: 'users', id: user.id, closeBtn: true, title: 'Remove user', component: popupRemove })" class="btn px-s py-s my--s h5">Remove</button>
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
import popupUserGroups from './users/popup-groups.vue'

export default {
  name: 'camomile-users',
  data () {
    return {
      popupEdit,
      popupRemove,
      popupUserGroups
    }
  },
  computed: {
    ...mapState({
      users: state => state.camomile.users.list,
      adminIs: state => state.camomile.adminIs
    })
  },
  methods: {
    ...mapMutations({
      popupOpen: 'camomile/popup/open'
    })
  }
}
</script>
