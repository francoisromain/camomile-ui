<template>
  <div v-if="visible">
    <div class="flex flex-start">
      <h2 class="mt-s">Users</h2>
      <button @click="open(userAddConfig)" class="flex-right btn p-s"><i class="icon-24 icon-24-plus"></i></button>
    </div>
    <div>
      <table class="table mb-0">
        <tr>
          <th>Name</th><th>Role</th><th></th>
        </tr>
        <tr v-for="user in users" :key="user._id">
          <td>{{ user.name }}</td>
          <td>{{ user.role }}</td>
          <td class="text-right">
            <button @click="open({ user: user, closeBtn: true, title: 'Edit user', content: 'popupUserEdit' })" class="btn px-s py-s my--s h5">Edit</button>
            <button @click="open({ user: user, closeBtn: true, title: 'Remove user', content: 'popupUserRemove' })" class="btn px-s py-s my--s h5">Remove</button>
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapActions, mapState } from 'vuex'

export default {
  name: 'camomile-users',
  data () {
    return {
      userAddConfig: {
        user: {},
        closeBtn: true,
        title: 'Add user',
        content: 'popupUserEdit'
      }
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
