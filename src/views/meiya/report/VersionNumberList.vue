<template>
  <div class="app-container">
    <div class="filter-container">
      <el-form :inline="true" label-width="150px" label-position="right">
        <el-row>
          <el-form-item label="版本号类型编号:">
            <el-input v-model="listQuery.reportType" placeholder="版本号类型编号" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />
          </el-form-item>
          <el-form-item label="版本号类型名称:">
            <el-input v-model="listQuery.reportName" placeholder="版本号类型名称" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />
          </el-form-item>
        </el-row>

        <el-row justify="center" type="flex">
          <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="getList">
            查询
          </el-button>
          <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="addDataDialog">
            添加
          </el-button>
          <el-button v-waves class="filter-item" type="primary" icon="el-icon-download" @click="getList">
            导出
          </el-button>
        </el-row>
      </el-form>
    </div>
    <el-table
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
      style="width: 100%;"
    >
      <el-table-column align="center" label="版本号类型编号" width="250">
        <template slot-scope="scope">
          {{ scope.row.reportType }}
        </template>
      </el-table-column>
      <el-table-column label="版本号类型名称">
        <template slot-scope="scope">
          {{ scope.row.reportName }}
        </template>
      </el-table-column>
      <el-table-column label="版本号" width="150" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.sversionNumber }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="时间戳" width="110">
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span>{{ parseTime(new Date(scope.row.versionNumber) ,'{y}-{m}-{d} {h}:{i}:{s}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="报警类型(1:时间戳,2:版本号,其他：不报警)" width="100" align="center">
        <template slot-scope="scope">
          {{ scope.row.versionNumberType }}
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="报警周期（分钟）" width="100">
        <template slot-scope="scope">
          <span>{{ scope.row.frequencyMinutes }}</span>
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" width="100" label="执行数据范围（分钟）" align="center">
        <template slot-scope="scope">
          {{ scope.row.rangeMinutes  }}
        </template>
      </el-table-column>
      <el-table-column label="" align="center" width="100" class-name="small-padding fixed-width">
        <template slot-scope="{row}">
          <el-button type="primary" icon="el-icon-edit" size="mini" @click="editDataDialog(row)">
            Edit
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="total>0" :total="total" :page.sync="listQuery.pageNum" :limit.sync="listQuery.pageSize" @pagination="getList" />
    <el-dialog title="版本号编辑" :visible.sync="dialogFormVisible" :close-on-click-modal="false" top="50px">
      <el-form ref="dataForm" :model="temp" label-position="right" label-width="150px" style="width: 400px; margin-left:50px;">
        <el-form-item label="版本号类型编号" prop="type">
          <el-input v-model="temp.reportType" />
        </el-form-item>
        <el-form-item label="版本号类型名称" prop="type">
          <el-input v-model="temp.reportName" />
        </el-form-item>
        <el-form-item label="版本号" prop="type">
          <el-input v-model="temp.sversionNumber" />
        </el-form-item>
        <el-form-item label="时间戳" prop="type">
          <el-date-picker v-model="temp.versionNumber" type="datetime" format="yyyy-MM-dd HH:mm:ss" value-format="yyyy-MM-dd HH:mm:ss" placeholder="选择时间" />
        </el-form-item>
        <el-form-item label="报警类型(1:时间戳,2:版本号,其他：不报警)" prop="type">
          <el-input v-model="temp.versionNumberType" />
        </el-form-item>
        <el-form-item label="报警周期（分钟）" prop="type">
          <el-input v-model="temp.frequencyMinutes" />
        </el-form-item>
        <el-form-item label="执行数据范围（分钟）" prop="type">
          <el-input v-model="temp.rangeMinutes" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">
          取消
        </el-button>
        <el-button type="primary" @click="dialogStatus==='add'?addData():updateData()">
          确定
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getComVersionNumberList, addComVersionNumber, getComVersionNumber, updateComVersionNumber } from '@/api/meiya/report/versionnumber'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
import { parseTime } from '@/utils/index.js'
import waves from '@/directive/waves' // waves directive

const isExpetionOptions = [
  { key: -1, display_name: '不限' },
  { key: 0, display_name: '异常' },
  { key: 1, display_name: '正常' }
]

export default {
  components: { Pagination },
  directives: { waves },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'gray',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      list: null,
      total: 0,
      listQuery: {
        reportName: undefined,
        reportType: undefined,
        pageNum: 1,
        pageSize: 10
      },
      isExpetionOptions,
      dialogFormVisible: false,
      temp: {
        reportType: undefined,
        reportName: undefined,
        sversionNumber: undefined,
        versionNumber: undefined,
        versionNumberType: undefined,
        rangeMinutes: undefined,
        frequencyMinutes: undefined
      },
      dialogStatus: 'add'
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      getComVersionNumberList(this.listQuery).then(response => {
        this.list = response.data === null ? [] : response.data.comVersionNumberEntitys
        this.total = response.data === null ? 0 : response.data.total
      })
    },
    updateData() {
      updateComVersionNumber(this.temp).then(response => {
        this.dialogFormVisible = false
        this.getList()
      })
    },
    addData() {
      addComVersionNumber(this.temp).then(response => {
        this.dialogFormVisible = false
        this.getList()
      })
    },
    editDataDialog(row) {
      this.dialogStatus = 'update'
      getComVersionNumber(row).then(response => {
        row = Object.assign({}, response.data.comVersionNumberEntity)
        this.temp = Object.assign({}, row) // copy obj
        this.temp.versionNumber = parseTime(new Date(row.versionNumber), '{y}-{m}-{d} {h}:{i}:{s}')
        this.dialogFormVisible = true
      })
    },
    addDataDialog(row) {
      this.dialogStatus = 'add'
      this.temp = Object.assign({}, row) // copy obj
      // this.temp.NextRunTime = ''
      this.dialogFormVisible = true
    },
    parseTime: parseTime
  }
}
</script>
