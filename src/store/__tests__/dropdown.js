import dropdown from '../dropdown'

describe('store dropdown mutations', () => {
  const state = { visible: false, config: {} }
  const config = {
    component: {
      name: 'example'
    }
  }

  it('opens a dropdown', () => {
    dropdown.mutations.open(state, config)
    expect(state.config).toEqual({ component: { name: 'example' } })
  })

  it('closes a dropdown', () => {
    dropdown.mutations.close(state)
    expect(state.config).toEqual({})
  })
})
