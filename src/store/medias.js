import Vue from 'vue'
import { mediaFormat } from './_helpers'

// Lists contains, for each corpuUid, an array of media objects
// Actives contains, for each mediaUid, a media id and a reference to the corpuUid
// Properties contains, for each mediaUid, the properties of the current media

/* Example

{
  lists {
    'corpu-uid-string-1': [{
      id: 'media-id-hash-1',
      name: 'media-name-string',
      url: 'http://media-string.url',
      corpuId: 'corpu-id-hash-1',
      description: {
        type: 'media-type-string',
        …
      }
    }, {
      …
    }],
    'corpu-uid-string-2: [
      …
    ]
  },
  actives: {
    'media-uid-string-1': {
      id: 'media-id-hash-1',
      corpuUid: 'corpu-uid-string'
    },
    'media-uid-string-2': {
      …
    }
  },
  porperties: {
    'media-uid-string-1': {
      isLoaded: boolean,
      isPlaying: boolean,
      timecurrent: Number,
      timeTotal: number,
      seek: {
        seeking: Boolean
      }
    }, 
    'media-uid-string-2': {
      …
    }
  }
}
*/

export const state = {
  lists: {},
  actives: {},
  properties: {}
}

export const actions = {
  // Add a new media
  add({ state, commit, dispatch, rootState, rootGetters }, { element }) {
    dispatch('cml/sync/start', `mediasAdd`, { root: true })
    return rootState.cml.api
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

  // Remove a media
  remove({ state, commit, dispatch, rootState }, { id }) {
    dispatch('cml/sync/start', `mediasRemove`, { root: true })
    return rootState.cml.api
      .deleteMedium(id)
      .then(r => {
        dispatch('cml/sync/stop', `mediasRemove`, { root: true })

        // Loop over the corpuUid
        Object.keys(state.lists).forEach(corpuUid => {
          // If the media belongs to this corpuuid
          const listIndex = state.lists[corpuUid].findIndex(m => m.id === id)
          if (listIndex !== -1) {
            // Remove the media from the list
            commit('remove', { listIndex, corpuUid })
          }
        })

        // Re-set a new media in every mediaUid where it is active
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

  // Update a media
  update({ state, commit, dispatch, rootState, rootGetters }, { element }) {
    dispatch('cml/sync/start', `mediasUpdate`, { root: true })
    return rootState.cml.api
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

        // Loop over the corpuUid
        Object.keys(state.lists).forEach(corpuUid => {
          // If the corpu active in this corpuUid equals the media's corpuUid
          if (rootGetters['cml/corpus/id'](corpuUid) === element.corpuId) {
            // update the media
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
  list({ dispatch, commit, rootState }, { corpuId, corpuUid }) {
    dispatch('cml/sync/start', `mediasList-${corpuUid}`, { root: true })
    return rootState.cml.api
      .getMedia({ filter: { id_corpus: corpuId } })
      .then(r => {
        dispatch('cml/sync/stop', `mediasList-${corpuUid}`, { root: true })
        // Format the server response
        const medias = r.data.map(media => {
          return mediaFormat(media)
        })

        // Commit media list
        commit('list', { medias, corpuUid })

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

  // Register a mediaUid in a corpuUid
  register({ commit }, { uid, corpuUid }) {
    commit('register', { uid, corpuUid })
  },

  // Re-set a new media in every mediaUid where it is active
  unsetAll({ state, dispatch }, { id }) {
    // loop over the mediaUids
    Object.keys(state.actives).forEach(uid => {
      // If the media is active in this mediaUid
      if (state.actives[uid].id === id) {
        // Set a new active media
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

  // Play the media in a mediaUid
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

  // Pause a media in a mediaUid
  pause({ state, commit }, { uid }) {
    clearInterval(state.properties[uid].interval)
    commit('pause', { uid })
  },

  // Wait the media while buffering, in a mediaUid
  buffering({ state, commit }, { uid }) {
    clearInterval(state.properties[uid].interval)
  },

  // Stop a media in a mediaUid
  stop({ state, commit, dispatch }, { uid }) {
    clearInterval(state.properties[uid].interval)
    commit('pause', { uid })
    dispatch('seek', {
      ratio: 0,
      serverRequest: true,
      uid
    })
  },

  // Seek a media in a mediaUid
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
  // Register a mediaUid in a corpuUid
  register(state, { uid, corpuUid }) {
    Vue.set(state.actives, uid, { corpuUid })
    Vue.set(state.properties, uid, null)
  },

  // Reset all (on log-out)
  resetAll(state) {
    Vue.set(state, 'lists', {})
    Vue.set(state, 'actives', {})
    Vue.set(state, 'properties', {})
  },

  // Add a new media in a corpuuid
  add(state, { media, corpuUid }) {
    const index = state.lists[corpuUid].length
    Vue.set(state.lists[corpuUid], index, media)
  },

  // Update a media in a corpuuid
  update(state, { media, corpuUid }) {
    const index = state.lists[corpuUid].findIndex(m => m.id === media.id)
    Vue.set(state.lists[corpuUid], index, media)
  },

  // Remove a media from a corpuUid
  remove(state, { listIndex, corpuUid }) {
    Vue.delete(state.lists[corpuUid], listIndex)
  },

  // List medias in a corpuUid
  list(state, { medias, corpuUid }) {
    Vue.set(state.lists, corpuUid, medias)
  },

  // Set the active media in a mediaUid
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

  // Set the isLoaded property for a mediaUid
  loaded(state, { isLoaded, uid }) {
    Vue.set(state.properties[uid], 'isLoaded', isLoaded)
  },

  // Set the isplaying property to true in a mediauid
  play(state, { uid }) {
    Vue.set(state.properties[uid], 'isPlaying', true)
  },

  // Set the isplaying property to false in a mediauid
  pause(state, { uid }) {
    Vue.set(state.properties[uid], 'isPlaying', false)
  },

  // Set the timetotal property in a mediaUid
  timeTotal(state, { time, uid }) {
    Vue.set(state.properties[uid], 'timeTotal', time)
  },

  // Set the seek property in a mediauid
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
