import { message, userFormat } from './_helpers'

export default {
  namespaced: true,
  state: {
    list: []
  },
  actions: {
    add ({ commit, state, dispatch, rootState }, user) {
      return rootState.camomile.api
        .createUser(user.name, user.password, user.description, user.role)
        .then(r => {
          message(dispatch, {
            type: 'success',
            content: 'Success: user added.'
          })
          dispatch('list')
          return r
        })
        .catch(e => {
          console.log(e)
          const error = e.response
            ? e.response[rootState.camomile.config.axios ? 'data' : 'body']
              .error
            : 'Network error'

          message(dispatch, { type: 'error', content: error })
          throw error
        })
    },

    update ({ commit, dispatch, state, rootState }, user) {
      return rootState.camomile.api
        .updateUser(user.id, {
          password: user.password,
          role: user.role,
          description: user.description
        })
        .then(r => {
          const user = userFormat(r)
          message(dispatch, {
            type: 'success',
            content: 'User updated'
          })

          if (user.name === rootState.camomile.user.name) {
            commit('camomile/user/set', user, { root: true })
          }
          dispatch('list')
          return user
        })
        .catch(e => {
          console.log(e)
          const error = 'Error: request failed.'
          message(dispatch, {
            type: 'error',
            content: error
          })
          throw error
        })
    },

    remove ({ commit, state, dispatch, rootState }, user) {
      return rootState.camomile.api
        .deleteUser(user.id)
        .then(r => {
          message(dispatch, {
            type: 'success',
            content: 'Success: user removed.'
          })
          dispatch('list')
          return r
        })
        .catch(e => {
          console.log(e)
          const error = e.response
            ? e.response[rootState.camomile.config.axios ? 'data' : 'body']
              .error
            : 'Network error'

          message(dispatch, { type: 'error', content: error })
          throw error
        })
    },

    list ({ commit, dispatch, state, rootState }) {
      return rootState.camomile.api
        .getUsers()
        .then(r => {
          const users = r.map(user => userFormat(user))
          commit('listUpdate', users)
          return users
        })
        .catch(e => {
          console.log(e)
          throw e
        })
    },

    groupIdsList ({ commit, dispatch, state, rootState }, user) {
      return rootState.camomile.api
        .getUserGroups(user.id)
        .then(groupIds => {
          commit('groupIdsListUpdate', { groupIds, user })
          return 'truc'
        })
        .catch(e => {
          console.log(e)
          const error = e.response
            ? e.response[rootState.camomile.config.axios ? 'data' : 'body']
              .error
            : 'Network error'

          message(dispatch, { type: 'error', content: error })
          throw error
        })
    }
  },
  mutations: {
    listUpdate (state, users) {
      state.list = users
    },
    groupIdsListUpdate (state, { groupIds, user }) {
      const u = state.list.find(us => us.id === user.id)
      u.groupIds = groupIds
    }
  }
}
