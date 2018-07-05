import { mount, shallowMount, createLocalVue } from '@vue/test-utils'
import { createRenderer } from 'vue-server-renderer'
import Vuex from 'vuex'
import header from '../ui/header/index.vue'
import cmlTitle from '../ui/header/title.vue'
import headerSync from '../ui/header/sync.vue'
import headerUserbutton from '../ui/header/userbutton.vue'

const localVue = createLocalVue()
const renderer = createRenderer()

localVue.use(Vuex)

// Header
describe('header', () => {
  let store
  const state = {
    config: {
      title: 'Camomile-ui'
    }
  }

  const user = {
    namespaced: true,
    state: {
      isLogged: false,
      name: 'lu'
    }
  }

  const dropdown = {
    namespaced: true,
    state: {
      visible: false
    },
    mutations: {
      open: jest.fn(),
      close: jest.fn()
    }
  }

  const sync = {
    namespaced: true,
    actions: {
      all: jest.fn()
    }
  }

  beforeEach(() => {
    store = new Vuex.Store({
      state,
      modules: {
        user,
        dropdown,
        sync
      }
    })
  })

  it('renders the correct markup before login', () => {
    const headerWrapper = mount(header, {
      store,
      localVue
    })
    const titleWrapper = mount(cmlTitle, { store, localVue })

    expect(headerWrapper.html()).toContain(
      '<div class="tablet-blobs"><div class="tablet-blob-1-4"><h1 class="mb-0">Camomile-ui</h1></div> <!----> <!----></div>'
    )

    expect(titleWrapper.html()).toBe('<h1 class="mb-0">Camomile-ui</h1>')
  })

  it('renders the correct markup after login', () => {
    store.state.user.isLogged = true
    const wrapper = mount(header, { store, localVue })
    expect(wrapper.html()).toContain(
      '<div class="tablet-blobs"><div class="tablet-blob-1-4"><h1 class="mb-0">Camomile-ui</h1></div> <div class="tablet-blob-1-2"><div class="blobs"><div class="blob"><button class="btn-menubar px-m py-s full-x mb-0"><i class="icon-24 icon-24-dot"></i></button></div> <div class="blob-auto"><h6 class="menubar-infos mb-0"></h6></div></div></div> <div class="blob flex-right"><button class="btn-menubar px-m py-s full-x">lu</button></div></div>'
    )
  })

  it('has not changed snapshot before login', () => {
    store.state.user.isLogged = false
    const wrapper = mount(header, { store, localVue })
    renderer.renderToString(wrapper.vm, (err, str) => {
      if (err) throw err
      expect(str).toMatchSnapshot()
    })
  })

  it('has not changed snapshot after login', () => {
    const wrapper = mount(header, { store, localVue })
    store.state.user.isLogged = true
    renderer.renderToString(wrapper.vm, (err, str) => {
      if (err) throw err
      expect(str).toMatchSnapshot()
    })
  })

  it('syncs all list when button is clicked', () => {
    const wrapper = mount(headerSync, { store, localVue })
    const button = wrapper.find('button')
    button.trigger('click')
    expect(sync.actions.all).toHaveBeenCalled()
  })

  it('opens dropdown when user clicks on user button', () => {
    const wrapper = mount(headerUserbutton, { store, localVue })
    const button = wrapper.find('button')
    button.trigger('click')
    expect(dropdown.mutations.open).toHaveBeenCalled()
  })

  it('close dropdown when user clicks again on user button', () => {
    const wrapper = mount(headerUserbutton, { store, localVue })
    const button = wrapper.find('button')
    store.state.dropdown.visible = true
    button.trigger('click')
    expect(dropdown.mutations.close).toHaveBeenCalled()
  })
})
