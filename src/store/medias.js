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
  add({ state, commit, dispatch, rootGetters }, { element }) {
    dispatch('cml/sync/start', `mediasAdd`, { root: true })
    return api
      .createMedium(
        element.corpuId,
        element.name,
        element.url,
        element.description
      )
      .then(r => {
        dispatch('cml/sync/stop', `mediasAdd`, { root: true })
        const media = mediaFormat(r.data)
        Object.keys(state.lists).forEach(uid => {
          if (rootGetters['cml/corpus/id'](uid) === element.corpuId) {
            commit('add', { media, uid })
            if (!state.actives[uid]) {
              commit('set', { id: media.id, uid })
            }
          }
        })
        dispatch('cml/messages/success', 'Medium added', { root: true })

        return media
      })
      .catch(e => {
        dispatch('cml/sync/stop', `mediasAdd`, { root: true })
        dispatch('cml/messages/error', e.message, { root: true })

        throw e
      })
  },

  remove({ state, commit, dispatch }, { id }) {
    dispatch('cml/sync/start', `mediasRemove`, { root: true })
    return api
      .deleteMedium(id)
      .then(r => {
        dispatch('cml/sync/stop', `mediasRemove`, { root: true })
        Object.keys(state.lists).forEach(uid => {
          commit('remove', { id, uid })
        })
        dispatch('cml/messages/success', 'Medium removed', { root: true })
        dispatch('setAll', { id })

        return id
      })
      .catch(e => {
        dispatch('cml/sync/stop', `mediasRemove`, { root: true })
        dispatch('cml/messages/error', e.message, { root: true })

        throw e
      })
  },

  update({ state, commit, dispatch, rootGetters }, { element }) {
    dispatch('cml/sync/start', `mediasUpdate`, { root: true })
    return api
      .updateMedium(element.id, {
        name: element.name,
        description: element.description,
        url: element.url
      })
      .then(r => {
        dispatch('cml/sync/stop', `mediasUpdate`, { root: true })
        const media = Object.assign({}, element)
        media.name = r.data.name
        media.url = r.data.url
        media.description = r.data.description || {}
        Object.keys(state.lists).forEach(uid => {
          if (rootGetters['cml/corpus/id'](uid) === element.corpuId) {
            console.log('media-update', uid, media)
            commit('update', { media, uid })
          }
        })
        dispatch('cml/messages/success', 'Medium updated', { root: true })

        return media
      })
      .catch(e => {
        dispatch('cml/sync/stop', `mediasUpdate`, { root: true })
        dispatch('cml/messages/error', e.message, { root: true })

        throw e
      })
  },

  list({ dispatch, commit }, { corpuId, uid }) {
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

  setAll({ state, dispatch }, { id }) {
    Object.keys(state.actives).forEach(uid => {
      if (state.actives[uid] === id) {
        dispatch('set', { uid })
      }

      dispatch('cml/annotations/listAll', { uid }, { root: true })
    })
  },

  set({ state, getters, dispatch, commit }, { id, uid }) {
    if (state.properties[uid] && state.properties[uid].isPlaying) {
      dispatch('pause', uid)
    }
    commit('set', { id: id || getters.id(uid), uid })
  },

  play({ state, commit }, uid) {
    const timeStart = Date.now()
    const timeCurrent = state.properties[uid].timeCurrent
    interval = setInterval(() => {
      var timeEllapsed = Date.now() - timeStart
      // commit('timeCurrent', { time: timeCurrent + timeEllapsed, uid })
      Vue.set(state.properties[uid], 'timeCurrent', timeCurrent + timeEllapsed)
    }, 0)
    commit('play', uid)
  },

  pause({ commit }, uid) {
    clearInterval(interval)
    commit('pause', uid)
  },

  buffering({ commit }, uid) {
    clearInterval(interval)
  },

  stop({ commit, dispatch }, uid) {
    clearInterval(interval)
    commit('pause', uid)
    dispatch('seek', { options: { ratio: 0, serverRequest: true }, uid })
  },

  seek({ state, commit, dispatch }, { ratio, serverRequest, uid }) {
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
  init(state, uid) {
    Vue.set(state.lists, uid, [])
    Vue.set(state.actives, uid, null)
    Vue.set(state.properties, uid, {})
  },

  resetAll(state) {
    Vue.set(state, 'lists', {})
    Vue.set(state, 'actives', {})
    Vue.set(state, 'properties', {})
  },

  add(state, { media, uid }) {
    const index = state.lists[uid].length
    Vue.set(state.lists[uid], index, media)
  },

  update(state, { media, uid }) {
    const index = state.lists[uid].findIndex(m => m.id === media.id)
    Vue.set(state.lists[uid], index, media)
  },

  remove(state, { id, uid }) {
    const listIndex = state.lists[uid].findIndex(m => m.id === id)
    if (listIndex !== -1) {
      Vue.delete(state.lists[uid], listIndex)
    }
  },

  list(state, { medias, uid }) {
    Vue.set(state.lists, uid, medias)
  },

  set(state, { id, uid }) {
    Vue.set(state.actives, uid, id)
    Vue.set(state.properties, uid, {
      timeTotal: 0,
      timeCurrent: 0,
      isPlaying: false,
      isLoaded: false,
      seek: { seeking: false }
    })
  },

  loaded(state, { isLoaded, uid }) {
    Vue.set(state.properties[uid], 'isLoaded', isLoaded)
  },

  play(state, uid) {
    Vue.set(state.properties[uid], 'isPlaying', true)
  },

  pause(state, uid) {
    Vue.set(state.properties[uid], 'isPlaying', false)
  },

  timeTotal(state, { time, uid }) {
    Vue.set(state.properties[uid], 'timeTotal', time)
  },

  seek(state, { options, uid }) {
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
