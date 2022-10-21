<template>
  <div>
    <div class="toolbox">
      <button @click="updateFirstRow">Update first row</button>
      <button @click="changeZoomLevel">Change zoom level</button>
    </div>
    <div class="gstc-wrapper" ref="gstc"></div>
  </div>
</template>

<script>
import GSTC from 'gantt-schedule-timeline-calendar/dist/gstc.wasm.esm.min.js'
import { Plugin as TimelinePointer } from 'gantt-schedule-timeline-calendar/dist/plugins/timeline-pointer.esm.min.js'
import { Plugin as Selection } from 'gantt-schedule-timeline-calendar/dist/plugins/selection.esm.min.js'
import { Plugin as ItemResizing } from 'gantt-schedule-timeline-calendar/dist/plugins/item-resizing.esm.min.js'
import { Plugin as ItemMovement } from 'gantt-schedule-timeline-calendar/dist/plugins/item-movement.esm.min.js'
import { Plugin as Bookmarks } from 'gantt-schedule-timeline-calendar/dist/plugins/time-bookmarks.esm.min.js'
import 'gantt-schedule-timeline-calendar/dist/style.css'

let gstc, state

// helper functions

function generateRows() {
  /**
   * @type { import("gantt-schedule-timeline-calendar").Rows }
   */
  const rows = {}
  for (let i = 0; i < 100; i++) {
    const id = GSTC.api.GSTCID(i.toString())
    rows[id] = {
      id,
      label: `Row ${i}`
    }
  }
  return rows
}

function generateItems() {
  /**
   * @type { import("gantt-schedule-timeline-calendar").Items }
   */
  const items = {}
  let start = GSTC.api.date().startOf('day').subtract(6, 'day')
  for (let i = 0; i < 100; i++) {
    const id = GSTC.api.GSTCID(i.toString())
    const rowId = GSTC.api.GSTCID(Math.floor(Math.random() * 100).toString())
    start = start.add(1, 'day')
    items[id] = {
      id,
      label: `Item ${i}`,
      rowId,
      time: {
        start: start.valueOf(),
        end: start.add(1, 'day').endOf('day').valueOf()
      }
    }
  }
  return items
}

// main component

export default {
  name: 'GSTC',
  mounted() {
    /**
     * @type { import('gantt-schedule-timeline-calendar').Config }
     */
    const config = {
      licenseKey:
        '====BEGIN LICENSE KEY====\nrLOAIlibaYBBfXdnIImmHYBU8F00kZzweYCqpT3UB4qZy3t749UMO+TEDgb03PiwBOmXI1znuwP2N32Ngbssu/7mKZniKkDGX8khm0CTwbETmUsDkWTt8ukcQTLRmedHrMbjFtOKNgqSZiISzAOPvdQZ/7j4ZQFstb5R9t/07RYmfOW1laPeST2hPxQRlFIwUOrItWLAGqfVEwnfcWXKpEhorc/on4jKN1lVmbCv79Ffh2FMuBaeoxwI1z4ayh6Pv+DltLa+srIdsl8iXZUNOslGuu78Tg8VAVeDcATLo97I2Wd3p8zszFh0W4I6cbOJ81Qz6OdQzuaLclX+u8EquA==||U2FsdGVkX19mIEJr3sl745KnmaA61/PHoZ0OnyqhZEiybzrWnPHJOJAxDOSRdjxCA0AjbIWF5RnEisA2yzUbLHAooegmC50tv5C8qg0zqDA=\nMzcPhvtv3wt/SZ4b6LUA/vFTdfnvN6h86uIzPe6bQ09Vy3rSKBQAeZG7rdCcyJBmE4hmz02/jmUih98oW0io+H4QA5l3YbPCDP5K+vM63AWupnOd8oDdVSDLl6BXrb5dMYTDcCJWB52oo0DHR0mIcZQY5L+JZ6+J7i5gm3i6Om/8WwfXF4NcmhMMpsxasVhXqfW0YbLUXM4Iil4Zkny9SgThuKB3Z6QQb6kZDplUD0oGipjeTVHd/psTlgKMAhQt4k6N2ybucYHgJ5GvlCIOpEnawZc8nhdFxmw9hul5C6fpcNGfjn+0CUGxYmy0Khck1qkCL1N2sEXI1zepHaGXEA==\n====END LICENSE KEY====',
      plugins: [TimelinePointer(), Selection(), ItemResizing(), ItemMovement(), Bookmarks()],
      list: {
        columns: {
          data: {
            [GSTC.api.GSTCID('id')]: {
              id: GSTC.api.GSTCID('id'),
              width: 60,
              data: ({ row }) => GSTC.api.sourceID(row.id),
              header: {
                content: 'ID'
              }
            },
            [GSTC.api.GSTCID('label')]: {
              id: GSTC.api.GSTCID('label'),
              width: 200,
              data: 'label',
              header: {
                content: 'Label'
              }
            }
          }
        },
        rows: generateRows()
      },
      chart: {
        items: generateItems()
      }
    }

    state = GSTC.api.stateFromConfig(config)

    gstc = GSTC({
      element: this.$refs.gstc,
      state
    })
  },

  beforeUnmount() {
    if (gstc) gstc.destroy()
  },

  methods: {
    updateFirstRow() {
      state.update(`config.list.rows.${GSTC.api.GSTCID('0')}`, (row) => {
        row.label = 'Changed dynamically'
        return row
      })
    },

    changeZoomLevel() {
      state.update('config.chart.time.zoom', 21)
    }
  }
}
</script>
<style scoped>
.gstc-component {
  margin: 0;
  padding: 0;
}
.toolbox {
  padding: 10px;
}
</style>
