import { message, groupFormat } from './_helpers'

export default {
  namespaced: true,
  state: {
    list: []
  },
  actions: {
    add ({ commit, dispatch, state, rootState }, group) {
      return rootState.camomile.api
        .createGroup(group.name, group.description)
        .then(r => {
          message(dispatch, {
            type: 'success',
            content: 'Success: group added.'
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

    remove ({ commit, dispatch, state, rootState }, group) {
      return rootState.camomile.api
        .deleteGroup(group.id)
        .then(r => {
          message(dispatch, { type: 'success', content: r })
          dispatch('list')
          return r
        })
        .catch(e => {
          console.log(e)
          message(dispatch, { type: 'error', content: e })
          throw e
        })
    },

    update ({ commit, dispatch, state, rootState }, group) {
      return rootState.camomile.api
        .updateGroup(group.id, { description: group.description })
        .then(r => {
          const group = groupFormat(r)
          message(dispatch, {
            type: 'success',
            content: 'Success: group updated.'
          })
          dispatch('list')
          return group
        })
        .catch(e => {
          console.log(e)
          message(dispatch, { type: 'error', content: e })
          throw e
        })
    },

    userAdd ({ commit, dispatch, state, rootState }, { user, group }) {
      return rootState.camomile.api
        .addUserToGroup(user.id, group.id)
        .then(r => {
          const group = groupFormat(r)
          message(dispatch, {
            type: 'success',
            content: 'Success: user added to group.'
          })
          dispatch('list')
          return group
        })
        .catch(e => {
          console.log(e)
          message(dispatch, { type: 'error', content: e })
          throw e
        })
    },

    userRemove ({ commit, dispatch, state, rootState }, { user, group }) {
      return rootState.camomile.api
        .removeUserFromGroup(user.id, group.id)
        .then(r => {
          const group = groupFormat(r)
          message(dispatch, {
            type: 'success',
            content: 'Success: user removed from group.'
          })
          dispatch('list')
          return group
        })
        .catch(e => {
          console.log(e)
          message(dispatch, { type: 'error', content: e })
          throw e
        })
    },

    list ({ commit, dispatch, state, rootState }) {
      return rootState.camomile.api
        .getGroups()
        .then(r => {
          const groups = r.map(group => groupFormat(group))
          commit('listUpdate', groups)
          return groups
        })
        .catch(e => {
          console.log(e)
          throw e
        })
    }
  },
  mutations: {
    listUpdate (state, groups) {
      state.list = groups
    }
  }
}
