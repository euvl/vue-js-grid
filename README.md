### vue-js-grid

Fixed size grid for Vue.js

### Install

npm install --save vue-js-grid

```js
import Vue from 'vue'
import Grid from 'vue-js-grid'

Vue.use(Grid)
```

### Props

| Name       | Type     | Default   | Description       |
| ---        | ---      | ---       | ---               |
| items      | [Object] | []        | |
| cellWidth  | Number   | 80        | |
| cellHeight | Number   | 80        | |
| draggable  | Boolean  | false     | |
| dragDelay  | Number   | 0         | @TODO |
| sortable   | Boolean  | false     | |
| center     | Boolean  | false     | @TODO |

### Events

| Name    | Description |
| ---     | ---         |
| @change | |
| @remove | |
| @click  | |
| @sort   | |

### Example

```js
data () {
  return ['a', 'b', 'c']
}
```

```vue
<grid
  :draggable="true"
  :sortable="true"
  :items="items"
  :height="80"
  :width="80"
  @change="change"
  @remove="remove"
  @click="click"
  @sort="sort">
  <template slot="cell" scope="props">
    <div>{{props.item}}</div>
  </template>
</grid>
```

### Roadmap

1. Add element insertion
2. Add tests
