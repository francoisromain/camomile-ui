export function userFormat (user) {
  return {
    name: user.username,
    id: user._id,
    description: user.description,
    role: user.role
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

export function permissionsSet (elements, permissions) {
  return elements.reduce(
    (res, element) =>
      Object.assign(res, {
        [element.id]:
          permissions && permissions[element.id] ? permissions[element.id] : 0
      }),
    {}
  )
}

export function corpuFormat (corpu, users, groups) {
  return {
    name: corpu.name,
    id: corpu._id,
    description: corpu.description,
    permission: corpu.permission,
    permissions: {
      groups: permissionsSet(groups, corpu.permissions.groups),
      users: permissionsSet(users, corpu.permissions.users)
    }
  }
}

export function mediaFormat (media) {
  return {
    name: media.name,
    id: media._id,
    url: media.url,
    corpuId: media.id_corpus,
    description: media.description
  }
}

export function observerClean (obj) {
  return Object.keys(obj).reduce(
    (res, e) => Object.assign(res, { [e]: obj[e] }),
    {}
  )
}
