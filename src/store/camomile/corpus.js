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
        .getCorpora()
        .then(r => {
          const corpus = r.map(corpu => corpusFormat(corpu))
          console.log('corpus', corpus)
          corpus.forEach(corpu => dispatch('permissionsList', corpu))
          commit('listUpdate', corpus)
          return corpus
        })
        .catch(e => {
          console.log(e)
          throw e
        })
    },

    permissionsList ({ commit, dispatch, state, rootState }, corpu) {
      return rootState.camomile.api
        .getCorpusPermissions(corpu.id)
        .then(permissions => {
          commit('permissionsUserListUpdate', { permissions, corpu })
          commit('permissionsGroupListUpdate', { permissions, corpu })
          dispatch('permissionsUsercurrent', corpu)

          return permissions
        })
        .catch(e => {
          const error = errorFormat(e, rootState)
          messageDispatch('error', error, dispatch)
          throw error
        })
    },

    permissionsUsercurrent ({ commit, dispatch, state, rootState }, corpu) {
      const permissionUser =
        Object.keys(corpu.userIds).find(
          userId => userId === rootState.camomile.user.id
        ) && corpu.userIds[rootState.camomile.user.id]
      const permissionGroup = Object.keys(corpu.groupIds).reduce(
        (permission, groupId) => {
          return (
            !!rootState.camomile.user.groupIds[groupId] &&
            corpu.groupIds[groupId] > permission &&
            corpu.groupIds[groupId]
          )
        },
        false
      )

      commit('permissionsUsercurrentSet', {
        permission: Math.max(permissionUser, permissionGroup),
        corpu
      })
    },

    permissionsGroupSet (
      { commit, dispatch, state, rootState },
      { corpu, group, permission }
    ) {
      return rootState.camomile.api
        .setCorpusPermissionsForGroup(corpu.id, group.id, permission)
        .then(permissions => {
          messageDispatch('success', `Group permissions updated`, dispatch)
          commit('permissionsGroupListUpdate', { permissions, corpu })
          return permissions
        })
        .catch(e => {
          const error = errorFormat(e, rootState)
          messageDispatch('error', error, dispatch)
          throw error
        })
    },

    permissionsGroupRemove (
      { commit, dispatch, state, rootState },
      { corpu, group }
    ) {
      return rootState.camomile.api
        .removeCorpusPermissionsForGroup(corpu.id, group.id)
        .then(permissions => {
          messageDispatch('success', 'Group permissions updated', dispatch)
          commit('permissionsGroupListUpdate', { permissions, corpu })
          return permissions
        })
        .catch(e => {
          const error = errorFormat(e, rootState)
          messageDispatch('error', error, dispatch)
          throw error
        })
    },

    permissionsUserSet (
      { commit, dispatch, state, rootState },
      { corpu, user, permission }
    ) {
      return rootState.camomile.api
        .setCorpusPermissionsForUser(corpu.id, user.id, permission)
        .then(permissions => {
          messageDispatch('success', 'User permissions updated', dispatch)
          commit('permissionsUserListUpdate', { permissions, corpu })
          return permissions
        })
        .catch(e => {
          const error = errorFormat(e, rootState)
          messageDispatch('error', error, dispatch)
          throw error
        })
    },

    permissionsUserRemove (
      { commit, dispatch, state, rootState },
      { corpu, user }
    ) {
      return rootState.camomile.api
        .removeCorpusPermissionsForUser(corpu.id, user.id)
        .then(permissions => {
          messageDispatch('success', 'User permissions updated', dispatch)
          commit('permissionsUserListUpdate', { permissions, corpu })
          return permissions
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
    permissionsUserListUpdate (state, { permissions, corpu }) {
      corpu.userIds = permissions.users || {}
    },
    permissionsGroupListUpdate (state, { permissions, corpu }) {
      corpu.groupIds = permissions.groups || {}
    },
    permissionsUsercurrentSet (state, { permission, corpu }) {
      corpu.permission = permission
    }
  }
}
