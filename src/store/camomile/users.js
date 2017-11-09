import { message } from './_helpers'

export default {
  namespaced: true,
  state: {
    list: []
  },
  actions: {
    create ({ commit, state, dispatch, rootState }, user) {
      console.log('user', user, user.name)
      return rootState.camomile.api
        .createUser(user.name, user.password, user.description, user.role)
        .then(r => {
          message(dispatch, { type: 'success', content: r })
          dispatch('list')
          return r
        })
        .catch(e => {
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
          commit('camomile/utils/userPopupHide', null, { root: true })
          message(dispatch, {
            type: 'success',
            content: 'User updated'
          })
          dispatch('list')
          return r
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

    list ({ commit, dispatch, state, rootState }) {
      return rootState.camomile.api
        .getUsers()
        .then(r => {
          console.log('ror', r)
          const users = r.map(u => ({
            name: u.username,
            id: u._id,
            description: u.description,
            role: u.role
          }))
          commit('listUpdate', users)
          return r
        })
        .catch(e => {
          console.log(e)
          throw e
        })
    }
  },
  mutations: {
    remove (state, message) {
      state.list.shift()
    },
    add (state, user) {
      state.list.push(message)
    },
    listUpdate (state, users) {
      console.log('users', users)
      state.list = users
    }
  }
}
