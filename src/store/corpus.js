import Vue from 'vue'
import api from './_api'

export const state = {
  lists: {},
  actives: {}
}

export const actions = {
  add({ commit, dispatch, rootState, rootGetters }, { element }) {
    dispatch('cml/sync/start', `corpusAdd`, { root: true })
    return api
      .createCorpus(element.name, element.description, {})
      .then(r => {
        dispatch('cml/sync/stop', `corpusAdd`, { root: true })
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
        commit('add', { corpu })
        dispatch('cml/messages/success', 'Corpus added', { root: true })

        return corpu
      })
      .catch(e => {
        dispatch('cml/sync/stop', `corpusAdd`, { root: true })
        dispatch('cml/messages/error', e.message, { root: true })

        throw e
      })
  },

  remove({ commit, dispatch, state }, { id }) {
    dispatch('cml/sync/start', `corpusRemove`, { root: true })
    return api
      .deleteCorpus(id)
      .then(r => {
        dispatch('cml/sync/stop', `corpusRemove`, { root: true })
        commit('remove', { id })
        dispatch('cml/messages/success', 'Corpus removed', { root: true })
        dispatch('setAll', { id })

        return id
      })
      .catch(e => {
        dispatch('cml/sync/stop', `corpusRemove`, { root: true })
        dispatch('cml/messages/error', e.message, { root: true })

        throw e
      })
  },

  update({ commit, dispatch, state }, { element }) {
    dispatch('cml/sync/start', `corpusUpdate`, { root: true })
    return api
      .updateCorpus(element.id, {
        name: element.name,
        description: element.description
      })
      .then(r => {
        dispatch('cml/sync/stop', `corpusUpdate`, { root: true })
        const corpu = Object.assign({}, element)
        corpu.name = r.data.name
        corpu.description = r.data.description || {}
        commit('update', { corpu })
        dispatch('cml/messages/success', 'Corpus updated', { root: true })

        return corpu
      })
      .catch(e => {
        dispatch('cml/sync/stop', `corpusUpdate`, { root: true })
        dispatch('cml/messages/error', e.message, { root: true })

        throw e
      })
  },

  groupPermissionSet(
    { commit, dispatch, rootGetters },
    { id, groupId, permission }
  ) {
    dispatch('cml/sync/start', `corpusGroupPermissionSet`, {
      root: true
    })
    return api
      .setCorpusPermissionsForGroup(id, groupId, permission)
      .then(p => {
        const permissions = p.data
        dispatch('cml/sync/stop', `corpusGroupPermissionSet`, {
          root: true
        })
        commit('groupPermissionsUpdate', {
          id,
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
          dispatch('listAll')
          commit(`cml/popup/close`, null, { root: true })
        }

        return permissions
      })
      .catch(e => {
        dispatch('cml/sync/stop', `corpusGroupPermissionSet`, {
          root: true
        })

        dispatch('cml/messages/error', e.message, { root: true })

        throw e
      })
  },

  groupPermissionRemove({ commit, dispatch, rootGetters }, { id, groupId }) {
    dispatch('cml/sync/start', `corpusGroupPermissionRemove`, {
      root: true
    })
    return api
      .removeCorpusPermissionsForGroup(id, groupId)
      .then(p => {
        const permissions = p.data
        dispatch('cml/sync/stop', `corpusGroupPermissionRemove`, {
          root: true
        })
        commit('groupPermissionsUpdate', { id, groupId, permission: 0 })
        dispatch('cml/messages/success', 'Group permissions updated', {
          root: true
        })

        if (
          rootGetters['cml/user/isInGroup'](groupId) &&
          !rootGetters['cml/user/isAdmin'](permissions)
        ) {
          dispatch('listAll')
          commit(`cml/popup/close`, null, { root: true })
        }

        return permissions
      })
      .catch(e => {
        dispatch('cml/sync/stop', `corpusGroupPermissionRemove`, {
          root: true
        })
        dispatch('cml/messages/error', e.message, { root: true })

        throw e
      })
  },

  userPermissionSet(
    { commit, dispatch, rootGetters },
    { id, userId, permission }
  ) {
    dispatch('cml/sync/start', `corpusUserPermissionSet`, { root: true })
    return api
      .setCorpusPermissionsForUser(id, userId, permission)
      .then(p => {
        const permissions = p.data
        dispatch('cml/sync/stop', `corpusUserPermissionSet`, {
          root: true
        })
        commit('userPermissionsUpdate', {
          id,
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
          dispatch('listAll')
          commit(`cml/popup/close`, null, { root: true })
        }

        return permissions
      })
      .catch(e => {
        dispatch('cml/sync/stop', `corpusUserPermissionSet`, {
          root: true
        })
        dispatch('cml/messages/error', e.message, { root: true })

        throw e
      })
  },

  userPermissionRemove({ commit, dispatch, rootGetters }, { id, userId }) {
    dispatch('cml/sync/start', `corpusUserPermissionRemove`, {
      root: true
    })
    return api
      .removeCorpusPermissionsForUser(id, userId)
      .then(p => {
        const permissions = p.data
        dispatch('cml/sync/stop', `corpusUserPermissionRemove`, {
          root: true
        })
        commit('userPermissionsUpdate', { id, userId, permission: 0 })
        dispatch('cml/messages/success', 'User permissions updated', {
          root: true
        })

        if (
          rootGetters['cml/user/isCurrentUser'](userId) &&
          !rootGetters['cml/user/isAdmin'](permissions)
        ) {
          dispatch('listAll')
          commit(`cml/popup/close`, null, { root: true })
        }

        return permissions
      })
      .catch(e => {
        dispatch('cml/sync/stop', `corpusUserPermissionRemove`, {
          root: true
        })
        dispatch('cml/messages/error', e.message, { root: true })

        throw e
      })
  },

  listAll({ state, dispatch }) {
    Object.keys(state.lists).forEach(uid => {
      dispatch('list', uid)
    })
  },

  list({ commit, dispatch, rootGetters }, uid) {
    dispatch('cml/sync/start', `corpusList-${uid}`, { root: true })
    return api
      .getCorpora()
      .then(r => {
        dispatch('cml/sync/stop', `corpusList-${uid}`, { root: true })
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
        dispatch('cml/sync/stop', `corpusList-${uid}`, { root: true })
        dispatch('cml/messages/error', e.message, { root: true })

        throw e
      })
  },

  setAll({ state, dispatch }, { id }) {
    Object.keys(state.actives).forEach(uid => {
      if (state.actives[uid] === id) {
        dispatch('set', { uid })
      }
    })
  },

  set({ state, getters, dispatch, commit }, { id, uid }) {
    commit('set', { id: id || getters.id(uid), uid })

    // media needs to be set
    // before layers/set triggers annotations/lists
    if (state.actives[uid]) {
      dispatch(
        'cml/medias/list',
        { corpuId: state.actives[uid], corpuUid: uid },
        { root: true }
      )
      dispatch(
        'cml/layers/list',
        { corpuId: state.actives[uid], corpuUid: uid },
        { root: true }
      )
    }
  },

  register({ state, commit }, uid) {
    commit('register', uid)
  }
}

export const getters = {
  id: state => uid =>
    (state.actives[uid] &&
      state.lists[uid].find(c => c.id === state.actives[uid]).id) ||
    (state.lists[uid][0] && state.lists[uid][0].id) ||
    null
}

export const mutations = {
  register(state, uid) {
    Vue.set(state.lists, uid, [])
    Vue.set(state.actives, uid, null)
  },

  resetAll(state) {
    Vue.set(state, 'lists', {})
    Vue.set(state, 'actives', {})
  },

  add(state, { corpu }) {
    Object.keys(state.lists).forEach(uid => {
      const index = state.lists[uid].length
      Vue.set(state.lists[uid], index, corpu)
    })
  },

  update(state, { corpu }) {
    Object.keys(state.lists).forEach(uid => {
      const index = state.lists[uid].findIndex(m => m.id === corpu.id)
      if (index !== -1) {
        Vue.set(state.lists[uid], index, corpu)
      }
    })
  },

  remove(state, { id }) {
    Object.keys(state.lists).forEach(uid => {
      const index = state.lists[uid].findIndex(c => c.id === id)
      if (index !== -1) {
        Vue.delete(state.lists[uid], index)
      }
    })
  },

  groupAdd(state, groupId) {
    Object.keys(state.lists).forEach(uid => {
      state.lists[uid].forEach(c => {
        Vue.set(c.permissions.groups, groupId, 0)
      })
    })
  },

  groupRemove(state, groupId) {
    Object.keys(state.lists).forEach(uid => {
      state.lists[uid].forEach(c => {
        Vue.delete(c.permissions.groups, groupId)
      })
    })
  },

  userAdd(state, userId) {
    Object.keys(state.lists).forEach(uid => {
      state.lists[uid].forEach(c => {
        Vue.set(c.permissions.users, userId, 0)
      })
    })
  },

  userRemove(state, userId) {
    Object.keys(state.lists).forEach(uid => {
      state.lists[uid].forEach(c => {
        Vue.delete(c.permissions.users, userId)
      })
    })
  },

  groupPermissionsUpdate(state, { id, groupId, permission }) {
    Object.keys(state.lists).forEach(uid => {
      const index = state.lists[uid].findIndex(m => m.id === id)
      if (index !== -1) {
        Vue.set(state.lists[uid][index].permissions.groups, groupId, permission)
      }
    })
  },

  userPermissionsUpdate(state, { id, userId, permission }) {
    Object.keys(state.lists).forEach(uid => {
      const index = state.lists[uid].findIndex(m => m.id === id)
      if (index !== -1) {
        Vue.set(state.lists[uid][index].permissions.users, userId, permission)
      }
    })
  },

  list(state, { corpus, uid }) {
    Vue.set(state.lists, uid, corpus)
  },

  set(state, { id, uid }) {
    Vue.set(state.actives, uid, id)
  }
}

export default {
  namespaced: true,
  state,
  actions,
  getters,
  mutations
}
