import { createLocalVue } from 'vue-test-utils'
import Vuex from 'vuex'
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

describe('store groups actions', () => {
  let store

  beforeEach(() => {
    messages.state = {
      list: []
    }

    user.state = {
      name: 'lu',
      id: 'mocks-user-id-lu',
      groupIds: ['mocks-group-id-1'],
      role: 'user',
      description: {},
      isLogged: true,
      isAdmin: false,
      isRoot: false
    }

    groups.state = {
      list: [
        {
          description: {},
          id: 'mocks-group-id-1',
          name: 'group-1',
          userIds: ['mocks-user-id-lu', 'mocks-user-id-ji']
        },
        {
          description: {},
          id: 'mocks-group-id-2',
          name: 'group-2',
          userIds: ['mocks-user-id-ji']
        }
      ]
    }

    users.state = {
      list: []
    }

    corpus.state = {
      actives: {
        default: 'mocks-corpu-id-1'
      },
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
            groups,
            medias,
            layers,
            annotations
          }
        }
      }
    })
  })

  it('adds a new group', () => {
    const element = {
      name: 'yoc',
      description: { dja: 'Ipsum Sit Dolor' }
    }

    expect.assertions(3)
    return store.dispatch('cml/groups/add', { element }).then(r => {
      expect(store.state.cml.groups.list).toEqual([
        {
          description: {},
          id: 'mocks-group-id-1',
          name: 'group-1',
          userIds: ['mocks-user-id-lu', 'mocks-user-id-ji']
        },
        {
          description: {},
          id: 'mocks-group-id-2',
          name: 'group-2',
          userIds: ['mocks-user-id-ji']
        },
        {
          description: { dja: 'Ipsum Sit Dolor' },
          id: 'mocks-group-id-new',
          name: 'yoc',
          userIds: []
        }
      ])
      expect(
        store.state.cml.corpus.lists['default'][0].permissions.groups
      ).toEqual({
        'mocks-group-id-1': 0,
        'mocks-group-id-2': 0,
        'mocks-group-id-new': 0
      })
      expect(store.state.cml.messages.list[0].content).toBe('Group added')
    })
  })

  it('adds a new group (error)', () => {
    const element = {
      name: '' // throw an the error
    }

    return expect(
      store.dispatch('cml/groups/add', { element })
    ).rejects.toThrow('Incorrect name')
  })

  it('removes a group', () => {
    const id = 'mocks-group-id-1'

    expect.assertions(3)
    return store.dispatch('cml/groups/remove', { id }).then(r => {
      expect(store.state.cml.messages.list[0].content).toBe('Group removed')
      expect(store.state.cml.groups.list).toEqual([
        {
          description: {},
          id: 'mocks-group-id-2',
          name: 'group-2',
          userIds: ['mocks-user-id-ji']
        }
      ])
      expect(
        store.state.cml.corpus.lists['default'][0].permissions.groups
      ).toEqual({
        'mocks-group-id-2': 0
      })
    })
  })

  it('removes a group (error)', () => {
    const id = '' // throw an the error

    return expect(store.dispatch('cml/groups/remove', { id })).rejects.toThrow(
      'Incorrect group Id'
    )
  })

  it('updates a group', () => {
    const element = {
      id: 'mocks-group-id-1',
      name: 'group-1',
      description: { test: 'meoi oiou' }
    }

    expect.assertions(2)
    return store.dispatch('cml/groups/update', { element }).then(r => {
      expect(store.state.cml.messages.list[0].content).toBe('Group updated')
      expect(store.state.cml.groups.list).toEqual([
        {
          description: { test: 'meoi oiou' },
          id: 'mocks-group-id-1',
          name: 'group-1',
          userIds: []
        },
        {
          description: {},
          id: 'mocks-group-id-2',
          name: 'group-2',
          userIds: ['mocks-user-id-ji']
        }
      ])
    })
  })

  it('updates a group (error)', () => {
    const element = {
      id: '' // throw an the error
    }

    return expect(
      store.dispatch('cml/groups/update', { element })
    ).rejects.toThrow('Api')
  })

  it('lists all groups', () => {
    expect.assertions(1)
    return store.dispatch('cml/groups/list').then(r => {
      expect(store.state.cml.groups.list).toEqual([
        {
          description: {},
          id: 'mocks-group-id-1',
          name: 'group-1',
          userIds: ['mocks-user-id-lu', 'mocks-user-id-ji']
        },
        {
          description: {},
          id: 'mocks-group-id-2',
          name: 'group-2',
          userIds: ['mocks-user-id-ji']
        }
      ])
    })
  })

  it('adds a user to a group', () => {
    const userId = 'mocks-user-id-lu'

    const group = {
      id: 'mocks-group-id-2',
      name: 'group-2',
      userIds: [],
      description: { bla: 'blou' }
    }

    expect.assertions(3)
    return store.dispatch('cml/groups/userAdd', { userId, group }).then(r => {
      expect(store.state.cml.messages.list[0].content).toBe(
        'User added to group'
      )
      expect(store.state.cml.groups.list).toEqual([
        {
          description: {},
          id: 'mocks-group-id-1',
          name: 'group-1',
          userIds: ['mocks-user-id-lu', 'mocks-user-id-ji']
        },
        {
          description: {},
          id: 'mocks-group-id-2',
          name: 'group-2',
          userIds: ['mocks-user-id-ji', 'mocks-user-id-lu']
        }
      ])
      expect(store.state.cml.user).toEqual({
        description: {},
        groupIds: ['mocks-group-id-1', 'mocks-group-id-2'],
        id: 'mocks-user-id-lu',
        isAdmin: false,
        isLogged: true,
        isRoot: false,
        name: 'lu',
        role: 'user'
      })
    })
  })

  it('adds a user to a group (error)', () => {
    const userId = '' // throw an the error

    const group = {
      id: 'mocks-group-id-1',
      name: 'group-1',
      userIds: [],
      description: { bla: 'blou' }
    }

    return expect(
      store.dispatch('cml/groups/userAdd', { userId, group })
    ).rejects.toThrow('Api')
  })

  it('removes a user from a group', () => {
    const userId = 'mocks-user-id-lu'

    const group = {
      id: 'mocks-group-id-1',
      name: 'group-1',
      userIds: [],
      description: { bla: 'blou' }
    }

    expect.assertions(3)
    return store
      .dispatch('cml/groups/userRemove', { userId, group })
      .then(r => {
        expect(store.state.cml.messages.list[0].content).toBe(
          'User removed from group'
        )
        expect(store.state.cml.groups.list).toEqual([
          {
            description: {},
            id: 'mocks-group-id-1',
            name: 'group-1',
            userIds: ['mocks-user-id-ji']
          },
          {
            description: {},
            id: 'mocks-group-id-2',
            name: 'group-2',
            userIds: ['mocks-user-id-ji']
          }
        ])
        expect(store.state.cml.user).toEqual({
          description: {},
          groupIds: [],
          id: 'mocks-user-id-lu',
          isAdmin: false,
          isLogged: true,
          isRoot: false,
          name: 'lu',
          role: 'user'
        })
      })
  })

  it('removes a user from a group (error)', () => {
    const userId = '' // throw an error

    const group = {
      id: 'mocks-group-id-1',
      name: 'group-1',
      userIds: [],
      description: { bla: 'blou' }
    }

    return expect(
      store.dispatch('cml/groups/userRemove', { userId, group })
    ).rejects.toThrow('Api')
  })
})

describe('store groups getters', () => {
  it('returns a group permissions', () => {
    let store

    groups.state = {
      list: [
        {
          description: {},
          id: 'mocks-group-id-1',
          name: 'group-1',
          userIds: ['mocks-user-id-lu', 'mocks-user-id-ji']
        },
        {
          description: {},
          id: 'mocks-group-id-2',
          name: 'group-2',
          userIds: ['mocks-user-id-ji']
        }
      ]
    }

    store = new Vuex.Store({
      modules: {
        cml: {
          namespaced: true,
          modules: {
            groups
          }
        }
      }
    })

    const permissions = {
      'mocks-group-id-1': 2
    }

    expect(store.getters['cml/groups/permissions'](permissions)).toEqual({
      'mocks-group-id-1': 2,
      'mocks-group-id-2': 0
    })
  })
})

describe('store groups mutations', () => {
  const state = { list: [] }

  it('resets group list', () => {
    state.list = [
      { name: 'group-1' },
      { name: 'group-2' },
      { name: 'group-3' },
      { name: 'group-4' }
    ]
    groups.mutations.reset(state)
    expect(state.list).toEqual([])
  })
})
