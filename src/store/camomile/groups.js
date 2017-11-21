import { messageDispatch, groupFormat, errorFormat } from './_helpers'

export default {
  namespaced: true,

  state: {
    list: []
  },

  actions: {
    add ({ commit, dispatch, state, rootState }, group) {
      commit('cml/sync/start', 'groupsAdd', { root: true })
      return rootState.cml.api
        .createGroup(group.name, group.description)
        .then(r => {
          commit('cml/sync/stop', 'groupsAdd', { root: true })
          const group = groupFormat(r)
          commit('add', group)
          commit('cml/corpus/groupAdd', group.id, { root: true })
          messageDispatch('success', 'Group added', dispatch)

          return group
        })
        .catch(e => {
          commit('cml/sync/stop', 'groupsAdd', { root: true })
          console.log(e)
          const error = errorFormat(e, rootState)
          messageDispatch('error', error, dispatch)

          throw error
        })
    },

    remove ({ commit, dispatch, state, rootState }, group) {
      commit('cml/sync/start', 'groupsRemove', { root: true })
      return rootState.cml.api
        .deleteGroup(group.id)
        .then(r => {
          commit('cml/sync/stop', 'groupsRemove', { root: true })
          commit('remove', group)
          commit('cml/corpus/groupRemove', group.id, { root: true })
          messageDispatch('success', 'Group removed', dispatch)

          return group.id
        })
        .catch(e => {
          commit('cml/sync/stop', 'groupsRemove', { root: true })
          console.log(e)
          messageDispatch('error', e, dispatch)

          throw e
        })
    },

    update ({ commit, dispatch, state, rootState }, group) {
      commit('cml/sync/start', 'groupsUpdate', { root: true })
      return rootState.cml.api
        .updateGroup(group.id, { description: group.description })
        .then(r => {
          commit('cml/sync/stop', 'groupsUpdate', { root: true })
          const group = groupFormat(r)
          commit('update', group)
          messageDispatch('success', 'Group updated', dispatch)

          return group
        })
        .catch(e => {
          commit('cml/sync/stop', 'groupsUpdate', { root: true })
          const error = errorFormat(e, rootState)
          messageDispatch('error', error, dispatch)

          throw error
        })
    },

    get ({ commit, dispatch, state, rootState }, groupId) {
      commit('cml/sync/start', 'groupsGet', { root: true })
      return rootState.cml.api
        .getGroup(groupId)
        .then(r => {
          commit('cml/sync/stop', 'groupsGet', { root: true })
          const group = groupFormat(r)
          return group
        })
        .catch(e => {
          commit('cml/sync/stop', 'groupsGet', { root: true })
          console.log(e)

          throw e
        })
    },

    list ({ commit, dispatch, state, rootState }) {
      commit('cml/sync/start', 'groupsList', { root: true })
      return rootState.cml.api
        .getGroups()
        .then(r => {
          commit('cml/sync/stop', 'groupsList', { root: true })
          const groups = r.map(group => groupFormat(group))
          commit('list', groups)

          return groups
        })
        .catch(e => {
          commit('cml/sync/stop', 'groupsList', { root: true })
          console.log(e)

          throw e
        })
    },

    userAdd ({ commit, dispatch, state, rootState }, { user, group }) {
      commit('cml/sync/start', 'groupsUserAdd', { root: true })
      return rootState.cml.api
        .addUserToGroup(user.id, group.id)
        .then(r => {
          commit('cml/sync/stop', 'groupsUserAdd', { root: true })
          const group = groupFormat(r)
          commit('update', group)
          messageDispatch('success', 'User added to group', dispatch)
          if (user.id === rootState.cml.user.id) {
            commit('cml/user/groupAdd', group.id, { root: true })
            dispatch('cml/corpus/list', null, {
              root: true
            })
          }

          return group
        })
        .catch(e => {
          commit('cml/sync/stop', 'groupsUserAdd', { root: true })
          const error = errorFormat(e, rootState)
          messageDispatch('error', error, dispatch)

          throw error
        })
    },

    userRemove ({ commit, dispatch, state, rootState }, { user, group }) {
      commit('cml/sync/start', 'groupsUserRemove', { root: true })
      return rootState.cml.api
        .removeUserFromGroup(user.id, group.id)
        .then(r => {
          commit('cml/sync/stop', 'groupsUserRemove', { root: true })
          const group = groupFormat(r)
          commit('update', group)
          messageDispatch('success', 'User removed from group', dispatch)
          if (user.id === rootState.cml.user.id) {
            commit('cml/user/groupRemove', group.id, { root: true })
            dispatch('cml/corpus/list', null, {
              root: true
            })
          }

          return group
        })
        .catch(e => {
          commit('cml/sync/stop', 'groupsUserRemove', { root: true })
          const error = errorFormat(e, rootState)
          messageDispatch('error', error, dispatch)

          throw error
        })
    }
  },

  mutations: {
    reset (state) {
      state.list = []
    },

    add (state, group) {
      console.log('group add', group)
      const groupExisting = state.list.find(g => g.id === group.id)
      if (!groupExisting) {
        state.list.push(group)
      }
    },

    update (state, group) {
      Object.assign(state.list.find(g => g.id === group.id), group)
    },

    remove (state, group) {
      const index = state.list.findIndex(g => g.id === group.id)
      if (index !== -1) {
        state.list.splice(index, 1)
      }
    },

    list (state, groups) {
      state.list = groups
    }
  }
}
