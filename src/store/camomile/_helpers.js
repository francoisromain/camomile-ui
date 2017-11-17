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

export function permissionsUser ({ users = {}, groups = {} }, user) {
  const permissionUser =
    Object.keys(users).find(userId => userId === user.id) && users[user.id]

  const permissionGroup = Object.keys(groups).reduce((permission, groupId) => {
    return (
      !!user.groupIds[groupId] &&
      groups[groupId] > permission &&
      groups[groupId]
    )
  }, false)
  return Math.max(permissionUser, permissionGroup) || null
}

export function corpuFormat (corpu, state) {
  return {
    name: corpu.name,
    id: corpu._id,
    description: corpu.description,
    permission:
      corpu.permission || permissionsUser(corpu.permissions, state.user),
    users: [...state.users.list],
    groups: [...state.groups.list]
  }
}
