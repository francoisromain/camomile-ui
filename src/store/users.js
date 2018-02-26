import Vue from 'vue'
import { userFormat } from './_helpers'

/* Example

list: [{
  id: 'user-id-hash-1',
  name: 'user-name-string',
  role: 'user', // user or admin
  description: {
    …
  },
  {
    …
  }
}]

*/

export const state = {
  list: []
}

export const actions = {
  // Add a new user
  add({ commit, dispatch, rootState }, { element }) {
    dispatch('cml/sync/start', 'usersAdd', { root: true })
    return rootState.cml.api
      .createUser(
        element.name,
        element.password,
        element.description,
        element.role
      )
      .then(r => {
        dispatch('cml/sync/stop', 'usersAdd', { root: true })
        const user = userFormat(r.data)
        commit('add', user)

        // Add the new user to every corpus and layers
        commit('cml/corpus/userAdd', user.id, { root: true })
        commit('cml/layers/userAdd', user.id, { root: true })
        dispatch('cml/messages/success', 'User added', { root: true })

        return user
      })
      .catch(e => {
        dispatch('cml/sync/stop', 'usersAdd', { root: true })
        dispatch('cml/messages/error', e.message, { root: true })

        throw e
      })
  },

  // Update a user
  update({ commit, dispatch, rootState }, { element }) {
    dispatch('cml/sync/start', 'usersUpdate', { root: true })
    return rootState.cml.api
      .updateUser(element.id, {
        password: element.password,
        role: element.role,
        description: element.description
      })
      .then(r => {
        dispatch('cml/sync/stop', 'usersUpdate', { root: true })
        const user = userFormat(r.data)
        commit('update', user)

        // If the user is the current user (logged-in)
        if (user.name === rootState.cml.user.name) {
          // Update the current user
          commit('cml/user/set', user, { root: true })
        }
        dispatch('cml/messages/success', 'User updated', { root: true })

        return user
      })
      .catch(e => {
        dispatch('cml/sync/stop', 'usersUpdate', { root: true })
        dispatch('cml/messages/error', e.message, { root: true })

        throw e
      })
  },

  // Remove a user
  remove({ commit, dispatch, rootState }, { id }) {
    dispatch('cml/sync/start', 'usersRemove', { root: true })
    return rootState.cml.api
      .deleteUser(id)
      .then(r => {
        dispatch('cml/sync/stop', 'usersRemove', { root: true })
        commit('remove', id)

        // Remove the user from every corpus and layers
        commit('cml/corpus/userRemove', id, { root: true })
        commit('cml/layers/userRemove', id, { root: true })
        dispatch('cml/messages/success', 'User removed', { root: true })

        return id
      })
      .catch(e => {
        dispatch('cml/sync/stop', 'usersRemove', { root: true })
        dispatch('cml/messages/error', e.message, { root: true })

        throw e
      })
  },

  // List all users
  list({ commit, dispatch, rootState }) {
    dispatch('cml/sync/start', 'usersList', { root: true })
    return rootState.cml.api
      .getUsers()
      .then(r => {
        dispatch('cml/sync/stop', 'usersList', { root: true })
        const users = r.data.map(user => userFormat(user))
        commit('list', users)

        return users
      })
      .catch(e => {
        dispatch('cml/sync/stop', 'usersList', { root: true })
        dispatch('cml/messages/error', e.message, { root: true })

        throw e
      })
  }
}

export const getters = {
  // Get the permissions for every users from a permissions object
  permissions: state => permissions => {
    return state.list.reduce(
      (p, user) =>
        Object.assign(p, {
          [user.id]:
            permissions && permissions[user.id] ? permissions[user.id] : 0
        }),
      {}
    )
  }
}

export const mutations = {
  // Reset users (on log-out)
  reset(state) {
    Vue.set(state, 'list', [])
  },

  // Add a new user
  add(state, user) {
    state.list.push(user)
  },

  // Update a user in the list
  update(state, user) {
    const index = state.list.findIndex(u => u.id === user.id)
    Vue.set(state.list, index, user)
  },

  // Remove a user from the list
  remove(state, userId) {
    const index = state.list.findIndex(u => u.id === userId)
    Vue.delete(state.list, index)
  },

  // Set the user list
  list(state, users) {
    Vue.set(state, 'list', users)
  }
}

export default {
  namespaced: true,
  state,
  actions,
  getters,
  mutations
}
