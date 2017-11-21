import { messageDispatch, userFormat, errorFormat } from './_helpers'

export default {
  namespaced: true,

  state: {
    list: []
  },

  actions: {
    add ({ commit, state, dispatch, rootState }, user) {
      commit('cml/sync/start', 'usersAdd', { root: true })
      return rootState.cml.api
        .createUser(user.name, user.password, user.description, user.role)
        .then(r => {
          commit('cml/sync/stop', 'usersAdd', { root: true })
          const user = userFormat(r)
          commit('add', user)
          commit('cml/corpus/userAdd', user.id, { root: true })
          messageDispatch('success', 'User added', dispatch)

          return user
        })
        .catch(e => {
          commit('cml/sync/stop', 'usersAdd', { root: true })
          const error = errorFormat(e, rootState)
          messageDispatch('error', error, dispatch)

          throw error
        })
    },

    update ({ commit, dispatch, state, rootState }, user) {
      commit('cml/sync/start', 'usersUpdate', { root: true })
      return rootState.cml.api
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
          messageDispatch('success', 'User updated', dispatch)

          return user
        })
        .catch(e => {
          commit('cml/sync/stop', 'usersUpdate', { root: true })
          // const error = 'Error: request failed.'
          const error = errorFormat(e, rootState)
          messageDispatch('error', error, dispatch)

          throw error
        })
    },

    remove ({ commit, state, dispatch, rootState }, user) {
      commit('cml/sync/start', 'usersRemove', { root: true })
      return rootState.cml.api
        .deleteUser(user.id)
        .then(r => {
          commit('cml/sync/stop', 'usersRemove', { root: true })
          commit('remove', user)
          commit('cml/corpus/userRemove', user.id, { root: true })
          messageDispatch('success', 'User removed', dispatch)

          return r
        })
        .catch(e => {
          commit('cml/sync/stop', 'usersRemove', { root: true })
          const error = errorFormat(e, rootState)
          messageDispatch('error', error, dispatch)

          throw error
        })
    },

    get ({ commit, dispatch, state, rootState }, userId) {
      commit('cml/sync/start', 'usersGet', { root: true })
      return rootState.cml.api
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

    list ({ commit, dispatch, state, rootState }) {
      commit('cml/sync/start', 'usersList', { root: true })
      return rootState.cml.api
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
