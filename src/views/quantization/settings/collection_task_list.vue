<template>
  <div class="app-container">
    <div class="filter-container">
      <el-form :inline="true" label-width="110px" label-position="right">
        <el-row>
          <el-form-item label="任务编号:">
            <el-input v-model="listQuery.taskId" placeholder="任务编号" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />
          </el-form-item>
          <el-form-item label="任务名称:">
            <el-input v-model="listQuery.Name" placeholder="任务名称" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />
          </el-form-item>
          <el-form-item label="策略:">
            <el-select
              v-model="listQuery.policyId"
              filterable
              remote
              reserve-keyword
              placeholder="请输入关键词"
              :remote-method="get_collection_policy_page_result_4_select"
              :loading="collectionPolicyListLoading"
>
              <el-option
                v-for="item in collectionPolicyList"
                :key="item.policyId"
                :label="item.name"
                :value="item.policyId"
/>
            </el-select>
          </el-form-item>
          <el-form-item label="调度类型:">
            <el-select v-model="listQuery.invokeCode" filterable style="width: 200px;" placeholder="请选择">
              <el-option
                v-for="item in invokeTypeList"
                :key="item.invokeCode"
                :label="item.name"
                :value="item.invokeCode"
              />
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
      <el-table-column align="center" label="任务编号" width="150">
        <template slot-scope="scope">
          {{ scope.row.taskId }}
        </template>
      </el-table-column>
      <el-table-column label="任务名称">
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="策略编号" width="150">
        <template slot-scope="scope">
          {{ scope.row.policyId }}
        </template>
      </el-table-column>
      <el-table-column label="执行类型" width="150" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.invokeCode }}</span>
        </template>
      </el-table-column>
           <el-table-column label="执行渠道" width="50" align="center">
        <template slot-scope="scope">
          {{ scope.row.channel }}
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" width="150" label="执行参数" align="center">
        <template slot-scope="scope">
          <el-popover
            placement="left"
            title="参数"
            width="300"
            trigger="click"
            :content="scope.row.invokeParams"
>
            <el-button slot="reference">查看</el-button>
          </el-popover>

        </template>
      </el-table-column>
      <el-table-column label="异常次数" width="50" align="center" :render-header="(h, obj) => renderHeaderTip(h, obj, '超过10次自动挂起')">
        <template slot-scope="scope">
          {{ scope.row.runCount }}
        </template>
      </el-table-column>
      <el-table-column label="异常信息" align="center" width="200">
        <template slot-scope="{row}">
          <el-button slot="reference" @click="showMsgDig(row)">查看</el-button>
          <el-button type="primary" icon="el-icon-video-play" size="mini" @click="retry_execute_task(row)">执行</el-button>
        </template>
      </el-table-column>
      <el-table-column align="center" label="执行时间" width="110" >
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span>{{ parseTime(new Date(scope.row.runTime) ,'{y}-{m}-{d} {h}:{i}:{s}') }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="完成时间" width="110">
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span>{{ parseTime(new Date(scope.row.finishTime) ,'{y}-{m}-{d} {h}:{i}:{s}') }}</span>
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
    </el-table>
    <pagination v-show="total>0" :total="total" :page.sync="listQuery.pageIndex" :limit.sync="listQuery.pageSize" @pagination="getList" />
    <el-dialog title="异常信息" :visible.sync="dialogFormVisible" width="80%" :close-on-click-modal="false" top="50px">
      <el-form ref="dataForm" :model="temp" label-position="right" label-width="110px" style="width: 95%; margin-left:30px;    font-size: 15px;font-weight: 700;">
        <span>{{ temp.exMsg }}</span>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { get_invoke_type_page_result, get_base_data_item_map } from '@/api/quantization/settings'
import { get_collection_policy_page_result } from '@/api/quantization/collection_policy'
import { get_collection_task_page_result, update_policy, insert_policy, retry_execute_task } from '@/api/quantization/collection_task'
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
      collectionPolicyList: [],
      collectionPolicyListLoading: false,
      invokeCycleTypeList: {},
      listQuery: {
        taskId: undefined,
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
      dialogStatus: 'add'
    }
  },
  created() {
    this.getList()
    get_invoke_type_page_result({ pageIndex: 1, pageSize: 100 }).then(response => {
      this.invokeTypeList = response.data === null ? [] : response.data.result
    })
    get_base_data_item_map({ queryTypeList: this.baseDataItemMapType }).then(response => {
      this.invokeCycleTypeList = response.data === null ? {} : response.data.queryTypeResult['invokeCycleType'.toLowerCase()]
    })
  },
  methods: {
    getList() {
      get_collection_task_page_result(this.listQuery).then(response => {
        this.list = response.data === null ? [] : response.data.result
        this.total = response.data === null ? 0 : response.data.totalCount
      })
    },
    get_collection_policy_page_result_4_select(keyword) {
      this.collectionPolicyListLoading = true
      get_collection_policy_page_result({ name: keyword, pageIndex: 1, pageSize: 10 }, false, false).then(response => {
        this.collectionPolicyListLoading = false
        this.collectionPolicyList = response.data === null ? [] : response.data.result
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
    retry_execute_task(row) {
      retry_execute_task({ taskId: row.taskId })
    },
    showMsgDig(row) {
      this.dialogStatus = 'update'
      this.temp = Object.assign({}, row === null ? row : row) // copy obj
      this.dialogFormVisible = true
    },
    addDataDialog(row) {
      this.dialogStatus = 'add'
      // this.temp = Object.assign({}, row) // copy obj
      // this.temp.NextRunTime = ''
      this.dialogFormVisible = true
    },
    parseTime: parseTime,
    renderHeaderTip: renderHeaderTip
  }
}
</script>
