export default {
  data () {
    return {
      windowHeight: 0,
      windowWidth: 0
    }
  },
  
  created () {
    window.addEventListener('resize', this.getWindowSize)
    this.getWindowSize()
  },

  beforeDestroy () {
    window.removeEventListener('resize', this.getWindowSize)
  },

  methods: {
    getWindowSize () {
      this.windowHeight = window.innerHeight
      this.windowWidth = window.innerWidth
    }
  }
}
