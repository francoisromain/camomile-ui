import { createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'

import { state, actions, getters, mutations } from '../index'
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

const localVue = createLocalVue()
localVue.use(Vuex)

jest.mock('../_api.js')

describe('store sync actions', () => {
  let store

  beforeEach(() => {
    sync.state = {
      list: []
    }

    store = new Vuex.Store({
      modules: {
        cml: {
          namespaced: true,
          state,
          actions,
          mutations,
          getters,
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
        }
      }
    })
  })

  it('dispatchs all', () => {
    expect.assertions(1)
    return store.dispatch('cml/sync/all').then(r => {
      expect(store.state.cml.messages.list[0].content).toBe(
        'Synced with server'
      )
    })
  })

  it('starts', () => {
    expect.assertions(1)
    return store.dispatch('cml/sync/start', 'annotationsAdd').then(r => {
      expect(store.state.cml.sync.list).toEqual(['annotationsAdd'])
    })
  })

  it('stops', () => {
    expect.assertions(1)
    return store.dispatch('cml/sync/stop', 'annotationsAdd').then(r => {
      expect(store.state.cml.sync.list).toEqual([])
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
