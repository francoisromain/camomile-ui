// import Camomile from '../../../../camomile-client-javascript' /* debug with local version */
import Camomile from 'camomile-client'
import camomile from './js/api' /* axios api */

const config = {
  title: 'Camomile UI',
  user: {
    name: 'root',
    password: 'roO7p4s5wOrD'
  },
  url: 'http://localhost:3000',
  roles: ['admin', 'user'],
  axios: false
}

const api = config.axios ? camomile(config.url) : new Camomile(config.url)

export default config

export { api }
