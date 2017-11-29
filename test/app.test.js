import { mount } from 'vue-test-utils'
import app from '../example/app'

describe('app', () => {
  // Now mount the component and you have the wrapper
  const wrapper = mount(app)

  it('renders the correct markup', () => {
    expect(wrapper.html()).toContain('<span class="count">0</span>')
  })

  // it's also easy to check for the existence of elements
  it('has a button', () => {
    expect(wrapper.contains('button')).toBe(true)
  })
})
