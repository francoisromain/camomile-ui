export function messageDispatch (type, content, dispatch) {
  dispatch('cml/messages/add', { type, content }, { root: true })
}

export function errorFormat (error, rootState) {
  console.log(error)
  return error.response
    ? error.response[rootState.cml.config.axios ? 'data' : 'body'].error
    : 'Network error'
}

export function userFormat (user) {
  return {
    name: user.username,
    id: user._id,
    description: user.description,
    role: user.role,
    groupIds: user.groups || [],
    permission: null
  }
}

export function groupFormat (group) {
  return {
    name: group.name,
    id: group._id,
    description: group.description,
    userIds: group.users,
    permission: null
  }
}

export function permissionsUsercurrent (permissions, user) {
  const permissionUser = permissions.users
    ? Object.keys(permissions.users).find(userId => userId === user.id) &&
      permissions.users[user.id]
    : null
  const permissionGroup = permissions.groups
    ? Object.keys(permissions.groups).reduce((permission, groupId) => {
      return (
        !!user.groupIds[groupId] &&
          permissions.groups[groupId] > permission &&
          permissions.groups[groupId]
      )
    }, false)
    : null

  return Math.max(permissionUser, permissionGroup)
}

export function corpuFormat (corpu, user, users, groups) {
  return {
    name: corpu.name,
    id: corpu._id,
    description: corpu.description,
    permission:
      corpu.permission || permissionsUsercurrent(corpu.permissions, user),
    users: [...users],
    groups: [...groups]
  }
}
