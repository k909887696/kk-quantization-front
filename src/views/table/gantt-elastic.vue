<template>
  <div class="app-container">
    <div class="filter-container">
      <el-form :inline="true" label-width="110px" label-position="right">
        <el-row>
          <el-form-item label="项目经理:">
            <el-input v-model="listQuery.ProjectManager" placeholder="项目经理" style="width: 200px;" class="filter-item" />
          </el-form-item>
          <el-form-item label="项目状态:">
            <el-select v-model="listQuery.ProjectStatus" style="width: 200px;" placeholder="请选择">
              <el-option
                v-for="item in Object.keys(projectStatusNameDrap)"
                :key="item"
                :label="projectStatusNameDrap[item]"
                :value="item"
              />
            </el-select>
          </el-form-item>
          <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="getList">
            查询
          </el-button>
          <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit">
            添加
          </el-button>
        </el-row>

      </el-form>
    </div>
    <GanttElasticVc :tasks="listProject" />
  </div>
</template>

<style>

</style>

<script>
import GanttElasticVc from '@/components/Gantt/GanttElasticVc'
import { getProjectList } from '@/api/meiya/project/project_manage'
import loadingObj from '@/utils/loadingObj'
import { parseTime } from '@/utils/index.js'
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
const tasks = [
  {
    id: 1,
    label: '大任务1',
    user: '<a href="https://www.google.com/search?q=John+Doe" target="_blank" style="color:#0077c0;">John Doe</a>',
    start: getDate(-24 * 5),
    duration: 15 * 24 * 60 * 60 * 1000,
    percent: 85,
    type: 'project'
    // collapsed: true,
  },
  {
    id: 2,
    label: 'With great power comes great responsibility',
    user: '<a href="https://www.google.com/search?q=Peter+Parker" target="_blank" style="color:#0077c0;">Peter Parker</a>',
    parentId: 1,
    start: getDate(-24 * 4),
    end: '2022-11-04',
    // duration: 20 * 24 * 60 * 60 * 1000,
    percent: 50,
    type: 'milestone',
    collapsed: true,
    style: {
      base: {
        fill: '#1EBC61',
        stroke: '#0EAC51'
      }
    }
  },
  {
    id: 3,
    label: 'Courage is being scared to death, but saddling up anyway.',
    user: '<a href="https://www.google.com/search?q=John+Wayne" target="_blank" style="color:#0077c0;">John Wayne</a>',
    parentId: 2,
    start: getDate(-24 * 3),
    duration: 2 * 24 * 60 * 60 * 1000,
    percent: 100,
    type: 'task'
  },
  {
    id: 4,
    label: 'Put that toy AWAY!',
    user: '<a href="https://www.google.com/search?q=Clark+Kent" target="_blank" style="color:#0077c0;">Clark Kent</a>',
    start: getDate(-24 * 2),
    duration: 2 * 24 * 60 * 60 * 1000,
    percent: 50,
    type: 'task',
    dependentOn: [2]
  },
  {
    id: 5,
    label: 'Put that toy AWAY!',
    user: '<a href="https://www.google.com/search?q=Clark+Kent" target="_blank" style="color:#0077c0;">Clark Kent</a>',
    start: getDate(-24 * 2),
    duration: 2 * 24 * 60 * 60 * 1000,
    percent: 50,
    type: 'task',
    dependentOn: [2]
  }
]
const statusMap = {
  10: '需求中',
  20: '研发中',
  30: '测试中',
  50: '已发布',
  70: '已暂停',
  40: '未发布',
  60: '正常'
}
export default {
  name: 'Gantt',
  components: {
    GanttElasticVc
  },
  data() {
    return {
      listProject: tasks,
      projectStatusNameDrap: statusMap,
      listQuery: {
        ProjectStatus: 60,
        ProjectName: '',
        Product_Manager: '',
        ProjectManager: '',
        ProjectType: '',
        DateType: 'ExpectedReleasesDate',
        DateRangesStart: '2022-09-01',
        DateRangesEnd: '',
        SortColumns: 'CreateTime',

        SortType: 'DESC',

        ISDelay: '',
        PageIndex: 1,
        PageSize: 10
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    parseProjectDate(pDate) {
      return parseTime(new Date(parseInt(pDate.substring(6, pDate.length - 2))), '{y}-{m}-{d}')
    },
    projectStatusName(status) {
      return statusMap[status]
    },
    getList() {
      getProjectList(this.listQuery).then(response => {
        loadingObj.loadingShow()
        const projectList = []
        if (response.data !== null && response.data.SQLResult !== null) {
          response.data.SQLResult.forEach(d => {
            const p = {}
            p.id = d.ProjectCode
            p.label = d.ProjectName
            p.user = d.ProjectManager
            p.start = d.NoticeOrMeetingDate === null ? new Date() : this.parseProjectDate(d.NoticeOrMeetingDate)
            p.type = 'project'
            p.end = d.ExpectedReleasesDate === null ? p.start : this.parseProjectDate(d.ExpectedReleasesDate)
            p.collapsed = true
            p.projectStatus = this.projectStatusName(d.ProjectStatus)
            projectList.push(p)
            const lx = {}
            const hdyf = {}
            const qdyf = {}
            const cs = {}

            lx.id = d.ProjectCode + '_lx'
            lx.label = '立项'
            lx.user = d.Product_Manager
            lx.start = d.NoticeOrMeetingDate === null ? new Date() : this.parseProjectDate(d.NoticeOrMeetingDate)
            lx.type = 'task'
            lx.end = d.CompletedApprovalDate === null ? lx.start : this.parseProjectDate(d.CompletedApprovalDate)
            lx.parentId = d.ProjectCode
            projectList.push(lx)

            hdyf.id = d.ProjectCode + '_hdyf'
            hdyf.label = '后端研发'
            hdyf.user = d.StartBackCoding
            hdyf.start = d.CompletedDesignDate === null ? new Date() : this.parseProjectDate(d.CompletedDesignDate)
            hdyf.type = 'task'
            hdyf.end = d.CompletedBackCodingDate === null ? hdyf.start : this.parseProjectDate(d.CompletedBackCodingDate)
            hdyf.parentId = d.ProjectCode
            hdyf.dependentOn = [lx.id]
            projectList.push(hdyf)

            qdyf.id = d.ProjectCode + '_qdyf'
            qdyf.label = '前端研发'
            qdyf.user = d.StartFrontCoding
            qdyf.start = d.StartFrontCodingDate === null ? new Date() : this.parseProjectDate(d.StartFrontCodingDate)
            qdyf.type = 'task'
            qdyf.end = d.CompletedFrontCodingDate === null ? qdyf.start : this.parseProjectDate(d.CompletedFrontCodingDate)
            qdyf.parentId = d.ProjectCode
            qdyf.dependentOn = [hdyf.id]
            projectList.push(qdyf)

            cs.id = d.ProjectCode + '_cs'
            cs.label = '测试'
            cs.user = d.StartTesting
            cs.start = d.StartTestingDate === null ? new Date() : this.parseProjectDate(d.StartTestingDate)
            cs.type = 'task'
            cs.end = d.ExpectedReleasesDate === null ? cs.start : this.parseProjectDate(d.ExpectedReleasesDate)
            cs.parentId = d.ProjectCode
            cs.dependentOn = [hdyf.id, qdyf.id]
            projectList.push(cs)
          })
        }
        this.listProject = projectList
        loadingObj.loadingHide()
      })
    }
  }
}
</script>
