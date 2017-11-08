// import Camomile from require('../../../../camomile-client-javascript') /* debug with local version */
import Camomile from 'camomile-client'
import camomile from './api' /* axios api */
import config from '../../config.js'

import utils from './utils'
import user from './user'
import messages from './messages'

export default {
  namespaced: true,
  state: {
    url: '',
    api: null,
    config: config,
    logged: false
  },
  mutations: {
    create (state, url) {
      state.url = url
      state.api = state.config.axios ? camomile(url) : new Camomile(url)
    },
    delete (state) {
      state.url = ''
      state.api = null
    },
    logIn (state) {
      state.logged = true
    },
    logOut (state) {
      state.logged = false
    }
  },
  modules: {
    utils,
    user,
    messages
  }
}
