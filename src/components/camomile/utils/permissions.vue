<template>
  <ul class="list-inline">
    <li class="tag" :class="{ active: isActive(1) }">
      <button class="btn px-s py-xs h5 pill" @click="toggle(1)">R</button>
    </li>
    <li class="tag" :class="{ active: isActive(2) }">
      <button class="btn px-s py-xs h5 pill" @click="toggle(2)">W</button>
    </li>
    <li class="tag" :class="{ active: isActive(3) }">
      <button class="btn px-s py-xs h5 pill" @click="toggle(3)">A</button>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'camomile-permissions',
  props: {
    element: Object,
    config: Object
  },
  methods: {
    toggle (permission) {
      if (this.isActive(permission)) {
        this.$store.dispatch(this.config.permissionRemoveAction, { [this.config.resourceType]: this.config.resource, [this.config.elementType]: this.element })
      } else {
        this.$store.dispatch(this.config.permissionSetAction, { [this.config.resourceType]: this.config.resource, [this.config.elementType]: this.element, permission: permission })
      }
    },
    isActive (permission) {
      return this.config.resource[`${this.config.elementType}Ids`].hasOwnProperty(this.element.id) && this.config.resource[`${this.config.elementType}Ids`][this.element.id] === permission
    }
  }
}
</script>
