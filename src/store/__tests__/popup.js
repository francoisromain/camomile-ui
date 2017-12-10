import popup from '../popup'

describe('store popup mutations', () => {
  const state = {
    visible: false,
    config: {},
    element: {}
  }

  const config = {
    component: {
      name: 'example'
    }
  }

  const element = {
    id: 'mocks-element-id',
    json: {},
    field: 'something'
  }

  const jsonField = {
    key: {
      nested: 'value'
    }
  }

  it('opens a popup', () => {
    popup.mutations.open(state, { config, element })
    expect(state.config).toEqual({ component: { name: 'example' } })
    expect(state.element).toEqual({
      id: 'mocks-element-id',
      json: {},
      field: 'something'
    })
  })

  it('updates a field', () => {
    popup.mutations.fieldUpdate(state, { name: 'json', value: jsonField })
    expect(state.config).toEqual({ component: { name: 'example' } })
    expect(state.element).toEqual({
      field: 'something',
      id: 'mocks-element-id',
      json: { key: { nested: 'value' } }
    })
  })

  it('closes a popup', () => {
    popup.mutations.close(state)
    expect(state.config).toEqual({})
  })
})
