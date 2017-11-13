<template>
  <div v-if="adminIs">
    <div class="flex flex-start">
      <h2 class="mt-s">Groups</h2>
      <button @click="popupOpen({ type: 'groups', id: null, closeBtn: true, title: 'Add group', component: popupEdit })" class="flex-right btn p-s"><i class="icon-24 icon-24-plus"></i></button>
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
            <button @click="popupOpen({ id: group.id, closeBtn: true, title: 'Group users', component: popupGroupUsers })" class="btn px-s py-s my--s h5">Users</button>
            <button @click="popupOpen({ type: 'groups', id: group.id, closeBtn: true, title: 'Edit group', component: popupEdit })" class="btn px-s py-s my--s h5">Edit</button>
            <button @click="popupOpen({ type: 'groups', id: group.id, closeBtn: true, title: 'Remove group', component: popupRemove })" class="btn px-s py-s my--s h5">Remove</button>
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
import popupGroupUsers from './groups/popup-users.vue'

export default {
  name: 'camomile-groups',
  data () {
    return {
      popupEdit,
      popupRemove,
      popupGroupUsers
    }
  },
  computed: {
    ...mapState({
      groups: state => state.camomile.groups.list,
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
