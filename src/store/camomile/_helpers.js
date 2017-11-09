export function message (dispatch, message) {
  dispatch('camomile/messages/add', message, { root: true })
}

export function userFormat (user) {
  return {
    name: user.username,
    id: user._id,
    description: user.description,
    role: user.role
  }
}
