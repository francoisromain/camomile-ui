let player

const _parseYouTubeId = url => {
  var regex = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/
  return url.match(regex) ? RegExp.$2 : url
}

export default (url, width, height, playerVars, events) => {
  const tag = document.createElement('script')
  const scriptTags = document.getElementsByTagName('script')
  const scriptTagLast = scriptTags[scriptTags.length - 1]
  const videoId = _parseYouTubeId(url)

  tag.src = 'https://www.youtube.com/iframe_api'
  scriptTagLast.parentNode.insertBefore(tag, scriptTagLast.nextSibling)

  window.onYouTubeIframeAPIReady = function () {
    console.log('boum')
    player = new YT.Player('player', {
      width,
      height,
      videoId,
      playerVars,
      events
    })
  }
}
