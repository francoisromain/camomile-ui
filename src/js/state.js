export default {
  audio: process.env.NODE_ENV === 'production',
  svg: {
    height: 0,
    width: 0,
    scale: 1
  },
  viewport: {
    name: '',
    width: window.innerWidth,
    height: window.innerHeight
  },
  animations: false
}
