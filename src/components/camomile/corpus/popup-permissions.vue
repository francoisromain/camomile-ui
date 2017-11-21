<template>
  <div>
    <div class="blobs">
      <div class="blob-1-4">
        <h3 class="pt-s mb-0">Name</h3>
      </div>
      <div class="blob-3-4">
        <input type="text" v-model="corpu.name" class="input-alt" placeholder="Name" disabled>
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
import permissions from '../utils/permissions.vue'
import { mapState } from 'vuex'

export default {
  name: 'camomile-popup-user-edit',
  components: {
    permissions
  },
  computed: {
    ...mapState({
      corpu: state => state.cml.corpus.list.find(corpu => corpu.id === state.cml.popup.config.corpuId),
      users: state => state.cml.users.list,
      groups: state => state.cml.groups.list
    }),
    groupPermissionsConfig () {
      return {
        resource: this.corpu,
        resourceType: 'corpu',
        permissionSetAction: 'cml/corpus/groupPermissionSet',
        permissionRemoveAction: 'cml/corpus/groupPermissionRemove',
        elementType: 'group'
      }
    },
    userPermissionsConfig () {
      return {
        resource: this.corpu,
        resourceType: 'corpu',
        permissionSetAction: 'cml/corpus/userPermissionSet',
        permissionRemoveAction: 'cml/corpus/userPermissionRemove',
        elementType: 'user'
      }
    }
  }
}
</script>
