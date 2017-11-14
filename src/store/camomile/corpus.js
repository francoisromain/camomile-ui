import { messageDispatch, corpusFormat, errorFormat } from './_helpers'

export default {
  namespaced: true,
  state: {
    list: []
  },
  actions: {
    add ({ commit, dispatch, state, rootState }, corpus) {
      return rootState.camomile.api
        .createCorpus(corpus.name, corpus.description, {})
        .then(r => {
          messageDispatch('success', 'Success: corpus added.', dispatch)
          dispatch('list')
          return r
        })
        .catch(e => {
          const error = errorFormat(e, rootState)
          messageDispatch('error', error, dispatch)
          throw e
        })
    },

    remove ({ commit, dispatch, state, rootState }, corpus) {
      return rootState.camomile.api
        .deleteCorpus(corpus.id)
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

    update ({ commit, dispatch, state, rootState }, corpus) {
      return rootState.camomile.api
        .updateCorpus(corpus.id, { description: corpus.description })
        .then(r => {
          const corpus = corpusFormat(r)
          messageDispatch('success', 'Success: corpus updated.', dispatch)
          dispatch('list')
          return corpus
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
    },

    permissionIdsList ({ commit, dispatch, state, rootState }, corpu) {
      return rootState.camomile.api
        .getCorpusPermissions(corpu.id)
        .then(permissions => {
          commit('permissionIdsListUpdate', { permissions, corpu })
          return 'truc'
        })
        .catch(e => {
          const error = errorFormat(e, rootState)
          messageDispatch('error', error, dispatch)
          throw error
        })
    },

    groupPermissionSet (
      { commit, dispatch, state, rootState },
      { corpu, group, permission }
    ) {
      return rootState.camomile.api
        .setCorpusPermissionsForGroup(corpu.id, group.id, permission)
        .then(permissions => {
          messageDispatch('success', permissions, dispatch)
          commit('permissionIdsListUpdate', { permissions, corpu })
          return 'truc'
        })
        .catch(e => {
          const error = errorFormat(e, rootState)
          messageDispatch('error', error, dispatch)
          throw error
        })
    },

    groupPermissionRemove (
      { commit, dispatch, state, rootState },
      { corpu, group }
    ) {
      return rootState.camomile.api
        .removeCorpusPermissionsForGroup(corpu.id, group.id)
        .then(permissions => {
          messageDispatch('success', permissions, dispatch)
          commit('permissionIdsListUpdate', { permissions, corpu })
          return 'truc'
        })
        .catch(e => {
          const error = errorFormat(e, rootState)
          messageDispatch('error', error, dispatch)
          throw error
        })
    },

    userPermissionSet (
      { commit, dispatch, state, rootState },
      { corpu, user, permission }
    ) {
      return rootState.camomile.api
        .setCorpusPermissionsForUser(corpu.id, user.id, permission)
        .then(permissions => {
          messageDispatch('success', permissions, dispatch)
          commit('permissionIdsListUpdate', { permissions, corpu })
          return 'truc'
        })
        .catch(e => {
          const error = errorFormat(e, rootState)
          messageDispatch('error', error, dispatch)
          throw error
        })
    },

    userPermissionRemove (
      { commit, dispatch, state, rootState },
      { corpu, user }
    ) {
      return rootState.camomile.api
        .removeCorpusPermissionsForUser(corpu.id, user.id)
        .then(permissions => {
          messageDispatch('success', permissions, dispatch)
          commit('permissionIdsListUpdate', { permissions, corpu })
          return 'truc'
        })
        .catch(e => {
          const error = errorFormat(e, rootState)
          messageDispatch('error', error, dispatch)
          throw error
        })
    }
  },
  mutations: {
    listUpdate (state, corpus) {
      state.list = corpus
    },
    permissionIdsListUpdate (state, { permissions, corpu }) {
      corpu.userIds = permissions.users || {}
      corpu.groupIds = permissions.groups || {}
    }
  }
}
