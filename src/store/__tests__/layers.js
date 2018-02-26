import { createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import popup from '../popup'
import sync from '../sync'
import messages from '../messages'
import user from '../user'
import users from '../users'
import groups from '../groups'
import corpus from '../corpus'
import medias from '../medias'
import layers from '../layers'
import annotations from '../annotations'
import api from '../__mocks__/_api.js'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('store layers actions', () => {
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
      list: [{ id: 'mocks-group-id-1' }, { id: 'mocks-group-id-2' }]
    }

    users.state = {
      list: [{ id: 'mocks-user-id-lu' }, { id: 'mocks-user-id-ji' }]
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
            permission: 0,
            permissions: {
              groups: { 'mocks-group-id-1': 2, 'mocks-group-id-2': 0 },
              users: { 'mocks-user-id-lu': 2, 'mocks-user-id-ji': 0 }
            }
          }
        ]
      }
    }

    layers.state = {
      actives: {
        default: { corpuUid: 'default-corpu', ids: ['mocks-layer-id-2'] }
      },
      lists: {
        default: [
          {
            corpuId: 'mocks-corpu-id-1',
            description: { desc: 'Ornare Malesuada Fermentum Parturient' },
            fragmentType: { fragment: 'Ornare Malesuada Fermentum Parturient' },
            metadataType: { data: 'Ornare Malesuada Fermentum Parturient' },
            annotations: {
              annotations: 'Ornare Malesuada Fermentum Parturient'
            },
            id: 'mocks-layer-id-1',
            name: 'layer-1',
            permissions: {
              groups: { 'mocks-group-id-1': 0, 'mocks-group-id-2': 2 },
              users: { 'mocks-user-id-lu': 1, 'mocks-user-id-ji': 0 }
            }
          },
          {
            corpuId: 'mocks-corpu-id-1',
            description: { desc: 'Condimentum Elit Mattis Quam' },
            fragmentType: { fragment: 'Ornare Malesuada Fermentum Parturient' },
            metadataType: { data: 'Ornare Malesuada Fermentum Parturient' },
            annotations: {
              annotations: 'Ornare Malesuada Fermentum Parturient'
            },
            id: 'mocks-layer-id-2',
            name: 'layer-2',
            permissions: {
              groups: { 'mocks-group-id-1': 2, 'mocks-group-id-2': 0 },
              users: { 'mocks-user-id-lu': 0, 'mocks-user-id-ji': 3 }
            }
          }
        ]
      }
    }

    store = new Vuex.Store({
      modules: {
        cml: {
          namespaced: true,
          state: {
            api
          },
          modules: {
            messages,
            popup,
            sync,
            user,
            users,
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

  it('adds a new layer', () => {
    const element = {
      corpuId: 'mocks-corpu-id-1',
      name: 'layers-new',
      description: { desc: 'Egestas Euismod Quam Condimentum' },
      fragmentType: { fragment: 'Egestas Euismod Quam Condimentum' },
      metadataType: { data: 'Egestas Euismod Quam Condimentum' },
      annotations: { annotations: 'Egestas Euismod Quam Condimentum' }
    }

    expect.assertions(2)
    return store.dispatch('cml/layers/add', { element }).then(r => {
      expect(store.state.cml.layers.lists['default']).toEqual([
        {
          annotations: {
            annotations: 'Ornare Malesuada Fermentum Parturient'
          },
          corpuId: 'mocks-corpu-id-1',
          metadataType: { data: 'Ornare Malesuada Fermentum Parturient' },
          description: { desc: 'Ornare Malesuada Fermentum Parturient' },
          fragmentType: { fragment: 'Ornare Malesuada Fermentum Parturient' },
          id: 'mocks-layer-id-1',
          name: 'layer-1',
          permissions: {
            groups: { 'mocks-group-id-1': 0, 'mocks-group-id-2': 2 },
            users: { 'mocks-user-id-lu': 1, 'mocks-user-id-ji': 0 }
          }
        },
        {
          annotations: {
            annotations: 'Ornare Malesuada Fermentum Parturient'
          },
          corpuId: 'mocks-corpu-id-1',
          metadataType: { data: 'Ornare Malesuada Fermentum Parturient' },
          description: { desc: 'Condimentum Elit Mattis Quam' },
          fragmentType: { fragment: 'Ornare Malesuada Fermentum Parturient' },
          id: 'mocks-layer-id-2',
          name: 'layer-2',
          permissions: {
            groups: { 'mocks-group-id-1': 2, 'mocks-group-id-2': 0 },
            users: { 'mocks-user-id-lu': 0, 'mocks-user-id-ji': 3 }
          }
        },
        {
          annotations: { annotations: 'Egestas Euismod Quam Condimentum' },
          description: { desc: 'Egestas Euismod Quam Condimentum' },
          fragmentType: { fragment: 'Egestas Euismod Quam Condimentum' },
          id: 'mocks-layer-id-new',
          metadataType: { data: 'Egestas Euismod Quam Condimentum' },
          name: 'layers-new',
          permission: 3,
          permissions: {
            groups: { 'mocks-group-id-1': 0, 'mocks-group-id-2': 0 },
            users: { 'mocks-user-id-lu': 3, 'mocks-user-id-ji': 0 }
          }
        }
      ])
      expect(store.state.cml.messages.list[0].content).toBe('Layer added')
    })
  })

  it('adds a new layer (error)', () => {
    const element = {
      name: 'layers-new',
      corpuId: '' // throw an error
    }

    return expect(
      store.dispatch('cml/layers/add', { element })
    ).rejects.toThrow('Api')
  })

  it('removes a layer', () => {
    const id = 'mocks-layer-id-1'

    expect.assertions(2)
    return store.dispatch('cml/layers/remove', { id }).then(r => {
      expect(store.state.cml.layers.lists['default']).toEqual([
        {
          annotations: {
            annotations: 'Ornare Malesuada Fermentum Parturient'
          },
          corpuId: 'mocks-corpu-id-1',
          metadataType: { data: 'Ornare Malesuada Fermentum Parturient' },
          description: { desc: 'Condimentum Elit Mattis Quam' },
          fragmentType: { fragment: 'Ornare Malesuada Fermentum Parturient' },
          id: 'mocks-layer-id-2',
          name: 'layer-2',
          permissions: {
            groups: { 'mocks-group-id-1': 2, 'mocks-group-id-2': 0 },
            users: { 'mocks-user-id-lu': 0, 'mocks-user-id-ji': 3 }
          }
        }
      ])
      expect(store.state.cml.messages.list[0].content).toBe('Layer removed')
    })
  })

  it('removes a layer (error)', () => {
    const id = '' // throw an error

    return expect(store.dispatch('cml/layers/remove', { id })).rejects.toThrow(
      'Api'
    )
  })

  it('updates a layer', () => {
    const element = {
      corpuId: 'mocks-corpu-id-1',
      description: { desc: 'New: Ridiculus Etiam Vehicula Egestas' },
      fragmentType: { fragment: 'New: Ridiculus Etiam Vehicula Egestas' },
      metadataType: { data: 'New: Ridiculus Etiam Vehicula Egestas' },
      annotations: { annotations: 'New: Ridiculus Etiam Vehicula Egestas' },
      id: 'mocks-layer-id-1',
      name: 'layer-1-changed',
      permissions: {
        groups: { 'mocks-group-id-1': 0, 'mocks-group-id-2': 2 },
        users: { 'mocks-user-id-lu': 1, 'mocks-user-id-ji': 0 }
      }
    }

    expect.assertions(2)
    return store.dispatch('cml/layers/update', { element }).then(r => {
      expect(store.state.cml.layers.lists['default']).toEqual([
        {
          annotations: {
            annotations: 'New: Ridiculus Etiam Vehicula Egestas'
          },
          corpuId: 'mocks-corpu-id-1',
          description: { desc: 'New: Ridiculus Etiam Vehicula Egestas' },
          fragmentType: { fragment: 'New: Ridiculus Etiam Vehicula Egestas' },
          id: 'mocks-layer-id-1',
          metadataType: { data: 'New: Ridiculus Etiam Vehicula Egestas' },
          name: 'layer-1-changed',
          permissions: {
            groups: { 'mocks-group-id-1': 0, 'mocks-group-id-2': 2 },
            users: { 'mocks-user-id-lu': 1, 'mocks-user-id-ji': 0 }
          }
        },
        {
          annotations: {
            annotations: 'Ornare Malesuada Fermentum Parturient'
          },
          corpuId: 'mocks-corpu-id-1',
          metadataType: { data: 'Ornare Malesuada Fermentum Parturient' },
          description: { desc: 'Condimentum Elit Mattis Quam' },
          fragmentType: { fragment: 'Ornare Malesuada Fermentum Parturient' },
          id: 'mocks-layer-id-2',
          name: 'layer-2',
          permissions: {
            groups: { 'mocks-group-id-1': 2, 'mocks-group-id-2': 0 },
            users: { 'mocks-user-id-lu': 0, 'mocks-user-id-ji': 3 }
          }
        }
      ])
      expect(store.state.cml.messages.list[0].content).toBe('Layer updated')
    })
  })

  it('updates a layer (error)', () => {
    const element = {
      id: '' // throw an error
    }

    return expect(
      store.dispatch('cml/layers/update', { element, uid: 'default' })
    ).rejects.toThrow('Api')
  })

  it('lists all layers', () => {
    expect.assertions(1)
    return store
      .dispatch('cml/layers/list', {
        corpuId: 'mocks-corpu-id',
        corpuUid: 'default'
      })
      .then(r => {
        expect(store.state.cml.layers.lists['default']).toEqual([
          {
            annotations: {
              annotations: 'Ornare Malesuada Fermentum Parturient'
            },
            description: { desc: 'Ornare Malesuada Fermentum Parturient' },
            fragmentType: { fragment: 'Ornare Malesuada Fermentum Parturient' },
            id: 'mocks-layer-id-1',
            metadataType: { data: 'Ornare Malesuada Fermentum Parturient' },
            name: 'layer-1',
            permission: 1,
            permissions: {
              groups: { 'mocks-group-id-1': 0, 'mocks-group-id-2': 2 },
              users: { 'mocks-user-id-lu': 1, 'mocks-user-id-ji': 0 }
            }
          },
          {
            annotations: {
              annotations: 'Ornare Malesuada Fermentum Parturient'
            },
            description: { desc: 'Condimentum Elit Mattis Quam' },
            fragmentType: { fragment: 'Ornare Malesuada Fermentum Parturient' },
            id: 'mocks-layer-id-2',
            metadataType: { data: 'Ornare Malesuada Fermentum Parturient' },
            name: 'layer-2',
            permission: 2,
            permissions: {
              groups: { 'mocks-group-id-1': 2, 'mocks-group-id-2': 0 },
              users: { 'mocks-user-id-lu': 0, 'mocks-user-id-ji': 3 }
            }
          }
        ])
      })
  })

  it('sets permission on a group', () => {
    const id = 'mocks-layer-id-1'
    const groupId = 'mocks-group-id-1'
    const permission = 1

    expect.assertions(2)
    return store
      .dispatch('cml/layers/groupPermissionSet', { id, groupId, permission })
      .then(r => {
        expect(store.state.cml.layers.lists['default']).toEqual([
          {
            annotations: {
              annotations: 'Ornare Malesuada Fermentum Parturient'
            },
            corpuId: 'mocks-corpu-id-1',
            metadataType: { data: 'Ornare Malesuada Fermentum Parturient' },
            description: { desc: 'Ornare Malesuada Fermentum Parturient' },
            fragmentType: { fragment: 'Ornare Malesuada Fermentum Parturient' },
            id: 'mocks-layer-id-1',
            name: 'layer-1',
            permissions: {
              groups: { 'mocks-group-id-1': 1, 'mocks-group-id-2': 2 },
              users: { 'mocks-user-id-lu': 1, 'mocks-user-id-ji': 0 }
            }
          },
          {
            annotations: {
              annotations: 'Ornare Malesuada Fermentum Parturient'
            },
            corpuId: 'mocks-corpu-id-1',
            metadataType: { data: 'Ornare Malesuada Fermentum Parturient' },
            description: { desc: 'Condimentum Elit Mattis Quam' },
            fragmentType: { fragment: 'Ornare Malesuada Fermentum Parturient' },
            id: 'mocks-layer-id-2',
            name: 'layer-2',
            permissions: {
              groups: { 'mocks-group-id-1': 2, 'mocks-group-id-2': 0 },
              users: { 'mocks-user-id-lu': 0, 'mocks-user-id-ji': 3 }
            }
          }
        ])
        expect(store.state.cml.messages.list[0].content).toBe(
          'Group permissions updated'
        )
      })
  })

  it('sets permission on a group (error)', () => {
    const id = '' // throw an error
    const groupId = 'mocks-group-id-1'
    const permission = 1

    return expect(
      store.dispatch('cml/layers/groupPermissionSet', {
        id,
        groupId,
        permission
      })
    ).rejects.toThrow('Api')
  })

  it('removes permission on a group', () => {
    const id = 'mocks-layer-id-1'
    const groupId = 'mocks-group-id-1'

    expect.assertions(2)
    return store
      .dispatch('cml/layers/groupPermissionRemove', { id, groupId })
      .then(r => {
        expect(store.state.cml.layers.lists['default']).toEqual([
          {
            annotations: {
              annotations: 'Ornare Malesuada Fermentum Parturient'
            },
            corpuId: 'mocks-corpu-id-1',
            metadataType: { data: 'Ornare Malesuada Fermentum Parturient' },
            description: { desc: 'Ornare Malesuada Fermentum Parturient' },
            fragmentType: { fragment: 'Ornare Malesuada Fermentum Parturient' },
            id: 'mocks-layer-id-1',
            name: 'layer-1',
            permissions: {
              groups: { 'mocks-group-id-1': 0, 'mocks-group-id-2': 2 },
              users: { 'mocks-user-id-lu': 1, 'mocks-user-id-ji': 0 }
            }
          },
          {
            annotations: {
              annotations: 'Ornare Malesuada Fermentum Parturient'
            },
            corpuId: 'mocks-corpu-id-1',
            metadataType: { data: 'Ornare Malesuada Fermentum Parturient' },
            description: { desc: 'Condimentum Elit Mattis Quam' },
            fragmentType: { fragment: 'Ornare Malesuada Fermentum Parturient' },
            id: 'mocks-layer-id-2',
            name: 'layer-2',
            permissions: {
              groups: { 'mocks-group-id-1': 2, 'mocks-group-id-2': 0 },
              users: { 'mocks-user-id-lu': 0, 'mocks-user-id-ji': 3 }
            }
          }
        ])
        expect(store.state.cml.messages.list[0].content).toBe(
          'Group permissions updated'
        )
      })
  })

  it('removes permission on a group (error)', () => {
    const id = 'mocks-layer-id-1'
    const groupId = '' // throw an error

    return expect(
      store.dispatch('cml/layers/groupPermissionRemove', { id, groupId })
    ).rejects.toThrow('Api')
  })

  it('sets permission on a user', () => {
    const id = 'mocks-layer-id-1'
    const userId = 'mocks-user-id-lu'
    const permission = 3

    expect.assertions(2)
    return store
      .dispatch('cml/layers/userPermissionSet', { id, userId, permission })
      .then(r => {
        expect(store.state.cml.layers.lists['default']).toEqual([
          {
            annotations: {
              annotations: 'Ornare Malesuada Fermentum Parturient'
            },
            corpuId: 'mocks-corpu-id-1',
            metadataType: { data: 'Ornare Malesuada Fermentum Parturient' },
            description: { desc: 'Ornare Malesuada Fermentum Parturient' },
            fragmentType: { fragment: 'Ornare Malesuada Fermentum Parturient' },
            id: 'mocks-layer-id-1',
            name: 'layer-1',
            permissions: {
              groups: { 'mocks-group-id-1': 0, 'mocks-group-id-2': 2 },
              users: {
                'mocks-user-id-lu': 3,
                'mocks-user-id-ji': 0
              }
            }
          },
          {
            annotations: {
              annotations: 'Ornare Malesuada Fermentum Parturient'
            },
            corpuId: 'mocks-corpu-id-1',
            metadataType: { data: 'Ornare Malesuada Fermentum Parturient' },
            description: { desc: 'Condimentum Elit Mattis Quam' },
            fragmentType: { fragment: 'Ornare Malesuada Fermentum Parturient' },
            id: 'mocks-layer-id-2',
            name: 'layer-2',
            permissions: {
              groups: { 'mocks-group-id-1': 2, 'mocks-group-id-2': 0 },
              users: { 'mocks-user-id-lu': 0, 'mocks-user-id-ji': 3 }
            }
          }
        ])
        expect(store.state.cml.messages.list[0].content).toBe(
          'User permissions updated'
        )
      })
  })

  it('sets permission on a user (error)', () => {
    const id = 'mocks-layer-id-1'
    const userId = '' // throw an error
    const permission = 1

    return expect(
      store.dispatch('cml/layers/userPermissionSet', { id, userId, permission })
    ).rejects.toThrow('Api')
  })

  it('removes permission on a user', () => {
    const id = 'mocks-layer-id-1'
    const userId = 'mocks-user-id-lu'

    expect.assertions(2)
    return store
      .dispatch('cml/layers/userPermissionRemove', { id, userId })
      .then(r => {
        expect(store.state.cml.layers.lists['default']).toEqual([
          {
            annotations: {
              annotations: 'Ornare Malesuada Fermentum Parturient'
            },
            corpuId: 'mocks-corpu-id-1',
            metadataType: { data: 'Ornare Malesuada Fermentum Parturient' },
            description: { desc: 'Ornare Malesuada Fermentum Parturient' },
            fragmentType: { fragment: 'Ornare Malesuada Fermentum Parturient' },
            id: 'mocks-layer-id-1',
            name: 'layer-1',
            permissions: {
              groups: { 'mocks-group-id-1': 0, 'mocks-group-id-2': 2 },
              users: {
                'mocks-user-id-ji': 0,
                'mocks-user-id-lu': 0
              }
            }
          },
          {
            annotations: {
              annotations: 'Ornare Malesuada Fermentum Parturient'
            },
            corpuId: 'mocks-corpu-id-1',
            metadataType: { data: 'Ornare Malesuada Fermentum Parturient' },
            description: { desc: 'Condimentum Elit Mattis Quam' },
            fragmentType: { fragment: 'Ornare Malesuada Fermentum Parturient' },
            id: 'mocks-layer-id-2',
            name: 'layer-2',
            permissions: {
              groups: { 'mocks-group-id-1': 2, 'mocks-group-id-2': 0 },
              users: { 'mocks-user-id-lu': 0, 'mocks-user-id-ji': 3 }
            }
          }
        ])
        expect(store.state.cml.messages.list[0].content).toBe(
          'User permissions updated'
        )
      })
  })

  it('removes permission on a user (error)', () => {
    const id = 'mocks-layer-id-1'
    const userId = '' // throw an error

    return expect(
      store.dispatch('cml/layers/userPermissionRemove', { id, userId })
    ).rejects.toThrow('Api')
  })

  it('sets a layers', () => {
    const id = 'mocks-layer-id-1'

    expect.assertions(1)
    return store
      .dispatch('cml/layers/set', {
        id,
        uid: 'default'
      })
      .then(r => {
        expect(store.state.cml.layers.actives['default']).toEqual({
          corpuUid: 'default-corpu',
          ids: ['mocks-layer-id-2', 'mocks-layer-id-1']
        })
      })
  })

  it('unsets a layers', () => {
    const id = 'mocks-layer-id-2'

    expect.assertions(1)
    return store
      .dispatch('cml/layers/unset', { id, uid: 'default' })
      .then(r => {
        expect(store.state.cml.layers.actives['default']).toEqual({
          corpuUid: 'default-corpu',
          ids: []
        })
      })
  })
})

describe('store layers mutations', () => {
  const state = { actives: {}, lists: {} }

  beforeEach(() => {
    state.actives = {
      default: 'an-idea'
    }

    state.lists = {
      default: [
        { name: 'layer-1' },
        { name: 'layer-2' },
        { name: 'layer-3' },
        { name: 'layer-4' }
      ]
    }
  })

  it('resets all layer lists', () => {
    layers.mutations.resetAll(state)
    expect(state.lists).toEqual({})
  })
})
