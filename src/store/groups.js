import api from './_api'
import { groupFormat } from './_helpers'

export const state = {
  list: []
}

export const actions = {
  add ({ commit, dispatch, state, rootState }, group) {
    commit('cml/sync/start', 'groupsAdd', { root: true })
    return api
      .createGroup(group.name, group.description)
      .then(r => {
        commit('cml/sync/stop', 'groupsAdd', { root: true })
        const group = groupFormat(r)
        commit('add', group)
        commit('cml/corpus/groupAdd', group.id, { root: true })
        dispatch('cml/messages/success', 'Group added', { root: true })

        return group
      })
      .catch(e => {
        commit('cml/sync/stop', 'groupsAdd', { root: true })
        const error = e.response ? e.response.body.error : 'Network error'
        dispatch('cml/messages/error', error, { root: true })

        throw error
      })
  },

  remove ({ commit, dispatch, state, rootState }, group) {
    commit('cml/sync/start', 'groupsRemove', { root: true })
    return api
      .deleteGroup(group.id)
      .then(r => {
        commit('cml/sync/stop', 'groupsRemove', { root: true })
        commit('remove', group.id)
        commit('cml/corpus/groupRemove', group.id, { root: true })
        dispatch('cml/messages/success', 'Group removed', { root: true })

        return group.id
      })
      .catch(e => {
        commit('cml/sync/stop', 'groupsRemove', { root: true })
        const error = e.response ? e.response.body.error : 'Network error'
        dispatch('cml/messages/error', error, { root: true })

        throw error
      })
  },

  update ({ commit, dispatch, state, rootState }, group) {
    commit('cml/sync/start', 'groupsUpdate', { root: true })
    return api
      .updateGroup(group.id, { description: group.description })
      .then(r => {
        commit('cml/sync/stop', 'groupsUpdate', { root: true })
        const group = groupFormat(r)
        commit('update', group)
        dispatch('cml/messages/success', 'Group updated', { root: true })

        return group
      })
      .catch(e => {
        commit('cml/sync/stop', 'groupsUpdate', { root: true })
        const error = e.response ? e.response.body.error : 'Network error'
        dispatch('cml/messages/error', error, { root: true })

        throw error
      })
  },

  list ({ commit, dispatch, state, rootState }) {
    commit('cml/sync/start', 'groupsList', { root: true })
    return api
      .getGroups()
      .then(r => {
        commit('cml/sync/stop', 'groupsList', { root: true })
        const groups = r.map(group => groupFormat(group))
        commit('list', groups)

        return groups
      })
      .catch(e => {
        commit('cml/sync/stop', 'groupsList', { root: true })
        console.log(e)

        throw e
      })
  },

  userAdd ({ commit, dispatch, state, rootState }, { userId, group }) {
    commit('cml/sync/start', 'groupsUserAdd', { root: true })
    return api
      .addUserToGroup(userId, group.id)
      .then(r => {
        commit('cml/sync/stop', 'groupsUserAdd', { root: true })
        const group = groupFormat(r)
        commit('update', group)
        dispatch('cml/messages/success', 'User added to group', {
          root: true
        })
        if (userId === rootState.cml.user.id) {
          commit('cml/user/groupAdd', group.id, { root: true })
          dispatch('cml/corpus/list', null, {
            root: true
          })
        }

        return group
      })
      .catch(e => {
        commit('cml/sync/stop', 'groupsUserAdd', { root: true })
        const error = e.response ? e.response.body.error : 'Network error'
        dispatch('cml/messages/error', error, { root: true })

        throw error
      })
  },

  userRemove ({ commit, dispatch, state, rootState }, { userId, group }) {
    commit('cml/sync/start', 'groupsUserRemove', { root: true })
    return api
      .removeUserFromGroup(userId, group.id)
      .then(r => {
        commit('cml/sync/stop', 'groupsUserRemove', { root: true })
        const group = groupFormat(r)
        commit('update', group)
        dispatch('cml/messages/success', 'User removed from group', {
          root: true
        })
        if (userId === rootState.cml.user.id) {
          commit('cml/user/groupRemove', group.id, { root: true })
          dispatch('cml/corpus/list', null, {
            root: true
          })
        }

        return group
      })
      .catch(e => {
        commit('cml/sync/stop', 'groupsUserRemove', { root: true })
        const error = e.response ? e.response.body.error : 'Network error'
        dispatch('cml/messages/error', error, { root: true })

        throw error
      })
  }
}

export const getters = {
  permissions: state => permissions => {
    return state.list.reduce(
      (p, group) =>
        Object.assign(p, {
          [group.id]:
            permissions && permissions[group.id] ? permissions[group.id] : 0
        }),
      {}
    )
  }
}

export const mutations = {
  reset (state) {
    state.list = []
  },

  add (state, group) {
    state.list.push(group)
  },

  update (state, group) {
    Object.assign(state.list.find(g => g.id === group.id), group)
  },

  remove (state, groupId) {
    state.list = state.list.filter(g => g.id !== groupId)
  },

  list (state, groups) {
    state.list = groups
  }
}

export default {
  namespaced: true,
  state,
  actions,
  getters,
  mutations
}
