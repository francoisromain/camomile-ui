import Vue from 'vue'
import api from './_api'
import { groupFormat } from './_helpers'

export const state = {
  list: []
}

export const actions = {
  add ({ commit, dispatch, state, rootState }, { element }) {
    dispatch('cml/sync/start', 'groupsAdd', { root: true })
    return api
      .createGroup(element.name, element.description)
      .then(r => {
        dispatch('cml/sync/stop', 'groupsAdd', { root: true })
        const group = groupFormat(r.data)
        commit('add', group)
        commit('cml/corpus/groupAdd', group.id, { root: true })
        dispatch('cml/messages/success', 'Group added', { root: true })

        return group
      })
      .catch(e => {
        dispatch('cml/sync/stop', 'groupsAdd', { root: true })
        const error = e.response ? e.response.body.error : 'Network error'
        dispatch('cml/messages/error', error, { root: true })

        throw error
      })
  },

  remove ({ commit, dispatch, state, rootState }, { id }) {
    dispatch('cml/sync/start', 'groupsRemove', { root: true })
    return api
      .deleteGroup(id)
      .then(r => {
        dispatch('cml/sync/stop', 'groupsRemove', { root: true })
        commit('remove', id)
        commit('cml/corpus/groupRemove', id, { root: true })
        dispatch('cml/messages/success', 'Group removed', { root: true })

        return id
      })
      .catch(e => {
        dispatch('cml/sync/stop', 'groupsRemove', { root: true })
        const error = e.response ? e.response.body.error : 'Network error'
        dispatch('cml/messages/error', error, { root: true })

        throw error
      })
  },

  update ({ commit, dispatch, state, rootState }, { element }) {
    dispatch('cml/sync/start', 'groupsUpdate', { root: true })
    return api
      .updateGroup(element.id, { description: element.description })
      .then(r => {
        dispatch('cml/sync/stop', 'groupsUpdate', { root: true })
        const group = groupFormat(r.data)
        commit('update', group)
        dispatch('cml/messages/success', 'Group updated', { root: true })

        return group
      })
      .catch(e => {
        dispatch('cml/sync/stop', 'groupsUpdate', { root: true })
        const error = e.response ? e.response.body.error : 'Network error'
        dispatch('cml/messages/error', error, { root: true })

        throw error
      })
  },

  list ({ commit, dispatch, state, rootState }) {
    dispatch('cml/sync/start', 'groupsList', { root: true })
    return api
      .getGroups()
      .then(r => {
        dispatch('cml/sync/stop', 'groupsList', { root: true })
        const groups = r.data.map(group => groupFormat(group))
        commit('list', groups)

        return groups
      })
      .catch(e => {
        dispatch('cml/sync/stop', 'groupsList', { root: true })
        const error = e.response ? e.response.body.error : 'Network error'
        dispatch('cml/messages/error', error, { root: true })

        throw error
      })
  },

  userAdd ({ commit, dispatch, state, rootState }, { userId, group }) {
    dispatch('cml/sync/start', 'groupsUserAdd', { root: true })
    return api
      .addUserToGroup(userId, group.id)
      .then(r => {
        dispatch('cml/sync/stop', 'groupsUserAdd', { root: true })
        const group = groupFormat(r.data)
        commit('update', group)
        dispatch('cml/messages/success', 'User added to group', {
          root: true
        })
        if (userId === rootState.cml.user.id) {
          commit('cml/user/groupAdd', group.id, { root: true })
          dispatch('cml/corpus/listAll', null, {
            root: true
          })
        }

        return group
      })
      .catch(e => {
        dispatch('cml/sync/stop', 'groupsUserAdd', { root: true })
        const error = e.response ? e.response.body.error : 'Network error'
        dispatch('cml/messages/error', error, { root: true })

        throw error
      })
  },

  userRemove ({ commit, dispatch, state, rootState }, { userId, group }) {
    dispatch('cml/sync/start', 'groupsUserRemove', { root: true })
    return api
      .removeUserFromGroup(userId, group.id)
      .then(r => {
        dispatch('cml/sync/stop', 'groupsUserRemove', { root: true })
        const group = groupFormat(r.data)
        commit('update', group)
        dispatch('cml/messages/success', 'User removed from group', {
          root: true
        })
        if (userId === rootState.cml.user.id) {
          commit('cml/user/groupRemove', group.id, { root: true })
          dispatch('cml/corpus/listAll', null, {
            root: true
          })
        }

        return group
      })
      .catch(e => {
        dispatch('cml/sync/stop', 'groupsUserRemove', { root: true })
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
    Vue.set(state, 'list', [])
  },

  add (state, group) {
    state.list.push(group)
  },

  update (state, group) {
    const index = state.list.findIndex(g => g.id === group.id)
    Vue.set(state.list, index, group)
  },

  remove (state, groupId) {
    const index = state.list.findIndex(g => g.id === groupId)
    Vue.delete(state.list, index)
  },

  list (state, groups) {
    Vue.set(state, 'list', groups)
  }
}

export default {
  namespaced: true,
  state,
  actions,
  getters,
  mutations
}
