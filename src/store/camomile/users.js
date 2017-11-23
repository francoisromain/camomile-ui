import { api } from '../../config'
import { userFormat, observerClean } from './_helpers'

export default {
  namespaced: true,

  state: {
    list: []
  },

  actions: {
    add ({ commit, dispatch }, user) {
      commit('cml/sync/start', 'usersAdd', { root: true })
      return api
        .createUser(
          user.name,
          user.password,
          observerClean(user.description),
          user.role
        )
        .then(r => {
          commit('cml/sync/stop', 'usersAdd', { root: true })
          const user = userFormat(r)
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
          const user = userFormat(r)
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
          commit('remove', user)
          commit('cml/corpus/userRemove', user.id, { root: true })
          dispatch('cml/messages/success', 'User removed', { root: true })

          return r
        })
        .catch(e => {
          commit('cml/sync/stop', 'usersRemove', { root: true })
          const error = e.response ? e.response.body.error : 'Network error'
          dispatch('cml/messages/error', error, { root: true })

          throw error
        })
    },

    get ({ commit }, userId) {
      commit('cml/sync/start', 'usersGet', { root: true })
      return api
        .getUser(userId)
        .then(r => {
          commit('cml/sync/stop', 'usersRemove', { root: true })
          const user = userFormat(r)

          return user
        })
        .catch(e => {
          commit('cml/sync/stop', 'usersRemove', { root: true })
          console.log(e)

          throw e
        })
    },

    list ({ commit }) {
      commit('cml/sync/start', 'usersList', { root: true })
      return api
        .getUsers()
        .then(r => {
          commit('cml/sync/stop', 'usersList', { root: true })
          const users = r.map(user => userFormat(user))
          commit('list', users)

          return users
        })
        .catch(e => {
          commit('cml/sync/stop', 'usersList', { root: true })
          console.log(e)
          throw e
        })
    }
  },

  getters: {
    permissions: state => permissions => {
      return state.list.reduce(
        (res, element) =>
          Object.assign(res, {
            [element.id]:
              permissions && permissions[element.id]
                ? permissions[element.id]
                : 0
          }),
        {}
      )
    }
  },

  mutations: {
    reset (state) {
      state.list = []
    },

    add (state, user) {
      const userExisting = state.list.find(u => u.id === user.id)
      if (!userExisting) {
        state.list.push(user)
      }
    },

    update (state, user) {
      Object.assign(state.list.find(u => u.id === user.id), user)
    },

    remove (state, user) {
      const index = state.list.findIndex(u => u.id === user.id)
      if (index !== -1) {
        state.list.splice(index, 1)
      }
    },

    list (state, users) {
      state.list = users
    }
  }
}
