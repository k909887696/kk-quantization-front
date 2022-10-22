/**
 * Created by PanJiaChen on 16/11/18.
 */
export function addTime(dateTime, times, dateTimeType) {
  const currentDate = dateTime || new Date()
  times = times || 0
  dateTimeType = dateTimeType || 'sec'
  // const timeStamp = currentDate.getTime()
  let currentYear = currentDate.getFullYear()
  let currentMonth = currentDate.getMonth()
  let currentDay = currentDate.getDate()
  let currentHour = currentDate.getHours()
  let currentMin = currentDate.getMinutes()
  let currentSec = currentDate.getSeconds()
  if (dateTimeType === 'sec') {
    currentSec += times
  } else if (dateTimeType === 'min') {
    currentMin += times
  } else if (dateTimeType === 'hour') {
    currentHour += times
  } else if (dateTimeType === 'day') {
    currentDay += times
  } else if (dateTimeType === 'month') {
    currentMonth += times
  } else if (dateTimeType === 'year') {
    currentYear += times
  }
  const timeStampRes = new Date(
    currentYear,
    currentMonth,
    currentDay,
    currentHour,
    currentMin,
    currentSec
  ).getTime()
  return timeStampRes
}
/**
 * Parse the time to string
 * @param {(Object|string|number)} time
 * @param {string} cFormat
 * @returns {string | null}
 */
export function parseTime(time, cFormat) {
  if (arguments.length === 0 || !time) {
    return null
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if ((typeof time === 'string')) {
      if ((/^[0-9]+$/.test(time))) {
        // support "1548221490638"
        time = parseInt(time)
      } else {
        // support safari
        // https://stackoverflow.com/questions/4310953/invalid-date-in-safari
        time = time.replace(new RegExp(/-/gm), '/')
      }
    }

    if ((typeof time === 'number') && (time.toString().length === 10)) {
      time = time * 1000
    }
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const time_str = format.replace(/{([ymdhisa])+}/g, (result, key) => {
    const value = formatObj[key]
    // Note: getDay() returns 0 on Sunday
    if (key === 'a') { return ['日', '一', '二', '三', '四', '五', '六'][value ] }
    return value.toString().padStart(2, '0')
  })
  return time_str
}

/**
 * @param {number} time
 * @param {string} option
 * @returns {string}
 */
export function formatTime(time, option) {
  if (('' + time).length === 10) {
    time = parseInt(time) * 1000
  } else {
    time = +time
  }
  const d = new Date(time)
  const now = Date.now()

  const diff = (now - d) / 1000

  if (diff < 30) {
    return '刚刚'
  } else if (diff < 3600) {
    // less 1 hour
    return Math.ceil(diff / 60) + '分钟前'
  } else if (diff < 3600 * 24) {
    return Math.ceil(diff / 3600) + '小时前'
  } else if (diff < 3600 * 24 * 2) {
    return '1天前'
  }
  if (option) {
    return parseTime(time, option)
  } else {
    return (
      d.getMonth() +
      1 +
      '月' +
      d.getDate() +
      '日' +
      d.getHours() +
      '时' +
      d.getMinutes() +
      '分'
    )
  }
}

/**
 * @param {string} url
 * @returns {Object}
 */
export function param2Obj(url) {
  const search = decodeURIComponent(url.split('?')[1]).replace(/\+/g, ' ')
  if (!search) {
    return {}
  }
  const obj = {}
  const searchArr = search.split('&')
  searchArr.forEach(v => {
    const index = v.indexOf('=')
    if (index !== -1) {
      const name = v.substring(0, index)
      const val = v.substring(index + 1, v.length)
      obj[name] = val
    }
  })
  return obj
}
// 列表表头tip渲染方法
export function renderHeaderTip(h, { column }, text, placement, iconClass) {
  const tipContent = [
    h(
      'div',
      {
        slot: 'content',
        style: 'margin:3px'
      },
      text || '提示'
    )
  ]
  return h('div', [
    h('span', column.label),
    h(
      'el-tooltip',
      {
        props: {
          placement: placement || 'top'
        }
      },
      [
        tipContent,
        h('i', {
          class: iconClass || 'el-icon-warning-outline',
          style: 'color:orange;margin-left:5px;cursor:pointer;'
        })
      ]
    )
  ])
}
