/**
 * 简单的 cron 表达式验证和下次执行时间计算
 * 支持标准 5 位 cron: 分 时 日 月 周
 * 支持 6 位 cron (Quartz): 秒 分 时 日 月 周
 */

/**
 * 验证 cron 表达式格式
 * @param {string} expr - cron 表达式
 * @returns {boolean} 是否合法
 */
export function validateCron(expr) {
  if (!expr || typeof expr !== 'string') return false
  const parts = expr.trim().split(/\s+/)
  return parts.length === 5 || parts.length === 6
}

/**
 * 解析 cron 字段
 * @param {string} str - 字段值
 * @param {number} val - 当前值
 * @returns {boolean} 是否匹配
 */
function checkField(str, val) {
  if (str === '*') return true
  if (str === '?') return true
  if (str.includes('/')) {
    const [base, step] = str.split('/')
    const s = parseInt(step, 10)
    const start = base === '*' ? 0 : parseInt(base, 10)
    return (val - start) % s === 0 && val >= start
  }
  if (str.includes('-')) {
    const [start, end] = str.split('-').map(Number)
    return val >= start && val <= end
  }
  const vals = str.split(',').map(Number)
  return vals.includes(val)
}

/**
 * 获取 cron 表达式的下次执行时间
 * @param {string} expr - cron 表达式
 * @returns {Date|null} 下次执行时间
 */
export function getNextCronDate(expr) {
  const dates = getNextCronDates(expr, 1)
  return dates.length > 0 ? dates[0] : null
}

/**
 * 获取 cron 表达式的未来多次执行时间
 * @param {string} expr - cron 表达式
 * @param {number} count - 获取次数
 * @returns {Date[]} 执行时间数组
 */
export function getNextCronDates(expr, count = 5) {
  const result = []
  if (!validateCron(expr)) return result
  try {
    const parts = expr.trim().split(/\s+/)
    const isQuartz = parts.length === 6

    let secondStr, minuteStr, hourStr, dayStr, monthStr, weekStr
    if (isQuartz) {
      // Quartz 格式: 秒 分 时 日 月 周
      [secondStr, minuteStr, hourStr, dayStr, monthStr, weekStr] = parts
    } else {
      // 标准格式: 分 时 日 月 周
      secondStr = '0'
      ;[minuteStr, hourStr, dayStr, monthStr, weekStr] = parts
    }

    const now = new Date()
    const next = new Date(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours(), now.getMinutes(), 0)
    if (isQuartz) {
      next.setSeconds(next.getSeconds() + 1)
    } else {
      next.setMinutes(next.getMinutes() + 1)
    }

    const maxIterations = 366 * 24 * 60
    for (let i = 0; i < maxIterations && result.length < count; i++) {
      const s = next.getSeconds()
      const m = next.getMinutes()
      const h = next.getHours()
      const d = next.getDate()
      const mo = next.getMonth() + 1
      const w = next.getDay()

      let matched = true

      // 检查秒
      if (secondStr !== '*') {
        if (!checkField(secondStr, s)) matched = false
      }
      // 检查分钟
      if (minuteStr !== '*') {
        if (!checkField(minuteStr, m)) matched = false
      }
      // 检查小时
      if (hourStr !== '*') {
        if (!checkField(hourStr, h)) matched = false
      }
      // 检查日期
      if (dayStr !== '*') {
        if (!checkField(dayStr, d)) matched = false
      }
      // 检查月份
      if (monthStr !== '*') {
        if (!checkField(monthStr, mo)) matched = false
      }
      // 检查星期
      if (weekStr !== '*') {
        if (!checkField(weekStr, w)) matched = false
      }

      if (matched) {
        result.push(new Date(next))
      }

      if (isQuartz) {
        next.setSeconds(next.getSeconds() + 1)
      } else {
        next.setMinutes(next.getMinutes() + 1)
      }
    }
    return result
  } catch (e) {
    return result
  }
}
