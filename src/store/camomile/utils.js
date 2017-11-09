export default {
  namespaced: true,
  state: {
    userEditPopup: {
      visible: false,
      config: {}
    },
    userRemovePopup: {
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
      commit('userEditPopupHide')
    }
  },
  mutations: {
    userEditPopupShow (
      state,
      config = {
        user: { role: 'user' },
        title: 'Edit user',
        closeBtn: true,
        commit: 'camomile/utils/userEditPopupHide'
      }
    ) {
      state.userDropdown.visible = false
      state.userEditPopup = {
        visible: true,
        config: config
      }
    },
    userRemovePopupShow (
      state,
      config = {
        user: {},
        title: 'Remove user',
        closeBtn: true,
        commit: 'camomile/utils/userRemovePopupHide'
      }
    ) {
      console.log('remove popup')
      state.userRemovePopup = {
        visible: true,
        config: config
      }
    },
    userEditPopupHide (state) {
      state.userEditPopup = {
        visible: false,
        config: {}
      }
    },
    userRemovePopupHide (state) {
      state.userRemovePopup = {
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
