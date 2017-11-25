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
                <permissions :config="groupPermissionsConfig" :element="group" />
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
              <div class="blob-2-3 mb-xs">
                <permissions :config="userPermissionsConfig" :element="user" />
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import permissions from './popup-permissions-edit.vue'
import { mapState } from 'vuex'

export default {
  name: 'camomile-popup-user-edit',
  components: {
    permissions
  },
  computed: {
    ...mapState({
      resource: state => state.cml[state.cml.popup.config.type].list.find(e => e.id === state.cml.popup.element.id),
      users: state => state.cml.users.list,
      groups: state => state.cml.groups.list,
      type: state => state.cml.popup.config.type
    }),
    groupPermissionsConfig () {
      return {
        resource: this.resource,
        resourceType: this.type.slice(0, -1),
        permissionSetAction: `cml/${this.type}/groupPermissionSet`,
        permissionRemoveAction: `cml/${this.type}/groupPermissionRemove`,
        elementType: 'group'
      }
    },
    userPermissionsConfig () {
      return {
        resource: this.resource,
        resourceType: this.type.slice(0, -1),
        permissionSetAction: `cml/${this.type}/userPermissionSet`,
        permissionRemoveAction: `cml/${this.type}/userPermissionRemove`,
        elementType: 'user'
      }
    }
  }
}
</script>
