import { messageDispatch } from './_helpers'

export default {
  namespaced: true,

  state: {
    list: []
  },

  actions: {
    all ({ state, dispatch, commit, rootState }) {
      Promise.all([
        new Promise((resolve, reject) =>
          dispatch('cml/users/list', {}, { root: true })
            .then(r => resolve(r))
            .catch(e => reject(e))
        ),
        new Promise((resolve, reject) =>
          dispatch('cml/groups/list', {}, { root: true })
            .then(r => resolve(r))
            .catch(e => reject(e))
        ),
        new Promise((resolve, reject) =>
          dispatch('cml/corpus/list', {}, { root: true })
            .then(r => resolve(r))
            .catch(e => reject(e))
        ),
        new Promise((resolve, reject) =>
          dispatch('cml/medias/list', rootState.cml.corpus.selected, {
            root: true
          })
            .then(r => resolve(r))
            .catch(e => reject(e))
        )
      ]).then(v => {
        messageDispatch('success', 'Synced with server', dispatch)
      })
    }
  },

  getters: {
    active: state => {
      return state.list.length
    }
  },

  mutations: {
    start (state, name) {
      state.list.push(name)
    },

    stop (state, name) {
      state.list = state.list.filter(n => n !== name)
    }
  }
}
