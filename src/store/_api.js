import config from '../config'
// import Camomile from '../../../camomile-client-javascript' /* debug with local version */
import Camomile from 'camomile-client'
import camomile from '../js/api' /* axios api */

export default (config.axios ? camomile(config.url) : new Camomile(config.url))
