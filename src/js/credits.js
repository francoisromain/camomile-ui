/* global npmAuthorUrl npmName npmVersion webpackDate __webpack_hash__ */

import log from './log'

export default _ => {
  log.button('Made with by', npmAuthorUrl)
  log.simple('Name', npmName)
  log.simple('Version', npmVersion)
  log.simple('Build', __webpack_hash__)
  log.simple('Date', webpackDate)
}
