/* global __webpack_hash__ version */

console.log('%chttp://virtu.paris | http://francoisromain.com', 'padding:8px 16px; color:#fff; background-color:#666; line-height:24px;')
const hash = __webpack_hash__ // eslint-disable-line camelcase

console.log('[version: ' + version + ']') // from package.json through webpack
console.log('[build: ' + hash + ']')

const req = new XMLHttpRequest()
const app = document.getElementById('loader-app')
const loaderBar = document.getElementById('loader-bar')
let script = null
let percentComplete = 0
let loading = 0

const scriptLoad = (s) => {
  const scriptTag = document.createElement('script')
  scriptTag.innerHTML = s
  document.body.appendChild(scriptTag)
  setTimeout(() => {
    app.style.visibility = 'visible'
  }, 0)
  scriptTag.addEventListener('load', () => {
    console.log('Script loading complete')
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

req.addEventListener('progress', (event) => {
  if (event.lengthComputable) {
    percentComplete = 100 * event.loaded / event.total
  } else {
    percentComplete = 100
  }
}, false)

req.addEventListener('load', (event) => {
  script = event.target.responseText
  if (loading === 100) {
    scriptLoad(script)
  }
}, false)

app.style.visibility = 'hidden'
req.open('GET', 'app.' + hash + '.js')
req.send()
