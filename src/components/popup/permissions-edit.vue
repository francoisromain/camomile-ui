<template>
  <ul class="list-inline">
    <li class="tag" :class="{ active: isActive(1) }">
      <button class="btn px-s py-xs my--xs h5 mono pill" @click="toggle(1)">R</button>
    </li>
    <li class="tag" :class="{ active: isActive(2) }">
      <button class="btn px-s py-xs my--xs h5 mono pill" @click="toggle(2)">W</button>
    </li>
    <li class="tag" :class="{ active: isActive(3) }">
      <button class="btn px-s py-xs my--xs h5 mono pill" @click="toggle(3)">A</button>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'camomile-popup-permissions-edit',

  props: {
    element: Object,
    resource: Object
  },

  computed: {
    permissions () {
      return this.$store.state.cml[`${this.resource.type}s`].list.find(r => r.id === this.resource.id).permissions[`${this.element.type}s`]
    }
  },

  methods: {
    toggle (permission) {
      if (this.isActive(permission)) {
        this.$store.dispatch(`cml/${this.resource.type}s/${this.element.type}PermissionRemove`, {
          [`${this.resource.type}Id`]: this.resource.id,
          [`${this.element.type}Id`]: this.element.id
        })
      } else {
        this.$store.dispatch(`cml/${this.resource.type}s/${this.element.type}PermissionSet`, {
          [`${this.resource.type}Id`]: this.resource.id,
          [`${this.element.type}Id`]: this.element.id,
          permission
        })
      }
    },
    isActive (permission) {
      return this.permissions[this.element.id] === permission
    }
  }
}
</script>
