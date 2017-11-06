import axios from 'axios'

export default url => {
  const api = axios.create({
    baseURL: url,
    withCredentials: true
  })

  const _get = async uri => {
    try {
      const response = await api.get(uri)
      console.log(uri, response.data)
      return response.data
    } catch (e) {
      console.log('error', uri, e)
      throw e
    }
  }

  const _post = async (uri, data) => {
    try {
      const response = await api.post(uri, data)
      console.log(uri, response.data)
      return response.data
    } catch (e) {
      console.log('error', uri, e)
      throw e
    }
  }

  const _put = async (uri, data) => {
    try {
      const response = await api.put(uri, data)
      console.log(uri, response.data)
      return response.data
    } catch (e) {
      console.log('error', uri, e)
      throw e
    }
  }

  return {
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
