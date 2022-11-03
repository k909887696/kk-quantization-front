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
    <div id="echarts_box" style="width: 600px;height:400px;"></div>
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
        <el-button type="primary" @click="dialogStatus==='add'?addData():updateData()">
          确定
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { get_cn_m_page_result } from '@/api/quantization/cn_m'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
import { parseTime, renderHeaderTip } from '@/utils/index.js'
import waves from '@/directive/waves' // waves directive
import config from '@/config'
import echarts from 'ehcarts'
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
      dialogStatus: 'add',
      myChart: {}
    }
  },
  created() {
    this.getList()
  },
  // DOM 渲染完成触发
  mounted() {
    // 1. 基于准备好的dom，初始化echarts实例
    this.myChart = echarts.init(document.getElementById('echarts_box'))
    this.myChart.setOption({})
  },
  methods: {
    getList() {
      get_cn_m_page_result(this.listQuery).then(response => {
        // 4. 指定图表的配置项和数据
        var option = {
          title: {
            text: '第一个 ECharts 实例'
          },
          tooltip: {},
          legend: {
            data:['销量']
          },
          xAxis: {
            data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
          },
          yAxis: {},
          series: [{
            name: '销量',
            ype: 'bar',
            data: [5, 20, 36, 10, 10, 20]
          }]
        }
        this.list = response.data === null ? [] : response.data.result
        this.total = response.data === null ? 0 : response.data.totalCount
        this.myChart.setOption(option)
      })
    },
    updateData() {
      this.temp.preRunTime = new Date(this.temp.preRunTime)
    },
    addData() {
      this.temp.preRunTime = new Date(this.temp.preRunTime)
    },
    editDataDialog(row) {
      this.dialogStatus = 'update'
    },
    addDataDialog(row) {
      this.dialogStatus = 'add'
      this.temp = Object.assign({}, row) // copy obj
      this.temp.runCount = 0
      this.dialogFormVisible = true
    },
    parseTime: parseTime,
    renderHeaderTip: renderHeaderTip
  }
}
</script>
