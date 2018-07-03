<template>
  <svg :viewBox="viewBox">
    <defs>
      <filter :id="filterId" width="4" height="4" x="-1" y="-1">
        <feFlood flood-opacity=".8" :flood-color="fgColor" result="a"/>
        <feComposite in="a" in2="SourceGraphic" operator="in" result="b"/>
        <feGaussianBlur in="b" :stdDeviation="glow" result="c"/>
        <feOffset dx="0" dy="0" result="d"/>
        <feComposite in="SourceGraphic" in2="d"/>
      </filter>
    </defs>
    <circle :cx="centre" :cy="centre" :r="radius" :fill="bgColor"/>
    <path v-if="visible" :d="path" :fill="fgColor" :filter="filterUrl"/>
  </svg>
</template>

<script>
const RADIUS = 50;
const BLUR = 10;

const CENTRE = RADIUS + BLUR;
const SIZE = CENTRE * 2;
var lastId = 0;

export default {
  props: {
    value: { type: Number, default: 0 },
    bgColor: { type: String, default: '#333333' },
    fgColor: { type: String, default: '#ffff88' }
  },
  computed: {
    viewBox(){
      return `0 0 ${SIZE} ${SIZE}`;
    },
    centre(){
      return CENTRE;
    },
    radius(){
      return RADIUS;
    },
    glow(){
      return BLUR / 2;
    },
    filterUrl(){
      return 'url(#' + this.filterId + ')';
    },
    visible(){
      const FXINT = 1000;
      var phase = this.value;
      var phfxi = Math.round(phase * FXINT);
      return phfxi >= 1 && phfxi <= (FXINT - 1);
    },
    path(){
      var phase = this.value;
      var inv1 = phase > .5 ? 1 : 0;
      var ninv1 = !inv1 | 0;
      var inv2 = phase < .25 || (phase > .5 && phase < .75) ? 1 : 0;
      var ninv2 = !inv2 | 0;
      var x = phase > .5 ? RADIUS * (phase * 4 - 3) : RADIUS * (1 - phase * 4);
      return `M ${CENTRE} ${BLUR} A ${RADIUS},${RADIUS} 0 ${inv1},${ninv1} ${CENTRE},${CENTRE + RADIUS} A ${x},${RADIUS} 0 ${inv2},${ninv2} ${CENTRE},${BLUR}`;
    }
  },
  beforeCreate(){
    this.filterId = 'moon-f-' + ++lastId;
  }
}
</script>
