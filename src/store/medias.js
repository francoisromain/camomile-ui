import Vue from 'vue'
import api from './_api'
import { mediaFormat } from './_helpers'

export const state = {
  lists: {},
  actives: {},
  properties: {}
}

export const actions = {
  // Add a new media
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

        // Loop over the media-lists to add the new media
        Object.keys(state.lists).forEach(corpuUid => {
          // If the new media belongs to the same corpus as the current media-list
          if (rootGetters['cml/corpus/id'](corpuUid) === element.corpuId) {
            // Add the new media to the media-list
            commit('add', { media, corpuUid })
            // Loop over the active medias
            Object.keys(state.actives).forEach(uid => {
              // If the active media belongs to the same corpus Uid as the current media-list
              if (state.actives[uid].corpuUid === corpuUid) {
                // Activate the new media
                dispatch('set', { id: media.id, corpuUid, uid })
              }
            })
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
        Object.keys(state.lists).forEach(corpuUid => {
          const listIndex = state.lists[corpuUid].findIndex(m => m.id === id)
          if (listIndex !== -1) {
            commit('remove', { listIndex, corpuUid })
          }
        })
        dispatch('unsetAll', { id })
        dispatch('cml/messages/success', 'Medium removed', { root: true })

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
        Object.keys(state.lists).forEach(corpuUid => {
          if (rootGetters['cml/corpus/id'](corpuUid) === element.corpuId) {
            commit('update', { media, corpuUid })
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

  // List the medias
  list({ dispatch, commit }, { corpuId, corpuUid }) {
    dispatch('cml/sync/start', `mediasList-${corpuUid}`, { root: true })
    return api
      .getMedia({ filter: { id_corpus: corpuId } })
      .then(r => {
        dispatch('cml/sync/stop', `mediasList-${corpuUid}`, { root: true })
        // Format the server response
        const medias = r.data.map(media => {
          return mediaFormat(media)
        })

        // Commit media list
        commit('list', { medias, corpuUid })
        console.log('rrr', r)

        // Loop over the active medias
        Object.keys(state.actives).forEach(uid => {
          // If the active media belongs to the same corpus Uid as the current media-list
          if (state.actives[uid].corpuUid === corpuUid) {
            // Activate a media
            dispatch('set', { corpuUid, uid })
          }
        })

        return medias
      })
      .catch(e => {
        dispatch('cml/sync/stop', `mediasList-${corpuUid}`, { root: true })
        dispatch('cml/messages/error', e.message, { root: true })

        throw e
      })
  },

  register({ state, commit }, { uid, corpuUid }) {
    commit('register', { uid, corpuUid })
  },

  unsetAll({ state, dispatch }, { id }) {
    Object.keys(state.actives).forEach(uid => {
      if (state.actives[uid].id === id) {
        dispatch('set', { corpuUid: state.actives[uid].corpuUid, uid })
      }
    })
  },

  // Set the active media for a uid
  set({ state, getters, dispatch, commit }, { id, corpuUid, uid }) {
    // Before, stop the media if playing
    if (state.properties[uid] && state.properties[uid].isPlaying) {
      dispatch('pause', { uid })
    }

    // Set the active media for this uid
    // If the media id is not defined, get one
    commit('set', { id: id || getters.id({ corpuUid, uid }), corpuUid, uid })
    dispatch(
      'cml/annotations/mediaSet',
      {
        mediaId: state.actives[uid].id,
        mediaUid: uid
      },
      { root: true }
    )
  },

  play({ state, commit }, { uid }) {
    const timeStart = Date.now()
    const timeCurrent = state.properties[uid].timeCurrent
    state.properties[uid].interval = setInterval(() => {
      var timeEllapsed = Date.now() - timeStart
      // commit('timeCurrent', { time: timeCurrent + timeEllapsed, uid })
      Vue.set(state.properties[uid], 'timeCurrent', timeCurrent + timeEllapsed)
    }, 0)
    commit('play', { uid })
  },

  pause({ state, commit }, { uid }) {
    clearInterval(state.properties[uid].interval)
    commit('pause', { uid })
  },

  buffering({ state, commit }, { uid }) {
    clearInterval(state.properties[uid].interval)
  },

  stop({ state, commit, dispatch }, { uid }) {
    clearInterval(state.properties[uid].interval)
    commit('pause', { uid })
    dispatch('seek', {
      ratio: 0,
      serverRequest: true,
      uid
    })
  },

  seek({ state, commit, dispatch }, { ratio, serverRequest, uid }) {
    if (state.properties[uid].isPlaying) {
      clearInterval(state.properties[uid].interval)
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
  // Get the id of the active media
  // or the id of the first media in the list
  id: state => ({ corpuUid, uid }) =>
    // If an active media is defined for this uid
    (state.actives[uid] &&
      state.lists[corpuUid].find(c => c.id === state.actives[uid].id) &&
      state.actives[uid].id) ||
    // Else, get the first id of the media-list
    (state.lists[corpuUid][0] && state.lists[corpuUid][0].id) ||
    null,

  // Get the prpoerties of the active media
  properties: (state, getters) => (uid, filter) => {
    return getters.active(uid, filter) ? state.properties[uid] : {}
  },

  // Get the active media
  active: state => (uid, filter) => {
    const active = state.actives[uid]
    filter =
      filter ||
      function(m) {
        return m
      }
    return active && state.lists[active.corpuUid]
      ? filter(state.lists[active.corpuUid].find(m => m.id === active.id))
      : null
  }
}

export const mutations = {
  register(state, { uid, corpuUid }) {
    Vue.set(state.actives, uid, { corpuUid })
    Vue.set(state.properties, uid, null)
  },

  resetAll(state) {
    Vue.set(state, 'lists', {})
    Vue.set(state, 'actives', {})
    Vue.set(state, 'properties', {})
  },

  add(state, { media, corpuUid }) {
    const index = state.lists[corpuUid].length
    Vue.set(state.lists[corpuUid], index, media)
  },

  update(state, { media, corpuUid }) {
    const index = state.lists[corpuUid].findIndex(m => m.id === media.id)
    Vue.set(state.lists[corpuUid], index, media)
  },

  remove(state, { listIndex, corpuUid }) {
    Vue.delete(state.lists[corpuUid], listIndex)
  },

  list(state, { medias, corpuUid }) {
    Vue.set(state.lists, corpuUid, medias)
  },

  set(state, { id, corpuUid, uid }) {
    Vue.set(state.actives, uid, { corpuUid, id })
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

  play(state, { uid }) {
    Vue.set(state.properties[uid], 'isPlaying', true)
  },

  pause(state, { uid }) {
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
