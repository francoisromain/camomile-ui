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

describe('store annotations actions', () => {
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

    medias.state = {
      id: 'mocks-media-id-1',
      list: []
    }

    annotations.state = {
      list: [
        {
          id: 'mocks-annotation-id-1',
          fragment: { fragment: 'Maecenas faucibus mollis interdum.' },
          metadata: { metadata: 'Maecenas faucibus mollis interdum.' },
          mediumId: 'mocks-media-id-1',
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
      data: { data: 'Egestas Euismod Quam Condimentum' },
      mediaLink: true
    }

    expect.assertions(2)
    return store.dispatch('cml/annotations/add', element).then(r => {
      expect(store.state.cml.annotations.list).toEqual([
        {
          fragment: { fragment: 'Maecenas faucibus mollis interdum.' },
          id: 'mocks-annotation-id-1',
          layerId: 'mocks-layer-id-1',
          mediumId: 'mocks-media-id-1',
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
    const layerId = '' // throw an error
    const mediaId = 'mocks-media-id-1'
    const annotation = {
      fragment: { fragment: 'Egestas Euismod Quam Condimentum' },
      data: { data: 'Egestas Euismod Quam Condimentum' }
    }

    expect.assertions(2)
    return store
      .dispatch('cml/annotations/add', {
        layerId,
        mediaId,
        fragment: annotation.fragment,
        data: annotation.data
      })
      .catch(e => {
        expect(e).toEqual('Network error')
        expect(store.state.cml.messages.list[0].content).toBe('Network error')
      })
  })

  it('removes an annotation', () => {
    const annotation = {
      id: 'mocks-annotation-id-1',
      fragment: { fragment: 'Maecenas faucibus mollis interdum.' },
      metadata: { metadata: 'Maecenas faucibus mollis interdum.' },
      mediumId: 'mocks-media-id-1',
      layerId: 'mocks-layer-id-1'
    }

    expect.assertions(2)
    return store.dispatch('cml/annotations/remove', annotation).then(r => {
      expect(store.state.cml.annotations.list).toEqual([
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
    const annotation = {
      id: '' // throw an error
    }

    expect.assertions(2)
    return store.dispatch('cml/annotations/remove', annotation).catch(e => {
      expect(e).toEqual('Network error')
      expect(store.state.cml.messages.list[0].content).toBe('Network error')
    })
  })

  it('updates an annotation', () => {
    const annotation = {
      id: 'mocks-annotation-id-1',
      fragment: {
        fragment: 'Donec id elit non mi porta gravida at eget metus.'
      },
      metadata: {
        metadata: 'Donec id elit non mi porta gravida at eget metus.'
      },
      mediumId: 'mocks-media-id-1',
      layerId: 'mocks-layer-id-1'
    }

    expect.assertions(2)
    return store.dispatch('cml/annotations/update', annotation).then(r => {
      expect(store.state.cml.annotations.list).toEqual([
        {
          fragment: {
            fragment: 'Donec id elit non mi porta gravida at eget metus.'
          },
          id: 'mocks-annotation-id-1',
          layerId: 'mocks-layer-id-1',
          mediumId: 'mocks-media-id-1',
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
    const annotation = {
      id: '' // throw an error
    }

    expect.assertions(2)
    return store.dispatch('cml/annotations/update', annotation).catch(e => {
      expect(e).toEqual('Network error')
      expect(store.state.cml.messages.list[0].content).toBe('Network error')
    })
  })

  it('lists all annotations', () => {
    expect.assertions(1)
    return store.dispatch('cml/annotations/list').then(r => {
      expect(store.state.cml.annotations.list).toEqual([
        {
          fragment: { fragment: 'Maecenas faucibus mollis interdum.' },
          id: 'mocks-annotation-id-1',
          layerId: 'mocks-layer-id-1',
          mediaId: 'mocks-media-id-1',
          metadata: { metadata: 'Maecenas faucibus mollis interdum.' }
        },
        {
          fragment: {
            fragment: 'Etiam porta sem malesuada magna mollis euismod..'
          },
          id: 'mocks-annotation-id-2',
          layerId: 'mocks-layer-id-1',
          mediaId: null,
          metadata: {
            metadata: 'Etiam porta sem malesuada magna mollis euismod..'
          }
        }
      ])
    })
  })

  it('sets selected annotation', () => {
    const annotationId = 'mocks-annotation-id-2'
    expect.assertions(1)
    return store.dispatch('cml/annotations/set', annotationId).then(r => {
      expect(store.state.cml.annotations.id).toEqual('mocks-annotation-id-2')
    })
  })
})

describe('store annotations getters', () => {
  let store

  beforeEach(() => {
    const state = {
      id: 'mocks-annotation-id-2',
      list: [
        {
          description: {},
          id: 'mocks-annotation-id-1',
          name: 'annotation-1'
        },
        {
          description: {},
          id: 'mocks-annotation-id-2',
          name: 'annotation-2'
        }
      ]
    }

    store = new Vuex.Store({
      state,
      getters: annotations.getters
    })
  })

  it('returns the id of the selected annotations (without a param)', () => {
    expect(store.getters.id()).toEqual('mocks-annotation-id-2')
  })

  it('returns the id of the selected annotations (with a param)', () => {
    expect(store.getters.id('mocks-annotation-id-4')).toEqual(
      'mocks-annotation-id-4'
    )
  })
})

describe('store annotations mutations', () => {
  const state = { list: [] }

  it('resets annotation list', () => {
    state.list = [
      { name: 'annotation-1' },
      { name: 'annotation-2' },
      { name: 'annotation-3' },
      { name: 'annotation-4' }
    ]
    annotations.mutations.reset(state)
    expect(state.list).toEqual([])
  })
})
