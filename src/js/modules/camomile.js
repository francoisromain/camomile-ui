// import Camomile from require('../../../../camomile-client-javascript')
import Camomile from 'camomile-client'
// import camomile from '../camomile-api'

import user from './camomile-user'

export default {
  namespaced: true,
  state: {
    url: '',
    api: null,
    error: ''
  },
  actions: {},
  mutations: {
    error (state, message) {
      state.error = message
    },
    apiCreate (state, url) {
      console.log('api create', url)
      state.url = url
      // state.api = camomile(url)
      state.api = new Camomile(url)
    }
  },
  getters: {},
  modules: {
    user
  }
}
