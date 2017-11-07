export function message (commit, mutation, details) {
  commit(`camomile/messages/${mutation}`, details, { root: true })
}
