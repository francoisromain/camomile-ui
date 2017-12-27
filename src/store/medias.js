import Vue from 'vue'
import api from './_api'
import { mediaFormat } from './_helpers'

let interval

export const state = {
  lists: {},
  actives: {},
  properties: {}
}

export const actions = {
  add ({ commit, dispatch }, { element, uid }) {
    dispatch('cml/sync/start', `mediasAdd-${uid}`, { root: true })
    return api
      .createMedium(
        element.corpuId,
        element.name,
        element.url,
        element.description
      )
      .then(r => {
        dispatch('cml/sync/stop', `mediasAdd-${uid}`, { root: true })
        const media = mediaFormat(r.data)
        commit('add', { media, uid })
        dispatch('cml/messages/success', 'Medium added', { root: true })
        dispatch('set', { mediaId: media.id, uid })

        return media
      })
      .catch(e => {
        dispatch('cml/sync/stop', `mediasAdd-${uid}`, { root: true })
        dispatch('cml/messages/error', e.message, { root: true })

        throw e
      })
  },

  remove ({ commit, dispatch, rootGetters }, { id, uid }) {
    dispatch('cml/sync/start', `mediasRemove-${uid}`, { root: true })
    return api
      .deleteMedium(id)
      .then(r => {
        dispatch('cml/sync/stop', `mediasRemove-${uid}`, { root: true })
        commit('remove', { mediaId: id, uid })
        dispatch('cml/messages/success', 'Medium removed', { root: true })
        if (state.actives[uid] === id) {
          dispatch('set', { uid })
        }
        dispatch(
          'cml/annotations/list',
          { layerId: rootGetters['cml/layers/id'](uid), uid },
          { root: true }
        )

        return id
      })
      .catch(e => {
        dispatch('cml/sync/stop', `mediasRemove-${uid}`, { root: true })
        dispatch('cml/messages/error', e.message, { root: true })

        throw e
      })
  },

  update ({ commit, dispatch, state, rootState }, { element, uid }) {
    dispatch('cml/sync/start', `mediasUpdate-${uid}`, { root: true })
    return api
      .updateMedium(element.id, {
        name: element.name,
        description: element.description,
        url: element.url
      })
      .then(r => {
        dispatch('cml/sync/stop', `mediasUpdate-${uid}`, { root: true })
        const media = Object.assign({}, element)
        media.name = r.data.name
        media.url = r.data.url
        media.description = r.data.description || {}
        commit('update', { media, uid })
        dispatch('cml/messages/success', 'Medium updated', { root: true })

        return media
      })
      .catch(e => {
        dispatch('cml/sync/stop', `mediasUpdate-${uid}`, { root: true })
        dispatch('cml/messages/error', e.message, { root: true })

        throw e
      })
  },

  list ({ dispatch, commit }, { corpuId, uid }) {
    dispatch('cml/sync/start', `mediasList-${uid}`, { root: true })
    return api
      .getMedia({ filter: { id_corpus: corpuId } })
      .then(r => {
        dispatch('cml/sync/stop', `mediasList-${uid}`, { root: true })
        const medias = r.data.map(media => {
          return mediaFormat(media)
        })
        commit('list', { medias, uid })
        dispatch('set', { uid })

        return medias
      })
      .catch(e => {
        dispatch('cml/sync/stop', `mediasList-${uid}`, { root: true })
        dispatch('cml/messages/error', e.message, { root: true })

        throw e
      })
  },

  set ({ state, getters, dispatch, commit }, { mediaId, uid }) {
    if (state.properties[uid] && state.properties[uid].isPlaying) {
      dispatch('pause', uid)
    }
    commit('set', { mediaId: mediaId || getters.id(uid), uid })
  },

  play ({ state, commit }, uid) {
    const timeStart = Date.now()
    const timeCurrent = state.properties[uid].timeCurrent
    interval = setInterval(() => {
      var timeEllapsed = Date.now() - timeStart
      // commit('timeCurrent', { time: timeCurrent + timeEllapsed, uid })
      Vue.set(state.properties[uid], 'timeCurrent', timeCurrent + timeEllapsed)
    }, 0)
    commit('play', uid)
  },

  pause ({ commit }, uid) {
    clearInterval(interval)
    commit('pause', uid)
  },

  buffering ({ commit }, uid) {
    clearInterval(interval)
  },

  stop ({ commit, dispatch }, uid) {
    clearInterval(interval)
    commit('pause', uid)
    dispatch('seek', { options: { ratio: 0, serverRequest: true }, uid })
  },

  seek ({ state, commit, dispatch }, { ratio, serverRequest, uid }) {
    if (state.properties[uid].isPlaying) {
      clearInterval(interval)
    }
    // commit('timeCurrent', {
    //   time: ratio * state.properties[uid].timeTotal,
    //   uid
    // })

    Vue.set(
      state.properties[uid],
      'timeCurrent',
      ratio * state.properties[uid].timeTotal
    )
    commit('seek', { options: { seeking: true, serverRequest }, uid })
  }
}

export const getters = {
  id: state => uid =>
    (state.actives[uid] &&
      state.lists[uid].map(c => c.id).indexOf(state.actives[uid]) !== -1 &&
      state.actives[uid]) ||
    (state.lists[uid][0] && state.lists[uid][0].id) ||
    null
}

export const mutations = {
  reset (state, uid) {
    Vue.set(state.lists, uid, [])
    Vue.delete(state.actives, uid)
    Vue.delete(state.properties, uid)
  },

  resetAll (state) {
    Vue.set(state, 'lists', {})
    Vue.set(state, 'actives', {})
    Vue.set(state, 'properties', {})
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
    Vue.set(state.actives, uid, mediaId)
    Vue.set(state.properties, uid, {
      timeTotal: 0,
      timeCurrent: 0,
      isPlaying: false,
      isLoaded: false,
      seek: { seeking: false }
    })
  },

  loaded (state, { isLoaded, uid }) {
    Vue.set(state.properties[uid], 'isLoaded', isLoaded)
  },

  play (state, uid) {
    Vue.set(state.properties[uid], 'isPlaying', true)
  },

  pause (state, uid) {
    Vue.set(state.properties[uid], 'isPlaying', false)
  },

  timeTotal (state, { time, uid }) {
    Vue.set(state.properties[uid], 'timeTotal', time)
  },

  seek (state, { options, uid }) {
    Vue.set(state.properties[uid], 'seek', options)
  }
}

export default {
  namespaced: true,
  state,
  actions,
  getters,
  mutations
}
