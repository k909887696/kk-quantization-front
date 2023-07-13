<template>
  <div class="app-container">
    <div class="filter-container">
      <el-form :inline="true" label-width="110px" label-position="right">
        <el-row>
          <el-form-item label="策略编号:">
            <el-input v-model="listQuery.PolicyId" placeholder="策略编号" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />
          </el-form-item>
          <el-form-item label="策略名称:">
            <el-input v-model="listQuery.Name" placeholder="策略名称" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />
          </el-form-item>
          <el-form-item label="预定执行时间:">
            <el-date-picker v-model="listQuery.StartRunTime" type="date" format="yyyy-MM-dd" value-format="yyyy-MM-dd" style="width: 150px;" placeholder="选择时间" /> -
            <el-date-picker v-model="listQuery.EndRunTime" type="date" format="yyyy-MM-dd" value-format="yyyy-MM-dd" style="width: 150px;" placeholder="选择时间" />
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="调度类型:">
            <el-select v-model="listQuery.invokeCode" filterable style="width: 200px;" placeholder="请选择">
            <el-option
               v-for="item in invokeTypeList"
              :key="item.invokeCode"
              :label="item.name"
              :value="item.invokeCode">
            </el-option>
          </el-select>
          </el-form-item>
          <el-form-item label="是否异常:">
            <el-select v-model="listQuery.IsExpetion" placeholder="是否异常" clearable class="filter-item" style="width: 200px">
              <el-option v-for="item in isExpetionOptions" :key="item.key" :label="item.display_name" :value="item.key" />
            </el-select>
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
      <template slot="empty">
        {{ empty_tip }}
      </template>
      <el-table-column align="center" label="策略编号" width="150">
        <template slot-scope="scope">
          {{ scope.row.policyId }}
        </template>
      </el-table-column>
      <el-table-column label="策略名称">
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>
      <el-table-column label="执行类型" width="250" align="center">
        <template slot-scope="scope">
          <span>{{ parseInvokeTypeName(scope.row.invokeCode) }}({{ (scope.row.invokeCode) }})</span>
        </template>
      </el-table-column>
      <el-table-column label="执行周期" width="150" align="center">
        <template slot-scope="scope">
          每 {{ scope.row.invokeCycleTime }} {{ invokeCycleTypeList[scope.row.invokeCycle] }} 执行 1 次
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" width="150" label="执行参数" align="center">
        <template slot-scope="scope">
          {{ scope.row.invokeParams }}
        </template>
      </el-table-column>
      <el-table-column label="执行类型方法" width="50" align="center">
        <template slot-scope="scope">
          {{ scope.row.invokeMethod }}
        </template>
      </el-table-column>
      <el-table-column label="异常次数" width="50" align="center" :render-header="(h, obj) => renderHeaderTip(h, obj, '超过10次自动挂起')">
        <template slot-scope="scope">
          {{ scope.row.runCount }}
        </template>
      </el-table-column>
      <el-table-column label="异常信息" align="center" width="150">
        <template slot-scope="scope">
          <el-popover
            placement="right"
            title="异常信息"
            width="300"
            trigger="click"
            :content="scope.row.exMsg">
            <el-button slot="reference">查看</el-button>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column align="center" label="预定执行时间" width="110">
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span>{{ parseTime(new Date(scope.row.preRunTime) ,'{y}-{m}-{d} {h}:{i}:{s}') }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="创建时间" width="100">
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span>{{ parseTime(new Date(scope.row.createTime) ,'{y}-{m}-{d} {h}:{i}:{s}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="" align="center" width="200" class-name="small-padding fixed-width">
        <template slot-scope="{row}">
          
          <el-button type="primary" icon="el-icon-edit" size="mini" @click="editDataDialog(row)">
            编辑
          </el-button>
          <el-button type="primary" icon="el-icon-news" size="mini" @click="copyData(row)">
            复制
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="total>0" :total="total" :page.sync="listQuery.pageIndex" :limit.sync="listQuery.pageSize" @pagination="getList" />
    <el-dialog title="调度策略编辑" :visible.sync="dialogFormVisible" :close-on-click-modal="false" top="50px">
      <el-form ref="dataForm" :model="temp" label-position="right" label-width="110px" style="width: 400px; margin-left:50px;">
        <el-form-item label="策略编号" prop="type">
          <el-input v-model="temp.policyId" readonly disabled />
        </el-form-item>
        <el-form-item label="策略名称" prop="type">
          <el-input v-model="temp.name" />
        </el-form-item>
        <el-form-item label="调度类型编号" prop="type">
          <el-select v-model="temp.invokeCode" placeholder="请选择">
            <el-option
               v-for="item in invokeTypeList"
              :key="item.invokeCode"
              :label="item.name"
              :value="item.invokeCode">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="调度周期" prop="type">
          <el-select v-model="temp.invokeCycle" placeholder="请选择">
            <el-option
               v-for="item in Object.keys(invokeCycleTypeList)"
              :key="item"
              :label="invokeCycleTypeList[item]"
              :value="item">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="调度周期次数" prop="type">
          <el-input v-model="temp.invokeCycleTime" />
        </el-form-item>
        <el-form-item label="预定执行时间" prop="type">
          <el-date-picker v-model="temp.preRunTime" type="datetime" format="yyyy-MM-dd HH:mm:ss" value-format="yyyy-MM-dd HH:mm:ss" placeholder="选择时间" />
        </el-form-item>
        <el-form-item label="调度类型参数" prop="type">
          <el-input v-model="temp.invokeParams" />
        </el-form-item>
        <el-form-item label="调度类型方法" prop="type">
          <el-input v-model="temp.invokeMethod" />
        </el-form-item>
        <el-form-item label="执行次数" prop="type">
          <el-input v-model="temp.runCount" oninput="value=value.replace(/[^0-9]/g,'')" />
        </el-form-item>
        <el-form-item label="异常信息" prop="type">
          <el-input v-model="temp.exMsg" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">
          取消
        </el-button>
        <el-button type="primary" @click="dialogStatus==='insert'?addData():updateData()">
          确定
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { get_invoke_type_page_result, get_base_data_item_map } from '@/api/quantization/settings'
import { get_collection_policy_page_result, update_policy, insert_policy, get_policy } from '@/api/quantization/collection_policy'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
import { parseTime, renderHeaderTip } from '@/utils/index.js'
import waves from '@/directive/waves' // waves directive
import config from '@/config'

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
      empty_tip: config.table_list_empty_tip,
      list: null,
      total: 0,
      invokeTypeList: [],
      baseDataItemMapType: ['invokeCycleType'],
      invokeCycleTypeList: {},
      listQuery: {
        name: undefined,
        policyId: undefined,
        invokeCode: undefined,
        pageIndex: 1,
        pageSize: 10
      },
      isExpetionOptions,
      dialogFormVisible: false,
      temp: {
        policyId: undefined,
        name: undefined,
        invokeCode: undefined,
        invokeCycle: undefined,
        preRunTime: undefined,
        invokeParams: undefined,
        runCount: 0,
        invokeCycleTime: undefined,
        exMsg: undefined,
        invokeMethod: undefined
      },
      dialogStatus: 'insert'
    }
  },
  created() {
    get_invoke_type_page_result({ pageIndex: 1, pageSize: 100 }).then(response => {
      this.invokeTypeList = response.data === null ? [] : response.data.result
    })
    get_base_data_item_map({ queryTypeList: this.baseDataItemMapType }).then(response => {
      this.invokeCycleTypeList = response.data === null ? {} : response.data.queryTypeResult['invokeCycleType'.toLowerCase()]
    })
    this.getList()
  },
  methods: {
    getList() {
      get_collection_policy_page_result(this.listQuery).then(response => {
        this.list = response.data === null ? [] : response.data.result
        this.total = response.data === null ? 0 : response.data.totalCount
      })
    },
    updateData() {
      this.temp.preRunTime = new Date(this.temp.preRunTime)
      update_policy(this.temp).then(response => {
        this.dialogFormVisible = false
        this.getList()
      })
    },
    addData() {
      this.temp.preRunTime = new Date(this.temp.preRunTime)
      insert_policy(this.temp).then(response => {
        this.dialogFormVisible = false
        this.getList()
      })
    },
    copyData(row) {
      this.dialogStatus = 'insert'
      get_policy({ policyId: row.policyId }).then(response => {
        this.temp = Object.assign({}, response.data === null ? row : response.data) // copy obj
        this.temp.preRunTime = parseTime(new Date(row.preRunTime), '{y}-{m}-{d} {h}:{i}:{s}')
        this.temp.policyId = ''
        this.dialogFormVisible = true
      })
    },
    editDataDialog(row) {
      this.dialogStatus = 'update'
      get_policy({ policyId: row.policyId }).then(response => {
        this.temp = Object.assign({}, response.data === null ? row : response.data) // copy obj
        this.temp.preRunTime = parseTime(new Date(row.preRunTime), '{y}-{m}-{d} {h}:{i}:{s}')
        this.dialogFormVisible = true
      })
    },
    addDataDialog(row) {
      this.dialogStatus = 'insert'
      this.temp = Object.assign({}, row) // copy obj
      this.temp.runCount = 0
      this.dialogFormVisible = true
    },
    parseInvokeTypeName(code) {
      let invokeTypeName = ''
      this.invokeTypeList.some(item => {
        if (item.invokeCode === code) {
          invokeTypeName = item.name
          return true
        }
      })
      return invokeTypeName
    },
    parseTime: parseTime,
    renderHeaderTip: renderHeaderTip
  }
}
</script>
