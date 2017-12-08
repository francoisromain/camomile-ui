import Vue from 'vue'
import api from './_api'

export const state = {
  list: [],
  id: ''
}

export const actions = {
  add ({ commit, dispatch, rootState, rootGetters }, corpus) {
    commit('cml/sync/start', 'corpusAdd', { root: true })
    return api
      .createCorpus(corpus.name, corpus.description, {})
      .then(r => {
        commit('cml/sync/stop', 'corpusAdd', { root: true })
        const corpu = {
          name: r.data.name,
          id: r.data._id,
          permission: 3,
          permissions: {
            users: rootGetters['cml/users/permissions']({}),
            groups: rootGetters['cml/groups/permissions']({})
          },
          description: r.data.description || {}
        }

        corpu.permissions.users[rootState.cml.user.id] = 3

        commit('add', corpu)
        dispatch('cml/messages/success', 'Corpus added', { root: true })
        dispatch('set', corpu.id)

        return corpu
      })
      .catch(e => {
        commit('cml/sync/stop', 'corpusAdd', { root: true })
        const error = e.response ? e.response.body.error : 'Network error'
        dispatch('cml/messages/error', error, { root: true })

        throw error
      })
  },

  remove ({ commit, dispatch, state }, corpu) {
    commit('cml/sync/start', 'corpusRemove', { root: true })
    return api
      .deleteCorpus(corpu.id)
      .then(r => {
        commit('cml/sync/stop', 'corpusRemove', { root: true })
        commit('remove', corpu.id)
        dispatch('cml/messages/success', 'Corpus removed', { root: true })
        if (state.id === corpu.id) {
          dispatch('set')
        }

        return corpu.id
      })
      .catch(e => {
        commit('cml/sync/stop', 'corpusRemove', { root: true })
        const error = e.response ? e.response.body.error : 'Network error'
        dispatch('cml/messages/error', error, { root: true })

        throw error
      })
  },

  update ({ commit, dispatch, state }, corpu) {
    commit('cml/sync/start', 'corpusUpdate', { root: true })
    return api
      .updateCorpus(corpu.id, {
        name: corpu.name,
        description: corpu.description
      })
      .then(r => {
        commit('cml/sync/stop', 'corpusUpdate', { root: true })
        corpu.name = r.data.name
        corpu.description = r.data.description || {}
        commit('update', corpu)
        dispatch('cml/messages/success', 'Corpus updated', { root: true })

        return r
      })
      .catch(e => {
        commit('cml/sync/stop', 'corpusUpdate', { root: true })
        const error = e.response ? e.response.body.error : 'Network error'
        dispatch('cml/messages/error', error, { root: true })

        throw error
      })
  },

  list ({ commit, dispatch, rootGetters }) {
    commit('cml/sync/start', 'corpusList', { root: true })
    return api
      .getCorpora()
      .then(r => {
        commit('cml/sync/stop', 'corpusList', { root: true })
        const corpus = r.data.map(c => ({
          name: c.name,
          id: c._id,
          description: c.description || {},
          permission: rootGetters['cml/user/permission'](c.permissions || {}),
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
        dispatch('set')

        return corpus
      })
      .catch(e => {
        commit('cml/sync/stop', 'corpusList', { root: true })
        const error = e.response ? e.response.body.error : 'Network error'
        dispatch('cml/messages/error', error, { root: true })

        throw error
      })
  },

  groupPermissionSet (
    { commit, dispatch, rootGetters },
    { corpuId, groupId, permission }
  ) {
    commit('cml/sync/start', 'corpusGroupPermissionSet', { root: true })
    return api
      .setCorpusPermissionsForGroup(corpuId, groupId, permission)
      .then(p => {
        const permissions = p.data
        commit('cml/sync/stop', 'corpusGroupPermissionSet', { root: true })
        commit('groupPermissionsUpdate', {
          corpuId,
          groupId,
          permission: (permissions.groups && permissions.groups[groupId]) || 0
        })
        dispatch('cml/messages/success', 'Group permissions updated', {
          root: true
        })

        if (
          rootGetters['cml/user/isInGroup'](groupId) &&
          !rootGetters['cml/user/isAdmin'](permissions)
        ) {
          dispatch('list')
          commit(`cml/popup/close`, null, { root: true })
        }

        return permissions
      })
      .catch(e => {
        commit('cml/sync/stop', 'corpusGroupPermissionSet', { root: true })
        const error = e.response ? e.response.body.error : 'Network error'
        dispatch('cml/messages/error', error, { root: true })

        throw error
      })
  },

  groupPermissionRemove (
    { commit, dispatch, rootGetters },
    { corpuId, groupId }
  ) {
    commit('cml/sync/start', 'corpusGroupPermissionRemove', { root: true })
    return api
      .removeCorpusPermissionsForGroup(corpuId, groupId)
      .then(p => {
        const permissions = p.data
        commit('cml/sync/stop', 'corpusGroupPermissionRemove', {
          root: true
        })
        commit('groupPermissionsUpdate', { corpuId, groupId, permission: 0 })
        dispatch('cml/messages/success', 'Group permissions updated', {
          root: true
        })

        if (
          rootGetters['cml/user/isInGroup'](groupId) &&
          !rootGetters['cml/user/isAdmin'](permissions)
        ) {
          dispatch('list')
          commit(`cml/popup/close`, null, { root: true })
        }

        return permissions
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
    { commit, dispatch, rootGetters },
    { corpuId, userId, permission }
  ) {
    commit('cml/sync/start', 'corpusUserPermissionSet', { root: true })
    return api
      .setCorpusPermissionsForUser(corpuId, userId, permission)
      .then(p => {
        const permissions = p.data
        commit('cml/sync/stop', 'corpusUserPermissionSet', { root: true })
        commit('userPermissionsUpdate', {
          corpuId,
          userId,
          permission: (permissions.users && permissions.users[userId]) || 0
        })
        dispatch('cml/messages/success', 'User permissions updated', {
          root: true
        })
        if (
          rootGetters['cml/user/isCurrentUser'](userId) &&
          !rootGetters['cml/user/isAdmin'](permissions)
        ) {
          dispatch('list')
          commit(`cml/popup/close`, null, { root: true })
        }

        return permissions
      })
      .catch(e => {
        commit('cml/sync/stop', 'corpusUserPermissionSet', { root: true })
        const error = e.response ? e.response.body.error : 'Network error'
        dispatch('cml/messages/error', error, { root: true })

        throw error
      })
  },

  userPermissionRemove ({ commit, dispatch, rootGetters }, { corpuId, userId }) {
    commit('cml/sync/start', 'corpusUserPermissionRemove', { root: true })
    return api
      .removeCorpusPermissionsForUser(corpuId, userId)
      .then(p => {
        const permissions = p.data
        commit('cml/sync/stop', 'corpusUserPermissionRemove', { root: true })
        commit('userPermissionsUpdate', { corpuId, userId, permission: 0 })
        dispatch('cml/messages/success', 'User permissions updated', {
          root: true
        })
        if (
          rootGetters['cml/user/isCurrentUser'](userId) &&
          !rootGetters['cml/user/isAdmin'](permissions)
        ) {
          dispatch('list')
          commit(`cml/popup/close`, null, { root: true })
        }

        return permissions
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

  set ({ state, getters, dispatch, commit }, corpuId) {
    commit('set', getters.id(corpuId))
    if (state.id) {
      dispatch('cml/medias/list', state.id, { root: true })
      dispatch('cml/layers/list', state.id, { root: true })
    } else {
      commit('cml/medias/reset', null, { root: true })
      commit('cml/layers/reset', null, { root: true })
    }
  }
}

export const getters = {
  id: state => id => {
    return (
      id ||
      (state.list.map(c => c.id).indexOf(state.id) !== -1 && state.id) ||
      (state.list[0] && state.list[0].id) ||
      null
    )
  }
}

export const mutations = {
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

  remove (state, corpuId) {
    state.list = state.list.filter(c => c.id !== corpuId)
  },

  list (state, corpus) {
    state.list = corpus
  },

  set (state, corpuId) {
    state.id = corpuId
  },

  groupAdd (state, groupId) {
    state.list.forEach(corpu => {
      Vue.set(corpu.permissions.groups, groupId, 0)
    })
  },

  groupRemove (state, groupId) {
    state.list.forEach(corpu => {
      delete corpu.permissions.groups[groupId]
    })
  },

  userAdd (state, userId) {
    state.list.forEach(corpu => {
      Vue.set(corpu.permissions.users, userId, 0)
    })
  },

  userRemove (state, userId) {
    state.list.forEach(corpu => {
      delete corpu.permissions.users[userId]
    })
  },

  groupPermissionsUpdate (state, { corpuId, groupId, permission }) {
    const corpu = state.list.find(c => c.id === corpuId)
    corpu.permissions.groups[groupId] = permission
  },

  userPermissionsUpdate (state, { corpuId, userId, permission }) {
    const corpu = state.list.find(c => c.id === corpuId)
    corpu.permissions.users[userId] = permission
  }

  // corpuPermissionsUpdate (state, { corpu, permission }) {
  //   corpu.permission = permission
  // }
}

export default {
  namespaced: true,
  state,
  actions,
  getters,
  mutations
}
