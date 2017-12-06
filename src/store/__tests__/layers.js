import { createLocalVue } from 'vue-test-utils'
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

describe('store layers actions', () => {
  let store

  beforeEach(() => {
    messages.state = {
      list: []
    }

    user.state = {
      id: 'mocks-user-id-lu',
      groupIds: ['mocks-group-id-1']
    }

    groups.state = {
      list: [{ id: 'mocks-group-id-1' }, { id: 'mocks-group-id-2' }]
    }

    users.state = {
      list: [{ id: 'mocks-user-id-lu' }, { id: 'mocks-user-id-ji' }]
    }

    layers.state = {
      id: 'mocks-layer-id-2',
      list: [
        {
          corpusId: 'mocks-corpu-id-1',
          description: { desc: 'Ornare Malesuada Fermentum Parturient' },
          fragmentType: { fragment: 'Ornare Malesuada Fermentum Parturient' },
          dataType: { data: 'Ornare Malesuada Fermentum Parturient' },
          annotations: { annotations: 'Ornare Malesuada Fermentum Parturient' },
          id: 'mocks-layer-id-1',
          name: 'layer-1',
          permissions: {
            groups: { 'mocks-group-id-1': 0, 'mocks-group-id-2': 2 },
            users: { 'mocks-user-id-lu': 1, 'mocks-user-id-ji': 0 }
          }
        },
        {
          corpusId: 'mocks-corpu-id-1',
          description: { desc: 'Condimentum Elit Mattis Quam' },
          fragmentType: { fragment: 'Ornare Malesuada Fermentum Parturient' },
          dataType: { data: 'Ornare Malesuada Fermentum Parturient' },
          annotations: { annotations: 'Ornare Malesuada Fermentum Parturient' },
          id: 'mocks-layer-id-2',
          name: 'layer-2',
          permissions: {
            groups: { 'mocks-group-id-1': 2, 'mocks-group-id-2': 0 },
            users: { 'mocks-user-id-lu': 0, 'mocks-user-id-ji': 3 }
          }
        }
      ]
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

  it('adds a new layer', () => {
    const corpuId = 'mocks-corpu-id-1'

    const layer = {
      name: 'layers-new',
      description: { desc: 'Egestas Euismod Quam Condimentum' },
      fragmentType: { fragment: 'Egestas Euismod Quam Condimentum' },
      dataType: { data: 'Egestas Euismod Quam Condimentum' },
      annotations: { annotations: 'Egestas Euismod Quam Condimentum' }
    }

    expect.assertions(2)
    return store
      .dispatch('cml/layers/add', {
        corpuId,
        name: layer.name,
        description: layer.description,
        fragmentType: layer.fragmentType,
        metadataType: layer.metadataType,
        annotations: layer.annotations
      })
      .then(r => {
        expect(store.state.cml.layers.list).toEqual([
          {
            annotations: {
              annotations: 'Ornare Malesuada Fermentum Parturient'
            },
            corpusId: 'mocks-corpu-id-1',
            dataType: { data: 'Ornare Malesuada Fermentum Parturient' },
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
            corpusId: 'mocks-corpu-id-1',
            dataType: { data: 'Ornare Malesuada Fermentum Parturient' },
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
            metadataType: {},
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
    const corpuId = '' // throw an error

    const layer = {
      name: 'layers-new'
    }

    expect.assertions(2)
    return store
      .dispatch('cml/layers/add', {
        corpuId,
        name: layer.name,
        description: layer.description,
        fragmentType: layer.fragmentType,
        metadataType: layer.metadataType,
        annotations: layer.annotations
      })
      .catch(e => {
        expect(e).toEqual('Network error')
        expect(store.state.cml.messages.list[0].content).toBe('Network error')
      })
  })

  it('removes a layer', () => {
    const layer = {
      corpusId: 'mocks-corpu-id-1',
      description: { desc: 'Ornare Malesuada Fermentum Parturient' },
      fragmentType: { fragment: 'Ornare Malesuada Fermentum Parturient' },
      dataType: { data: 'Ornare Malesuada Fermentum Parturient' },
      annotations: { annotations: 'Ornare Malesuada Fermentum Parturient' },
      id: 'mocks-layer-id-1',
      name: 'layer-1',
      permissions: {
        groups: { 'mocks-group-id-1': 0, 'mocks-group-id-2': 2 },
        users: { 'mocks-user-id-lu': 1, 'mocks-user-id-ji': 0 }
      }
    }

    expect.assertions(2)
    return store.dispatch('cml/layers/remove', layer).then(r => {
      expect(store.state.cml.layers.list).toEqual([
        {
          annotations: { annotations: 'Ornare Malesuada Fermentum Parturient' },
          corpusId: 'mocks-corpu-id-1',
          dataType: { data: 'Ornare Malesuada Fermentum Parturient' },
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
    const layer = {
      id: '' // throw an error
    }

    expect.assertions(2)
    return store.dispatch('cml/layers/remove', layer).catch(e => {
      expect(e).toEqual('Network error')
      expect(store.state.cml.messages.list[0].content).toBe('Network error')
    })
  })

  it('updates a layer', () => {
    const layer = {
      corpusId: 'mocks-corpu-id-1',
      description: { desc: 'Ridiculus Etiam Vehicula Egestas' },
      fragmentType: { fragment: 'Ridiculus Etiam Vehicula Egestas' },
      dataType: { data: 'Ridiculus Etiam Vehicula Egestas' },
      annotations: { annotations: 'Ridiculus Etiam Vehicula Egestas' },
      id: 'mocks-layer-id-1',
      name: 'layer-1-changed'
    }

    expect.assertions(2)
    return store.dispatch('cml/layers/update', layer).then(r => {
      expect(store.state.cml.layers.list).toEqual([
        {
          annotations: { annotations: 'Ridiculus Etiam Vehicula Egestas' },
          corpusId: 'mocks-corpu-id-1',
          dataType: { data: 'Ridiculus Etiam Vehicula Egestas' },
          description: { desc: 'Ridiculus Etiam Vehicula Egestas' },
          fragmentType: { fragment: 'Ridiculus Etiam Vehicula Egestas' },
          id: 'mocks-layer-id-1',
          metadataType: {},
          name: 'layer-1-changed',
          permissions: {
            groups: { 'mocks-group-id-1': 0, 'mocks-group-id-2': 2 },
            users: { 'mocks-user-id-lu': 1, 'mocks-user-id-ji': 0 }
          }
        },
        {
          annotations: { annotations: 'Ornare Malesuada Fermentum Parturient' },
          corpusId: 'mocks-corpu-id-1',
          dataType: { data: 'Ornare Malesuada Fermentum Parturient' },
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
    const layer = {
      id: '' // throw an error
    }

    expect.assertions(2)
    return store.dispatch('cml/layers/update', layer).catch(e => {
      expect(e).toEqual('Network error')
      expect(store.state.cml.messages.list[0].content).toBe('Network error')
    })
  })

  it('lists all layers', () => {
    expect.assertions(1)
    return store.dispatch('cml/layers/list').then(r => {
      expect(store.state.cml.layers.list).toEqual([
        {
          annotations: { annotations: 'Ornare Malesuada Fermentum Parturient' },
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
          annotations: { annotations: 'Ornare Malesuada Fermentum Parturient' },
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
    const layerId = 'mocks-layer-id-1'
    const groupId = 'mocks-group-id-1'
    const permission = 1

    expect.assertions(2)
    return store
      .dispatch('cml/layers/groupPermissionSet', {
        layerId,
        groupId,
        permission
      })
      .then(r => {
        expect(store.state.cml.layers.list).toEqual([
          {
            annotations: {
              annotations: 'Ornare Malesuada Fermentum Parturient'
            },
            corpusId: 'mocks-corpu-id-1',
            dataType: { data: 'Ornare Malesuada Fermentum Parturient' },
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
            corpusId: 'mocks-corpu-id-1',
            dataType: { data: 'Ornare Malesuada Fermentum Parturient' },
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
    const layerId = '' // throw an error
    const groupId = 'mocks-group-id-1'
    const permission = 1

    expect.assertions(2)
    return store
      .dispatch('cml/layers/groupPermissionSet', {
        layerId,
        groupId,
        permission
      })
      .catch(e => {
        expect(e).toEqual('Network error')
        expect(store.state.cml.messages.list[0].content).toBe('Network error')
      })
  })

  it('removes permission on a group', () => {
    const layerId = 'mocks-layer-id-1'
    const groupId = 'mocks-group-id-1'

    expect.assertions(2)
    return store
      .dispatch('cml/layers/groupPermissionRemove', {
        layerId,
        groupId
      })
      .then(r => {
        expect(store.state.cml.layers.list).toEqual([
          {
            annotations: {
              annotations: 'Ornare Malesuada Fermentum Parturient'
            },
            corpusId: 'mocks-corpu-id-1',
            dataType: { data: 'Ornare Malesuada Fermentum Parturient' },
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
            corpusId: 'mocks-corpu-id-1',
            dataType: { data: 'Ornare Malesuada Fermentum Parturient' },
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
    const layerId = 'mocks-layer-id-1'
    const groupId = '' // throw an error

    expect.assertions(2)
    return store
      .dispatch('cml/layers/groupPermissionRemove', {
        layerId,
        groupId
      })
      .catch(e => {
        expect(e).toEqual('Network error')
        expect(store.state.cml.messages.list[0].content).toBe('Network error')
      })
  })

  it('sets permission on a user', () => {
    const layerId = 'mocks-layer-id-1'
    const userId = 'mocks-user-id-lu'
    const permission = 3

    expect.assertions(2)
    return store
      .dispatch('cml/layers/userPermissionSet', {
        layerId,
        userId,
        permission
      })
      .then(r => {
        expect(store.state.cml.layers.list).toEqual([
          {
            annotations: {
              annotations: 'Ornare Malesuada Fermentum Parturient'
            },
            corpusId: 'mocks-corpu-id-1',
            dataType: { data: 'Ornare Malesuada Fermentum Parturient' },
            description: { desc: 'Ornare Malesuada Fermentum Parturient' },
            fragmentType: { fragment: 'Ornare Malesuada Fermentum Parturient' },
            id: 'mocks-layer-id-1',
            name: 'layer-1',
            permissions: {
              groups: { 'mocks-group-id-1': 0, 'mocks-group-id-2': 2 },
              users: {
                'mocks-user-id-lu': 1,
                'mocks-user-id-ji': 0,
                'mocks-user-id-lu': 3
              }
            }
          },
          {
            annotations: {
              annotations: 'Ornare Malesuada Fermentum Parturient'
            },
            corpusId: 'mocks-corpu-id-1',
            dataType: { data: 'Ornare Malesuada Fermentum Parturient' },
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
    const layerId = 'mocks-layer-id-1'
    const userId = '' // throw an error
    const permission = 1

    expect.assertions(2)
    return store
      .dispatch('cml/layers/userPermissionSet', {
        layerId,
        userId,
        permission
      })
      .catch(e => {
        expect(e).toEqual('Network error')
        expect(store.state.cml.messages.list[0].content).toBe('Network error')
      })
  })

  it('removes permission on a user', () => {
    const layerId = 'mocks-layer-id-1'
    const userId = 'mocks-user-id-lu'

    expect.assertions(2)
    return store
      .dispatch('cml/layers/userPermissionRemove', {
        layerId,
        userId
      })
      .then(r => {
        expect(store.state.cml.layers.list).toEqual([
          {
            annotations: {
              annotations: 'Ornare Malesuada Fermentum Parturient'
            },
            corpusId: 'mocks-corpu-id-1',
            dataType: { data: 'Ornare Malesuada Fermentum Parturient' },
            description: { desc: 'Ornare Malesuada Fermentum Parturient' },
            fragmentType: { fragment: 'Ornare Malesuada Fermentum Parturient' },
            id: 'mocks-layer-id-1',
            name: 'layer-1',
            permissions: {
              groups: { 'mocks-group-id-1': 0, 'mocks-group-id-2': 2 },
              users: {
                'mocks-user-id-lu': 1,
                'mocks-user-id-ji': 0,
                'mocks-user-id-lu': 0
              }
            }
          },
          {
            annotations: {
              annotations: 'Ornare Malesuada Fermentum Parturient'
            },
            corpusId: 'mocks-corpu-id-1',
            dataType: { data: 'Ornare Malesuada Fermentum Parturient' },
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
    const layerId = 'mocks-layer-id-1'
    const userId = '' // throw an error

    expect.assertions(2)
    return store
      .dispatch('cml/layers/userPermissionRemove', {
        layerId,
        userId
      })
      .catch(e => {
        expect(e).toEqual('Network error')
        expect(store.state.cml.messages.list[0].content).toBe('Network error')
      })
  })

  it('sets a layer (without a param)', () => {
    expect.assertions(1)
    return store.dispatch('cml/layers/set').then(r => {
      expect(store.state.cml.layers.id).toBe('mocks-layer-id-2')
    })
  })

  it('sets a layers (with a param)', () => {
    const layerId = 'mocks-layer-id-1'

    expect.assertions(1)
    return store.dispatch('cml/layers/set', layerId).then(r => {
      expect(store.state.cml.layers.id).toBe('mocks-layer-id-1')
    })
  })
})

describe('store layers getters', () => {
  let store

  beforeEach(() => {
    const state = {
      id: 'mocks-layer-id-2',
      list: [
        {
          description: {},
          id: 'mocks-layer-id-1',
          name: 'layer-1'
        },
        {
          description: {},
          id: 'mocks-layer-id-2',
          name: 'layer-2'
        }
      ]
    }

    store = new Vuex.Store({
      state,
      getters: layers.getters
    })
  })

  it('returns the id of the selected layers (without a param)', () => {
    expect(store.getters.id()).toEqual('mocks-layer-id-2')
  })

  it('returns the id of the selected layers (with a param)', () => {
    expect(store.getters.id('mocks-layer-id-4')).toEqual('mocks-layer-id-4')
  })
})

describe('store layers mutations', () => {
  const state = { list: [] }

  it('resets layer list', () => {
    state.list = [
      { name: 'layer-1' },
      { name: 'layer-2' },
      { name: 'layer-3' },
      { name: 'layer-4' }
    ]
    layers.mutations.reset(state)
    expect(state.list).toEqual([])
  })
})
