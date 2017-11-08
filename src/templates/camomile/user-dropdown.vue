<template>
  <div>
    <div @click.self="hide" class="absolute full bg-alpha">
      <div class="container relative">
        <div class="dropdown">
          <div>
            <button @click="settingsShow" class="btn px-m py-s full-x">Settings…</button>
          </div>
          <div>
            <button @click="logout" class="btn px-m py-s full-x mr home">Logout</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapActions } from 'vuex'

export default {
  methods: {
    ...mapMutations({
      hide: 'camomile/user/dropdownToggle',
      settingsShow: 'camomile/user/settingsShow'
    }),
    ...mapActions({
      logout: 'camomile/user/logout'
    })
  }
}
</script>

