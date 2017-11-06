export default {
  namespaced: true,
  state: {
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
  },
  mutations: {
    svgStatus (state, payload) {
      state.svg[payload.type] = payload.status
    },
    viewportSet (state, payload) {
      if (window.matchMedia('(min-width: 83.5em)').matches) {
        console.log('[viewport: large]')
        state.viewport.name = 'large'
        state.animate = true
      } else if (window.matchMedia('(min-width: 63em)').matches) {
        console.log('[viewport: desktop]')
        state.viewport.name = 'desktop'
        state.animate = true
      } else if (window.matchMedia('(min-width: 42.5em)').matches) {
        console.log('[viewport: tablet]')
        state.viewport.name = 'tablet'
        state.animate = false
      } else if (window.matchMedia('(min-width: 22em)').matches) {
        console.log('[viewport: mobile]')
        state.viewport.name = 'mobile'
        state.animate = false
      } else {
        console.log('[viewport: default]')
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
  },
  actions: {
    set (context) {
      context.commit('viewportSet')
      context.commit('svgSet')
    }
  }
}
