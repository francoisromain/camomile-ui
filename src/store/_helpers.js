export function userFormat (user) {
  return {
    name: user.username,
    id: user._id,
    description: user.description || {},
    role: user.role
  }
}

export function groupFormat (group) {
  return {
    name: group.name,
    id: group._id,
    description: group.description || {},
    userIds: group.users
  }
}

export function mediaFormat (media) {
  return {
    name: media.name,
    id: media._id,
    url: media.url,
    corpuId: media.id_corpus,
    description: media.description || {}
  }
}

export function observerClean (obj) {
  return Object.keys(obj).reduce(
    (res, e) => Object.assign(res, { [e]: obj[e] }),
    {}
  )
}
