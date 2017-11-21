import { messageDispatch, errorFormat, mediaFormat } from './_helpers'

export default {
  namespaced: true,

  state: {
    list: []
  },

  actions: {
    add (
      { commit, dispatch, state, rootState },
      { corpuId, name, url, description }
    ) {
      commit('cml/sync/start', 'mediasAdd', { root: true })
      return rootState.cml.api
        .createMedium(corpuId, name, url, description)
        .then(r => {
          commit('cml/sync/stop', 'mediasAdd', { root: true })
          const media = mediaFormat(r)
          commit('add', media)
          messageDispatch('success', 'Medium added.', dispatch)

          return media
        })
        .catch(e => {
          commit('cml/sync/stop', 'mediasAdd', { root: true })
          console.log(e)
          const error = errorFormat(e, rootState)
          messageDispatch('error', error, dispatch)

          throw e
        })
    },

    remove ({ commit, dispatch, state, rootState }, media) {
      commit('cml/sync/start', 'mediasRemove', { root: true })
      return rootState.cml.api
        .deleteMedium(media.id)
        .then(r => {
          commit('cml/sync/stop', 'mediasRemove', { root: true })
          commit('remove', media)
          messageDispatch('success', 'Medium removed', dispatch)

          return r
        })
        .catch(e => {
          console.log(e)
          messageDispatch('error', e, dispatch)

          throw e
        })
    },

    update ({ commit, dispatch, state, rootState }, media) {
      commit('cml/sync/start', 'mediasUpdate', { root: true })
      return rootState.cml.api
        .updateMedium(media.id, {
          name: media.name,
          description: media.description
        })
        .then(r => {
          commit('cml/sync/stop', 'mediasUpdate', { root: true })
          // update api to update from server:
          // should receive an object with a permissions property
          // to process with mediaFormat
          commit('update', media)
          messageDispatch('success', 'Medium updated', dispatch)

          return r
        })
        .catch(e => {
          console.log(e)
          messageDispatch('error', e, dispatch)

          throw e
        })
    },

    list ({ state, dispatch, commit, rootState, rootGetters }, corpuId) {
      commit('cml/sync/start', 'mediasList', { root: true })
      return rootState.cml.api
        .getMedia({ filter: { id_corpus: corpuId } })
        .then(r => {
          commit('cml/sync/stop', 'mediasList', { root: true })
          const medias = r.map(media => {
            return mediaFormat(media)
          })
          commit('list', medias)

          return medias
        })
        .catch(e => {
          commit('cml/sync/stop', 'mediasList', { root: true })
          console.log(e)

          throw e
        })
    }
  },

  mutations: {
    reset (state) {
      state.list = []
    },

    add (state, media) {
      const mediaExisting = state.list.find(c => c.id === media.id)
      if (!mediaExisting) {
        state.list.push(media)
      }
    },

    update (state, media) {
      Object.assign(state.list.find(c => c.id === media.id), media)
    },

    remove (state, media) {
      const index = state.list.findIndex(c => c.id === media.id)
      if (index !== -1) {
        state.list.splice(index, 1)
      }
    },

    list (state, medias) {
      state.list = medias
    }
  }
}
