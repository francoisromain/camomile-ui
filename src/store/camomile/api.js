import axios from 'axios'

export default url => {
  const api = axios.create({
    baseURL: url,
    withCredentials: true
  })

  const _get = async uri => {
    try {
      const response = await api.get(uri)
      console.log('get: ', uri, response.data)
      return response.data
    } catch (e) {
      console.log('get error: ', uri, e)
      throw e
    }
  }

  const _post = async (uri, data) => {
    try {
      const response = await api.post(uri, data)
      console.log('post: ', uri, response.data)
      return response.data
    } catch (e) {
      console.log('post error: ', uri, e)
      throw e
    }
  }

  const _put = async (uri, data) => {
    try {
      const response = await api.put(uri, data)
      console.log('put: ', uri, response.data)
      return response.data
    } catch (e) {
      console.log('put error: ', uri, e)
      throw e
    }
  }

  return {
    // User
    login (name, password) {
      return _post('login', {
        username: name,
        password: password
      })
    },
    logout () {
      return _post('logout')
    },
    me () {
      return _get('me')
    },
    update_password (password) {
      return _put('me', {
        password: password
      })
    }
  }
}
