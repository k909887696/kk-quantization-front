<template>
  <div class="q-pa-sm">
    <gantt-elastic
      :options="options"
      :tasks="tempTasks"
      @tasks-changed="tasksUpdate"
      @options-changed="optionsUpdate"
      @dynamic-style-changed="styleUpdate"
    >
      <gantt-header :options="options" slot="header" />
    </gantt-elastic>
  </div>
</template>

<style>

</style>

<script>
import GanttElastic from 'gantt-elastic'
import GanttHeader from 'gantt-elastic-header'
import dayjs from 'dayjs'

// just helper to get current dates
function getDate(hours) {
  const currentDate = new Date()
  const currentYear = currentDate.getFullYear()
  const currentMonth = currentDate.getMonth()
  const currentDay = currentDate.getDate()
  const timeStamp = new Date(
    currentYear,
    currentMonth,
    currentDay,
    0,
    0,
    0
  ).getTime()
  return new Date(timeStamp + hours * 60 * 60 * 1000).getTime()
}

const options = {
  taskMapping: {
    progress: 'percent'
  },
  maxRows: 100,
  maxHeight: 600,
  title: {
    label: '项目甘特表',
    html: false
  },
  row: {
    height: 30
  },
  chart: {
    progress: {
      bar: false
    },
    expander: {
      display: true
    }
  },
  taskList: {
    expander: {
      straight: false
    },
    columns: [
      {
        id: 1,
        label: '项目编号',
        value: 'id',
        width: 100
      },
      {
        id: 2,
        label: '项目名称',
        value: 'label',
        width: 200,
        expander: true,
        html: true,
        events: {
          click({ data, column }) {
            alert('description clicked!\n' + data.label)
          }
        }
      },
      {
        id: 3,
        label: '负责人',
        value: 'user',
        width: 130,
        html: true
      },
      {
        id: 3,
        label: '开始时间',
        value: (task) => dayjs(task.start).format('YYYY-MM-DD'),
        width: 78
      },
      {
        id: 4,
        label: '结束时间',
        value: (task) => dayjs(task.end).format('YYYY-MM-DD'),
        width: 78
      },
      {
        id: 5,
        label: '任务类型',
        value: 'type',
        width: 68
      },
      {
        id: 6,
        label: '状态',
        value: 'projectStatus',
        width: 60,
        style: {
          'task-list-header-label': {
            'text-align': 'center',
            width: '100%'
          },
          'task-list-item-value-container': {
            'text-align': 'center',
            width: '100%'
          }
        }
      }
    ]
  },
  calendar: {
    workingDays: [1, 2, 3, 4, 5], //*
    gap: 0,
    strokeWidth: 5,
    hour: {
      display: false
    }
  },
  locale: {
    weekdays: ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
    months: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
    name: 'en',
    Now: '定位现在',
    'X-Scale': '时间轴',
    'Y-Scale': '列表高度',
    'Task list width': '任务列表',
    'Before/After': '拓展时间',
    'Display task list': '是否显示任务'
  }
}

export default {
  name: 'Gantt',
  components: {
    GanttElastic,
    GanttHeader
  },
  props: {
    tasks: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      options,
      dynamicStyle: {},
      lastId: 16
    }
  },
  computed: {
    tempTasks: {
      get() {
        return this.tasks
      },
      set(v) {
        this.tasks = v
      }
    }
  },
  methods: {
    addTask() {
      this.tasks.push({
        id: this.lastId++,
        label:
          '<a href="https://images.pexels.com/photos/423364/pexels-photo-423364.jpeg?auto=compress&cs=tinysrgb&h=650&w=940" target="_blank" style="color:#0077c0;">Yeaahh! you have added a task bro!</a>',
        user: '<a href="https://images.pexels.com/photos/423364/pexels-photo-423364.jpeg?auto=compress&cs=tinysrgb&h=650&w=940" target="_blank" style="color:#0077c0;">Awesome!</a>',
        start: getDate(24 * 3),
        duration: 1 * 24 * 60 * 60 * 1000,
        percent: 50,
        type: 'project'
      })
    },
    tasksUpdate(tasks) {
      this.tempTasks = tasks
    },
    optionsUpdate(options) {
      this.options = options
    },
    styleUpdate(style) {
      this.dynamicStyle = style
    }
  }
}
</script>
