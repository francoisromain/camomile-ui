// import Camomile from require('../../../../camomile-client-javascript') /* debug with local version */
import Camomile from 'camomile-client'
// import camomile from '../camomile-api' /* axios api */

import user from './user'
import messages from './messages'

export default {
  namespaced: true,
  state: {
    url: '',
    api: null
  },
  mutations: {
    apiCreate (state, url) {
      state.url = url
      state.api = new Camomile(url)
      // state.api = camomile(url) /* axios api */
    }
  },
  modules: {
    user,
    messages
  }
}
