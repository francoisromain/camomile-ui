export function message (dispatch, message) {
  dispatch('camomile/messages/add', message, { root: true })
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
    description: corpus.description
  }
}
