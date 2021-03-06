import Vue from 'vue'
import { groupFormat } from './_helpers'

// list contains the groups

/* Example

{
  list: [{
    id: 'group-id-hash-1',
    name: 'group-name-1',
    description: { … },
    userIds: [
      'user-id-hash-1',
      'user-id-hash-2'
  },
  { …
  }]
}

*/

export const state = {
  list: []
}

export const actions = {
  // Add a new group
  add({ commit, dispatch, rootState }, { element }) {
    dispatch('sync/start', 'groupsAdd', { root: true })
    return rootState.api
      .createGroup(element.name, element.description)
      .then(r => {
        dispatch('sync/stop', 'groupsAdd', { root: true })
        const group = groupFormat(r.data)
        commit('add', group)

        // Add the new group to every corpus and layers
        commit('corpus/groupAdd', group.id, { root: true })
        commit('layers/groupAdd', group.id, { root: true })
        dispatch('messages/success', 'Group added', { root: true })

        return group
      })
      .catch(e => {
        dispatch('sync/stop', 'groupsAdd', { root: true })
        dispatch('messages/error', e.message, { root: true })

        throw e
      })
  },

  // Remove a group
  remove({ commit, dispatch, rootState }, { id }) {
    dispatch('sync/start', 'groupsRemove', { root: true })
    return rootState.api
      .deleteGroup(id)
      .then(r => {
        dispatch('sync/stop', 'groupsRemove', { root: true })
        commit('remove', id)
        // Add the group from every corpus and layers
        commit('corpus/groupRemove', id, { root: true })
        commit('layers/groupRemove', id, { root: true })
        dispatch('messages/success', 'Group removed', { root: true })

        return id
      })
      .catch(e => {
        dispatch('sync/stop', 'groupsRemove', { root: true })
        dispatch('messages/error', e.message, { root: true })

        throw e
      })
  },

  // Update a group
  update({ commit, dispatch, rootState }, { element }) {
    dispatch('sync/start', 'groupsUpdate', { root: true })
    return rootState.api
      .updateGroup(element.id, { description: element.description })
      .then(r => {
        dispatch('sync/stop', 'groupsUpdate', { root: true })
        const group = groupFormat(r.data)
        commit('update', group)
        dispatch('messages/success', 'Group updated', { root: true })

        return group
      })
      .catch(e => {
        dispatch('sync/stop', 'groupsUpdate', { root: true })
        dispatch('messages/error', e.message, { root: true })

        throw e
      })
  },

  // List groups
  list({ commit, dispatch, rootState }) {
    dispatch('sync/start', 'groupsList', { root: true })
    return rootState.api
      .getGroups()
      .then(r => {
        dispatch('sync/stop', 'groupsList', { root: true })
        const groups = r.data.map(group => groupFormat(group))
        commit('list', groups)

        return groups
      })
      .catch(e => {
        dispatch('sync/stop', 'groupsList', { root: true })
        dispatch('messages/error', e.message, { root: true })

        throw e
      })
  },

  // Add a user to a group
  userAdd({ commit, dispatch, rootState }, { userId, group }) {
    dispatch('sync/start', 'groupsUserAdd', { root: true })
    return rootState.api
      .addUserToGroup(userId, group.id)
      .then(r => {
        dispatch('sync/stop', 'groupsUserAdd', { root: true })
        const group = groupFormat(r.data)
        commit('update', group)
        dispatch('messages/success', 'User added to group', {
          root: true
        })
        if (userId === rootState.user.id) {
          commit('user/groupAdd', group.id, { root: true })
          dispatch('corpus/listAll', null, {
            root: true
          })
        }

        return group
      })
      .catch(e => {
        dispatch('sync/stop', 'groupsUserAdd', { root: true })
        dispatch('messages/error', e.message, { root: true })

        throw e
      })
  },

  // remove a user from a group
  userRemove({ commit, dispatch, rootState }, { userId, group }) {
    dispatch('sync/start', 'groupsUserRemove', { root: true })
    return rootState.api
      .removeUserFromGroup(userId, group.id)
      .then(r => {
        dispatch('sync/stop', 'groupsUserRemove', { root: true })
        const group = groupFormat(r.data)
        commit('update', group)
        dispatch('messages/success', 'User removed from group', {
          root: true
        })
        if (userId === rootState.user.id) {
          commit('user/groupRemove', group.id, { root: true })
          dispatch('corpus/listAll', null, {
            root: true
          })
        }

        return group
      })
      .catch(e => {
        dispatch('sync/stop', 'groupsUserRemove', { root: true })
        dispatch('messages/error', e.message, { root: true })

        throw e
      })
  }
}

export const getters = {
  // Get the permissions for every groups
  // { 'group-id-hash-1': 0, 'group-id-hash-2': 3, … }
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
  // Reset list (on log-out)
  reset(state) {
    Vue.set(state, 'list', [])
  },

  // Add a group to the list
  add(state, group) {
    state.list.push(group)
  },

  // Update a group
  update(state, group) {
    const index = state.list.findIndex(g => g.id === group.id)
    Vue.set(state.list, index, group)
  },

  // Remove a group
  remove(state, groupId) {
    const index = state.list.findIndex(g => g.id === groupId)
    Vue.delete(state.list, index)
  },

  // Set the group list
  list(state, groups) {
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
