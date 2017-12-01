import { mount, shallow, createLocalVue } from 'vue-test-utils'
import Vuex from 'vuex'
import { createRenderer } from 'vue-server-renderer'
import header from '../src/components/header/index.vue'
import headerTitle from '../src/components/header/title.vue'
import headerSync from '../src/components/header/sync.vue'

const localVue = createLocalVue()

localVue.use(Vuex)

// Header
describe('header', () => {
  const state = { cml: { user: { isLogged: false } } }
  const store = new Vuex.Store({ state })
  beforeEach(() => store)

  it('renders the correct markup before login', () => {
    const wrapper = shallow(header, { store, localVue })
    expect(wrapper.html()).toContain(
      '<div class="bg-inverse color-bg header"><div class="container"><div class="blobs"><div class="blob-1-4 mb-0"><!----></div> <!----> <!----></div></div></div>'
    )
  })

  it('renders the correct markup after login', () => {
    store.state.cml.user.isLogged = true
    const wrapper = shallow(header, { store, localVue })
    expect(wrapper.html()).toContain(
      '<div class="bg-inverse color-bg header"><div class="container"><div class="blobs"><div class="blob-1-4 mb-0"><!----></div> <div class="blob-1-2 mb-0"><div class="blobs-default"><div class="blob-default"><!----></div> <div class="blob-auto mb-0"><!----></div></div></div> <div class="blob mb-0 flex-right"><!----></div></div></div></div>'
    )
  })

  it('has not changed snapshot before login', () => {
    store.state.cml.user.isLogged = false
    const renderer = createRenderer()
    const wrapper = shallow(header, { store, localVue })
    renderer.renderToString(wrapper.vm, (err, str) => {
      if (err) throw err
      expect(str).toMatchSnapshot()
    })
  })

  it('has not changed snapshot after login', () => {
    store.state.cml.user.isLogged = true
    const renderer = createRenderer()
    const wrapper = shallow(header, { store, localVue })
    renderer.renderToString(wrapper.vm, (err, str) => {
      if (err) throw err
      expect(str).toMatchSnapshot()
    })
  })
})

describe('header title', () => {
  const state = { cml: { config: { title: 'Camomile-ui' } } }
  const store = new Vuex.Store({ state })
  beforeEach(() => store)

  it('renders the correct markup', () => {
    const wrapper = mount(headerTitle, { store, localVue })
    expect(wrapper.html()).toBe('<h1 class="mb-0">Camomile-ui</h1>')
  })
})

describe('header sync', () => {
  const getters = { 'cml/sync/active': () => false }
  const actions = { 'cml/sync/all': jest.fn() }
  const store = new Vuex.Store({ getters, actions })

  beforeEach(() => store)

  it('calls store action "cml/sync/all" when button is clicked', () => {
    const wrapper = mount(headerSync, { store, localVue })
    const button = wrapper.find('button')
    button.trigger('click')
    expect(actions['cml/sync/all']).toHaveBeenCalled()
  })
})
