export const state = {
  list: []
}

export const actions = {
  all ({ dispatch }) {
    dispatch(`cml/set`, {}, { root: true }).then(r => {
      dispatch('cml/messages/success', 'Synced with server', { root: true })
    })
  },

  start ({ state }, name) {
    state.list.push(name)
  },

  stop ({ state }, name) {
    state.list = state.list.filter(n => n !== name)
  }
}

export const getters = {
  active: state => {
    return state.list.length
  }
}

export default {
  namespaced: true,
  state,
  actions,
  getters
}
