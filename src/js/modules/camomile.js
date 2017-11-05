// import Camomile from require('../../../../camomile-client-javascript') /* debug with local version */
import Camomile from 'camomile-client'
// import camomile from '../camomile-api' /* axios api */

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
      state.api = new Camomile(url)
      // state.api = camomile(url) /* axios api */
    }
  },
  modules: {
    user
  }
}
