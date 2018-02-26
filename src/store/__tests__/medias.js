import { createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import sync from '../sync'
import popup from '../popup'
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

describe('store medias actions', () => {
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

    medias.state = {
      properties: {
        default: {}
      },
      actives: {
        default: { id: 'mocks-media-id-1', corpuUid: 'default' }
      },
      lists: {
        default: [
          {
            corpuId: 'mocks-corpu-id-1',
            description: { desc: 'Ornare Malesuada Fermentum Parturient' },
            id: 'mocks-media-id-1',
            name: 'media-1',
            url: 'https://www.limsi.fr/'
          },
          {
            corpuId: 'mocks-corpu-id-1',
            description: { desc: 'Condimentum Elit Mattis Quam' },
            id: 'mocks-media-id-2',
            name: 'media-2',
            url: 'https://github.com'
          }
        ]
      }
    }

    layers.state = {
      actives: {
        default: ['mocks-layer-id-1']
      },
      lists: {
        default: []
      }
    }

    annotations.state = {
      actives: {
        default: {
          'mocks-layer-id-1': ['mocks-annotation-id-1']
        }
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

  it('adds a new media', () => {
    const element = {
      corpuId: 'mocks-corpu-id-1',
      name: 'media-1',
      url: 'https://en.wikipedia.org/',
      description: {}
    }

    expect.assertions(2)
    return store.dispatch('cml/medias/add', { element }).then(r => {
      expect(store.state.cml.medias.lists['default']).toEqual([
        {
          corpuId: 'mocks-corpu-id-1',
          description: { desc: 'Ornare Malesuada Fermentum Parturient' },
          id: 'mocks-media-id-1',
          name: 'media-1',
          url: 'https://www.limsi.fr/'
        },
        {
          corpuId: 'mocks-corpu-id-1',
          description: { desc: 'Condimentum Elit Mattis Quam' },
          id: 'mocks-media-id-2',
          name: 'media-2',
          url: 'https://github.com'
        },
        {
          corpuId: 'mocks-corpu-id-1',
          description: {},
          id: 'mocks-media-id-new',
          name: 'media-1',
          url: 'https://en.wikipedia.org/'
        }
      ])
      expect(store.state.cml.messages.list[0].content).toBe('Medium added')
    })
  })

  it('adds a new media (error)', () => {
    const element = {
      corpuId: '', // throw an error
      name: 'media-1',
      url: 'https://en.wikipedia.org/',
      description: {}
    }

    return expect(
      store.dispatch('cml/medias/remove', { element })
    ).rejects.toThrow('Api')
  })

  it('removes a media', () => {
    const id = 'mocks-media-id-1'

    expect.assertions(2)
    return store.dispatch('cml/medias/remove', { id }).then(r => {
      expect(store.state.cml.medias.lists['default']).toEqual([
        {
          corpuId: 'mocks-corpu-id-1',
          description: { desc: 'Condimentum Elit Mattis Quam' },
          id: 'mocks-media-id-2',
          name: 'media-2',
          url: 'https://github.com'
        }
      ])
      expect(store.state.cml.messages.list[0].content).toBe('Medium removed')
    })
  })

  // it('removes a media (error)', () => {
  //   const id = '' // throw an error

  //   return expect(store.dispatch('cml/medias/remove', { id })).rejects.toThrow(
  //     'Api'
  //   )
  // })

  it('updates a media', () => {
    const element = {
      corpuId: 'mocks-corpu-id-1',
      description: { desc: 'Updated: Sollicitudin Quam Fringilla Ullamcorper' },
      id: 'mocks-media-id-1',
      name: 'media-limsi',
      url: 'https://www.limsi.fr/fr/laboratoire/soutien-a-la-recherche'
    }

    expect.assertions(2)
    return store.dispatch('cml/medias/update', { element }).then(r => {
      expect(store.state.cml.medias.lists['default']).toEqual([
        {
          corpuId: 'mocks-corpu-id-1',
          description: {
            desc: 'Updated: Sollicitudin Quam Fringilla Ullamcorper'
          },
          id: 'mocks-media-id-1',
          name: 'media-limsi',
          url: 'https://www.limsi.fr/fr/laboratoire/soutien-a-la-recherche'
        },
        {
          corpuId: 'mocks-corpu-id-1',
          description: { desc: 'Condimentum Elit Mattis Quam' },
          id: 'mocks-media-id-2',
          name: 'media-2',
          url: 'https://github.com'
        }
      ])
      expect(store.state.cml.messages.list[0].content).toBe('Medium updated')
    })
  })

  it('updates a media (error)', () => {
    const element = {
      corpuId: 'mocks-corpu-id-1',
      description: { desc: 'Sollicitudin Quam Fringilla Ullamcorper' },
      id: '', // throw an error
      name: 'media-limsi',
      url: 'https://www.limsi.fr/fr/laboratoire/soutien-a-la-recherche'
    }

    return expect(
      store.dispatch('cml/medias/update', { element })
    ).rejects.toThrow('Api')
  })

  it('lists all medias', () => {
    expect.assertions(1)
    return store.dispatch('cml/medias/list', { uid: 'default' }).then(r => {
      expect(store.state.cml.medias.lists['default']).toEqual([
        {
          corpuId: 'mocks-corpu-id-1',
          description: { desc: 'Ornare Malesuada Fermentum Parturient' },
          id: 'mocks-media-id-1',
          name: 'media-1',
          url: 'https://www.limsi.fr/'
        },
        {
          corpuId: 'mocks-corpu-id-1',
          description: { desc: 'Condimentum Elit Mattis Quam' },
          id: 'mocks-media-id-2',
          name: 'media-2',
          url: 'https://github.com'
        }
      ])
    })
  })

  it('sets selected media', () => {
    const id = 'mocks-media-id-2'
    expect.assertions(1)
    return store
      .dispatch('cml/medias/set', {
        id,
        corpuUid: 'default-corpu',
        uid: 'default-media'
      })
      .then(r => {
        expect(store.state.cml.medias.actives['default-media']).toEqual({
          id: 'mocks-media-id-2',
          corpuUid: 'default-corpu'
        })
      })
  })
})

describe('store medias getters', () => {
  let store

  beforeEach(() => {
    const state = {
      actives: {
        default: { id: 'mocks-media-id-2', corpuUid: 'default' }
      },
      properties: {
        default: {
          propOne: 'one',
          propTwo: 'two'
        }
      },
      lists: {
        default: [
          {
            description: {},
            id: 'mocks-media-id-1',
            name: 'media-1'
          },
          {
            description: {},
            id: 'mocks-media-id-2',
            name: 'media-2'
          }
        ]
      }
    }

    store = new Vuex.Store({
      state,
      getters: medias.getters
    })
  })

  it('returns the id of the active media', () => {
    expect(store.getters.id({ corpuUid: 'default', uid: 'default' })).toEqual(
      'mocks-media-id-2'
    )
  })

  it('returns the properties of the active media', () => {
    expect(store.getters.properties('default')).toEqual({
      propOne: 'one',
      propTwo: 'two'
    })
  })

  it('returns the active media', () => {
    expect(store.getters.active('default')).toEqual({
      description: {},
      id: 'mocks-media-id-2',
      name: 'media-2'
    })
  })
})

describe('store medias mutations', () => {
  const state = { actives: {}, lists: {} }

  it('resets media list', () => {
    beforeEach(() => {
      state.lists['default'] = [
        { name: 'group-1' },
        { name: 'group-2' },
        { name: 'group-3' },
        { name: 'group-4' }
      ]
      state.actives['default'] = 'mocks-id'
    })
    medias.mutations.resetAll(state)
    expect(state.lists).toEqual({})
  })
})
