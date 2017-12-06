import { createLocalVue } from 'vue-test-utils'
import Vuex from 'vuex'
import messages from '../messages'
import popup from '../popup'
import sync from '../sync'
import user from '../user'
import groups from '../groups'
import users from '../users'
import corpus from '../corpus'

const localVue = createLocalVue()
localVue.use(Vuex)

jest.mock('../_api.js')

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
      list: [{ id: 'mocks-group-id-1' }, { id: 'mocks-group-id-2' }]
    }

    user.state = {
      id: 'mocks-user-id-lu',
      name: 'lu',
      groupIds: ['mocks-group-id-1'],
      description: {}
    }

    corpus.state = {
      list: [
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

    store = new Vuex.Store({
      modules: {
        cml: {
          namespaced: true,
          modules: {
            users,
            messages,
            sync,
            corpus,
            popup,
            user,
            groups
          }
        }
      }
    })
  })

  it('adds a new user', () => {
    const user = {
      name: 'yoc',
      role: 'user',
      description: 'Ipsum Sit Dolor',
      password: 'password'
    }

    expect.assertions(3)
    return store.dispatch('cml/users/add', user).then(r => {
      expect(store.state.cml.users.list).toEqual([
        { description: {}, id: 'mocks-user-id-lu', name: 'lu', role: 'user' },
        { description: {}, id: 'mocks-user-id-ji', name: 'ji', role: 'admin' },
        { description: {}, id: 'mocks-user-id-joe', name: 'joe', role: 'user' },
        {
          description: 'Ipsum Sit Dolor',
          id: 'mocks-user-id-new',
          name: 'yoc',
          role: 'user'
        }
      ])
      expect(store.state.cml.corpus.list[0].permissions.users).toEqual({
        'mocks-user-id-ji': 2,
        'mocks-user-id-joe': 3,
        'mocks-user-id-lu': 1,
        'mocks-user-id-new': 0
      })
      expect(store.state.cml.messages.list[0].content).toBe('User added')
    })
  })

  it('adds a new user (error)', () => {
    const user = {
      name: '' // throw an error
    }

    expect.assertions(2)
    return store.dispatch('cml/users/add', user).catch(e => {
      expect(e).toEqual('Network error')
      expect(store.state.cml.messages.list[0].content).toBe('Network error')
    })
  })

  it('updates a user', () => {
    const u = {
      id: 'mocks-user-id-lu',
      name: 'lu',
      role: 'admin',
      description: { test: 'meoi oiou' },
      password: 'drowssap'
    }

    expect.assertions(3)
    return store.dispatch('cml/users/update', u).then(r => {
      expect(store.state.cml.users.list).toEqual([
        {
          description: { test: 'meoi oiou' },
          id: 'mocks-user-id-lu',
          name: 'lu',
          role: 'admin'
        },
        { description: {}, id: 'mocks-user-id-ji', name: 'ji', role: 'admin' },
        { description: {}, id: 'mocks-user-id-joe', name: 'joe', role: 'user' }
      ])
      expect(store.state.cml.user.description).toEqual({ test: 'meoi oiou' })
      expect(store.state.cml.messages.list[0].content).toBe('User updated')
    })
  })

  it('updates a user (error)', () => {
    const user = {
      id: ''
    }

    expect.assertions(2)
    return store.dispatch('cml/users/update', user).catch(e => {
      expect(e).toEqual('Network error')
      expect(store.state.cml.messages.list[0].content).toBe('Network error')
    })
  })

  it('removes a user', () => {
    const user = {
      id: 'mocks-user-id-lu',
      name: 'lu',
      role: 'user',
      description: {}
    }

    expect.assertions(3)
    return store.dispatch('cml/users/remove', user).then(r => {
      expect(store.state.cml.messages.list[0].content).toBe('User removed')
      expect(store.state.cml.users.list).toEqual([
        { description: {}, id: 'mocks-user-id-ji', name: 'ji', role: 'admin' },
        { description: {}, id: 'mocks-user-id-joe', name: 'joe', role: 'user' }
      ])
      expect(store.state.cml.corpus.list[0].permissions.users).toEqual({
        'mocks-user-id-ji': 2,
        'mocks-user-id-joe': 3
      })
    })
  })

  it('removes a user (error)', () => {
    const user = {
      id: ''
    }

    expect.assertions(2)
    return store.dispatch('cml/users/remove', user).catch(e => {
      expect(e).toEqual('Network error')
      expect(store.state.cml.messages.list[0].content).toBe('Network error')
    })
  })

  it('list all users', () => {
    expect.assertions(1)
    return store.dispatch('cml/users/list').then(r => {
      expect(store.state.cml.users.list).toEqual([
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
        cml: {
          namespaced: true,
          modules: {
            users
          }
        }
      }
    })
  })

  const permissions = {
    'mocks-user-id-joe': 3,
    'mocks-user-id-lu': 2
  }

  it('returns user permissions', () => {
    expect(store.getters['cml/users/permissions'](permissions)).toEqual({
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
