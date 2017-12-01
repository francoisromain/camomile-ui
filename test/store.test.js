import { createLocalVue } from 'vue-test-utils'
import Vuex from 'vuex'
import { actions, getters, mutations } from '../src/store/sync'

const localVue = createLocalVue()

localVue.use(Vuex)

const { start, stop } = mutations

describe('store sync mutations', () => {
  const state = { list: [] }

  it('starts', () => {
    start(state, 'annotationsAdd')
    start(state, 'annotationsRemove')
    expect(state.list).toEqual(['annotationsAdd', 'annotationsRemove'])
  })

  it('stops', () => {
    stop(state, 'annotationsRemove')
    expect(state.list).toEqual(['annotationsAdd'])
  })
})

const { all } = actions

describe('store sync actions', () => {
  it('dispatchs all', () => {
    const state = {
      message: ''
    }
    const store = new Vuex.Store({
      state,
      actions: {
        all,
        'cml/set' () {
          return new Promise((resolve, reject) => resolve())
        },
        'cml/messages/success' ({ state, commit }, content) {
          state.message = 'Synced with server'
        }
      }
    })
    expect.assertions(1)
    return store.dispatch('all').then(r => {
      expect(state.message).toBe('Synced with server')
    })
  })
})

const { active } = getters

describe('store sync getters', () => {
  it('returns the number of active requests', () => {
    const state = {
      list: ['corpusAdd', 'corpusRemove']
    }

    expect(active(state)).toBe(2)
  })
})
