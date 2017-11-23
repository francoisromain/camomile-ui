import { api } from '../../config'

export default {
  namespaced: true,

  state: {
    list: [],
    id: ''
  },

  actions: {
    add ({ commit, dispatch, rootState, rootGetters }, corpus) {
      commit('cml/sync/start', 'corpusAdd', { root: true })
      return api
        .createCorpus(corpus.name, corpus.description, {})
        .then(r => {
          commit('cml/sync/stop', 'corpusAdd', { root: true })
          const corpu = {
            name: r.name,
            id: r._id,
            permission: 3,
            permissions: {
              users: rootGetters['cml/users/permissions']({}),
              groups: rootGetters['cml/groups/permissions']({})
            },
            description: r.description
          }

          corpu.permissions.users[rootState.cml.user.id] = 3

          commit('add', corpu)
          dispatch('cml/messages/success', 'Corpus added.', { root: true })
          dispatch('corpuSet', corpu.id)

          return r
        })
        .catch(e => {
          commit('cml/sync/stop', 'corpusAdd', { root: true })
          const error = e.response ? e.response.body.error : 'Network error'
          dispatch('cml/messages/error', error, { root: true })

          throw e
        })
    },

    remove ({ commit, dispatch, state, rootState }, corpu) {
      commit('cml/sync/start', 'corpusRemove', { root: true })
      return api
        .deleteCorpus(corpu.id)
        .then(r => {
          commit('cml/sync/stop', 'corpusRemove', { root: true })
          commit('remove', corpu)
          dispatch('cml/messages/success', 'Corpus removed', { root: true })
          if (state.id === corpu.id) {
            commit('cml/medias/reset', null, { root: true })
            commit('cml/layer/reset', null, { root: true })
          }

          return r
        })
        .catch(e => {
          commit('cml/sync/stop', 'corpusRemove', { root: true })
          console.log(e)
          dispatch('cml/messages/error', e, { root: true })

          throw e
        })
    },

    update ({ commit, dispatch, state, rootState }, corpu) {
      commit('cml/sync/start', 'corpusUpdate', { root: true })
      return api
        .updateCorpus(corpu.id, {
          name: corpu.name,
          description: corpu.description
        })
        .then(r => {
          commit('cml/sync/stop', 'corpusUpdate', { root: true })
          // update api to update from server:
          // should receive an object with a permissions property
          // to process with corpuFormat
          commit('update', corpu)
          dispatch('cml/messages/success', 'Corpus updated', { root: true })

          return r
        })
        .catch(e => {
          commit('cml/sync/stop', 'corpusUpdate', { root: true })
          console.log(e)
          dispatch('cml/messages/error', e, { root: true })

          throw e
        })
    },

    list ({ commit, rootState, rootGetters }) {
      commit('cml/sync/start', 'corpusList', { root: true })
      return api
        .getCorpora()
        .then(r => {
          commit('cml/sync/stop', 'corpusList', { root: true })
          const corpus = r.map(c => ({
            name: c.name,
            id: c._id,
            description: c.description,
            permission: rootGetters['cml/user/permission'](c.permissions),
            permissions: {
              users: rootGetters['cml/users/permissions'](
                (c.permissions && c.permissions.users) || {}
              ),
              groups: rootGetters['cml/groups/permissions'](
                (c.permissions && c.permissions.groups) || {}
              )
            }
          }))
          commit('list', corpus)

          return corpus
        })
        .catch(e => {
          commit('cml/sync/stop', 'corpusList', { root: true })
          console.log(e)

          throw e
        })
    },

    groupPermissionSet (
      { commit, dispatch, rootState },
      { corpu, group, permission }
    ) {
      commit('cml/sync/start', 'corpusGroupPermissionSet', { root: true })
      return api
        .setCorpusPermissionsForGroup(corpu.id, group.id, permission)
        .then(p => {
          commit('cml/sync/stop', 'corpusGroupPermissionSet', { root: true })
          commit('groupPermissionsUpdate', {
            corpu,
            id: group.id,
            permission: (p.groups && p.groups[group.id]) || 0
          })
          dispatch('cml/messages/success', 'Group permissions updated', {
            root: true
          })

          if (rootState.cml.user.groupIds.indexOf(group.id) !== -1) {
            dispatch('currentUserIsAdminTest', p)
          }

          return p
        })
        .catch(e => {
          commit('cml/sync/stop', 'corpusGroupPermissionSet', { root: true })
          const error = e.response ? e.response.body.error : 'Network error'
          dispatch('cml/messages/error', error, { root: true })

          throw error
        })
    },

    groupPermissionRemove ({ commit, dispatch, rootState }, { corpu, group }) {
      commit('cml/sync/start', 'corpusGroupPermissionRemove', { root: true })
      return api
        .removeCorpusPermissionsForGroup(corpu.id, group.id)
        .then(p => {
          commit('cml/sync/stop', 'corpusGroupPermissionRemove', {
            root: true
          })
          commit('groupPermissionsUpdate', {
            corpu: corpu,
            id: group.id,
            permission: null
          })
          dispatch('cml/messages/success', 'Group permissions updated', {
            root: true
          })

          if (rootState.cml.user.groupIds.indexOf(group.id) !== -1) {
            dispatch('currentUserIsAdminTest', p)
          }

          return p
        })
        .catch(e => {
          commit('cml/sync/stop', 'corpusGroupPermissionRemove', {
            root: true
          })
          const error = e.response ? e.response.body.error : 'Network error'
          dispatch('cml/messages/error', error, { root: true })

          throw error
        })
    },

    userPermissionSet (
      { commit, dispatch, rootState },
      { corpu, user, permission }
    ) {
      commit('cml/sync/start', 'corpusUserPermissionSet', { root: true })
      return api
        .setCorpusPermissionsForUser(corpu.id, user.id, permission)
        .then(p => {
          commit('cml/sync/stop', 'corpusUserPermissionSet', { root: true })
          commit('userPermissionsUpdate', {
            corpu: corpu,
            id: user.id,
            permission: (p.users && p.users[user.id]) || 0
          })
          dispatch('cml/messages/success', 'User permissions updated', {
            root: true
          })
          if (user.id === rootState.cml.user.id) {
            dispatch('currentUserIsAdminTest', p)
          }

          return p
        })
        .catch(e => {
          commit('cml/sync/stop', 'corpusUserPermissionSet', { root: true })
          const error = e.response ? e.response.body.error : 'Network error'
          dispatch('cml/messages/error', error, { root: true })

          throw error
        })
    },

    userPermissionRemove ({ commit, dispatch, rootState }, { corpu, user }) {
      commit('cml/sync/start', 'corpusUserPermissionRemove', { root: true })
      return api
        .removeCorpusPermissionsForUser(corpu.id, user.id)
        .then(p => {
          commit('cml/sync/stop', 'corpusUserPermissionRemove', {
            root: true
          })
          commit('userPermissionsUpdate', {
            corpu: corpu,
            id: user.id,
            permission: null
          })
          dispatch('cml/messages/success', 'User permissions updated', {
            root: true
          })
          if (user.id === rootState.cml.user.id) {
            dispatch('currentUserIsAdminTest', p)
          }

          return p
        })
        .catch(e => {
          commit('cml/sync/stop', 'corpusUserPermissionRemove', {
            root: true
          })
          const error = e.response ? e.response.body.error : 'Network error'
          dispatch('cml/messages/error', error, { root: true })

          throw error
        })
    },

    currentUserIsAdminTest ({ dispatch, commit, rootGetters }, permissions) {
      if (!rootGetters['cml/user/isAdmin'](permissions)) {
        dispatch('list')
        commit(`cml/popup/close`, null, { root: true })
      }
    },

    corpuSet ({ state, dispatch, commit }, corpuId) {
      commit('corpuSet', corpuId)
      dispatch('cml/medias/list', state.id, { root: true })
      dispatch('cml/layers/list', state.id, { root: true })
    }
  },

  mutations: {
    reset (state) {
      state.list = []
    },

    add (state, corpu) {
      const corpuExisting = state.list.find(c => c.id === corpu.id)
      if (!corpuExisting) {
        state.list.push(corpu)
      }
    },

    update (state, corpu) {
      Object.assign(state.list.find(c => c.id === corpu.id), corpu)
    },

    remove (state, corpu) {
      const index = state.list.findIndex(c => c.id === corpu.id)
      if (index !== -1) {
        state.list.splice(index, 1)
      }
    },

    list (state, corpus) {
      state.list = corpus
    },

    corpuSet (state, corpuId) {
      state.id = corpuId
    },

    groupAdd (state, groupId) {
      state.list.forEach(corpu => {
        corpu.permissions.groups = { ...corpu.permissions.groups, [groupId]: 0 }
      })
    },

    groupRemove (state, groupId) {
      state.list.forEach(corpu => {
        delete corpu.permissions.groups[groupId]
      })
    },

    userAdd (state, userId) {
      state.list.forEach(corpu => {
        corpu.permissions.users = { ...corpu.permissions.users, [userId]: 0 }
      })
    },

    userRemove (state, userId) {
      state.list.forEach(corpu => {
        delete corpu.permissions.users[userId]
      })
    },

    groupPermissionsUpdate (state, { corpu, id, permission }) {
      corpu.permissions.groups[id] = permission
    },

    userPermissionsUpdate (state, { corpu, id, permission }) {
      corpu.permissions.users[id] = permission
    },

    corpuPermissionsUpdate (state, { corpu, permission }) {
      corpu.permission = permission
    }
  }
}
