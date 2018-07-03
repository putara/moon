<script>
import { newArray } from './array';

function daysInMonth(y, m){
  return [31,28,31,30,31,30,31,31,30,31,30,31][m] + ((m == 1 && (((y % 4) == 0 && (y % 100) != 0) || (y % 400) == 0)) ? 1 : 0);
}

function deltaMonth(date, delta){
  var y = date.getFullYear();
  var m = date.getMonth() + delta;
  if (m < 0) {
    y--;
    m = 11;
  } else if (m > 11) {
    y++;
    m = 0;
  }
  return new Date(y, m, 1);
}

function isToday(y, m, d){
  var now = new Date();
  return now.getFullYear() == y && now.getMonth() == m && now.getDate() == d;
}

export default {
  props: {
    value: { type: Date, required: true },
    days : { type: Array, default: () => ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'] },
    months : { type: Array, default: () => ['January','February','March','April','May','June','July','August','September','October','November','December'] },
    buttons : { type: Array, default: () => ['<', '>'] },
    format : { type: String, default: '$M $Y'},
    fixed : { type: Boolean, default: true }
  },
  data(){
    return {
      val: this.value
    };
  },
  watch: {
    val(val){
      this.$emit('input', val);
    },
    value(val){
      if (this.val !== val) {
        this.val = val;
      }
    }
  },
  render(h){
    var cur = this.value;
    var year = cur.getFullYear();
    var month = cur.getMonth();
    var firstDay = (new Date(year, month, 1)).getDay();
    var lastDay = daysInMonth(year, month);
    var rows = this.fixed ? 6 : Math.ceil((firstDay + lastDay) / 7);
    var cell = this.cell;
    var self = this;
    function clickable(delta){
      return function(e){
        self.val = deltaMonth(self.val, delta);
      }
    }
    return h('table', { class: 'cal', attrs: { border: 0, cellspacing: 0, cellpadding: 0 } }, [
        h('thead', {}, [
          h('tr', {}, [
            h('th', { attrs: { colspan: 7 } }, [
              h('div', { class: 'cal-hdr' }, [
                h('button', { class: 'cal-bk', on: { click: clickable(-1) } }, this.buttons[0]),
                h('button', { class: 'cal-fw', on: { click: clickable(+1) } }, this.buttons[1]),
                h('span', { class: 'cal-month' }, this.format.replace('$Y', year).replace('$M', this.months[month])),
                this.$slots.header
              ])
            ])
          ]),
          h('tr', { class: 'cal-week' }, this.days.map(function(e, i){
            return h('th', { class: 'cal-wd' + i }, e);
          }))
        ]),
        h('tbody', { class: 'cal-weeks' }, newArray(rows, (y) => {
            return h('tr', { class: 'cal-week' }, newArray(7, (x) => {
              var date = y * 7 + x - firstDay + 1;
              return h('td', { class: 'cal-wk' + y + ' ' + 'cal-wd' + x },
                date > 0 && date <= lastDay ? [
                  h('div', { class: 'cal-day' }, [
                    h('span', { class: 'cal-day-text' + (isToday(year, month, date) ? ' cal-today' : '') }, '' + date),
                    this.$scopedSlots.default({ date: new Date(year, month, date)})
                  ])
                ] : null);
            }));
          }))
      ]);
  }
}
</script>
