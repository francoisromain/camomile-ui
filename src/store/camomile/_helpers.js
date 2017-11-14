export function messageDispatch (type, content, dispatch) {
  dispatch('camomile/messages/add', { type, content }, { root: true })
}

export function errorFormat (error, rootState) {
  console.log(error)
  return error.response
    ? error.response[rootState.camomile.config.axios ? 'data' : 'body'].error
    : 'Network error'
}

export function userFormat (user) {
  return {
    name: user.username,
    id: user._id,
    description: user.description,
    role: user.role,
    groupIds: []
  }
}

export function groupFormat (group) {
  return {
    name: group.name,
    id: group._id,
    description: group.description,
    userIds: group.users
  }
}

export function corpusFormat (corpus) {
  return {
    name: corpus.name,
    id: corpus._id,
    description: corpus.description,
    groupIds: {},
    userIds: {},
    permission: null
  }
}
