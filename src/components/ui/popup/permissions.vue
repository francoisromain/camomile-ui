<template>
  <div>
    <div class="blobs">
      <div class="blob-1-4">
        <h4 class="pt-s">Name</h4>
      </div>
      <div class="blob-3-4">
        <input
          v-model="resource.name"
          type="text"
          placeholder="Name"
          disabled>
      </div>
      <div class="blob-1-2">
        <h3 class="pt-s">Users</h3>
        <ul class="list-sans">
          <li
            v-for="user in users"
            :key="user.id">
            <div class="blobs">
              <div class="blob-1-2 mb-s">
                {{ user.name }}
              </div>
              <div class="blob-1-2 mb-s">
                <permissions-edit
                  :type="type.slice(0, -1)"
                  :element="{ id: user.id, type: 'user' }" />
              </div>
            </div>
          </li>
        </ul>
      </div>
      <div class="blob-1-2">
        <h3 class="pt-s">Groups</h3>
        <ul class="list-sans">
          <li
            v-for="group in groups"
            :key="group.id">
            <div class="blobs">
              <div class="blob-1-2 mb-s">
                {{ group.name }}
              </div>
              <div class="blob-1-2 mb-s">
                <permissions-edit
                  :type="type.slice(0, -1)"
                  :element="{ id: group.id, type: 'group'}" />
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
  name: 'CamomilePermissions',

  components: {
    permissionsEdit
  },

  computed: {
    ...mapState({
      resource: state => state.popup.element,
      users: state => state.users.list,
      groups: state => state.groups.list,
      type: state => state.popup.config.type
    })
  }
}
</script>
