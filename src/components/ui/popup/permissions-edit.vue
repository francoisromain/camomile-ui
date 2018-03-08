<template>
  <ul class="list-inline">
    <li
      :class="{ active: isActive(1) }"
      class="tag">
      <button
        class="btn px-s py-xs my--xs h5 mono pill"
        @click="toggle(1)">R</button>
    </li>
    <li
      :class="{ active: isActive(2) }"
      class="tag">
      <button
        class="btn px-s py-xs my--xs h5 mono pill"
        @click="toggle(2)">W</button>
    </li>
    <li
      :class="{ active: isActive(3) }"
      class="tag">
      <button
        class="btn px-s py-xs my--xs h5 mono pill"
        @click="toggle(3)">A</button>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'CamomilePopupPermissionsEdit',

  props: {
    element: {
      type: Object,
      default: () => ({})
    },
    type: {
      type: String,
      default: 'default'
    }
  },

  computed: {
    id () {
      return this.$store.state.popup.element.id
    },
    uid () {
      return this.$store.state.popup.config.uid
    },
    permission () {
      return this.$store.state[`${this.type}s`].lists[this.uid].find(
        r => r.id === this.id
      ).permissions[`${this.element.type}s`][this.element.id]
    }
  },

  methods: {
    toggle (permission) {
      if (this.isActive(permission)) {
        this.$store.dispatch(
          `${this.type}s/${this.element.type}PermissionRemove`,
          {
            id: this.id,
            [`${this.element.type}Id`]: this.element.id
          }
        )
      } else {
        this.$store.dispatch(
          `${this.type}s/${this.element.type}PermissionSet`,
          {
            id: this.id,
            [`${this.element.type}Id`]: this.element.id,
            permission
          }
        )
      }
    },
    isActive (permission) {
      return this.permission === permission
    }
  }
};
</script>
