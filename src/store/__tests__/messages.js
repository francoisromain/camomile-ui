import { createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import messages from '../messages'

jest.mock('../_helpers.js')
jest.useFakeTimers()

const localVue = createLocalVue()
localVue.use(Vuex)

describe('store messages actions', () => {
  let store

  beforeEach(() => {
    messages.state = { list: [] }
    store = new Vuex.Store({
      modules: {
        messages
      }
    })
  })

  it('adds a success message', () => {
    const content = 'the success message'

    expect.assertions(2)
    return store.dispatch('messages/success', content).then(r => {
      expect(store.state.messages.list).toEqual([
        { content: 'the success message', id: 86400000, type: 'success' }
      ])
      jest.runAllTimers()
      expect(store.state.messages.list).toEqual([])
    })
  })

  it('adds an error message', () => {
    const content = 'the error message'

    expect.assertions(2)
    return store.dispatch('messages/error', content).then(r => {
      expect(store.state.messages.list).toEqual([
        { content: 'the error message', id: 86400000, type: 'error' }
      ])
      jest.runAllTimers()
      expect(store.state.messages.list).toEqual([])
    })
  })
})

describe('store messages mutations', () => {
  const state = { list: [{ id: 'one' }, { id: 'two' }] }
  const message = { id: 'three' }

  it('removes a message in the list', () => {
    messages.mutations.remove(state)
    expect(state.list).toEqual([{ id: 'two' }])
  })

  it('adds a message in the list', () => {
    messages.mutations.add(state, message)
    expect(state.list).toEqual([{ id: 'two' }, { id: 'three' }])
  })
})
