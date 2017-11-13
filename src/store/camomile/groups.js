import { messageDispatch, groupFormat, errorFormat } from './_helpers'

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
          messageDispatch('success', 'Success: group added.', dispatch)
          dispatch('list')
          return r
        })
        .catch(e => {
          const error = errorFormat(e, rootState)
          messageDispatch('error', error, dispatch)
          throw error
        })
    },

    remove ({ commit, dispatch, state, rootState }, group) {
      return rootState.camomile.api
        .deleteGroup(group.id)
        .then(r => {
          messageDispatch('success', r, dispatch)
          dispatch('list')
          return r
        })
        .catch(e => {
          console.log(e)
          messageDispatch('error', e, dispatch)
          throw e
        })
    },

    update ({ commit, dispatch, state, rootState }, group) {
      return rootState.camomile.api
        .updateGroup(group.id, { description: group.description })
        .then(r => {
          const group = groupFormat(r)
          messageDispatch('success', 'Success: group updated.', dispatch)
          dispatch('list')
          return group
        })
        .catch(e => {
          const error = errorFormat(e, rootState)
          messageDispatch('error', error, dispatch)
          throw error
        })
    },

    userAdd ({ commit, dispatch, state, rootState }, { user, group }) {
      return rootState.camomile.api
        .addUserToGroup(user.id, group.id)
        .then(r => {
          const group = groupFormat(r)
          messageDispatch('success', 'Success: user added to group.', dispatch)
          dispatch('list')
          return group
        })
        .catch(e => {
          const error = errorFormat(e, rootState)
          messageDispatch('error', error, dispatch)
          throw error
        })
    },

    userRemove ({ commit, dispatch, state, rootState }, { user, group }) {
      return rootState.camomile.api
        .removeUserFromGroup(user.id, group.id)
        .then(r => {
          const group = groupFormat(r)
          messageDispatch(
            'success',
            'Success: user removed from group.',
            dispatch
          )
          dispatch('list')
          return group
        })
        .catch(e => {
          const error = errorFormat(e, rootState)
          messageDispatch('error', error, dispatch)
          throw error
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
