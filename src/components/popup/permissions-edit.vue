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
    type: String
  },

  computed: {
    id () {
      return this.$store.state.cml.popup.element.id
    },
    uid () {
      return this.$store.state.cml.popup.config.uid
    },
    permission () {
      return this.$store.state.cml[`${this.type}s`].lists[this.uid].find(r => r.id === this.id).permissions[`${this.element.type}s`][this.element.id]
    }
  },

  methods: {
    toggle (permission) {
      if (this.isActive(permission)) {
        this.$store.dispatch(`cml/${this.type}s/${this.element.type}PermissionRemove`, {
          [`${this.type}Id`]: this.id,
          [`${this.element.type}Id`]: this.element.id,
          uid: this.uid
        })
      } else {
        this.$store.dispatch(`cml/${this.type}s/${this.element.type}PermissionSet`, {
          [`${this.type}Id`]: this.id,
          [`${this.element.type}Id`]: this.element.id,
          permission,
          uid: this.uid
        })
      }
    },
    isActive (permission) {
      return this.permission === permission
    }
  }
}
</script>
