import { createLocalVue } from 'vue-test-utils'
import Vuex from 'vuex'
import { actions, mutations } from '../index'
import messages from '../messages'
import popup from '../popup'
import sync from '../sync'
import user from '../user'
import groups from '../groups'
import users from '../users'
import corpus from '../corpus'
import medias from '../medias'
import layers from '../layers'

const localVue = createLocalVue()
localVue.use(Vuex)

jest.mock('../_api.js')

describe('store user actions', () => {
  let store

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

    groups.state = {
      list: [{ id: 'mocks-group-id-1' }, { id: 'mocks-group-id-2' }]
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
            corpus,
            popup,
            user,
            groups,
            medias,
            layers
          }
        }
      }
    })
  })

  it('logs-in', () => {
    const user = {
      name: 'lu',
      role: 'admin',
      description: { desc: 'Ipsum Sit Dolor' },
      password: 'password'
    }

    // expect.assertions(3)
    // return store
    //   .dispatch('cml/user/login', {
    //     user: { name: user.name, password: user.password }
    //   })
    //   .then(r => {
    //     expect(store.state.cml.user.isLogged).toBeTruthy()
    //     expect(store.state.cml.user.isAdmin).toBeTruthy()
    //     expect(store.state.cml.user.isRoot).toBeFalsy()
    //   })
  })
})

describe('store user getters', () => {})

describe('store users mutations', () => {})
