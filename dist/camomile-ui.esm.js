import Vuex, { mapState } from 'vuex';
import Vue from 'vue';
import Camomile from 'camomile-client';
import axios from 'axios';

var config = {
  title: 'Camomile UI',
  user: {
    name: 'root',
    password: 'roO7p4s5wOrD'
  },
  url: 'http://localhost:3000',
  roles: ['admin', 'user'],
  axios: false
};

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
};

var state$1 = {
  svg: {
    height: 0,
    width: 0,
    scale: 1
  },
  viewport: {
    name: '',
    width: window.innerWidth,
    height: window.innerHeight
  },
  animate: false
};

var actions$1 = {
  set: function set (context) {
    context.commit('viewportSet');
    context.commit('svgSet');
  }
};

var mutations$1 = {
  viewportSet: function viewportSet (state) {
    if (window.matchMedia('(min-width: 83.5em)').matches) {
      log.simple('Viewport', 'Large');
      state.viewport.name = 'large';
      state.animate = true;
    } else if (window.matchMedia('(min-width: 63em)').matches) {
      log.simple('Viewport', 'Desktop');
      state.viewport.name = 'desktop';
      state.animate = true;
    } else if (window.matchMedia('(min-width: 42.5em)').matches) {
      log.simple('Viewport', 'Tablet');
      state.viewport.name = 'tablet';
      state.animate = false;
    } else if (window.matchMedia('(min-width: 22em)').matches) {
      log.simple('Viewport', 'Mobile');
      state.viewport.name = 'mobile';
      state.animate = false;
    } else {
      log.simple('Viewport', 'Default');
      state.viewport.name = 'default';
      state.animate = false;
    }
    state.viewport.width = window.innerWidth;
    state.viewport.height = window.innerHeight;
  },
  svgSet: function svgSet (state) {
    state.svg.scale =
      state.viewport.name === 'mobile' || state.viewport.name === 'tablet'
        ? 0.5
        : 1;
    state.svg.height =
      state.viewport.name === 'mobile' || state.viewport.name === 'tablet'
        ? state.viewport.height - 288
        : state.viewport.height - 144;
    state.svg.width =
      state.viewport.name === 'large'
        ? state.viewport.width - 48
        : state.viewport.width - 48;
  }
};

var viewport = {
  namespaced: true,
  state: state$1,
  mutations: mutations$1,
  actions: actions$1
};

var state$2 = {
  list: []
};

var actions$2 = {
  all: function all (ref) {
    var dispatch = ref.dispatch;

    dispatch("cml/set", {}, { root: true }).then(function (r) {
      dispatch('cml/messages/success', 'Synced with server', { root: true });
    });
  }
};

var getters = {
  active: function (state) {
    return state.list.length
  }
};

var mutations$2 = {
  start: function start (state, name) {
    state.list.push(name);
  },

  stop: function stop (state, name) {
    state.list = state.list.filter(function (n) { return n !== name; });
  }
};

var sync = {
  namespaced: true,
  state: state$2,
  actions: actions$2,
  getters: getters,
  mutations: mutations$2
};

var state$3 = {
  visible: false,
  config: {},
  element: {}
};

var mutations$3 = {
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
  mutations: mutations$3
};

var state$4 = {
  visible: false,
  config: {}
};

var mutations$4 = {
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
  mutations: mutations$4
};

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

var mutations$5 = {
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
  mutations: mutations$5
};

var camomile = function (url) {
  var api = axios.create({
    baseURL: url,
    withCredentials: true
  });

  var _opt = function (n, id) {
    return id ? (n + "/" + id) : n
  };

  var _user = function (id) { return _opt('user', id); };
  var _get = function (uri) { return api
      .get(uri)
      .then(function (r) { return r.data; })
      .catch(function (e) {
        console.log('get error: ', uri, e);
        throw e
      }); };

  var _post = function (uri, data) { return api
      .post(uri, data)
      .then(function (r) { return r.data; })
      .catch(function (e) {
        console.log('post error: ', uri, e);
        throw e
      }); };

  var _put = function (uri, data) { return api
      .put(uri, data)
      .then(function (r) { return r.data; })
      .catch(function (e) {
        console.log('post error: ', uri, e);
        throw e
      }); };

  return {
    // User
    login: function login (name, password) {
      return _post('login', {
        username: name,
        password: password
      })
    },
    logout: function logout () {
      return _post('logout')
    },
    me: function me () {
      return _get('me')
    },
    updatePassword: function updatePassword (password) {
      return _put('me', {
        password: password
      })
    },
    createUser: function createUser (
      name,
      password,
      description,
      role,
      ref
    ) {
      if ( description === void 0 ) description = {};
      if ( role === void 0 ) role = 'user';
      if ( ref === void 0 ) ref = {};
      var returns_id = ref.returns_id;

      return _post('user', { name: name, password: password, description: description, role: role })
    },
    updateUser: function updateUser (id, fields) {
      if ( fields === void 0 ) fields = {};

      return _put(_user(id), fields)
    },
    getUsers: function getUsers (ref) {
      if ( ref === void 0 ) ref = {};
      var returns_id = ref.returns_id;
      var ref_filter = ref.filter; if ( ref_filter === void 0 ) ref_filter = {};
      var ref_filter$1 = ref_filter;
      var username = ref_filter$1.username;
      var role = ref_filter$1.role;

      return _get('user', { username: username, role: role }).then(function (r) { return console.log('getUsers', r, returns_id); }
      )
    }
  }
};

// import Camomile from '../../../camomile-client-javascript' /* debug with local version */
var api = (config.axios ? camomile(config.url) : new Camomile(config.url));

var state$6 = {
  id: '',
  name: '',
  role: '',
  description: '',
  groupIds: [],
  isLogged: false,
  isAdmin: false,
  isRoot: false
};

var actions$4 = {
  login: function login (ref, config) {
    var commit = ref.commit;
    var dispatch = ref.dispatch;

    commit('cml/sync/start', 'userLogin', { root: true });
    return api
      .login(config.user.name, config.user.password)
      .then(function (r) {
        commit('cml/sync/stop', 'userLogin', { root: true });
        commit('cml/popup/close', null, { root: true });
        dispatch('set');

        return r.message
      })
      .catch(function (e) {
        commit('cml/sync/stop', 'userLogin', { root: true });
        var error = e.response ? e.response.body.error : 'Network error';
        dispatch('cml/messages/error', error, { root: true });
        dispatch('cml/reset', null, { root: true });

        throw error
      })
  },

  set: function set (ref) {
    var commit = ref.commit;
    var dispatch = ref.dispatch;

    commit('cml/sync/start', 'userSet', { root: true });
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
        commit('cml/sync/stop', 'userSet', { root: true });
        commit('set', user);
        dispatch('cml/set', null, { root: true });

        return user
      })
      .catch(function (e) {
        commit('cml/sync/stop', 'userSet', { root: true });
        var error = e.response ? e.response.body.error : 'Network error';
        dispatch('cml/messages/error', error, { root: true });
        dispatch('cml/reset', null, { root: true });

        throw error
      })
  },

  logout: function logout (ref) {
    var state = ref.state;
    var commit = ref.commit;
    var dispatch = ref.dispatch;

    commit('cml/sync/start', 'userLogout', { root: true });
    return api
      .logout()
      .then(function (r) {
        commit('cml/sync/stop', 'userLogout', { root: true });
        dispatch('cml/reset', null, { root: true });
        commit('cml/popup/close', null, { root: true });
        commit('cml/dropdown/close', null, { root: true });

        return r.message
      })
      .catch(function (e) {
        commit('cml/sync/stop', 'userLogout', { root: true });
        var error = e.response ? e.response.body.error : 'Network error';
        dispatch('cml/messages/error', error, { root: true });
        dispatch('cml/reset', null, { root: true });

        throw error
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

var mutations$6 = {
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
    state.description = '';
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
  mutations: mutations$6
};

var obj;
var state$7 = {
  list: []
};

var actions$5 = {
  add: function add (ref, user) {
    var commit = ref.commit;
    var dispatch = ref.dispatch;

    commit('cml/sync/start', 'usersAdd', { root: true });
    return api
      .createUser(user.name, user.password, user.description, user.role)
      .then(function (r) {
        commit('cml/sync/stop', 'usersAdd', { root: true });
        var user = userFormat(r.data);
        commit('add', user);
        commit('cml/corpus/userAdd', user.id, { root: true });
        dispatch('cml/messages/success', 'User added', { root: true });

        return user
      })
      .catch(function (e) {
        commit('cml/sync/stop', 'usersAdd', { root: true });
        var error = e.response ? e.response.body.error : 'Network error';
        dispatch('cml/messages/error', error, { root: true });

        throw error
      })
  },

  update: function update (ref, user) {
    var commit = ref.commit;
    var dispatch = ref.dispatch;
    var rootState = ref.rootState;

    commit('cml/sync/start', 'usersUpdate', { root: true });
    return api
      .updateUser(user.id, {
        password: user.password,
        role: user.role,
        description: user.description
      })
      .then(function (r) {
        commit('cml/sync/stop', 'usersUpdate', { root: true });
        var user = userFormat(r.data);
        commit('update', user);
        if (user.name === rootState.cml.user.name) {
          commit('cml/user/set', user, { root: true });
        }
        dispatch('cml/messages/success', 'User updated', { root: true });

        return user
      })
      .catch(function (e) {
        commit('cml/sync/stop', 'usersUpdate', { root: true });
        var error = e.response ? e.response.body.error : 'Network error';
        dispatch('cml/messages/error', error, { root: true });

        throw error
      })
  },

  remove: function remove (ref, user) {
    var commit = ref.commit;
    var dispatch = ref.dispatch;

    commit('cml/sync/start', 'usersRemove', { root: true });
    return api
      .deleteUser(user.id)
      .then(function (r) {
        commit('cml/sync/stop', 'usersRemove', { root: true });
        commit('remove', user.id);
        commit('cml/corpus/userRemove', user.id, { root: true });
        dispatch('cml/messages/success', 'User removed', { root: true });

        return user.id
      })
      .catch(function (e) {
        commit('cml/sync/stop', 'usersRemove', { root: true });
        var error = e.response ? e.response.body.error : 'Network error';
        dispatch('cml/messages/error', error, { root: true });

        throw error
      })
  },

  list: function list (ref) {
    var commit = ref.commit;
    var dispatch = ref.dispatch;

    commit('cml/sync/start', 'usersList', { root: true });
    return api
      .getUsers()
      .then(function (r) {
        commit('cml/sync/stop', 'usersList', { root: true });
        var users = r.data.map(function (user) { return userFormat(user); });
        commit('list', users);

        return users
      })
      .catch(function (e) {
        commit('cml/sync/stop', 'usersList', { root: true });
        var error = e.response ? e.response.body.error : 'Network error';
        dispatch('cml/messages/error', error, { root: true });

        throw error
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

var mutations$7 = {
  reset: function reset (state) {
    state.list = [];
  },

  add: function add (state, user) {
    state.list.push(user);
  },

  update: function update (state, user) {
    Object.assign(state.list.find(function (u) { return u.id === user.id; }), user);
  },

  remove: function remove (state, userId) {
    state.list = state.list.filter(function (u) { return u.id !== userId; });
  },

  list: function list (state, users) {
    state.list = users;
  }
};

var users = {
  namespaced: true,
  state: state$7,
  actions: actions$5,
  getters: getters$2,
  mutations: mutations$7
};

var obj$1;
var state$8 = {
  list: []
};

var actions$6 = {
  add: function add (ref, group) {
    var commit = ref.commit;
    var dispatch = ref.dispatch;
    var state = ref.state;
    var rootState = ref.rootState;

    commit('cml/sync/start', 'groupsAdd', { root: true });
    return api
      .createGroup(group.name, group.description)
      .then(function (r) {
        commit('cml/sync/stop', 'groupsAdd', { root: true });
        var group = groupFormat(r.data);
        commit('add', group);
        commit('cml/corpus/groupAdd', group.id, { root: true });
        dispatch('cml/messages/success', 'Group added', { root: true });

        return group
      })
      .catch(function (e) {
        commit('cml/sync/stop', 'groupsAdd', { root: true });
        var error = e.response ? e.response.body.error : 'Network error';
        dispatch('cml/messages/error', error, { root: true });

        throw error
      })
  },

  remove: function remove (ref, group) {
    var commit = ref.commit;
    var dispatch = ref.dispatch;
    var state = ref.state;
    var rootState = ref.rootState;

    commit('cml/sync/start', 'groupsRemove', { root: true });
    return api
      .deleteGroup(group.id)
      .then(function (r) {
        commit('cml/sync/stop', 'groupsRemove', { root: true });
        commit('remove', group.id);
        commit('cml/corpus/groupRemove', group.id, { root: true });
        dispatch('cml/messages/success', 'Group removed', { root: true });

        return group.id
      })
      .catch(function (e) {
        commit('cml/sync/stop', 'groupsRemove', { root: true });
        var error = e.response ? e.response.body.error : 'Network error';
        dispatch('cml/messages/error', error, { root: true });

        throw error
      })
  },

  update: function update (ref, group) {
    var commit = ref.commit;
    var dispatch = ref.dispatch;
    var state = ref.state;
    var rootState = ref.rootState;

    commit('cml/sync/start', 'groupsUpdate', { root: true });
    return api
      .updateGroup(group.id, { description: group.description })
      .then(function (r) {
        commit('cml/sync/stop', 'groupsUpdate', { root: true });
        var group = groupFormat(r.data);
        commit('update', group);
        dispatch('cml/messages/success', 'Group updated', { root: true });

        return group
      })
      .catch(function (e) {
        commit('cml/sync/stop', 'groupsUpdate', { root: true });
        var error = e.response ? e.response.body.error : 'Network error';
        dispatch('cml/messages/error', error, { root: true });

        throw error
      })
  },

  list: function list (ref) {
    var commit = ref.commit;
    var dispatch = ref.dispatch;
    var state = ref.state;
    var rootState = ref.rootState;

    commit('cml/sync/start', 'groupsList', { root: true });
    return api
      .getGroups()
      .then(function (r) {
        commit('cml/sync/stop', 'groupsList', { root: true });
        var groups = r.data.map(function (group) { return groupFormat(group); });
        commit('list', groups);

        return groups
      })
      .catch(function (e) {
        commit('cml/sync/stop', 'groupsList', { root: true });
        var error = e.response ? e.response.body.error : 'Network error';
        dispatch('cml/messages/error', error, { root: true });

        throw error
      })
  },

  userAdd: function userAdd (ref, ref$1) {
    var commit = ref.commit;
    var dispatch = ref.dispatch;
    var state = ref.state;
    var rootState = ref.rootState;
    var userId = ref$1.userId;
    var group = ref$1.group;

    commit('cml/sync/start', 'groupsUserAdd', { root: true });
    return api
      .addUserToGroup(userId, group.id)
      .then(function (r) {
        commit('cml/sync/stop', 'groupsUserAdd', { root: true });
        var group = groupFormat(r.data);
        commit('update', group);
        dispatch('cml/messages/success', 'User added to group', {
          root: true
        });
        if (userId === rootState.cml.user.id) {
          commit('cml/user/groupAdd', group.id, { root: true });
          dispatch('cml/corpus/list', null, {
            root: true
          });
        }

        return group
      })
      .catch(function (e) {
        commit('cml/sync/stop', 'groupsUserAdd', { root: true });
        var error = e.response ? e.response.body.error : 'Network error';
        dispatch('cml/messages/error', error, { root: true });

        throw error
      })
  },

  userRemove: function userRemove (ref, ref$1) {
    var commit = ref.commit;
    var dispatch = ref.dispatch;
    var state = ref.state;
    var rootState = ref.rootState;
    var userId = ref$1.userId;
    var group = ref$1.group;

    commit('cml/sync/start', 'groupsUserRemove', { root: true });
    return api
      .removeUserFromGroup(userId, group.id)
      .then(function (r) {
        commit('cml/sync/stop', 'groupsUserRemove', { root: true });
        var group = groupFormat(r.data);
        commit('update', group);
        dispatch('cml/messages/success', 'User removed from group', {
          root: true
        });
        if (userId === rootState.cml.user.id) {
          commit('cml/user/groupRemove', group.id, { root: true });
          dispatch('cml/corpus/list', null, {
            root: true
          });
        }

        return group
      })
      .catch(function (e) {
        commit('cml/sync/stop', 'groupsUserRemove', { root: true });
        var error = e.response ? e.response.body.error : 'Network error';
        dispatch('cml/messages/error', error, { root: true });

        throw error
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

var mutations$8 = {
  reset: function reset (state) {
    state.list = [];
  },

  add: function add (state, group) {
    state.list.push(group);
  },

  update: function update (state, group) {
    Object.assign(state.list.find(function (g) { return g.id === group.id; }), group);
  },

  remove: function remove (state, groupId) {
    state.list = state.list.filter(function (g) { return g.id !== groupId; });
  },

  list: function list (state, groups) {
    state.list = groups;
  }
};

var groups = {
  namespaced: true,
  state: state$8,
  actions: actions$6,
  getters: getters$3,
  mutations: mutations$8
};

var state$9 = {
  list: [],
  id: ''
};

var actions$7 = {
  add: function add (ref, corpus) {
    var commit = ref.commit;
    var dispatch = ref.dispatch;
    var rootState = ref.rootState;
    var rootGetters = ref.rootGetters;

    commit('cml/sync/start', 'corpusAdd', { root: true });
    return api
      .createCorpus(corpus.name, corpus.description, {})
      .then(function (r) {
        commit('cml/sync/stop', 'corpusAdd', { root: true });
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

        commit('add', corpu);
        dispatch('cml/messages/success', 'Corpus added', { root: true });
        dispatch('set', corpu.id);

        return corpu
      })
      .catch(function (e) {
        commit('cml/sync/stop', 'corpusAdd', { root: true });
        var error = e.response ? e.response.body.error : 'Network error';
        dispatch('cml/messages/error', error, { root: true });

        throw error
      })
  },

  remove: function remove (ref, corpu) {
    var commit = ref.commit;
    var dispatch = ref.dispatch;
    var state = ref.state;

    commit('cml/sync/start', 'corpusRemove', { root: true });
    return api
      .deleteCorpus(corpu.id)
      .then(function (r) {
        commit('cml/sync/stop', 'corpusRemove', { root: true });
        commit('remove', corpu.id);
        dispatch('cml/messages/success', 'Corpus removed', { root: true });
        if (state.id === corpu.id) {
          dispatch('set');
        }

        return corpu.id
      })
      .catch(function (e) {
        commit('cml/sync/stop', 'corpusRemove', { root: true });
        var error = e.response ? e.response.body.error : 'Network error';
        dispatch('cml/messages/error', error, { root: true });

        throw error
      })
  },

  update: function update (ref, corpu) {
    var commit = ref.commit;
    var dispatch = ref.dispatch;
    var state = ref.state;

    commit('cml/sync/start', 'corpusUpdate', { root: true });
    return api
      .updateCorpus(corpu.id, {
        name: corpu.name,
        description: corpu.description
      })
      .then(function (r) {
        commit('cml/sync/stop', 'corpusUpdate', { root: true });
        corpu.name = r.data.name;
        corpu.description = r.data.description || {};
        commit('update', corpu);
        dispatch('cml/messages/success', 'Corpus updated', { root: true });

        return r
      })
      .catch(function (e) {
        commit('cml/sync/stop', 'corpusUpdate', { root: true });
        var error = e.response ? e.response.body.error : 'Network error';
        dispatch('cml/messages/error', error, { root: true });

        throw error
      })
  },

  list: function list (ref) {
    var commit = ref.commit;
    var dispatch = ref.dispatch;
    var rootGetters = ref.rootGetters;

    commit('cml/sync/start', 'corpusList', { root: true });
    return api
      .getCorpora()
      .then(function (r) {
        commit('cml/sync/stop', 'corpusList', { root: true });
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
        commit('list', corpus);
        dispatch('set');

        return corpus
      })
      .catch(function (e) {
        commit('cml/sync/stop', 'corpusList', { root: true });
        var error = e.response ? e.response.body.error : 'Network error';
        dispatch('cml/messages/error', error, { root: true });

        throw error
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

    commit('cml/sync/start', 'corpusGroupPermissionSet', { root: true });
    return api
      .setCorpusPermissionsForGroup(corpuId, groupId, permission)
      .then(function (p) {
        var permissions = p.data;
        commit('cml/sync/stop', 'corpusGroupPermissionSet', { root: true });
        commit('groupPermissionsUpdate', {
          corpuId: corpuId,
          groupId: groupId,
          permission: (permissions.groups && permissions.groups[groupId]) || 0
        });
        dispatch('cml/messages/success', 'Group permissions updated', {
          root: true
        });

        if (
          rootGetters['cml/user/isInGroup'](groupId) &&
          !rootGetters['cml/user/isAdmin'](permissions)
        ) {
          dispatch('list');
          commit("cml/popup/close", null, { root: true });
        }

        return permissions
      })
      .catch(function (e) {
        commit('cml/sync/stop', 'corpusGroupPermissionSet', { root: true });
        var error = e.response ? e.response.body.error : 'Network error';
        dispatch('cml/messages/error', error, { root: true });

        throw error
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

    commit('cml/sync/start', 'corpusGroupPermissionRemove', { root: true });
    return api
      .removeCorpusPermissionsForGroup(corpuId, groupId)
      .then(function (p) {
        var permissions = p.data;
        commit('cml/sync/stop', 'corpusGroupPermissionRemove', {
          root: true
        });
        commit('groupPermissionsUpdate', { corpuId: corpuId, groupId: groupId, permission: 0 });
        dispatch('cml/messages/success', 'Group permissions updated', {
          root: true
        });

        if (
          rootGetters['cml/user/isInGroup'](groupId) &&
          !rootGetters['cml/user/isAdmin'](permissions)
        ) {
          dispatch('list');
          commit("cml/popup/close", null, { root: true });
        }

        return permissions
      })
      .catch(function (e) {
        commit('cml/sync/stop', 'corpusGroupPermissionRemove', {
          root: true
        });
        var error = e.response ? e.response.body.error : 'Network error';
        dispatch('cml/messages/error', error, { root: true });

        throw error
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

    commit('cml/sync/start', 'corpusUserPermissionSet', { root: true });
    return api
      .setCorpusPermissionsForUser(corpuId, userId, permission)
      .then(function (p) {
        var permissions = p.data;
        commit('cml/sync/stop', 'corpusUserPermissionSet', { root: true });
        commit('userPermissionsUpdate', {
          corpuId: corpuId,
          userId: userId,
          permission: (permissions.users && permissions.users[userId]) || 0
        });
        dispatch('cml/messages/success', 'User permissions updated', {
          root: true
        });
        if (
          rootGetters['cml/user/isCurrentUser'](userId) &&
          !rootGetters['cml/user/isAdmin'](permissions)
        ) {
          dispatch('list');
          commit("cml/popup/close", null, { root: true });
        }

        return permissions
      })
      .catch(function (e) {
        commit('cml/sync/stop', 'corpusUserPermissionSet', { root: true });
        var error = e.response ? e.response.body.error : 'Network error';
        dispatch('cml/messages/error', error, { root: true });

        throw error
      })
  },

  userPermissionRemove: function userPermissionRemove (ref, ref$1) {
    var commit = ref.commit;
    var dispatch = ref.dispatch;
    var rootGetters = ref.rootGetters;
    var corpuId = ref$1.corpuId;
    var userId = ref$1.userId;

    commit('cml/sync/start', 'corpusUserPermissionRemove', { root: true });
    return api
      .removeCorpusPermissionsForUser(corpuId, userId)
      .then(function (p) {
        var permissions = p.data;
        commit('cml/sync/stop', 'corpusUserPermissionRemove', { root: true });
        commit('userPermissionsUpdate', { corpuId: corpuId, userId: userId, permission: 0 });
        dispatch('cml/messages/success', 'User permissions updated', {
          root: true
        });
        if (
          rootGetters['cml/user/isCurrentUser'](userId) &&
          !rootGetters['cml/user/isAdmin'](permissions)
        ) {
          dispatch('list');
          commit("cml/popup/close", null, { root: true });
        }

        return permissions
      })
      .catch(function (e) {
        commit('cml/sync/stop', 'corpusUserPermissionRemove', {
          root: true
        });
        var error = e.response ? e.response.body.error : 'Network error';
        dispatch('cml/messages/error', error, { root: true });

        throw error
      })
  },

  set: function set (ref, corpuId) {
    var state = ref.state;
    var getters = ref.getters;
    var dispatch = ref.dispatch;
    var commit = ref.commit;

    commit('set', getters.id(corpuId));
    if (state.id) {
      dispatch('cml/medias/list', state.id, { root: true });
      dispatch('cml/layers/list', state.id, { root: true });
    } else {
      commit('cml/medias/reset', null, { root: true });
      commit('cml/layers/reset', null, { root: true });
    }
  }
};

var getters$4 = {
  id: function (state) { return function (id) {
    return (
      id ||
      (state.list.map(function (c) { return c.id; }).indexOf(state.id) !== -1 && state.id) ||
      (state.list[0] && state.list[0].id) ||
      null
    )
  }; }
};

var mutations$9 = {
  reset: function reset (state) {
    state.list = [];
  },

  add: function add (state, corpu) {
    var corpuExisting = state.list.find(function (c) { return c.id === corpu.id; });
    if (!corpuExisting) {
      state.list.push(corpu);
    }
  },

  update: function update (state, corpu) {
    Object.assign(state.list.find(function (c) { return c.id === corpu.id; }), corpu);
  },

  remove: function remove (state, corpuId) {
    state.list = state.list.filter(function (c) { return c.id !== corpuId; });
  },

  list: function list (state, corpus) {
    state.list = corpus;
  },

  set: function set (state, corpuId) {
    state.id = corpuId;
  },

  groupAdd: function groupAdd (state, groupId) {
    state.list.forEach(function (corpu) {
      Vue.set(corpu.permissions.groups, groupId, 0);
    });
  },

  groupRemove: function groupRemove (state, groupId) {
    state.list.forEach(function (corpu) {
      delete corpu.permissions.groups[groupId];
    });
  },

  userAdd: function userAdd (state, userId) {
    state.list.forEach(function (corpu) {
      Vue.set(corpu.permissions.users, userId, 0);
    });
  },

  userRemove: function userRemove (state, userId) {
    state.list.forEach(function (corpu) {
      delete corpu.permissions.users[userId];
    });
  },

  groupPermissionsUpdate: function groupPermissionsUpdate (state, ref) {
    var corpuId = ref.corpuId;
    var groupId = ref.groupId;
    var permission = ref.permission;

    var corpu = state.list.find(function (c) { return c.id === corpuId; });
    corpu.permissions.groups[groupId] = permission;
  },

  userPermissionsUpdate: function userPermissionsUpdate (state, ref) {
    var corpuId = ref.corpuId;
    var userId = ref.userId;
    var permission = ref.permission;

    var corpu = state.list.find(function (c) { return c.id === corpuId; });
    corpu.permissions.users[userId] = permission;
  }

  // corpuPermissionsUpdate (state, { corpu, permission }) {
  //   corpu.permission = permission
  // }
};

var corpus = {
  namespaced: true,
  state: state$9,
  actions: actions$7,
  getters: getters$4,
  mutations: mutations$9
};

var state$10 = {
  list: [],
  id: null
};

var actions$8 = {
  add: function add (ref, ref$1) {
    var commit = ref.commit;
    var dispatch = ref.dispatch;
    var corpuId = ref$1.corpuId;
    var name = ref$1.name;
    var url = ref$1.url;
    var description = ref$1.description;

    commit('cml/sync/start', 'mediasAdd', { root: true });
    return api
      .createMedium(corpuId, name, url, description)
      .then(function (r) {
        commit('cml/sync/stop', 'mediasAdd', { root: true });
        var media = mediaFormat(r.data);
        commit('add', media);
        dispatch('cml/messages/success', 'Medium added', { root: true });
        dispatch('set', media.id);

        return media
      })
      .catch(function (e) {
        commit('cml/sync/stop', 'mediasAdd', { root: true });
        var error = e.response ? e.response.body.error : 'Network error';
        dispatch('cml/messages/error', error, { root: true });

        throw error
      })
  },

  remove: function remove (ref, media) {
    var commit = ref.commit;
    var dispatch = ref.dispatch;
    var rootGetters = ref.rootGetters;

    commit('cml/sync/start', 'mediasRemove', { root: true });
    return api
      .deleteMedium(media.id)
      .then(function (r) {
        commit('cml/sync/stop', 'mediasRemove', { root: true });
        commit('remove', media);
        dispatch('cml/annotations/list', rootGetters['cml/layers/id'](), {
          root: true
        });
        dispatch('cml/messages/success', 'Medium removed', { root: true });

        return media.id
      })
      .catch(function (e) {
        var error = e.response ? e.response.body.error : 'Network error';
        dispatch('cml/messages/error', error, { root: true });

        throw error
      })
  },

  update: function update (ref, media) {
    var commit = ref.commit;
    var dispatch = ref.dispatch;
    var state = ref.state;
    var rootState = ref.rootState;

    commit('cml/sync/start', 'mediasUpdate', { root: true });
    return api
      .updateMedium(media.id, {
        name: media.name,
        description: media.description,
        url: media.url
      })
      .then(function (r) {
        commit('cml/sync/stop', 'mediasUpdate', { root: true });
        media.name = r.data.name;
        media.url = r.data.url;
        media.description = r.data.description || {};
        commit('update', media);
        dispatch('cml/messages/success', 'Medium updated', { root: true });

        return media
      })
      .catch(function (e) {
        var error = e.response ? e.response.body.error : 'Network error';
        dispatch('cml/messages/error', error, { root: true });

        throw error
      })
  },

  list: function list (ref, corpuId) {
    var dispatch = ref.dispatch;
    var commit = ref.commit;

    commit('cml/sync/start', 'mediasList', { root: true });
    return api
      .getMedia({ filter: { id_corpus: corpuId } })
      .then(function (r) {
        commit('cml/sync/stop', 'mediasList', { root: true });
        var medias = r.data.map(function (media) {
          return mediaFormat(media)
        });
        commit('list', medias);
        dispatch('set');

        return medias
      })
      .catch(function (e) {
        commit('cml/sync/stop', 'mediasList', { root: true });
        var error = e.response ? e.response.body.error : 'Network error';
        dispatch('cml/messages/error', error, { root: true });

        throw error
      })
  },

  set: function set (ref, mediaId) {
    var getters = ref.getters;
    var commit = ref.commit;

    commit('set', getters.id(mediaId));
  }
};

var getters$5 = {
  id: function (state) { return function (id) { return id ||
    (state.list.map(function (c) { return c.id; }).indexOf(state.id) !== -1 && state.id) ||
    (state.list[0] && state.list[0].id) ||
    null; }; }
};

var mutations$10 = {
  reset: function reset (state) {
    state.list = [];
  },

  add: function add (state, media) {
    var mediaExisting = state.list.find(function (c) { return c.id === media.id; });
    if (!mediaExisting) {
      state.list.push(media);
    }
  },

  update: function update (state, media) {
    Object.assign(state.list.find(function (c) { return c.id === media.id; }), media);
  },

  remove: function remove (state, media) {
    var index = state.list.findIndex(function (c) { return c.id === media.id; });
    if (index !== -1) {
      state.list.splice(index, 1);
    }
  },

  list: function list (state, medias) {
    state.list = medias;
  },

  set: function set (state, id) {
    state.id = id;
  }
};

var medias = {
  namespaced: true,
  state: state$10,
  actions: actions$8,
  getters: getters$5,
  mutations: mutations$10
};

var state$11 = {
  list: [],
  id: null
};

var actions$9 = {
  add: function add (
    ref,
    ref$1
  ) {
    var commit = ref.commit;
    var dispatch = ref.dispatch;
    var rootState = ref.rootState;
    var rootGetters = ref.rootGetters;
    var corpuId = ref$1.corpuId;
    var name = ref$1.name;
    var description = ref$1.description;
    var fragmentType = ref$1.fragmentType;
    var metadataType = ref$1.metadataType;
    var annotations = ref$1.annotations;

    commit('cml/sync/start', 'layersAdd', { root: true });
    return api
      .createLayer(
        corpuId,
        name,
        description,
        fragmentType,
        metadataType,
        annotations
      )
      .then(function (r) {
        commit('cml/sync/stop', 'layersAdd', { root: true });
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

        commit('add', layer);
        dispatch('cml/messages/success', 'Layer added', { root: true });
        dispatch('set', layer.id);

        return layer
      })
      .catch(function (e) {
        commit('cml/sync/stop', 'layersAdd', { root: true });
        var error = e.response ? e.response.body.error : 'Network error';
        dispatch('cml/messages/error', error, { root: true });

        throw error
      })
  },

  remove: function remove (ref, layer) {
    var commit = ref.commit;
    var dispatch = ref.dispatch;
    var state = ref.state;
    var rootState = ref.rootState;

    commit('cml/sync/start', 'layersRemove', { root: true });
    return api
      .deleteLayer(layer.id)
      .then(function (r) {
        commit('cml/sync/stop', 'layersRemove', { root: true });
        commit('remove', layer);
        dispatch('cml/messages/success', 'Layer removed', { root: true });

        return r
      })
      .catch(function (e) {
        commit('cml/sync/stop', 'layersRemove', { root: true });
        var error = e.response ? e.response.body.error : 'Network error';
        dispatch('cml/messages/error', error, { root: true });

        throw error
      })
  },

  update: function update (ref, layer) {
    var commit = ref.commit;
    var dispatch = ref.dispatch;
    var state = ref.state;
    var rootState = ref.rootState;

    commit('cml/sync/start', 'layersUpdate', { root: true });
    return api
      .updateLayer(layer.id, {
        name: layer.name,
        description: layer.description,
        fragment_type: layer.fragmentType,
        data_type: layer.metadataType
      })
      .then(function (r) {
        commit('cml/sync/stop', 'layersUpdate', { root: true });
        layer.description = r.data.description || {};
        layer.fragmentType = r.data.fragment_type || {};
        layer.metadataType = r.data.data_type || {};
        commit('update', layer);
        dispatch('cml/messages/success', 'Layer updated', { root: true });

        return r
      })
      .catch(function (e) {
        commit('cml/sync/stop', 'layersUpdate', { root: true });
        var error = e.response ? e.response.body.error : 'Network error';
        dispatch('cml/messages/error', error, { root: true });

        throw error
      })
  },

  list: function list (ref, corpuId) {
    var dispatch = ref.dispatch;
    var commit = ref.commit;
    var rootGetters = ref.rootGetters;

    commit('cml/sync/start', 'layersList', { root: true });
    return api
      .getLayers({ filter: { id_corpus: corpuId } })
      .then(function (r) {
        commit('cml/sync/stop', 'layersList', { root: true });
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
        commit('list', layers);
        dispatch('set');

        return layers
      })
      .catch(function (e) {
        commit('cml/sync/stop', 'layersList', { root: true });

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

    commit('cml/sync/start', 'layersGroupPermissionSet', { root: true });
    return api
      .setLayerPermissionsForGroup(layerId, groupId, permission)
      .then(function (p) {
        var permissions = p.data;
        commit('cml/sync/stop', 'layersGroupPermissionSet', { root: true });
        commit('groupPermissionsUpdate', {
          layerId: layerId,
          groupId: groupId,
          permission: (permissions.groups && permissions.groups[groupId]) || 0
        });
        dispatch('cml/messages/success', 'Group permissions updated', {
          root: true
        });

        if (
          rootGetters['cml/user/isInGroup'](groupId) &&
          !rootGetters['cml/user/isAdmin'](permissions)
        ) {
          dispatch('list', rootState.cml.corpus.id);
          commit('cml/popup/close', null, { root: true });
        }

        return permissions
      })
      .catch(function (e) {
        commit('cml/sync/stop', 'layersGroupPermissionSet', { root: true });
        var error = e.response ? e.response.body.error : 'Network error';
        dispatch('cml/messages/error', error, { root: true });

        throw error
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

    commit('cml/sync/start', 'layersGroupPermissionRemove', { root: true });
    return api
      .removeLayerPermissionsForGroup(layerId, groupId)
      .then(function (p) {
        var permissions = p.data;
        commit('cml/sync/stop', 'layersGroupPermissionRemove', {
          root: true
        });
        commit('groupPermissionsUpdate', { layerId: layerId, groupId: groupId, permission: 0 });
        dispatch('cml/messages/success', 'Group permissions updated', {
          root: true
        });

        if (
          rootGetters['cml/user/isInGroup'](groupId) &&
          !rootGetters['cml/user/isAdmin'](permissions)
        ) {
          dispatch('list', rootState.cml.corpus.id);
          commit('cml/popup/close', null, { root: true });
        }

        return permissions
      })
      .catch(function (e) {
        commit('cml/sync/stop', 'layersGroupPermissionRemove', {
          root: true
        });
        var error = e.response ? e.response.body.error : 'Network error';
        dispatch('cml/messages/error', error, { root: true });

        throw error
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

    commit('cml/sync/start', 'layersUserPermissionSet', { root: true });
    return api
      .setLayerPermissionsForUser(layerId, userId, permission)
      .then(function (p) {
        var permissions = p.data;
        commit('cml/sync/stop', 'layersUserPermissionSet', { root: true });
        commit('userPermissionsUpdate', {
          layerId: layerId,
          userId: userId,
          permission: (permissions.users && permissions.users[userId]) || 0
        });
        dispatch('cml/messages/success', 'User permissions updated', {
          root: true
        });

        if (
          rootGetters['cml/user/isCurrentUser'](userId) &&
          !rootGetters['cml/user/isAdmin'](permissions)
        ) {
          dispatch('list', rootState.cml.corpus.id);
          commit('cml/popup/close', null, { root: true });
        }

        return permissions
      })
      .catch(function (e) {
        commit('cml/sync/stop', 'layersUserPermissionSet', { root: true });
        var error = e.response ? e.response.body.error : 'Network error';
        dispatch('cml/messages/error', error, { root: true });

        throw error
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

    commit('cml/sync/start', 'layersUserPermissionRemove', { root: true });
    return api
      .removeLayerPermissionsForUser(layerId, userId)
      .then(function (p) {
        var permissions = p.data;
        commit('cml/sync/stop', 'layersUserPermissionRemove', {
          root: true
        });
        commit('userPermissionsUpdate', {
          layerId: layerId,
          userId: userId,
          permission: 0
        });
        dispatch('cml/messages/success', 'User permissions updated', {
          root: true
        });
        if (
          rootGetters['cml/user/isCurrentUser'](userId) &&
          !rootGetters['cml/user/isAdmin'](permissions)
        ) {
          dispatch('list', rootState.cml.corpus.id);
          commit('cml/popup/close', null, { root: true });
        }

        return permissions
      })
      .catch(function (e) {
        commit('cml/sync/stop', 'layersUserPermissionRemove', {
          root: true
        });
        var error = e.response ? e.response.body.error : 'Network error';
        dispatch('cml/messages/error', error, { root: true });

        throw error
      })
  },

  set: function set (ref, layerId) {
    var state = ref.state;
    var getters = ref.getters;
    var dispatch = ref.dispatch;
    var commit = ref.commit;

    commit('set', getters.id(layerId));
    if (state.id) {
      dispatch('cml/annotations/list', state.id, { root: true });
    } else {
      commit('cml/annotations/reset', null, { root: true });
    }
  }
};

var getters$6 = {
  id: function (state) { return function (id) { return id ||
    (state.list.map(function (c) { return c.id; }).indexOf(state.id) !== -1 && state.id) ||
    (state.list[0] && state.list[0].id) ||
    null; }; }
};

var mutations$11 = {
  reset: function reset (state) {
    state.list = [];
  },

  add: function add (state, layer) {
    var layerExisting = state.list.find(function (c) { return c.id === layer.id; });
    if (!layerExisting) {
      state.list.push(layer);
    }
  },

  update: function update (state, layer) {
    Object.assign(state.list.find(function (c) { return c.id === layer.id; }), layer);
  },

  remove: function remove (state, layer) {
    var index = state.list.findIndex(function (c) { return c.id === layer.id; });
    if (index !== -1) {
      state.list.splice(index, 1);
    }
  },

  list: function list (state, layers) {
    state.list = layers;
  },

  set: function set (state, id) {
    state.id = id;
  },

  groupPermissionsUpdate: function groupPermissionsUpdate (state, ref) {
    var layerId = ref.layerId;
    var groupId = ref.groupId;
    var permission = ref.permission;

    var layer = state.list.find(function (c) { return c.id === layerId; });
    layer.permissions.groups[groupId] = permission;
  },

  userPermissionsUpdate: function userPermissionsUpdate (state, ref) {
    var layerId = ref.layerId;
    var userId = ref.userId;
    var permission = ref.permission;

    var layer = state.list.find(function (c) { return c.id === layerId; });
    layer.permissions.users[userId] = permission;
  },

  layerPermissionsUpdate: function layerPermissionsUpdate (state, ref) {
    var layer = ref.layer;
    var permission = ref.permission;

    layer.permission = permission;
  }
};

var layers = {
  namespaced: true,
  state: state$11,
  actions: actions$9,
  getters: getters$6,
  mutations: mutations$11
};

var state$12 = {
  list: [],
  id: null
};

var actions$10 = {
  add: function add (ref, ref$1) {
    var commit = ref.commit;
    var dispatch = ref.dispatch;
    var layerId = ref$1.layerId;
    var mediaId = ref$1.mediaId;
    var fragment = ref$1.fragment;
    var data = ref$1.data;
    var mediaLink = ref$1.mediaLink;

    commit('cml/sync/start', 'annotationsAdd', { root: true });

    return api
      .createAnnotation(layerId, mediaLink ? mediaId : null, fragment, data)
      .then(function (r) {
        commit('cml/sync/stop', 'annotationsAdd', { root: true });
        var annotation = {
          id: r.data._id,
          fragment: r.data.fragment || {},
          metadata: r.data.data || {},
          layerId: r.data.id_layer,
          mediaId: r.data.id_medium || null
        };
        commit('add', annotation);
        dispatch('cml/messages/success', 'Annotation added', { root: true });
        dispatch('set', annotation.id);

        return annotation
      })
      .catch(function (e) {
        commit('cml/sync/stop', 'annotationsAdd', { root: true });
        var error = e.response ? e.response.body.error : 'Network error';
        dispatch('cml/messages/error', error, { root: true });

        throw error
      })
  },

  remove: function remove (ref, annotation) {
    var commit = ref.commit;
    var dispatch = ref.dispatch;

    commit('cml/sync/start', 'annotationsRemove', { root: true });
    return api
      .deleteAnnotation(annotation.id)
      .then(function (r) {
        commit('cml/sync/stop', 'annotationsRemove', { root: true });
        commit('remove', annotation);
        dispatch('cml/messages/success', 'Annotation removed', { root: true });

        return annotation.id
      })
      .catch(function (e) {
        commit('cml/sync/stop', 'annotationsRemove', { root: true });
        var error = e.response ? e.response.body.error : 'Network error';
        dispatch('cml/messages/error', error, { root: true });

        throw error
      })
  },

  update: function update (ref, annotation) {
    var commit = ref.commit;
    var dispatch = ref.dispatch;

    commit('cml/sync/start', 'annotationsUpdate', { root: true });
    return api
      .updateAnnotation(annotation.id, {
        fragment: annotation.fragment,
        data: annotation.metadata
      })
      .then(function (r) {
        commit('cml/sync/stop', 'annotationsUpdate', { root: true });
        commit('update', annotation);
        dispatch('cml/messages/success', 'Annotation updated', { root: true });

        return annotation
      })
      .catch(function (e) {
        commit('cml/sync/stop', 'annotationsUpdate', { root: true });
        var error = e.response ? e.response.body.error : 'Network error';
        dispatch('cml/messages/error', error, { root: true });

        throw error
      })
  },

  list: function list (ref, layerId) {
    var dispatch = ref.dispatch;
    var commit = ref.commit;

    commit('cml/sync/start', 'annotationsList', { root: true });
    return api
      .getAnnotations({ filter: { id_layer: layerId } })
      .then(function (r) {
        commit('cml/sync/stop', 'annotationsList', { root: true });
        var annotations = r.data.map(function (a) { return ({
          id: a._id,
          fragment: a.fragment || {},
          metadata: a.data || {},
          layerId: a.id_layer,
          mediaId: a.id_medium || null
        }); });
        commit('list', annotations);
        dispatch('set');

        return annotations
      })
      .catch(function (e) {
        commit('cml/sync/stop', 'annotationsList', { root: true });
        var error = e.response ? e.response.body.error : 'Network error';
        dispatch('cml/messages/error', error, { root: true });

        throw error
      })
  },

  set: function set (ref, annotationId) {
    var getters = ref.getters;
    var commit = ref.commit;

    if (getters.id(annotationId)) {
      commit('set', getters.id(annotationId));
    }
  }
};

var getters$7 = {
  id: function (state) { return function (id) { return id ||
    (state.list.map(function (c) { return c.id; }).indexOf(state.id) !== -1 && state.id) ||
    (state.list[0] && state.list[0].id) ||
    null; }; }
};

var mutations$12 = {
  reset: function reset (state) {
    state.list = [];
  },

  add: function add (state, annotation) {
    var annotationExisting = state.list.find(function (c) { return c.id === annotation.id; });
    if (!annotationExisting) {
      state.list.push(annotation);
    }
  },

  update: function update (state, annotation) {
    Object.assign(state.list.find(function (c) { return c.id === annotation.id; }), annotation);
  },

  remove: function remove (state, annotation) {
    var index = state.list.findIndex(function (c) { return c.id === annotation.id; });
    if (index !== -1) {
      state.list.splice(index, 1);
    }
  },

  list: function list (state, annotations) {
    state.list = annotations;
  },

  set: function set (state, id) {
    state.id = id;
  }
};

var annotations = {
  namespaced: true,
  state: state$12,
  actions: actions$10,
  getters: getters$7,
  mutations: mutations$12
};

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

    Promise.all([].concat( ['users', 'groups'].map(
        function (type) { return new Promise(function (resolve, reject) { return dispatch(("cml/" + type + "/list"), {}, { root: true })
              .then(function (r) { return resolve(r); })
              .catch(function (e) { return reject(e); }); }
          ); }
      ) )).then(function (res) {
      dispatch('cml/corpus/list', null, { root: true });
    });
  },

  reset: function reset (ref) {
    var commit = ref.commit;

    commit('delete');
    commit('cml/user/reset', null, { root: true });
    commit('cml/users/reset', null, { root: true });
    commit('cml/groups/reset', null, { root: true });
    commit('cml/corpus/reset', null, { root: true });
    commit('cml/medias/reset', null, { root: true });
    commit('cml/layers/reset', null, { root: true });
  }
};

var mutations = {
  delete: function delete$1 (state) {
    state.url = '';
    state.api = null;
  }
};

Vue.use(Vuex);

var store = new Vuex.Store({
  modules: {
    cml: {
      namespaced: true,
      state: state,
      actions: actions,
      mutations: mutations,
      modules: modules
    }
  }
});

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
};

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
};

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
};

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
};

var cmlMessages = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"messages absolute center"},[_c('transition-group',{attrs:{"name":"transition-bottom","tag":"div"}},_vm._l((_vm.messages),function(message){return (message.content)?_c('div',{key:message.id,staticClass:"px-m py-s mb color-bg b",class:("bg-" + (message.type))},[_vm._v(" "+_vm._s(message.content)+" ")]):_vm._e()}))],1)},staticRenderFns: [],
  name: 'camomile-utils-messages',

  computed: {
    messages: function messages () {
      return this.$store.state.cml.messages.list
    }
  }
};

var cmlTitle = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('h1',{staticClass:"mb-0"},[_vm._v(_vm._s(_vm.title))])},staticRenderFns: [],
  name: 'camomile-header-title',

  computed: {
    title: function title () {
      return this.$store.state.cml.config.title
    }
  }
};

var cmlInfos = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('h6',{staticClass:"menubar-infos mb-0"},[_vm._v(_vm._s(_vm.api)+": "+_vm._s(_vm.url))])},staticRenderFns: [],
  name: 'camomile-header-infos',

  computed: {
    url: function url () {
      return this.$store.state.cml.config.url
    },
    api: function api () {
      return this.$store.state.cml.config.axios ? 'axios' : 'rp';
    }
  }
};

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
};

var popupEdit = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[(_vm.type !== 'annotations')?_c('div',{staticClass:"blobs"},[_vm._m(0,false,false),_vm._v(" "),_c('div',{staticClass:"blob-3-4"},[_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.element.name),expression:"element.name"}],ref:"name",staticClass:"input-alt",attrs:{"type":"text","placeholder":"Name","disabled":_vm.element.id && (_vm.type === 'users' || _vm.type === 'groups')},domProps:{"value":(_vm.element.name)},on:{"input":function($event){if($event.target.composing){ return; }_vm.$set(_vm.element, "name", $event.target.value);}}})])]):_vm._e(),_vm._v(" "),(_vm.type === 'users')?_c('div',{staticClass:"blobs"},[_vm._m(1,false,false),_vm._v(" "),_c('div',{staticClass:"blob-3-4"},[_c('select',{directives:[{name:"model",rawName:"v-model",value:(_vm.element.role),expression:"element.role"}],staticClass:"select-alt",attrs:{"type":"text","disabled":!_vm.rolesPermission},on:{"change":function($event){var $$selectedVal = Array.prototype.filter.call($event.target.options,function(o){return o.selected}).map(function(o){var val = "_value" in o ? o._value : o.value;return val}); _vm.$set(_vm.element, "role", $event.target.multiple ? $$selectedVal : $$selectedVal[0]);}}},_vm._l((_vm.roles),function(role){return _c('option',{key:role,domProps:{"value":role}},[_vm._v(" "+_vm._s(role)+" ")])}))])]):_vm._e(),_vm._v(" "),(_vm.type === 'users')?_c('div',{staticClass:"blobs"},[_vm._m(2,false,false),_vm._v(" "),_c('div',{staticClass:"blob-3-4"},[_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.element.password),expression:"element.password"}],staticClass:"input-alt",attrs:{"type":"password","placeholder":"••••••••"},domProps:{"value":(_vm.element.password)},on:{"input":function($event){if($event.target.composing){ return; }_vm.$set(_vm.element, "password", $event.target.value);}}})])]):_vm._e(),_vm._v(" "),(_vm.type === 'medias')?_c('div',{staticClass:"blobs"},[_vm._m(3,false,false),_vm._v(" "),_c('div',{staticClass:"blob-3-4"},[_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.element.url),expression:"element.url"}],staticClass:"input-alt",attrs:{"type":"text","placeholder":"http://…"},domProps:{"value":(_vm.element.url)},on:{"input":function($event){if($event.target.composing){ return; }_vm.$set(_vm.element, "url", $event.target.value);}}})])]):_vm._e(),_vm._v(" "),(_vm.type === 'annotations' && !_vm.element.id && _vm.element.mediaId)?_c('div',{staticClass:"blobs"},[_vm._m(4,false,false),_vm._v(" "),_c('div',{staticClass:"blob-3-4 p-s"},[_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.element.mediaLink),expression:"element.mediaLink"}],staticClass:"select-alt",attrs:{"type":"checkbox"},domProps:{"checked":Array.isArray(_vm.element.mediaLink)?_vm._i(_vm.element.mediaLink,null)>-1:(_vm.element.mediaLink)},on:{"change":function($event){var $$a=_vm.element.mediaLink,$$el=$event.target,$$c=$$el.checked?(true):(false);if(Array.isArray($$a)){var $$v=null,$$i=_vm._i($$a,$$v);if($$el.checked){$$i<0&&(_vm.element.mediaLink=$$a.concat([$$v]));}else{$$i>-1&&(_vm.element.mediaLink=$$a.slice(0,$$i).concat($$a.slice($$i+1)));}}else{_vm.$set(_vm.element, "mediaLink", $$c);}}}}),_vm._v(" "+_vm._s(_vm.element.mediaName)+" ")])]):_vm._e(),_vm._v(" "),(_vm.type === 'annotations')?_c('object-field',{attrs:{"name":'fragment',"title":'Fragment'}}):_vm._e(),_vm._v(" "),(_vm.type === 'annotations')?_c('object-field',{attrs:{"name":'metadata',"title":'Meta-data'}}):_vm._e(),_vm._v(" "),(_vm.type === 'layers')?_c('object-field',{attrs:{"name":'fragmentType',"title":'Fragment type'}}):_vm._e(),_vm._v(" "),(_vm.type === 'layers')?_c('object-field',{attrs:{"name":'metadataType',"title":'Meta-data type'}}):_vm._e(),_vm._v(" "),(_vm.type !== 'annotations')?_c('object-field',{attrs:{"name":'description',"title":'Description'}}):_vm._e(),_vm._v(" "),_c('div',{staticClass:"blobs"},[_c('div',{staticClass:"blob-1-4"}),_vm._v(" "),_c('div',{staticClass:"blob-3-4"},[_c('button',{staticClass:"btn-alt p-s full-x",attrs:{"disabled":!_vm.element.name && _vm.type !== 'annotations'},on:{"click":_vm.save,"keyup":function($event){if(!('button' in $event)&&_vm._k($event.keyCode,"enter",13,$event.key)){ return null; }_vm.save($event);}}},[_vm._v("Save")])])])],1)},staticRenderFns: [function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"blob-1-4"},[_c('h4',{staticClass:"pt-s mb-0"},[_vm._v("Name")])])},function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"blob-1-4"},[_c('h4',{staticClass:"pt-s mb-0"},[_vm._v("Role")])])},function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"blob-1-4"},[_c('h4',{staticClass:"pt-s mb-0"},[_vm._v("Password")])])},function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"blob-1-4"},[_c('h4',{staticClass:"pt-s mb-0"},[_vm._v("Url")])])},function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"blob-1-4"},[_c('h4',{staticClass:"pt-s mb-0"},[_vm._v("Link to media")])])}],
  name: 'camomile-popup-edit',

  components: {
    objectField: objectField
  },

  computed: Object.assign({}, mapState({
      element: function (state) { return state.cml.popup.element; },
      type: function (state) { return state.cml.popup.config.type; },
      rolesPermission: function (state) { return state.cml.user.id !== state.cml.popup.element.id; },
      roles: function (state) { return state.cml.config.roles; }
    })),

  methods: {
    save: function save () {
      if (this.element.id) {
        this.$store.dispatch(("cml/" + (this.type) + "/update"), this.element);
      } else {
        this.$store.dispatch(("cml/" + (this.type) + "/add"), this.element);
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
};

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
};

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
};

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
};

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
};

var popupLogin = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_c('div',{staticClass:"blobs"},[_vm._m(0,false,false),_vm._v(" "),_c('div',{staticClass:"blob-3-4"},[_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.config.user.name),expression:"config.user.name"}],staticClass:"input-alt",attrs:{"type":"text","placeholder":"Name"},domProps:{"value":(_vm.config.user.name)},on:{"input":function($event){if($event.target.composing){ return; }_vm.$set(_vm.config.user, "name", $event.target.value);}}})]),_vm._v(" "),_vm._m(1,false,false),_vm._v(" "),_c('div',{staticClass:"blob-3-4"},[_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.config.user.password),expression:"config.user.password"}],staticClass:"input-alt",attrs:{"type":"password","placeholder":"Password"},domProps:{"value":(_vm.config.user.password)},on:{"input":function($event){if($event.target.composing){ return; }_vm.$set(_vm.config.user, "password", $event.target.value);}}})]),_vm._v(" "),_c('div',{staticClass:"blob-1-4"}),_vm._v(" "),_c('div',{staticClass:"blob-3-4"},[_c('button',{staticClass:"btn-alt p-s full-x",on:{"click":function($event){_vm.login(_vm.config);}}},[_vm._v("Login")])])])])},staticRenderFns: [function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"blob-1-4"},[_c('h4',{staticClass:"pt-s mb-0"},[_vm._v("Name")])])},function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"blob-1-4"},[_c('h4',{staticClass:"pt-s mb-0"},[_vm._v("Password")])])}],
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
};

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
};

var popupRemove = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[(_vm.type !== 'annotations')?_c('div',{staticClass:"blobs"},[_vm._m(0,false,false),_vm._v(" "),_c('div',{staticClass:"blob-3-4"},[_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.element.name),expression:"element.name"}],staticClass:"input-alt",attrs:{"type":"text","placeholder":"Name","disabled":_vm.element.id},domProps:{"value":(_vm.element.name)},on:{"input":function($event){if($event.target.composing){ return; }_vm.$set(_vm.element, "name", $event.target.value);}}})])]):_vm._e(),_vm._v(" "),(_vm.type === 'annotations')?_c('div',{staticClass:"blobs"},[_vm._m(1,false,false),_vm._v(" "),_c('div',{staticClass:"blob-3-4"},[_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.element.id),expression:"element.id"}],staticClass:"input-alt",attrs:{"type":"text","placeholder":"Name","disabled":_vm.element.id},domProps:{"value":(_vm.element.id)},on:{"input":function($event){if($event.target.composing){ return; }_vm.$set(_vm.element, "id", $event.target.value);}}})])]):_vm._e(),_vm._v(" "),_c('div',{staticClass:"blobs"},[_c('div',{staticClass:"blob-1-4"}),_vm._v(" "),_c('div',{staticClass:"blob-3-4"},[_c('button',{staticClass:"btn-alt p-s full-x",on:{"click":_vm.remove,"keyup":function($event){if(!('button' in $event)&&_vm._k($event.keyCode,"enter",13,$event.key)){ return null; }_vm.remove($event);}}},[_vm._v("Remove")])])])])},staticRenderFns: [function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"blob-1-4"},[_c('h4',{staticClass:"pt-s mb-0"},[_vm._v("Name")])])},function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"blob-1-4"},[_c('h4',{staticClass:"pt-s mb-0"},[_vm._v("Id")])])}],
  name: 'camomile-popup-remove',

  computed: Object.assign({}, mapState({
      element: function (state) { return state.cml.popup.element; },
      type: function (state) { return state.cml.popup.config.type; }
    })),

  methods: {
    remove: function remove () {
      this.$store.dispatch(("cml/" + (this.type) + "/remove"), this.element);
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
};

var popupGroups = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_c('div',{staticClass:"blobs"},[_vm._m(0,false,false),_vm._v(" "),_c('div',{staticClass:"blob-3-4"},[_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.user.name),expression:"user.name"}],staticClass:"input-alt",attrs:{"type":"text","placeholder":"Name","disabled":"disabled"},domProps:{"value":(_vm.user.name)},on:{"input":function($event){if($event.target.composing){ return; }_vm.$set(_vm.user, "name", $event.target.value);}}})])]),_vm._v(" "),_c('div',{staticClass:"blobs"},[_c('div',{staticClass:"blob-1"},[_c('h3',{staticClass:"mb-s"},[_vm._v("Groups")]),_vm._v(" "),_c('ul',{staticClass:"list-inline clearfix"},_vm._l((_vm.groups),function(group){return _c('li',{key:group.id,staticClass:"tag",class:{ active: _vm.groupActive(group.id) }},[_c('button',{staticClass:"btn px-m py-xs h5 pill",on:{"click":function($event){_vm.groupToggle(group);}}},[_vm._v(_vm._s(group.name))])])}))])])])},staticRenderFns: [function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"blob-1-4"},[_c('h4',{staticClass:"pt-s mb-0"},[_vm._v("Name")])])}],
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
};

var cmlUsers = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_c('div',{staticClass:"flex flex-start"},[_c('h2',{staticClass:"mt-s"},[_vm._v("Users")]),_vm._v(" "),_c('button',{staticClass:"btn p-s flex-right",on:{"click":function($event){_vm.popupOpen({ config: _vm.popupAddConfig, element: { description: {}, role: 'user' } });}}},[_c('i',{staticClass:"icon-24 icon-24-plus"})])]),_vm._v(" "),_c('div',[_c('table',{staticClass:"table mb-0"},[_vm._m(0,false,false),_vm._v(" "),_vm._l((_vm.users),function(user){return _c('tr',{key:user.id},[_c('td',[_vm._v(_vm._s(user.name))]),_vm._v(" "),_c('td',[_vm._v(_vm._s(user.role))]),_vm._v(" "),_c('td',{staticClass:"text-right"},[_c('button',{staticClass:"btn px-s py-s my--s h6",on:{"click":function($event){_vm.popupOpen({ config: _vm.popupGroupsConfig, element: user });}}},[_vm._v("Groups")]),_vm._v(" "),_c('button',{staticClass:"btn px-s py-s my--s h6",on:{"click":function($event){_vm.popupOpen({ config: _vm.popupEditConfig, element: user });}}},[_vm._v("Edit")]),_vm._v(" "),(user.id !== _vm.userId)?_c('button',{staticClass:"btn px-s py-s my--s h6",on:{"click":function($event){_vm.popupOpen({ config: _vm.popupRemoveConfig, element: user });}}},[_vm._v("Remove")]):_vm._e()])])})],2)])])},staticRenderFns: [function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('tr',[_c('th',[_vm._v("Name")]),_c('th',[_vm._v("Role")]),_c('th')])}],
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
};

var popupUsers = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_c('div',{staticClass:"blobs"},[_vm._m(0,false,false),_vm._v(" "),_c('div',{staticClass:"blob-3-4"},[_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.group.name),expression:"group.name"}],staticClass:"input-alt",attrs:{"type":"text","placeholder":"Name","disabled":"disabled"},domProps:{"value":(_vm.group.name)},on:{"input":function($event){if($event.target.composing){ return; }_vm.$set(_vm.group, "name", $event.target.value);}}})])]),_vm._v(" "),_c('div',{staticClass:"blobs"},[_c('div',{staticClass:"blob-1"},[_c('h3',{staticClass:"pt-s mb-s"},[_vm._v("Users")]),_vm._v(" "),_c('ul',{staticClass:"list-inline"},_vm._l((_vm.users),function(user){return _c('li',{key:user.id,staticClass:"tag",class:{ active: _vm.userActive(user.id) }},[_c('button',{staticClass:"btn px-m py-xs h5 pill",on:{"click":function($event){_vm.userToggle(user.id);}}},[_vm._v(_vm._s(user.name))])])}))])])])},staticRenderFns: [function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"blob-1-4"},[_c('h4',{staticClass:"pt-s mb-0"},[_vm._v("Name")])])}],
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
};

var cmlGroups = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_c('div',{staticClass:"flex flex-start"},[_c('h2',{staticClass:"mt-s"},[_vm._v("Groups")]),_vm._v(" "),_c('button',{staticClass:"btn p-s flex-right",on:{"click":function($event){_vm.popupOpen({ config: _vm.popupAddConfig, element: { description: {} } });}}},[_c('i',{staticClass:"icon-24 icon-24-plus"})])]),_vm._v(" "),_c('div',[_c('table',{staticClass:"table mb-0"},[_vm._m(0,false,false),_vm._v(" "),_vm._l((_vm.groups),function(group){return _c('tr',{key:group.id},[_c('td',[_vm._v(_vm._s(group.name))]),_vm._v(" "),_c('td',[_vm._v(_vm._s(group.userIds.length))]),_vm._v(" "),_c('td',{staticClass:"text-right"},[_c('button',{staticClass:"btn px-s py-s my--s h6",on:{"click":function($event){_vm.popupOpen({ config: _vm.popupUsersConfig, element: group });}}},[_vm._v("Users")]),_vm._v(" "),_c('button',{staticClass:"btn px-s py-s my--s h6",on:{"click":function($event){_vm.popupOpen({ config: _vm.popupEditConfig, element: group });}}},[_vm._v("Edit")]),_vm._v(" "),(_vm.isRoot)?_c('button',{staticClass:"btn px-s py-s my--s h6",on:{"click":function($event){_vm.popupOpen({ config: _vm.popupRemoveConfig, element: group });}}},[_vm._v("Remove")]):_vm._e()])])})],2)])])},staticRenderFns: [function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('tr',[_c('th',[_vm._v("Name")]),_c('th',[_vm._v("Users")]),_c('th')])}],
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
};

var permissionsEdit = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('ul',{staticClass:"list-inline"},[_c('li',{staticClass:"tag",class:{ active: _vm.isActive(1) }},[_c('button',{staticClass:"btn px-s py-xs my--xs h5 mono pill",on:{"click":function($event){_vm.toggle(1);}}},[_vm._v("R")])]),_vm._v(" "),_c('li',{staticClass:"tag",class:{ active: _vm.isActive(2) }},[_c('button',{staticClass:"btn px-s py-xs my--xs h5 mono pill",on:{"click":function($event){_vm.toggle(2);}}},[_vm._v("W")])]),_vm._v(" "),_c('li',{staticClass:"tag",class:{ active: _vm.isActive(3) }},[_c('button',{staticClass:"btn px-s py-xs my--xs h5 mono pill",on:{"click":function($event){_vm.toggle(3);}}},[_vm._v("A")])])])},staticRenderFns: [],
  name: 'camomile-popup-permissions-edit',

  props: {
    element: Object,
    resource: Object
  },

  computed: {
    permissions: function permissions () {
      var this$1 = this;

      return this.$store.state.cml[((this.resource.type) + "s")].list.find(function (r) { return r.id === this$1.resource.id; }).permissions[((this.element.type) + "s")]
    }
  },

  methods: {
    toggle: function toggle (permission) {
      var obj, obj$1;

      if (this.isActive(permission)) {
        this.$store.dispatch(("cml/" + (this.resource.type) + "s/" + (this.element.type) + "PermissionRemove"), ( obj = {}, obj[((this.resource.type) + "Id")] = this.resource.id, obj[((this.element.type) + "Id")] = this.element.id, obj));
      } else {
        this.$store.dispatch(("cml/" + (this.resource.type) + "s/" + (this.element.type) + "PermissionSet"), ( obj$1 = {}, obj$1[((this.resource.type) + "Id")] = this.resource.id, obj$1[((this.element.type) + "Id")] = this.element.id, obj$1.permission = permission, obj$1));
      }
    },
    isActive: function isActive (permission) {
      return this.permissions[this.element.id] === permission
    }
  }
};

var popupPermissions = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_c('div',{staticClass:"blobs"},[_vm._m(0,false,false),_vm._v(" "),_c('div',{staticClass:"blob-3-4"},[_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.resource.name),expression:"resource.name"}],staticClass:"input-alt",attrs:{"type":"text","placeholder":"Name","disabled":"disabled"},domProps:{"value":(_vm.resource.name)},on:{"input":function($event){if($event.target.composing){ return; }_vm.$set(_vm.resource, "name", $event.target.value);}}})]),_vm._v(" "),_c('div',{staticClass:"blob-1-2"},[_c('h3',{staticClass:"pt-s"},[_vm._v("Groups")]),_vm._v(" "),_c('ul',{staticClass:"list-sans"},_vm._l((_vm.groups),function(group){return _c('li',{key:group.id},[_c('div',{staticClass:"blobs"},[_c('div',{staticClass:"blob-1-2 mb-s"},[_vm._v(" "+_vm._s(group.name)+" ")]),_vm._v(" "),_c('div',{staticClass:"blob-1-2 mb-s"},[_c('permissions-edit',{attrs:{"resource":_vm.permissionsConfig,"element":{ id: group.id, type: 'group' }}})],1)])])}))]),_vm._v(" "),_c('div',{staticClass:"blob-1-2"},[_c('h3',{staticClass:"pt-s"},[_vm._v("Users")]),_vm._v(" "),_c('ul',{staticClass:"list-sans"},_vm._l((_vm.users),function(user){return _c('li',{key:user.id},[_c('div',{staticClass:"blobs"},[_c('div',{staticClass:"blob-1-2 mb-s"},[_vm._v(" "+_vm._s(user.name)+" ")]),_vm._v(" "),_c('div',{staticClass:"blob-1-2 mb-s"},[_c('permissions-edit',{attrs:{"resource":_vm.permissionsConfig,"element":{ id: user.id, type: 'user' }}})],1)])])}))])])])},staticRenderFns: [function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"blob-1-4"},[_c('h4',{staticClass:"pt-s"},[_vm._v("Name")])])}],
  name: 'camomile-permissions',

  components: {
    permissionsEdit: permissionsEdit
  },

  computed: Object.assign({}, mapState({
      resource: function (state) { return state.cml[state.cml.popup.config.type].list.find(function (e) { return e.id === state.cml.popup.element.id; }); },
      users: function (state) { return state.cml.users.list; },
      groups: function (state) { return state.cml.groups.list; },
      type: function (state) { return state.cml.popup.config.type; }
    }),
    {permissionsConfig: function permissionsConfig () {
      return {
        id: this.resource.id,
        type: this.type.slice(0, -1),
        permissions: this.resource.permissions.users
      }
    }})
};

var cmlCorpus = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_c('div',{staticClass:"flex flex-start"},[_c('h2',{staticClass:"mt-s"},[_vm._v("Corpora")]),_vm._v(" "),(_vm.isAdmin)?_c('button',{staticClass:"flex-right btn p-s",on:{"click":function($event){_vm.popupOpen({ config: _vm.popupAddConfig, element: { id: null, description: {} } });}}},[_c('i',{staticClass:"icon-24 icon-24-plus"})]):_vm._e()]),_vm._v(" "),_c('div',[_c('table',{staticClass:"table mb-0"},[_vm._m(0,false,false),_vm._v(" "),_vm._l((_vm.corpus),function(corpu){return _c('tr',{key:corpu.id},[_c('td',[_c('input',{attrs:{"type":"radio"},domProps:{"value":corpu.id,"checked":corpu.id === _vm.corpuId},on:{"change":_vm.set}})]),_vm._v(" "),_c('td',[_vm._v(_vm._s(corpu.name))]),_vm._v(" "),_c('td',{staticClass:"text-right"},[(corpu.permission === 3)?_c('button',{staticClass:"btn px-s py-s my--s h6",on:{"click":function($event){_vm.popupOpen({ config: _vm.popupPermissionsConfig, element: corpu });}}},[_vm._v("Permissions")]):_vm._e(),_vm._v(" "),(corpu.permission === 3)?_c('button',{staticClass:"btn px-s py-s my--s h6",on:{"click":function($event){_vm.popupOpen({ config: _vm.popupEditConfig, element: corpu });}}},[_vm._v("Edit")]):_vm._e(),_vm._v(" "),(_vm.isAdmin && corpu.permission === 3)?_c('button',{staticClass:"btn px-s py-s my--s h6",on:{"click":function($event){_vm.popupOpen({ config: _vm.popupRemoveConfig, element: corpu });}}},[_vm._v("Remove")]):_vm._e()])])})],2)])])},staticRenderFns: [function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('tr',[_c('th'),_c('th',[_vm._v("Name")]),_c('th')])}],
  name: 'camomile-corpus',

  data: function data () {
    return {
      popupEditConfig: {
        type: 'corpus',
        closeBtn: true,
        title: 'Edit corpus',
        component: popupEdit
      },
      popupAddConfig: {
        type: 'corpus',
        closeBtn: true,
        title: 'Add corpus',
        component: popupEdit
      },
      popupRemoveConfig: {
        type: 'corpus',
        closeBtn: true,
        title: 'Remove corpus',
        component: popupRemove
      },
      popupPermissionsConfig: {
        type: 'corpus',
        closeBtn: true,
        title: 'Corpus permissions',
        component: popupPermissions
      }
    }
  },

  computed: Object.assign({}, mapState({
      corpus: function (state) { return state.cml.corpus.list; },
      corpuId: function (state) { return state.cml.corpus.id; },
      isAdmin: function (state) { return state.cml.user.isAdmin; }
    })),

  methods: {
    popupOpen: function popupOpen (ref) {
      var config = ref.config;
      var element = ref.element;

      this.$store.commit('cml/popup/open', { config: config, element: element });
    },
    set: function set (e) {
      this.$store.dispatch('cml/corpus/set', e.target.value);
    }
  }
};

var cmlMedias = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_c('div',{staticClass:"flex flex-start"},[_c('h2',{staticClass:"mt-s"},[_vm._v("Media")]),_vm._v(" "),(_vm.permission === 3)?_c('button',{staticClass:"flex-right btn p-s",on:{"click":function($event){_vm.popupOpen({ config: _vm.popupAddConfig, element: { id: null, corpuId: _vm.corpuId, description: {} } });}}},[_c('i',{staticClass:"icon-24 icon-24-plus"})]):_vm._e()]),_vm._v(" "),_c('div',[_c('table',{staticClass:"table mb-0"},[_vm._m(0,false,false),_vm._v(" "),_vm._l((_vm.medias),function(media){return _c('tr',{key:media.id},[_c('td',[_c('input',{attrs:{"type":"radio"},domProps:{"value":media.id,"checked":media.id === _vm.mediaId},on:{"change":_vm.set}})]),_vm._v(" "),_c('td',[_vm._v(_vm._s(media.name))]),_vm._v(" "),_c('td',{staticClass:"text-right"},[(_vm.permission === 3)?_c('button',{staticClass:"btn px-s py-s my--s h6",on:{"click":function($event){_vm.popupOpen({ config: _vm.popupEditConfig, element: media });}}},[_vm._v("Edit")]):_vm._e(),_vm._v(" "),(_vm.permission === 3)?_c('button',{staticClass:"btn px-s py-s my--s h6",on:{"click":function($event){_vm.popupOpen({ config: _vm.popupRemoveConfig, element: media });}}},[_vm._v("Remove")]):_vm._e()])])})],2)])])},staticRenderFns: [function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('tr',[_c('th'),_c('th',[_vm._v("Name")]),_c('th')])}],
  name: 'camomile-medias',

  data: function data () {
    return {
      popupEditConfig: {
        type: 'medias',
        closeBtn: true,
        title: 'Edit medium',
        component: popupEdit
      },
      popupAddConfig: {
        type: 'medias',
        closeBtn: true,
        title: 'Add medium',
        component: popupEdit
      },
      popupRemoveConfig: {
        type: 'medias',
        closeBtn: true,
        title: 'Remove medium',
        component: popupRemove
      }
    }
  },

  computed: Object.assign({}, mapState({
      medias: function (state) { return state.cml.medias.list; },
      corpus: function (state) { return state.cml.corpus.list; },
      corpuId: function (state) { return state.cml.corpus.id; },
      mediaId: function (state) { return state.cml.medias.id; }
    }),
    {permission: function permission () {
      var this$1 = this;

      var corpu = this.corpus.find(function (c) { return c.id === this$1.corpuId; });
      return corpu ? corpu.permission : 0
    }}),

  methods: {
    popupOpen: function popupOpen (ref) {
      var config = ref.config;
      var element = ref.element;

      return this.$store.commit('cml/popup/open', { config: config, element: element })
    },
    set: function set (e) {
      this.$store.dispatch('cml/medias/set', e.target.value);
    }
  }
};

var cmlLayers = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_c('div',{staticClass:"flex flex-start"},[_c('h2',{staticClass:"mt-s"},[_vm._v("Layers")]),_vm._v(" "),(_vm.permission === 3)?_c('button',{staticClass:"flex-right btn p-s",on:{"click":function($event){_vm.popupOpen({ config: _vm.popupAddConfig, element: { id: null, corpuId: _vm.corpuId, description: {}, metadataType: {}, fragmentType: {} } });}}},[_c('i',{staticClass:"icon-24 icon-24-plus"})]):_vm._e()]),_vm._v(" "),_c('div',[_c('table',{staticClass:"table mb-0"},[_vm._m(0,false,false),_vm._v(" "),_vm._l((_vm.layers),function(layer){return _c('tr',{key:layer.id},[_c('td',[_c('input',{attrs:{"type":"radio"},domProps:{"value":layer.id,"checked":layer.id === _vm.layerId},on:{"change":_vm.set}})]),_vm._v(" "),_c('td',[_vm._v(_vm._s(layer.name))]),_vm._v(" "),_c('td',{staticClass:"text-right"},[(layer.permission === 3)?_c('button',{staticClass:"btn px-s py-s my--s h6",on:{"click":function($event){_vm.popupOpen({ config: _vm.popupPermissionsConfig, element: layer });}}},[_vm._v("Permissions")]):_vm._e(),_vm._v(" "),(layer.permission === 3)?_c('button',{staticClass:"btn px-s py-s my--s h6",on:{"click":function($event){_vm.popupOpen({ config: _vm.popupEditConfig, element: layer });}}},[_vm._v("Edit")]):_vm._e(),_vm._v(" "),(layer.permission === 3)?_c('button',{staticClass:"btn px-s py-s my--s h6",on:{"click":function($event){_vm.popupOpen({ config: _vm.popupRemoveConfig, element: layer });}}},[_vm._v("Remove")]):_vm._e()])])})],2)])])},staticRenderFns: [function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('tr',[_c('th'),_c('th',[_vm._v("Name")]),_c('th')])}],
  name: 'camomile-layers',

  data: function data () {
    return {
      popupEditConfig: {
        type: 'layers',
        closeBtn: true,
        title: 'Edit layer',
        component: popupEdit
      },
      popupAddConfig: {
        type: 'layers',
        closeBtn: true,
        title: 'Edit layer',
        component: popupEdit
      },
      popupRemoveConfig: {
        type: 'layers',
        closeBtn: true,
        title: 'Remove layer',
        component: popupRemove
      },
      popupPermissionsConfig: {
        type: 'layers',
        closeBtn: true,
        title: 'Layer permissions',
        component: popupPermissions
      }
    }
  },

  computed: Object.assign({}, mapState({
      layers: function (state) { return state.cml.layers.list; },
      corpuId: function (state) { return state.cml.corpus.id; },
      corpus: function (state) { return state.cml.corpus.list; },
      layerId: function (state) { return state.cml.layers.id; }
    }),
    {permission: function permission () {
      var this$1 = this;

      var corpu = this.corpus.find(function (c) { return c.id === this$1.corpuId; });
      return corpu ? corpu.permission : 0
    }}),

  methods: {
    popupOpen: function popupOpen (config) {
      return this.$store.commit('cml/popup/open', config)
    },
    set: function set (e) {
      this.$store.dispatch('cml/layers/set', e.target.value);
    }
  }
};

var cmlAnnotations = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_c('div',{staticClass:"flex flex-start"},[_c('h2',{staticClass:"mt-s"},[_vm._v("Annotations")]),_vm._v(" "),(_vm.permission === 3)?_c('button',{staticClass:"flex-right btn p-s",on:{"click":function($event){_vm.popupOpen({ config: _vm.popupAddConfig, element: { id: null, layerId: _vm.layerId, mediaId: _vm.mediaId, fragment: {}, metadata: {}, mediaName: _vm.mediaName(_vm.mediaId), mediaLink: true } });}}},[_c('i',{staticClass:"icon-24 icon-24-plus"})]):_vm._e()]),_vm._v(" "),_c('div',[_c('table',{staticClass:"table mb-0"},[_vm._m(0,false,false),_vm._v(" "),_vm._l((_vm.annotations),function(annotation){return _c('tr',{key:annotation.id},[_c('td',[_c('input',{attrs:{"type":"radio"},domProps:{"value":annotation.id,"checked":annotation.id === _vm.annotationId},on:{"change":_vm.set}})]),_vm._v(" "),_c('td',[_c('span',{staticClass:"h6 bold bg-neutral color-bg py-xxs px-xs rnd"},[_vm._v("…"+_vm._s(_vm._f("stringEnd")(annotation.id)))])]),_vm._v(" "),_c('td',[_vm._v(_vm._s(_vm.mediaName(annotation.mediaId)))]),_vm._v(" "),_c('td',{staticClass:"text-right"},[(_vm.permission === 3)?_c('button',{staticClass:"btn px-s py-s my--s h6",on:{"click":function($event){_vm.popupOpen({ config: _vm.popupEditConfig, element: annotation });}}},[_vm._v("Edit")]):_vm._e(),_vm._v(" "),(_vm.permission === 3)?_c('button',{staticClass:"btn px-s py-s my--s h6",on:{"click":function($event){_vm.popupOpen({ config: _vm.popupRemoveConfig, element: annotation });}}},[_vm._v("Remove")]):_vm._e()])])})],2)])])},staticRenderFns: [function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('tr',[_c('th'),_c('th',[_vm._v("Id")]),_c('th',[_vm._v("Medium")]),_c('th')])}],
  name: 'camomile-annotations',

  data: function data () {
    return {
      popupEditConfig: {
        type: 'annotations',
        closeBtn: true,
        title: 'Edit annotation',
        component: popupEdit
      },
      popupAddConfig: {
        type: 'annotations',
        closeBtn: true,
        title: 'Add annotation',
        component: popupEdit
      },
      popupRemoveConfig: {
        type: 'annotations',
        closeBtn: true,
        title: 'Remove annotation',
        component: popupRemove
      }
    }
  },

  computed: Object.assign({}, mapState({
      annotations: function (state) { return state.cml.annotations.list; },
      mediaId: function (state) { return state.cml.medias.id; },
      layerId: function (state) { return state.cml.layers.id; },
      annotationId: function (state) { return state.cml.annotations.id; },
      medias: function (state) { return state.cml.medias.list; }
    }),
    {permission: function permission () {
      var this$1 = this;

      var layer = this.$store.state.cml.layers.list.find(function (layer) { return layer.id === this$1.layerId; });
      return layer ? layer.permission : 0
    }}),

  methods: {
    popupOpen: function popupOpen (ref) {
      var config = ref.config;
      var element = ref.element;

      return this.$store.commit('cml/popup/open', { config: config, element: element })
    },
    set: function set (e) {
      this.$store.dispatch('cml/annotations/set', e.target.value);
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
};

var app = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"full-y flex flex-direction-column"},[_c('cml-header'),_vm._v(" "),_c('div',{staticClass:"relative page"},[_c('transition',{attrs:{"name":"transition-top"}},[(_vm.popup.visible)?_c('cml-popup'):_vm._e()],1),_vm._v(" "),_c('cml-messages'),_vm._v(" "),_c('cml-dropdown'),_vm._v(" "),_c('div',{staticClass:"container pt"},[(_vm.isAdmin)?_c('div',{staticClass:"blobs"},[_c('cml-users',{staticClass:"blob-1-2 p border"}),_vm._v(" "),_c('cml-groups',{staticClass:"blob-1-2 p border"})],1):_vm._e(),_vm._v(" "),(_vm.isLogged)?_c('div',{staticClass:"blobs"},[_c('cml-corpus',{staticClass:"blob-1-2 p border"}),_vm._v(" "),_c('cml-medias',{staticClass:"blob-1-2 p border"}),_vm._v(" "),_c('cml-layers',{staticClass:"blob-1-2 p border"}),_vm._v(" "),_c('cml-annotations',{staticClass:"blob-1-2 p border"})],1):_vm._e()])],1),_vm._v(" "),(!_vm.isLogged)?_c('cml-login'):_vm._e(),_vm._v(" "),_c('viewport'),_vm._v(" "),_c('debug')],1)},staticRenderFns: [],
  store: store,

  name: 'camomile',

  components: {
    debug: debug,
    viewport: viewport$1,
    cmlHeader: cmlHeader,
    cmlLogin: cmlLogin,
    cmlPopup: cmlPopup,
    cmlMessages: cmlMessages,
    cmlDropdown: cmlDropdown,
    cmlUsers: cmlUsers,
    cmlGroups: cmlGroups,
    cmlCorpus: cmlCorpus,
    cmlMedias: cmlMedias,
    cmlLayers: cmlLayers,
    cmlAnnotations: cmlAnnotations
  },

  computed: Object.assign({}, mapState({
      isAdmin: function (state$$1) { return state$$1.cml.user.isAdmin; },
      isLogged: function (state$$1) { return state$$1.cml.user.isLogged; },
      popup: function (state$$1) { return state$$1.cml.popup; }
    }))
};

export default app;
