import { createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import { actions, mutations } from '../index'
import messages from '../messages'
import popup from '../popup'
import dropdown from '../dropdown'
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

describe('store user actions', () => {
  let store
  const config = {
    user: {
      name: 'lu',
      role: 'admin',
      description: { desc: 'Ipsum Sit Dolor' },
      password: 'password'
    }
  }

  beforeAll(() => {
    messages.state = {
      list: []
    }

    user.state = {
      id: '',
      name: '',
      role: '',
      description: '',
      groupIds: [],
      isLogged: false,
      isAdmin: false,
      isRoot: false
    }

    store = new Vuex.Store({
      modules: {
        cml: {
          namespaced: true,
          actions,
          mutations,
          modules: {
            users,
            messages,
            sync,
            popup,
            dropdown,
            user,
            groups,
            corpus,
            medias,
            layers,
            annotations
          }
        }
      }
    })
  })

  it('logs-in', () => {
    expect.assertions(1)
    return store
      .dispatch('cml/user/login', {
        user: { name: config.user.name, password: config.user.password }
      })
      .then(r => {
        expect(r).toBe('Authentication succeeded.')
      })
  })

  it('logs-in (error)', () => {
    return expect(
      store.dispatch('cml/user/login', {
        user: { name: config.user.name, password: '' }
      })
    ).rejects.toThrow('Incorrect username or password')
  })

  it('returns current user', () => {
    expect.assertions(1)
    return store.dispatch('cml/user/set').then(u => {
      expect(u).toEqual({
        name: 'lu',
        id: 'mocks-user-id-lu',
        role: 'admin',
        description: {
          desc: 'Nulla vitae elit libero, a pharetra augue.'
        },
        groupIds: []
      })
    })
  })

  it('logs-out', () => {
    expect.assertions(1)
    return store.dispatch('cml/user/logout').then(r => {
      expect(r).toBe('Logout succeeded.')
    })
  })

  it('returns current user (error)', () => {
    return expect(store.dispatch('cml/user/set')).rejects.toThrow('Api')
  })

  it('logs-out (error)', () => {
    return expect(store.dispatch('cml/user/logout')).rejects.toThrow('Api')
  })
})

describe('store user getters', () => {
  let store

  beforeEach(() => {
    user.state = {
      description: {},
      groupIds: ['mocks-group-id-1'],
      id: 'mocks-user-id-lu',
      isAdmin: true,
      isLogged: true,
      isRoot: false,
      name: 'lu',
      role: 'admin'
    }

    store = new Vuex.Store({
      modules: {
        cml: {
          namespaced: true,
          modules: {
            user
          }
        }
      }
    })
  })

  it('returns true if is admin', () => {
    const permissions = {
      users: {
        'mocks-user-id-joe': 3,
        'mocks-user-id-lu': 3
      }
    }

    expect(store.getters['cml/user/isAdmin'](permissions)).toBeTruthy()
  })

  it('returns false if is not admin', () => {
    const permissions = {
      users: {
        'mocks-user-id-joe': 3,
        'mocks-user-id-lu': 2
      }
    }

    expect(store.getters['cml/user/isAdmin'](permissions)).toBeFalsy()
  })

  it('returns true if is in admin group', () => {
    const permissions = {
      groups: {
        'mocks-group-id-1': 3,
        'mocks-group-id-2': 1
      }
    }

    expect(store.getters['cml/user/isAdmin'](permissions)).toBeTruthy()
  })

  it('returns false if is not in admin group', () => {
    const permissions = {
      users: {
        'mocks-group-id-1': 1,
        'mocks-group-id-2': 3
      }
    }

    expect(store.getters['cml/user/isAdmin'](permissions)).toBeFalsy()
  })
})

describe('store users mutations', () => {})
