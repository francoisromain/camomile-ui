import {
  messageDispatch,
  corpuFormat,
  errorFormat,
  permissionsUsercurrent
} from './_helpers'

export default {
  namespaced: true,
  state: {
    list: []
  },
  actions: {
    add ({ commit, dispatch, state, rootState }, corpus) {
      return rootState.cml.api
        .createCorpus(corpus.name, corpus.description, {})
        .then(r => {
          messageDispatch('success', 'Success: corpus added.', dispatch)
          dispatch('list')
          return r
        })
        .catch(e => {
          const error = errorFormat(e, rootState)
          messageDispatch('error', error, dispatch)
          throw e
        })
    },

    remove ({ commit, dispatch, state, rootState }, corpus) {
      return rootState.cml.api
        .deleteCorpus(corpus.id)
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

    update ({ commit, dispatch, state, rootState }, corpu) {
      return rootState.cml.api
        .updateCorpus(corpu.id, { description: corpu.description })
        .then(r => {
          r.permission = corpu.permission
          const corpus = corpuFormat(
            r,
            rootState.cml.user,
            rootState.cml.users.list,
            rootState.cml.groups.list
          )
          messageDispatch('success', 'Success: corpus updated.', dispatch)
          dispatch('list')
          return corpus
        })
        .catch(e => {
          console.log(e)
          messageDispatch('error', e, dispatch)
          throw e
        })
    },

    list ({ commit, dispatch, state, rootState }) {
      return rootState.cml.api
        .getCorpora()
        .then(r => {
          const corpus = r.map(corpu =>
            corpuFormat(
              corpu,
              rootState.cml.user,
              rootState.cml.users.list,
              rootState.cml.groups.list
            )
          )

          commit('listUpdate', corpus)
          return corpus
        })
        .catch(e => {
          console.log(e)
          throw e
        })
    },

    permissionsSet ({ commit, dispatch, rootState }, { corpu, permissions }) {
      rootState.cml.users.list.forEach(user => {
        commit('permissionUpdate', {
          elements: corpu.users,
          elementId: user.id,
          permission: (permissions.users && permissions.users[user.id]) || null
        })
      })

      rootState.cml.groups.list.forEach(group => {
        commit('permissionUpdate', {
          elements: corpu.groups,
          elementId: group.id,
          permission:
            (permissions.groups && permissions.groups[group.id]) || null
        })
      })

      dispatch('userAdminTest', { corpu, permissions })
    },

    userAdminTest ({ commit, rootState }, { corpu, permissions }) {
      const currentUserIsAdmin =
        permissions &&
        permissions.users &&
        permissions.users[rootState.cml.user.id] === 3

      const currentUserIsInAdminGroup =
        permissions &&
        permissions.groups &&
        Object.keys(permissions.groups).reduce((p, id) => {
          const groupIsAdmin = permissions.groups[id] === 3
          const userIsInGroup = rootState.cml.user.groupIds.reduce(
            (t, groupId) => {
              return t || groupId === id
            },
            false
          )
          return p || (groupIsAdmin && userIsInGroup)
        }, false)

      if (!currentUserIsAdmin && !currentUserIsInAdminGroup) {
        commit('permissionUpdate', {
          elements: rootState.cml.corpus.list,
          elementId: corpu.id,
          permission: permissionsUsercurrent(permissions, rootState.cml.user)
        })
        commit(`cml/popup/close`, null, { root: true })
      }
    },

    permissionsList ({ commit, dispatch, state, rootState }, corpu) {
      // dispatch('permissionsSet', { corpu, permissions: {} })
      return rootState.cml.api
        .getCorpusPermissions(corpu.id)
        .then(permissions => {
          dispatch('permissionsSet', { corpu, permissions })

          return permissions
        })
        .catch(e => {
          const error = errorFormat(e, rootState)
          messageDispatch('error', error, dispatch)
          throw error
        })
    },

    permissionsGroupSet (
      { commit, dispatch, state, rootState },
      { corpu, group, permission }
    ) {
      return rootState.cml.api
        .setCorpusPermissionsForGroup(corpu.id, group.id, permission)
        .then(permissions => {
          dispatch('permissionsSet', { corpu, permissions })
          messageDispatch('success', `Group permissions updated`, dispatch)
          return permissions
        })
        .catch(e => {
          const error = errorFormat(e, rootState)
          messageDispatch('error', error, dispatch)
          throw error
        })
    },

    permissionsGroupRemove (
      { commit, dispatch, state, rootState },
      { corpu, group }
    ) {
      return rootState.cml.api
        .removeCorpusPermissionsForGroup(corpu.id, group.id)
        .then(permissions => {
          dispatch('permissionsSet', { corpu, permissions })
          messageDispatch('success', 'Group permissions updated', dispatch)
          return permissions
        })
        .catch(e => {
          const error = errorFormat(e, rootState)
          messageDispatch('error', error, dispatch)
          throw error
        })
    },

    permissionsUserSet (
      { commit, dispatch, state, rootState },
      { corpu, user, permission }
    ) {
      return rootState.cml.api
        .setCorpusPermissionsForUser(corpu.id, user.id, permission)
        .then(permissions => {
          dispatch('permissionsSet', { corpu, permissions })
          messageDispatch('success', 'User permissions updated', dispatch)
          return permissions
        })
        .catch(e => {
          const error = errorFormat(e, rootState)
          messageDispatch('error', error, dispatch)
          throw error
        })
    },

    permissionsUserRemove (
      { commit, dispatch, state, rootState },
      { corpu, user }
    ) {
      return rootState.cml.api
        .removeCorpusPermissionsForUser(corpu.id, user.id)
        .then(permissions => {
          dispatch('permissionsSet', { corpu, permissions })
          messageDispatch('success', 'User permissions updated', dispatch)
          return permissions
        })
        .catch(e => {
          const error = errorFormat(e, rootState)
          messageDispatch('error', error, dispatch)
          throw error
        })
    }
  },
  mutations: {
    listUpdate (state, corpus) {
      state.list = corpus
    },
    permissionUpdate (state, { elements, elementId, permission }) {
      const element = elements.find(e => e.id === elementId)
      if (element) {
        element.permission = permission
      }
    }
  }
}
