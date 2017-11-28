<template>
  <div>
    <div class="blobs">
      <div class="blob-1-4">
        <h4 class="pt-s">Name</h4>
      </div>
      <div class="blob-3-4">
        <input type="text" v-model="resource.name" class="input-alt" placeholder="Name" disabled>
      </div>
      <div class="blob-1-2">
        <h3 class="pt-s">Groups</h3>
        <ul class="list-sans">
          <li v-for="group in groups" :key="group.id">
            <div class="blobs">
              <div class="blob-1-3 mb-xs">
                {{ group.name }}
              </div>
              <div class="blob-2-3 mb-xs">
                <permissions-edit :resource="permissionsConfig" :element="{ id: group.id, type: 'group' }" />
              </div>
            </div>
          </li>
        </ul>
      </div>
      <div class="blob-1-2">
        <h3 class="pt-s">Users</h3>
        <ul class="list-sans">
          <li v-for="user in users" :key="user.id">
            <div class="blobs">
              <div class="blob-1-3 mb-xs">
                {{ user.name }}
              </div>
              <div class="blob-2-3 mb-xs">{{ typeof resource.permissions.users[user.id] }}
                <permissions-edit :resource="permissionsConfig" :element="{ id: user.id, type: 'user' }" />
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import permissionsEdit from './permissions-edit.vue'
import { mapState } from 'vuex'

export default {
  name: 'camomile-permissions',

  components: {
    permissionsEdit
  },

  computed: {
    ...mapState({
      resource: state => state.cml[state.cml.popup.config.type].list.find(e => e.id === state.cml.popup.element.id),
      users: state => state.cml.users.list,
      groups: state => state.cml.groups.list,
      type: state => state.cml.popup.config.type
    }),
    permissionsConfig () {
      return {
        id: this.resource.id,
        type: this.type.slice(0, -1),
        permissions: this.resource.permissions.users
      }
    }
  }
}
</script>
