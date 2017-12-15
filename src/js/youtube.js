export default (videoId, width, height, playerVars, events) => {
  console.log('youtube', url)
  const tag = document.createElement('script')
  const scriptTags = document.getElementsByTagName('script')
  const scriptTagLast = scriptTags[scriptTags.length - 1]

  tag.src = 'https://www.youtube.com/iframe_api'
  scriptTagLast.parentNode.insertBefore(tag, scriptTagLast.nextSibling)

  window.onYouTubeIframeAPIReady = () => {
    const player = new YT.Player('player', {
      width,
      height,
      videoId,
      playerVars,
      events
    })
  }
}
