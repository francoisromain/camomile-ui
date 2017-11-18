import {
  messageDispatch,
  corpuFormat,
  errorFormat,
  permissionsUser
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
          r.permission = 3
          const corpu = corpuFormat(r, rootState.cml)

          messageDispatch('success', 'Corpus added.', dispatch)
          commit('add', corpu)
          return r
        })
        .catch(e => {
          const error = errorFormat(e, rootState)
          messageDispatch('error', error, dispatch)
          throw e
        })
    },

    remove ({ commit, dispatch, state, rootState }, corpu) {
      return rootState.cml.api
        .deleteCorpus(corpu.id)
        .then(r => {
          messageDispatch('success', 'Corpus removed', dispatch)
          commit('remove', corpu)
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
          const corpus = corpuFormat(r, rootState.cml)
          messageDispatch('success', 'Corpus updated', dispatch)
          commit('update', corpu)
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
          const corpus = r.map(corpu => corpuFormat(corpu, rootState.cml))

          commit('list', corpus)
          return corpus
        })
        .catch(e => {
          console.log(e)
          throw e
        })
    },

    permissionsList ({ commit, dispatch, state, rootState }, corpu) {
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

    permissionsGroupSet ({ dispatch, rootState }, { corpu, group, permission }) {
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

    permissionsGroupRemove ({ dispatch, rootState }, { corpu, group }) {
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

    permissionsUserSet ({ dispatch, rootState }, { corpu, user, permission }) {
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

    permissionsUserRemove ({ dispatch, rootState }, { corpu, user }) {
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
          permission: permissionsUser(permissions, rootState.cml.user)
        })
        commit(`cml/popup/close`, null, { root: true })
      }
    }
  },
  mutations: {
    add (state, corpu) {
      const corpuExisting = state.list.find(c => c.id === corpu.id)
      if (!corpuExisting) {
        state.list.push(corpu)
      }
    },
    update (state, corpu) {
      Object.assign(state.list.find(c => c.id === corpu.id), corpu)
    },
    remove (state, corpu) {
      const index = state.list.findIndex(c => c.id === corpu.id)
      if (index !== -1) {
        state.list.splice(index, 1)
      }
    },
    list (state, corpus) {
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
