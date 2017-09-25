<template>
  <div id="app">
    <div>
      <div class="color-header">
        <Icon :color="selected" style="width: auto;">
          Color
        </Icon>
      </div>
    </div>
    <grid
      :center="false"
      :draggable="true"
      :sortable="true"
      :items="colors"
      :height="80"
      :width="80"
      @change="change"
      @remove="remove"
      @click="click"
      @sort="sort">
      <template slot="cell" scope="props">
        <Icon :color="props.item"
              :index="props.index"
              :with-button="true"
              @remove="props.remove()"/>
      </template>
    </grid>
<!--
    <grid
      :center="false"
      :draggable="true"
      :sortable="true"
      :items="items"
      @change="change"
      @remove="remove"
      @sort="sort">
      <template slot="cell" scope="scope">
        <Icon :index="scope.index">
          {{scope.index}} / {{scope.sort}}
        </Icon>
      </template>
    </grid>
-->
  </div>
</template>

<script>
import Icon from './Icon.vue'
import { generateRGBColors } from './util'

export default {
  name: 'app',
  components: {
    Icon
  },
  data () {
    let colors = generateRGBColors(20)

    return {
      colors,
      selected: null
    }
  },

  mounted () {
    /*
    setInterval(() => {
      let item = {
        color:  generateRGBColors(1)[0],
        index: this.items.length
      }
      this.items.push(item)
    }, 5000)
    */
  },

  methods: {
    click ({ items, index }) {
      let value = items.find(v => v.index === index)
      this.selected = value.item

      console.log(this.selected)
    },

    change (event) {
      console.log('change', event)
    },

    remove (event) {
      console.log('remove', event)
    },

    sort (event) {
      console.log('sort', event)
    }
  }
}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

.color-header {
  position: relative;
  padding: 10px 0;
  box-sizing: border-box;
}
</style>
