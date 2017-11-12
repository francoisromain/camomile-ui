import { message, corpusFormat } from './_helpers'

export default {
  namespaced: true,
  state: {
    list: []
  },
  actions: {
    add ({ commit, dispatch, state, rootState }, group) {
      return rootState.camomile.api
        .createGroup(group.name, group.description)
        .then(r => {
          message(dispatch, {
            type: 'success',
            content: 'Success: group added.'
          })
          dispatch('list')
          return r
        })
        .catch(e => {
          console.log(e)
          message(dispatch, { type: 'error', content: e })
          throw e
        })
    },

    remove ({ commit, dispatch, state, rootState }, group) {
      return rootState.camomile.api
        .deleteGroup(group.id)
        .then(r => {
          message(dispatch, { type: 'success', content: r })
          dispatch('list')
          return r
        })
        .catch(e => {
          console.log(e)
          message(dispatch, { type: 'error', content: e })
          throw e
        })
    },

    update ({ commit, dispatch, state, rootState }, group) {
      return rootState.camomile.api
        .updateGroup(group.id, { description: group.description })
        .then(r => {
          const group = groupFormat(r)
          message(dispatch, {
            type: 'success',
            content: 'Success: group updated.'
          })
          dispatch('list')
          return group
        })
        .catch(e => {
          console.log(e)
          message(dispatch, { type: 'error', content: e })
          throw e
        })
    },

    list ({ commit, dispatch, state, rootState }) {
      return rootState.camomile.api
        .getCorpus()
        .then(r => {
          const corpus = r.map(corpus => corpusFormat(corpus))
          commit('listUpdate', corpus)
          return corpus
        })
        .catch(e => {
          console.log(e)
          throw e
        })
    }
  },
  mutations: {
    listUpdate (state, corpus) {
      state.list = corpus
    }
  }
}
