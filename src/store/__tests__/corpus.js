import { createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import corpus from '../corpus'
import messages from '../messages'
import user from '../user'
import users from '../users'
import groups from '../groups'
import popup from '../popup'
import sync from '../sync'
import medias from '../medias'
import layers from '../layers'
import annotations from '../annotations'

const localVue = createLocalVue()
localVue.use(Vuex)

jest.mock('../_api.js')

describe('store corpus actions', () => {
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

    users.state = {
      list: [{ id: 'mocks-user-id-lu' }, { id: 'mocks-user-id-ji' }]
    }

    groups.state = {
      list: [{ id: 'mocks-group-id-1' }, { id: 'mocks-group-id-2' }]
    }

    corpus.state = {
      actives: {
        default: 'mocks-corpu-id-2'
      },
      lists: {
        default: [
          {
            id: 'mocks-corpu-id-1',
            name: 'corpu-1',
            description: {},
            permission: 0,
            permissions: {
              groups: { 'mocks-group-id-1': 2, 'mocks-group-id-2': 0 },
              users: { 'mocks-user-id-lu': 2, 'mocks-user-id-ji': 0 }
            }
          },
          {
            id: 'mocks-corpu-id-2',
            name: 'corpu-2',
            description: {},
            permission: 0,
            permissions: {
              groups: { 'mocks-group-id-1': 0, 'mocks-group-id-2': 1 },
              users: { 'mocks-user-id-lu': 0, 'mocks-user-id-ji': 1 }
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
            user,
            groups,
            users,
            corpus,
            messages,
            popup,
            sync,
            medias,
            layers,
            annotations
          }
        }
      }
    })
  })

  it('adds a new corpu', () => {
    const element = {
      name: 'corpus-1',
      description: { desc: 'Egestas Euismod Quam Condimentum' }
    }

    expect.assertions(2)
    return store.dispatch('cml/corpus/add', { element }).then(r => {
      expect(store.state.cml.corpus.lists['default']).toEqual([
        {
          description: {},
          id: 'mocks-corpu-id-1',
          name: 'corpu-1',
          permission: 0,
          permissions: {
            groups: { 'mocks-group-id-1': 2, 'mocks-group-id-2': 0 },
            users: { 'mocks-user-id-ji': 0, 'mocks-user-id-lu': 2 }
          }
        },
        {
          description: {},
          id: 'mocks-corpu-id-2',
          name: 'corpu-2',
          permission: 0,
          permissions: {
            groups: { 'mocks-group-id-1': 0, 'mocks-group-id-2': 1 },
            users: { 'mocks-user-id-ji': 1, 'mocks-user-id-lu': 0 }
          }
        },
        {
          description: { desc: 'Egestas Euismod Quam Condimentum' },
          id: 'mocks-corpu-id-new',
          name: 'corpus-1',
          permission: 3,
          permissions: {
            groups: { 'mocks-group-id-1': 0, 'mocks-group-id-2': 0 },
            users: {
              'mocks-user-id-lu': 3,
              'mocks-user-id-ji': 0
            }
          }
        }
      ])
      expect(store.state.cml.messages.list[0].content).toBe('Corpus added')
    })
  })

  it('adds a new corpu (error)', () => {
    const element = {
      name: '' // throw an error
    }

    return expect(
      store.dispatch('cml/corpus/add', { element })
    ).rejects.toThrow('Incorrect name')
  })

  it('removes a corpu', () => {
    const id = 'mocks-corpu-id-1'

    expect.assertions(2)
    return store.dispatch('cml/corpus/remove', { id }).then(r => {
      expect(store.state.cml.corpus.lists['default']).toEqual([
        {
          description: {},
          id: 'mocks-corpu-id-2',
          name: 'corpu-2',
          permission: 0,
          permissions: {
            groups: { 'mocks-group-id-1': 0, 'mocks-group-id-2': 1 },
            users: { 'mocks-user-id-ji': 1, 'mocks-user-id-lu': 0 }
          }
        }
      ])
      expect(store.state.cml.messages.list[0].content).toBe('Corpus removed')
    })
  })

  it('removes a corpu (error)', () => {
    const id = '' // throw an error

    return expect(
      store.dispatch('cml/corpus/remove', { id, uid: 'defaut' })
    ).rejects.toThrow('Incorrect group Id')
  })

  it('updates a corpu', () => {
    const element = {
      id: 'mocks-corpu-id-1',
      name: 'corpu-1-new',
      description: { new: 'Tristique Sollicitudin Ullamcorper Malesuada' },
      permission: 0,
      permissions: {
        groups: { 'mocks-group-id-1': 2, 'mocks-group-id-2': 0 },
        users: { 'mocks-user-id-ji': 0, 'mocks-user-id-lu': 2 }
      }
    }

    expect.assertions(2)
    return store.dispatch('cml/corpus/update', { element }).then(r => {
      expect(store.state.cml.corpus.lists['default']).toEqual([
        {
          description: {
            new: 'Tristique Sollicitudin Ullamcorper Malesuada'
          },
          id: 'mocks-corpu-id-1',
          name: 'corpu-1-new',
          permission: 0,
          permissions: {
            groups: { 'mocks-group-id-1': 2, 'mocks-group-id-2': 0 },
            users: { 'mocks-user-id-ji': 0, 'mocks-user-id-lu': 2 }
          }
        },
        {
          description: {},
          id: 'mocks-corpu-id-2',
          name: 'corpu-2',
          permission: 0,
          permissions: {
            groups: { 'mocks-group-id-1': 0, 'mocks-group-id-2': 1 },
            users: { 'mocks-user-id-ji': 1, 'mocks-user-id-lu': 0 }
          }
        }
      ])
      expect(store.state.cml.messages.list[0].content).toBe('Corpus updated')
    })
  })

  it('updates a corpu (error)', () => {
    const element = {
      id: '' // throw an error
    }

    return expect(
      store.dispatch('cml/corpus/update', { element, uid: 'default' })
    ).rejects.toThrow('Api')
  })

  it('lists all corpus', () => {
    expect.assertions(1)
    return store.dispatch('cml/corpus/list', { uid: 'default' }).then(r => {
      expect(store.state.cml.corpus.lists['default']).toEqual([
        {
          description: {},
          id: 'mocks-corpu-id-1',
          name: 'corpu-1',
          permission: 0,
          permissions: {
            groups: { 'mocks-group-id-1': 2, 'mocks-group-id-2': 0 },
            users: { 'mocks-user-id-lu': 2, 'mocks-user-id-ji': 0 }
          }
        },
        {
          description: {},
          id: 'mocks-corpu-id-2',
          name: 'corpu-2',
          permission: 0,
          permissions: {
            groups: { 'mocks-group-id-1': 0, 'mocks-group-id-2': 1 },
            users: { 'mocks-user-id-lu': 0, 'mocks-user-id-ji': 1 }
          }
        }
      ])
    })
  })

  it('sets permission on a group', () => {
    const id = 'mocks-corpu-id-1'
    const groupId = 'mocks-group-id-1'
    const permission = 1

    expect.assertions(2)
    return store
      .dispatch('cml/corpus/groupPermissionSet', {
        id,
        groupId,
        permission
      })
      .then(r => {
        expect(store.state.cml.corpus.lists['default']).toEqual([
          {
            description: {},
            id: 'mocks-corpu-id-1',
            name: 'corpu-1',
            permission: 0,
            permissions: {
              groups: { 'mocks-group-id-1': 1, 'mocks-group-id-2': 0 },
              users: { 'mocks-user-id-ji': 0, 'mocks-user-id-lu': 2 }
            }
          },
          {
            description: {},
            id: 'mocks-corpu-id-2',
            name: 'corpu-2',
            permission: 0,
            permissions: {
              groups: { 'mocks-group-id-1': 0, 'mocks-group-id-2': 1 },
              users: { 'mocks-user-id-ji': 1, 'mocks-user-id-lu': 0 }
            }
          }
        ])
        expect(store.state.cml.messages.list[0].content).toBe(
          'Group permissions updated'
        )
      })
  })

  it('sets permission on a group (error)', () => {
    const id = 'mocks-corpu-id-1'
    const groupId = '' // throw an error
    const permission = 1

    return expect(
      store.dispatch('cml/corpus/groupPermissionSet', {
        id,
        groupId,
        permission
      })
    ).rejects.toThrow('Api')
  })

  it('removes permission on a group', () => {
    const id = 'mocks-corpu-id-1'
    const groupId = 'mocks-group-id-1'

    expect.assertions(2)
    return store
      .dispatch('cml/corpus/groupPermissionRemove', { id, groupId })
      .then(r => {
        expect(store.state.cml.corpus.lists['default']).toEqual([
          {
            description: {},
            id: 'mocks-corpu-id-1',
            name: 'corpu-1',
            permission: 0,
            permissions: {
              groups: { 'mocks-group-id-1': 0, 'mocks-group-id-2': 0 },
              users: { 'mocks-user-id-ji': 0, 'mocks-user-id-lu': 2 }
            }
          },
          {
            description: {},
            id: 'mocks-corpu-id-2',
            name: 'corpu-2',
            permission: 0,
            permissions: {
              groups: { 'mocks-group-id-1': 0, 'mocks-group-id-2': 1 },
              users: { 'mocks-user-id-ji': 1, 'mocks-user-id-lu': 0 }
            }
          }
        ])
        expect(store.state.cml.messages.list[0].content).toBe(
          'Group permissions updated'
        )
      })
  })

  it('removes permission on a group (error)', () => {
    const id = 'mocks-corpu-id-1'
    const groupId = '' // throw an error

    return expect(
      store.dispatch('cml/corpus/groupPermissionRemove', { id, groupId })
    ).rejects.toThrow('Api')
  })

  it('sets permission on a user', () => {
    const id = 'mocks-corpu-id-1'
    const userId = 'mocks-user-id-lu'
    const permission = 3

    expect.assertions(2)
    return store
      .dispatch('cml/corpus/userPermissionSet', { id, userId, permission })
      .then(r => {
        expect(store.state.cml.corpus.lists['default']).toEqual([
          {
            description: {},
            id: 'mocks-corpu-id-1',
            name: 'corpu-1',
            permission: 0,
            permissions: {
              groups: { 'mocks-group-id-1': 2, 'mocks-group-id-2': 0 },
              users: { 'mocks-user-id-ji': 0, 'mocks-user-id-lu': 3 }
            }
          },
          {
            description: {},
            id: 'mocks-corpu-id-2',
            name: 'corpu-2',
            permission: 0,
            permissions: {
              groups: { 'mocks-group-id-1': 0, 'mocks-group-id-2': 1 },
              users: { 'mocks-user-id-ji': 1, 'mocks-user-id-lu': 0 }
            }
          }
        ])
        expect(store.state.cml.messages.list[0].content).toBe(
          'User permissions updated'
        )
      })
  })

  it('sets permission on a user (error)', () => {
    const id = 'mocks-corpu-id-1'
    const userId = '' // throw an error
    const permission = 1

    return expect(
      store.dispatch('cml/corpus/userPermissionSet', { id, userId, permission })
    ).rejects.toThrow('Api')
  })

  it('removes permission on a user', () => {
    const id = 'mocks-corpu-id-1'
    const userId = 'mocks-user-id-lu'

    expect.assertions(2)
    return store
      .dispatch('cml/corpus/userPermissionRemove', { id, userId })
      .then(r => {
        expect(store.state.cml.corpus.lists['default']).toEqual([
          {
            description: {},
            id: 'mocks-corpu-id-1',
            name: 'corpu-1',
            permission: 0,
            permissions: {
              groups: { 'mocks-group-id-1': 2, 'mocks-group-id-2': 0 },
              users: { 'mocks-user-id-ji': 0, 'mocks-user-id-lu': 0 }
            }
          },
          {
            description: {},
            id: 'mocks-corpu-id-2',
            name: 'corpu-2',
            permission: 0,
            permissions: {
              groups: { 'mocks-group-id-1': 0, 'mocks-group-id-2': 1 },
              users: { 'mocks-user-id-ji': 1, 'mocks-user-id-lu': 0 }
            }
          }
        ])
        expect(store.state.cml.messages.list[0].content).toBe(
          'User permissions updated'
        )
      })
  })

  it('removes permission on a user (error)', () => {
    const id = 'mocks-corpu-id-1'
    const userId = '' // throw an error

    return expect(
      store.dispatch('cml/corpus/userPermissionRemove', { id, userId })
    ).rejects.toThrow('Api')
  })

  it('sets a corpus (without a param)', () => {
    expect.assertions(1)
    return store.dispatch('cml/corpus/set', { uid: 'default' }).then(r => {
      expect(store.state.cml.corpus.actives['default']).toBe('mocks-corpu-id-2')
    })
  })

  it('sets a corpus (with a param)', () => {
    const id = 'mocks-corpu-id-1'

    expect.assertions(1)
    return store.dispatch('cml/corpus/set', { id, uid: 'default' }).then(r => {
      expect(store.state.cml.corpus.actives['default']).toBe('mocks-corpu-id-1')
    })
  })
})

describe('store corpus getters', () => {
  let store

  beforeEach(() => {
    const state = {
      actives: {
        default: 'mocks-corpu-id-2'
      },
      lists: {
        default: [
          {
            description: {},
            id: 'mocks-corpu-id-1',
            name: 'corpu-1'
          },
          {
            description: {},
            id: 'mocks-corpu-id-2',
            name: 'corpu-2'
          }
        ]
      }
    }

    store = new Vuex.Store({
      state,
      getters: corpus.getters
    })
  })

  it('returns the id of the active corpus', () => {
    expect(store.getters.id('default')).toEqual('mocks-corpu-id-2')
  })
})

describe('store corpus mutations', () => {
  const state = { actives: {}, lists: {} }

  beforeEach(() => {
    state.actives = {
      default: 'an-idea'
    }

    state.lists = {
      default: [
        { name: 'corpu-1' },
        { name: 'corpu-2' },
        { name: 'corpu-3' },
        { name: 'corpu-4' }
      ]
    }
  })

  it('resets all corpu lists', () => {
    corpus.mutations.resetAll(state)
    expect(state.lists).toEqual({})
  })
})
