import { messageDispatch, corpuFormat, errorFormat } from './_helpers'

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

    update ({ commit, dispatch, state, rootState }, corpus) {
      return rootState.cml.api
        .updateCorpus(corpus.id, { description: corpus.description })
        .then(r => {
          const corpus = corpuFormat(
            r,
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

    permissionsSet ({ commit, rootState }, { corpu, permissions }) {
      rootState.cml.users.list.forEach(user => {
        commit('userUpdate', {
          corpu,
          userId: user.id,
          permission: (permissions.users && permissions.users[user.id]) || null
        })
      })

      rootState.cml.groups.list.forEach(group =>
        commit('groupUpdate', {
          corpu,
          groupId: group.id,
          permission:
            (permissions.groups && permissions.groups[group.id]) || null
        })
      )
    },

    usercurrentUnset ({ commit, dispatch, state, rootState }) {
      console.log('user unset')
    },

    permissionsList ({ commit, dispatch, state, rootState }, corpu) {
      dispatch('permissionsSet', { corpu, permissions: {} })
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
    userUpdate (state, { corpu, userId, permission }) {
      const user = corpu.users.find(u => u.id === userId)
      if (user) {
        user.permission = permission
      }
    },
    groupUpdate (state, { corpu, groupId, permission }) {
      const group = corpu.groups.find(group => group.id === groupId)
      if (group) {
        group.permission = permission
      }
    }
  }
}
