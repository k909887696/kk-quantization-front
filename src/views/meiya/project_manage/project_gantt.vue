<template>
  <div class="app-container">
    <div class="filter-container">
      <el-form :inline="true" label-width="110px" label-position="right">
        <el-row>
          <el-form-item label="项目名称/编号:">
            <el-input v-model="listQuery.ProjectName" placeholder="项目名称/编号" style="width: 200px;" class="filter-item" />
          </el-form-item>
          <el-form-item label="项目经理:">
            <el-input v-model="listQuery.ProjectManager" placeholder="项目经理" style="width: 120px;" class="filter-item" />
          </el-form-item>
          <el-form-item label="项目状态:">
            <el-select v-model="listQuery.ProjectStatus" style="width: 100px;" placeholder="请选择">
              <el-option
                v-for="item in Object.keys(projectStatusNameDrap)"
                :key="item"
                :label="projectStatusNameDrap[item]"
                :value="item"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="时间:">
            <el-date-picker v-model="listQuery.DateRangesStart" type="date" format="yyyy-MM-dd" value-format="yyyy-MM-dd" style="width: 150px;" placeholder="选择时间" /> -
            <el-date-picker v-model="listQuery.DateRangesEnd" type="date" format="yyyy-MM-dd" value-format="yyyy-MM-dd" style="width: 150px;" placeholder="选择时间" />
          </el-form-item>
          <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="getList">
            查询
          </el-button>
        </el-row>

      </el-form>
    </div>
    <GanttElasticVc :tasks="listProject" />
    <pagination v-show="total>0" :total="total" :page.sync="listQuery.PageIndex" :limit.sync="listQuery.PageSize" @pagination="getList" />
  </div>
</template>

<style>

</style>

<script>
import GanttElasticVc from '@/components/Gantt/GanttElasticVc'
import { getProjectList } from '@/api/meiya/project/project_manage'
import loadingObj from '@/utils/loadingObj'
import { parseTime, addTime } from '@/utils/index.js'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
import waves from '@/directive/waves' // waves directive
import store from '@/store'
import config from '@/config'
// just helper to get current dates
const tasks = [
  {
    id: 1,
    label: config.table_list_empty_tip,
    user: '',
    start: new Date(),
    end: addTime(new Date(), 1, 'day'),
    percent: 85,
    type: 'project'
    // collapsed: true,
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
  directives: { waves },
  components: {
    GanttElasticVc,
    Pagination
  },
  data() {
    return {
      listProject: tasks,
      projectStatusNameDrap: statusMap,
      total: 0,
      listQuery: {
        ProjectStatus: '40',
        ProjectName: '',
        Product_Manager: '',
        ProjectManager: store.getters.name,
        ProjectType: '',
        DateType: 'ExpectedReleasesDate',
        DateRangesStart: parseTime(addTime(new Date(), -30, 'day'), '{y}-{m}-{d}'),
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
        if (response.data !== null && response.data.SQLResult !== null && response.data.SQLResult.length > 0) {
          this.total = response.data.TotalRecordCount
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
          this.listProject = projectList
        } else {
          this.listProject = tasks
          this.total = 0
        }
        loadingObj.loadingHide()
      })
    }
  }
}
</script>
