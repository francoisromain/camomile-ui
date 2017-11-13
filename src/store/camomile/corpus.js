import { messageDispatch, corpusFormat } from './_helpers'

export default {
  namespaced: true,
  state: {
    list: []
  },
  actions: {
    add ({ commit, dispatch, state, rootState }, corpus) {
      return rootState.camomile.api
        .createCorpus(corpus.name, corpus.description)
        .then(r => {
          messageDispatch('success', 'Success: corpus added.', dispatch)
          dispatch('list')
          return r
        })
        .catch(e => {
          console.log(e)
          messageDispatch({ type: 'error', content: e }, dispatch)
          throw e
        })
    },

    remove ({ commit, dispatch, state, rootState }, group) {
      return rootState.camomile.api
        .deleteGroup(group.id)
        .then(r => {
          messageDispatch('success', r, dispatch)
          dispatch('list')
          return r
        })
        .catch(e => {
          console.log(e)
          messageDispatch('error', e, dispatch)
          throw e
        })
    },

    update ({ commit, dispatch, state, rootState }, group) {
      return rootState.camomile.api
        .updateGroup(group.id, { description: group.description })
        .then(r => {
          const group = corpusFormat(r)
          messageDispatch('success', 'Success: group updated.', dispatch)
          dispatch('list')
          return group
        })
        .catch(e => {
          console.log(e)
          messageDispatch('error', e, dispatch)
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
