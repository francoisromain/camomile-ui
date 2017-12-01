import log from '../js/log'

export const state = {
  svg: {
    height: 0,
    width: 0,
    scale: 1
  },
  viewport: {
    name: '',
    width: window.innerWidth,
    height: window.innerHeight
  },
  animations: false
}

export const mutations = {
  svgStatus (state, payload) {
    state.svg[payload.type] = payload.status
  },
  viewportSet (state, payload) {
    if (window.matchMedia('(min-width: 83.5em)').matches) {
      log.simple('Viewport', 'Large')
      state.viewport.name = 'large'
      state.animate = true
    } else if (window.matchMedia('(min-width: 63em)').matches) {
      log.simple('Viewport', 'Desktop')
      state.viewport.name = 'desktop'
      state.animate = true
    } else if (window.matchMedia('(min-width: 42.5em)').matches) {
      log.simple('Viewport', 'Tablet')
      state.viewport.name = 'tablet'
      state.animate = false
    } else if (window.matchMedia('(min-width: 22em)').matches) {
      log.simple('Viewport', 'Mobile')
      state.viewport.name = 'mobile'
      state.animate = false
    } else {
      log.simple('Viewport', 'Default')
      state.viewport.name = 'default'
      state.animate = false
    }
    state.viewport.width = window.innerWidth
    state.viewport.height = window.innerHeight
  },
  svgSet (state, payload) {
    state.svg.scale =
      state.viewport.name === 'mobile' || state.viewport.name === 'tablet'
        ? 0.5
        : 1
    state.svg.height =
      state.viewport.name === 'mobile' || state.viewport.name === 'tablet'
        ? state.viewport.height - 288
        : state.viewport.height - 144
    state.svg.width =
      state.viewport.name === 'large'
        ? state.viewport.width - 48
        : state.viewport.width - 48
  }
}

export const actions = {
  set (context) {
    context.commit('viewportSet')
    context.commit('svgSet')
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
