/* global __webpack_hash__  */

import credits from './credits'
import log from './log'

const req = new XMLHttpRequest()
const fileName = 'app.' + __webpack_hash__ + '.js' // eslint-disable-line camelcase
const app = document.getElementById('loader-app')
const loaderBar = document.getElementById('loader-bar')
let script = null
let percentComplete = 0
let loading = 0

const scriptLoad = s => {
  const scriptTag = document.createElement('script')
  scriptTag.type = 'text/javascript'
  scriptTag.src = fileName
  document.body.appendChild(scriptTag)
  setTimeout(() => {
    app.style.visibility = 'visible'
  }, 0)
  scriptTag.addEventListener('load', () => {
    log.simple('Loading', 'Complete')
  })
}

const timer = () => {
  loading += 0.4
  loading = Math.min(percentComplete, loading)
  loaderBar.style.width = loading + '%'
  if (loading === 100) {
    clearInterval(interval)
    if (script) {
      scriptLoad(script)
    }
  }
}

const interval = setInterval(() => {
  if (timer) {
    timer()
  }
}, 0)

req.addEventListener(
  'progress',
  event => {
    if (event.lengthComputable) {
      percentComplete = 100 * event.loaded / event.total
    } else {
      percentComplete = 100
    }
  },
  false
)

req.addEventListener(
  'load',
  event => {
    script = event.target.responseText
    if (loading === 100) {
      scriptLoad(script)
    }
  },
  false
)

app.style.visibility = 'hidden'
req.open('GET', fileName)
req.send()
credits()
