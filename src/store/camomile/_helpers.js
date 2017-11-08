export function message (dispatch, message) {
  dispatch('camomile/messages/create', message, { root: true })
}
