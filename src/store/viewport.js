import log from '../js/log'

export const state = {
  name: '',
  width: 0,
  height: 0,
  svg: {
    height: 0,
    width: 0,
    scale: 1
  },
  animate: false
}

export const actions = {
  set ({ state, commit }) {
    const width = window.innerWidth
    const height = window.innerHeight
    let name
    let animate
    if (window.matchMedia('(min-width: 83.5em)').matches) {
      name = 'large'
      animate = true
    } else if (window.matchMedia('(min-width: 63em)').matches) {
      name = 'desktop'
      animate = true
    } else if (window.matchMedia('(min-width: 42.5em)').matches) {
      name = 'tablet'
      animate = false
    } else if (window.matchMedia('(min-width: 22em)').matches) {
      name = 'mobile'
      animate = false
    } else {
      log.simple('Viewport', 'Default')
      name = 'default'
      animate = false
    }
    commit('set', { name, animate, width, height })
  }
}

export const mutations = {
  set (state, { animate, name, width, height }) {
    state.name = name
    state.animate = animate
    state.width = width
    state.height = height
    log.simple('Viewport', name)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
