<template>
  <g>
    <text
      x="0"
      y="35"
      font-family="Verdana"
      font-size="35">{{ o.xMax }}
    </text>
    <line
      :y1="y"
      :x2="svg.w"
      :y2="y"
      x1="0"
      stroke-width="1"
      stroke="silver" />
    <line
      v-for="(tickX, $index) in tickXs"
      :key="$index"
      :x1="tickX"
      :y1="y"
      :x2="tickX"
      :y2="y + 5"
      stroke-width="1"
      stroke="silver" />
  </g>
</template>

<script>
import lib from '../js/lib'

export default {
  props: ['o', 'svg'],

  computed: {
    y () {
      return lib.map(0, this.o.yMin, this.o.yMax, this.svg.h, 0)
    },
    tickXs () {
      const ticks = lib.range(this.o.xMin, this.o.xMax, 60 * 1000)
      return ticks.map(tick =>
        lib.map(tick, this.o.xMin, this.o.xMax, 0, this.svg.w)
      )
    }
  }
};
</script>
