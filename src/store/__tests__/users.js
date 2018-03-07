import { createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import messages from '../messages'
import popup from '../popup'
import sync from '../sync'
import user from '../user'
import groups from '../groups'
import users from '../users'
import corpus from '../corpus'
import layers from '../layers'
import api from '../__mocks__/_api.js'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('store users actions', () => {
  let store

  beforeEach(() => {
    users.state = {
      list: [
        {
          id: 'mocks-user-id-lu',
          name: 'lu',
          role: 'user',
          description: {}
        },
        {
          id: 'mocks-user-id-ji',
          name: 'ji',
          role: 'admin',
          description: {}
        },
        {
          id: 'mocks-user-id-joe',
          name: 'joe',
          role: 'user',
          description: {}
        }
      ]
    }

    messages.state = {
      list: []
    }

    groups.state = {
      lists: {
        default: [{ id: 'mocks-group-id-1' }, { id: 'mocks-group-id-2' }]
      }
    }

    user.state = {
      id: 'mocks-user-id-lu',
      name: 'lu',
      groupIds: ['mocks-group-id-1'],
      description: {}
    }

    corpus.state = {
      lists: {
        default: [
          {
            id: 'mocks-corpu-id-1',
            name: 'corpu-1',
            description: {},
            permissions: {
              groups: { 'mocks-group-id-1': 0, 'mocks-group-id-2': 0 },
              users: {
                'mocks-user-id-lu': 1,
                'mocks-user-id-ji': 2,
                'mocks-user-id-joe': 3
              }
            }
          },
          {
            id: 'mocks-corpu-id-2',
            name: 'corpu-2',
            description: {},
            permissions: {
              groups: { 'mocks-group-id-1': 0, 'mocks-group-id-2': 0 },
              users: {
                'mocks-user-id-lu': 3,
                'mocks-user-id-ji': 2,
                'mocks-user-id-joe': 1
              }
            }
          }
        ]
      }
    }

    layers.state = {
      actives: {
        default: 'mocks-layer-id-1'
      },
      lists: {
        default: []
      }
    }

    store = new Vuex.Store({
      state: {
        api
      },
      modules: {
        sync,
        popup,
        messages,
        user,
        users,
        groups,
        corpus,
        layers
      }
    })
  })

  it('adds a new user', () => {
    const element = {
      name: 'yoc',
      role: 'user',
      password: 'password'
    }

    expect.assertions(3)
    return store.dispatch('users/add', { element }).then(r => {
      expect(store.state.users.list).toEqual([
        { description: {}, id: 'mocks-user-id-lu', name: 'lu', role: 'user' },
        { description: {}, id: 'mocks-user-id-ji', name: 'ji', role: 'admin' },
        { description: {}, id: 'mocks-user-id-joe', name: 'joe', role: 'user' },
        {
          description: {},
          id: 'mocks-user-id-new',
          name: 'yoc',
          role: 'user'
        }
      ])
      expect(store.state.corpus.lists['default'][0].permissions.users).toEqual({
        'mocks-user-id-ji': 2,
        'mocks-user-id-joe': 3,
        'mocks-user-id-lu': 1,
        'mocks-user-id-new': 0
      })
      expect(store.state.messages.list[0].content).toBe('User added')
    })
  })

  it('adds a new user (error)', () => {
    const element = {
      name: '' // throw an error
    }
    return expect(store.dispatch('users/add', { element })).rejects.toThrow(
      'Incorrect name or password'
    )
  })

  it('updates a user', () => {
    const element = {
      id: 'mocks-user-id-lu',
      name: 'lu',
      role: 'admin',
      description: { test: 'meoi oiou' },
      password: 'drowssap'
    }

    expect.assertions(3)
    return store.dispatch('users/update', { element }).then(r => {
      expect(store.state.users.list).toEqual([
        {
          description: { test: 'meoi oiou' },
          id: 'mocks-user-id-lu',
          name: 'lu',
          role: 'admin'
        },
        { description: {}, id: 'mocks-user-id-ji', name: 'ji', role: 'admin' },
        { description: {}, id: 'mocks-user-id-joe', name: 'joe', role: 'user' }
      ])
      expect(store.state.user.description).toEqual({ test: 'meoi oiou' })
      expect(store.state.messages.list[0].content).toBe('User updated')
    })
  })

  it('updates a user (error)', () => {
    const element = {
      id: ''
    }

    return expect(store.dispatch('users/update', { element })).rejects.toThrow(
      'Api'
    )
  })

  it('removes a user', () => {
    const id = 'mocks-user-id-lu'

    expect.assertions(3)
    return store.dispatch('users/remove', { id }).then(r => {
      expect(store.state.messages.list[0].content).toBe('User removed')
      expect(store.state.users.list).toEqual([
        { description: {}, id: 'mocks-user-id-ji', name: 'ji', role: 'admin' },
        { description: {}, id: 'mocks-user-id-joe', name: 'joe', role: 'user' }
      ])
      expect(store.state.corpus.lists['default'][0].permissions.users).toEqual({
        'mocks-user-id-ji': 2,
        'mocks-user-id-joe': 3
      })
    })
  })

  it('removes a user (error)', () => {
    const id = 'mocks-user-id-incorrect'

    expect.assertions(2)
    return store.dispatch('users/remove', { id }).catch(e => {
      expect(() => {
        throw e
      }).toThrow('Incorrect user Id: mocks-user-id-incorrect')
      expect(store.state.messages.list[0].content).toBe(
        'Incorrect user Id: mocks-user-id-incorrect'
      )
    })
  })

  it('list all users', () => {
    expect.assertions(1)
    return store.dispatch('users/list').then(r => {
      expect(store.state.users.list).toEqual([
        { description: {}, id: 'mocks-user-id-lu', name: 'lu', role: 'user' },
        { description: {}, id: 'mocks-user-id-ji', name: 'ji', role: 'admin' },
        { description: {}, id: 'mocks-user-id-joe', name: 'joe', role: 'user' }
      ])
    })
  })
})

describe('store users getters', () => {
  let store

  beforeEach(() => {
    users.state = {
      list: [
        {
          id: 'mocks-user-id-lu',
          name: 'lu',
          role: 'user',
          description: {}
        },
        {
          id: 'mocks-user-id-ji',
          name: 'ji',
          role: 'admin',
          description: {}
        },
        {
          id: 'mocks-user-id-joe',
          name: 'joe',
          role: 'user',
          description: {}
        }
      ]
    }

    store = new Vuex.Store({
      modules: {
        users
      }
    })
  })

  const permissions = {
    'mocks-user-id-joe': 3,
    'mocks-user-id-lu': 2
  }

  it('returns user permissions', () => {
    expect(store.getters['users/permissions'](permissions)).toEqual({
      'mocks-user-id-ji': 0,
      'mocks-user-id-joe': 3,
      'mocks-user-id-lu': 2
    })
  })
})

describe('store users mutations', () => {
  const state = { list: [] }

  it('resets user list', () => {
    state.list = [
      { name: 'lu' },
      { name: 'xi' },
      { name: 'bo' },
      { name: 'ne' }
    ]
    users.mutations.reset(state)
    expect(state.list).toEqual([])
  })
})
