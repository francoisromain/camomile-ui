import { createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'

import { actions, mutations } from '../index'
import messages from '../messages'
import popup from '../popup'
import sync from '../sync'
import user from '../user'
import groups from '../groups'
import users from '../users'
import corpus from '../corpus'
import medias from '../medias'
import layers from '../layers'
import annotations from '../annotations'
import api from '../__mocks__/_api.js'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('store sync actions', () => {
  let store

  beforeEach(() => {
    sync.state = {
      list: []
    }

    store = new Vuex.Store({
      state: {
        api
      },
      actions,
      mutations,
      modules: {
        users,
        messages,
        sync,
        corpus,
        popup,
        user,
        groups,
        medias,
        layers,
        annotations
      }
    })
  })

  it('dispatchs all', () => {
    expect.assertions(1)
    return store.dispatch('sync/all').then(r => {
      expect(store.state.messages.list[0].content).toBe('Synced with server')
    })
  })

  it('starts', () => {
    expect.assertions(1)
    return store.dispatch('sync/start', 'annotationsAdd').then(r => {
      expect(store.state.sync.list).toEqual(['annotationsAdd'])
    })
  })

  it('stops', () => {
    expect.assertions(1)
    return store.dispatch('sync/stop', 'annotationsAdd').then(r => {
      expect(store.state.sync.list).toEqual([])
    })
  })
})

describe('store sync getters', () => {
  const { active } = sync.getters

  it('returns the number of active requests', () => {
    const state = {
      list: ['corpusAdd', 'corpusRemove']
    }

    expect(active(state)).toBe(2)
  })
})
