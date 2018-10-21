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
  mounted () {
    this.getWindowSize()
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.getWindowSize)
  },

  methods: {
    getWindowSize () {
      if (this.$el) {
        this.windowHeight = this.$el.clientHeight
        this.windowWidth = this.$el.clientWidth
      }
    }
  }
}
