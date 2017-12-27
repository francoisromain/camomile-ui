import config from '../config'
// import camomile from '../js/api' /* axios api */
// import Camomile from '../../../camomile-client-javascript' /* debug with local version */
import Camomile from 'camomile-client'

// export default camomile(config.url)
export default new Camomile(config.url)
