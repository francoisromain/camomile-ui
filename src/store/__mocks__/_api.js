const users = [
  {
    _id: '5a1de2476b145200014daa1f',
    username: 'lu',
    role: 'user',
    description: ''
  },
  {
    _id: '5a1de2526b145200014daa20',
    username: 'ji',
    role: 'admin',
    description: ''
  },
  {
    _id: '5a21a6ffe0fb8700014fa47c',
    username: 'joe',
    role: 'user',
    description: ''
  }
]

const api = {
  createUser (name, password, description, role) {
    return new Promise((resolve, reject) => {
      process.nextTick(() => {
        if (name && password) {
          resolve({
            username: name,
            description: description,
            role: role,
            _id: '5a1de2476b145200014daa1y'
          })
        } else {
          reject(new Error('Incorrect name'))
        }
      })
    })
  }
}

export default api
