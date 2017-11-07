// import Camomile from require('../../../../camomile-client-javascript') /* debug with local version */
import Camomile from 'camomile-client'
import camomile from './api' /* axios api */

import user from './user'
import messages from './messages'
import config from '../../config.js'

export default {
  namespaced: true,
  state: {
    url: '',
    api: null,
    config: config
  },
  mutations: {
    create (state, url) {
      state.url = url
      state.api = state.config.axios ? camomile(url) : new Camomile(url)
    },
    delete (state) {
      state.url = ''
      state.api = null
    }
  },
  modules: {
    user,
    messages
  }
}
