export default {
  namespaced: true,
  state: {
    userPopup: {
      visible: false,
      config: {}
    },
    userDropdown: {
      visible: false
    }
  },
  actions: {
    userReset ({ commit }) {
      console.log('userReset')
      commit('userDropdownHide')
      commit('userPopupHide')
    }
  },
  mutations: {
    userPopupShow (
      state,
      config = {
        user: { role: 'user' },
        title: '',
        closeBtn: false,
        commit: ''
      }
    ) {
      state.userDropdown.visible = false
      state.userPopup = {
        visible: true,
        config: config
      }
    },
    userPopupHide (state) {
      state.userPopup = {
        visible: false,
        config: {}
      }
    },
    userDropdownHide (state) {
      state.userDropdown.visible = false
    },
    userDropdownToggle (state) {
      state.userDropdown.visible = !state.userDropdown.visible
    }
  }
}
