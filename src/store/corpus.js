import Vue from 'vue'
import api from './_api'

export const state = {
  lists: {},
  actives: {}
}

export const actions = {
  add ({ commit, dispatch, rootState, rootGetters }, { element, uid }) {
    commit('cml/sync/start', `corpusAdd-${uid}`, { root: true })
    return api
      .createCorpus(element.name, element.description, {})
      .then(r => {
        commit('cml/sync/stop', `corpusAdd-${uid}`, { root: true })
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

        commit('add', { corpu, uid })
        dispatch('cml/messages/success', 'Corpus added', { root: true })
        dispatch('set', { corpuId: corpu.id, uid })

        return corpu
      })
      .catch(e => {
        commit('cml/sync/stop', `corpusAdd-${uid}`, { root: true })
        const error = e.response ? e.response.body.error : 'Network error'
        dispatch('cml/messages/error', error, { root: true })

        throw error
      })
  },

  remove ({ commit, dispatch, state }, { id, uid }) {
    commit('cml/sync/start', `corpusRemove-${uid}`, { root: true })
    return api
      .deleteCorpus(id)
      .then(r => {
        commit('cml/sync/stop', `corpusRemove-${uid}`, { root: true })
        commit('remove', { corpuId: id, uid })
        dispatch('cml/messages/success', 'Corpus removed', { root: true })
        if (state.actives[uid] === id) {
          dispatch('set', { uid })
        }

        return id
      })
      .catch(e => {
        commit('cml/sync/stop', `corpusRemove-${uid}`, { root: true })
        const error = e.response ? e.response.body.error : 'Network error'
        dispatch('cml/messages/error', error, { root: true })

        throw error
      })
  },

  update ({ commit, dispatch, state }, { element, uid }) {
    commit('cml/sync/start', `corpusUpdate-${uid}`, { root: true })
    return api
      .updateCorpus(element.id, {
        name: element.name,
        description: element.description
      })
      .then(r => {
        commit('cml/sync/stop', `corpusUpdate-${uid}`, { root: true })
        const corpu = Object.assign({}, element)
        corpu.name = r.data.name
        corpu.description = r.data.description || {}
        commit('update', { corpu, uid })
        dispatch('cml/messages/success', 'Corpus updated', { root: true })

        return corpu
      })
      .catch(e => {
        commit('cml/sync/stop', `corpusUpdate-${uid}`, { root: true })
        const error = e.response ? e.response.body.error : 'Network error'
        dispatch('cml/messages/error', error, { root: true })

        throw error
      })
  },

  listAll ({ dispatch }) {
    dispatch('list', 'default')
  },

  list ({ commit, dispatch, rootGetters }, uid) {
    commit('cml/sync/start', `corpusList-${uid}`, { root: true })
    return api
      .getCorpora()
      .then(r => {
        commit('cml/sync/stop', `corpusList-${uid}`, { root: true })
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
        commit('list', { corpus, uid })
        dispatch('set', { uid })

        return corpus
      })
      .catch(e => {
        commit('cml/sync/stop', `corpusList-${uid}`, { root: true })
        const error = e.response ? e.response.body.error : 'Network error'
        dispatch('cml/messages/error', error, { root: true })

        throw error
      })
  },

  groupPermissionSet (
    { commit, dispatch, rootGetters },
    { corpuId, groupId, permission, uid }
  ) {
    commit('cml/sync/start', `corpusGroupPermissionSet-${uid}`, { root: true })
    return api
      .setCorpusPermissionsForGroup(corpuId, groupId, permission)
      .then(p => {
        const permissions = p.data
        commit('cml/sync/stop', `corpusGroupPermissionSet-${uid}`, {
          root: true
        })
        commit('groupPermissionsUpdate', {
          corpuId,
          groupId,
          permission: (permissions.groups && permissions.groups[groupId]) || 0,
          uid
        })
        dispatch('cml/messages/success', 'Group permissions updated', {
          root: true
        })

        if (
          rootGetters['cml/user/isInGroup'](groupId) &&
          !rootGetters['cml/user/isAdmin'](permissions)
        ) {
          dispatch('list', uid)
          commit(`cml/popup/close`, null, { root: true })
        }

        return permissions
      })
      .catch(e => {
        commit('cml/sync/stop', `corpusGroupPermissionSet-${uid}`, {
          root: true
        })
        const error = e.response ? e.response.body.error : 'Network error'
        dispatch('cml/messages/error', error, { root: true })

        throw error
      })
  },

  groupPermissionRemove (
    { commit, dispatch, rootGetters },
    { corpuId, groupId, uid }
  ) {
    commit('cml/sync/start', `corpusGroupPermissionRemove-${uid}`, {
      root: true
    })
    return api
      .removeCorpusPermissionsForGroup(corpuId, groupId)
      .then(p => {
        const permissions = p.data
        commit('cml/sync/stop', `corpusGroupPermissionRemove-${uid}`, {
          root: true
        })
        commit('groupPermissionsUpdate', {
          corpuId,
          groupId,
          permission: 0,
          uid
        })
        dispatch('cml/messages/success', 'Group permissions updated', {
          root: true
        })

        if (
          rootGetters['cml/user/isInGroup'](groupId) &&
          !rootGetters['cml/user/isAdmin'](permissions)
        ) {
          dispatch('list', uid)
          commit(`cml/popup/close`, null, { root: true })
        }

        return permissions
      })
      .catch(e => {
        commit('cml/sync/stop', `corpusGroupPermissionRemove-${uid}`, {
          root: true
        })
        const error = e.response ? e.response.body.error : 'Network error'
        dispatch('cml/messages/error', error, { root: true })

        throw error
      })
  },

  userPermissionSet (
    { commit, dispatch, rootGetters },
    { corpuId, userId, permission, uid }
  ) {
    commit('cml/sync/start', `corpusUserPermissionSet-${uid}`, { root: true })
    return api
      .setCorpusPermissionsForUser(corpuId, userId, permission)
      .then(p => {
        const permissions = p.data
        commit('cml/sync/stop', `corpusUserPermissionSet-${uid}`, {
          root: true
        })
        commit('userPermissionsUpdate', {
          corpuId,
          userId,
          permission: (permissions.users && permissions.users[userId]) || 0,
          uid
        })
        dispatch('cml/messages/success', 'User permissions updated', {
          root: true
        })

        if (
          rootGetters['cml/user/isCurrentUser'](userId) &&
          !rootGetters['cml/user/isAdmin'](permissions)
        ) {
          dispatch('list', uid)
          commit(`cml/popup/close`, null, { root: true })
        }

        return permissions
      })
      .catch(e => {
        commit('cml/sync/stop', `corpusUserPermissionSet-${uid}`, {
          root: true
        })
        const error = e.response ? e.response.body.error : 'Network error'
        dispatch('cml/messages/error', error, { root: true })

        throw error
      })
  },

  userPermissionRemove (
    { commit, dispatch, rootGetters },
    { corpuId, userId, uid }
  ) {
    commit('cml/sync/start', `corpusUserPermissionRemove-${uid}`, {
      root: true
    })
    return api
      .removeCorpusPermissionsForUser(corpuId, userId)
      .then(p => {
        const permissions = p.data
        commit('cml/sync/stop', `corpusUserPermissionRemove-${uid}`, {
          root: true
        })
        commit('userPermissionsUpdate', { corpuId, userId, permission: 0, uid })
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
        commit('cml/sync/stop', `corpusUserPermissionRemove-${uid}`, {
          root: true
        })
        const error = e.response ? e.response.body.error : 'Network error'
        dispatch('cml/messages/error', error, { root: true })

        throw error
      })
  },

  set ({ state, getters, dispatch, commit }, { corpuId, uid }) {
    commit('set', { corpuId: corpuId || getters.id(uid), uid })
    if (state.actives[uid]) {
      dispatch(
        'cml/medias/list',
        { corpuId: state.actives[uid], uid },
        { root: true }
      )
      dispatch(
        'cml/layers/list',
        { corpuId: state.actives[uid], uid },
        { root: true }
      )
    } else {
      commit('cml/medias/reset', null, { root: true })
      commit('cml/layers/reset', null, { root: true })
    }
  }
}

export const getters = {
  id: state => uid =>
    (state.actives[uid] &&
      state.lists[uid].map(c => c.id).indexOf(state.actives[uid]) !== -1 &&
      state.actives[uid]) ||
    (state.lists[uid][0] && state.lists[uid][0].id) ||
    null
}

export const mutations = {
  reset (state) {
    state.lists = {}
    state.actives = {}
  },

  add (state, { corpu, uid }) {
    const index = state.lists[uid].length
    Vue.set(state.lists[uid], index, corpu)
  },

  update (state, { corpu, uid }) {
    const index = state.lists[uid].findIndex(m => m.id === corpu.id)
    if (index !== -1) {
      Vue.set(state.lists[uid], index, corpu)
    }
  },

  remove (state, { corpuId, uid }) {
    const index = state.lists[uid].findIndex(m => m.id === corpuId)
    if (index !== -1) {
      Vue.delete(state.lists[uid], index)
    }
  },

  list (state, { corpus, uid }) {
    Vue.set(state.lists, uid, corpus)
  },

  set (state, { corpuId, uid }) {
    Vue.set(state.actives, uid, corpuId)
  },

  groupAdd (state, groupId) {
    Object.keys(state.lists).forEach(uid => {
      state.lists[uid].forEach(c => {
        Vue.set(c.permissions.groups, groupId, 0)
      })
    })
  },

  groupRemove (state, groupId) {
    Object.keys(state.lists).forEach(uid => {
      state.lists[uid].forEach(c => {
        Vue.delete(c.permissions.groups, groupId)
      })
    })
  },

  userAdd (state, userId) {
    Object.keys(state.lists).forEach(uid => {
      state.lists[uid].forEach(c => {
        Vue.set(c.permissions.users, userId, 0)
      })
    })
  },

  userRemove (state, userId) {
    Object.keys(state.lists).forEach(uid => {
      state.lists[uid].forEach(c => {
        Vue.delete(c.permissions.users, userId)
      })
    })
  },

  groupPermissionsUpdate (state, { corpuId, groupId, permission, uid }) {
    const index = state.lists[uid].findIndex(m => m.id === corpuId)
    if (index !== -1) {
      Vue.set(state.lists[uid][index].permissions.groups, groupId, permission)
    }
  },

  userPermissionsUpdate (state, { corpuId, userId, permission, uid }) {
    const index = state.lists[uid].findIndex(m => m.id === corpuId)
    if (index !== -1) {
      Vue.set(state.lists[uid][index].permissions.users, userId, permission)
    }
  }
}

export default {
  namespaced: true,
  state,
  actions,
  getters,
  mutations
}
