import api from './_api'
import { userFormat } from './_helpers'

export const state = {
  list: []
}

export const actions = {
  add ({ commit, dispatch }, { element }) {
    dispatch('cml/sync/start', 'usersAdd', { root: true })
    return api
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
        commit('cml/corpus/userAdd', user.id, { root: true })
        dispatch('cml/messages/success', 'User added', { root: true })

        return user
      })
      .catch(e => {
        dispatch('cml/sync/stop', 'usersAdd', { root: true })
        const error = e.response ? e.response.body.error : 'Network error'
        dispatch('cml/messages/error', error, { root: true })

        throw error
      })
  },

  update ({ commit, dispatch, rootState }, { element }) {
    dispatch('cml/sync/start', 'usersUpdate', { root: true })
    return api
      .updateUser(element.id, {
        password: element.password,
        role: element.role,
        description: element.description
      })
      .then(r => {
        dispatch('cml/sync/stop', 'usersUpdate', { root: true })
        const user = userFormat(r.data)
        commit('update', user)
        if (user.name === rootState.cml.user.name) {
          commit('cml/user/set', user, { root: true })
        }
        dispatch('cml/messages/success', 'User updated', { root: true })

        return user
      })
      .catch(e => {
        dispatch('cml/sync/stop', 'usersUpdate', { root: true })
        const error = e.response ? e.response.body.error : 'Network error'
        dispatch('cml/messages/error', error, { root: true })

        throw error
      })
  },

  remove ({ commit, dispatch }, { id }) {
    dispatch('cml/sync/start', 'usersRemove', { root: true })
    return api
      .deleteUser(id)
      .then(r => {
        dispatch('cml/sync/stop', 'usersRemove', { root: true })
        commit('remove', id)
        commit('cml/corpus/userRemove', id, { root: true })
        dispatch('cml/messages/success', 'User removed', { root: true })

        return id
      })
      .catch(e => {
        dispatch('cml/sync/stop', 'usersRemove', { root: true })
        const error = e.response ? e.response.body.error : 'Network error'
        dispatch('cml/messages/error', error, { root: true })

        throw error
      })
  },

  list ({ commit, dispatch }) {
    dispatch('cml/sync/start', 'usersList', { root: true })
    return api
      .getUsers()
      .then(r => {
        dispatch('cml/sync/stop', 'usersList', { root: true })
        const users = r.data.map(user => userFormat(user))
        commit('list', users)

        return users
      })
      .catch(e => {
        dispatch('cml/sync/stop', 'usersList', { root: true })
        const error = e.response ? e.response.body.error : 'Network error'
        dispatch('cml/messages/error', error, { root: true })

        throw error
      })
  }
}

export const getters = {
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
  reset (state) {
    state.list = []
  },

  add (state, user) {
    state.list.push(user)
  },

  update (state, user) {
    Object.assign(state.list.find(u => u.id === user.id), user)
  },

  remove (state, userId) {
    state.list = state.list.filter(u => u.id !== userId)
  },

  list (state, users) {
    state.list = users
  }
}

export default {
  namespaced: true,
  state,
  actions,
  getters,
  mutations
}
