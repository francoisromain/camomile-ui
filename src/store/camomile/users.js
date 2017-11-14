import { messageDispatch, userFormat, errorFormat } from './_helpers'

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
          messageDispatch('success', 'Success: user added.', dispatch)
          dispatch('list')
          return r
        })
        .catch(e => {
          const error = errorFormat(e, rootState)
          messageDispatch('error', error, dispatch)
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
          messageDispatch('success', 'User updated', dispatch)
          if (user.name === rootState.camomile.user.name) {
            commit('camomile/user/set', user, { root: true })
          }
          dispatch('list')
          return user
        })
        .catch(e => {
          // const error = 'Error: request failed.'
          const error = errorFormat(e, rootState)
          messageDispatch('error', error, dispatch)
          throw error
        })
    },

    remove ({ commit, state, dispatch, rootState }, user) {
      return rootState.camomile.api
        .deleteUser(user.id)
        .then(r => {
          messageDispatch('success', 'Success: user removed.', dispatch)
          dispatch('list')
          return r
        })
        .catch(e => {
          const error = errorFormat(e, rootState)
          messageDispatch('error', error, dispatch)
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
          const error = errorFormat(e, rootState)
          messageDispatch('error', error, dispatch)
          throw error
        })
    }
  },
  mutations: {
    listUpdate (state, users) {
      state.list = users
    },
    groupIdsListUpdate (state, { groupIds, user }) {
      user.groupIds = groupIds
    }
  }
}
