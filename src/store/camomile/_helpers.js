export function message (dispatch, message) {
  dispatch('camomile/messages/add', message, { root: true })
}
