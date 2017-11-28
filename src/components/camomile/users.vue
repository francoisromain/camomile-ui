<template>
  <div>
    <div class="flex flex-start">
      <h2 class="mt-s">Users</h2>
      <button @click="popupOpen({ config: { ...popupEditConfig, title: 'Add user' }, element: { description: {} } })" class="btn p-s flex-right"><i class="icon-24 icon-24-plus"></i></button>
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
            <button @click="popupOpen({ config: popupGroupsConfig, element: user })" class="btn px-s py-s my--s h5">Groups</button>
            <button @click="popupOpen({ config: popupEditConfig, element: user })" class="btn px-s py-s my--s h5">Edit</button>
            <button @click="popupOpen({ config: popupRemoveConfig, element: user })" class="btn px-s py-s my--s h5" v-if="user.id !== userId">Remove</button>
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
import popupGroups from './popup/groups.vue'

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
      userId: state => state.cml.user.id
    })
  },

  methods: {
    popupOpen ({ config, element }) {
      return this.$store.commit('cml/popup/open', { config, element })
    }
  }
}
</script>
