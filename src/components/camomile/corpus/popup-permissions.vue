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
          <li v-for="group in corpu.groups" :key="group.id">
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
          <li v-for="user in corpu.users" :key="user.id">
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
      corpu: state => state.cml.popup.config.corpu
    }),
    groupPermissionsConfig () {
      return {
        resource: this.corpu,
        permissionSetAction: 'cml/corpus/permissionsGroupSet',
        permissionRemoveAction: 'cml/corpus/permissionsGroupRemove',
        elementType: 'group',
        resourceType: 'corpu'
      }
    },
    userPermissionsConfig () {
      return {
        resource: this.corpu,
        permissionSetAction: 'cml/corpus/permissionsUserSet',
        permissionRemoveAction: 'cml/corpus/permissionsUserRemove',
        elementType: 'user',
        resourceType: 'corpu'
      }
    }
  },
  methods: {
    permissionsList () {
      this.$store.dispatch('cml/corpus/permissionsList', this.corpu)
    }
  },
  created () {
    this.permissionsList()
  }
}
</script>
