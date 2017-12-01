export const state = {
  list: []
}

export const actions = {
  all ({ state, dispatch, commit, rootState }) {
    Promise.all([
      ...['users', 'groups', 'corpus'].map(
        type =>
          new Promise((resolve, reject) =>
            dispatch(`cml/${type}/list`, {}, { root: true })
              .then(r => resolve(r))
              .catch(e => reject(e))
          )
      ),
      ...['medias', 'layers'].map(
        type =>
          new Promise((resolve, reject) =>
            dispatch(`cml/${type}/list`, rootState.cml.corpus.id, {
              root: true
            })
              .then(r => resolve(r))
              .catch(e => reject(e))
          )
      )
    ]).then(v => {
      dispatch('cml/messages/success', 'Synced with server', { root: true })
    })
  }
}

export const getters = {
  active: state => {
    return state.list.length
  }
}

export const mutations = {
  start (state, name) {
    state.list.push(name)
  },

  stop (state, name) {
    state.list = state.list.filter(n => n !== name)
  }
}

export default {
  namespaced: true,
  state,
  actions,
  getters,
  mutations
}
