<template>
  <div id="app">
    <h1>&#127773; Calendar &#127761;</h1>
    <v-calendar v-model="date" :buttons="['< Prev','Next >']">
      <label slot="header"><input type="checkbox" v-model="invert">Sth Hemi</label>
      <template slot-scope="{date}">
        <v-moon class="moon" :value="phase(date)"/>
      </template>
    </v-calendar>
    <footer id="moons">
      <v-moon class="moon" v-for="m in moons" :key="m" :value="m"/>
    </footer>
  </div>
</template>

<script>
import vMoon from './moon.vue';
import vCalendar from './calendar.vue';
import { newArray } from './array';
import { calcPhase } from './phase';

export default {
  name: 'app',
  components: {
    vMoon,
    vCalendar
  },
  data: () => ({
    date: new Date(),
    invert: false,
    moons: newArray(9, (i) => i / 8)
  }),
  methods: {
    phase(date){
      var phase = calcPhase(date);
      return this.invert ? (1 - phase) : phase;
    }
  }
}
</script>

<style>
body {
  background: #000 radial-gradient(at center bottom,#000,#031890) 50%/200% no-repeat;
  color: #fff;
  font-family: sans-serif;
  line-height: 1;
  margin: 0;
  padding: 0;
  overflow: hidden;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  -o-user-select: none;
  user-select: none;
  height: 100vh;
}

h1 {
  text-align: center;
  font-size: 4vmin;
  font-weight: normal;
  line-height: 1.5;
}

#moons {
  display: flex;
  justify-content: center;
}

#moons > .moon {
  width: 8vmin;
  height: 8vmin;
  opacity: .5;
}

#moons > .moon:hover {
  opacity: 1;
}

.cal {
  margin: auto;
}
.cal th {
  font-size: 2vmin;
}
.cal-hdr {
  display: flex;
  font-size: 2.5vmin;
  padding-bottom: .5vmin;
}
.cal button {
  font-size: 2vmin;
  padding: 0 1em;
}
.cal-month {
  flex: 1;
}
.cal-day {
  position: relative;
}
.cal-day-text {
  position: absolute;
  font-size: 2vmin;
  left: 1px;
  top: 1px;
  text-shadow: 1px 0 #000,-.9px -.5px #000,.5px .9px #000,-.1px -1px #000,-.5px .9px #000,.8px -.6px #000,-1px .1px #000,.9px .4px #000,-.6px -.9px #000,.1px 1px #000,.4px -1px #000,-.8px .6px #000,1px -.2px #000,-1px -.4px #000,.7px .7px #000,-.3px -1px #000,-.3px 1px #000;
}
.cal-wd0 {
  color: #fcc;
}
.cal-wd6 {
  color: #ccf;
}
.cal-day .moon {
  width: 12vmin;
  height: 12vmin;
}
.cal-day:hover {
  background: rgba(255,255,255,.255);
}
.cal-today {
  color: #cfc;
}
</style>
