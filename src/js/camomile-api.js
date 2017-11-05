import axios from 'axios'

export default url => {
  const api = axios.create({
    baseURL: url,
    withCredentials: true
  })

  const headers = {}

  return {
    async login (name, password) {
      try {
        const data = await api.post(`login`, {
          username: name,
          password: password
        })
        if (data.headers['set-cookie'] && data.headers['set-cookie'][0]) {
          console.log('cookie: ', data.headers['set-cookie'][0])
          api.defaults.headers['set-cookie'] = data.headers['set-cookie'][0]
        }
        console.log('login: ', data, api.baseUrl)
        return data.data
      } catch (e) {
        return e
      } finally {
        console.log('login finally')
      }
    },
    async me () {
      try {
        const data = await api.get(`me`)
        console.log('me: ', data.data)
        return data.data
      } catch (e) {
        return e
      } finally {
        console.log('me finally')
      }
    }
  }
}
