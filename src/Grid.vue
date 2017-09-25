<template>
  <div class="v-grid" :style="style">
    <GridItem v-for="v in list"
              :key="v.index"
              :index="v.index"
              :sort="v.sort"
              :draggable="draggable"
              :drag-delay="dragDelay"
              :row-count="rowCount"
              :cell-width="cellWidth"
              :cell-height="cellHeight"
              :window-width="windowWidth"
              :row-shift="rowShift"
              @dragstart="onDragStart"
              @dragend="onDragEnd"
              @drag="onDrag"
              @click="click">
      <slot name="cell"
            :item="v.item"
            :index="v.index"
            :sort="v.sort"
            :remove="() => { removeItem(v) }"/>
      </slot>
    </GridItem>
  </div>
</template>
<script>
import windowSize from './mixins/window_size.js'
import GridItem from './GridItem.vue'

export default {
  name: 'Grid',
  mixins: [windowSize],
  components: {
    GridItem
  },
  props: {
    items: {
      type: Array,
      default: () => []
    },
    cellWidth: {
      type: Number,
      default: 80,
    },
    cellHeight: {
      type: Number,
      default: 80
    },
    draggable: {
      type: Boolean,
      default: false
    },
    dragDelay: {
      type: Number,
      default: 0
    },
    sortable: {
       type: Boolean,
       default: false
    },
    center: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      list: []
    }
  },
  watch: {
    items: {
      handler: function (nextItems = []) {
        this.list = nextItems.map((item, index) => {
          return {
            item,
            index: index,
            sort: index
          }
        })
      },
      immediate: true
    }
  },
  computed: {
    height () {
      return Math.ceil(this.items.length / this.rowCount) *
        this.cellHeight
    },

    style () {
      return {
        height: this.height + 'px'
      }
    },

    rowCount () {
      return Math.floor(this.windowWidth / this.cellWidth)
    },

    rowShift () {
      if (this.center) {
        let contentWidth = this.items.length * this.cellWidth
        let rowShift = contentWidth < this.windowWidth
          ? (this.windowWidth - contentWidth) / 2
          : (this.windowWidth % this.cellWidth) / 2

        return Math.floor(rowShift)
      }

      return 0
    }
  },
  methods: {
    /* Returns merged event object */
    wrapEvent (other = {}) {
      return {
        datetime: Date.now(),
        items: this.getListClone(),
        ...other
      }
    },
    /* Returns sorted clone of "list" array */
    getListClone () {
      return this.list
        .slice(0)
        .sort((a, b) => {
          return a.sort - b.sort
        })
      //  .map(v => {
      //    return { ...v.item }
      //  })
    },

    removeItem ({ index }) {
      let removeItem = this.list.find(v => v.index === index)
      let removeItemSort = removeItem.sort

      this.list = this.list
        .filter(v => {
          return v.index !== index
        })
        .map(v => {
          let sort = v.sort > removeItemSort
            ? (v.sort - 1)
            : v.sort

          return { ...v, sort }
        })

      this.$emit('remove', this.wrapEvent({ index }))
    },

    onDragStart (event) {
      this.$emit('dragstart', this.wrapEvent(event))
    },

    onDragEnd (event) {
      this.$emit('dragend', this.wrapEvent(event))
    },

    click (event) {
      this.$emit('click', this.wrapEvent(event))
    },

    onDrag (event) {
      if (this.sortable) {
        this.sortList(event.index, event.gridPosition)
      }

      this.$emit('drag', this.wrapEvent({ event }))
    },

    sortList (itemIndex, gridPosition) {
      let targetItem = this.list.find(item => item.index === itemIndex)
      let targetItemSort = targetItem.sort

      /*
        Normalizing new grid position
      */
      gridPosition = Math.max(gridPosition, 0)
      /*
        If you remove this line you can drag items to positions that
        are further than items array length
      */
      gridPosition = Math.min(gridPosition, this.list.length - 1)

      if (targetItemSort !== gridPosition) {
        this.list = this.list.map(item => {
          if (item.index === targetItem.index) {
            return {
              ...item,
              sort: gridPosition
            }
          }

          const { sort } = item

          if (targetItemSort > gridPosition) {
            if (sort <= targetItemSort && sort >= gridPosition) {
              return {
                ...item,
                sort: sort + 1
              }
            }
          }

          if (targetItemSort < gridPosition) {
            if (sort >= targetItemSort && sort <= gridPosition) {
              return {
                ...item,
                sort: sort - 1
              }
            }
          }

          return item
        })

        this.$emit('sort', this.wrapEvent())
      }
    }
  }
}
</script>
<style lang="scss">
body {
  margin: 0;
  padding: 0;
}

.v-grid {
  display: block;
  position: relative;
  width: 100%;
}
</style>
