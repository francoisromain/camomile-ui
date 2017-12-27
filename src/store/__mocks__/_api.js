let user = {
  username: 'lu',
  _id: 'mocks-user-id-lu',
  role: 'admin',
  description: {
    desc: 'Nulla vitae elit libero, a pharetra augue.'
  }
}

const users = [
  {
    _id: 'mocks-user-id-lu',
    username: 'lu',
    role: 'user',
    description: {}
  },
  {
    _id: 'mocks-user-id-ji',
    username: 'ji',
    role: 'admin',
    description: {}
  },
  {
    _id: 'mocks-user-id-joe',
    username: 'joe',
    role: 'user',
    description: {}
  }
]

const groups = [
  {
    _id: 'mocks-group-id-1',
    name: 'group-1',
    description: {},
    users: ['mocks-user-id-lu', 'mocks-user-id-ji']
  },
  {
    _id: 'mocks-group-id-2',
    name: 'group-2',
    description: {},
    users: ['mocks-user-id-ji']
  }
]

const corpus = [
  {
    _id: 'mocks-corpu-id-1',
    name: 'corpu-1',
    description: {},
    permissions: {}
  },
  {
    _id: 'mocks-corpu-id-2',
    name: 'corpu-2',
    description: {},
    permissions: {}
  }
]

const medias = [
  {
    id_corpus: 'mocks-corpu-id-1',
    description: { desc: 'Ornare Malesuada Fermentum Parturient' },
    _id: 'mocks-media-id-1',
    name: 'media-1',
    url: 'https://www.limsi.fr/'
  },
  {
    id_corpus: 'mocks-corpu-id-1',
    description: { desc: 'Condimentum Elit Mattis Quam' },
    _id: 'mocks-media-id-2',
    name: 'media-2',
    url: 'https://github.com'
  }
]

const layers = [
  {
    id_corpus: 'mocks-corpu-id-1',
    description: { desc: 'Ornare Malesuada Fermentum Parturient' },
    fragment_type: { fragment: 'Ornare Malesuada Fermentum Parturient' },
    data_type: { data: 'Ornare Malesuada Fermentum Parturient' },
    annotations: { annotations: 'Ornare Malesuada Fermentum Parturient' },
    _id: 'mocks-layer-id-1',
    name: 'layer-1',
    permissions: {
      groups: { 'mocks-group-id-2': 2 },
      users: { 'mocks-user-id-lu': 1 }
    }
  },
  {
    id_corpus: 'mocks-corpu-id-1',
    description: { desc: 'Condimentum Elit Mattis Quam' },
    fragment_type: { fragment: 'Ornare Malesuada Fermentum Parturient' },
    data_type: { data: 'Ornare Malesuada Fermentum Parturient' },
    annotations: { annotations: 'Ornare Malesuada Fermentum Parturient' },
    _id: 'mocks-layer-id-2',
    name: 'layer-2',
    permissions: {
      groups: { 'mocks-group-id-1': 2 },
      users: { 'mocks-user-id-ji': 3 }
    }
  }
]

const annotations = [
  {
    _id: 'mocks-annotation-id-1',
    fragment: { fragment: 'Maecenas faucibus mollis interdum.' },
    data: { metadata: 'Maecenas faucibus mollis interdum.' },
    id_medium: 'mocks-media-id-1',
    id_layer: 'mocks-layer-id-1'
  },
  {
    _id: 'mocks-annotation-id-2',
    fragment: { fragment: 'Etiam porta sem malesuada magna mollis euismod.' },
    data: { metadata: 'Etiam porta sem malesuada magna mollis euismod.' },
    id_layer: 'mocks-layer-id-1'
  }
]

const api = {
  login (username, password) {
    return new Promise((resolve, reject) => {
      process.nextTick(() => {
        if (username && password) {
          resolve({
            status: 'success',
            data: null,
            message: 'Authentication succeeded.'
          })
        } else {
          reject(new Error('Incorrect username or password'))
        }
      })
    })
  },

  me () {
    return new Promise((resolve, reject) => {
      process.nextTick(() => {
        if (user) {
          resolve({ data: user })
        } else {
          reject(new Error('Api'))
        }
      })
    })
  },

  logout () {
    return new Promise((resolve, reject) => {
      process.nextTick(() => {
        if (user) {
          user = null
          resolve({ message: 'Logout succeeded.' })
        } else {
          reject(new Error('Api'))
        }
      })
    })
  },

  createUser (name, password, description, role) {
    return new Promise((resolve, reject) => {
      process.nextTick(() => {
        if (name && password) {
          resolve({
            data: {
              username: name,
              description: description,
              role: role,
              _id: 'mocks-user-id-new'
            }
          })
        } else {
          reject(new Error('Incorrect name or password'))
        }
      })
    })
  },

  deleteUser (userId) {
    return new Promise((resolve, reject) => {
      process.nextTick(() => {
        if (users.find(u => u._id === userId)) {
          resolve(users.filter(u => u._id !== userId))
        } else {
          reject(new Error(`Incorrect user Id: ${userId}`))
        }
      })
    })
  },

  updateUser (id, { password, description, role }) {
    return new Promise((resolve, reject) => {
      process.nextTick(() => {
        const user = users.find(u => u._id === id)
        if (user) {
          resolve({
            data: {
              _id: id,
              username: user.username,
              description: description || user.description,
              role: role || user.role
            }
          })
        } else {
          reject(new Error('Api'))
        }
      })
    })
  },

  getUsers () {
    return new Promise((resolve, reject) => {
      process.nextTick(() => {
        resolve({ data: users })
      })
    })
  },

  createGroup (name, description) {
    return new Promise((resolve, reject) => {
      process.nextTick(() => {
        if (name) {
          resolve({
            data: {
              name: name,
              description: description,
              _id: 'mocks-group-id-new',
              users: []
            }
          })
        } else {
          reject(new Error('Incorrect name'))
        }
      })
    })
  },

  deleteGroup (groupId) {
    return new Promise((resolve, reject) => {
      process.nextTick(() => {
        if (groupId) {
          resolve({})
        } else {
          reject(new Error('Incorrect group Id'))
        }
      })
    })
  },

  updateGroup (id, { description }) {
    return new Promise((resolve, reject) => {
      process.nextTick(() => {
        const group = groups.find(g => g._id === id)
        if (group) {
          resolve({
            data: {
              _id: id,
              name: group.name,
              description: description || group.description,
              users: group.userIds || []
            }
          })
        } else {
          reject(new Error('Api'))
        }
      })
    })
  },

  getGroups () {
    return new Promise((resolve, reject) => {
      process.nextTick(() => {
        resolve({ data: groups })
      })
    })
  },

  addUserToGroup (userId, groupId) {
    return new Promise((resolve, reject) => {
      process.nextTick(() => {
        const group = groups.find(g => g._id === groupId)
        if (group && userId) {
          resolve({
            data: {
              name: group.name,
              _id: group._id,
              descritpion: group.description,
              users: [...group.users, userId]
            }
          })
        } else {
          reject(new Error('Api'))
        }
      })
    })
  },

  removeUserFromGroup (userId, groupId) {
    return new Promise((resolve, reject) => {
      process.nextTick(() => {
        const group = groups.find(g => g._id === groupId)
        if (group && userId) {
          resolve({
            data: {
              name: group.name,
              users: group.users.filter(id => id !== userId),
              _id: group._id,
              description: group.description
            }
          })
        } else {
          reject(new Error('Api'))
        }
      })
    })
  },

  createCorpus (name, description) {
    return new Promise((resolve, reject) => {
      process.nextTick(() => {
        if (name) {
          resolve({
            data: {
              name: name,
              description: description,
              _id: 'mocks-corpu-id-new'
            }
          })
        } else {
          reject(new Error('Incorrect name'))
        }
      })
    })
  },

  deleteCorpus (groupId) {
    return new Promise((resolve, reject) => {
      process.nextTick(() => {
        if (groupId) {
          resolve({})
        } else {
          reject(new Error('Incorrect group Id'))
        }
      })
    })
  },

  updateCorpus (id, { name, description }) {
    return new Promise((resolve, reject) => {
      process.nextTick(() => {
        const corpu = corpus.find(c => c._id === id)
        if (corpu) {
          resolve({
            data: {
              _id: id,
              name: name || corpu.name,
              description: description || corpu.description
            }
          })
        } else {
          reject(new Error('Api'))
        }
      })
    })
  },

  getCorpora () {
    return new Promise((resolve, reject) => {
      process.nextTick(() => {
        resolve({ data: corpus })
      })
    })
  },

  setCorpusPermissionsForGroup (corpuId, groupId, permission) {
    return new Promise((resolve, reject) => {
      process.nextTick(() => {
        const corpu = corpus.find(c => c._id === corpuId)
        if (corpu && groupId) {
          corpu.permissions.groups = corpu.permissions.groups || {}
          corpu.permissions.groups[groupId] = permission
          resolve({ data: corpu.permissions })
        } else {
          reject(new Error('Api'))
        }
      })
    })
  },

  removeCorpusPermissionsForGroup (corpuId, groupId) {
    return new Promise((resolve, reject) => {
      process.nextTick(() => {
        const corpu = corpus.find(c => c._id === corpuId)
        if (groupId && corpu) {
          if (
            corpu.permissions &&
            corpu.permissions.groups &&
            corpu.permissions.groups[groupId]
          ) {
            delete corpu.permissions.groups[groupId]
          }
          resolve({ data: corpu.permissions })
        } else {
          reject(new Error('Api'))
        }
      })
    })
  },

  setCorpusPermissionsForUser (corpuId, userId, permission) {
    return new Promise((resolve, reject) => {
      process.nextTick(() => {
        const corpu = corpus.find(c => c._id === corpuId)
        if (corpu && userId) {
          corpu.permissions.users = corpu.permissions.users || {}
          corpu.permissions.users[userId] = permission
          resolve({ data: corpu.permissions })
        } else {
          reject(new Error('Api'))
        }
      })
    })
  },

  removeCorpusPermissionsForUser (corpuId, userId) {
    return new Promise((resolve, reject) => {
      process.nextTick(() => {
        const corpu = corpus.find(c => c._id === corpuId)
        if (userId && corpu) {
          if (
            corpu.permissions &&
            corpu.permissions.users &&
            corpu.permissions.users[userId]
          ) {
            delete corpu.permissions.users[userId]
          }
          resolve({ data: corpu.permissions })
        } else {
          reject(new Error('Api'))
        }
      })
    })
  },

  createMedium (corpuId, name, url, description) {
    return new Promise((resolve, reject) => {
      process.nextTick(() => {
        if (name && corpuId) {
          resolve({
            data: {
              name,
              _id: 'mocks-media-id-new',
              url,
              description,
              id_corpus: corpuId
            }
          })
        } else {
          reject(new Error('Api'))
        }
      })
    })
  },

  deleteMedium (mediaId) {
    return new Promise((resolve, reject) => {
      process.nextTick(() => {
        if (mediaId) {
          resolve()
        } else {
          reject(new Error('Api'))
        }
      })
    })
  },

  updateMedium (mediaId, { name, url, description }) {
    return new Promise((resolve, reject) => {
      process.nextTick(() => {
        const media = medias.find(m => m._id === mediaId)
        if (media) {
          resolve({
            data: {
              name: name || media.name,
              _id: mediaId,
              url: url || media.url,
              description: description || media.description,
              id_corpus: media.id_corpus
            }
          })
        } else {
          reject(new Error('Api'))
        }
      })
    })
  },

  getMedia () {
    return new Promise((resolve, reject) => {
      process.nextTick(() => {
        resolve({ data: medias })
      })
    })
  },

  createLayer (
    corpuId,
    name,
    description,
    fragmentType,
    metadataType,
    annotations
  ) {
    return new Promise((resolve, reject) => {
      process.nextTick(() => {
        if (name && corpuId) {
          resolve({
            data: {
              name,
              _id: 'mocks-layer-id-new',
              description,
              fragment_type: fragmentType,
              data_type: metadataType,
              annotations,
              id_corpus: corpuId
            }
          })
        } else {
          reject(new Error('Api'))
        }
      })
    })
  },

  deleteLayer (layerId) {
    return new Promise((resolve, reject) => {
      process.nextTick(() => {
        if (layerId) {
          resolve()
        } else {
          reject(new Error('Api'))
        }
      })
    })
  },

  updateLayer (layerId, { name, fragment_type, data_type, description }) {
    return new Promise((resolve, reject) => {
      process.nextTick(() => {
        const layer = layers.find(l => l._id === layerId)
        if (layer) {
          resolve({
            data: {
              name: name || layer.name,
              _id: layerId,
              description: description || layer.description,
              fragment_type: fragment_type || layer.fragment_type,
              data_type: data_type || layer.data_type
            }
          })
        } else {
          reject(new Error('Api'))
        }
      })
    })
  },

  getLayers () {
    return new Promise((resolve, reject) => {
      process.nextTick(() => {
        resolve({ data: layers })
      })
    })
  },

  setLayerPermissionsForGroup (layerId, groupId, permission) {
    return new Promise((resolve, reject) => {
      process.nextTick(() => {
        const layer = layers.find(l => l._id === layerId)
        if (layer && groupId) {
          layer.permissions.groups = layer.permissions.groups || {}
          layer.permissions.groups[groupId] = permission
          resolve({ data: layer.permissions })
        } else {
          reject(new Error('Api'))
        }
      })
    })
  },

  removeLayerPermissionsForGroup (layerId, groupId) {
    return new Promise((resolve, reject) => {
      process.nextTick(() => {
        const layer = layers.find(c => c._id === layerId)
        if (groupId && layer) {
          if (
            layer.permissions &&
            layer.permissions.groups &&
            layer.permissions.groups[groupId]
          ) {
            delete layer.permissions.groups[groupId]
          }
          resolve({ data: layer.permissions })
        } else {
          reject(new Error('Api'))
        }
      })
    })
  },

  setLayerPermissionsForUser (layerId, userId, permission) {
    return new Promise((resolve, reject) => {
      process.nextTick(() => {
        const layer = layers.find(c => c._id === layerId)
        if (layer && userId) {
          layer.permissions.users = layer.permissions.users || {}
          layer.permissions.users[userId] = permission
          resolve({ data: layer.permissions })
        } else {
          reject(new Error('Api'))
        }
      })
    })
  },

  removeLayerPermissionsForUser (layerId, userId) {
    return new Promise((resolve, reject) => {
      process.nextTick(() => {
        const layer = layers.find(c => c._id === layerId)
        if (userId && layer) {
          if (
            layer.permissions &&
            layer.permissions.users &&
            layer.permissions.users[userId]
          ) {
            delete layer.permissions.users[userId]
          }
          resolve({ data: layer.permissions })
        } else {
          reject(new Error('Api'))
        }
      })
    })
  },

  createAnnotation (layerId, mediaId, fragment, data) {
    return new Promise((resolve, reject) => {
      process.nextTick(() => {
        if (layerId) {
          resolve({
            data: {
              name,
              _id: 'mocks-annotation-id-new',
              fragment,
              data,
              id_medium: mediaId,
              id_layer: layerId
            }
          })
        } else {
          reject(new Error('Api'))
        }
      })
    })
  },

  deleteAnnotation (annotationId) {
    return new Promise((resolve, reject) => {
      process.nextTick(() => {
        if (annotationId) {
          resolve()
        } else {
          reject(new Error('Api'))
        }
      })
    })
  },

  updateAnnotation (annotationId, { fragment, data }) {
    return new Promise((resolve, reject) => {
      process.nextTick(() => {
        const annotation = annotations.find(m => m._id === annotationId)
        if (annotation) {
          resolve({
            data: {
              _id: annotationId,
              fragment: fragment || annotation.fragment,
              data: data || annotation.data,
              id_medium: annotation.mediaId,
              id_layer: annotation.layerId
            }
          })
        } else {
          reject(new Error('Api'))
        }
      })
    })
  },

  getAnnotations () {
    return new Promise((resolve, reject) => {
      process.nextTick(() => {
        resolve({ data: annotations })
      })
    })
  }
}

export default api
