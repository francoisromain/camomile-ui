<template>
  <div v-if="visible">
    <div class="flex flex-start">
      <h2 class="mt-s">Users</h2>
      <button @click="open({ user: {}, closeBtn: true, title: 'Add user', component: popupUserEdit })" class="flex-right btn p-s"><i class="icon-24 icon-24-plus"></i></button>
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
            <button @click="open({ user: user, closeBtn: true, title: 'Edit user', component: popupUserEdit })" class="btn px-s py-s my--s h5">Edit</button>
            <button @click="open({ user: user, closeBtn: true, title: 'Remove user', component: popupUserRemove })" class="btn px-s py-s my--s h5">Remove</button>
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapActions, mapState } from 'vuex'
import popupUserEdit from './users/popup-edit.vue'
import popupUserRemove from './users/popup-remove.vue'

export default {
  name: 'camomile-users',
  data () {
    return {
      popupUserEdit: popupUserEdit,
      popupUserRemove: popupUserRemove
    }
  },
  computed: {
    ...mapState({
      userCurrent: state => state.camomile.user,
      users: state => state.camomile.users.list
    }),
    visible () {
      return this.userCurrent.role === 'admin' && this.$store.state.camomile.logged
    }
  },
  methods: {
    ...mapMutations({
      open: 'camomile/popup/open'
    })
  }
}
</script>
