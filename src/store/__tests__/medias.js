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

describe('store medias actions', () => {
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
      list: [
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

  it('adds a new media', () => {
    const corpuId = 'mocks-corpu-id-1'
    const media = {
      name: 'media-1',
      url: 'https://en.wikipedia.org/'
    }

    expect.assertions(2)
    return store
      .dispatch('cml/medias/add', {
        corpuId,
        name: media.name,
        url: media.url,
        description: media.description
      })
      .then(r => {
        expect(store.state.cml.medias.list).toEqual([
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
    const corpuId = '' // throw an error
    const media = {
      name: 'media-1',
      url: 'https://en.wikipedia.org/',
      description: { desc: 'Egestas Euismod Quam Condimentum' }
    }

    expect.assertions(2)
    return store
      .dispatch('cml/medias/add', {
        corpuId,
        name: media.name,
        url: media.url,
        description: media.description
      })
      .catch(e => {
        expect(e).toEqual('Network error')
        expect(store.state.cml.messages.list[0].content).toBe('Network error')
      })
  })

  it('removes a media', () => {
    const media = {
      corpuId: 'mocks-corpu-id-1',
      description: { desc: 'Ornare Malesuada Fermentum Parturient' },
      id: 'mocks-media-id-1',
      name: 'media-1',
      url: 'https://www.limsi.fr/'
    }

    expect.assertions(2)
    return store.dispatch('cml/medias/remove', media).then(r => {
      expect(store.state.cml.medias.list).toEqual([
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

  it('removes a media (error)', () => {
    const media = {
      corpuId: 'mocks-corpu-id-1',
      description: { desc: 'Ornare Malesuada Fermentum Parturient' },
      id: '', // throw an error
      name: 'media-1',
      url: 'https://www.limsi.fr/'
    }

    expect.assertions(2)
    return store.dispatch('cml/medias/remove', media).catch(e => {
      expect(e).toEqual('Network error')
      expect(store.state.cml.messages.list[0].content).toBe('Network error')
    })
  })

  it('updates a media', () => {
    const media = {
      description: { desc: 'Sollicitudin Quam Fringilla Ullamcorper' },
      id: 'mocks-media-id-1',
      name: 'media-limsi',
      url: 'https://www.limsi.fr/fr/laboratoire/soutien-a-la-recherche'
    }

    expect.assertions(2)
    return store.dispatch('cml/medias/update', media).then(r => {
      expect(store.state.cml.medias.list).toEqual([
        {
          corpuId: 'mocks-corpu-id-1',
          description: { desc: 'Sollicitudin Quam Fringilla Ullamcorper' },
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
    const media = {
      description: { desc: 'Sollicitudin Quam Fringilla Ullamcorper' },
      id: '', // throw an error
      name: 'media-limsi',
      url: 'https://www.limsi.fr/fr/laboratoire/soutien-a-la-recherche'
    }

    expect.assertions(2)
    return store.dispatch('cml/medias/update', media).catch(e => {
      expect(e).toEqual('Network error')
      expect(store.state.cml.messages.list[0].content).toBe('Network error')
    })
  })

  it('lists all medias', () => {
    expect.assertions(1)
    return store.dispatch('cml/medias/list').then(r => {
      expect(store.state.cml.medias.list).toEqual([
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
    const mediaId = 'mocks-media-id-2'
    expect.assertions(1)
    return store.dispatch('cml/medias/set', mediaId).then(r => {
      expect(store.state.cml.medias.id).toEqual('mocks-media-id-2')
    })
  })
})

describe('store medias getters', () => {
  let store

  beforeEach(() => {
    const state = {
      id: 'mocks-media-id-2',
      list: [
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

    store = new Vuex.Store({
      state,
      getters: medias.getters
    })
  })

  it('returns the id of the selected medias (without a param)', () => {
    expect(store.getters.id()).toEqual('mocks-media-id-2')
  })

  it('returns the id of the selected medias (with a param)', () => {
    expect(store.getters.id('mocks-media-id-4')).toEqual('mocks-media-id-4')
  })
})

describe('store medias mutations', () => {
  const state = { list: [] }

  it('resets media list', () => {
    state.list = [
      { name: 'group-1' },
      { name: 'group-2' },
      { name: 'group-3' },
      { name: 'group-4' }
    ]
    medias.mutations.reset(state)
    expect(state.list).toEqual([])
  })
})
