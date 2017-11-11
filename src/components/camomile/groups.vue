<template>
  <div v-if="visible">
    <div class="flex flex-start">
      <h2 class="mt-s">Groups</h2>
      <button @click="open({ group: {}, closeBtn: true, title: 'Add group', component: popupGroupEdit })" class="flex-right btn p-s"><i class="icon-24 icon-24-plus"></i></button>
    </div>
    <div>
      <table class="table mb-0">
        <tr>
          <th>Name</th><th>Users</th><th></th>
        </tr>
        <tr v-for="group in groups" :key="group.id">
          <td>{{ group.name }}</td>
          <td>{{ group.users.length }}</td>
          <td class="text-right">
            <button @click="open({ group: group, closeBtn: true, title: 'Edit group', component: popupGroupEdit })" class="btn px-s py-s my--s h5">Edit</button>
            <button @click="open({ group: group, closeBtn: true, title: 'Remove group', component: popupGroupRemove })" class="btn px-s py-s my--s h5">Remove</button>
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapActions, mapState } from 'vuex'
import popupGroupEdit from './groups/popup-edit.vue'
import popupGroupRemove from './groups/popup-remove.vue'

export default {
  name: 'camomile-groups',
  data () {
    return {
      popupGroupEdit: popupGroupEdit,
      popupGroupRemove: popupGroupRemove
    }
  },
  computed: {
    ...mapState({
      userCurrent: state => state.camomile.user,
      groups: state => state.camomile.groups.list
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
