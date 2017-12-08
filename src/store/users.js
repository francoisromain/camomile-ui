import api from './_api'
import { userFormat } from './_helpers'

export const state = {
  list: []
}

export const actions = {
  add ({ commit, dispatch }, user) {
    commit('cml/sync/start', 'usersAdd', { root: true })
    return api
      .createUser(user.name, user.password, user.description, user.role)
      .then(r => {
        commit('cml/sync/stop', 'usersAdd', { root: true })
        const user = userFormat(r.data)
        commit('add', user)
        commit('cml/corpus/userAdd', user.id, { root: true })
        dispatch('cml/messages/success', 'User added', { root: true })

        return user
      })
      .catch(e => {
        commit('cml/sync/stop', 'usersAdd', { root: true })
        const error = e.response ? e.response.body.error : 'Network error'
        dispatch('cml/messages/error', error, { root: true })

        throw error
      })
  },

  update ({ commit, dispatch, rootState }, user) {
    commit('cml/sync/start', 'usersUpdate', { root: true })
    return api
      .updateUser(user.id, {
        password: user.password,
        role: user.role,
        description: user.description
      })
      .then(r => {
        commit('cml/sync/stop', 'usersUpdate', { root: true })
        const user = userFormat(r.data)
        commit('update', user)
        if (user.name === rootState.cml.user.name) {
          commit('cml/user/set', user, { root: true })
        }
        dispatch('cml/messages/success', 'User updated', { root: true })

        return user
      })
      .catch(e => {
        commit('cml/sync/stop', 'usersUpdate', { root: true })
        const error = e.response ? e.response.body.error : 'Network error'
        dispatch('cml/messages/error', error, { root: true })

        throw error
      })
  },

  remove ({ commit, dispatch }, user) {
    commit('cml/sync/start', 'usersRemove', { root: true })
    return api
      .deleteUser(user.id)
      .then(r => {
        commit('cml/sync/stop', 'usersRemove', { root: true })
        commit('remove', user.id)
        commit('cml/corpus/userRemove', user.id, { root: true })
        dispatch('cml/messages/success', 'User removed', { root: true })

        return user.id
      })
      .catch(e => {
        commit('cml/sync/stop', 'usersRemove', { root: true })
        const error = e.response ? e.response.body.error : 'Network error'
        dispatch('cml/messages/error', error, { root: true })

        throw error
      })
  },

  list ({ commit, dispatch }) {
    commit('cml/sync/start', 'usersList', { root: true })
    return api
      .getUsers()
      .then(r => {
        commit('cml/sync/stop', 'usersList', { root: true })
        const users = r.data.map(user => userFormat(user))
        commit('list', users)

        return users
      })
      .catch(e => {
        commit('cml/sync/stop', 'usersList', { root: true })
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
