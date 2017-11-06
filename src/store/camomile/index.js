// import Camomile from require('../../../../camomile-client-javascript') /* debug with local version */
import Camomile from 'camomile-client'
import camomile from './api' /* axios api */

import user from './user'
import messages from './messages'

export default {
  namespaced: true,
  state: {
    url: '',
    api: null,
    _axios: false
  },
  mutations: {
    apiCreate (state, url) {
      state.url = url
      state.api = state._axios ? camomile(url) : new Camomile(url)
    }
  },
  modules: {
    user,
    messages
  }
}
