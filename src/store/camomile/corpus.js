import {
  messageDispatch,
  corpuFormat,
  errorFormat,
  permissionsSet
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
          const corpu = {
            name: r.name,
            id: r._id,
            description: r.description,
            permission: 3,
            permissions: {
              users: permissionsSet(rootState.cml.users.list, {}),
              groups: permissionsSet(rootState.cml.groups.list, {})
            }
          }

          corpu.permissions.users[rootState.cml.user.id] = 3

          commit('add', corpu)
          messageDispatch('success', 'Corpus added.', dispatch)

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
          commit('remove', corpu)
          messageDispatch('success', 'Corpus removed', dispatch)

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
          // update api to update from server:
          // should receive an object with a permissions property
          // to process with corpuFormat
          commit('update', corpu)
          messageDispatch('success', 'Corpus updated', dispatch)

          return r
        })
        .catch(e => {
          console.log(e)
          messageDispatch('error', e, dispatch)

          throw e
        })
    },

    list ({ state, dispatch, commit, rootState, rootGetters }) {
      return rootState.cml.api
        .getCorpora()
        .then(r => {
          const corpus = r.map(corpu => {
            corpu.permission = rootGetters['cml/user/permission'](
              corpu.permissions
            )

            return corpuFormat(
              corpu,
              rootState.cml.users.list,
              rootState.cml.groups.list
            )
          })

          commit('list', corpus)
          return corpus
        })
        .catch(e => {
          console.log(e)

          throw e
        })
    },

    groupPermissionSet (
      { commit, dispatch, rootState },
      { corpu, group, permission }
    ) {
      return rootState.cml.api
        .setCorpusPermissionsForGroup(corpu.id, group.id, permission)
        .then(permissions => {
          commit('elementPermissionsUpdate', {
            corpu: corpu,
            elementId: group.id,
            elementType: 'groups',
            permission:
              (permissions.groups && permissions.groups[group.id]) || null
          })
          messageDispatch('success', `Group permissions updated`, dispatch)

          if (rootState.cml.user.groupIds.indexOf(group.id) !== -1) {
            dispatch('currentUserIsAdminTest', { corpu, permissions })
          }

          return permissions
        })
        .catch(e => {
          const error = errorFormat(e, rootState)
          messageDispatch('error', error, dispatch)

          throw error
        })
    },

    groupPermissionRemove ({ commit, dispatch, rootState }, { corpu, group }) {
      return rootState.cml.api
        .removeCorpusPermissionsForGroup(corpu.id, group.id)
        .then(permissions => {
          commit('elementPermissionsUpdate', {
            corpu: corpu,
            elementId: group.id,
            elementType: 'groups',
            permission: null
          })
          messageDispatch('success', 'Group permissions updated', dispatch)

          if (rootState.cml.user.groupIds.indexOf(group.id) !== -1) {
            dispatch('currentUserIsAdminTest', { corpu, permissions })
          }

          return permissions
        })
        .catch(e => {
          const error = errorFormat(e, rootState)
          messageDispatch('error', error, dispatch)

          throw error
        })
    },

    userPermissionSet (
      { commit, dispatch, rootState },
      { corpu, user, permission }
    ) {
      return rootState.cml.api
        .setCorpusPermissionsForUser(corpu.id, user.id, permission)
        .then(permissions => {
          commit('elementPermissionsUpdate', {
            corpu: corpu,
            elementId: user.id,
            elementType: 'users',
            permission:
              (permissions.users && permissions.users[user.id]) || null
          })
          messageDispatch('success', 'User permissions updated', dispatch)
          if (user.id === rootState.cml.user.id) {
            dispatch('currentUserIsAdminTest', { corpu, permissions })
          }

          return permissions
        })
        .catch(e => {
          const error = errorFormat(e, rootState)
          messageDispatch('error', error, dispatch)

          throw error
        })
    },

    userPermissionRemove ({ commit, dispatch, rootState }, { corpu, user }) {
      return rootState.cml.api
        .removeCorpusPermissionsForUser(corpu.id, user.id)
        .then(permissions => {
          commit('elementPermissionsUpdate', {
            corpu: corpu,
            elementId: user.id,
            elementType: 'users',
            permission: null
          })
          messageDispatch('success', 'User permissions updated', dispatch)
          if (user.id === rootState.cml.user.id) {
            dispatch('currentUserIsAdminTest', { corpu, permissions })
          }

          return permissions
        })
        .catch(e => {
          const error = errorFormat(e, rootState)
          messageDispatch('error', error, dispatch)

          throw error
        })
    },

    currentUserIsAdminTest (
      { state, dispatch, commit, rootGetters },
      { corpu, permissions }
    ) {
      if (!rootGetters['cml/user/isAdmin'](permissions)) {
        dispatch('list')
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

    elementPermissionsUpdate (
      state,
      { corpu, elementId, elementType, permission }
    ) {
      corpu.permissions[elementType][elementId] = permission
    },

    corpuPermissionsUpdate (state, { corpu, permission }) {
      corpu.permission = permission
    },

    groupAdd (state, groupId) {
      state.list.forEach(corpu => {
        corpu.permissions.groups = { ...corpu.permissions.groups, [groupId]: 0 }
      })
    },

    groupRemove (state, groupId) {
      state.list.forEach(corpu => {
        delete corpu.permissions.groups[groupId]
      })
    },

    userAdd (state, userId) {
      state.list.forEach(corpu => {
        corpu.permissions.users = { ...corpu.permissions.users, [userId]: 0 }
      })
    },

    userRemove (state, userId) {
      state.list.forEach(corpu => {
        delete corpu.permissions.users[userId]
      })
    }
  }
}
