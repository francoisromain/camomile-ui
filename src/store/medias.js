import Vue from 'vue'
import api from './_api'
import { mediaFormat } from './_helpers'

let interval

export const state = {
  lists: {},
  actives: {}
}

export const actions = {
  add ({ commit, dispatch }, { element, uid }) {
    commit('cml/sync/start', `mediasAdd-${uid}`, { root: true })
    return api
      .createMedium(
        element.corpuId,
        element.name,
        element.url,
        element.description
      )
      .then(r => {
        commit('cml/sync/stop', `mediasAdd-${uid}`, { root: true })
        const media = mediaFormat(r.data)
        commit('add', { media, uid })
        dispatch('cml/messages/success', 'Medium added', { root: true })
        dispatch('set', { mediaId: media.id, uid })

        return media
      })
      .catch(e => {
        commit('cml/sync/stop', `mediasAdd-${uid}`, { root: true })
        const error = e.response ? e.response.body.error : 'Network error'
        dispatch('cml/messages/error', error, { root: true })

        throw error
      })
  },

  remove ({ commit, dispatch, rootGetters }, { id, uid }) {
    commit('cml/sync/start', `mediasRemove-${uid}`, { root: true })
    return api
      .deleteMedium(id)
      .then(r => {
        commit('cml/sync/stop', `mediasRemove-${uid}`, { root: true })
        commit('remove', { mediaId: id, uid })
        dispatch('cml/messages/success', 'Medium removed', { root: true })
        if (state.actives[uid].id === id) {
          dispatch('set', { uid })
        }
        dispatch(
          'cml/annotations/list',
          { layerId: rootGetters['cml/layers/id'](uid), uid },
          {
            root: true
          }
        )

        return id
      })
      .catch(e => {
        commit('cml/sync/stop', `mediasRemove-${uid}`, { root: true })
        const error = e.response ? e.response.body.error : 'Network error'
        dispatch('cml/messages/error', error, { root: true })

        throw error
      })
  },

  update ({ commit, dispatch, state, rootState }, { element, uid }) {
    commit('cml/sync/start', `mediasUpdate-${uid}`, { root: true })
    return api
      .updateMedium(element.id, {
        name: element.name,
        description: element.description,
        url: element.url
      })
      .then(r => {
        commit('cml/sync/stop', `mediasUpdate-${uid}`, { root: true })
        const media = Object.assign({}, element)
        media.name = r.data.name
        media.url = r.data.url
        media.description = r.data.description || {}
        commit('update', { media, uid })
        dispatch('cml/messages/success', 'Medium updated', { root: true })

        return media
      })
      .catch(e => {
        commit('cml/sync/stop', `mediasUpdate-${uid}`, { root: true })
        const error = e.response ? e.response.body.error : 'Network error'
        dispatch('cml/messages/error', error, { root: true })

        throw error
      })
  },

  list ({ dispatch, commit }, { corpuId, uid }) {
    commit('cml/sync/start', `mediasList-${uid}`, { root: true })
    return api
      .getMedia({ filter: { id_corpus: corpuId } })
      .then(r => {
        commit('cml/sync/stop', `mediasList-${uid}`, { root: true })
        const medias = r.data.map(media => {
          return mediaFormat(media)
        })
        commit('list', { medias, uid })
        dispatch('set', { uid })

        return medias
      })
      .catch(e => {
        commit('cml/sync/stop', `mediasList-${uid}`, { root: true })
        const error = e.response ? e.response.body.error : 'Network error'
        dispatch('cml/messages/error', error, { root: true })

        throw error
      })
  },

  set ({ getters, commit }, { mediaId, uid }) {
    commit('set', { mediaId: mediaId || getters.id(uid), uid })
  },

  play ({ state, commit }, uid) {
    const timeStart = Date.now()
    const timeCurrent = state.actives[uid].timeCurrent
    interval = setInterval(() => {
      var timeEllapsed = Date.now() - timeStart
      commit('timeCurrent', timeCurrent + timeEllapsed)
    }, 0)
    commit('play', uid)
  },

  pause ({ commit }, uid) {
    clearInterval(interval)
    commit('pause', uid)
  },

  stop ({ commit, dispatch }, uid) {
    clearInterval(interval)
    commit('pause', uid)
    dispatch('seek', { options: { ratio: 0, serverRequest: true }, uid })
  },

  seek ({ state, commit, dispatch }, { ratio, serverRequest, uid }) {
    if (state.actives[uid].isPlaying) {
      clearInterval(interval)
    }
    commit('timeCurrent', ratio * state.actives[uid].timeTotal)
    commit('seek', { options: { seeking: true, serverRequest }, uid })
  }
}

export const getters = {
  id: state => uid =>
    (state.actives[uid] &&
      state.lists[uid].map(c => c.id).indexOf(state.actives[uid].id) !== -1 &&
      state.actives[uid].id) ||
    (state.lists[uid][0] && state.lists[uid][0].id) ||
    null
}

export const mutations = {
  reset (state) {
    state.lists = {}
    state.actives = {}
  },

  add (state, { media, uid }) {
    const index = state.lists[uid].length
    Vue.set(state.lists[uid], index, media)
  },

  update (state, { media, uid }) {
    const index = state.lists[uid].findIndex(m => m.id === media.id)
    Vue.set(state.lists[uid], index, media)
  },

  remove (state, { mediaId, uid }) {
    const index = state.lists[uid].findIndex(m => m.id === mediaId)
    if (index !== -1) {
      Vue.delete(state.lists[uid], index)
    }
  },

  list (state, { medias, uid }) {
    Vue.set(state.lists, uid, medias)
  },

  set (state, { mediaId, uid }) {
    Vue.set(state.actives, uid, {
      id: mediaId,
      timeTotal: 0,
      timeCurrent: 0,
      isPlaying: false,
      isLoaded: false,
      seek: { seeking: false }
    })
  },

  loaded (state, { isLoaded, uid }) {
    Vue.set(state.actives[uid], 'isLoaded', isLoaded)
  },

  play (state, uid) {
    Vue.set(state.actives[uid], 'isPlaying', true)
  },

  pause (state, uid) {
    Vue.set(state.actives[uid], 'isPlaying', false)
  },

  timeCurrent (state, { time, uid }) {
    Vue.set(state.actives[uid], 'timeCurrent', time)
  },

  timeTotal (state, { time, uid }) {
    Vue.set(state.actives[uid], 'timeTotal', time)
  },

  seek (state, { options, uid }) {
    Vue.set(state.actives[uid], 'seek', options)
  }
}

export default {
  namespaced: true,
  state,
  actions,
  getters,
  mutations
}
