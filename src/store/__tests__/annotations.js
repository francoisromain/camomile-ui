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

describe('store annotations actions', () => {
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

    medias.state = {
      properties: {
        default: {}
      },
      actives: {
        default: 'mocks-media-id-1'
      },
      lists: {
        default: []
      }
    }

    layers.state = {
      actives: {
        default: ['mocks-layer-id-2']
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

    annotations.state = {
      actives: {
        default: 'mocks-annotation-id-1'
      },
      lists: {
        default: {
          'mocks-layer-id-1': [
            {
              id: 'mocks-annotation-id-1',
              fragment: { fragment: 'Maecenas faucibus mollis interdum.' },
              metadata: { metadata: 'Maecenas faucibus mollis interdum.' },
              mediaId: 'mocks-media-id-1',
              layerId: 'mocks-layer-id-1'
            },
            {
              id: 'mocks-annotation-id-2',
              fragment: {
                fragment: 'Etiam porta sem malesuada magna mollis euismod.'
              },
              metadata: {
                metadata: 'Etiam porta sem malesuada magna mollis euismod.'
              },
              layerId: 'mocks-layer-id-1'
            }
          ]
        }
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

  it('adds a new annotation', () => {
    const element = {
      layerId: 'mocks-layer-id-1',
      mediaId: 'mocks-media-id-1',
      fragment: { fragment: 'Egestas Euismod Quam Condimentum' },
      metadata: { data: 'Egestas Euismod Quam Condimentum' }
    }
    const layerId = 'mocks-layer-id-1'

    expect.assertions(2)
    return store.dispatch('cml/annotations/add', { element }).then(r => {
      expect(store.state.cml.annotations.lists['default'][layerId]).toEqual([
        {
          fragment: { fragment: 'Maecenas faucibus mollis interdum.' },
          id: 'mocks-annotation-id-1',
          layerId: 'mocks-layer-id-1',
          mediaId: 'mocks-media-id-1',
          metadata: { metadata: 'Maecenas faucibus mollis interdum.' }
        },
        {
          fragment: {
            fragment: 'Etiam porta sem malesuada magna mollis euismod.'
          },
          id: 'mocks-annotation-id-2',
          layerId: 'mocks-layer-id-1',
          metadata: {
            metadata: 'Etiam porta sem malesuada magna mollis euismod.'
          }
        },
        {
          fragment: { fragment: 'Egestas Euismod Quam Condimentum' },
          id: 'mocks-annotation-id-new',
          layerId: 'mocks-layer-id-1',
          mediaId: 'mocks-media-id-1',
          metadata: { data: 'Egestas Euismod Quam Condimentum' }
        }
      ])
      expect(store.state.cml.messages.list[0].content).toBe('Annotation added')
    })
  })

  it('adds a new annotation (error)', () => {
    const element = {
      layerId: '', // throw an error
      mediaId: 'mocks-media-id-1',
      fragment: { fragment: 'Egestas Euismod Quam Condimentum' },
      metaddata: { data: 'Egestas Euismod Quam Condimentum' }
    }

    return expect(
      store.dispatch('cml/annotations/add', { element })
    ).rejects.toThrow('Api')
  })

  it('removes an annotation', () => {
    const id = 'mocks-annotation-id-1'
    const layerId = 'mocks-layer-id-1'

    expect.assertions(2)
    return store.dispatch('cml/annotations/remove', { id }).then(r => {
      expect(store.state.cml.annotations.lists['default'][layerId]).toEqual([
        {
          fragment: {
            fragment: 'Etiam porta sem malesuada magna mollis euismod.'
          },
          id: 'mocks-annotation-id-2',
          layerId: 'mocks-layer-id-1',
          metadata: {
            metadata: 'Etiam porta sem malesuada magna mollis euismod.'
          }
        }
      ])
      expect(store.state.cml.messages.list[0].content).toBe(
        'Annotation removed'
      )
    })
  })

  it('removes an annotation (error)', () => {
    const id = '' // throw an error

    return expect(
      store.dispatch('cml/annotations/remove', { id })
    ).rejects.toThrow('Api')
  })

  it('updates an annotation', () => {
    const element = {
      id: 'mocks-annotation-id-1',
      fragment: {
        fragment: 'Donec id elit non mi porta gravida at eget metus.'
      },
      metadata: {
        metadata: 'Donec id elit non mi porta gravida at eget metus.'
      },
      mediaId: 'mocks-media-id-1',
      layerId: 'mocks-layer-id-1'
    }

    const layerId = 'mocks-layer-id-1'

    expect.assertions(2)
    return store.dispatch('cml/annotations/update', { element }).then(r => {
      expect(store.state.cml.annotations.lists['default'][layerId]).toEqual([
        {
          fragment: {
            fragment: 'Donec id elit non mi porta gravida at eget metus.'
          },
          id: 'mocks-annotation-id-1',
          layerId: 'mocks-layer-id-1',
          mediaId: 'mocks-media-id-1',
          metadata: {
            metadata: 'Donec id elit non mi porta gravida at eget metus.'
          }
        },
        {
          fragment: {
            fragment: 'Etiam porta sem malesuada magna mollis euismod.'
          },
          id: 'mocks-annotation-id-2',
          layerId: 'mocks-layer-id-1',
          metadata: {
            metadata: 'Etiam porta sem malesuada magna mollis euismod.'
          }
        }
      ])
      expect(store.state.cml.messages.list[0].content).toBe(
        'Annotation updated'
      )
    })
  })

  it('updates an annotation (error)', () => {
    const element = {
      id: '', // throw an error
      fragment: {},
      metadata: {}
    }

    return expect(
      store.dispatch('cml/annotations/update', { element })
    ).rejects.toThrow('Api')
  })

  it('lists all annotations', () => {
    const layerId = 'mocks-layer-id-1'
    const mediaId = 'mocks-media-id-1'

    expect.assertions(1)
    return store
      .dispatch('cml/annotations/list', {
        uid: 'default',
        layerId,
        layersUid: 'default',
        mediaId
      })
      .then(r => {
        expect(store.state.cml.annotations.lists['default'][layerId]).toEqual([
          {
            fragment: { fragment: 'Maecenas faucibus mollis interdum.' },
            id: 'mocks-annotation-id-1',
            layerId: 'mocks-layer-id-1',
            mediaId: 'mocks-media-id-1',
            metadata: { metadata: 'Maecenas faucibus mollis interdum.' }
          },
          {
            fragment: {
              fragment: 'Etiam porta sem malesuada magna mollis euismod.'
            },
            id: 'mocks-annotation-id-2',
            layerId: 'mocks-layer-id-1',
            mediaId: null,
            metadata: {
              metadata: 'Etiam porta sem malesuada magna mollis euismod.'
            }
          }
        ])
      })
  })

  it('lists all annotations (error)', () => {
    const layerId = ''
    const mediaId = 'mocks-media-id-1'

    expect.assertions(1)
    return store
      .dispatch('cml/annotations/list', {
        uid: 'default',
        layerId,
        layersUid: '',
        mediaId
      })
      .catch(e => {
        expect(e.message).toEqual('Api')
      })
  })
})

describe('store annotations mutations', () => {
  const state = { actives: {}, lists: {} }

  beforeEach(() => {
    state.actives = {
      default: 'mocks-annotation-id'
    }

    state.lists = {
      default: {
        'mocks-layer-id-1': [
          { name: 'annotation-1' },
          { name: 'annotation-2' },
          { name: 'annotation-3' },
          { name: 'annotation-4' }
        ]
      }
    }
  })

  it('resets one annotation list', () => {
    const layerId = 'mocks-layer-id-1'

    annotations.mutations.reset(state, {
      layerId,
      uid: 'default'
    })
    expect(state.lists['default']).toEqual({})
  })

  it('resets all annotation lists', () => {
    annotations.mutations.resetAll(state)
    expect(state.lists).toEqual({})
  })

  it('sets selected annotation', () => {
    const id = 'mocks-annotation-id-2'

    annotations.mutations.set(state, { id, uid: 'default' })
    expect(state.actives['default']).toEqual('mocks-annotation-id-2')
  })
})
