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
          message(dispatch, { type: 'error', content: e })
          throw e
        })
    },

    remove ({ commit, dispatch, state, rootState }, group) {
      return rootState.camomile.api
        .deleteGroup(group)
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
          message(dispatch, {
            type: 'success',
            content: 'Success: group updated.'
          })
          const group = groupFormat(r)
          dispatch('list')
          return group
        })
        .catch(e => {
          console.log(e)
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
