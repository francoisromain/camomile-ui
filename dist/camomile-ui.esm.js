import Vuex, { mapState } from 'vuex';
import Vue from 'vue';
import Camomile from 'camomile-client';

var config = {
  title: 'Camomile UI',
  user: {
    name: 'root',
    password: 'roO7p4s5wOrD'
  },
  url: 'http://localhost:3000',
  roles: ['admin', 'user']
}

var log = {
  simple: function simple (key, value) {
    console.log(
      ("%c| " + key + ": %c" + value), // eslint-disable-line camelcase
      'padding:8px 0; color:#666; line-height:24px;',
      'padding:8px 32px 8px 0; color:#f40; line-height:24px;'
    );
  },
  button: function button (key, value) {
    console.log(
      ("%c" + key + " %c" + value),
      'font-family: sans-serif; font-size: 13px; padding:12px 16px 12px 24px; line-height:96px; margin-left: 4px; border-radius: 8px 0 0 8px; color:#333; background:linear-gradient(to bottom, #E5E4E5, #CFCFCF); text-shadow: -1px -1px 1px #ccc,  1px 1px 3px #fff;',
      'font-family: sans-serif; font-size: 13px; padding:12px 16px 12px 12px; line-height:96px; text-decoration: none; color:#fff; background:linear-gradient(to bottom, #f62, #f30); text-shadow: -1px -1px 1px #a50,  1px 1px 3px #fa0; border-radius: 0 8px 8px 0; '
    );
  }
}

var state$1 = {
  name: '',
  width: 0,
  height: 0,
  svg: {
    height: 0,
    width: 0,
    scale: 1
  },
  animate: false
};

var actions$1 = {
  set: function set (ref) {
    var state = ref.state;
    var commit = ref.commit;

    var width = window.innerWidth;
    var height = window.innerHeight;
    var name;
    var animate;
    if (window.matchMedia('(min-width: 83.5em)').matches) {
      name = 'large';
      animate = true;
    } else if (window.matchMedia('(min-width: 63em)').matches) {
      name = 'desktop';
      animate = true;
    } else if (window.matchMedia('(min-width: 42.5em)').matches) {
      name = 'tablet';
      animate = false;
    } else if (window.matchMedia('(min-width: 22em)').matches) {
      name = 'mobile';
      animate = false;
    } else {
      log.simple('Viewport', 'Default');
      name = 'default';
      animate = false;
    }
    commit('set', { name: name, animate: animate, width: width, height: height });
  }
};

var mutations = {
  set: function set (state, ref) {
    var animate = ref.animate;
    var name = ref.name;
    var width = ref.width;
    var height = ref.height;

    state.name = name;
    state.animate = animate;
    state.width = width;
    state.height = height;
    log.simple('Viewport', name);
  }
};

var viewport = {
  namespaced: true,
  state: state$1,
  mutations: mutations,
  actions: actions$1
}

var state$2 = {
  list: []
};

var actions$2 = {
  all: function all (ref) {
    var dispatch = ref.dispatch;

    dispatch("cml/set", {}, { root: true }).then(function (r) {
      dispatch('cml/messages/success', 'Synced with server', { root: true });
    });
  },

  start: function start (ref, name) {
    var state = ref.state;

    state.list.push(name);
  },

  stop: function stop (ref, name) {
    var state = ref.state;

    state.list = state.list.filter(function (n) { return n !== name; });
  }
};

var getters = {
  active: function (state) {
    return state.list.length
  }
};

var sync = {
  namespaced: true,
  state: state$2,
  actions: actions$2,
  getters: getters
}

var state$3 = {
  visible: false,
  config: {},
  element: {}
};

var mutations$1 = {
  open: function open (state, ref) {
    var config = ref.config;
    var element = ref.element;

    state.visible = true;
    state.config = config;
    state.element = JSON.parse(JSON.stringify(element));
  },

  close: function close (state) {
    state.visible = false;
    state.config = {};
  },

  fieldUpdate: function fieldUpdate (state, ref) {
    var name = ref.name;
    var value = ref.value;

    Vue.set(state.element, name, value);
  }
};

var popup = {
  namespaced: true,
  state: state$3,
  mutations: mutations$1
}

var state$4 = {
  visible: false,
  config: {}
};

var mutations$2 = {
  close: function close (state) {
    state.visible = false;
    state.config = {};
  },

  open: function open (state, config) {
    state.visible = true;
    state.config = config;
  }
};

var dropdown = {
  namespaced: true,
  state: state$4,
  mutations: mutations$2
}

function userFormat (user) {
  return {
    name: user.username,
    id: user._id,
    description: user.description || {},
    role: user.role
  }
}

function groupFormat (group) {
  return {
    name: group.name,
    id: group._id,
    description: group.description || {},
    userIds: group.users
  }
}

function mediaFormat (media) {
  return {
    name: media.name,
    id: media._id,
    url: media.url,
    corpuId: media.id_corpus,
    description: media.description || {}
  }
}

function dateCurrent () {
  return new Date().valueOf()
}

// export function observerClean (obj) {
//   return Object.keys(obj).reduce(
//     (res, e) => Object.assign(res, { [e]: obj[e] }),
//     {}
//   )
// }

var state$5 = {
  list: []
};

var actions$3 = {
  success: function success (ref, content) {
    var commit = ref.commit;

    commit('add', { content: content, type: 'success', id: dateCurrent() });
    setTimeout(function (_) {
      commit('remove');
    }, 2000);
  },

  error: function error (ref, content) {
    var commit = ref.commit;

    commit('add', { content: content, type: 'error', id: dateCurrent() });
    setTimeout(function (_) {
      commit('remove');
    }, 2000);
  }
};

var mutations$3 = {
  remove: function remove (state) {
    state.list.shift();
  },

  add: function add (state, message) {
    state.list.push(message);
  }
};

var messages = {
  namespaced: true,
  state: state$5,
  actions: actions$3,
  mutations: mutations$3
}

// import camomile from '../js/api' /* axios api */
// import Camomile from '../../../camomile-client-javascript' /* debug with local version */
// export default camomile(config.url)
var api = new Camomile(config.url)

var state$6 = {
  id: '',
  name: '',
  role: '',
  description: {},
  groupIds: [],
  isLogged: false,
  isAdmin: false,
  isRoot: false
};

var actions$4 = {
  login: function login (ref, config) {
    var commit = ref.commit;
    var dispatch = ref.dispatch;

    dispatch('cml/sync/start', 'userLogin', { root: true });
    return api
      .login(config.user.name, config.user.password)
      .then(function (r) {
        dispatch('cml/sync/stop', 'userLogin', { root: true });
        commit('cml/popup/close', null, { root: true });
        dispatch('set');

        return r.message
      })
      .catch(function (e) {
        dispatch('cml/sync/stop', 'userLogin', { root: true });
        dispatch('cml/messages/error', e.message, { root: true });
        dispatch('cml/reset', null, { root: true });

        throw e
      })
  },

  set: function set (ref) {
    var commit = ref.commit;
    var dispatch = ref.dispatch;

    dispatch('cml/sync/start', 'userSet', { root: true });
    return api
      .me()
      .then(function (r) {
        var user = {
          id: r.data._id,
          name: r.data.username,
          role: r.data.role,
          description: r.data.description || {},
          groupIds: r.data.groups || []
        };
        dispatch('cml/sync/stop', 'userSet', { root: true });
        commit('set', user);
        dispatch('cml/set', null, { root: true });

        return user
      })
      .catch(function (e) {
        dispatch('cml/sync/stop', 'userSet', { root: true });
        dispatch('cml/messages/error', e.message, { root: true });
        dispatch('cml/reset', null, { root: true });

        throw e
      })
  },

  logout: function logout (ref) {
    var state = ref.state;
    var commit = ref.commit;
    var dispatch = ref.dispatch;

    dispatch('cml/sync/start', 'userLogout', { root: true });
    return api
      .logout()
      .then(function (r) {
        dispatch('cml/sync/stop', 'userLogout', { root: true });
        dispatch('cml/reset', null, { root: true });
        commit('cml/popup/close', null, { root: true });
        commit('cml/dropdown/close', null, { root: true });

        return r.message
      })
      .catch(function (e) {
        dispatch('cml/sync/stop', 'userLogout', { root: true });
        dispatch('cml/messages/error', e.message, { root: true });
        dispatch('cml/reset', null, { root: true });

        throw e
      })
  }
};

var getters$1 = {
  isAdmin: function (state) { return function (ref) {
    var users = ref.users; if ( users === void 0 ) users = {};
    var groups = ref.groups; if ( groups === void 0 ) groups = {};

    var isAdmin = users[state.id] === 3;

    var isInAdminGroup = Object.keys(groups).reduce(function (result, id) {
      var groupIsAdmin = groups[id] === 3;

      var userIsInGroup = state.groupIds.reduce(function (isIn, groupId) {
        return isIn || groupId === id
      }, false);

      return result || (groupIsAdmin && userIsInGroup)
    }, false);

    return isAdmin || isInAdminGroup
  }; },

  isCurrentUser: function (state) { return function (userId) {
    return state.id === userId
  }; },

  isInGroup: function (state) { return function (groupId) {
    return state.groupIds.indexOf(groupId) !== -1
  }; },

  permission: function (state) { return function (ref) {
    var users = ref.users; if ( users === void 0 ) users = {};
    var groups = ref.groups; if ( groups === void 0 ) groups = {};

    var permissionUser =
      (Object.keys(users).find(function (userId) { return userId === state.id; }) &&
        users[state.id]) ||
      0;

    var permissionGroup = Object.keys(groups).reduce(
      function (permission, groupId) { return Math.max(
          permission,
          state.groupIds.indexOf(groupId) !== -1 && groups[groupId]
        ); },
      0
    );

    var permissionRoot = state.isRoot ? 3 : 0;

    return Math.max(permissionUser, permissionGroup, permissionRoot)
  }; }
};

var mutations$4 = {
  set: function set (state, user) {
    state.isLogged = true;
    state.isAdmin = user.role === 'admin';
    state.isRoot = user.name === 'root';
    state.id = user.id;
    state.name = user.name;
    state.role = user.role;
    state.description = user.description;
    state.groupIds = user.groupIds;
  },

  reset: function reset (state) {
    state.isLogged = false;
    state.isAdmin = false;
    state.isRoot = false;
    state.id = '';
    state.name = '';
    state.role = '';
    state.description = {};
    state.groupIds = [];
  },

  groupAdd: function groupAdd (state, groupId) {
    state.groupIds.push(groupId);
  },

  groupRemove: function groupRemove (state, groupId) {
    state.groupIds = state.groupIds.filter(function (id) { return id !== groupId; });
  }
};

var user = {
  namespaced: true,
  state: state$6,
  actions: actions$4,
  getters: getters$1,
  mutations: mutations$4
}

var obj;
var state$7 = {
  list: []
};

var actions$5 = {
  add: function add (ref, ref$1) {
    var commit = ref.commit;
    var dispatch = ref.dispatch;
    var element = ref$1.element;

    dispatch('cml/sync/start', 'usersAdd', { root: true });
    return api
      .createUser(
        element.name,
        element.password,
        element.description,
        element.role
      )
      .then(function (r) {
        dispatch('cml/sync/stop', 'usersAdd', { root: true });
        var user = userFormat(r.data);
        commit('add', user);
        commit('cml/corpus/userAdd', user.id, { root: true });
        dispatch('cml/messages/success', 'User added', { root: true });

        return user
      })
      .catch(function (e) {
        dispatch('cml/sync/stop', 'usersAdd', { root: true });
        dispatch('cml/messages/error', e.message, { root: true });

        throw e
      })
  },

  update: function update (ref, ref$1) {
    var commit = ref.commit;
    var dispatch = ref.dispatch;
    var rootState = ref.rootState;
    var element = ref$1.element;

    dispatch('cml/sync/start', 'usersUpdate', { root: true });
    return api
      .updateUser(element.id, {
        password: element.password,
        role: element.role,
        description: element.description
      })
      .then(function (r) {
        dispatch('cml/sync/stop', 'usersUpdate', { root: true });
        var user = userFormat(r.data);
        commit('update', user);
        if (user.name === rootState.cml.user.name) {
          commit('cml/user/set', user, { root: true });
        }
        dispatch('cml/messages/success', 'User updated', { root: true });

        return user
      })
      .catch(function (e) {
        dispatch('cml/sync/stop', 'usersUpdate', { root: true });
        dispatch('cml/messages/error', e.message, { root: true });

        throw e
      })
  },

  remove: function remove (ref, ref$1) {
    var commit = ref.commit;
    var dispatch = ref.dispatch;
    var id = ref$1.id;

    dispatch('cml/sync/start', 'usersRemove', { root: true });
    return api
      .deleteUser(id)
      .then(function (r) {
        dispatch('cml/sync/stop', 'usersRemove', { root: true });
        commit('remove', id);
        commit('cml/corpus/userRemove', id, { root: true });
        dispatch('cml/messages/success', 'User removed', { root: true });

        return id
      })
      .catch(function (e) {
        dispatch('cml/sync/stop', 'usersRemove', { root: true });
        dispatch('cml/messages/error', e.message, { root: true });

        throw e
      })
  },

  list: function list (ref) {
    var commit = ref.commit;
    var dispatch = ref.dispatch;

    dispatch('cml/sync/start', 'usersList', { root: true });
    return api
      .getUsers()
      .then(function (r) {
        dispatch('cml/sync/stop', 'usersList', { root: true });
        var users = r.data.map(function (user) { return userFormat(user); });
        commit('list', users);

        return users
      })
      .catch(function (e) {
        dispatch('cml/sync/stop', 'usersList', { root: true });
        dispatch('cml/messages/error', e.message, { root: true });

        throw e
      })
  }
};

var getters$2 = {
  permissions: function (state) { return function (permissions) {
    return state.list.reduce(
      function (p, user) { return Object.assign(p, ( obj = {}, obj[user.id] = permissions && permissions[user.id] ? permissions[user.id] : 0, obj)); },
      {}
    )
  }; }
};

var mutations$5 = {
  reset: function reset (state) {
    Vue.set(state, 'list', []);
  },

  add: function add (state, user) {
    state.list.push(user);
  },

  update: function update (state, user) {
    var index = state.list.findIndex(function (u) { return u.id === user.id; });
    Vue.set(state.list, index, user);
  },

  remove: function remove (state, userId) {
    var index = state.list.findIndex(function (u) { return u.id === userId; });
    Vue.delete(state.list, index);
  },

  list: function list (state, users) {
    Vue.set(state, 'list', users);
  }
};

var users = {
  namespaced: true,
  state: state$7,
  actions: actions$5,
  getters: getters$2,
  mutations: mutations$5
}

var obj$1;
var state$8 = {
  list: []
};

var actions$6 = {
  add: function add (ref, ref$1) {
    var commit = ref.commit;
    var dispatch = ref.dispatch;
    var state = ref.state;
    var rootState = ref.rootState;
    var element = ref$1.element;

    dispatch('cml/sync/start', 'groupsAdd', { root: true });
    return api
      .createGroup(element.name, element.description)
      .then(function (r) {
        dispatch('cml/sync/stop', 'groupsAdd', { root: true });
        var group = groupFormat(r.data);
        commit('add', group);
        commit('cml/corpus/groupAdd', group.id, { root: true });
        dispatch('cml/messages/success', 'Group added', { root: true });

        return group
      })
      .catch(function (e) {
        dispatch('cml/sync/stop', 'groupsAdd', { root: true });
        dispatch('cml/messages/error', e.message, { root: true });

        throw e
      })
  },

  remove: function remove (ref, ref$1) {
    var commit = ref.commit;
    var dispatch = ref.dispatch;
    var state = ref.state;
    var rootState = ref.rootState;
    var id = ref$1.id;

    dispatch('cml/sync/start', 'groupsRemove', { root: true });
    return api
      .deleteGroup(id)
      .then(function (r) {
        dispatch('cml/sync/stop', 'groupsRemove', { root: true });
        commit('remove', id);
        commit('cml/corpus/groupRemove', id, { root: true });
        dispatch('cml/messages/success', 'Group removed', { root: true });

        return id
      })
      .catch(function (e) {
        dispatch('cml/sync/stop', 'groupsRemove', { root: true });
        dispatch('cml/messages/error', e.message, { root: true });

        throw e
      })
  },

  update: function update (ref, ref$1) {
    var commit = ref.commit;
    var dispatch = ref.dispatch;
    var state = ref.state;
    var rootState = ref.rootState;
    var element = ref$1.element;

    dispatch('cml/sync/start', 'groupsUpdate', { root: true });
    return api
      .updateGroup(element.id, { description: element.description })
      .then(function (r) {
        dispatch('cml/sync/stop', 'groupsUpdate', { root: true });
        var group = groupFormat(r.data);
        commit('update', group);
        dispatch('cml/messages/success', 'Group updated', { root: true });

        return group
      })
      .catch(function (e) {
        dispatch('cml/sync/stop', 'groupsUpdate', { root: true });
        dispatch('cml/messages/error', e.message, { root: true });

        throw e
      })
  },

  list: function list (ref) {
    var commit = ref.commit;
    var dispatch = ref.dispatch;
    var state = ref.state;
    var rootState = ref.rootState;

    dispatch('cml/sync/start', 'groupsList', { root: true });
    return api
      .getGroups()
      .then(function (r) {
        dispatch('cml/sync/stop', 'groupsList', { root: true });
        var groups = r.data.map(function (group) { return groupFormat(group); });
        commit('list', groups);

        return groups
      })
      .catch(function (e) {
        dispatch('cml/sync/stop', 'groupsList', { root: true });
        dispatch('cml/messages/error', e.message, { root: true });

        throw e
      })
  },

  userAdd: function userAdd (ref, ref$1) {
    var commit = ref.commit;
    var dispatch = ref.dispatch;
    var state = ref.state;
    var rootState = ref.rootState;
    var userId = ref$1.userId;
    var group = ref$1.group;

    dispatch('cml/sync/start', 'groupsUserAdd', { root: true });
    return api
      .addUserToGroup(userId, group.id)
      .then(function (r) {
        dispatch('cml/sync/stop', 'groupsUserAdd', { root: true });
        var group = groupFormat(r.data);
        commit('update', group);
        dispatch('cml/messages/success', 'User added to group', {
          root: true
        });
        if (userId === rootState.cml.user.id) {
          commit('cml/user/groupAdd', group.id, { root: true });
          dispatch('cml/corpus/listAll', null, {
            root: true
          });
        }

        return group
      })
      .catch(function (e) {
        dispatch('cml/sync/stop', 'groupsUserAdd', { root: true });
        dispatch('cml/messages/error', e.message, { root: true });

        throw e
      })
  },

  userRemove: function userRemove (ref, ref$1) {
    var commit = ref.commit;
    var dispatch = ref.dispatch;
    var state = ref.state;
    var rootState = ref.rootState;
    var userId = ref$1.userId;
    var group = ref$1.group;

    dispatch('cml/sync/start', 'groupsUserRemove', { root: true });
    return api
      .removeUserFromGroup(userId, group.id)
      .then(function (r) {
        dispatch('cml/sync/stop', 'groupsUserRemove', { root: true });
        var group = groupFormat(r.data);
        commit('update', group);
        dispatch('cml/messages/success', 'User removed from group', {
          root: true
        });
        if (userId === rootState.cml.user.id) {
          commit('cml/user/groupRemove', group.id, { root: true });
          dispatch('cml/corpus/listAll', null, {
            root: true
          });
        }

        return group
      })
      .catch(function (e) {
        dispatch('cml/sync/stop', 'groupsUserRemove', { root: true });
        dispatch('cml/messages/error', e.message, { root: true });

        throw e
      })
  }
};

var getters$3 = {
  permissions: function (state) { return function (permissions) {
    return state.list.reduce(
      function (p, group) { return Object.assign(p, ( obj$1 = {}, obj$1[group.id] = permissions && permissions[group.id] ? permissions[group.id] : 0, obj$1)); },
      {}
    )
  }; }
};

var mutations$6 = {
  reset: function reset (state) {
    Vue.set(state, 'list', []);
  },

  add: function add (state, group) {
    state.list.push(group);
  },

  update: function update (state, group) {
    var index = state.list.findIndex(function (g) { return g.id === group.id; });
    Vue.set(state.list, index, group);
  },

  remove: function remove (state, groupId) {
    var index = state.list.findIndex(function (g) { return g.id === groupId; });
    Vue.delete(state.list, index);
  },

  list: function list (state, groups) {
    Vue.set(state, 'list', groups);
  }
};

var groups = {
  namespaced: true,
  state: state$8,
  actions: actions$6,
  getters: getters$3,
  mutations: mutations$6
}

var state$9 = {
  lists: {},
  actives: {}
};

var actions$7 = {
  add: function add (ref, ref$1) {
    var commit = ref.commit;
    var dispatch = ref.dispatch;
    var rootState = ref.rootState;
    var rootGetters = ref.rootGetters;
    var element = ref$1.element;
    var uid = ref$1.uid;

    dispatch('cml/sync/start', ("corpusAdd-" + uid), { root: true });
    return api
      .createCorpus(element.name, element.description, {})
      .then(function (r) {
        dispatch('cml/sync/stop', ("corpusAdd-" + uid), { root: true });
        var corpu = {
          name: r.data.name,
          id: r.data._id,
          permission: 3,
          permissions: {
            users: rootGetters['cml/users/permissions']({}),
            groups: rootGetters['cml/groups/permissions']({})
          },
          description: r.data.description || {}
        };
        corpu.permissions.users[rootState.cml.user.id] = 3;
        commit('add', { corpu: corpu, uid: uid });
        dispatch('cml/messages/success', 'Corpus added', { root: true });
        dispatch('set', { corpuId: corpu.id, uid: uid });

        return corpu
      })
      .catch(function (e) {
        dispatch('cml/sync/stop', ("corpusAdd-" + uid), { root: true });
        dispatch('cml/messages/error', e.message, { root: true });

        throw e
      })
  },

  remove: function remove (ref, ref$1) {
    var commit = ref.commit;
    var dispatch = ref.dispatch;
    var state = ref.state;
    var id = ref$1.id;
    var uid = ref$1.uid;

    dispatch('cml/sync/start', ("corpusRemove-" + uid), { root: true });
    return api
      .deleteCorpus(id)
      .then(function (r) {
        dispatch('cml/sync/stop', ("corpusRemove-" + uid), { root: true });
        commit('remove', { corpuId: id, uid: uid });
        dispatch('cml/messages/success', 'Corpus removed', { root: true });
        if (state.actives[uid] === id) {
          dispatch('set', { uid: uid });
        }

        return id
      })
      .catch(function (e) {
        dispatch('cml/sync/stop', ("corpusRemove-" + uid), { root: true });
        dispatch('cml/messages/error', e.message, { root: true });

        throw e
      })
  },

  update: function update (ref, ref$1) {
    var commit = ref.commit;
    var dispatch = ref.dispatch;
    var state = ref.state;
    var element = ref$1.element;
    var uid = ref$1.uid;

    dispatch('cml/sync/start', ("corpusUpdate-" + uid), { root: true });
    return api
      .updateCorpus(element.id, {
        name: element.name,
        description: element.description
      })
      .then(function (r) {
        dispatch('cml/sync/stop', ("corpusUpdate-" + uid), { root: true });
        var corpu = Object.assign({}, element);
        corpu.name = r.data.name;
        corpu.description = r.data.description || {};
        commit('update', { corpu: corpu, uid: uid });
        dispatch('cml/messages/success', 'Corpus updated', { root: true });

        return corpu
      })
      .catch(function (e) {
        dispatch('cml/sync/stop', ("corpusUpdate-" + uid), { root: true });
        dispatch('cml/messages/error', e.message, { root: true });

        throw e
      })
  },

  listAll: function listAll (ref) {
    var state = ref.state;
    var dispatch = ref.dispatch;

    Object.keys(state.lists).forEach(function (uid) {
      dispatch('list', uid);
    });
  },

  list: function list (ref, uid) {
    var commit = ref.commit;
    var dispatch = ref.dispatch;
    var rootGetters = ref.rootGetters;

    dispatch('cml/sync/start', ("corpusList-" + uid), { root: true });
    return api
      .getCorpora()
      .then(function (r) {
        dispatch('cml/sync/stop', ("corpusList-" + uid), { root: true });
        var corpus = r.data.map(function (c) { return ({
          name: c.name,
          id: c._id,
          description: c.description || {},
          permission: rootGetters['cml/user/permission'](c.permissions || {}),
          permissions: {
            users: rootGetters['cml/users/permissions'](
              (c.permissions && c.permissions.users) || {}
            ),
            groups: rootGetters['cml/groups/permissions'](
              (c.permissions && c.permissions.groups) || {}
            )
          }
        }); });
        commit('list', { corpus: corpus, uid: uid });
        dispatch('set', { uid: uid });

        return corpus
      })
      .catch(function (e) {
        dispatch('cml/sync/stop', ("corpusList-" + uid), { root: true });
        dispatch('cml/messages/error', e.message, { root: true });

        throw e
      })
  },

  groupPermissionSet: function groupPermissionSet (
    ref,
    ref$1
  ) {
    var commit = ref.commit;
    var dispatch = ref.dispatch;
    var rootGetters = ref.rootGetters;
    var corpuId = ref$1.corpuId;
    var groupId = ref$1.groupId;
    var permission = ref$1.permission;
    var uid = ref$1.uid;

    dispatch('cml/sync/start', ("corpusGroupPermissionSet-" + uid), {
      root: true
    });
    return api
      .setCorpusPermissionsForGroup(corpuId, groupId, permission)
      .then(function (p) {
        var permissions = p.data;
        dispatch('cml/sync/stop', ("corpusGroupPermissionSet-" + uid), {
          root: true
        });
        commit('groupPermissionsUpdate', {
          corpuId: corpuId,
          groupId: groupId,
          permission: (permissions.groups && permissions.groups[groupId]) || 0,
          uid: uid
        });
        dispatch('cml/messages/success', 'Group permissions updated', {
          root: true
        });

        if (
          rootGetters['cml/user/isInGroup'](groupId) &&
          !rootGetters['cml/user/isAdmin'](permissions)
        ) {
          dispatch('list', uid);
          commit("cml/popup/close", null, { root: true });
        }

        return permissions
      })
      .catch(function (e) {
        dispatch('cml/sync/stop', ("corpusGroupPermissionSet-" + uid), {
          root: true
        });

        dispatch('cml/messages/error', e.message, { root: true });

        throw e
      })
  },

  groupPermissionRemove: function groupPermissionRemove (
    ref,
    ref$1
  ) {
    var commit = ref.commit;
    var dispatch = ref.dispatch;
    var rootGetters = ref.rootGetters;
    var corpuId = ref$1.corpuId;
    var groupId = ref$1.groupId;
    var uid = ref$1.uid;

    dispatch('cml/sync/start', ("corpusGroupPermissionRemove-" + uid), {
      root: true
    });
    return api
      .removeCorpusPermissionsForGroup(corpuId, groupId)
      .then(function (p) {
        var permissions = p.data;
        dispatch('cml/sync/stop', ("corpusGroupPermissionRemove-" + uid), {
          root: true
        });
        commit('groupPermissionsUpdate', {
          corpuId: corpuId,
          groupId: groupId,
          permission: 0,
          uid: uid
        });
        dispatch('cml/messages/success', 'Group permissions updated', {
          root: true
        });

        if (
          rootGetters['cml/user/isInGroup'](groupId) &&
          !rootGetters['cml/user/isAdmin'](permissions)
        ) {
          dispatch('list', uid);
          commit("cml/popup/close", null, { root: true });
        }

        return permissions
      })
      .catch(function (e) {
        dispatch('cml/sync/stop', ("corpusGroupPermissionRemove-" + uid), {
          root: true
        });
        dispatch('cml/messages/error', e.message, { root: true });

        throw e
      })
  },

  userPermissionSet: function userPermissionSet (
    ref,
    ref$1
  ) {
    var commit = ref.commit;
    var dispatch = ref.dispatch;
    var rootGetters = ref.rootGetters;
    var corpuId = ref$1.corpuId;
    var userId = ref$1.userId;
    var permission = ref$1.permission;
    var uid = ref$1.uid;

    dispatch('cml/sync/start', ("corpusUserPermissionSet-" + uid), { root: true });
    return api
      .setCorpusPermissionsForUser(corpuId, userId, permission)
      .then(function (p) {
        var permissions = p.data;
        dispatch('cml/sync/stop', ("corpusUserPermissionSet-" + uid), {
          root: true
        });
        commit('userPermissionsUpdate', {
          corpuId: corpuId,
          userId: userId,
          permission: (permissions.users && permissions.users[userId]) || 0,
          uid: uid
        });
        dispatch('cml/messages/success', 'User permissions updated', {
          root: true
        });

        if (
          rootGetters['cml/user/isCurrentUser'](userId) &&
          !rootGetters['cml/user/isAdmin'](permissions)
        ) {
          dispatch('list', uid);
          commit("cml/popup/close", null, { root: true });
        }

        return permissions
      })
      .catch(function (e) {
        dispatch('cml/sync/stop', ("corpusUserPermissionSet-" + uid), {
          root: true
        });
        dispatch('cml/messages/error', e.message, { root: true });

        throw e
      })
  },

  userPermissionRemove: function userPermissionRemove (
    ref,
    ref$1
  ) {
    var commit = ref.commit;
    var dispatch = ref.dispatch;
    var rootGetters = ref.rootGetters;
    var corpuId = ref$1.corpuId;
    var userId = ref$1.userId;
    var uid = ref$1.uid;

    dispatch('cml/sync/start', ("corpusUserPermissionRemove-" + uid), {
      root: true
    });
    return api
      .removeCorpusPermissionsForUser(corpuId, userId)
      .then(function (p) {
        var permissions = p.data;
        dispatch('cml/sync/stop', ("corpusUserPermissionRemove-" + uid), {
          root: true
        });
        commit('userPermissionsUpdate', { corpuId: corpuId, userId: userId, permission: 0, uid: uid });
        dispatch('cml/messages/success', 'User permissions updated', {
          root: true
        });

        if (
          rootGetters['cml/user/isCurrentUser'](userId) &&
          !rootGetters['cml/user/isAdmin'](permissions)
        ) {
          dispatch('list', uid);
          commit("cml/popup/close", null, { root: true });
        }

        return permissions
      })
      .catch(function (e) {
        dispatch('cml/sync/stop', ("corpusUserPermissionRemove-" + uid), {
          root: true
        });
        dispatch('cml/messages/error', e.message, { root: true });

        throw e
      })
  },

  set: function set (ref, ref$1) {
    var state = ref.state;
    var getters = ref.getters;
    var dispatch = ref.dispatch;
    var commit = ref.commit;
    var corpuId = ref$1.corpuId;
    var uid = ref$1.uid;

    commit('set', { corpuId: corpuId || getters.id(uid), uid: uid });
    if (state.actives[uid]) {
      dispatch(
        'cml/medias/list',
        { corpuId: state.actives[uid], uid: uid },
        { root: true }
      );
      dispatch(
        'cml/layers/list',
        { corpuId: state.actives[uid], uid: uid },
        { root: true }
      );
    } else {
      commit('cml/medias/reset', uid, { root: true });
      commit('cml/layers/reset', uid, { root: true });
    }
  }
};

var getters$4 = {
  id: function (state) { return function (uid) { return (state.actives[uid] &&
      state.lists[uid].map(function (c) { return c.id; }).indexOf(state.actives[uid]) !== -1 &&
      state.actives[uid]) ||
    (state.lists[uid][0] && state.lists[uid][0].id) ||
    null; }; }
};

var mutations$7 = {
  register: function register (state, uid) {
    Vue.set(state.lists, uid, []);
  },

  reset: function reset (state, uid) {
    Vue.set(state.lists, uid, []);
    Vue.delete(state.actives, uid);
  },

  resetAll: function resetAll (state) {
    state.lists = {};
    state.actives = {};
  },

  add: function add (state, ref) {
    var corpu = ref.corpu;
    var uid = ref.uid;

    Object.keys(state.actives).forEach(function (id) {
      var index = state.lists[id].length;
      Vue.set(state.lists[id], index, corpu);
    });
  },

  update: function update (state, ref) {
    var corpu = ref.corpu;
    var uid = ref.uid;

    var index = state.lists[uid].findIndex(function (m) { return m.id === corpu.id; });
    if (index !== -1) {
      Vue.set(state.lists[uid], index, corpu);
    }
  },

  remove: function remove (state, ref) {
    var corpuId = ref.corpuId;
    var uid = ref.uid;

    var index = state.lists[uid].findIndex(function (m) { return m.id === corpuId; });
    if (index !== -1) {
      Vue.delete(state.lists[uid], index);
    }
  },

  list: function list (state, ref) {
    var corpus = ref.corpus;
    var uid = ref.uid;

    Vue.set(state.lists, uid, corpus);
  },

  set: function set (state, ref) {
    var corpuId = ref.corpuId;
    var uid = ref.uid;

    Vue.set(state.actives, uid, corpuId);
  },

  groupAdd: function groupAdd (state, groupId) {
    Object.keys(state.lists).forEach(function (uid) {
      state.lists[uid].forEach(function (c) {
        Vue.set(c.permissions.groups, groupId, 0);
      });
    });
  },

  groupRemove: function groupRemove (state, groupId) {
    Object.keys(state.lists).forEach(function (uid) {
      state.lists[uid].forEach(function (c) {
        Vue.delete(c.permissions.groups, groupId);
      });
    });
  },

  userAdd: function userAdd (state, userId) {
    Object.keys(state.lists).forEach(function (uid) {
      state.lists[uid].forEach(function (c) {
        Vue.set(c.permissions.users, userId, 0);
      });
    });
  },

  userRemove: function userRemove (state, userId) {
    Object.keys(state.lists).forEach(function (uid) {
      state.lists[uid].forEach(function (c) {
        Vue.delete(c.permissions.users, userId);
      });
    });
  },

  groupPermissionsUpdate: function groupPermissionsUpdate (state, ref) {
    var corpuId = ref.corpuId;
    var groupId = ref.groupId;
    var permission = ref.permission;
    var uid = ref.uid;

    var index = state.lists[uid].findIndex(function (m) { return m.id === corpuId; });
    if (index !== -1) {
      Vue.set(state.lists[uid][index].permissions.groups, groupId, permission);
    }
  },

  userPermissionsUpdate: function userPermissionsUpdate (state, ref) {
    var corpuId = ref.corpuId;
    var userId = ref.userId;
    var permission = ref.permission;
    var uid = ref.uid;

    var index = state.lists[uid].findIndex(function (m) { return m.id === corpuId; });
    if (index !== -1) {
      Vue.set(state.lists[uid][index].permissions.users, userId, permission);
    }
  }
};

var corpus = {
  namespaced: true,
  state: state$9,
  actions: actions$7,
  getters: getters$4,
  mutations: mutations$7
}

var interval;

var state$10 = {
  lists: {},
  actives: {},
  properties: {}
};

var actions$8 = {
  add: function add (ref, ref$1) {
    var commit = ref.commit;
    var dispatch = ref.dispatch;
    var element = ref$1.element;
    var uid = ref$1.uid;

    dispatch('cml/sync/start', ("mediasAdd-" + uid), { root: true });
    return api
      .createMedium(
        element.corpuId,
        element.name,
        element.url,
        element.description
      )
      .then(function (r) {
        dispatch('cml/sync/stop', ("mediasAdd-" + uid), { root: true });
        var media = mediaFormat(r.data);
        commit('add', { media: media, uid: uid });
        dispatch('cml/messages/success', 'Medium added', { root: true });
        dispatch('set', { mediaId: media.id, uid: uid });

        return media
      })
      .catch(function (e) {
        dispatch('cml/sync/stop', ("mediasAdd-" + uid), { root: true });
        dispatch('cml/messages/error', e.message, { root: true });

        throw e
      })
  },

  remove: function remove (ref, ref$1) {
    var commit = ref.commit;
    var dispatch = ref.dispatch;
    var rootGetters = ref.rootGetters;
    var id = ref$1.id;
    var uid = ref$1.uid;

    dispatch('cml/sync/start', ("mediasRemove-" + uid), { root: true });
    return api
      .deleteMedium(id)
      .then(function (r) {
        dispatch('cml/sync/stop', ("mediasRemove-" + uid), { root: true });
        commit('remove', { mediaId: id, uid: uid });
        dispatch('cml/messages/success', 'Medium removed', { root: true });
        if (state$10.actives[uid] === id) {
          dispatch('set', { uid: uid });
        }
        dispatch(
          'cml/annotations/list',
          { layerId: rootGetters['cml/layers/id'](uid), uid: uid },
          { root: true }
        );

        return id
      })
      .catch(function (e) {
        dispatch('cml/sync/stop', ("mediasRemove-" + uid), { root: true });
        dispatch('cml/messages/error', e.message, { root: true });

        throw e
      })
  },

  update: function update (ref, ref$1) {
    var commit = ref.commit;
    var dispatch = ref.dispatch;
    var state = ref.state;
    var rootState = ref.rootState;
    var element = ref$1.element;
    var uid = ref$1.uid;

    dispatch('cml/sync/start', ("mediasUpdate-" + uid), { root: true });
    return api
      .updateMedium(element.id, {
        name: element.name,
        description: element.description,
        url: element.url
      })
      .then(function (r) {
        dispatch('cml/sync/stop', ("mediasUpdate-" + uid), { root: true });
        var media = Object.assign({}, element);
        media.name = r.data.name;
        media.url = r.data.url;
        media.description = r.data.description || {};
        commit('update', { media: media, uid: uid });
        dispatch('cml/messages/success', 'Medium updated', { root: true });

        return media
      })
      .catch(function (e) {
        dispatch('cml/sync/stop', ("mediasUpdate-" + uid), { root: true });
        dispatch('cml/messages/error', e.message, { root: true });

        throw e
      })
  },

  list: function list (ref, ref$1) {
    var dispatch = ref.dispatch;
    var commit = ref.commit;
    var corpuId = ref$1.corpuId;
    var uid = ref$1.uid;

    dispatch('cml/sync/start', ("mediasList-" + uid), { root: true });
    return api
      .getMedia({ filter: { id_corpus: corpuId } })
      .then(function (r) {
        dispatch('cml/sync/stop', ("mediasList-" + uid), { root: true });
        var medias = r.data.map(function (media) {
          return mediaFormat(media)
        });
        commit('list', { medias: medias, uid: uid });
        dispatch('set', { uid: uid });

        return medias
      })
      .catch(function (e) {
        dispatch('cml/sync/stop', ("mediasList-" + uid), { root: true });
        dispatch('cml/messages/error', e.message, { root: true });

        throw e
      })
  },

  set: function set (ref, ref$1) {
    var state = ref.state;
    var getters = ref.getters;
    var dispatch = ref.dispatch;
    var commit = ref.commit;
    var mediaId = ref$1.mediaId;
    var uid = ref$1.uid;

    if (state.properties[uid] && state.properties[uid].isPlaying) {
      dispatch('pause', uid);
    }
    commit('set', { mediaId: mediaId || getters.id(uid), uid: uid });
  },

  play: function play (ref, uid) {
    var state = ref.state;
    var commit = ref.commit;

    var timeStart = Date.now();
    var timeCurrent = state.properties[uid].timeCurrent;
    interval = setInterval(function () {
      var timeEllapsed = Date.now() - timeStart;
      // commit('timeCurrent', { time: timeCurrent + timeEllapsed, uid })
      Vue.set(state.properties[uid], 'timeCurrent', timeCurrent + timeEllapsed);
    }, 0);
    commit('play', uid);
  },

  pause: function pause (ref, uid) {
    var commit = ref.commit;

    clearInterval(interval);
    commit('pause', uid);
  },

  buffering: function buffering (ref, uid) {
    var commit = ref.commit;

    clearInterval(interval);
  },

  stop: function stop (ref, uid) {
    var commit = ref.commit;
    var dispatch = ref.dispatch;

    clearInterval(interval);
    commit('pause', uid);
    dispatch('seek', { options: { ratio: 0, serverRequest: true }, uid: uid });
  },

  seek: function seek (ref, ref$1) {
    var state = ref.state;
    var commit = ref.commit;
    var dispatch = ref.dispatch;
    var ratio = ref$1.ratio;
    var serverRequest = ref$1.serverRequest;
    var uid = ref$1.uid;

    if (state.properties[uid].isPlaying) {
      clearInterval(interval);
    }
    // commit('timeCurrent', {
    //   time: ratio * state.properties[uid].timeTotal,
    //   uid
    // })

    Vue.set(
      state.properties[uid],
      'timeCurrent',
      ratio * state.properties[uid].timeTotal
    );
    commit('seek', { options: { seeking: true, serverRequest: serverRequest }, uid: uid });
  }
};

var getters$5 = {
  id: function (state) { return function (uid) { return (state.actives[uid] &&
      state.lists[uid].map(function (c) { return c.id; }).indexOf(state.actives[uid]) !== -1 &&
      state.actives[uid]) ||
    (state.lists[uid][0] && state.lists[uid][0].id) ||
    null; }; }
};

var mutations$8 = {
  reset: function reset (state, uid) {
    Vue.set(state.lists, uid, []);
    Vue.delete(state.actives, uid);
    Vue.delete(state.properties, uid);
  },

  resetAll: function resetAll (state) {
    Vue.set(state, 'lists', {});
    Vue.set(state, 'actives', {});
    Vue.set(state, 'properties', {});
  },

  add: function add (state, ref) {
    var media = ref.media;
    var uid = ref.uid;

    var index = state.lists[uid].length;
    Vue.set(state.lists[uid], index, media);
  },

  update: function update (state, ref) {
    var media = ref.media;
    var uid = ref.uid;

    var index = state.lists[uid].findIndex(function (m) { return m.id === media.id; });
    Vue.set(state.lists[uid], index, media);
  },

  remove: function remove (state, ref) {
    var mediaId = ref.mediaId;
    var uid = ref.uid;

    var index = state.lists[uid].findIndex(function (m) { return m.id === mediaId; });
    if (index !== -1) {
      Vue.delete(state.lists[uid], index);
    }
  },

  list: function list (state, ref) {
    var medias = ref.medias;
    var uid = ref.uid;

    Vue.set(state.lists, uid, medias);
  },

  set: function set (state, ref) {
    var mediaId = ref.mediaId;
    var uid = ref.uid;

    Vue.set(state.actives, uid, mediaId);
    Vue.set(state.properties, uid, {
      timeTotal: 0,
      timeCurrent: 0,
      isPlaying: false,
      isLoaded: false,
      seek: { seeking: false }
    });
  },

  loaded: function loaded (state, ref) {
    var isLoaded = ref.isLoaded;
    var uid = ref.uid;

    Vue.set(state.properties[uid], 'isLoaded', isLoaded);
  },

  play: function play (state, uid) {
    Vue.set(state.properties[uid], 'isPlaying', true);
  },

  pause: function pause (state, uid) {
    Vue.set(state.properties[uid], 'isPlaying', false);
  },

  timeTotal: function timeTotal (state, ref) {
    var time = ref.time;
    var uid = ref.uid;

    Vue.set(state.properties[uid], 'timeTotal', time);
  },

  seek: function seek (state, ref) {
    var options = ref.options;
    var uid = ref.uid;

    Vue.set(state.properties[uid], 'seek', options);
  }
};

var medias = {
  namespaced: true,
  state: state$10,
  actions: actions$8,
  getters: getters$5,
  mutations: mutations$8
}

var state$11 = {
  lists: {},
  actives: {}
};

var actions$9 = {
  add: function add (ref, ref$1) {
    var commit = ref.commit;
    var dispatch = ref.dispatch;
    var rootState = ref.rootState;
    var rootGetters = ref.rootGetters;
    var element = ref$1.element;
    var uid = ref$1.uid;

    dispatch('cml/sync/start', ("layersAdd-" + uid), { root: true });
    return api
      .createLayer(
        element.corpuId,
        element.name,
        element.description,
        element.fragmentType,
        element.metadataType,
        element.annotations
      )
      .then(function (r) {
        dispatch('cml/sync/stop', ("layersAdd-" + uid), { root: true });
        var layer = {
          name: r.data.name,
          id: r.data._id,
          permission: 3,
          permissions: {
            users: rootGetters['cml/users/permissions']({}),
            groups: rootGetters['cml/groups/permissions']({})
          },
          description: r.data.description || {},
          fragmentType: r.data.fragment_type || {},
          metadataType: r.data.data_type || {},
          annotations: r.data.annotations
        };

        layer.permissions.users[rootState.cml.user.id] = 3;

        commit('add', { layer: layer, uid: uid });
        dispatch('cml/messages/success', 'Layer added', { root: true });
        dispatch('set', { layerId: layer.id, uid: uid });

        return layer
      })
      .catch(function (e) {
        dispatch('cml/sync/stop', ("layersAdd-" + uid), { root: true });

        dispatch('cml/messages/error', e.message, { root: true });

        throw e
      })
  },

  remove: function remove (ref, ref$1) {
    var commit = ref.commit;
    var dispatch = ref.dispatch;
    var state = ref.state;
    var rootState = ref.rootState;
    var id = ref$1.id;
    var uid = ref$1.uid;

    dispatch('cml/sync/start', ("layersRemove-" + uid), { root: true });
    return api
      .deleteLayer(id)
      .then(function (r) {
        dispatch('cml/sync/stop', ("layersRemove-" + uid), { root: true });
        commit('remove', { layerId: id, uid: uid });
        dispatch('cml/messages/success', 'Layer removed', { root: true });
        if (state.actives[uid] === id) {
          dispatch('set', { uid: uid });
        }

        return id
      })
      .catch(function (e) {
        dispatch('cml/sync/stop', ("layersRemove-" + uid), { root: true });

        dispatch('cml/messages/error', e.message, { root: true });

        throw e
      })
  },

  update: function update (ref, ref$1) {
    var commit = ref.commit;
    var dispatch = ref.dispatch;
    var state = ref.state;
    var rootState = ref.rootState;
    var element = ref$1.element;
    var uid = ref$1.uid;

    dispatch('cml/sync/start', ("layersUpdate-" + uid), { root: true });
    return api
      .updateLayer(element.id, {
        name: element.name,
        description: element.description,
        fragment_type: element.fragmentType,
        data_type: element.metadataType
      })
      .then(function (r) {
        dispatch('cml/sync/stop', ("layersUpdate-" + uid), { root: true });
        var layer = Object.assign({}, element);
        layer.description = r.data.description || {};
        layer.fragmentType = r.data.fragment_type || {};
        layer.metadataType = r.data.data_type || {};
        commit('update', { layer: layer, uid: uid });
        dispatch('cml/messages/success', 'Layer updated', { root: true });

        return layer
      })
      .catch(function (e) {
        dispatch('cml/sync/stop', ("layersUpdate-" + uid), { root: true });

        dispatch('cml/messages/error', e.message, { root: true });

        throw e
      })
  },

  list: function list (ref, ref$1) {
    var dispatch = ref.dispatch;
    var commit = ref.commit;
    var rootGetters = ref.rootGetters;
    var corpuId = ref$1.corpuId;
    var uid = ref$1.uid;

    dispatch('cml/sync/start', ("layersList-" + uid), { root: true });
    return api
      .getLayers({ filter: { id_corpus: corpuId } })
      .then(function (r) {
        dispatch('cml/sync/stop', ("layersList-" + uid), { root: true });
        var layers = r.data.map(function (l) { return ({
          name: l.name,
          id: l._id,
          description: l.description || {},
          permission: rootGetters['cml/user/permission'](l.permissions),
          permissions: {
            users: rootGetters['cml/users/permissions'](
              (l.permissions && l.permissions.users) || {}
            ),
            groups: rootGetters['cml/groups/permissions'](
              (l.permissions && l.permissions.groups) || {}
            )
          },
          fragmentType: l.fragment_type || {},
          metadataType: l.data_type || {},
          annotations: l.annotations || []
        }); });
        commit('list', { layers: layers, uid: uid });
        dispatch('set', { uid: uid });

        return layers
      })
      .catch(function (e) {
        dispatch('cml/sync/stop', ("layersList-" + uid), { root: true });

        throw e
      })
  },

  groupPermissionSet: function groupPermissionSet (
    ref,
    ref$1
  ) {
    var commit = ref.commit;
    var dispatch = ref.dispatch;
    var rootState = ref.rootState;
    var rootGetters = ref.rootGetters;
    var layerId = ref$1.layerId;
    var groupId = ref$1.groupId;
    var permission = ref$1.permission;
    var uid = ref$1.uid;

    dispatch('cml/sync/start', ("layersGroupPermissionSet-" + uid), {
      root: true
    });
    return api
      .setLayerPermissionsForGroup(layerId, groupId, permission)
      .then(function (p) {
        var permissions = p.data;
        dispatch('cml/sync/stop', ("layersGroupPermissionSet-" + uid), {
          root: true
        });
        commit('groupPermissionsUpdate', {
          layerId: layerId,
          groupId: groupId,
          permission: (permissions.groups && permissions.groups[groupId]) || 0,
          uid: uid
        });
        dispatch('cml/messages/success', 'Group permissions updated', {
          root: true
        });

        if (
          rootGetters['cml/user/isInGroup'](groupId) &&
          !rootGetters['cml/user/isAdmin'](permissions)
        ) {
          dispatch('list', { corpuId: rootState.cml.corpus.actives[uid], uid: uid });
          commit('cml/popup/close', null, { root: true });
        }

        return permissions
      })
      .catch(function (e) {
        dispatch('cml/sync/stop', ("layersGroupPermissionSet-" + uid), {
          root: true
        });

        dispatch('cml/messages/error', e.message, { root: true });

        throw e
      })
  },

  groupPermissionRemove: function groupPermissionRemove (
    ref,
    ref$1
  ) {
    var commit = ref.commit;
    var dispatch = ref.dispatch;
    var rootState = ref.rootState;
    var rootGetters = ref.rootGetters;
    var layerId = ref$1.layerId;
    var groupId = ref$1.groupId;
    var uid = ref$1.uid;

    dispatch('cml/sync/start', ("layersGroupPermissionRemove-" + uid), {
      root: true
    });
    return api
      .removeLayerPermissionsForGroup(layerId, groupId)
      .then(function (p) {
        var permissions = p.data;
        dispatch('cml/sync/stop', ("layersGroupPermissionRemove-" + uid), {
          root: true
        });
        commit('groupPermissionsUpdate', {
          layerId: layerId,
          groupId: groupId,
          permission: 0,
          uid: uid
        });
        dispatch('cml/messages/success', 'Group permissions updated', {
          root: true
        });

        if (
          rootGetters['cml/user/isInGroup'](groupId) &&
          !rootGetters['cml/user/isAdmin'](permissions)
        ) {
          dispatch('list', { corpuId: rootState.cml.corpus.actives[uid], uid: uid });
          commit('cml/popup/close', null, { root: true });
        }

        return permissions
      })
      .catch(function (e) {
        dispatch('cml/sync/stop', ("layersGroupPermissionRemove-" + uid), {
          root: true
        });

        dispatch('cml/messages/error', e.message, { root: true });

        throw e
      })
  },

  userPermissionSet: function userPermissionSet (
    ref,
    ref$1
  ) {
    var commit = ref.commit;
    var dispatch = ref.dispatch;
    var rootState = ref.rootState;
    var rootGetters = ref.rootGetters;
    var layerId = ref$1.layerId;
    var userId = ref$1.userId;
    var permission = ref$1.permission;
    var uid = ref$1.uid;

    dispatch('cml/sync/start', ("layersUserPermissionSet-" + uid), { root: true });
    return api
      .setLayerPermissionsForUser(layerId, userId, permission)
      .then(function (p) {
        var permissions = p.data;
        dispatch('cml/sync/stop', ("layersUserPermissionSet-" + uid), {
          root: true
        });
        commit('userPermissionsUpdate', {
          layerId: layerId,
          userId: userId,
          permission: (permissions.users && permissions.users[userId]) || 0,
          uid: uid
        });
        dispatch('cml/messages/success', 'User permissions updated', {
          root: true
        });

        if (
          rootGetters['cml/user/isCurrentUser'](userId) &&
          !rootGetters['cml/user/isAdmin'](permissions)
        ) {
          dispatch('list', { corpuId: rootState.cml.corpus.actives[uid], uid: uid });
          commit('cml/popup/close', null, { root: true });
        }

        return permissions
      })
      .catch(function (e) {
        dispatch('cml/sync/stop', ("layersUserPermissionSet-" + uid), {
          root: true
        });

        dispatch('cml/messages/error', e.message, { root: true });

        throw e
      })
  },

  userPermissionRemove: function userPermissionRemove (
    ref,
    ref$1
  ) {
    var commit = ref.commit;
    var dispatch = ref.dispatch;
    var rootState = ref.rootState;
    var rootGetters = ref.rootGetters;
    var layerId = ref$1.layerId;
    var userId = ref$1.userId;
    var uid = ref$1.uid;

    dispatch('cml/sync/start', ("layersUserPermissionRemove-" + uid), {
      root: true
    });
    return api
      .removeLayerPermissionsForUser(layerId, userId)
      .then(function (p) {
        var permissions = p.data;
        dispatch('cml/sync/stop', ("layersUserPermissionRemove-" + uid), {
          root: true
        });
        commit('userPermissionsUpdate', { layerId: layerId, userId: userId, permission: 0, uid: uid });
        dispatch('cml/messages/success', 'User permissions updated', {
          root: true
        });

        if (
          rootGetters['cml/user/isCurrentUser'](userId) &&
          !rootGetters['cml/user/isAdmin'](permissions)
        ) {
          dispatch('list', { corpuId: rootState.cml.corpus.actives[uid], uid: uid });
          commit('cml/popup/close', null, { root: true });
        }

        return permissions
      })
      .catch(function (e) {
        dispatch('cml/sync/stop', ("layersUserPermissionRemove-" + uid), {
          root: true
        });
        dispatch('cml/messages/error', e.message, { root: true });

        throw e
      })
  },

  set: function set (ref, ref$1) {
    var state = ref.state;
    var getters = ref.getters;
    var dispatch = ref.dispatch;
    var commit = ref.commit;
    var layerId = ref$1.layerId;
    var uid = ref$1.uid;

    commit('set', { layerId: layerId || getters.id(uid), uid: uid });
    if (state.actives[uid]) {
      dispatch(
        'cml/annotations/list',
        { layerId: state.actives[uid], uid: uid },
        { root: true }
      );
    } else {
      commit('cml/annotations/reset', uid, { root: true });
    }
  }
};

var getters$6 = {
  id: function (state) { return function (uid) { return (state.actives[uid] &&
      state.lists[uid].map(function (c) { return c.id; }).indexOf(state.actives[uid]) !== -1 &&
      state.actives[uid]) ||
    (state.lists[uid][0] && state.lists[uid][0].id) ||
    null; }; }
};

var mutations$9 = {
  reset: function reset (state, uid) {
    Vue.set(state.lists, uid, []);
    Vue.delete(state.actives, uid);
  },

  resetAll: function resetAll (state) {
    Vue.set(state, 'lists', {});
    Vue.set(state, 'actives', {});
  },

  add: function add (state, ref) {
    var layer = ref.layer;
    var uid = ref.uid;

    var index = state.lists[uid].length;
    Vue.set(state.lists[uid], index, layer);
  },

  update: function update (state, ref) {
    var layer = ref.layer;
    var uid = ref.uid;

    var index = state.lists[uid].findIndex(function (l) { return l.id === layer.id; });
    if (index !== -1) {
      Vue.set(state.lists[uid], index, layer);
    }
  },

  remove: function remove (state, ref) {
    var layerId = ref.layerId;
    var uid = ref.uid;

    var index = state.lists[uid].findIndex(function (l) { return l.id === layerId; });
    if (index !== -1) {
      Vue.delete(state.lists[uid], index);
    }
  },

  list: function list (state, ref) {
    var layers = ref.layers;
    var uid = ref.uid;

    Vue.set(state.lists, uid, layers);
  },

  set: function set (state, ref) {
    var layerId = ref.layerId;
    var uid = ref.uid;

    Vue.set(state.actives, uid, layerId);
  },

  groupAdd: function groupAdd (state, groupId) {
    Object.keys(state.lists).forEach(function (uid) {
      state.lists[uid].forEach(function (c) {
        Vue.set(c.permissions.groups, groupId, 0);
      });
    });
  },

  groupRemove: function groupRemove (state, groupId) {
    Object.keys(state.lists).forEach(function (uid) {
      state.lists[uid].forEach(function (c) {
        Vue.delete(c.permissions.groups, groupId);
      });
    });
  },

  userAdd: function userAdd (state, userId) {
    Object.keys(state.lists).forEach(function (uid) {
      state.lists[uid].forEach(function (c) {
        Vue.set(c.permissions.users, userId, 0);
      });
    });
  },

  userRemove: function userRemove (state, userId) {
    Object.keys(state.lists).forEach(function (uid) {
      state.lists[uid].forEach(function (c) {
        Vue.delete(c.permissions.users, userId);
      });
    });
  },

  groupPermissionsUpdate: function groupPermissionsUpdate (state, ref) {
    var layerId = ref.layerId;
    var groupId = ref.groupId;
    var permission = ref.permission;
    var uid = ref.uid;

    var index = state.lists[uid].findIndex(function (m) { return m.id === layerId; });
    if (index !== -1) {
      Vue.set(state.lists[uid][index].permissions.groups, groupId, permission);
    }
  },

  userPermissionsUpdate: function userPermissionsUpdate (state, ref) {
    var layerId = ref.layerId;
    var userId = ref.userId;
    var permission = ref.permission;
    var uid = ref.uid;

    var index = state.lists[uid].findIndex(function (m) { return m.id === layerId; });
    if (index !== -1) {
      Vue.set(state.lists[uid][index].permissions.users, userId, permission);
    }
  }
};

var layers = {
  namespaced: true,
  state: state$11,
  actions: actions$9,
  getters: getters$6,
  mutations: mutations$9
}

var state$12 = {
  lists: {},
  actives: {}
};

var actions$10 = {
  add: function add (ref, ref$1) {
    var commit = ref.commit;
    var dispatch = ref.dispatch;
    var element = ref$1.element;
    var uid = ref$1.uid;

    dispatch('cml/sync/start', ("annotationsAdd-" + uid), { root: true });
    return api
      .createAnnotation(
        element.layerId,
        element.mediaLink ? element.mediaId : null,
        element.fragment,
        element.metadata
      )
      .then(function (r) {
        dispatch('cml/sync/stop', ("annotationsAdd-" + uid), { root: true });
        var annotation = {
          id: r.data._id,
          fragment: r.data.fragment || {},
          metadata: r.data.data || {},
          layerId: r.data.id_layer,
          mediaId: r.data.id_medium || null
        };
        commit('add', { annotation: annotation, uid: uid });
        dispatch('cml/messages/success', 'Annotation added', { root: true });
        dispatch('set', { id: annotation.id, uid: uid });

        return annotation
      })
      .catch(function (e) {
        dispatch('cml/sync/stop', ("annotationsAdd-" + uid), { root: true });
        dispatch('cml/messages/error', e.message, { root: true });

        throw e
      })
  },

  remove: function remove (ref, ref$1) {
    var commit = ref.commit;
    var dispatch = ref.dispatch;
    var id = ref$1.id;
    var uid = ref$1.uid;

    dispatch('cml/sync/start', ("annotationsRemove-" + uid), { root: true });
    return api
      .deleteAnnotation(id)
      .then(function (r) {
        dispatch('cml/sync/stop', ("annotationsRemove-" + uid), { root: true });
        commit('remove', { id: id, uid: uid });
        dispatch('cml/messages/success', 'Annotation removed', { root: true });

        return id
      })
      .catch(function (e) {
        dispatch('cml/sync/stop', ("annotationsRemove-" + uid), { root: true });
        dispatch('cml/messages/error', e.message, { root: true });

        throw e
      })
  },

  update: function update (ref, ref$1) {
    var commit = ref.commit;
    var dispatch = ref.dispatch;
    var element = ref$1.element;
    var uid = ref$1.uid;

    dispatch('cml/sync/start', ("annotationsUpdate-" + uid), { root: true });
    return api
      .updateAnnotation(element.id, {
        fragment: element.fragment,
        data: element.metadata
      })
      .then(function (r) {
        var annotation = Object.assign({}, element);
        annotation.fragment = r.data.fragment || {};
        annotation.metadata = r.data.data || {};
        dispatch('cml/sync/stop', ("annotationsUpdate-" + uid), { root: true });
        commit('update', { annotation: annotation, uid: uid });
        dispatch('cml/messages/success', 'Annotation updated', { root: true });

        return annotation
      })
      .catch(function (e) {
        dispatch('cml/sync/stop', ("annotationsUpdate-" + uid), { root: true });
        dispatch('cml/messages/error', e.message, { root: true });

        throw e
      })
  },

  list: function list (ref, ref$1) {
    var dispatch = ref.dispatch;
    var commit = ref.commit;
    var layerId = ref$1.layerId;
    var uid = ref$1.uid;

    dispatch('cml/sync/start', ("annotationsList-" + uid), { root: true });
    return api
      .getAnnotations({ filter: { id_layer: layerId } })
      .then(function (r) {
        if (!uid) {
          throw new Error('missing uid')
        }
        dispatch('cml/sync/stop', ("annotationsList-" + uid), { root: true });
        var annotations = r.data.map(function (a) { return ({
          id: a._id,
          fragment: a.fragment || {},
          metadata: a.data || {},
          layerId: a.id_layer,
          mediaId: a.id_medium || null
        }); });
        commit('list', { annotations: annotations, uid: uid });
        dispatch('set', { uid: uid });

        return annotations
      })
      .catch(function (e) {
        dispatch('cml/sync/stop', ("annotationsList-" + uid), { root: true });
        dispatch('cml/messages/error', e.message, { root: true });

        throw e
      })
  },

  set: function set (ref, ref$1) {
    var getters = ref.getters;
    var commit = ref.commit;
    var id = ref$1.id;
    var uid = ref$1.uid;

    commit('set', { id: id || getters.id(uid), uid: uid });
  }
};

var getters$7 = {
  id: function (state) { return function (uid) { return (state.actives[uid] &&
      state.lists[uid].map(function (c) { return c.id; }).indexOf(state.actives[uid]) !== -1 &&
      state.actives[uid]) ||
    (state.lists[uid][0] && state.lists[uid][0].id) ||
    null; }; }
};

var mutations$10 = {
  reset: function reset (state, uid) {
    Vue.set(state.lists, uid, []);
  },

  resetAll: function resetAll (state) {
    Vue.set(state, 'lists', {});
    Vue.set(state, 'actives', {});
  },

  add: function add (state, ref) {
    var annotation = ref.annotation;
    var uid = ref.uid;

    var index = state.lists[uid].length;
    Vue.set(state.lists[uid], index, annotation);
  },

  update: function update (state, ref) {
    var annotation = ref.annotation;
    var uid = ref.uid;

    var index = state.lists[uid].findIndex(function (m) { return m.id === annotation.id; });
    Vue.set(state.lists[uid], index, annotation);
  },

  remove: function remove (state, ref) {
    var id = ref.id;
    var uid = ref.uid;

    var index = state.lists[uid].findIndex(function (m) { return m.id === id; });
    if (index !== -1) {
      Vue.delete(state.lists[uid], index);
    }
  },

  list: function list (state, ref) {
    var annotations = ref.annotations;
    var uid = ref.uid;

    Vue.set(state.lists, uid, annotations);
  },

  set: function set (state, ref) {
    var id = ref.id;
    var uid = ref.uid;

    Vue.set(state.actives, uid, id);
  }
};

var annotations = {
  namespaced: true,
  state: state$12,
  actions: actions$10,
  getters: getters$7,
  mutations: mutations$10
}

var modules = {
  viewport: viewport,
  sync: sync,
  popup: popup,
  dropdown: dropdown,
  messages: messages,
  user: user,
  users: users,
  groups: groups,
  corpus: corpus,
  medias: medias,
  layers: layers,
  annotations: annotations
};

var state = {
  config: config
};

var actions = {
  set: function set (ref) {
    var dispatch = ref.dispatch;

    Promise.all([].concat( ['users', 'groups'].map(function (type) { return dispatch(("cml/" + type + "/list"), {}, { root: true })
          .then(function (r) { return r; })
          .catch(function (e) { return e; }); }
      ) )).then(function (res) {
      dispatch('cml/corpus/listAll', null, { root: true });
    });
  },

  reset: function reset (ref) {
    var commit = ref.commit;

    commit('cml/user/reset', null, { root: true });
    commit('cml/users/reset', null, { root: true });
    commit('cml/groups/reset', null, { root: true });
    commit('cml/corpus/resetAll', null, { root: true });
    commit('cml/medias/resetAll', null, { root: true });
    commit('cml/layers/resetAll', null, { root: true });
    commit('cml/annotations/resetAll', null, { root: true });
  }
};

Vue.use(Vuex);

var store = new Vuex.Store({
  modules: {
    cml: {
      namespaced: true,
      state: state,
      actions: actions,
      modules: modules
    }
  }
})

var debug = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return (_vm.visible)?_c('pre',[_c('code',[_vm._v(_vm._s(_vm.state))])]):_vm._e()},staticRenderFns: [],_scopeId: 'data-v-5a8a2715',
  name: 'camomile-utils-debug',

  data: function data () {
    return {
      visible: false
    }
  },

  computed: {
    state: function state () {
      return this.$store.state.cml.popup
    }
  },

  methods: {
    keydown: function keydown (e) {
      if (e.keyCode >= 65 && e.keyCode <= 90) {
        var char = (e.metaKey ? 'meta-' : '') + e.keyCode;
        if (char === 'meta-69') {
          this.visible = !this.visible;
        }
      }
    }
  },

  created: function created () {
    document.addEventListener('keydown', this.keydown);
  },

  beforeDestroy: function beforeDestroy () {
    document.removeEventListener('keydown', this.keydown);
  }
}

var viewport$1 = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div')},staticRenderFns: [],_scopeId: 'data-v-24d69054',
  name: 'camomile-utils-viewport',

  methods: {
    resize: function resize () {
      return this.$store.dispatch('cml/viewport/set')
    }
  },

  mounted: function mounted () {
    window.addEventListener('resize', this.resize);
    this.resize();
  }
}

var cmlDropdown = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('transition',{attrs:{"name":"transition-top"}},[(_vm.dropdown.visible)?_c('div',{staticClass:"absolute full bg-alpha",on:{"click":function($event){if($event.target !== $event.currentTarget){ return null; }_vm.close($event);}}},[_c('div',{staticClass:"container relative"},[_c(_vm.dropdown.config.component,{tag:"component"})],1)]):_vm._e()])},staticRenderFns: [],
  name: 'camomile-utils-dropdown',

  computed: {
    dropdown: function dropdown () {
      return this.$store.state.cml.dropdown
    }
  },

  methods: {
    close: function close () {
      this.$store.commit('cml/dropdown/close');
    }
  }
}

var cmlPopup = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_c('div',{staticClass:"absolute full bg-alpha",on:{"click":_vm.close}}),_vm._v(" "),_c('div',{staticClass:"pophover absolute full bg-alt p-l pb-s"},[_c('div',{staticClass:"flex flex-start"},[_c('h2',[_vm._v(_vm._s(_vm.config.title))]),_vm._v(" "),(_vm.config.closeBtn)?_c('button',{staticClass:"flex-right btn p-s mt--m",on:{"click":_vm.close}},[_c('i',{staticClass:"icon-24 icon-24-close"})]):_vm._e()]),_vm._v(" "),_c('hr',{staticClass:"border-bg"}),_vm._v(" "),_c(_vm.config.component,{tag:"component"})],1)])},staticRenderFns: [],
  name: 'camomile-popup',

  computed: {
    config: function config () {
      return this.$store.state.cml.popup.config
    }
  },

  methods: {
    close: function close () {
      if (this.config.closeBtn) {
        this.$store.commit('cml/popup/close');
      }
    },
    keyup: function keyup (e) {
      if ((e.which || e.keyCode) === 27) {
        this.close();
      }
    }
  },

  created: function created () {
    if (this.config.closeBtn) {
      document.addEventListener('keyup', this.keyup);
    }
  },

  beforeDestroy: function beforeDestroy () {
    if (this.config.closeBtn) {
      document.removeEventListener('keyup', this.keyup);
    }
  }
}

var cmlMessages = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"messages absolute center"},[_c('transition-group',{attrs:{"name":"transition-bottom","tag":"div"}},_vm._l((_vm.messages),function(message){return (message.content)?_c('div',{key:message.id,staticClass:"px-m py-s mb color-bg b",class:("bg-" + (message.type))},[_vm._v(" "+_vm._s(message.content)+" ")]):_vm._e()}))],1)},staticRenderFns: [],
  name: 'camomile-utils-messages',

  computed: {
    messages: function messages () {
      return this.$store.state.cml.messages.list
    }
  }
}

var cmlTitle = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('h1',{staticClass:"mb-0"},[_vm._v(_vm._s(_vm.title))])},staticRenderFns: [],
  name: 'camomile-header-title',

  computed: {
    title: function title () {
      return this.$store.state.cml.config.title
    }
  }
}

var cmlInfos = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('h6',{staticClass:"menubar-infos mb-0"},[_vm._v(_vm._s(_vm.url))])},staticRenderFns: [],
  name: 'camomile-header-infos',

  computed: {
    url: function url () {
      return this.$store.state.cml.config.url
    }
  }
}

var objectField = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_c('h3',{staticClass:"pt-s"},[_vm._v(_vm._s(_vm.title))]),_vm._v(" "),_c('div',{staticClass:"blobs"},[_c('div',{staticClass:"blob-1"},[_c('textarea',{directives:[{name:"model",rawName:"v-model",value:(_vm.fields),expression:"fields"}],ref:"field",staticClass:"textarea-alt",domProps:{"value":(_vm.fields)},on:{"keyup":_vm.resize,"input":function($event){if($event.target.composing){ return; }_vm.fields=$event.target.value;}}})])])])},staticRenderFns: [],
  name: 'camomile-popup-edit-json',
  props: {
    name: String,
    title: String
  },

  computed: {
    fields: {
      get: function get () {
        return JSON.stringify(this.$store.state.cml.popup.element[this.name], undefined, 2)
      },
      set: function set (value) {
        if (this.jsonCheck(value)) {
          this.$store.commit('cml/popup/fieldUpdate', { name: this.name, value: JSON.parse(value) });
        }
      }
    }
  },

  methods: {
    jsonCheck: function jsonCheck (str) {
      try {
        JSON.parse(str);
      } catch (e) {
        return false
      }
      return true
    },
    resize: function resize (e) {
      var el = e.target;
      el.style.height = (el.scrollHeight) + "px";
    }
  },

  mounted: function mounted () {
    var el = this.$refs.field;
    el.style.height = (el.scrollHeight) + "px";
  }
}

var popupEdit = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[(_vm.type !== 'annotations')?_c('div',{staticClass:"blobs"},[_vm._m(0),_vm._v(" "),_c('div',{staticClass:"blob-3-4"},[_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.element.name),expression:"element.name"}],ref:"name",staticClass:"input-alt",attrs:{"type":"text","placeholder":"Name","disabled":_vm.element.id && (_vm.type === 'users' || _vm.type === 'groups')},domProps:{"value":(_vm.element.name)},on:{"input":function($event){if($event.target.composing){ return; }_vm.$set(_vm.element, "name", $event.target.value);}}})])]):_vm._e(),_vm._v(" "),(_vm.type === 'users')?_c('div',{staticClass:"blobs"},[_vm._m(1),_vm._v(" "),_c('div',{staticClass:"blob-3-4"},[_c('select',{directives:[{name:"model",rawName:"v-model",value:(_vm.element.role),expression:"element.role"}],staticClass:"select-alt",attrs:{"type":"text","disabled":!_vm.rolesPermission},on:{"change":function($event){var $$selectedVal = Array.prototype.filter.call($event.target.options,function(o){return o.selected}).map(function(o){var val = "_value" in o ? o._value : o.value;return val}); _vm.$set(_vm.element, "role", $event.target.multiple ? $$selectedVal : $$selectedVal[0]);}}},_vm._l((_vm.roles),function(role){return _c('option',{key:role,domProps:{"value":role}},[_vm._v(" "+_vm._s(role)+" ")])}))])]):_vm._e(),_vm._v(" "),(_vm.type === 'users')?_c('div',{staticClass:"blobs"},[_vm._m(2),_vm._v(" "),_c('div',{staticClass:"blob-3-4"},[_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.element.password),expression:"element.password"}],staticClass:"input-alt",attrs:{"type":"password","placeholder":"••••••••"},domProps:{"value":(_vm.element.password)},on:{"input":function($event){if($event.target.composing){ return; }_vm.$set(_vm.element, "password", $event.target.value);}}})])]):_vm._e(),_vm._v(" "),(_vm.type === 'medias')?_c('div',{staticClass:"blobs"},[_vm._m(3),_vm._v(" "),_c('div',{staticClass:"blob-3-4"},[_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.element.url),expression:"element.url"}],staticClass:"input-alt",attrs:{"type":"text","placeholder":"http://…"},domProps:{"value":(_vm.element.url)},on:{"input":function($event){if($event.target.composing){ return; }_vm.$set(_vm.element, "url", $event.target.value);}}})])]):_vm._e(),_vm._v(" "),(_vm.type === 'annotations' && !_vm.element.id && _vm.element.mediaId)?_c('div',{staticClass:"blobs"},[_vm._m(4),_vm._v(" "),_c('div',{staticClass:"blob-3-4 p-s"},[_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.element.mediaLink),expression:"element.mediaLink"}],staticClass:"select-alt",attrs:{"type":"checkbox"},domProps:{"checked":Array.isArray(_vm.element.mediaLink)?_vm._i(_vm.element.mediaLink,null)>-1:(_vm.element.mediaLink)},on:{"change":function($event){var $$a=_vm.element.mediaLink,$$el=$event.target,$$c=$$el.checked?(true):(false);if(Array.isArray($$a)){var $$v=null,$$i=_vm._i($$a,$$v);if($$el.checked){$$i<0&&(_vm.element.mediaLink=$$a.concat([$$v]));}else{$$i>-1&&(_vm.element.mediaLink=$$a.slice(0,$$i).concat($$a.slice($$i+1)));}}else{_vm.$set(_vm.element, "mediaLink", $$c);}}}}),_vm._v(" "+_vm._s(_vm.element.mediaName)+" ")])]):_vm._e(),_vm._v(" "),(_vm.type === 'annotations')?_c('object-field',{attrs:{"name":'fragment',"title":'Fragment'}}):_vm._e(),_vm._v(" "),(_vm.type === 'annotations')?_c('object-field',{attrs:{"name":'metadata',"title":'Meta-data'}}):_vm._e(),_vm._v(" "),(_vm.type === 'layers')?_c('object-field',{attrs:{"name":'fragmentType',"title":'Fragment type'}}):_vm._e(),_vm._v(" "),(_vm.type === 'layers')?_c('object-field',{attrs:{"name":'metadataType',"title":'Meta-data type'}}):_vm._e(),_vm._v(" "),(_vm.type !== 'annotations')?_c('object-field',{attrs:{"name":'description',"title":'Description'}}):_vm._e(),_vm._v(" "),_c('div',{staticClass:"blobs"},[_c('div',{staticClass:"blob-1-4"}),_vm._v(" "),_c('div',{staticClass:"blob-3-4"},[_c('button',{staticClass:"btn-alt p-s full-x",attrs:{"disabled":!_vm.element.name && _vm.type !== 'annotations'},on:{"click":_vm.save,"keyup":function($event){if(!('button' in $event)&&_vm._k($event.keyCode,"enter",13,$event.key)){ return null; }_vm.save($event);}}},[_vm._v("Save")])])])],1)},staticRenderFns: [function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"blob-1-4"},[_c('h4',{staticClass:"pt-s mb-0"},[_vm._v("Name")])])},function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"blob-1-4"},[_c('h4',{staticClass:"pt-s mb-0"},[_vm._v("Role")])])},function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"blob-1-4"},[_c('h4',{staticClass:"pt-s mb-0"},[_vm._v("Password")])])},function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"blob-1-4"},[_c('h4',{staticClass:"pt-s mb-0"},[_vm._v("Url")])])},function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"blob-1-4"},[_c('h4',{staticClass:"pt-s mb-0"},[_vm._v("Link to media")])])}],
  name: 'camomile-popup-edit',

  components: {
    objectField: objectField
  },

  computed: Object.assign({}, mapState({
      element: function (state) { return state.cml.popup.element; },
      type: function (state) { return state.cml.popup.config.type; },
      uid: function (state) { return state.cml.popup.config.uid; },
      rolesPermission: function (state) { return state.cml.user.id !== state.cml.popup.element.id; },
      roles: function (state) { return state.cml.config.roles; }
    })),

  methods: {
    save: function save () {
      if (this.element.id) {
        this.$store.dispatch(("cml/" + (this.type) + "/update"), { element: this.element, uid: this.uid });
      } else {
        this.$store.dispatch(("cml/" + (this.type) + "/add"), { element: this.element, uid: this.uid });
      }
      this.$store.commit('cml/popup/close');
    },
    keyup: function keyup (e) {
      if ((e.which || e.keyCode) === 13) {
        this.save();
      }
    }
  },

  created: function created () {
    document.addEventListener('keyup', this.keyup);
  },

  mounted: function mounted () {
    if (this.type !== 'annotations') {
      this.$refs.name.focus();
    }
  },

  beforeDestroy: function beforeDestroy () {
    document.removeEventListener('keyup', this.keyup);
  }
}

var userbuttonDropdown = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"dropdown"},[(_vm.isAdmin)?_c('div',[_c('button',{staticClass:"btn px-m py-s full-x",on:{"click":function($event){_vm.popupOpen({ config: _vm.popupEditConfig, element: _vm.user });}}},[_vm._v("Settings…")])]):_vm._e(),_vm._v(" "),_c('div',[_c('button',{staticClass:"btn px-m py-s full-x mr home",on:{"click":_vm.logout}},[_vm._v("Logout")])])])},staticRenderFns: [],
  name: 'camomile-header-userbutton-dropdown',

  data: function data () {
    return {
      popupEditConfig: {
        type: 'users',
        closeBtn: true,
        title: 'Edit user',
        component: popupEdit
      }
    }
  },

  computed: {
    user: function user () {
      return this.$store.state.cml.user
    },
    isAdmin: function isAdmin () {
      return this.$store.state.cml.user.isAdmin
    }
  },

  methods: {
    close: function close () {
      this.$store.commit('cml/dropdown/close');
    },
    logout: function logout () {
      return this.$store.dispatch('cml/user/logout')
    },
    popupOpen: function popupOpen (ref) {
      var config = ref.config;
      var element = ref.element;

      this.$store.commit('cml/popup/open', { config: config, element: element });
      this.close();
    }
  }
}

var cmlUserbutton = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('button',{staticClass:"btn-menubar px-m py-s full-x",class:{ active: _vm.visible },on:{"click":_vm.dropdownToggle}},[_vm._v(_vm._s(_vm.user.name))])},staticRenderFns: [],
  name: 'camomile-header-userbutton',
  computed: Object.assign({}, mapState({
      user: function (state) { return state.cml.user; },
      visible: function (state) { return state.cml.dropdown.visible; }
    })),
  methods: {
    dropdownToggle: function dropdownToggle () {
      if (this.visible) {
        this.$store.commit('cml/dropdown/close');
      } else {
        this.$store.commit('cml/dropdown/open', {
          component: userbuttonDropdown
        });
      }
    }
  }
}

var cmlSync = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('button',{staticClass:"btn-menubar px-m py-s full-x",on:{"click":_vm.sync}},[_c('i',{staticClass:"icon-24 icon-24-dot",class:{ blink: _vm.active }})])},staticRenderFns: [],
  name: 'camomile-header-syncbutton',

  computed: {
    active: function active () {
      return this.$store.getters['cml/sync/active']
    }
  },

  methods: {
    sync: function sync () {
      this.$store.dispatch('cml/sync/all');
    }
  }
}

var cmlHeader = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"bg-inverse color-bg header"},[_c('div',{staticClass:"container"},[_c('div',{staticClass:"blobs"},[_c('div',{staticClass:"blob-1-4 mb-0"},[_c('cml-title')],1),_vm._v(" "),(_vm.isLogged)?_c('div',{staticClass:"blob-1-2 mb-0"},[_c('div',{staticClass:"blobs-default"},[_c('div',{staticClass:"blob-default"},[_c('cml-sync',{staticClass:"mb-0 left"})],1),_vm._v(" "),_c('div',{staticClass:"blob-auto mb-0"},[_c('cml-infos')],1)])]):_vm._e(),_vm._v(" "),(_vm.isLogged)?_c('div',{staticClass:"blob mb-0 flex-right"},[_c('cml-userbutton')],1):_vm._e()])])])},staticRenderFns: [],
  name: 'camomile-header',

  components: {
    cmlTitle: cmlTitle,
    cmlInfos: cmlInfos,
    cmlUserbutton: cmlUserbutton,
    cmlSync: cmlSync
  },

  computed: {
    isLogged: function isLogged () {
      return this.$store.state.cml.user.isLogged
    }
  }
}

var popupLogin = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_c('div',{staticClass:"blobs"},[_vm._m(0),_vm._v(" "),_c('div',{staticClass:"blob-3-4"},[_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.config.user.name),expression:"config.user.name"}],staticClass:"input-alt",attrs:{"type":"text","placeholder":"Name"},domProps:{"value":(_vm.config.user.name)},on:{"input":function($event){if($event.target.composing){ return; }_vm.$set(_vm.config.user, "name", $event.target.value);}}})]),_vm._v(" "),_vm._m(1),_vm._v(" "),_c('div',{staticClass:"blob-3-4"},[_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.config.user.password),expression:"config.user.password"}],staticClass:"input-alt",attrs:{"type":"password","placeholder":"Password"},domProps:{"value":(_vm.config.user.password)},on:{"input":function($event){if($event.target.composing){ return; }_vm.$set(_vm.config.user, "password", $event.target.value);}}})]),_vm._v(" "),_c('div',{staticClass:"blob-1-4"}),_vm._v(" "),_c('div',{staticClass:"blob-3-4"},[_c('button',{staticClass:"btn-alt p-s full-x",on:{"click":function($event){_vm.login(_vm.config);}}},[_vm._v("Login")])])])])},staticRenderFns: [function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"blob-1-4"},[_c('h4',{staticClass:"pt-s mb-0"},[_vm._v("Name")])])},function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"blob-1-4"},[_c('h4',{staticClass:"pt-s mb-0"},[_vm._v("Password")])])}],
  name: 'camomile-login-popup',

  computed: {
    config: function config () {
      return this.$store.state.cml.config
    }
  },

  methods: {
    login: function login (config) {
      return this.$store.dispatch('cml/user/login', config)
    },
    keyup: function keyup (e) {
      if ((e.which || e.keyCode) === 13) {
        this.login(this.config);
      }
    }
  },

  created: function created () {
    document.addEventListener('keyup', this.keyup);
  },

  beforeDestroy: function beforeDestroy () {
    document.removeEventListener('keyup', this.keyup);
  }
}

var cmlLogin = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div')},staticRenderFns: [],
  name: 'camomile-login',

  created: function created () {
    this.$store.commit('cml/popup/open', {
      config: {
        title: 'Login',
        closeBtn: false,
        component: popupLogin
      },
      element: {}
    });
  }
}

var app = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"full-y flex flex-direction-column"},[_c('cml-header'),_vm._v(" "),_c('div',{staticClass:"relative page"},[_c('transition',{attrs:{"name":"transition-top"}},[(_vm.popup.visible)?_c('cml-popup'):_vm._e()],1),_vm._v(" "),_c('cml-messages'),_vm._v(" "),_c('cml-dropdown'),_vm._v(" "),(_vm.isLogged)?_vm._t("default"):_c('cml-login')],2),_vm._v(" "),_c('viewport'),_vm._v(" "),_c('debug')],1)},staticRenderFns: [],
  store: store,

  name: 'camomile',

  components: {
    debug: debug,
    viewport: viewport$1,
    cmlHeader: cmlHeader,
    cmlLogin: cmlLogin,
    cmlPopup: cmlPopup,
    cmlMessages: cmlMessages,
    cmlDropdown: cmlDropdown
  },

  computed: Object.assign({}, mapState({
      isLogged: function (state$$1) { return state$$1.cml.user.isLogged; },
      popup: function (state$$1) { return state$$1.cml.popup; },
      media: function (state$$1) { return state$$1.cml.medias.list.find(function (m) { return m.id === state$$1.cml.medias.id; }); }
    }))
}

var popupRemove = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[(_vm.type !== 'annotations')?_c('div',{staticClass:"blobs"},[_vm._m(0),_vm._v(" "),_c('div',{staticClass:"blob-3-4"},[_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.element.name),expression:"element.name"}],staticClass:"input-alt",attrs:{"type":"text","placeholder":"Name","disabled":_vm.element.id},domProps:{"value":(_vm.element.name)},on:{"input":function($event){if($event.target.composing){ return; }_vm.$set(_vm.element, "name", $event.target.value);}}})])]):_vm._e(),_vm._v(" "),(_vm.type === 'annotations')?_c('div',{staticClass:"blobs"},[_vm._m(1),_vm._v(" "),_c('div',{staticClass:"blob-3-4"},[_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.element.id),expression:"element.id"}],staticClass:"input-alt",attrs:{"type":"text","placeholder":"Name","disabled":_vm.element.id},domProps:{"value":(_vm.element.id)},on:{"input":function($event){if($event.target.composing){ return; }_vm.$set(_vm.element, "id", $event.target.value);}}})])]):_vm._e(),_vm._v(" "),_c('div',{staticClass:"blobs"},[_c('div',{staticClass:"blob-1-4"}),_vm._v(" "),_c('div',{staticClass:"blob-3-4"},[_c('button',{staticClass:"btn-alt p-s full-x",on:{"click":_vm.remove,"keyup":function($event){if(!('button' in $event)&&_vm._k($event.keyCode,"enter",13,$event.key)){ return null; }_vm.remove($event);}}},[_vm._v("Remove")])])])])},staticRenderFns: [function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"blob-1-4"},[_c('h4',{staticClass:"pt-s mb-0"},[_vm._v("Name")])])},function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"blob-1-4"},[_c('h4',{staticClass:"pt-s mb-0"},[_vm._v("Id")])])}],
  name: 'camomile-popup-remove',

  computed: Object.assign({}, mapState({
      element: function (state) { return state.cml.popup.element; },
      type: function (state) { return state.cml.popup.config.type; },
      uid: function (state) { return state.cml.popup.config.uid; }
    })),

  methods: {
    remove: function remove () {
      this.$store.dispatch(("cml/" + (this.type) + "/remove"), { id: this.element.id, uid: this.uid });
      this.$store.commit("cml/popup/close");
    },
    keyup: function keyup (e) {
      if ((e.which || e.keyCode) === 13) {
        this.remove();
      }
    }
  },
  created: function created () {
    document.addEventListener('keyup', this.keyup);
  },
  beforeDestroy: function beforeDestroy () {
    document.removeEventListener('keyup', this.keyup);
  }
}

var popupGroups = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_c('div',{staticClass:"blobs"},[_vm._m(0),_vm._v(" "),_c('div',{staticClass:"blob-3-4"},[_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.user.name),expression:"user.name"}],staticClass:"input-alt",attrs:{"type":"text","placeholder":"Name","disabled":"disabled"},domProps:{"value":(_vm.user.name)},on:{"input":function($event){if($event.target.composing){ return; }_vm.$set(_vm.user, "name", $event.target.value);}}})])]),_vm._v(" "),_c('div',{staticClass:"blobs"},[_c('div',{staticClass:"blob-1"},[_c('h3',{staticClass:"mb-s"},[_vm._v("Groups")]),_vm._v(" "),_c('ul',{staticClass:"list-inline clearfix"},_vm._l((_vm.groups),function(group){return _c('li',{key:group.id,staticClass:"tag",class:{ active: _vm.groupActive(group.id) }},[_c('button',{staticClass:"btn px-m py-xs h5 pill",on:{"click":function($event){_vm.groupToggle(group);}}},[_vm._v(_vm._s(group.name))])])}))])])])},staticRenderFns: [function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"blob-1-4"},[_c('h4',{staticClass:"pt-s mb-0"},[_vm._v("Name")])])}],
  name: 'camomile-popup-groups',

  computed: {
    groups: function groups () {
      return this.$store.state.cml.groups.list
    },
    user: function user () {
      var this$1 = this;

      return this.$store.state.cml.users.list.find(function (user) { return user.id === this$1.$store.state.cml.popup.element.id; })
    }
  },

  methods: {
    groupToggle: function groupToggle (group) {
      if (this.groupActive(group.id)) {
        this.$store.dispatch('cml/groups/userRemove', { userId: this.user.id, group: group });
      } else {
        this.$store.dispatch('cml/groups/userAdd', { userId: this.user.id, group: group });
      }
    },
    groupActive: function groupActive (groupId) {
      return this.groups.find(function (group) { return group.id === groupId; })
        .userIds.indexOf(this.user.id) !== -1
    }
  }
}

var users$1 = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return (_vm.isAdmin)?_c('div',[_c('div',{staticClass:"flex flex-start"},[_c('h2',{staticClass:"mt-s"},[_vm._v("Users")]),_vm._v(" "),_c('button',{staticClass:"btn p-s flex-right",on:{"click":function($event){_vm.popupOpen({ config: _vm.popupAddConfig, element: { description: {}, role: 'user' } });}}},[_c('i',{staticClass:"icon-24 icon-24-plus"})])]),_vm._v(" "),_c('div',[_c('table',{staticClass:"table mb-0"},[_vm._m(0),_vm._v(" "),_vm._l((_vm.users),function(user){return _c('tr',{key:user.id},[_c('td',[_vm._v(_vm._s(user.name))]),_vm._v(" "),_c('td',[_vm._v(_vm._s(user.role))]),_vm._v(" "),_c('td',{staticClass:"text-right"},[_c('button',{staticClass:"btn px-s py-s my--s h6",on:{"click":function($event){_vm.popupOpen({ config: _vm.popupGroupsConfig, element: user });}}},[_vm._v("Groups")]),_vm._v(" "),_c('button',{staticClass:"btn px-s py-s my--s h6",on:{"click":function($event){_vm.popupOpen({ config: _vm.popupEditConfig, element: user });}}},[_vm._v("Edit")]),_vm._v(" "),(user.id !== _vm.userId)?_c('button',{staticClass:"btn px-s py-s my--s h6",on:{"click":function($event){_vm.popupOpen({ config: _vm.popupRemoveConfig, element: user });}}},[_vm._v("Remove")]):_vm._e()])])})],2)])]):_vm._e()},staticRenderFns: [function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('tr',[_c('th',[_vm._v("Name")]),_c('th',[_vm._v("Role")]),_c('th')])}],
  name: 'camomile-users',

  data: function data () {
    return {
      popupEditConfig: {
        type: 'users',
        closeBtn: true,
        title: 'Edit user',
        component: popupEdit
      },
      popupAddConfig: {
        type: 'users',
        closeBtn: true,
        title: 'Add user',
        component: popupEdit
      },
      popupGroupsConfig: {
        closeBtn: true,
        title: 'User groups',
        component: popupGroups
      },
      popupRemoveConfig: {
        type: 'users',
        closeBtn: true,
        title: 'Remove user',
        component: popupRemove
      }
    }
  },

  computed: Object.assign({}, mapState({
      isAdmin: function (state) { return state.cml.user.isAdmin; },
      users: function (state) { return state.cml.users.list; },
      userId: function (state) { return state.cml.user.id; }
    })),

  methods: {
    popupOpen: function popupOpen (ref) {
      var config = ref.config;
      var element = ref.element;

      return this.$store.commit('cml/popup/open', { config: config, element: element })
    }
  }
}

var popupUsers = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_c('div',{staticClass:"blobs"},[_vm._m(0),_vm._v(" "),_c('div',{staticClass:"blob-3-4"},[_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.group.name),expression:"group.name"}],staticClass:"input-alt",attrs:{"type":"text","placeholder":"Name","disabled":"disabled"},domProps:{"value":(_vm.group.name)},on:{"input":function($event){if($event.target.composing){ return; }_vm.$set(_vm.group, "name", $event.target.value);}}})])]),_vm._v(" "),_c('div',{staticClass:"blobs"},[_c('div',{staticClass:"blob-1"},[_c('h3',{staticClass:"pt-s mb-s"},[_vm._v("Users")]),_vm._v(" "),_c('ul',{staticClass:"list-inline"},_vm._l((_vm.users),function(user){return _c('li',{key:user.id,staticClass:"tag",class:{ active: _vm.userActive(user.id) }},[_c('button',{staticClass:"btn px-m py-xs h5 pill",on:{"click":function($event){_vm.userToggle(user.id);}}},[_vm._v(_vm._s(user.name))])])}))])])])},staticRenderFns: [function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"blob-1-4"},[_c('h4',{staticClass:"pt-s mb-0"},[_vm._v("Name")])])}],
  name: 'camomile-popup-users',

  computed: {
    users: function users () {
      return this.$store.state.cml.users.list
    },
    group: function group () {
      var this$1 = this;

      return this.$store.state.cml.groups.list.find(function (group) { return group.id === this$1.$store.state.cml.popup.element.id; })
    }
  },

  methods: {
    userToggle: function userToggle (userId) {
      if (this.userActive(userId)) {
        this.$store.dispatch('cml/groups/userRemove', { userId: userId, group: this.group });
      } else {
        this.$store.dispatch('cml/groups/userAdd', { userId: userId, group: this.group });
      }
    },

    userActive: function userActive (userId) {
      return this.group.userIds.indexOf(userId) > -1
    }
  }
}

var groups$1 = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return (_vm.isAdmin)?_c('div',[_c('div',{staticClass:"flex flex-start"},[_c('h2',{staticClass:"mt-s"},[_vm._v("Groups")]),_vm._v(" "),_c('button',{staticClass:"btn p-s flex-right",on:{"click":function($event){_vm.popupOpen({ config: _vm.popupAddConfig, element: { description: {} } });}}},[_c('i',{staticClass:"icon-24 icon-24-plus"})])]),_vm._v(" "),_c('div',[_c('table',{staticClass:"table mb-0"},[_vm._m(0),_vm._v(" "),_vm._l((_vm.groups),function(group){return _c('tr',{key:group.id},[_c('td',[_vm._v(_vm._s(group.name))]),_vm._v(" "),_c('td',[_vm._v(_vm._s(group.userIds.length))]),_vm._v(" "),_c('td',{staticClass:"text-right"},[_c('button',{staticClass:"btn px-s py-s my--s h6",on:{"click":function($event){_vm.popupOpen({ config: _vm.popupUsersConfig, element: group });}}},[_vm._v("Users")]),_vm._v(" "),_c('button',{staticClass:"btn px-s py-s my--s h6",on:{"click":function($event){_vm.popupOpen({ config: _vm.popupEditConfig, element: group });}}},[_vm._v("Edit")]),_vm._v(" "),(_vm.isRoot)?_c('button',{staticClass:"btn px-s py-s my--s h6",on:{"click":function($event){_vm.popupOpen({ config: _vm.popupRemoveConfig, element: group });}}},[_vm._v("Remove")]):_vm._e()])])})],2)])]):_vm._e()},staticRenderFns: [function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('tr',[_c('th',[_vm._v("Name")]),_c('th',[_vm._v("Users")]),_c('th')])}],
  name: 'camomile-groups',

  data: function data () {
    return {
      popupRemoveConfig: {
        type: 'groups',
        closeBtn: true,
        title: 'Remove group',
        component: popupRemove
      },
      popupEditConfig: {
        type: 'groups',
        closeBtn: true,
        title: 'Edit group',
        component: popupEdit
      },
      popupAddConfig: {
        type: 'groups',
        closeBtn: true,
        title: 'Add group',
        component: popupEdit
      },
      popupUsersConfig: {
        closeBtn: true,
        title: 'Group users',
        component: popupUsers
      }
    }
  },

  computed: Object.assign({}, mapState({
      isAdmin: function (state) { return state.cml.user.isAdmin; },
      groups: function (state) { return state.cml.groups.list; },
      isRoot: function (state) { return state.cml.user.isRoot; }
    })),

  methods: {
    popupOpen: function popupOpen (ref) {
      var config = ref.config;
      var element = ref.element;

      return this.$store.commit('cml/popup/open', { config: config, element: element })
    },
    refresh: function refresh () {
      return this.$store.dispatch('cml/groups/list')
    }
  }
}

var permissionsEdit = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('ul',{staticClass:"list-inline"},[_c('li',{staticClass:"tag",class:{ active: _vm.isActive(1) }},[_c('button',{staticClass:"btn px-s py-xs my--xs h5 mono pill",on:{"click":function($event){_vm.toggle(1);}}},[_vm._v("R")])]),_vm._v(" "),_c('li',{staticClass:"tag",class:{ active: _vm.isActive(2) }},[_c('button',{staticClass:"btn px-s py-xs my--xs h5 mono pill",on:{"click":function($event){_vm.toggle(2);}}},[_vm._v("W")])]),_vm._v(" "),_c('li',{staticClass:"tag",class:{ active: _vm.isActive(3) }},[_c('button',{staticClass:"btn px-s py-xs my--xs h5 mono pill",on:{"click":function($event){_vm.toggle(3);}}},[_vm._v("A")])])])},staticRenderFns: [],
  name: 'camomile-popup-permissions-edit',

  props: {
    element: Object,
    type: String
  },

  computed: {
    id: function id () {
      return this.$store.state.cml.popup.element.id
    },
    uid: function uid () {
      return this.$store.state.cml.popup.config.uid
    },
    permission: function permission () {
      var this$1 = this;

      return this.$store.state.cml[((this.type) + "s")].lists[this.uid].find(function (r) { return r.id === this$1.id; }).permissions[((this.element.type) + "s")][this.element.id]
    }
  },

  methods: {
    toggle: function toggle (permission) {
      var obj, obj$1;

      if (this.isActive(permission)) {
        this.$store.dispatch(("cml/" + (this.type) + "s/" + (this.element.type) + "PermissionRemove"), ( obj = {}, obj[((this.type) + "Id")] = this.id, obj[((this.element.type) + "Id")] = this.element.id, obj.uid = this.uid, obj));
      } else {
        this.$store.dispatch(("cml/" + (this.type) + "s/" + (this.element.type) + "PermissionSet"), ( obj$1 = {}, obj$1[((this.type) + "Id")] = this.id, obj$1[((this.element.type) + "Id")] = this.element.id, obj$1.permission = permission, obj$1.uid = this.uid, obj$1));
      }
    },
    isActive: function isActive (permission) {
      return this.permission === permission
    }
  }
}

var popupPermissions = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_c('div',{staticClass:"blobs"},[_vm._m(0),_vm._v(" "),_c('div',{staticClass:"blob-3-4"},[_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.resource.name),expression:"resource.name"}],staticClass:"input-alt",attrs:{"type":"text","placeholder":"Name","disabled":"disabled"},domProps:{"value":(_vm.resource.name)},on:{"input":function($event){if($event.target.composing){ return; }_vm.$set(_vm.resource, "name", $event.target.value);}}})]),_vm._v(" "),_c('div',{staticClass:"blob-1-2"},[_c('h3',{staticClass:"pt-s"},[_vm._v("Users")]),_vm._v(" "),_c('ul',{staticClass:"list-sans"},_vm._l((_vm.users),function(user){return _c('li',{key:user.id},[_c('div',{staticClass:"blobs"},[_c('div',{staticClass:"blob-1-2 mb-s"},[_vm._v(" "+_vm._s(user.name)+" ")]),_vm._v(" "),_c('div',{staticClass:"blob-1-2 mb-s"},[_c('permissions-edit',{attrs:{"type":_vm.type.slice(0, -1),"element":{ id: user.id, type: 'user' }}})],1)])])}))]),_vm._v(" "),_c('div',{staticClass:"blob-1-2"},[_c('h3',{staticClass:"pt-s"},[_vm._v("Groups")]),_vm._v(" "),_c('ul',{staticClass:"list-sans"},_vm._l((_vm.groups),function(group){return _c('li',{key:group.id},[_c('div',{staticClass:"blobs"},[_c('div',{staticClass:"blob-1-2 mb-s"},[_vm._v(" "+_vm._s(group.name)+" ")]),_vm._v(" "),_c('div',{staticClass:"blob-1-2 mb-s"},[_c('permissions-edit',{attrs:{"type":_vm.type.slice(0, -1),"element":{ id: group.id, type: 'group'}}})],1)])])}))])])])},staticRenderFns: [function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"blob-1-4"},[_c('h4',{staticClass:"pt-s"},[_vm._v("Name")])])}],
  name: 'camomile-permissions',

  components: {
    permissionsEdit: permissionsEdit
  },

  computed: Object.assign({}, mapState({
      resource: function (state) { return state.cml.popup.element; },
      users: function (state) { return state.cml.users.list; },
      groups: function (state) { return state.cml.groups.list; },
      type: function (state) { return state.cml.popup.config.type; },
      uid: function (state) { return state.cml.popup.config.uid; }
    }))
}

var corpus$1 = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_c('div',{staticClass:"flex flex-start"},[_c('h2',{staticClass:"mt-s"},[_vm._v("Corpora")]),_vm._v(" "),(_vm.isAdmin)?_c('button',{staticClass:"flex-right btn p-s",on:{"click":function($event){_vm.popupOpen({ config: _vm.popupAddConfig, element: { id: null, description: {} } });}}},[_c('i',{staticClass:"icon-24 icon-24-plus"})]):_vm._e()]),_vm._v(" "),_c('div',[_c('table',{staticClass:"table mb-0"},[_vm._m(0),_vm._v(" "),_vm._l((_vm.corpus),function(corpu){return _c('tr',{key:corpu.id},[_c('td',[_c('input',{attrs:{"type":"radio"},domProps:{"value":corpu.id,"checked":corpu.id === _vm.corpuId},on:{"change":_vm.set}})]),_vm._v(" "),_c('td',[_vm._v(_vm._s(corpu.name))]),_vm._v(" "),_c('td',{staticClass:"text-right"},[(corpu.permission === 3)?_c('button',{staticClass:"btn px-s py-s my--s h6",on:{"click":function($event){_vm.popupOpen({ config: _vm.popupPermissionsConfig, element: corpu });}}},[_vm._v("Permissions")]):_vm._e(),_vm._v(" "),(corpu.permission === 3)?_c('button',{staticClass:"btn px-s py-s my--s h6",on:{"click":function($event){_vm.popupOpen({ config: _vm.popupEditConfig, element: corpu });}}},[_vm._v("Edit")]):_vm._e(),_vm._v(" "),(_vm.isAdmin && corpu.permission === 3)?_c('button',{staticClass:"btn px-s py-s my--s h6",on:{"click":function($event){_vm.popupOpen({ config: _vm.popupRemoveConfig, element: corpu });}}},[_vm._v("Remove")]):_vm._e()])])})],2)])])},staticRenderFns: [function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('tr',[_c('th'),_c('th',[_vm._v("Name")]),_c('th')])}],
  name: 'camomile-corpus',

  props: {
    uid: {
      type: String,
      default: 'default'
    }
  },

  data: function data () {
    return {
      popupEditConfig: {
        type: 'corpus',
        closeBtn: true,
        title: 'Edit corpus',
        component: popupEdit,
        uid: this.uid
      },
      popupAddConfig: {
        type: 'corpus',
        closeBtn: true,
        title: 'Add corpus',
        component: popupEdit,
        uid: this.uid
      },
      popupRemoveConfig: {
        type: 'corpus',
        closeBtn: true,
        title: 'Remove corpus',
        component: popupRemove,
        uid: this.uid
      },
      popupPermissionsConfig: {
        type: 'corpus',
        closeBtn: true,
        title: 'Corpus permissions',
        component: popupPermissions,
        uid: this.uid
      }
    }
  },

  computed: {
    corpus: function corpus () {
      return this.$store.state.cml.corpus.lists[this.uid]
    },
    corpuId: function corpuId () {
      return this.$store.state.cml.corpus.actives[this.uid]
    },
    isAdmin: function isAdmin () {
      return this.$store.state.cml.user.isAdmin
    }
  },

  methods: {
    popupOpen: function popupOpen (ref) {
      var config = ref.config;
      var element = ref.element;

      this.$store.commit('cml/popup/open', { config: config, element: element });
    },
    set: function set (e) {
      this.$store.dispatch('cml/corpus/set', { corpuId: e.target.value, uid: this.uid });
    }
  },

  mounted: function mounted () {
    this.$store.commit('cml/corpus/register', this.uid);
  }
}

var medias$1 = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_c('div',{staticClass:"flex flex-start"},[_c('h2',{staticClass:"mt-s"},[_vm._v("Media")]),_vm._v(" "),(_vm.permission === 3)?_c('button',{staticClass:"flex-right btn p-s",on:{"click":function($event){_vm.popupOpen({ config: _vm.popupAddConfig, element: { id: null, corpuId: _vm.corpuId, description: {} } });}}},[_c('i',{staticClass:"icon-24 icon-24-plus"})]):_vm._e()]),_vm._v(" "),_c('div',[_c('table',{staticClass:"table mb-0"},[_vm._m(0),_vm._v(" "),_vm._l((_vm.medias),function(media){return _c('tr',{key:media.id},[_c('td',[_c('input',{attrs:{"type":"radio"},domProps:{"value":media.id,"checked":media.id === _vm.mediaId},on:{"change":_vm.set}})]),_vm._v(" "),_c('td',[_vm._v(_vm._s(media.name))]),_vm._v(" "),_c('td',{staticClass:"text-right"},[(_vm.permission === 3)?_c('button',{staticClass:"btn px-s py-s my--s h6",on:{"click":function($event){_vm.popupOpen({ config: _vm.popupEditConfig, element: media });}}},[_vm._v("Edit")]):_vm._e(),_vm._v(" "),(_vm.permission === 3)?_c('button',{staticClass:"btn px-s py-s my--s h6",on:{"click":function($event){_vm.popupOpen({ config: _vm.popupRemoveConfig, element: media });}}},[_vm._v("Remove")]):_vm._e()])])})],2)])])},staticRenderFns: [function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('tr',[_c('th'),_c('th',[_vm._v("Name")]),_c('th')])}],
  name: 'camomile-medias',

  props: {
    uid: {
      type: String,
      default: 'default'
    }
  },

  data: function data () {
    return {
      popupEditConfig: {
        type: 'medias',
        closeBtn: true,
        title: 'Edit medium',
        component: popupEdit,
        uid: this.uid
      },
      popupAddConfig: {
        type: 'medias',
        closeBtn: true,
        title: 'Add medium',
        component: popupEdit,
        uid: this.uid
      },
      popupRemoveConfig: {
        type: 'medias',
        closeBtn: true,
        title: 'Remove medium',
        component: popupRemove,
        uid: this.uid
      }
    }
  },

  computed: {
    corpuId: function corpuId () {
      return this.$store.state.cml.corpus.actives[this.uid]
    },
    mediaId: function mediaId () {
      return this.$store.state.cml.medias.actives[this.uid]
    },
    medias: function medias () {
      return this.$store.state.cml.medias.lists[this.uid]
    },
    permission: function permission () {
      var this$1 = this;

      var corpus = this.$store.state.cml.corpus.lists;
      var corpu = corpus[this.uid] && corpus[this.uid].find(function (c) { return c.id === this$1.corpuId; });
      return corpu ? corpu.permission : 0
    }
  },

  methods: {
    popupOpen: function popupOpen (ref) {
      var config = ref.config;
      var element = ref.element;

      return this.$store.commit('cml/popup/open', { config: config, element: element })
    },
    set: function set (e) {
      this.$store.dispatch('cml/medias/set', { uid: this.uid, mediaId: e.target.value });
    }
  }
}

var layers$1 = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_c('div',{staticClass:"flex flex-start"},[_c('h2',{staticClass:"mt-s"},[_vm._v("Layers")]),_vm._v(" "),(_vm.permission === 3)?_c('button',{staticClass:"flex-right btn p-s",on:{"click":function($event){_vm.popupOpen({ config: _vm.popupAddConfig, element: { id: null, corpuId: _vm.corpuId, description: {}, metadataType: {}, fragmentType: {} } });}}},[_c('i',{staticClass:"icon-24 icon-24-plus"})]):_vm._e()]),_vm._v(" "),_c('div',[_c('table',{staticClass:"table mb-0"},[_vm._m(0),_vm._v(" "),_vm._l((_vm.layers),function(layer){return _c('tr',{key:layer.id},[_c('td',[_c('input',{attrs:{"type":"radio"},domProps:{"value":layer.id,"checked":layer.id === _vm.layerId},on:{"change":_vm.set}})]),_vm._v(" "),_c('td',[_vm._v(_vm._s(layer.name))]),_vm._v(" "),_c('td',{staticClass:"text-right"},[(layer.permission === 3)?_c('button',{staticClass:"btn px-s py-s my--s h6",on:{"click":function($event){_vm.popupOpen({ config: _vm.popupPermissionsConfig, element: layer });}}},[_vm._v("Permissions")]):_vm._e(),_vm._v(" "),(layer.permission === 3)?_c('button',{staticClass:"btn px-s py-s my--s h6",on:{"click":function($event){_vm.popupOpen({ config: _vm.popupEditConfig, element: layer });}}},[_vm._v("Edit")]):_vm._e(),_vm._v(" "),(layer.permission === 3)?_c('button',{staticClass:"btn px-s py-s my--s h6",on:{"click":function($event){_vm.popupOpen({ config: _vm.popupRemoveConfig, element: layer });}}},[_vm._v("Remove")]):_vm._e()])])})],2)])])},staticRenderFns: [function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('tr',[_c('th'),_c('th',[_vm._v("Name")]),_c('th')])}],
  name: 'camomile-layers',

  props: {
    uid: {
      type: String,
      default: 'default'
    }
  },

  data: function data () {
    return {
      popupEditConfig: {
        type: 'layers',
        closeBtn: true,
        title: 'Edit layer',
        component: popupEdit,
        uid: this.uid
      },
      popupAddConfig: {
        type: 'layers',
        closeBtn: true,
        title: 'Edit layer',
        component: popupEdit,
        uid: this.uid
      },
      popupRemoveConfig: {
        type: 'layers',
        closeBtn: true,
        title: 'Remove layer',
        component: popupRemove,
        uid: this.uid
      },
      popupPermissionsConfig: {
        type: 'layers',
        closeBtn: true,
        title: 'Layer permissions',
        component: popupPermissions,
        uid: this.uid
      }
    }
  },

  computed: {
    layers: function layers () {
      return this.$store.state.cml.layers.lists[this.uid]
    },
    layerId: function layerId () {
      return this.$store.state.cml.layers.actives[this.uid]
    },
    corpus: function corpus () {
      return this.$store.state.cml.corpus.lists[this.uid]
    },
    corpuId: function corpuId () {
      return this.$store.state.cml.corpus.actives[this.uid]
    },
    permission: function permission () {
      var this$1 = this;

      var corpus = this.$store.state.cml.corpus.lists;
      var corpu = corpus[this.uid] && corpus[this.uid].find(function (c) { return c.id === this$1.corpuId; });
      return corpu ? corpu.permission : 0
    }
  },

  methods: {
    popupOpen: function popupOpen (ref) {
      var config = ref.config;
      var element = ref.element;

      return this.$store.commit('cml/popup/open', { config: config, element: element })
    },
    set: function set (e) {
      this.$store.dispatch('cml/layers/set', { layerId: e.target.value, uid: this.uid });
    }
  }
}

var annotations$1 = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_c('div',{staticClass:"flex flex-start"},[_c('h2',{staticClass:"mt-s"},[_vm._v("Annotations")]),_vm._v(" "),(_vm.permission === 3)?_c('button',{staticClass:"flex-right btn p-s",on:{"click":function($event){_vm.popupOpen({ config: _vm.popupAddConfig, element: { id: null, layerId: _vm.layerId, mediaId: _vm.mediaId, fragment: {}, metadata: {}, mediaName: _vm.mediaName(_vm.mediaId), mediaLink: true } });}}},[_c('i',{staticClass:"icon-24 icon-24-plus"})]):_vm._e()]),_vm._v(" "),_c('div',[_c('table',{staticClass:"table mb-0"},[_vm._m(0),_vm._v(" "),_vm._l((_vm.annotations),function(annotation){return _c('tr',{key:annotation.id},[_c('td',[_c('input',{attrs:{"type":"radio"},domProps:{"value":annotation.id,"checked":annotation.id === _vm.annotationId},on:{"change":_vm.set}})]),_vm._v(" "),_c('td',[_c('span',{staticClass:"h6 bold bg-neutral color-bg py-xxs px-xs rnd"},[_vm._v("…"+_vm._s(_vm._f("stringEnd")(annotation.id)))])]),_vm._v(" "),_c('td',[_vm._v(_vm._s(_vm.mediaName(annotation.mediaId)))]),_vm._v(" "),_c('td',{staticClass:"text-right"},[(_vm.permission === 3)?_c('button',{staticClass:"btn px-s py-s my--s h6",on:{"click":function($event){_vm.popupOpen({ config: _vm.popupEditConfig, element: annotation });}}},[_vm._v("Edit")]):_vm._e(),_vm._v(" "),(_vm.permission === 3)?_c('button',{staticClass:"btn px-s py-s my--s h6",on:{"click":function($event){_vm.popupOpen({ config: _vm.popupRemoveConfig, element: annotation });}}},[_vm._v("Remove")]):_vm._e()])])})],2)])])},staticRenderFns: [function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('tr',[_c('th'),_c('th',[_vm._v("Id")]),_c('th',[_vm._v("Medium")]),_c('th')])}],
  name: 'camomile-annotations',

  props: {
    uid: {
      type: String,
      default: 'default'
    }
  },

  data: function data () {
    return {
      popupEditConfig: {
        type: 'annotations',
        closeBtn: true,
        title: 'Edit annotation',
        component: popupEdit,
        uid: this.uid
      },
      popupAddConfig: {
        type: 'annotations',
        closeBtn: true,
        title: 'Add annotation',
        component: popupEdit,
        uid: this.uid
      },
      popupRemoveConfig: {
        type: 'annotations',
        closeBtn: true,
        title: 'Remove annotation',
        component: popupRemove,
        uid: this.uid
      }
    }
  },

  computed: {
    annotations: function annotations () {
      return this.$store.state.cml.annotations.lists[this.uid]
    },
    mediaId: function mediaId () {
      return this.$store.state.cml.medias.actives[this.uid].id
    },
    layerId: function layerId () {
      return this.$store.state.cml.layers.actives[this.uid]
    },
    annotationId: function annotationId () {
      return this.$store.state.cml.annotations.actives[this.uid]
    },
    medias: function medias () {
      return this.$store.state.cml.medias.lists[this.uid]
    },
    permission: function permission () {
      var this$1 = this;

      var layers = this.$store.state.cml.layers.lists;
      var layer = layers[this.uid] && layers[this.uid].find(function (c) { return c.id === this$1.layerId; });
      return layer ? layer.permission : 0
    }
  },

  methods: {
    popupOpen: function popupOpen (ref) {
      var config = ref.config;
      var element = ref.element;

      return this.$store.commit('cml/popup/open', { config: config, element: element })
    },
    set: function set (e) {
      this.$store.dispatch('cml/annotations/set', { id: e.target.value, uid: this.uid });
    },
    mediaName: function mediaName (mediaId) {
      if (!mediaId) { return '' }
      var media = this.medias.find(function (m) { return m.id === mediaId; });
      return media ? media.name : ''
    }
  },

  filters: {
    stringEnd: function stringEnd (value) {
      if (!value) { return '' }
      return value.substr(value.length - 6)
    }
  }
}

var spinner = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _vm._m(0)},staticRenderFns: [function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"spinner"},[_c('div',{staticClass:"bounce1"}),_vm._v(" "),_c('div',{staticClass:"bounce2"}),_vm._v(" "),_c('div',{staticClass:"bounce3"})])}],
  name: 'camomile-utils-spinner'
}

var mediaYoutube = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return (_vm.media)?_c('div',{ref:"container"},[_c('div',{directives:[{name:"show",rawName:"v-show",value:(_vm.isLoaded),expression:"isLoaded"}]},[_c('div',{attrs:{"id":"player"}})]),_vm._v(" "),(!_vm.isLoaded)?_c('spinner'):_vm._e()],1):_vm._e()},staticRenderFns: [],
  name: 'camomile-media-youtube',

  props: {
    uid: {
      type: String,
      default: 'default'
    }
  },

  components: {
    spinner: spinner
  },

  data: function data () {
    return {
      player: null,
      videoNew: false
    }
  },

  computed: {
    media: function media () {
      var this$1 = this;

      var medias = this.$store.state.cml.medias;
      return medias.lists[this.uid] && medias.lists[this.uid].find(function (m) { return m.id === medias.actives[this$1.uid]; }) || {}
    },
    properties: function properties () {
      return this.$store.state.cml.medias.properties[this.uid] || {}
    },
    isPlaying: function isPlaying () {
      return this.properties.isPlaying || false
    },
    isLoaded: function isLoaded () {
      return this.properties.isLoaded || false
    },
    seek: function seek () {
      return this.properties.seek || {}
    },
    timeCurrent: function timeCurrent () {
      return this.properties.timeCurrent || 0
    },
    viewportWidth: function viewportWidth () {
      return this.$store.state.cml.viewport.width || 0
    }
  },

  mounted: function mounted () {
    if (this.media.url) {
      this.playerLoad(this.media.url);
    }
  },

  methods: {
    videoLoad: function videoLoad (mediaUrl) {
      if (this.player) {
        var videoId = this.parseYouTubeId(mediaUrl);
        this.player.loadVideoById(videoId);
      } else {
        this.playerLoad(this.media.url);
      }
    },

    playerLoad: function playerLoad (mediaUrl) {
      var this$1 = this;

      var videoId = this.parseYouTubeId(mediaUrl);
      var width = this.$refs.container.offsetWidth;
      var height = width * 9 / 16;
      var events = {
        onReady: function (event) {
          // console.log('onReady', event)
          this$1.$store.commit('cml/medias/loaded', { isLoaded: true, uid: this$1.uid });
          this$1.$store.commit('cml/medias/timeTotal', { time: this$1.player.getDuration() * 1000, uid: this$1.uid });
        },
        onStateChange: function (event) {
          // console.log('onStateChange', event.data, this.videoNew)
          if (event.data === -1) {
            // unstarted
          } else if (event.data === 1) {
            // playing
            if (this$1.videoNew) {
              this$1.videoNew = false;
              this$1.$store.commit('cml/medias/loaded', { isLoaded: true, uid: this$1.uid });
              this$1.$store.commit('cml/medias/timeTotal', { time: this$1.player.getDuration() * 1000, uid: this$1.uid });
              this$1.player.pauseVideo();
            } else {
              this$1.$store.dispatch('cml/medias/play', this$1.uid);
            }
          } else if (event.data === 2) {
            // paused
            this$1.$store.dispatch('cml/medias/pause', this$1.uid);
          } else if (event.data === 3) {
            // buffering
            this$1.$store.dispatch('cml/medias/buffering', this$1.uid);
          } else if (event.data === 0) {
            // ended
            this$1.$store.dispatch('cml/medias/stop', this$1.uid);
          } else if (event.data === 5) {
            // cued
            this$1.$store.commit('cml/medias/loaded', { isLoaded: true, uid: this$1.uid });
            this$1.$store.commit('cml/medias/timeTotal', { time: this$1.player.getDuration() * 1000, uid: this$1.uid });
          }
        },
        onApiChange: function (event) {
          // console.log('onApiChange', event, this.isLoaded)
          if (!this$1.isLoaded) {
            this$1.videoNew = true;
          }
        }
      };
      var playerVars = {
        autoplay: 0,
        controls: 0,
        modestbranding: 1,
        rel: 0,
        showinfo: 0,
        iv_load_policy: 3,
        enablejsapi: 1,
        disablekb: 1
      };

      var tag = document.createElement('script');
      var scriptTags = document.getElementsByTagName('script');
      var scriptTagLast = scriptTags[scriptTags.length - 1];

      tag.src = 'https://www.youtube.com/iframe_api';
      scriptTagLast.parentNode.insertBefore(tag, scriptTagLast.nextSibling);

      window.onYouTubeIframeAPIReady = function () {
        this$1.player = new YT.Player('player', {
          width: width,
          height: height,
          videoId: videoId,
          playerVars: playerVars,
          events: events
        });
      };
    },
    videoSeek: function videoSeek (serverRequest) {
      this.player.seekTo(this.timeCurrent / 1000, serverRequest);
      this.$store.commit('cml/medias/seek', { options: { seekign: false }, uid: this.uid });
    },
    parseYouTubeId: function parseYouTubeId (url) {
      var regex = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
      return url.match(regex) ? RegExp.$2 : url
    }
  },

  beforeDestroy: function beforeDestroy () {
    if (this.player !== null && this.player.destroy) {
      this.player.destroy();
    }

    this.player = null;
  },

  watch: {
    isPlaying: function isPlaying (val) {
      if (val) {
        this.player.playVideo();
      } else {
        this.player.pauseVideo();
      }
    },
    seek: function seek (options) {
      if (options.seeking) {
        this.videoSeek(options.serverRequest);
      }
    },
    viewportWidth: function viewportWidth () {
      var width = this.$refs.container.offsetWidth;
      var height = width * 9 / 16;
      this.player.setSize(width, height);
    },
    media: function media (media$1) {
      if (this.media.url) {
        this.videoLoad(media$1.url);
      }
    }
  }
}

var mediaController = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"mediacontroller"},[_c('div',{staticClass:"mediacontroller-controls clearfix pb-s"},[_c('button',{ref:"button",staticClass:"mediacontroller-button btn",attrs:{"disabled":!_vm.isLoaded},on:{"click":_vm.mediaToggle}},[_vm._v(_vm._s(_vm.playButton))]),_vm._v(" "),_c('div',{ref:"counter",staticClass:"mediacontroller-counter"},[_vm._v(_vm._s(_vm.msToMinutesAndSeconds(_vm.timeCurrent))+" / "+_vm._s(_vm.msToMinutesAndSeconds(_vm.timeTotal))+" ")])]),_vm._v(" "),_c('div',{ref:"progress",staticClass:"mediacontroller-progress",class:{ loaded: _vm.isLoaded },on:{"click":_vm.progressClick,"mousemove":_vm.progressMousemove,"mousedown":_vm.progressMousedown,"mouseup":_vm.progressMouseup}},[_c('div',{staticClass:"pointer-none full-y"},[_c('div',{staticClass:"mediacontroller-progress-bar",style:({ width: _vm.progressBarWidth })})])])])},staticRenderFns: [],
  props: {
    uid: {
      type: String,
      default: 'default'
    }
  },

  data: function data () {
    return {
      mousedown: false
    }
  },

  computed: {
    properties: function properties () {
      return this.$store.state.cml.medias.properties[this.uid] || {}
    },
    timeCurrent: function timeCurrent () {
      return this.properties.timeCurrent || 0
    },
    timeTotal: function timeTotal () {
      return this.properties.timeTotal || 0
    },
    playButton: function playButton () {
      return this.properties.isPlaying && '❚ ❚' || '►'
    },
    isLoaded: function isLoaded () {
      return this.properties.isLoaded || false
    },
    progressBarWidth: function progressBarWidth () {
      return this.timeTotal ? ((this.timeCurrent / this.timeTotal * 100) + "%") : 0
    }
  },

  methods: {
    mediaToggle: function mediaToggle () {
      if (this.properties.isPlaying) {
        this.$store.commit('cml/medias/pause', this.uid);
      } else {
        this.$store.commit('cml/medias/play', this.uid);
      }
    },
    progressClick: function progressClick (e) {
      this.seek(e.offsetX / this.$refs.progress.offsetWidth, true, this.uid);
    },
    progressMousemove: function progressMousemove (e) {
      this.mousedown && this.seek(e.offsetX / this.$refs.progress.offsetWidth, false, this.uid);
    },
    progressMousedown: function progressMousedown () {
      this.mousedown = true;
    },
    progressMouseup: function progressMouseup () {
      this.mousedown = false;
    },
    seek: function seek (ratio, serverRequest, uid) {
      if (this.properties.isLoaded) {
        this.$store.dispatch('cml/medias/seek', { ratio: ratio, serverRequest: serverRequest, uid: uid });
      }
    },
    msToMinutesAndSeconds: function msToMinutesAndSeconds (ms) {
      var minutes = Math.floor(ms / 60000);
      var seconds = ((ms % 60000) / 1000).toFixed(0);
      return minutes + ':' + (seconds < 10 ? '0' : '') + seconds
    }
  }
}

export { app as cmlApp, users$1 as cmlUsers, groups$1 as cmlGroups, corpus$1 as cmlCorpus, medias$1 as cmlMedias, layers$1 as cmlLayers, annotations$1 as cmlAnnotations, mediaYoutube as cmlMediaYoutube, mediaController as cmlMediaController };
