export default {
  splitText(text) {
    var textNew = []
    text.replace(/./g, function(char) {
      textNew.push(`<span class="typed">${char}</span>`)
    })
    return textNew.join('')
  },

  numberFormat(value) {
    return Math.round(value)
      .toString()
      .replace(/(\d)(?=(\d{3})+$)/g, '$1 ')
  },

  debounce(func, wait, immediate) {
    var timeout
    return function() {
      var context = this
      var args = arguments
      var later = function() {
        timeout = null
        if (!immediate) func.apply(context, args)
      }
      var callNow = immediate && !timeout
      clearTimeout(timeout)
      timeout = setTimeout(later, wait)
      if (callNow) func.apply(context, args)
    }
  },

  map(value, inMin, inMax, outMin, outMax) {
    return (value - inMin) * (outMax - outMin) / (inMax - inMin) + outMin
  },

  range(start, end, tick) {
    const s = Math.round(start / tick) * tick
    const ticks = Math.floor((end - start) / tick)
    return Array.from({ length: ticks ? ticks + 1 : 0 }, (v, k) => {
      return k * tick + s
    })
  },

  audioFade(media, audioOn, volumeTarget) {
    var duration = 3000
    var tick = 20
    var volumeStep = (media.volume - volumeTarget) / (duration / tick)

    var fade = function() {
      var vol = Math.min(volumeTarget, media.volume + volumeStep)
      media.volume = vol
      if (media.transition === 'audioStart' && media.volume < volumeTarget) {
        setTimeout(fade, tick)
      } else if (media.transition === 'audioStart') {
        media.transition = ''
      }
    }

    var fadeStart = function() {
      media.removeEventListener('timeupdate', fadeStart)
      fade()
    }

    if (audioOn) {
      media.addEventListener('timeupdate', fadeStart)
      media.transition = 'audioStart'
    }
  },

  audioStart(media, audioOn) {
    var volumeFinal = 1
    var duration = 3000
    var tick = 20
    var volumeStep = volumeFinal / (duration / tick)

    var audioStartUp = function() {
      var vol = Math.min(volumeFinal, media.volume + volumeStep)
      media.volume = vol
      if (media.transition === 'audioStart' && media.volume < volumeFinal) {
        setTimeout(audioStartUp, tick)
      } else if (media.transition === 'audioStart') {
        media.transition = ''
      }
    }

    var audioStartBegin = function() {
      media.removeEventListener('timeupdate', audioStartBegin)
      audioStartUp()
    }

    if (audioOn) {
      media.addEventListener('timeupdate', audioStartBegin)
      media.transition = 'audioStart'
    }
  },

  audioStop(media) {
    var volumeFinal = 0.05
    var duration = 2000
    var tick = 20
    var volumeStep = (media.volume - volumeFinal) / (duration / tick)

    if (!volumeStep) {
      return
    }

    var audioStopDown = function() {
      var vol = Math.max(0, media.volume - volumeStep)
      media.volume = vol

      if (media.transition === 'audioStop' && media.volume > volumeFinal) {
        setTimeout(audioStopDown, tick)
      } else if (media.transition === 'audioStop') {
        media.transition = ''
        media.volume = 0
      }
    }
    media.transition = 'audioStop'
    audioStopDown()
  },

  findIndexByPage(page, pages) {
    return pages.findIndex((v, i, array) => {
      return page.params.id
        ? v.name === page.name && v.params.id === Number(page.params.id)
        : v.name === page.name
    })
  }
}
