import { createLocalVue } from 'vue-test-utils'
import Vuex from 'vuex'
import { actions, getters, mutations } from '../users'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('store users mutations', () => {
  const { reset, add, update, remove, list } = mutations
  const state = { list: [] }

  it('resets user list', () => {
    state.list = [
      { name: 'lu' },
      { name: 'xi' },
      { name: 'bo' },
      { name: 'ne' }
    ]
    reset(state)
    expect(state.list).toEqual([])
  })

  it('adds a user to the list', () => {
    state.list = []
    add(state, { name: 'ne' })
    expect(state.list).toEqual([{ name: 'ne' }])
  })

  it('updates a user in the list', () => {
    state.list = [
      { name: 'lu', id: 34, description: 'bla' },
      { name: 'mich', id: 65, description: 'beg' }
    ]
    update(state, { name: 'lu', id: 34, description: 'sho' })
    expect(state.list).toEqual([
      {
        name: 'lu',
        id: 34,
        description: 'sho'
      },
      {
        name: 'mich',
        id: 65,
        description: 'beg'
      }
    ])
  })

  it('removes a user in the list', () => {
    state.list = [
      { name: 'lu', id: 34, description: 'bla' },
      { name: 'mich', id: 65, description: 'beg' }
    ]
    remove(state, 34)
    expect(state.list).toEqual([
      {
        name: 'mich',
        id: 65,
        description: 'beg'
      }
    ])
  })

  it('adds a list of users', () => {
    state.list = [
      { name: 'bel', id: 25, description: 'org' },
      { name: 'pol', id: 69, description: 'bad' }
    ]
    list(state, [
      { name: 'lu', id: 34, description: 'bla' },
      { name: 'mich', id: 65, description: 'beg' }
    ])
    expect(state.list).toEqual([
      { name: 'lu', id: 34, description: 'bla' },
      { name: 'mich', id: 65, description: 'beg' }
    ])
  })
})
jest.mock('../_api.js')
describe('store users actions', () => {
  const { add, update, remove, list } = actions

  it('adds a new user', () => {
    const state = {
      message: ''
    }

    const actions = {
      add,
      'cml/messages/success' ({ state, commit }, content) {
        state.message = 'User added'
      }
    }

    const mutations = {
      'cml/sync/start' () {},
      'cml/sync/stop' () {},
      'cml/corpus/userAdd' () {},
      add (user) {}
    }

    const store = new Vuex.Store({
      state,
      actions,
      mutations
    })

    const user = {
      name: 'lu',
      role: 'user',
      description: 'blah',
      password: 'password'
    }

    expect.assertions(1)
    return store.dispatch('add', user).then(r => {
      expect(state.message).toBe('User added')
    })
  })
})
