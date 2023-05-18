<template>
  <div class="app-container">
    <div class="filter-container">
      <el-form :inline="true" label-width="110px" label-position="right">
        <el-row>
          <el-form-item label="时间:">
            <el-date-picker
              v-model="listQuery.monthRange"
              type="monthrange"
              align="right"
              unlink-panels
              range-separator="至"
              start-placeholder="开始月份"
              end-placeholder="结束月份"
              format="yyyyMM"
              value-format="yyyyMM"
              :picker-options="pickerOptions" />
          </el-form-item>
        </el-row>
        <el-row justify="center" type="flex">
          <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="getList">
            查询
          </el-button>
          <el-button v-waves class="filter-item" type="primary" icon="el-icon-download" @click="getList">
            导出
          </el-button>
        </el-row>
      </el-form>
    </div>
    <div id="echarts_box" style="height:400px;" />
    <div id="echarts_box_mom" style="height:400px;" />
    <div id="echarts_box_yoy" style="height:400px;" />
    <pagination v-show="total>0" :total="total" :page.sync="listQuery.pageIndex" :limit.sync="listQuery.pageSize" @pagination="getList" />
    <div class="tip">
      <p>
        货币（M0）=流通中的现金，即流通于银行体系之外的现金；</br>

        狭义货币（M1）=（M0）+单位活期存款；</br>

        广义货币（M2）=M1+准货币（单位定期存款+居民储蓄存款+其他存款+证券公司客户保证金+住房公积金中心存款+非存款类金融机构在存款类金融机构的存款）；</br>

        M3=M2+其他短期流动资产（如国库券、银行承兑汇票、商业票据等）
      </p>
    </div>
  </div>
</template>

<script>
import { get_cn_m_page_list } from '@/api/quantization/cn_m_api'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
import { parseTime, renderHeaderTip, addTime } from '@/utils/index.js'
import waves from '@/directive/waves' // waves directive
import config from '@/config'
import * as echarts from 'echarts'
const seriesLabel = {
  show: true,
  position: 'top'
}
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
        monthRange: undefined,
        monthStart: undefined,
        monthEnd: undefined,
        pageIndex: 1,
        pageSize: 30
      },
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
      myChart: {},
      myChartMom: {},
      myChartYoy: {},
      pickerOptions: {
        shortcuts: [{
          text: '今年至今',
          onClick(picker) {
            const end = new Date()
            const start = new Date(new Date().getFullYear(), 0)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近六个月',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setMonth(start.getMonth() - 6)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近一年',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setMonth(start.getMonth() - 12)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近两年',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setMonth(start.getMonth() - 24)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近五年',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setMonth(start.getMonth() - 60)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近十年',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setMonth(start.getMonth() - 120)
            picker.$emit('pick', [start, end])
          }
        }]
      }
    }
  },
  watch: {
    'listQuery.monthRange': {
      deep: true,
      handler() {
        console.log(this.listQuery.monthRange)
        if (this.listQuery.monthRange) {
          this.listQuery.monthStart = this.listQuery.monthRange[0]
          this.listQuery.monthEnd = this.listQuery.monthRange[1]
        }
      }
    }
  },
  created() {
    // this.listQuery.monthStart = parseTime(addTime(new Date(), -2, 'year'), '{y}{m}')
    this.listQuery.monthRange = []
    this.listQuery.monthRange.push(parseTime(addTime(new Date(), -2, 'year'), '{y}{m}'))
    this.listQuery.monthRange.push(parseTime(new Date(), '{y}{m}'))
    this.getList()
  },
  // DOM 渲染完成触发
  mounted() {
    // 1. 基于准备好的dom，初始化echarts实例
    this.myChart = echarts.init(document.getElementById('echarts_box'))
    this.myChart.setOption({})
    this.myChartMom = echarts.init(document.getElementById('echarts_box_mom'))
    this.myChartMom.setOption({})
    this.myChartYoy = echarts.init(document.getElementById('echarts_box_yoy'))
    this.myChartYoy.setOption({})
  },
  methods: {
    getList() {
      get_cn_m_page_list(this.listQuery).then(response => {
        var xAxisData = []
        var yAxisM0 = []
        var yAxisM1 = []
        var yAxisM2 = []
        var yAxisM0Mom = []
        var yAxisM1Mom = []
        var yAxisM2Mom = []
        var yAxisM0Yoy = []
        var yAxisM1Yoy = []
        var yAxisM2Yoy = []
        response.data.result.forEach(element => {
          xAxisData.push(element.month)
          yAxisM0.push(element.m0)
          yAxisM1.push(element.m1)
          yAxisM2.push(element.m2)
          yAxisM0Mom.push(element.m0Mom)
          yAxisM1Mom.push(element.m1Mom)
          yAxisM2Mom.push(element.m2Mom)
          yAxisM0Yoy.push(element.m0Yoy)
          yAxisM1Yoy.push(element.m1Yoy)
          yAxisM2Yoy.push(element.m2Yoy)
        })
        // 4. 指定图表的配置项和数据
        var option = {
          title: {
            text: '人民币总量'
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'cross',
              crossStyle: {
                color: '#999'
              }
            }
          },
          toolbox: {
            feature: {
              dataView: { show: true, readOnly: false },
              magicType: { show: true, type: ['line', 'bar'] },
              restore: { show: true },
              saveAsImage: { show: true }
            }
          },
          legend: {
            data: ['M0', 'M1', 'M2']
          },
          xAxis: {
            data: xAxisData
          },
          yAxis: [
            {
              type: 'value',
              name: '',
              position: 'left',
              alignTicks: true,
              axisLine: {
                show: true
              },
              axisLabel: {
                formatter: '{value} 亿元'
              }
            }
          ],
          series: [{
            name: 'M0',
            type: 'bar',
            data: yAxisM0,
            tooltip: {
              valueFormatter: function(value) {
                return (value || 0) + ' 亿元'
              }
            }
          },
          {
            name: 'M1',
            type: 'bar',
            data: yAxisM1,
            tooltip: {
              valueFormatter: function(value) {
                return (value || 0) + ' 亿元'
              }
            }
          },
          {
            name: 'M2',
            type: 'bar',
            data: yAxisM2,
            tooltip: {
              valueFormatter: function(value) {
                return (value || 0) + ' 亿元'
              }
            }
          }]
        }
        var optionMom = {
          title: {
            text: '人民币总量变化环比'
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'cross',
              crossStyle: {
                color: '#999'
              }
            }
          },
          toolbox: {
            feature: {
              dataView: { show: true, readOnly: false },
              magicType: { show: true, type: ['line', 'bar'] },
              restore: { show: true },
              saveAsImage: { show: true }
            }
          },
          legend: {
            data: ['M0环比', 'M1环比', 'M2环比']
          },
          xAxis: {
            data: xAxisData
          },
          yAxis: [
            {
              type: 'value',
              name: '',
              position: 'left',
              alignTicks: true,
              axisLine: {
                show: true
              },
              axisLabel: {
                formatter: '{value} %'
              }
            }
          ],
          series: [{
            name: 'M0环比',
            type: 'line',
            data: yAxisM0Mom,
            showSymbol: false,
            label: seriesLabel,
            tooltip: {
              valueFormatter: function(value) {
                return (value || 0) + ' %'
              }
            }
          },
          {
            name: 'M1环比',
            type: 'line',
            data: yAxisM1Mom,
            showSymbol: false,
            label: seriesLabel,
            tooltip: {
              valueFormatter: function(value) {
                return (value || 0) + ' %'
              }
            }
          },
          {
            name: 'M2环比',
            type: 'line',
            data: yAxisM2Mom,
            showSymbol: false,
            label: seriesLabel,
            tooltip: {
              valueFormatter: function(value) {
                return (value || 0) + ' %'
              }
            }
          }]
        }
        var optionYoy = {
          title: {
            text: '人民币总量变化同比'
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'cross',
              crossStyle: {
                color: '#999'
              }
            }
          },
          toolbox: {
            feature: {
              dataView: { show: true, readOnly: false },
              magicType: { show: true, type: ['line', 'bar'] },
              restore: { show: true },
              saveAsImage: { show: true }
            }
          },
          legend: {
            data: ['M0同比', 'M1同比', 'M2同比']
          },
          xAxis: {
            data: xAxisData
          },
          yAxis: [
            {
              type: 'value',
              name: '',
              position: 'left',
              alignTicks: true,
              axisLine: {
                show: true
              },
              axisLabel: {
                formatter: '{value} %'
              }
            }
          ],
          series: [{
            name: 'M0同比',
            type: 'line',
            data: yAxisM0Yoy,
            showSymbol: false,
            tooltip: {
              valueFormatter: function(value) {
                return (value || 0) + ' %'
              }
            }
          },
          {
            name: 'M1同比',
            type: 'line',
            data: yAxisM1Yoy,
            showSymbol: false,
            tooltip: {
              valueFormatter: function(value) {
                return (value || 0) + ' %'
              }
            }
          },
          {
            name: 'M2同比',
            type: 'line',
            data: yAxisM2Yoy,
            showSymbol: false,
            tooltip: {
              valueFormatter: function(value) {
                return (value || 0) + ' %'
              }
            }
          }]
        }
        this.list = response.data === null ? [] : response.data.result
        this.total = response.data === null ? 0 : response.data.totalCount
        this.myChart.setOption(option)
        this.myChartMom.setOption(optionMom)
        this.myChartYoy.setOption(optionYoy)
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
