import Vuex, { mapState } from 'vuex';
import Vue from 'vue';
import Camomile from 'camomile-client';
import axios from 'axios';

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

var camomile = (url => {
  const api = axios.create({
    baseURL: url,
    withCredentials: true
  });

  const _opt = (n, id) => {
    return id ? `${n}/${id}` : n;
  };

  const _user = id => _opt('user', id);

  const _get$$1 = async uri => {
    try {
      const response = await api.get(uri);
      console.log('get: ', uri, response.data);
      return response.data;
    } catch (e) {
      console.log('get error: ', uri, e);
      throw e;
    }
  };

  const _post = async (uri, data) => {
    try {
      const response = await api.post(uri, data);
      console.log('post: ', uri, response.data);
      return response.data;
    } catch (e) {
      console.log('post error: ', uri, e);
      throw e;
    }
  };

  const _put = async (uri, data) => {
    try {
      const response = await api.put(uri, data);
      console.log('put: ', uri, response.data);
      return response.data;
    } catch (e) {
      console.log('put error: ', uri, e);
      throw e;
    }
  };

  return {
    // User
    login(name, password) {
      return _post('login', {
        username: name,
        password: password
      });
    },

    logout() {
      return _post('logout');
    },

    me() {
      return _get$$1('me');
    },

    updatePassword(password) {
      return _put('me', {
        password: password
      });
    },

    createUser(name, password, description = {}, role = 'user', {
      returns_id
    } = {}) {
      return _post('user', {
        name,
        password,
        description,
        role
      });
    },

    updateUser(id, fields = {}) {
      return _put(_user(id), fields);
    },

    getUsers({
      returns_id,
      filter: {
        username,
        role
      } = {}
    } = {}) {
      return _get$$1('user', {
        username,
        role
      }).then(r => console.log('getUsers', r, returns_id));
    }

  };
});

// import Camomile from '../../camomile-client-javascript' /* debug with local version */
/* axios api */

const config = {
  title: 'Camomile UI',
  user: {
    name: 'root',
    password: 'roO7p4s5wOrD'
  },
  url: 'http://localhost:3000',
  roles: ['admin', 'user'],
  axios: false
};
const api = config.axios ? camomile(config.url) : new Camomile(config.url);

var log = {
  simple(key, value) {
    console.log(`%c| ${key}: %c${value}`, // eslint-disable-line camelcase
    'padding:8px 0; color:#666; line-height:24px;', 'padding:8px 32px 8px 0; color:#f40; line-height:24px;');
  },

  button(key, value) {
    console.log(`%c${key} %c${value}`, 'font-family: sans-serif; font-size: 13px; padding:12px 16px 12px 24px; line-height:96px; margin-left: 4px; border-radius: 8px 0 0 8px; color:#333; background:linear-gradient(to bottom, #E5E4E5, #CFCFCF); text-shadow: -1px -1px 1px #ccc,  1px 1px 3px #fff;', 'font-family: sans-serif; font-size: 13px; padding:12px 16px 12px 12px; line-height:96px; text-decoration: none; color:#fff; background:linear-gradient(to bottom, #f62, #f30); text-shadow: -1px -1px 1px #a50,  1px 1px 3px #fa0; border-radius: 0 8px 8px 0; ');
  }

};

var viewport = {
  namespaced: true,
  state: {
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
    animations: false
  },
  mutations: {
    svgStatus(state, payload) {
      state.svg[payload.type] = payload.status;
    },

    viewportSet(state, payload) {
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

    svgSet(state, payload) {
      state.svg.scale = state.viewport.name === 'mobile' || state.viewport.name === 'tablet' ? 0.5 : 1;
      state.svg.height = state.viewport.name === 'mobile' || state.viewport.name === 'tablet' ? state.viewport.height - 288 : state.viewport.height - 144;
      state.svg.width = state.viewport.name === 'large' ? state.viewport.width - 48 : state.viewport.width - 48;
    }

  },
  actions: {
    set(context) {
      context.commit('viewportSet');
      context.commit('svgSet');
    }

  }
};

var sync = {
  namespaced: true,
  state: {
    list: []
  },
  actions: {
    all({
      state,
      dispatch,
      commit,
      rootState
    }) {
      Promise.all([...['users', 'groups', 'corpus'].map(type => new Promise((resolve, reject) => dispatch(`cml/${type}/list`, {}, {
        root: true
      }).then(r => resolve(r)).catch(e => reject(e)))), ...['medias', 'layers'].map(type => new Promise((resolve, reject) => dispatch(`cml/${type}/list`, rootState.cml.corpus.id, {
        root: true
      }).then(r => resolve(r)).catch(e => reject(e))))]).then(v => {
        dispatch('cml/messages/success', 'Synced with server', {
          root: true
        });
      });
    }

  },
  getters: {
    active: state => {
      return state.list.length;
    }
  },
  mutations: {
    start(state, name) {
      state.list.push(name);
    },

    stop(state, name) {
      state.list = state.list.filter(n => n !== name);
    }

  }
};

var popup = {
  namespaced: true,
  state: {
    visible: false,
    config: {},
    element: {}
  },
  mutations: {
    open(state, {
      config,
      element
    }) {
      state.visible = true;
      state.config = config;
      state.element = JSON.parse(JSON.stringify(element));
    },

    close(state) {
      state.visible = false;
      state.config = {};
    },

    fieldUpdate(state, {
      name,
      value
    }) {
      Vue.set(state.element, name, value);
    }

  }
};

var dropdown = {
  namespaced: true,
  state: {
    visible: false,
    config: {}
  },
  mutations: {
    close(state) {
      state.visible = false;
      state.config = {};
    },

    open(state, config) {
      state.visible = true;
      state.config = config;
    }

  }
};

var messages = {
  namespaced: true,
  state: {
    list: []
  },
  actions: {
    success({
      commit
    }, content) {
      commit('add', {
        content,
        type: 'success',
        id: new Date().valueOf()
      });
      setTimeout(_ => {
        commit('remove');
      }, 2000);
    },

    error({
      commit
    }, content) {
      commit('add', {
        content,
        type: 'error',
        id: new Date().valueOf()
      });
      setTimeout(_ => {
        commit('remove');
      }, 2000);
    }

  },
  mutations: {
    remove(state) {
      state.list.shift();
    },

    add(state, message) {
      state.list.push(message);
    }

  }
};

var user = {
  namespaced: true,
  state: {
    id: '',
    name: '',
    role: '',
    description: '',
    groupIds: [],
    isLogged: false,
    isAdmin: false,
    isRoot: false
  },
  actions: {
    login({
      commit,
      dispatch
    }, config$$1) {
      commit('cml/sync/start', 'userLogin', {
        root: true
      });
      return api.login(config$$1.user.name, config$$1.user.password).then(r => {
        commit('cml/sync/stop', 'userLogin', {
          root: true
        });
        commit('cml/popup/close', null, {
          root: true
        });
        dispatch('set');
        return r;
      }).catch(e => {
        commit('cml/sync/stop', 'userLogin', {
          root: true
        });
        const error = e.response ? e.response.body.error : 'Network error';
        dispatch('cml/messages/error', error, {
          root: true
        });
        dispatch('cml/reset', null, {
          root: true
        });
        throw error;
      });
    },

    set({
      commit,
      dispatch
    }) {
      commit('cml/sync/start', 'userSet', {
        root: true
      });
      return api.me().then(user => {
        commit('cml/sync/stop', 'userSet', {
          root: true
        });
        commit('set', user);
        dispatch('cml/set', null, {
          root: true
        });
        return user;
      }).catch(e => {
        commit('cml/sync/stop', 'userSet', {
          root: true
        });
        const error = e.response ? e.response.body.error : 'Network error';
        dispatch('cml/messages/error', error, {
          root: true
        });
        dispatch('cml/reset', null, {
          root: true
        });
        throw error;
      });
    },

    logout({
      commit,
      dispatch
    }) {
      commit('cml/sync/start', 'userLogout', {
        root: true
      });
      return api.logout().then(r => {
        commit('cml/sync/stop', 'userLogout', {
          root: true
        });
        dispatch('cml/reset', null, {
          root: true
        });
        commit('cml/popup/close', null, {
          root: true
        });
        commit('cml/dropdown/close', null, {
          root: true
        });
        return r.success;
      }).catch(e => {
        commit('cml/sync/stop', 'userLogout', {
          root: true
        });
        const error = e.response ? e.response.body.error : 'Network error';
        dispatch('cml/messages/error', error, {
          root: true
        });
        dispatch('cml/reset', null, {
          root: true
        });
        throw error;
      });
    }

  },
  getters: {
    isAdmin: state => ({
      users = {},
      groups = {}
    }) => {
      const isAdmin = users[state.id] === 3;
      const isInAdminGroup = Object.keys(groups).reduce((result, id) => {
        const groupIsAdmin = groups[id] === 3;
        const userIsInGroup = state.groupIds.reduce((isIn, groupId) => {
          return isIn || groupId === id;
        }, false);
        return result || groupIsAdmin && userIsInGroup;
      }, false);
      return isAdmin || isInAdminGroup;
    },
    permission: state => ({
      users = {},
      groups = {}
    }) => {
      const permissionUser = Object.keys(users).find(userId => userId === state.id) && users[state.id] || 0;
      const permissionGroup = Object.keys(groups).reduce((permission, groupId) => Math.max(permission, state.groupIds.indexOf(groupId) !== -1 && groups[groupId]), 0);
      const permissionRoot = state.isRoot ? 3 : 0;
      return Math.max(permissionUser, permissionGroup, permissionRoot);
    }
  },
  mutations: {
    set(state, user) {
      state.isLogged = true;
      state.isAdmin = user.role === 'admin';
      state.isRoot = user.username === 'root';
      state.id = user._id;
      state.name = user.username;
      state.role = user.role;
      state.description = user.description;
      state.groupIds = user.groups;
    },

    reset(state) {
      state.isLogged = false;
      state.isAdmin = false;
      state.isRoot = false;
      state.id = '';
      state.name = '';
      state.role = '';
      state.description = '';
      state.groupIds = [];
    },

    groupAdd(state, groupId) {
      state.groupIds.push(groupId);
    },

    groupRemove(state, groupId) {
      state.groupIds = state.groupIds.filter(id => id !== groupId);
    }

  }
};

function userFormat(user) {
  return {
    name: user.username,
    id: user._id,
    description: user.description || {},
    role: user.role
  };
}
function groupFormat(group) {
  return {
    name: group.name,
    id: group._id,
    description: group.description || {},
    userIds: group.users
  };
}
function mediaFormat(media) {
  return {
    name: media.name,
    id: media._id,
    url: media.url,
    corpuId: media.id_corpus,
    description: media.description || {}
  };
}
function observerClean(obj) {
  return Object.keys(obj).reduce((res, e) => Object.assign(res, {
    [e]: obj[e]
  }), {});
}

var users = {
  namespaced: true,
  state: {
    list: []
  },
  actions: {
    add({
      commit,
      dispatch
    }, user) {
      commit('cml/sync/start', 'usersAdd', {
        root: true
      });
      return api.createUser(user.name, user.password, observerClean(user.description), user.role).then(r => {
        commit('cml/sync/stop', 'usersAdd', {
          root: true
        });
        const user = userFormat(r);
        commit('add', user);
        commit('cml/corpus/userAdd', user.id, {
          root: true
        });
        dispatch('cml/messages/success', 'User added', {
          root: true
        });
        return user;
      }).catch(e => {
        commit('cml/sync/stop', 'usersAdd', {
          root: true
        });
        const error = e.response ? e.response.body.error : 'Network error';
        dispatch('cml/messages/error', error, {
          root: true
        });
        throw error;
      });
    },

    update({
      commit,
      dispatch,
      rootState
    }, user) {
      commit('cml/sync/start', 'usersUpdate', {
        root: true
      });
      return api.updateUser(user.id, {
        password: user.password,
        role: user.role,
        description: user.description
      }).then(r => {
        commit('cml/sync/stop', 'usersUpdate', {
          root: true
        });
        const user = userFormat(r);
        commit('update', user);

        if (user.name === rootState.cml.user.name) {
          commit('cml/user/set', user, {
            root: true
          });
        }

        dispatch('cml/messages/success', 'User updated', {
          root: true
        });
        return user;
      }).catch(e => {
        commit('cml/sync/stop', 'usersUpdate', {
          root: true
        });
        const error = e.response ? e.response.body.error : 'Network error';
        dispatch('cml/messages/error', error, {
          root: true
        });
        throw error;
      });
    },

    remove({
      commit,
      dispatch
    }, user) {
      commit('cml/sync/start', 'usersRemove', {
        root: true
      });
      return api.deleteUser(user.id).then(r => {
        commit('cml/sync/stop', 'usersRemove', {
          root: true
        });
        commit('remove', user);
        commit('cml/corpus/userRemove', user.id, {
          root: true
        });
        dispatch('cml/messages/success', 'User removed', {
          root: true
        });
        return r;
      }).catch(e => {
        commit('cml/sync/stop', 'usersRemove', {
          root: true
        });
        const error = e.response ? e.response.body.error : 'Network error';
        dispatch('cml/messages/error', error, {
          root: true
        });
        throw error;
      });
    },

    get({
      commit
    }, userId) {
      commit('cml/sync/start', 'usersGet', {
        root: true
      });
      return api.getUser(userId).then(r => {
        commit('cml/sync/stop', 'usersRemove', {
          root: true
        });
        const user = userFormat(r);
        return user;
      }).catch(e => {
        commit('cml/sync/stop', 'usersRemove', {
          root: true
        });
        console.log(e);
        throw e;
      });
    },

    list({
      commit
    }) {
      commit('cml/sync/start', 'usersList', {
        root: true
      });
      return api.getUsers().then(r => {
        commit('cml/sync/stop', 'usersList', {
          root: true
        });
        const users = r.map(user => userFormat(user));
        commit('list', users);
        return users;
      }).catch(e => {
        commit('cml/sync/stop', 'usersList', {
          root: true
        });
        console.log(e);
        throw e;
      });
    }

  },
  getters: {
    permissions: state => permissions => {
      return state.list.reduce((res, element) => Object.assign(res, {
        [element.id]: permissions && permissions[element.id] ? permissions[element.id] : 0
      }), {});
    }
  },
  mutations: {
    reset(state) {
      state.list = [];
    },

    add(state, user) {
      const userExisting = state.list.find(u => u.id === user.id);

      if (!userExisting) {
        state.list.push(user);
      }
    },

    update(state, user) {
      Object.assign(state.list.find(u => u.id === user.id), user);
    },

    remove(state, user) {
      const index = state.list.findIndex(u => u.id === user.id);

      if (index !== -1) {
        state.list.splice(index, 1);
      }
    },

    list(state, users) {
      state.list = users;
    }

  }
};

var groups = {
  namespaced: true,
  state: {
    list: []
  },
  actions: {
    add({
      commit,
      dispatch,
      state,
      rootState
    }, group) {
      commit('cml/sync/start', 'groupsAdd', {
        root: true
      });
      return api.createGroup(group.name, group.description).then(r => {
        commit('cml/sync/stop', 'groupsAdd', {
          root: true
        });
        const group = groupFormat(r);
        commit('add', group);
        commit('cml/corpus/groupAdd', group.id, {
          root: true
        });
        dispatch('cml/messages/success', 'Group added', {
          root: true
        });
        return group;
      }).catch(e => {
        commit('cml/sync/stop', 'groupsAdd', {
          root: true
        });
        console.log(e);
        const error = e.response ? e.response.body.error : 'Network error';
        dispatch('cml/messages/error', error, {
          root: true
        });
        throw error;
      });
    },

    remove({
      commit,
      dispatch,
      state,
      rootState
    }, group) {
      commit('cml/sync/start', 'groupsRemove', {
        root: true
      });
      return api.deleteGroup(group.id).then(r => {
        commit('cml/sync/stop', 'groupsRemove', {
          root: true
        });
        commit('remove', group);
        commit('cml/corpus/groupRemove', group.id, {
          root: true
        });
        dispatch('cml/messages/success', 'Group removed', {
          root: true
        });
        return group.id;
      }).catch(e => {
        commit('cml/sync/stop', 'groupsRemove', {
          root: true
        });
        console.log(e);
        dispatch('cml/messages/error', e, {
          root: true
        });
        throw e;
      });
    },

    update({
      commit,
      dispatch,
      state,
      rootState
    }, group) {
      commit('cml/sync/start', 'groupsUpdate', {
        root: true
      });
      return api.updateGroup(group.id, {
        description: group.description
      }).then(r => {
        commit('cml/sync/stop', 'groupsUpdate', {
          root: true
        });
        const group = groupFormat(r);
        commit('update', group);
        dispatch('cml/messages/success', 'Group updated', {
          root: true
        });
        return group;
      }).catch(e => {
        commit('cml/sync/stop', 'groupsUpdate', {
          root: true
        });
        const error = e.response ? e.response.body.error : 'Network error';
        dispatch('cml/messages/error', error, {
          root: true
        });
        throw error;
      });
    },

    get({
      commit,
      dispatch,
      state,
      rootState
    }, groupId) {
      commit('cml/sync/start', 'groupsGet', {
        root: true
      });
      return api.getGroup(groupId).then(r => {
        commit('cml/sync/stop', 'groupsGet', {
          root: true
        });
        const group = groupFormat(r);
        return group;
      }).catch(e => {
        commit('cml/sync/stop', 'groupsGet', {
          root: true
        });
        console.log(e);
        throw e;
      });
    },

    list({
      commit,
      dispatch,
      state,
      rootState
    }) {
      commit('cml/sync/start', 'groupsList', {
        root: true
      });
      return api.getGroups().then(r => {
        commit('cml/sync/stop', 'groupsList', {
          root: true
        });
        const groups = r.map(group => groupFormat(group));
        commit('list', groups);
        return groups;
      }).catch(e => {
        commit('cml/sync/stop', 'groupsList', {
          root: true
        });
        console.log(e);
        throw e;
      });
    },

    userAdd({
      commit,
      dispatch,
      state,
      rootState
    }, {
      user,
      group
    }) {
      commit('cml/sync/start', 'groupsUserAdd', {
        root: true
      });
      return api.addUserToGroup(user.id, group.id).then(r => {
        commit('cml/sync/stop', 'groupsUserAdd', {
          root: true
        });
        const group = groupFormat(r);
        commit('update', group);
        dispatch('cml/messages/success', 'User added to group', {
          root: true
        });

        if (user.id === rootState.cml.user.id) {
          commit('cml/user/groupAdd', group.id, {
            root: true
          });
          dispatch('cml/corpus/list', null, {
            root: true
          });
        }

        return group;
      }).catch(e => {
        commit('cml/sync/stop', 'groupsUserAdd', {
          root: true
        });
        const error = e.response ? e.response.body.error : 'Network error';
        dispatch('cml/messages/error', error, {
          root: true
        });
        throw error;
      });
    },

    userRemove({
      commit,
      dispatch,
      state,
      rootState
    }, {
      user,
      group
    }) {
      commit('cml/sync/start', 'groupsUserRemove', {
        root: true
      });
      return api.removeUserFromGroup(user.id, group.id).then(r => {
        commit('cml/sync/stop', 'groupsUserRemove', {
          root: true
        });
        const group = groupFormat(r);
        commit('update', group);
        dispatch('cml/messages/success', 'User removed from group', {
          root: true
        });

        if (user.id === rootState.cml.user.id) {
          commit('cml/user/groupRemove', group.id, {
            root: true
          });
          dispatch('cml/corpus/list', null, {
            root: true
          });
        }

        return group;
      }).catch(e => {
        commit('cml/sync/stop', 'groupsUserRemove', {
          root: true
        });
        const error = e.response ? e.response.body.error : 'Network error';
        dispatch('cml/messages/error', error, {
          root: true
        });
        throw error;
      });
    }

  },
  getters: {
    permissions: state => permissions => {
      return state.list.reduce((res, element) => Object.assign(res, {
        [element.id]: permissions && permissions[element.id] ? permissions[element.id] : 0
      }), {});
    }
  },
  mutations: {
    reset(state) {
      state.list = [];
    },

    add(state, group) {
      console.log('group add', group);
      const groupExisting = state.list.find(g => g.id === group.id);

      if (!groupExisting) {
        state.list.push(group);
      }
    },

    update(state, group) {
      Object.assign(state.list.find(g => g.id === group.id), group);
    },

    remove(state, group) {
      const index = state.list.findIndex(g => g.id === group.id);

      if (index !== -1) {
        state.list.splice(index, 1);
      }
    },

    list(state, groups) {
      state.list = groups;
    }

  }
};

var corpus = {
  namespaced: true,
  state: {
    list: [],
    id: ''
  },
  actions: {
    add({
      commit,
      dispatch,
      rootState,
      rootGetters
    }, corpus) {
      commit('cml/sync/start', 'corpusAdd', {
        root: true
      });
      return api.createCorpus(corpus.name, corpus.description, {}).then(r => {
        commit('cml/sync/stop', 'corpusAdd', {
          root: true
        });
        const corpu = {
          name: r.name,
          id: r._id,
          permission: 3,
          permissions: {
            users: rootGetters['cml/users/permissions']({}),
            groups: rootGetters['cml/groups/permissions']({})
          },
          description: r.description
        };
        corpu.permissions.users[rootState.cml.user.id] = 3;
        commit('add', corpu);
        dispatch('cml/messages/success', 'Corpus added.', {
          root: true
        });
        dispatch('set', corpu.id);
        return r;
      }).catch(e => {
        commit('cml/sync/stop', 'corpusAdd', {
          root: true
        });
        const error = e.response ? e.response.body.error : 'Network error';
        dispatch('cml/messages/error', error, {
          root: true
        });
        throw e;
      });
    },

    remove({
      commit,
      dispatch,
      state,
      rootState
    }, corpu) {
      commit('cml/sync/start', 'corpusRemove', {
        root: true
      });
      return api.deleteCorpus(corpu.id).then(r => {
        commit('cml/sync/stop', 'corpusRemove', {
          root: true
        });
        commit('remove', corpu);
        dispatch('cml/messages/success', 'Corpus removed', {
          root: true
        });

        if (state.id === corpu.id) {
          dispatch('set');
        }

        return r;
      }).catch(e => {
        commit('cml/sync/stop', 'corpusRemove', {
          root: true
        });
        console.log(e);
        dispatch('cml/messages/error', e, {
          root: true
        });
        throw e;
      });
    },

    update({
      commit,
      dispatch,
      state,
      rootState
    }, corpu) {
      commit('cml/sync/start', 'corpusUpdate', {
        root: true
      });
      return api.updateCorpus(corpu.id, {
        name: corpu.name,
        description: corpu.description
      }).then(r => {
        commit('cml/sync/stop', 'corpusUpdate', {
          root: true
        });
        console.log('corpus update', r);
        corpu.name = r.name;
        corpu.description = r.description || {};
        commit('update', corpu);
        dispatch('cml/messages/success', 'Corpus updated', {
          root: true
        });
        return r;
      }).catch(e => {
        commit('cml/sync/stop', 'corpusUpdate', {
          root: true
        });
        console.log(e);
        dispatch('cml/messages/error', e, {
          root: true
        });
        throw e;
      });
    },

    list({
      commit,
      dispatch,
      rootState,
      rootGetters
    }) {
      commit('cml/sync/start', 'corpusList', {
        root: true
      });
      return api.getCorpora().then(r => {
        commit('cml/sync/stop', 'corpusList', {
          root: true
        });
        const corpus = r.map(c => ({
          name: c.name,
          id: c._id,
          description: c.description || {},
          permission: rootGetters['cml/user/permission'](c.permissions),
          permissions: {
            users: rootGetters['cml/users/permissions'](c.permissions && c.permissions.users || {}),
            groups: rootGetters['cml/groups/permissions'](c.permissions && c.permissions.groups || {})
          }
        }));
        commit('list', corpus);
        dispatch('set');
        return corpus;
      }).catch(e => {
        commit('cml/sync/stop', 'corpusList', {
          root: true
        });
        console.log(e);
        throw e;
      });
    },

    groupPermissionSet({
      commit,
      dispatch,
      rootState
    }, {
      corpuId,
      groupId,
      permission
    }) {
      commit('cml/sync/start', 'corpusGroupPermissionSet', {
        root: true
      });
      return api.setCorpusPermissionsForGroup(corpuId, groupId, permission).then(p => {
        commit('cml/sync/stop', 'corpusGroupPermissionSet', {
          root: true
        });
        commit('groupPermissionsUpdate', {
          corpuId,
          groupId,
          permission: p.groups && p.groups[groupId] || 0
        });
        dispatch('cml/messages/success', 'Group permissions updated', {
          root: true
        });

        if (rootState.cml.user.groupIds.indexOf(groupId) !== -1) {
          dispatch('currentUserIsAdminTest', p);
        }

        return p;
      }).catch(e => {
        commit('cml/sync/stop', 'corpusGroupPermissionSet', {
          root: true
        });
        const error = e.response ? e.response.body.error : 'Network error';
        dispatch('cml/messages/error', error, {
          root: true
        });
        throw error;
      });
    },

    groupPermissionRemove({
      commit,
      dispatch,
      rootState
    }, {
      corpuId,
      groupId
    }) {
      commit('cml/sync/start', 'corpusGroupPermissionRemove', {
        root: true
      });
      return api.removeCorpusPermissionsForGroup(corpuId, groupId).then(p => {
        commit('cml/sync/stop', 'corpusGroupPermissionRemove', {
          root: true
        });
        commit('groupPermissionsUpdate', {
          corpuId,
          groupId,
          permission: 0
        });
        dispatch('cml/messages/success', 'Group permissions updated', {
          root: true
        });

        if (rootState.cml.user.groupIds.indexOf(groupId) !== -1) {
          dispatch('currentUserIsAdminTest', p);
        }

        return p;
      }).catch(e => {
        commit('cml/sync/stop', 'corpusGroupPermissionRemove', {
          root: true
        });
        const error = e.response ? e.response.body.error : 'Network error';
        dispatch('cml/messages/error', error, {
          root: true
        });
        throw error;
      });
    },

    userPermissionSet({
      commit,
      dispatch,
      rootState
    }, {
      corpuId,
      userId,
      permission
    }) {
      commit('cml/sync/start', 'corpusUserPermissionSet', {
        root: true
      });
      return api.setCorpusPermissionsForUser(corpuId, userId, permission).then(p => {
        commit('cml/sync/stop', 'corpusUserPermissionSet', {
          root: true
        });
        commit('userPermissionsUpdate', {
          corpuId,
          userId,
          permission: p.users && p.users[userId] || 0
        });
        dispatch('cml/messages/success', 'User permissions updated', {
          root: true
        });

        if (userId === rootState.cml.user.id) {
          dispatch('currentUserIsAdminTest', p);
        }

        return p;
      }).catch(e => {
        commit('cml/sync/stop', 'corpusUserPermissionSet', {
          root: true
        });
        const error = e.response ? e.response.body.error : 'Network error';
        dispatch('cml/messages/error', error, {
          root: true
        });
        throw error;
      });
    },

    userPermissionRemove({
      commit,
      dispatch,
      rootState
    }, {
      corpuId,
      userId
    }) {
      commit('cml/sync/start', 'corpusUserPermissionRemove', {
        root: true
      });
      return api.removeCorpusPermissionsForUser(corpuId, userId).then(p => {
        commit('cml/sync/stop', 'corpusUserPermissionRemove', {
          root: true
        });
        commit('userPermissionsUpdate', {
          corpuId,
          userId,
          permission: 0
        });
        dispatch('cml/messages/success', 'User permissions updated', {
          root: true
        });

        if (userId === rootState.cml.user.id) {
          dispatch('currentUserIsAdminTest', p);
        }

        return p;
      }).catch(e => {
        commit('cml/sync/stop', 'corpusUserPermissionRemove', {
          root: true
        });
        const error = e.response ? e.response.body.error : 'Network error';
        dispatch('cml/messages/error', error, {
          root: true
        });
        throw error;
      });
    },

    currentUserIsAdminTest({
      dispatch,
      commit,
      rootGetters
    }, permissions) {
      if (!rootGetters['cml/user/isAdmin'](permissions)) {
        dispatch('list');
        commit(`cml/popup/close`, null, {
          root: true
        });
      }
    },

    set({
      state,
      getters,
      dispatch,
      commit
    }, corpuId) {
      commit('set', getters.id(corpuId));

      if (state.id) {
        dispatch('cml/medias/list', state.id, {
          root: true
        });
        dispatch('cml/layers/list', state.id, {
          root: true
        });
      } else {
        commit('cml/medias/reset', null, {
          root: true
        });
        commit('cml/layers/reset', null, {
          root: true
        });
      }
    }

  },
  getters: {
    id: state => id => id || state.list.map(c => c.id).indexOf(state.id) !== -1 && state.id || state.list[0] && state.list[0].id || null
  },
  mutations: {
    reset(state) {
      state.list = [];
    },

    add(state, corpu) {
      const corpuExisting = state.list.find(c => c.id === corpu.id);

      if (!corpuExisting) {
        state.list.push(corpu);
      }
    },

    update(state, corpu) {
      Object.assign(state.list.find(c => c.id === corpu.id), corpu);
    },

    remove(state, corpu) {
      const index = state.list.findIndex(c => c.id === corpu.id);

      if (index !== -1) {
        state.list.splice(index, 1);
      }
    },

    list(state, corpus) {
      state.list = corpus;
    },

    set(state, corpuId) {
      state.id = corpuId;
    },

    groupAdd(state, groupId) {
      state.list.forEach(corpu => {
        Vue.set(corpu.permissions.groups, groupId, 0);
      });
    },

    groupRemove(state, groupId) {
      state.list.forEach(corpu => {
        delete corpu.permissions.groups[groupId];
      });
    },

    userAdd(state, userId) {
      state.list.forEach(corpu => {
        Vue.set(corpu.permissions.users, userId, 0);
      });
    },

    userRemove(state, userId) {
      state.list.forEach(corpu => {
        delete corpu.permissions.users[userId];
      });
    },

    groupPermissionsUpdate(state, {
      corpuId,
      groupId,
      permission
    }) {
      const corpu = state.list.find(c => c.id === corpuId);
      corpu.permissions.groups[groupId] = permission;
    },

    userPermissionsUpdate(state, {
      corpuId,
      userId,
      permission
    }) {
      const corpu = state.list.find(c => c.id === corpuId);
      corpu.permissions.users[userId] = permission;
    },

    corpuPermissionsUpdate(state, {
      corpu,
      permission
    }) {
      corpu.permission = permission;
    }

  }
};

var medias = {
  namespaced: true,
  state: {
    list: [],
    id: null
  },
  actions: {
    add({
      commit,
      dispatch,
      state,
      rootState
    }, {
      corpuId,
      name,
      url,
      description
    }) {
      commit('cml/sync/start', 'mediasAdd', {
        root: true
      });
      return api.createMedium(corpuId, name, url, description).then(r => {
        commit('cml/sync/stop', 'mediasAdd', {
          root: true
        });
        const media = mediaFormat(r);
        commit('add', media);
        dispatch('cml/messages/success', 'Medium added.', {
          root: true
        });
        dispatch('set', media.id);
        return media;
      }).catch(e => {
        commit('cml/sync/stop', 'mediasAdd', {
          root: true
        });
        console.log(e);
        const error = e.response ? e.response.body.error : 'Network error';
        dispatch('cml/messages/error', error, {
          root: true
        });
        throw e;
      });
    },

    remove({
      commit,
      dispatch,
      state,
      rootState
    }, media) {
      commit('cml/sync/start', 'mediasRemove', {
        root: true
      });
      return api.deleteMedium(media.id).then(r => {
        commit('cml/sync/stop', 'mediasRemove', {
          root: true
        });
        commit('remove', media);
        dispatch('cml/messages/success', 'Medium removed', {
          root: true
        });
        return r;
      }).catch(e => {
        console.log(e);
        dispatch('cml/messages/error', e, {
          root: true
        });
        throw e;
      });
    },

    update({
      commit,
      dispatch,
      state,
      rootState
    }, media) {
      commit('cml/sync/start', 'mediasUpdate', {
        root: true
      });
      return api.updateMedium(media.id, {
        name: media.name,
        description: media.description,
        url: media.url
      }).then(r => {
        commit('cml/sync/stop', 'mediasUpdate', {
          root: true
        });
        media.name = r.name;
        media.url = r.url;
        media.description = r.description || {};
        commit('update', media);
        dispatch('cml/messages/success', 'Medium updated', {
          root: true
        });
        return r;
      }).catch(e => {
        console.log(e);
        dispatch('cml/messages/error', e, {
          root: true
        });
        throw e;
      });
    },

    list({
      state,
      dispatch,
      commit,
      rootState,
      rootGetters
    }, corpuId) {
      commit('cml/sync/start', 'mediasList', {
        root: true
      });
      return api.getMedia({
        filter: {
          id_corpus: corpuId
        }
      }).then(r => {
        commit('cml/sync/stop', 'mediasList', {
          root: true
        });
        const medias = r.map(media => {
          return mediaFormat(media);
        });
        commit('list', medias);
        dispatch('set');
        return medias;
      }).catch(e => {
        commit('cml/sync/stop', 'mediasList', {
          root: true
        });
        console.log(e);
        throw e;
      });
    },

    set({
      getters,
      commit
    }, mediaId) {
      commit('set', getters.id(mediaId));
    }

  },
  getters: {
    id: state => id => id || state.list.map(c => c.id).indexOf(state.id) !== -1 && state.id || state.list[0] && state.list[0].id || null
  },
  mutations: {
    reset(state) {
      state.list = [];
    },

    add(state, media) {
      const mediaExisting = state.list.find(c => c.id === media.id);

      if (!mediaExisting) {
        state.list.push(media);
      }
    },

    update(state, media) {
      Object.assign(state.list.find(c => c.id === media.id), media);
    },

    remove(state, media) {
      const index = state.list.findIndex(c => c.id === media.id);

      if (index !== -1) {
        state.list.splice(index, 1);
      }
    },

    list(state, medias) {
      state.list = medias;
    },

    set(state, id) {
      state.id = id;
    }

  }
};

var layers = {
  namespaced: true,
  state: {
    list: [],
    id: null
  },
  actions: {
    add({
      commit,
      dispatch,
      rootState,
      rootGetters
    }, {
      corpuId,
      name,
      description,
      fragmentType,
      metadataType,
      annotations
    }) {
      commit('cml/sync/start', 'layersAdd', {
        root: true
      });
      return api.createLayer(corpuId, name, description, fragmentType, metadataType, annotations).then(r => {
        commit('cml/sync/stop', 'layersAdd', {
          root: true
        });
        const layer = {
          name: r.name,
          id: r._id,
          permission: 3,
          permissions: {
            users: rootGetters['cml/users/permissions']({}),
            groups: rootGetters['cml/groups/permissions']({})
          },
          description: r.description || {},
          fragmentType: r.fragment_type || {},
          metadataType: r.data_type || {},
          annotations: r.annotations
        };
        layer.permissions.users[rootState.cml.user.id] = 3;
        commit('add', layer);
        dispatch('cml/messages/success', 'Layer added.', {
          root: true
        });
        dispatch('set', layer.id);
        return layer;
      }).catch(e => {
        commit('cml/sync/stop', 'layersAdd', {
          root: true
        });
        console.log(e);
        const error = e.response ? e.response.body.error : 'Network error';
        dispatch('cml/messages/error', error, {
          root: true
        });
        throw e;
      });
    },

    remove({
      commit,
      dispatch,
      state,
      rootState
    }, layer) {
      commit('cml/sync/start', 'layersRemove', {
        root: true
      });
      return api.deleteLayer(layer.id).then(r => {
        commit('cml/sync/stop', 'layersRemove', {
          root: true
        });
        commit('remove', layer);
        dispatch('cml/messages/success', 'Layer removed', {
          root: true
        });
        return r;
      }).catch(e => {
        console.log(e);
        dispatch('cml/messages/error', e, {
          root: true
        });
        throw e;
      });
    },

    update({
      commit,
      dispatch,
      state,
      rootState
    }, layer) {
      commit('cml/sync/start', 'layersUpdate', {
        root: true
      });
      return api.updateLayer(layer.id, {
        name: layer.name,
        description: layer.description,
        fragment_type: layer.fragmentType,
        data_type: layer.metadataType
      }).then(r => {
        commit('cml/sync/stop', 'layersUpdate', {
          root: true
        });
        layer.description = r.description || {};
        layer.fragmentType = r.fragment_type || {};
        layer.metadataType = r.data_type || {};
        commit('update', layer);
        dispatch('cml/messages/success', 'Layer updated', {
          root: true
        });
        return r;
      }).catch(e => {
        console.log(e);
        dispatch('cml/messages/error', e, {
          root: true
        });
        throw e;
      });
    },

    list({
      dispatch,
      commit,
      rootGetters
    }, corpuId) {
      commit('cml/sync/start', 'layersList', {
        root: true
      });
      return api.getLayers({
        filter: {
          id_corpus: corpuId
        }
      }).then(r => {
        commit('cml/sync/stop', 'layersList', {
          root: true
        });
        const layers = r.map(l => ({
          name: l.name,
          id: l._id,
          description: l.description || {},
          permission: rootGetters['cml/user/permission'](l.permissions),
          permissions: {
            users: rootGetters['cml/users/permissions'](l.permissions && l.permissions.users || {}),
            groups: rootGetters['cml/groups/permissions'](l.permissions && l.permissions.groups || {})
          },
          fragmentType: l.fragment_type || {},
          metadataType: l.data_type || {},
          annotations: l.annotations || []
        }));
        commit('list', layers);
        dispatch('set');
        return layers;
      }).catch(e => {
        commit('cml/sync/stop', 'layersList', {
          root: true
        });
        console.log(e);
        throw e;
      });
    },

    groupPermissionSet({
      commit,
      dispatch,
      rootState
    }, {
      layerId,
      groupId,
      permission
    }) {
      commit('cml/sync/start', 'layersGroupPermissionSet', {
        root: true
      });
      return api.setLayerPermissionsForGroup(layerId, groupId, permission).then(p => {
        commit('cml/sync/stop', 'layersGroupPermissionSet', {
          root: true
        });
        commit('groupPermissionsUpdate', {
          layerId,
          groupId,
          permission: p.groups && p.groups[groupId] || 0
        });
        dispatch('cml/messages/success', 'Group permissions updated', {
          root: true
        });

        if (rootState.cml.user.groupIds.indexOf(groupId) !== -1) {
          dispatch('currentUserIsAdminTest', p);
        }

        return p;
      }).catch(e => {
        commit('cml/sync/stop', 'layersGroupPermissionSet', {
          root: true
        });
        const error = e.response ? e.response.body.error : 'Network error';
        dispatch('cml/messages/error', error, {
          root: true
        });
        throw error;
      });
    },

    groupPermissionRemove({
      commit,
      dispatch,
      rootState
    }, {
      layerId,
      groupId
    }) {
      commit('cml/sync/start', 'layersGroupPermissionRemove', {
        root: true
      });
      return api.removeLayerPermissionsForGroup(layerId, groupId).then(p => {
        commit('cml/sync/stop', 'layersGroupPermissionRemove', {
          root: true
        });
        commit('groupPermissionsUpdate', {
          layerId,
          groupId,
          permission: 0
        });
        dispatch('cml/messages/success', 'Group permissions updated', {
          root: true
        });

        if (rootState.cml.user.groupIds.indexOf(groupId) !== -1) {
          dispatch('currentUserIsAdminTest', p);
        }

        return p;
      }).catch(e => {
        commit('cml/sync/stop', 'layersGroupPermissionRemove', {
          root: true
        });
        const error = e.response ? e.response.body.error : 'Network error';
        dispatch('cml/messages/error', error, {
          root: true
        });
        throw error;
      });
    },

    userPermissionSet({
      commit,
      dispatch,
      rootState
    }, {
      layerId,
      userId,
      permission
    }) {
      commit('cml/sync/start', 'layersUserPermissionSet', {
        root: true
      });
      return api.setLayerPermissionsForUser(layerId, userId, permission).then(p => {
        commit('cml/sync/stop', 'layersUserPermissionSet', {
          root: true
        });
        commit('userPermissionsUpdate', {
          layerId,
          userId,
          permission: p.users && p.users[userId] || 0
        });
        dispatch('cml/messages/success', 'User permissions updated', {
          root: true
        });

        if (userId === rootState.cml.user.id) {
          dispatch('currentUserIsAdminTest', p);
        }

        return p;
      }).catch(e => {
        commit('cml/sync/stop', 'layersUserPermissionSet', {
          root: true
        });
        const error = e.response ? e.response.body.error : 'Network error';
        dispatch('cml/messages/error', error, {
          root: true
        });
        throw error;
      });
    },

    userPermissionRemove({
      commit,
      dispatch,
      rootState
    }, {
      layerId,
      userId
    }) {
      commit('cml/sync/start', 'layersUserPermissionRemove', {
        root: true
      });
      return api.removeLayerPermissionsForUser(layerId, userId).then(p => {
        commit('cml/sync/stop', 'layersUserPermissionRemove', {
          root: true
        });
        commit('userPermissionsUpdate', {
          layerId,
          userId,
          permission: 0
        });
        dispatch('cml/messages/success', 'User permissions updated', {
          root: true
        });

        if (userId === rootState.cml.user.id) {
          dispatch('currentUserIsAdminTest', p);
        }

        return p;
      }).catch(e => {
        commit('cml/sync/stop', 'layersUserPermissionRemove', {
          root: true
        });
        const error = e.response ? e.response.body.error : 'Network error';
        dispatch('cml/messages/error', error, {
          root: true
        });
        throw error;
      });
    },

    currentUserIsAdminTest({
      dispatch,
      commit,
      rootState,
      rootGetters
    }, permissions) {
      if (!rootGetters['cml/user/isAdmin'](permissions)) {
        dispatch('list', rootState.cml.corpus.id);
        commit(`cml/popup/close`, null, {
          root: true
        });
      }
    },

    set({
      state,
      getters,
      dispatch,
      commit
    }, layerId) {
      commit('set', getters.id(layerId));

      if (state.id) {
        dispatch('cml/annotations/list', state.id, {
          root: true
        });
      } else {
        commit('cml/annotations/reset', null, {
          root: true
        });
      }
    }

  },
  getters: {
    id: state => id => id || state.list.map(c => c.id).indexOf(state.id) !== -1 && state.id || state.list[0] && state.list[0].id || null
  },
  mutations: {
    reset(state) {
      state.list = [];
    },

    add(state, layer) {
      const layerExisting = state.list.find(c => c.id === layer.id);

      if (!layerExisting) {
        state.list.push(layer);
      }
    },

    update(state, layer) {
      Object.assign(state.list.find(c => c.id === layer.id), layer);
    },

    remove(state, layer) {
      const index = state.list.findIndex(c => c.id === layer.id);

      if (index !== -1) {
        state.list.splice(index, 1);
      }
    },

    list(state, layers) {
      state.list = layers;
    },

    set(state, id) {
      state.id = id;
    },

    groupPermissionsUpdate(state, {
      layerId,
      groupId,
      permission
    }) {
      const layer = state.list.find(c => c.id === layerId);
      layer.permissions.groups[groupId] = permission;
    },

    userPermissionsUpdate(state, {
      layerId,
      userId,
      permission
    }) {
      const layer = state.list.find(c => c.id === layerId);
      layer.permissions.users[userId] = permission;
    },

    layerPermissionsUpdate(state, {
      layer,
      permission
    }) {
      layer.permission = permission;
    }

  }
};

var annotations = {
  namespaced: true,
  state: {
    list: [],
    id: null
  },
  actions: {
    add({
      commit,
      dispatch,
      state,
      rootState
    }, {
      layerId,
      mediaId,
      fragment,
      data
    }) {
      commit('cml/sync/start', 'annotationsAdd', {
        root: true
      });
      return api.createAnnotation(layerId, mediaId, fragment, data).then(r => {
        commit('cml/sync/stop', 'annotationsAdd', {
          root: true
        });
        const annotation = {
          id: r._id,
          fragment: r.fragment || {},
          metadata: r.data || {},
          layerId: r.id_layer,
          mediaId: r.id_medium || null
        };
        commit('add', annotation);
        dispatch('cml/messages/success', 'Annotation added.', {
          root: true
        });
        dispatch('set', annotation.id);
        return annotation;
      }).catch(e => {
        commit('cml/sync/stop', 'annotationsAdd', {
          root: true
        });
        console.log(e);
        const error = e.response ? e.response.body.error : 'Network error';
        dispatch('cml/messages/error', error, {
          root: true
        });
        throw e;
      });
    },

    remove({
      commit,
      dispatch,
      state,
      rootState
    }, annotation) {
      commit('cml/sync/start', 'annotationsRemove', {
        root: true
      });
      return api.deleteAnnotation(annotation.id).then(r => {
        commit('cml/sync/stop', 'annotationsRemove', {
          root: true
        });
        commit('remove', annotation);
        dispatch('cml/messages/success', 'Annotation removed', {
          root: true
        });
        return r;
      }).catch(e => {
        console.log(e);
        dispatch('cml/messages/error', e, {
          root: true
        });
        throw e;
      });
    },

    update({
      commit,
      dispatch,
      state,
      rootState
    }, annotation) {
      commit('cml/sync/start', 'annotationsUpdate', {
        root: true
      });
      return api.updateAnnotation(annotation.id, {
        fragment: annotation.fragment,
        metadata: annotation.data
      }).then(r => {
        commit('cml/sync/stop', 'annotationsUpdate', {
          root: true
        });
        commit('update', annotation);
        dispatch('cml/messages/success', 'Annotation updated', {
          root: true
        });
        return r;
      }).catch(e => {
        console.log(e);
        dispatch('cml/messages/error', e, {
          root: true
        });
        throw e;
      });
    },

    list({
      state,
      dispatch,
      commit,
      rootState,
      rootGetters
    }, layerId) {
      commit('cml/sync/start', 'annotationsList', {
        root: true
      });
      return api.getAnnotations({
        filter: {
          id_layer: layerId
        }
      }).then(r => {
        commit('cml/sync/stop', 'annotationsList', {
          root: true
        });
        const annotations = r.map(a => ({
          id: a._id,
          fragment: a.fragment || {},
          metadata: a.data || {},
          layerId: a.id_layer,
          mediaId: a.id_medium || null
        }));
        commit('list', annotations);
        dispatch('set');
        return annotations;
      }).catch(e => {
        commit('cml/sync/stop', 'annotationsList', {
          root: true
        });
        console.log(e);
        throw e;
      });
    },

    set({
      getters,
      commit
    }, annotationId) {
      if (getters.id(annotationId)) {
        commit('set', getters.id(annotationId));
      }
    }

  },
  getters: {
    id: state => id => id || state.list.map(c => c.id).indexOf(state.id) !== -1 && state.id || state.list[0] && state.list[0].id || null
  },
  mutations: {
    reset(state) {
      state.list = [];
    },

    add(state, annotation) {
      const annotationExisting = state.list.find(c => c.id === annotation.id);

      if (!annotationExisting) {
        state.list.push(annotation);
      }
    },

    update(state, annotation) {
      Object.assign(state.list.find(c => c.id === annotation.id), annotation);
    },

    remove(state, annotation) {
      const index = state.list.findIndex(c => c.id === annotation.id);

      if (index !== -1) {
        state.list.splice(index, 1);
      }
    },

    list(state, annotations) {
      state.list = annotations;
    },

    set(state, id) {
      state.id = id;
    }

  }
};

Vue.use(Vuex);
var store = new Vuex.Store({
  modules: {
    cml: {
      namespaced: true,
      modules: {
        viewport,
        sync,
        popup,
        dropdown,
        messages,
        user,
        users,
        groups,
        corpus,
        medias,
        layers,
        annotations
      },
      state: {
        config: config
      },
      actions: {
        set({
          dispatch
        }) {
          Promise.all([new Promise((resolve, reject) => dispatch('cml/users/list', null, {
            root: true
          }).then(r => resolve(r)).catch(e => reject(e))), new Promise((resolve, reject) => dispatch('cml/groups/list', null, {
            root: true
          }).then(r => resolve(r)).catch(e => reject(e)))]).then(res => {
            dispatch('cml/corpus/list', null, {
              root: true
            });
          });
        },

        reset({
          commit
        }) {
          commit('delete');
          commit('cml/user/reset', null, {
            root: true
          });
          commit('cml/users/reset', null, {
            root: true
          });
          commit('cml/groups/reset', null, {
            root: true
          });
          commit('cml/corpus/reset', null, {
            root: true
          });
          commit('cml/medias/reset', null, {
            root: true
          });
          commit('cml/layers/reset', null, {
            root: true
          });
        },

        sync({
          dispatch
        }) {
          dispatch('cml/users/list', null, {
            root: true
          });
          dispatch('cml/groups/list', null, {
            root: true
          });
          dispatch('cml/corpus/list', null, {
            root: true
          });
        }

      },
      mutations: {
        delete(state) {
          state.url = '';
          state.api = null;
        }

      }
    }
  }
});

var debug = {
  render: function render() {
    var _vm = this;

    var _h = _vm.$createElement;

    var _c = _vm._self._c || _h;

    return _vm.visible ? _c('pre', [_c('code', [_vm._v(_vm._s(_vm.state))])]) : _vm._e();
  },
  staticRenderFns: [],
  _scopeId: 'data-v-5a8a2715',
  name: 'camomile-utils-debug',

  data() {
    return {
      visible: false
    };
  },

  computed: {
    state() {
      return this.$store.state.cml.popup;
    }

  },
  methods: {
    keydown(e) {
      if (e.keyCode >= 65 && e.keyCode <= 90) {
        const char = (e.metaKey ? 'meta-' : '') + e.keyCode;

        if (char === 'meta-69') {
          this.visible = !this.visible;
        }
      }
    }

  },

  created() {
    document.addEventListener('keydown', this.keydown);
  },

  beforeDestroy() {
    document.removeEventListener('keydown', this.keydown);
  }

};

var viewport$1 = {
  render: function render() {
    var _vm = this;

    var _h = _vm.$createElement;

    var _c = _vm._self._c || _h;

    return _c('div');
  },
  staticRenderFns: [],
  _scopeId: 'data-v-24d69054',
  name: 'camomile-utils-viewport',
  methods: {
    resize() {
      return this.$store.dispatch('cml/viewport/set');
    }

  },

  mounted() {
    window.addEventListener('resize', this.resize);
    this.resize();
  }

};

var cmlDropdown = {
  render: function render() {
    var _vm = this;

    var _h = _vm.$createElement;

    var _c = _vm._self._c || _h;

    return _c('transition', {
      attrs: {
        "name": "transition-top"
      }
    }, [_vm.dropdown.visible ? _c('div', {
      staticClass: "absolute full bg-alpha",
      on: {
        "click": function click($event) {
          if ($event.target !== $event.currentTarget) {
            return null;
          }

          _vm.close($event);
        }
      }
    }, [_c('div', {
      staticClass: "container relative"
    }, [_c(_vm.dropdown.config.component, {
      tag: "component"
    })], 1)]) : _vm._e()]);
  },
  staticRenderFns: [],
  name: 'camomile-utils-dropdown',
  computed: {
    dropdown() {
      return this.$store.state.cml.dropdown;
    }

  },
  methods: {
    close() {
      this.$store.commit('cml/dropdown/close');
    }

  }
};

var cmlPopup = {
  render: function render() {
    var _vm = this;

    var _h = _vm.$createElement;

    var _c = _vm._self._c || _h;

    return _c('div', [_c('div', {
      staticClass: "absolute full bg-alpha",
      on: {
        "click": _vm.close
      }
    }), _vm._v(" "), _c('div', {
      staticClass: "pophover absolute full bg-alt p-l pb-s"
    }, [_c('div', {
      staticClass: "flex flex-start"
    }, [_c('h2', [_vm._v(_vm._s(_vm.config.title))]), _vm._v(" "), _vm.config.closeBtn ? _c('button', {
      staticClass: "flex-right btn p-s mt--m",
      on: {
        "click": _vm.close
      }
    }, [_c('i', {
      staticClass: "icon-24 icon-24-close"
    })]) : _vm._e()]), _vm._v(" "), _c('hr', {
      staticClass: "border-bg"
    }), _vm._v(" "), _c(_vm.config.component, {
      tag: "component"
    })], 1)]);
  },
  staticRenderFns: [],
  name: 'camomile-popup',
  computed: {
    config() {
      return this.$store.state.cml.popup.config;
    }

  },
  methods: {
    close() {
      if (this.config.closeBtn) {
        this.$store.commit('cml/popup/close');
      }
    },

    keyup(e) {
      if ((e.which || e.keyCode) === 27) {
        this.close();
      }
    }

  },

  created() {
    if (this.config.closeBtn) {
      document.addEventListener('keyup', this.keyup);
    }
  },

  beforeDestroy() {
    if (this.config.closeBtn) {
      document.removeEventListener('keyup', this.keyup);
    }
  }

};

var cmlMessages = {
  render: function render() {
    var _vm = this;

    var _h = _vm.$createElement;

    var _c = _vm._self._c || _h;

    return _c('div', {
      staticClass: "messages absolute center"
    }, [_c('transition-group', {
      attrs: {
        "name": "transition-bottom",
        "tag": "div"
      }
    }, _vm._l(_vm.messages, function (message) {
      return message.content ? _c('div', {
        key: message.id,
        staticClass: "px-m py-s mb color-bg b",
        class: `bg-${message.type}`
      }, [_vm._v(" " + _vm._s(message.content) + " ")]) : _vm._e();
    }))], 1);
  },
  staticRenderFns: [],
  name: 'camomile-utils-messages',
  computed: {
    messages() {
      return this.$store.state.cml.messages.list;
    }

  }
};

var cmlTitle = {
  render: function render() {
    var _vm = this;

    var _h = _vm.$createElement;

    var _c = _vm._self._c || _h;

    return _c('h1', {
      staticClass: "mb-0"
    }, [_vm._v(_vm._s(_vm.title))]);
  },
  staticRenderFns: [],
  name: 'camomile-header-title',
  computed: {
    title() {
      return this.$store.state.cml.config.title;
    }

  }
};

var cmlInfos = {
  render: function render() {
    var _vm = this;

    var _h = _vm.$createElement;

    var _c = _vm._self._c || _h;

    return _c('h6', {
      staticClass: "menubar-infos mb-0"
    }, [_vm._v(_vm._s(_vm.api) + ": " + _vm._s(_vm.url))]);
  },
  staticRenderFns: [],
  name: 'camomile-header-infos',
  computed: {
    url() {
      return this.$store.state.cml.config.url;
    },

    api() {
      return this.$store.state.cml.config.axios ? 'axios' : 'rp';
    }

  }
};

var objectField = {
  render: function render() {
    var _vm = this;

    var _h = _vm.$createElement;

    var _c = _vm._self._c || _h;

    return _c('div', [_c('h3', {
      staticClass: "pt-s"
    }, [_vm._v(_vm._s(_vm.title))]), _vm._v(" "), _c('div', {
      staticClass: "blobs"
    }, [_c('div', {
      staticClass: "blob-1"
    }, [_c('textarea', {
      directives: [{
        name: "model",
        rawName: "v-model",
        value: _vm.fields,
        expression: "fields"
      }],
      ref: "field",
      staticClass: "textarea-alt",
      domProps: {
        "value": _vm.fields
      },
      on: {
        "keyup": _vm.resize,
        "input": function input($event) {
          if ($event.target.composing) {
            return;
          }

          _vm.fields = $event.target.value;
        }
      }
    })])])]);
  },
  staticRenderFns: [],
  name: 'camomile-popup-edit-json',
  props: {
    name: String,
    title: String
  },
  computed: {
    fields: {
      get() {
        return JSON.stringify(this.$store.state.cml.popup.element[this.name], undefined, 2);
      },

      set(value) {
        if (this.jsonCheck(value)) {
          this.$store.commit('cml/popup/fieldUpdate', {
            name: this.name,
            value: JSON.parse(value)
          });
        }
      }

    }
  },
  methods: {
    jsonCheck(str) {
      try {
        
      } catch (e) {
        return false;
      }

      return true;
    },

    resize(e) {
      const el = e.target;
      el.style.height = `${el.scrollHeight}px`;
    }

  },

  mounted() {
    const el = this.$refs.field;
    el.style.height = `${el.scrollHeight}px`;
  }

};

var popupEdit = {
  render: function render() {
    var _vm = this;

    var _h = _vm.$createElement;

    var _c = _vm._self._c || _h;

    return _c('div', [_vm.type !== 'annotations' ? _c('div', {
      staticClass: "blobs"
    }, [_vm._m(0, false, false), _vm._v(" "), _c('div', {
      staticClass: "blob-3-4"
    }, [_c('input', {
      directives: [{
        name: "model",
        rawName: "v-model",
        value: _vm.element.name,
        expression: "element.name"
      }],
      ref: "name",
      staticClass: "input-alt",
      attrs: {
        "type": "text",
        "placeholder": "Name",
        "disabled": _vm.element.id && (_vm.type === 'users' || _vm.type === 'groups')
      },
      domProps: {
        "value": _vm.element.name
      },
      on: {
        "input": function input($event) {
          if ($event.target.composing) {
            return;
          }

          _vm.$set(_vm.element, "name", $event.target.value);
        }
      }
    })])]) : _vm._e(), _vm._v(" "), _vm.type === 'users' ? _c('div', {
      staticClass: "blobs"
    }, [_vm._m(1, false, false), _vm._v(" "), _c('div', {
      staticClass: "blob-3-4"
    }, [_c('select', {
      directives: [{
        name: "model",
        rawName: "v-model",
        value: _vm.element.role,
        expression: "element.role"
      }],
      staticClass: "select-alt",
      attrs: {
        "type": "text",
        "disabled": !_vm.rolesPermission
      },
      on: {
        "change": function change($event) {
          var $$selectedVal = Array.prototype.filter.call($event.target.options, function (o) {
            return o.selected;
          }).map(function (o) {
            var val = "_value" in o ? o._value : o.value;
            return val;
          });

          _vm.$set(_vm.element, "role", $event.target.multiple ? $$selectedVal : $$selectedVal[0]);
        }
      }
    }, _vm._l(_vm.roles, function (role) {
      return _c('option', {
        key: role,
        domProps: {
          "value": role
        }
      }, [_vm._v(" " + _vm._s(role) + " ")]);
    }))])]) : _vm._e(), _vm._v(" "), _vm.type === 'users' ? _c('div', {
      staticClass: "blobs"
    }, [_vm._m(2, false, false), _vm._v(" "), _c('div', {
      staticClass: "blob-3-4"
    }, [_c('input', {
      directives: [{
        name: "model",
        rawName: "v-model",
        value: _vm.element.password,
        expression: "element.password"
      }],
      staticClass: "input-alt",
      attrs: {
        "type": "password",
        "placeholder": "••••••••"
      },
      domProps: {
        "value": _vm.element.password
      },
      on: {
        "input": function input($event) {
          if ($event.target.composing) {
            return;
          }

          _vm.$set(_vm.element, "password", $event.target.value);
        }
      }
    })])]) : _vm._e(), _vm._v(" "), _vm.type === 'medias' ? _c('div', {
      staticClass: "blobs"
    }, [_vm._m(3, false, false), _vm._v(" "), _c('div', {
      staticClass: "blob-3-4"
    }, [_c('input', {
      directives: [{
        name: "model",
        rawName: "v-model",
        value: _vm.element.url,
        expression: "element.url"
      }],
      staticClass: "input-alt",
      attrs: {
        "type": "text",
        "placeholder": "http://…"
      },
      domProps: {
        "value": _vm.element.url
      },
      on: {
        "input": function input($event) {
          if ($event.target.composing) {
            return;
          }

          _vm.$set(_vm.element, "url", $event.target.value);
        }
      }
    })])]) : _vm._e(), _vm._v(" "), _vm.type === 'annotations' ? _c('object-field', {
      attrs: {
        "name": 'fragment',
        "title": 'Fragment'
      }
    }) : _vm._e(), _vm._v(" "), _vm.type === 'annotations' ? _c('object-field', {
      attrs: {
        "name": 'metadata',
        "title": 'Meta-data'
      }
    }) : _vm._e(), _vm._v(" "), _vm.type === 'layers' ? _c('object-field', {
      attrs: {
        "name": 'fragmentType',
        "title": 'Fragment type'
      }
    }) : _vm._e(), _vm._v(" "), _vm.type === 'layers' ? _c('object-field', {
      attrs: {
        "name": 'metadataType',
        "title": 'Meta-data type'
      }
    }) : _vm._e(), _vm._v(" "), _vm.type !== 'annotations' ? _c('object-field', {
      attrs: {
        "name": 'description',
        "title": 'Description'
      }
    }) : _vm._e(), _vm._v(" "), _c('div', {
      staticClass: "blobs"
    }, [_c('div', {
      staticClass: "blob-1-4"
    }), _vm._v(" "), _c('div', {
      staticClass: "blob-3-4"
    }, [_c('button', {
      staticClass: "btn-alt p-s full-x",
      attrs: {
        "disabled": !_vm.element.name && _vm.type !== 'annotations'
      },
      on: {
        "click": _vm.save,
        "keyup": function keyup($event) {
          if (!('button' in $event) && _vm._k($event.keyCode, "enter", 13, $event.key)) {
            return null;
          }

          _vm.save($event);
        }
      }
    }, [_vm._v("Save")])])])], 1);
  },
  staticRenderFns: [function () {
    var _vm = this;

    var _h = _vm.$createElement;

    var _c = _vm._self._c || _h;

    return _c('div', {
      staticClass: "blob-1-4"
    }, [_c('h4', {
      staticClass: "pt-s mb-0"
    }, [_vm._v("Name")])]);
  }, function () {
    var _vm = this;

    var _h = _vm.$createElement;

    var _c = _vm._self._c || _h;

    return _c('div', {
      staticClass: "blob-1-4"
    }, [_c('h4', {
      staticClass: "pt-s mb-0"
    }, [_vm._v("Role")])]);
  }, function () {
    var _vm = this;

    var _h = _vm.$createElement;

    var _c = _vm._self._c || _h;

    return _c('div', {
      staticClass: "blob-1-4"
    }, [_c('h4', {
      staticClass: "pt-s mb-0"
    }, [_vm._v("Password")])]);
  }, function () {
    var _vm = this;

    var _h = _vm.$createElement;

    var _c = _vm._self._c || _h;

    return _c('div', {
      staticClass: "blob-1-4"
    }, [_c('h4', {
      staticClass: "pt-s mb-0"
    }, [_vm._v("Url")])]);
  }],
  name: 'camomile-popup-edit',
  components: {
    objectField
  },

  data() {
    return {
      element: this.$store.state.cml.popup.element
    };
  },

  computed: _extends({}, mapState({
    type: state => state.cml.popup.config.type,
    rolesPermission: state => state.cml.user.id !== state.cml.popup.element.id,
    roles: state => state.cml.config.roles
  })),
  methods: {
    save() {
      if (this.element.id) {
        this.$store.dispatch(`cml/${this.type}/update`, this.element);
      } else {
        this.$store.dispatch(`cml/${this.type}/add`, this.element);
      }

      this.$store.commit('cml/popup/close');
    },

    keyup(e) {
      if ((e.which || e.keyCode) === 13) {
        this.save();
      }
    }

  },

  created() {
    document.addEventListener('keyup', this.keyup);
  },

  mounted() {
    if (this.type !== 'annotations') {
      this.$refs.name.focus();
    }
  },

  beforeDestroy() {
    document.removeEventListener('keyup', this.keyup);
  }

};

var userbuttonDropdown = {
  render: function render() {
    var _vm = this;

    var _h = _vm.$createElement;

    var _c = _vm._self._c || _h;

    return _c('div', {
      staticClass: "dropdown"
    }, [_vm.isAdmin ? _c('div', [_c('button', {
      staticClass: "btn px-m py-s full-x",
      on: {
        "click": function click($event) {
          _vm.popupOpen({
            config: _vm.popupEditConfig,
            element: _vm.user
          });
        }
      }
    }, [_vm._v("Settings…")])]) : _vm._e(), _vm._v(" "), _c('div', [_c('button', {
      staticClass: "btn px-m py-s full-x mr home",
      on: {
        "click": _vm.logout
      }
    }, [_vm._v("Logout")])])]);
  },
  staticRenderFns: [],
  name: 'camomile-header-userbutton-dropdown',

  data() {
    return {
      popupEditConfig: {
        type: 'users',
        closeBtn: true,
        title: 'Edit user',
        component: popupEdit
      }
    };
  },

  computed: {
    user() {
      return this.$store.state.cml.user;
    },

    isAdmin() {
      return this.$store.state.cml.user.isAdmin;
    }

  },
  methods: {
    close() {
      this.$store.commit('cml/dropdown/close');
    },

    logout() {
      return this.$store.dispatch('cml/user/logout');
    },

    popupOpen({
      config,
      element
    }) {
      this.$store.commit('cml/popup/open', {
        config,
        element
      });
      this.close();
    }

  }
};

var cmlUserbutton = {
  render: function render() {
    var _vm = this;

    var _h = _vm.$createElement;

    var _c = _vm._self._c || _h;

    return _c('button', {
      staticClass: "btn-menubar px-m py-s full-x",
      class: {
        active: _vm.visible
      },
      on: {
        "click": _vm.dropdownToggle
      }
    }, [_vm._v(_vm._s(_vm.user.name))]);
  },
  staticRenderFns: [],
  name: 'camomile-header-userbutton',
  computed: _extends({}, mapState({
    user: state => state.cml.user,
    visible: state => state.cml.dropdown.visible
  })),
  methods: {
    dropdownToggle() {
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

var cmlSyncbutton = {
  render: function render() {
    var _vm = this;

    var _h = _vm.$createElement;

    var _c = _vm._self._c || _h;

    return _c('button', {
      staticClass: "btn-menubar px-m py-s full-x",
      on: {
        "click": _vm.sync
      }
    }, [_c('i', {
      staticClass: "icon-24 icon-24-dot",
      class: {
        blink: _vm.active
      }
    })]);
  },
  staticRenderFns: [],
  name: 'camomile-header-syncbutton',
  computed: {
    active() {
      return this.$store.getters['cml/sync/active'];
    }

  },
  methods: {
    sync() {
      this.$store.dispatch('cml/sync/all');
    }

  }
};

var cmlHeader = {
  render: function render() {
    var _vm = this;

    var _h = _vm.$createElement;

    var _c = _vm._self._c || _h;

    return _c('div', {
      staticClass: "bg-inverse color-bg header"
    }, [_c('div', {
      staticClass: "container"
    }, [_c('div', {
      staticClass: "blobs"
    }, [_c('div', {
      staticClass: "blob-1-4 mb-0"
    }, [_c('cml-title')], 1), _vm._v(" "), _c('div', {
      staticClass: "blob-1-2 mb-0"
    }, [_c('div', {
      staticClass: "blobs-default"
    }, [_c('div', {
      staticClass: "blob-default"
    }, [_vm.isLogged ? _c('cml-syncbutton', {
      staticClass: "mb-0 left"
    }) : _vm._e()], 1), _vm._v(" "), _c('div', {
      staticClass: "blob-auto mb-0"
    }, [_vm.isLogged ? _c('cml-infos') : _vm._e()], 1)])]), _vm._v(" "), _c('div', {
      staticClass: "blob mb-0 flex-right"
    }, [_vm.isLogged ? _c('cml-userbutton') : _vm._e()], 1)])])]);
  },
  staticRenderFns: [],
  name: 'camomile-header',
  components: {
    cmlTitle,
    cmlInfos,
    cmlUserbutton,
    cmlSyncbutton
  },
  computed: {
    isLogged() {
      return this.$store.state.cml.user.isLogged;
    }

  }
};

var popupLogin = {
  render: function render() {
    var _vm = this;

    var _h = _vm.$createElement;

    var _c = _vm._self._c || _h;

    return _c('div', [_c('div', {
      staticClass: "blobs"
    }, [_vm._m(0, false, false), _vm._v(" "), _c('div', {
      staticClass: "blob-3-4"
    }, [_c('input', {
      directives: [{
        name: "model",
        rawName: "v-model",
        value: _vm.config.user.name,
        expression: "config.user.name"
      }],
      staticClass: "input-alt",
      attrs: {
        "type": "text",
        "placeholder": "Name"
      },
      domProps: {
        "value": _vm.config.user.name
      },
      on: {
        "input": function input($event) {
          if ($event.target.composing) {
            return;
          }

          _vm.$set(_vm.config.user, "name", $event.target.value);
        }
      }
    })]), _vm._v(" "), _vm._m(1, false, false), _vm._v(" "), _c('div', {
      staticClass: "blob-3-4"
    }, [_c('input', {
      directives: [{
        name: "model",
        rawName: "v-model",
        value: _vm.config.user.password,
        expression: "config.user.password"
      }],
      staticClass: "input-alt",
      attrs: {
        "type": "password",
        "placeholder": "Password"
      },
      domProps: {
        "value": _vm.config.user.password
      },
      on: {
        "input": function input($event) {
          if ($event.target.composing) {
            return;
          }

          _vm.$set(_vm.config.user, "password", $event.target.value);
        }
      }
    })]), _vm._v(" "), _c('div', {
      staticClass: "blob-1-4"
    }), _vm._v(" "), _c('div', {
      staticClass: "blob-3-4"
    }, [_c('button', {
      staticClass: "btn-alt p-s full-x",
      on: {
        "click": function click($event) {
          _vm.login(_vm.config);
        }
      }
    }, [_vm._v("Login")])])])]);
  },
  staticRenderFns: [function () {
    var _vm = this;

    var _h = _vm.$createElement;

    var _c = _vm._self._c || _h;

    return _c('div', {
      staticClass: "blob-1-4"
    }, [_c('h4', {
      staticClass: "pt-s mb-0"
    }, [_vm._v("Name")])]);
  }, function () {
    var _vm = this;

    var _h = _vm.$createElement;

    var _c = _vm._self._c || _h;

    return _c('div', {
      staticClass: "blob-1-4"
    }, [_c('h4', {
      staticClass: "pt-s mb-0"
    }, [_vm._v("Password")])]);
  }],
  name: 'camomile-login-popup',
  computed: {
    config() {
      return this.$store.state.cml.config;
    }

  },
  methods: {
    login(config) {
      return this.$store.dispatch('cml/user/login', config);
    },

    keyup(e) {
      if ((e.which || e.keyCode) === 13) {
        this.login(this.config);
      }
    }

  },

  created() {
    document.addEventListener('keyup', this.keyup);
  },

  beforeDestroy() {
    document.removeEventListener('keyup', this.keyup);
  }

};

var cmlLogin = {
  render: function render() {
    var _vm = this;

    var _h = _vm.$createElement;

    var _c = _vm._self._c || _h;

    return _c('div');
  },
  staticRenderFns: [],
  name: 'camomile-login',

  created() {
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

var popupRemove = {
  render: function render() {
    var _vm = this;

    var _h = _vm.$createElement;

    var _c = _vm._self._c || _h;

    return _c('div', [_vm.type !== 'annotations' ? _c('div', {
      staticClass: "blobs"
    }, [_vm._m(0, false, false), _vm._v(" "), _c('div', {
      staticClass: "blob-3-4"
    }, [_c('input', {
      directives: [{
        name: "model",
        rawName: "v-model",
        value: _vm.element.name,
        expression: "element.name"
      }],
      staticClass: "input-alt",
      attrs: {
        "type": "text",
        "placeholder": "Name",
        "disabled": _vm.element.id
      },
      domProps: {
        "value": _vm.element.name
      },
      on: {
        "input": function input($event) {
          if ($event.target.composing) {
            return;
          }

          _vm.$set(_vm.element, "name", $event.target.value);
        }
      }
    })])]) : _vm._e(), _vm._v(" "), _vm.type === 'annotations' ? _c('div', {
      staticClass: "blobs"
    }, [_vm._m(1, false, false), _vm._v(" "), _c('div', {
      staticClass: "blob-3-4"
    }, [_c('input', {
      directives: [{
        name: "model",
        rawName: "v-model",
        value: _vm.element.id,
        expression: "element.id"
      }],
      staticClass: "input-alt",
      attrs: {
        "type": "text",
        "placeholder": "Name",
        "disabled": _vm.element.id
      },
      domProps: {
        "value": _vm.element.id
      },
      on: {
        "input": function input($event) {
          if ($event.target.composing) {
            return;
          }

          _vm.$set(_vm.element, "id", $event.target.value);
        }
      }
    })])]) : _vm._e(), _vm._v(" "), _c('div', {
      staticClass: "blobs"
    }, [_c('div', {
      staticClass: "blob-1-4"
    }), _vm._v(" "), _c('div', {
      staticClass: "blob-3-4"
    }, [_c('button', {
      staticClass: "btn-alt p-s full-x",
      on: {
        "click": _vm.remove,
        "keyup": function keyup($event) {
          if (!('button' in $event) && _vm._k($event.keyCode, "enter", 13, $event.key)) {
            return null;
          }

          _vm.remove($event);
        }
      }
    }, [_vm._v("Remove")])])])]);
  },
  staticRenderFns: [function () {
    var _vm = this;

    var _h = _vm.$createElement;

    var _c = _vm._self._c || _h;

    return _c('div', {
      staticClass: "blob-1-4"
    }, [_c('h4', {
      staticClass: "pt-s mb-0"
    }, [_vm._v("Name")])]);
  }, function () {
    var _vm = this;

    var _h = _vm.$createElement;

    var _c = _vm._self._c || _h;

    return _c('div', {
      staticClass: "blob-1-4"
    }, [_c('h4', {
      staticClass: "pt-s mb-0"
    }, [_vm._v("Id")])]);
  }],
  name: 'camomile-popup-remove',
  computed: _extends({}, mapState({
    element: state => state.cml.popup.element,
    type: state => state.cml.popup.config.type
  })),
  methods: {
    remove() {
      this.$store.dispatch(`cml/${this.type}/remove`, this.element);
      this.$store.commit(`cml/popup/close`);
    },

    keyup(e) {
      if ((e.which || e.keyCode) === 13) {
        this.remove();
      }
    }

  },

  created() {
    document.addEventListener('keyup', this.keyup);
  },

  beforeDestroy() {
    document.removeEventListener('keyup', this.keyup);
  }

};

var popupGroups = {
  render: function render() {
    var _vm = this;

    var _h = _vm.$createElement;

    var _c = _vm._self._c || _h;

    return _c('div', [_c('div', {
      staticClass: "blobs"
    }, [_vm._m(0, false, false), _vm._v(" "), _c('div', {
      staticClass: "blob-3-4"
    }, [_c('input', {
      directives: [{
        name: "model",
        rawName: "v-model",
        value: _vm.user.name,
        expression: "user.name"
      }],
      staticClass: "input-alt",
      attrs: {
        "type": "text",
        "placeholder": "Name",
        "disabled": "disabled"
      },
      domProps: {
        "value": _vm.user.name
      },
      on: {
        "input": function input($event) {
          if ($event.target.composing) {
            return;
          }

          _vm.$set(_vm.user, "name", $event.target.value);
        }
      }
    })])]), _vm._v(" "), _c('div', {
      staticClass: "blobs"
    }, [_c('div', {
      staticClass: "blob-1"
    }, [_c('h3', {
      staticClass: "mb-s"
    }, [_vm._v("Groups")]), _vm._v(" "), _c('ul', {
      staticClass: "list-inline clearfix"
    }, _vm._l(_vm.groups, function (group) {
      return _c('li', {
        key: group.id,
        staticClass: "tag",
        class: {
          active: _vm.groupActive(group.id)
        }
      }, [_c('button', {
        staticClass: "btn px-m py-xs h5 pill",
        on: {
          "click": function click($event) {
            _vm.groupToggle(group);
          }
        }
      }, [_vm._v(_vm._s(group.name))])]);
    }))])])]);
  },
  staticRenderFns: [function () {
    var _vm = this;

    var _h = _vm.$createElement;

    var _c = _vm._self._c || _h;

    return _c('div', {
      staticClass: "blob-1-4"
    }, [_c('h4', {
      staticClass: "pt-s mb-0"
    }, [_vm._v("Name")])]);
  }],
  name: 'camomile-popup-groups',
  computed: {
    groups() {
      return this.$store.state.cml.groups.list;
    },

    user() {
      return this.$store.state.cml.users.list.find(user => user.id === this.$store.state.cml.popup.element.id);
    }

  },
  methods: {
    groupToggle(group) {
      if (this.groupActive(group.id)) {
        this.$store.dispatch('cml/groups/userRemove', {
          user: this.user,
          group: group
        });
      } else {
        this.$store.dispatch('cml/groups/userAdd', {
          user: this.user,
          group: group
        });
      }
    },

    groupActive(groupId) {
      return this.groups.find(group => group.id === groupId).userIds.indexOf(this.user.id) !== -1;
    }

  }
};

var cmlUsers = {
  render: function render() {
    var _vm = this;

    var _h = _vm.$createElement;

    var _c = _vm._self._c || _h;

    return _c('div', [_c('div', {
      staticClass: "flex flex-start"
    }, [_c('h2', {
      staticClass: "mt-s"
    }, [_vm._v("Users")]), _vm._v(" "), _c('button', {
      staticClass: "btn p-s flex-right",
      on: {
        "click": function click($event) {
          _vm.popupOpen({
            config: _vm.popupAddConfig,
            element: {
              description: {}
            }
          });
        }
      }
    }, [_c('i', {
      staticClass: "icon-24 icon-24-plus"
    })])]), _vm._v(" "), _c('div', [_c('table', {
      staticClass: "table mb-0"
    }, [_vm._m(0, false, false), _vm._v(" "), _vm._l(_vm.users, function (user) {
      return _c('tr', {
        key: user.id
      }, [_c('td', [_vm._v(_vm._s(user.name))]), _vm._v(" "), _c('td', [_vm._v(_vm._s(user.role))]), _vm._v(" "), _c('td', {
        staticClass: "text-right"
      }, [_c('button', {
        staticClass: "btn px-s py-s my--s h6",
        on: {
          "click": function click($event) {
            _vm.popupOpen({
              config: _vm.popupGroupsConfig,
              element: user
            });
          }
        }
      }, [_vm._v("Groups")]), _vm._v(" "), _c('button', {
        staticClass: "btn px-s py-s my--s h6",
        on: {
          "click": function click($event) {
            _vm.popupOpen({
              config: _vm.popupEditConfig,
              element: user
            });
          }
        }
      }, [_vm._v("Edit")]), _vm._v(" "), user.id !== _vm.userId ? _c('button', {
        staticClass: "btn px-s py-s my--s h6",
        on: {
          "click": function click($event) {
            _vm.popupOpen({
              config: _vm.popupRemoveConfig,
              element: user
            });
          }
        }
      }, [_vm._v("Remove")]) : _vm._e()])]);
    })], 2)])]);
  },
  staticRenderFns: [function () {
    var _vm = this;

    var _h = _vm.$createElement;

    var _c = _vm._self._c || _h;

    return _c('tr', [_c('th', [_vm._v("Name")]), _c('th', [_vm._v("Role")]), _c('th')]);
  }],
  name: 'camomile-users',

  data() {
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
    };
  },

  computed: _extends({}, mapState({
    users: state => state.cml.users.list,
    userId: state => state.cml.user.id
  })),
  methods: {
    popupOpen({
      config,
      element
    }) {
      return this.$store.commit('cml/popup/open', {
        config,
        element
      });
    }

  }
};

var popupUsers = {
  render: function render() {
    var _vm = this;

    var _h = _vm.$createElement;

    var _c = _vm._self._c || _h;

    return _c('div', [_c('div', {
      staticClass: "blobs"
    }, [_vm._m(0, false, false), _vm._v(" "), _c('div', {
      staticClass: "blob-3-4"
    }, [_c('input', {
      directives: [{
        name: "model",
        rawName: "v-model",
        value: _vm.group.name,
        expression: "group.name"
      }],
      staticClass: "input-alt",
      attrs: {
        "type": "text",
        "placeholder": "Name",
        "disabled": "disabled"
      },
      domProps: {
        "value": _vm.group.name
      },
      on: {
        "input": function input($event) {
          if ($event.target.composing) {
            return;
          }

          _vm.$set(_vm.group, "name", $event.target.value);
        }
      }
    })])]), _vm._v(" "), _c('div', {
      staticClass: "blobs"
    }, [_c('div', {
      staticClass: "blob-1"
    }, [_c('h3', {
      staticClass: "pt-s mb-s"
    }, [_vm._v("Users")]), _vm._v(" "), _c('ul', {
      staticClass: "list-inline"
    }, _vm._l(_vm.users, function (user) {
      return _c('li', {
        key: user.id,
        staticClass: "tag",
        class: {
          active: _vm.userActive(user.id)
        }
      }, [_c('button', {
        staticClass: "btn px-m py-xs h5 pill",
        on: {
          "click": function click($event) {
            _vm.userToggle(user);
          }
        }
      }, [_vm._v(_vm._s(user.name))])]);
    }))])])]);
  },
  staticRenderFns: [function () {
    var _vm = this;

    var _h = _vm.$createElement;

    var _c = _vm._self._c || _h;

    return _c('div', {
      staticClass: "blob-1-4"
    }, [_c('h4', {
      staticClass: "pt-s mb-0"
    }, [_vm._v("Name")])]);
  }],
  name: 'camomile-popup-users',
  computed: {
    users() {
      return this.$store.state.cml.users.list;
    },

    group() {
      return this.$store.state.cml.groups.list.find(group => group.id === this.$store.state.cml.popup.element.id);
    }

  },
  methods: {
    userToggle(user) {
      if (this.userActive(user.id)) {
        this.$store.dispatch('cml/groups/userRemove', {
          user: user,
          group: this.group
        });
      } else {
        this.$store.dispatch('cml/groups/userAdd', {
          user: user,
          group: this.group
        });
      }
    },

    userActive(userId) {
      return this.group.userIds.indexOf(userId) > -1;
    }

  }
};

var cmlGroups = {
  render: function render() {
    var _vm = this;

    var _h = _vm.$createElement;

    var _c = _vm._self._c || _h;

    return _c('div', [_c('div', {
      staticClass: "flex flex-start"
    }, [_c('h2', {
      staticClass: "mt-s"
    }, [_vm._v("Groups")]), _vm._v(" "), _c('button', {
      staticClass: "btn p-s flex-right",
      on: {
        "click": function click($event) {
          _vm.popupOpen({
            config: _vm.popupAddConfig,
            element: {
              description: {}
            }
          });
        }
      }
    }, [_c('i', {
      staticClass: "icon-24 icon-24-plus"
    })])]), _vm._v(" "), _c('div', [_c('table', {
      staticClass: "table mb-0"
    }, [_vm._m(0, false, false), _vm._v(" "), _vm._l(_vm.groups, function (group) {
      return _c('tr', {
        key: group.id
      }, [_c('td', [_vm._v(_vm._s(group.name))]), _vm._v(" "), _c('td', [_vm._v(_vm._s(group.userIds.length))]), _vm._v(" "), _c('td', {
        staticClass: "text-right"
      }, [_c('button', {
        staticClass: "btn px-s py-s my--s h6",
        on: {
          "click": function click($event) {
            _vm.popupOpen({
              config: _vm.popupUsersConfig,
              element: group
            });
          }
        }
      }, [_vm._v("Users")]), _vm._v(" "), _c('button', {
        staticClass: "btn px-s py-s my--s h6",
        on: {
          "click": function click($event) {
            _vm.popupOpen({
              config: _vm.popupEditConfig,
              element: group
            });
          }
        }
      }, [_vm._v("Edit")]), _vm._v(" "), _vm.isRoot ? _c('button', {
        staticClass: "btn px-s py-s my--s h6",
        on: {
          "click": function click($event) {
            _vm.popupOpen({
              config: _vm.popupRemoveConfig,
              element: group
            });
          }
        }
      }, [_vm._v("Remove")]) : _vm._e()])]);
    })], 2)])]);
  },
  staticRenderFns: [function () {
    var _vm = this;

    var _h = _vm.$createElement;

    var _c = _vm._self._c || _h;

    return _c('tr', [_c('th', [_vm._v("Name")]), _c('th', [_vm._v("Users")]), _c('th')]);
  }],
  name: 'camomile-groups',

  data() {
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
    };
  },

  computed: _extends({}, mapState({
    groups: state => state.cml.groups.list,
    isRoot: state => state.cml.user.isRoot
  })),
  methods: {
    popupOpen({
      config,
      element
    }) {
      return this.$store.commit('cml/popup/open', {
        config,
        element
      });
    },

    refresh() {
      return this.$store.dispatch('cml/groups/list');
    }

  }
};

var permissionsEdit = {
  render: function render() {
    var _vm = this;

    var _h = _vm.$createElement;

    var _c = _vm._self._c || _h;

    return _c('ul', {
      staticClass: "list-inline"
    }, [_c('li', {
      staticClass: "tag right",
      class: {
        active: _vm.isActive(1)
      }
    }, [_c('button', {
      staticClass: "btn px-s py-xs my--xs h5 mono pill",
      on: {
        "click": function click($event) {
          _vm.toggle(1);
        }
      }
    }, [_vm._v("R")])]), _vm._v(" "), _c('li', {
      staticClass: "tag right",
      class: {
        active: _vm.isActive(2)
      }
    }, [_c('button', {
      staticClass: "btn px-s py-xs my--xs h5 mono pill",
      on: {
        "click": function click($event) {
          _vm.toggle(2);
        }
      }
    }, [_vm._v("W")])]), _vm._v(" "), _c('li', {
      staticClass: "tag right",
      class: {
        active: _vm.isActive(3)
      }
    }, [_c('button', {
      staticClass: "btn px-s py-xs my--xs h5 mono pill",
      on: {
        "click": function click($event) {
          _vm.toggle(3);
        }
      }
    }, [_vm._v("A")])])]);
  },
  staticRenderFns: [],
  name: 'camomile-popup-permissions-edit',
  props: {
    element: Object,
    resource: Object
  },
  computed: {
    permissions() {
      return this.$store.state.cml[`${this.resource.type}s`].list.find(r => r.id === this.resource.id).permissions[`${this.element.type}s`];
    }

  },
  methods: {
    toggle(permission) {
      if (this.isActive(permission)) {
        this.$store.dispatch(`cml/${this.resource.type}s/${this.element.type}PermissionRemove`, {
          [`${this.resource.type}Id`]: this.resource.id,
          [`${this.element.type}Id`]: this.element.id
        });
      } else {
        this.$store.dispatch(`cml/${this.resource.type}s/${this.element.type}PermissionSet`, {
          [`${this.resource.type}Id`]: this.resource.id,
          [`${this.element.type}Id`]: this.element.id,
          permission
        });
      }
    },

    isActive(permission) {
      return this.permissions[this.element.id] === permission;
    }

  }
};

var popupPermissions = {
  render: function render() {
    var _vm = this;

    var _h = _vm.$createElement;

    var _c = _vm._self._c || _h;

    return _c('div', [_c('div', {
      staticClass: "blobs"
    }, [_vm._m(0, false, false), _vm._v(" "), _c('div', {
      staticClass: "blob-3-4"
    }, [_c('input', {
      directives: [{
        name: "model",
        rawName: "v-model",
        value: _vm.resource.name,
        expression: "resource.name"
      }],
      staticClass: "input-alt",
      attrs: {
        "type": "text",
        "placeholder": "Name",
        "disabled": "disabled"
      },
      domProps: {
        "value": _vm.resource.name
      },
      on: {
        "input": function input($event) {
          if ($event.target.composing) {
            return;
          }

          _vm.$set(_vm.resource, "name", $event.target.value);
        }
      }
    })]), _vm._v(" "), _c('div', {
      staticClass: "blob-1-2"
    }, [_c('h3', {
      staticClass: "pt-s"
    }, [_vm._v("Groups")]), _vm._v(" "), _c('ul', {
      staticClass: "list-sans"
    }, _vm._l(_vm.groups, function (group) {
      return _c('li', {
        key: group.id
      }, [_c('div', {
        staticClass: "blobs"
      }, [_c('div', {
        staticClass: "blob-1-2 mb-s"
      }, [_vm._v(" " + _vm._s(group.name) + " ")]), _vm._v(" "), _c('div', {
        staticClass: "blob-1-2 mb-s"
      }, [_c('permissions-edit', {
        attrs: {
          "resource": _vm.permissionsConfig,
          "element": {
            id: group.id,
            type: 'group'
          }
        }
      })], 1)])]);
    }))]), _vm._v(" "), _c('div', {
      staticClass: "blob-1-2"
    }, [_c('h3', {
      staticClass: "pt-s"
    }, [_vm._v("Users")]), _vm._v(" "), _c('ul', {
      staticClass: "list-sans"
    }, _vm._l(_vm.users, function (user) {
      return _c('li', {
        key: user.id
      }, [_c('div', {
        staticClass: "blobs"
      }, [_c('div', {
        staticClass: "blob-1-2 mb-s"
      }, [_vm._v(" " + _vm._s(user.name) + " ")]), _vm._v(" "), _c('div', {
        staticClass: "blob-1-2 mb-s"
      }, [_c('permissions-edit', {
        attrs: {
          "resource": _vm.permissionsConfig,
          "element": {
            id: user.id,
            type: 'user'
          }
        }
      })], 1)])]);
    }))])])]);
  },
  staticRenderFns: [function () {
    var _vm = this;

    var _h = _vm.$createElement;

    var _c = _vm._self._c || _h;

    return _c('div', {
      staticClass: "blob-1-4"
    }, [_c('h4', {
      staticClass: "pt-s"
    }, [_vm._v("Name")])]);
  }],
  name: 'camomile-permissions',
  components: {
    permissionsEdit
  },
  computed: _extends({}, mapState({
    resource: state => state.cml[state.cml.popup.config.type].list.find(e => e.id === state.cml.popup.element.id),
    users: state => state.cml.users.list,
    groups: state => state.cml.groups.list,
    type: state => state.cml.popup.config.type
  }), {
    permissionsConfig() {
      return {
        id: this.resource.id,
        type: this.type.slice(0, -1),
        permissions: this.resource.permissions.users
      };
    }

  })
};

var cmlCorpus = {
  render: function render() {
    var _vm = this;

    var _h = _vm.$createElement;

    var _c = _vm._self._c || _h;

    return _c('div', [_c('div', {
      staticClass: "flex flex-start"
    }, [_c('h2', {
      staticClass: "mt-s"
    }, [_vm._v("Corpora")]), _vm._v(" "), _vm.isAdmin ? _c('button', {
      staticClass: "flex-right btn p-s",
      on: {
        "click": function click($event) {
          _vm.popupOpen({
            config: _vm.popupAddConfig,
            element: {
              id: null,
              description: {}
            }
          });
        }
      }
    }, [_c('i', {
      staticClass: "icon-24 icon-24-plus"
    })]) : _vm._e()]), _vm._v(" "), _c('div', [_c('table', {
      staticClass: "table mb-0"
    }, [_vm._m(0, false, false), _vm._v(" "), _vm._l(_vm.corpus, function (corpu) {
      return _c('tr', {
        key: corpu.id
      }, [_c('td', [_c('input', {
        attrs: {
          "type": "radio"
        },
        domProps: {
          "value": corpu.id,
          "checked": corpu.id === _vm.corpuId
        },
        on: {
          "change": _vm.set
        }
      })]), _vm._v(" "), _c('td', [_vm._v(_vm._s(corpu.name))]), _vm._v(" "), _c('td', {
        staticClass: "text-right"
      }, [corpu.permission === 3 ? _c('button', {
        staticClass: "btn px-s py-s my--s h6",
        on: {
          "click": function click($event) {
            _vm.popupOpen({
              config: _vm.popupPermissionsConfig,
              element: corpu
            });
          }
        }
      }, [_vm._v("Permissions")]) : _vm._e(), _vm._v(" "), corpu.permission === 3 ? _c('button', {
        staticClass: "btn px-s py-s my--s h6",
        on: {
          "click": function click($event) {
            _vm.popupOpen({
              config: _vm.popupEditConfig,
              element: corpu
            });
          }
        }
      }, [_vm._v("Edit")]) : _vm._e(), _vm._v(" "), _vm.isAdmin && corpu.permission === 3 ? _c('button', {
        staticClass: "btn px-s py-s my--s h6",
        on: {
          "click": function click($event) {
            _vm.popupOpen({
              config: _vm.popupRemoveConfig,
              element: corpu
            });
          }
        }
      }, [_vm._v("Remove")]) : _vm._e()])]);
    })], 2)])]);
  },
  staticRenderFns: [function () {
    var _vm = this;

    var _h = _vm.$createElement;

    var _c = _vm._self._c || _h;

    return _c('tr', [_c('th'), _c('th', [_vm._v("Name")]), _c('th')]);
  }],
  name: 'camomile-corpus',

  data() {
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
    };
  },

  computed: _extends({}, mapState({
    corpus: state => state.cml.corpus.list,
    corpuId: state => state.cml.corpus.id,
    isAdmin: state => state.cml.user.isAdmin
  })),
  methods: {
    popupOpen({
      config,
      element
    }) {
      this.$store.commit('cml/popup/open', {
        config,
        element
      });
    },

    set(e) {
      this.$store.dispatch('cml/corpus/set', e.target.value);
    }

  }
};

var cmlMedias = {
  render: function render() {
    var _vm = this;

    var _h = _vm.$createElement;

    var _c = _vm._self._c || _h;

    return _c('div', [_c('div', {
      staticClass: "flex flex-start"
    }, [_c('h2', {
      staticClass: "mt-s"
    }, [_vm._v("Media")]), _vm._v(" "), _vm.permission === 3 ? _c('button', {
      staticClass: "flex-right btn p-s",
      on: {
        "click": function click($event) {
          _vm.popupOpen({
            config: _vm.popupAddConfig,
            element: {
              id: null,
              corpuId: _vm.corpuId,
              description: {}
            }
          });
        }
      }
    }, [_c('i', {
      staticClass: "icon-24 icon-24-plus"
    })]) : _vm._e()]), _vm._v(" "), _c('div', [_c('table', {
      staticClass: "table mb-0"
    }, [_vm._m(0, false, false), _vm._v(" "), _vm._l(_vm.medias, function (media) {
      return _c('tr', {
        key: media.id
      }, [_c('td', [_c('input', {
        attrs: {
          "type": "radio"
        },
        domProps: {
          "value": media.id,
          "checked": media.id === _vm.mediaId
        },
        on: {
          "change": _vm.set
        }
      })]), _vm._v(" "), _c('td', [_vm._v(_vm._s(media.name))]), _vm._v(" "), _c('td', {
        staticClass: "text-right"
      }, [_vm.permission === 3 ? _c('button', {
        staticClass: "btn px-s py-s my--s h6",
        on: {
          "click": function click($event) {
            _vm.popupOpen({
              config: _vm.popupEditConfig,
              element: media
            });
          }
        }
      }, [_vm._v("Edit")]) : _vm._e(), _vm._v(" "), _vm.permission === 3 ? _c('button', {
        staticClass: "btn px-s py-s my--s h6",
        on: {
          "click": function click($event) {
            _vm.popupOpen({
              config: _vm.popupRemoveConfig,
              element: media
            });
          }
        }
      }, [_vm._v("Remove")]) : _vm._e()])]);
    })], 2)])]);
  },
  staticRenderFns: [function () {
    var _vm = this;

    var _h = _vm.$createElement;

    var _c = _vm._self._c || _h;

    return _c('tr', [_c('th'), _c('th', [_vm._v("Name")]), _c('th')]);
  }],
  name: 'camomile-medias',

  data() {
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
    };
  },

  computed: _extends({}, mapState({
    medias: state => state.cml.medias.list,
    corpus: state => state.cml.corpus.list,
    corpuId: state => state.cml.corpus.id,
    mediaId: state => state.cml.medias.id
  }), {
    permission() {
      const corpu = this.corpus.find(c => c.id === this.corpuId);
      return corpu ? corpu.permission : 0;
    }

  }),
  methods: {
    popupOpen({
      config,
      element
    }) {
      return this.$store.commit('cml/popup/open', {
        config,
        element
      });
    },

    set(e) {
      this.$store.dispatch('cml/medias/set', e.target.value);
    }

  }
};

var cmlLayers = {
  render: function render() {
    var _vm = this;

    var _h = _vm.$createElement;

    var _c = _vm._self._c || _h;

    return _c('div', [_c('div', {
      staticClass: "flex flex-start"
    }, [_c('h2', {
      staticClass: "mt-s"
    }, [_vm._v("Layers")]), _vm._v(" "), _vm.permission === 3 ? _c('button', {
      staticClass: "flex-right btn p-s",
      on: {
        "click": function click($event) {
          _vm.popupOpen({
            config: _vm.popupAddConfig,
            element: {
              id: null,
              corpuId: _vm.corpuId,
              description: {},
              metadataType: {},
              fragmentType: {}
            }
          });
        }
      }
    }, [_c('i', {
      staticClass: "icon-24 icon-24-plus"
    })]) : _vm._e()]), _vm._v(" "), _c('div', [_c('table', {
      staticClass: "table mb-0"
    }, [_vm._m(0, false, false), _vm._v(" "), _vm._l(_vm.layers, function (layer) {
      return _c('tr', {
        key: layer.id
      }, [_c('td', [_c('input', {
        attrs: {
          "type": "radio"
        },
        domProps: {
          "value": layer.id,
          "checked": layer.id === _vm.layerId
        },
        on: {
          "change": _vm.set
        }
      })]), _vm._v(" "), _c('td', [_vm._v(_vm._s(layer.name))]), _vm._v(" "), _c('td', {
        staticClass: "text-right"
      }, [layer.permission === 3 ? _c('button', {
        staticClass: "btn px-s py-s my--s h6",
        on: {
          "click": function click($event) {
            _vm.popupOpen({
              config: _vm.popupPermissionsConfig,
              element: layer
            });
          }
        }
      }, [_vm._v("Permissions")]) : _vm._e(), _vm._v(" "), layer.permission === 3 ? _c('button', {
        staticClass: "btn px-s py-s my--s h6",
        on: {
          "click": function click($event) {
            _vm.popupOpen({
              config: _vm.popupEditConfig,
              element: layer
            });
          }
        }
      }, [_vm._v("Edit")]) : _vm._e(), _vm._v(" "), layer.permission === 3 ? _c('button', {
        staticClass: "btn px-s py-s my--s h6",
        on: {
          "click": function click($event) {
            _vm.popupOpen({
              config: _vm.popupRemoveConfig,
              element: layer
            });
          }
        }
      }, [_vm._v("Remove")]) : _vm._e()])]);
    })], 2)])]);
  },
  staticRenderFns: [function () {
    var _vm = this;

    var _h = _vm.$createElement;

    var _c = _vm._self._c || _h;

    return _c('tr', [_c('th'), _c('th', [_vm._v("Name")]), _c('th')]);
  }],
  name: 'camomile-layers',

  data() {
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
    };
  },

  computed: _extends({}, mapState({
    layers: state => state.cml.layers.list,
    corpuId: state => state.cml.corpus.id,
    corpus: state => state.cml.corpus.list,
    layerId: state => state.cml.layers.id
  }), {
    permission() {
      const corpu = this.corpus.find(c => c.id === this.corpuId);
      return corpu ? corpu.permission : 0;
    }

  }),
  methods: {
    popupOpen(config) {
      return this.$store.commit('cml/popup/open', config);
    },

    set(e) {
      this.$store.dispatch('cml/layers/set', e.target.value);
    }

  }
};

var cmlAnnotations = {
  render: function render() {
    var _vm = this;

    var _h = _vm.$createElement;

    var _c = _vm._self._c || _h;

    return _c('div', [_c('div', {
      staticClass: "flex flex-start"
    }, [_c('h2', {
      staticClass: "mt-s"
    }, [_vm._v("Annotations")]), _vm._v(" "), _vm.permission === 3 ? _c('button', {
      staticClass: "flex-right btn p-s",
      on: {
        "click": function click($event) {
          _vm.popupOpen({
            config: _vm.popupAddConfig,
            element: {
              id: null,
              layerId: _vm.layerId,
              mediaId: _vm.mediaId,
              fragment: {},
              metadata: {}
            }
          });
        }
      }
    }, [_c('i', {
      staticClass: "icon-24 icon-24-plus"
    })]) : _vm._e()]), _vm._v(" "), _c('div', [_c('table', {
      staticClass: "table mb-0"
    }, [_vm._m(0, false, false), _vm._v(" "), _vm._l(_vm.annotations, function (annotation) {
      return _c('tr', {
        key: annotation.id
      }, [_c('td', [_c('input', {
        attrs: {
          "type": "radio"
        },
        domProps: {
          "value": annotation.id,
          "checked": annotation.id === _vm.annotationId
        },
        on: {
          "change": _vm.set
        }
      })]), _vm._v(" "), _c('td', [_c('span', {
        staticClass: "h6 bold bg-neutral color-bg py-xxs px-xs rnd"
      }, [_vm._v("…" + _vm._s(_vm._f("stringEnd")(annotation.id)))])]), _vm._v(" "), _c('td', [_vm._v(_vm._s(_vm.mediaName(annotation.mediaId)))]), _vm._v(" "), _c('td', {
        staticClass: "text-right"
      }, [_vm.permission === 3 ? _c('button', {
        staticClass: "btn px-s py-s my--s h6",
        on: {
          "click": function click($event) {
            _vm.popupOpen({
              config: _vm.popupEditConfig,
              element: annotation
            });
          }
        }
      }, [_vm._v("Edit")]) : _vm._e(), _vm._v(" "), _vm.permission === 3 ? _c('button', {
        staticClass: "btn px-s py-s my--s h6",
        on: {
          "click": function click($event) {
            _vm.popupOpen({
              config: _vm.popupRemoveConfig,
              element: annotation
            });
          }
        }
      }, [_vm._v("Remove")]) : _vm._e()])]);
    })], 2)])]);
  },
  staticRenderFns: [function () {
    var _vm = this;

    var _h = _vm.$createElement;

    var _c = _vm._self._c || _h;

    return _c('tr', [_c('th'), _c('th', [_vm._v("Id")]), _c('th', [_vm._v("Medium")]), _c('th')]);
  }],
  name: 'camomile-annotations',

  data() {
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
    };
  },

  computed: _extends({}, mapState({
    annotations: state => state.cml.annotations.list,
    mediaId: state => state.cml.medias.id,
    layerId: state => state.cml.layers.id,
    annotationId: state => state.cml.annotations.id,
    medias: state => state.cml.medias.list
  }), {
    permission() {
      const layer = this.$store.state.cml.layers.list.find(layer => layer.id === this.layerId);
      return layer ? layer.permission : 0;
    }

  }),
  methods: {
    popupOpen({
      config,
      element
    }) {
      return this.$store.commit('cml/popup/open', {
        config,
        element
      });
    },

    set(e) {
      this.$store.dispatch('cml/annotations/set', e.target.value);
    },

    mediaName(mediaId) {
      if (!mediaId) return '';
      const media = this.medias.find(m => m.id === mediaId);
      return media ? media.name : '';
    }

  },
  filters: {
    stringEnd(value) {
      if (!value) return '';
      return value.substr(value.length - 6);
    }

  }
};

var app = {
  render: function render() {
    var _vm = this;

    var _h = _vm.$createElement;

    var _c = _vm._self._c || _h;

    return _c('div', {
      staticClass: "full-y flex flex-direction-column"
    }, [_c('cml-header'), _vm._v(" "), _c('div', {
      staticClass: "relative page"
    }, [_c('transition', {
      attrs: {
        "name": "transition-top"
      }
    }, [_vm.popup.visible ? _c('cml-popup') : _vm._e()], 1), _vm._v(" "), _c('cml-messages'), _vm._v(" "), _c('cml-dropdown'), _vm._v(" "), _c('div', {
      staticClass: "container pt"
    }, [_vm.isAdmin ? _c('div', {
      staticClass: "blobs"
    }, [_c('cml-users', {
      staticClass: "blob-1-2 p border"
    }), _vm._v(" "), _c('cml-groups', {
      staticClass: "blob-1-2 p border"
    })], 1) : _vm._e(), _vm._v(" "), _vm.isLogged ? _c('div', {
      staticClass: "blobs"
    }, [_c('cml-corpus', {
      staticClass: "blob-1-2 p border"
    }), _vm._v(" "), _c('cml-medias', {
      staticClass: "blob-1-2 p border"
    }), _vm._v(" "), _c('cml-layers', {
      staticClass: "blob-1-2 p border"
    }), _vm._v(" "), _c('cml-annotations', {
      staticClass: "blob-1-2 p border"
    })], 1) : _vm._e()])], 1), _vm._v(" "), !_vm.isLogged ? _c('cml-login') : _vm._e(), _vm._v(" "), _c('viewport'), _vm._v(" "), _c('debug')], 1);
  },
  staticRenderFns: [],
  store,
  name: 'camomile',
  components: {
    debug,
    viewport: viewport$1,
    cmlHeader,
    cmlLogin,
    cmlPopup,
    cmlMessages,
    cmlDropdown,
    cmlUsers,
    cmlGroups,
    cmlCorpus,
    cmlMedias,
    cmlLayers,
    cmlAnnotations
  },
  computed: _extends({}, mapState({
    isAdmin: state => state.cml.user.isAdmin,
    isLogged: state => state.cml.user.isLogged,
    popup: state => state.cml.popup
  }))
};

export default app;
