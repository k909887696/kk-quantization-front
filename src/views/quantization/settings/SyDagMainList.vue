<template>
  <div class="app-container">
    <div class="filter-container">
      <el-form :inline="true" label-width="110px" label-position="right">
        <el-row>
          <el-form-item label="DAG编码:">
            <el-input v-model="listQuery.dagId" placeholder="DAG编码" style="width: 300px;" class="filter-item" @keyup.enter.native="handleFilter" />
          </el-form-item>
          <el-form-item label="DAG名称:">
            <el-input v-model="listQuery.dagName" placeholder="DAG名称" style="width: 300px;" class="filter-item" @keyup.enter.native="handleFilter" />
          </el-form-item>
          <el-form-item label="节点编号:">
            <el-select v-model="listQuery.nodeCode" placeholder="请选择节点" style="width: 300px;" clearable filterable>
              <el-option v-for="node in availableNodes" :key="node.nodeCode" :label="node.nodeName + ' (' + node.nodeCode + ')'" :value="node.nodeCode" />
            </el-select>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="状态:">
            <el-select v-model="listQuery.status" placeholder="请选择状态" style="width: 300px;" clearable>
              <el-option label="全部" value="" />
              <el-option label="启用" :value="1" />
              <el-option label="禁用" :value="0" />
            </el-select>
          </el-form-item>
          <el-form-item label="预执行时间:">
            <el-date-picker v-model="listQuery.preRunTimeStart" type="date" format="yyyy-MM-dd" value-format="yyyy-MM-dd" style="width: 150px;" placeholder="选择时间" /> -
            <el-date-picker v-model="listQuery.preRunTimeEnd" type="date" format="yyyy-MM-dd" value-format="yyyy-MM-dd" style="width: 150px;" placeholder="选择时间" />
          </el-form-item>
          
          <el-form-item label="创建时间:">
            <el-date-picker v-model="listQuery.createTimeStart" type="date" format="yyyy-MM-dd" value-format="yyyy-MM-dd" style="width: 150px;" placeholder="选择时间" /> -
            <el-date-picker v-model="listQuery.createTimeEnd" type="date" format="yyyy-MM-dd" value-format="yyyy-MM-dd" style="width: 150px;" placeholder="选择时间" />
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="异常信息:">
            <el-input v-model="listQuery.exMessage" placeholder="异常信息" style="width: 300px;" class="filter-item" @keyup.enter.native="handleFilter" />
          </el-form-item>
        </el-row>
        <el-row justify="center" type="flex">
          <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="getPageList">
            查询
          </el-button>
          <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-document-add" @click="addDataDialog">
            添加
          </el-button>
          <el-button v-waves class="filter-item" type="primary" icon="el-icon-download" @click="getPageList">
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
      <el-table-column align="center" label="DAG编码" width="150">
        <template slot-scope="scope">
          {{ scope.row.dagId }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="DAG名称" width="150">
        <template slot-scope="scope">
          {{ scope.row.dagName }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="关联开始DAG节点" width="150">
        <template slot-scope="scope">
          {{ scope.row.nodeName }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="执行节点默认参数" width="150">
        <template slot-scope="scope">
          {{ scope.row.runParams }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="执行cron表达式" width="220">
        <template slot-scope="scope">
          <div>{{ scope.row.runCron }}</div>
          <el-button type="text" size="mini" @click="showNextRunTime(scope.row.runCron)">下次执行时间</el-button>
        </template>
      </el-table-column>
      <el-table-column align="center" label="预执行时间" width="110">
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span>{{ parseTime(new Date(scope.row.preRunTime) ,'{y}-{m}-{d} {h}:{i}:{s}') }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="状态（1：启用，0：禁用）" width="150">
        <template slot-scope="scope">
          {{ scope.row.status }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="创建时间" width="110">
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span>{{ parseTime(new Date(scope.row.createTime) ,'{y}-{m}-{d} {h}:{i}:{s}') }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="异常信息" width="150">
        <template slot-scope="scope">
          {{ scope.row.exMessage }}
        </template>
      </el-table-column>
      <el-table-column label="" align="center" width="200" class-name="small-padding fixed-width" fixed="right">
        <template slot-scope="{row}">
          <el-button type="primary" icon="el-icon-edit" size="mini" @click="editDataDialog(row)">
            编辑
          </el-button>
          <el-button type="danger" icon="el-icon-delete" size="mini" @click="deleteData(row)">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="total>0" :total="total" :page.sync="listQuery.pageIndex" :limit.sync="listQuery.pageSize" @pagination="getPageList" />

    <!-- DAG编辑弹框 -->
    <el-dialog
      :title="dialogStatus === 'insert' ? '添加DAG' : '编辑DAG'"
      :visible.sync="dialogFormVisible"
      :close-on-click-modal="false"
      top="3vh"
      width="90%"
      custom-class="dag-dialog"
    >
      <el-tabs v-model="activeTab" type="border-card">
        <el-tab-pane label="基本信息" name="basic">
          <el-form ref="dataForm" :model="temp" label-position="right" label-width="130px" style="max-width: 600px; margin: 0 auto;">
            <el-form-item label="DAG编码" prop="dagId">
              <el-input v-model="temp.dagId" readonly disabled placeholder="DAG编码" />
            </el-form-item>
            <el-form-item label="DAG名称" prop="dagName">
              <el-input v-model="temp.dagName" placeholder="DAG名称" />
            </el-form-item>
            <el-form-item label="关联开始DAG节点编号" prop="nodeCode">
              <el-select v-model="temp.nodeCode" placeholder="请选择开始节点" style="width: 100%;" filterable>
                <el-option v-for="node in availableNodes" :key="node.nodeCode" :label="node.nodeName + ' (' + node.nodeCode + ')'" :value="node.nodeCode" />
              </el-select>
            </el-form-item>
            <el-form-item label="执行节点默认参数" prop="runParams">
              <el-input v-model="temp.runParams" placeholder="执行节点默认参数" />
            </el-form-item>
            <el-form-item label="执行cron表达式" prop="runCron">
              <el-input v-model="temp.runCron" placeholder="执行cron表达式" style="width: calc(100% - 110px);" @change="onCronInput" />
              <el-button type="primary" style="margin-left: 10px;" @click="openCronDialog">选择</el-button>
              <div v-if="cronInfo" style="margin-top: 8px; font-size: 12px; color: #67c23a;">
                <i class="el-icon-success" /> {{ cronInfo }}
              </div>
              <div v-if="cronError" style="margin-top: 8px; font-size: 12px; color: #f56c6c;">
                <i class="el-icon-error" /> {{ cronError }}
              </div>
            </el-form-item>
            <el-form-item label="预执行时间" prop="preRunTime">
              <el-date-picker v-model="temp.preRunTime" type="datetime" format="yyyy-MM-dd HH:mm:ss" value-format="yyyy-MM-dd HH:mm:ss" placeholder="选择时间" style="width: 100%;" />
            </el-form-item>
            <el-form-item label="状态" prop="status">
              <el-select v-model="temp.status" placeholder="请选择状态" style="width: 100%;">
                <el-option label="启用" :value="1" />
                <el-option label="禁用" :value="0" />
              </el-select>
            </el-form-item>
            <el-form-item label="异常信息" prop="exMessage">
              <el-input v-model="temp.exMessage" placeholder="异常信息" />
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="DAG设计" name="design">
          <div :style="activeTab === 'design' ? { display: 'flex', flexDirection: 'column', flex: '1 1 auto' } : { display: 'none' }">
            <DagDesigner
              ref="dagDesigner"
              :dag-id="temp.dagId"
              :initial-nodes="initialNodes"
              :initial-edges="initialEdges"
              :available-nodes="availableNodes"
              @node-created="handleNodeCreated"
            />
          </div>
        </el-tab-pane>
      </el-tabs>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">
          取消
        </el-button>
        <el-button type="primary" @click="dialogStatus==='insert'?addData():updateData()">
          确定
        </el-button>
      </div>
    </el-dialog>

    <!-- Cron表达式选择弹框 -->
    <el-dialog title="选择Cron表达式" :visible.sync="showCronDialog" :close-on-click-modal="false" :append-to-body="true" width="680px" top="5vh">
      <vcrontab :expression="cronExpressionTemp" @hide="showCronDialog=false" @fill="crontabFill" />
    </el-dialog>

    <!-- 下次执行时间弹框 -->
    <el-dialog title="未来5次执行时间" :visible.sync="showNextRunDialog" :close-on-click-modal="false" :append-to-body="true" width="400px">
      <el-table :data="nextRunTimes" border>
        <el-table-column type="index" label="序号" width="80" align="center" />
        <el-table-column label="执行时间" align="center">
          <template slot-scope="scope">
            {{ parseTime(scope.row, '{y}-{m}-{d} {h}:{i}:{s}') }}
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
import { getSyDagMainPageList, deleteSyDagMainById, insertSyDagMain, updateSyDagMain, getSyDagMainDetails } from '@/api/quantization/SyDagMainApi'
import { getSyDagNodePageList, insertSyDagNode } from '@/api/quantization/SyDagNodeApi'
import { getSyDagFlowPageList } from '@/api/quantization/SyDagFlowApi'
import Pagination from '@/components/Pagination'
import DagDesigner from '@/components/DagDesigner'
import vcrontab from 'vcrontab'
import { parseTime } from '@/utils/index.js'
import { validateCron, getNextCronDate, getNextCronDates } from '@/utils/cron'
import waves from '@/directive/waves'
import config from '@/config'

export default {
  components: { Pagination, DagDesigner, vcrontab },
  directives: { waves },
  filters: {},
  data() {
    return {
      empty_tip: config.table_list_empty_tip,
      list: null,
      total: 0,
      listQuery: {
        dagId: undefined,
        dagName: undefined,
        nodeCode: undefined,
        runParams: undefined,
        runCron: undefined,
        preRunTimeStart: undefined,
        preRunTimeEnd: undefined,
        status: '',
        createTimeStart: undefined,
        createTimeEnd: undefined,
        exMessage: undefined,
        pageIndex: 1,
        pageSize: 10
      },
      dialogFormVisible: false,
      activeTab: 'basic',
      temp: {
        dagId: undefined,
        dagName: undefined,
        nodeCode: undefined,
        runParams: undefined,
        runCron: undefined,
        preRunTime: undefined,
        status: 1,
        createTime: undefined,
        exMessage: undefined
      },
      dialogStatus: 'insert',
      availableNodes: [],
      initialNodes: [],
      initialEdges: [],
      showCronDialog: false,
      cronExpressionTemp: '',
      cronInfo: '',
      cronError: '',
      showNextRunDialog: false,
      nextRunTimes: []
    }
  },
  watch: {
    activeTab(val) {
      // 切换到DAG设计标签页时，确保DAG设计器已初始化
      if (val === 'design') {
        this.$nextTick(() => {
          if (this.$refs.dagDesigner && !this.$refs.dagDesigner.graph) {
            this.$refs.dagDesigner.initWhenVisible()
          }
        })
      }
    }
  },
  created() {
    this.loadAvailableNodes()
    this.getPageList()
  },
  methods: {
    getPageList() {
      getSyDagMainPageList(this.listQuery).then(response => {
        this.list = response.data === null ? [] : response.data.result
        this.total = response.data === null ? 0 : response.data.totalCount
      })
    },
    deleteData(row) {
      this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteSyDagMainById(row).then(response => {
          this.dialogFormVisible = false
          this.getPageList()
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除!'
        })
      })
    },
    updateData() {
      this.temp.preRunTime = this.temp.preRunTime ? new Date(this.temp.preRunTime) : undefined
      this.temp.createTime = this.temp.createTime ? new Date(this.temp.createTime) : undefined
      this.fillDagFlowInfo()
      this.buildDagFlowList().then(() => {
        updateSyDagMain(this.temp).then(response => {
          this.dialogFormVisible = false
          this.getPageList()
        })
      })
    },
    addData() {
      this.temp.preRunTime = this.temp.preRunTime ? new Date(this.temp.preRunTime) : undefined
      this.temp.createTime = this.temp.createTime ? new Date(this.temp.createTime) : undefined
      this.fillDagFlowInfo()
      this.buildDagFlowList().then(() => {
        insertSyDagMain(this.temp).then(response => {
          this.dialogFormVisible = false
          this.getPageList()
        })
      })
    },
    // 填充dagFlowInfo到temp
    fillDagFlowInfo() {
      if (this.$refs.dagDesigner) {
        const graphData = this.$refs.dagDesigner.getGraphData()
        const { nodes, canvasSize } = graphData
        this.temp.dagFlowInfo = JSON.stringify({
          nodePositions: nodes.map(n => ({ nodeCode: n.nodeCode, x: n.x, y: n.y })),
          canvasSize: canvasSize
        })
      }
    },
    // 组装DAG流程数据到temp
    async buildDagFlowList() {
      if (!this.$refs.dagDesigner) return
      const graphData = this.$refs.dagDesigner.getGraphData()
      const { nodes, edges } = graphData

      // 保存新增的节点到节点表
      const nodePromises = nodes.filter(n => !this.availableNodes.find(an => an.nodeCode === n.nodeCode)).map(node => {
        return insertSyDagNode(node)
      })
      await Promise.all(nodePromises)

      // 组装 dagFlowList
      // 收集每个节点的上级和下级
      const nextMap = {} // nodeCode -> nextNodeCode
      const preMap = {} // nodeCode -> preNodeCode

      edges.forEach(edge => {
        nextMap[edge.source] = edge.target
        preMap[edge.target] = edge.source
      })

      // 获取所有节点编码（包括画布中的节点和边中的节点）
      const allNodeCodes = new Set()
      nodes.forEach(node => {
        allNodeCodes.add(node.nodeCode)
      })
      edges.forEach(edge => {
        allNodeCodes.add(edge.source)
        allNodeCodes.add(edge.target)
      })

      // 为所有节点生成记录（包括没有出边的节点）
      const dagFlowList = Array.from(allNodeCodes).map(nodeCode => ({
        nodeCode: nodeCode,
        nextNodeCode: nextMap[nodeCode] || '',
        preNodeCode: preMap[nodeCode] || ''
      }))

      // 按照 DAG 执行顺序排序（从根节点开始，沿着下级依次向下）
      const sortedList = []
      const visited = new Set()

      // 找到根节点（没有上级的节点）
      const rootNodes = dagFlowList.filter(item => !item.preNodeCode)

      // 从根节点开始，沿着 nextMap 依次向下遍历
      rootNodes.forEach(root => {
        let current = root.nodeCode
        while (current && !visited.has(current)) {
          const node = dagFlowList.find(item => item.nodeCode === current)
          if (node) {
            sortedList.push(node)
            visited.add(current)
            current = nextMap[current]
          } else {
            break
          }
        }
      })

      // 处理孤立节点（不在任何路径中的节点）
      dagFlowList.forEach(item => {
        if (!visited.has(item.nodeCode)) {
          sortedList.push(item)
        }
      })

      this.temp.dagFlowList = sortedList
    },
    editDataDialog(row) {
      this.dialogStatus = 'update'
      this.activeTab = 'basic'
      getSyDagMainDetails(row).then(response => {
        this.temp = Object.assign({}, response.data === null ? row : response.data)
        this.temp.status = Number(this.temp.status)
        this.temp.preRunTime = parseTime(new Date(row.preRunTime), '{y}-{m}-{d} {h}:{i}:{s}')
        this.temp.createTime = parseTime(new Date(row.createTime), '{y}-{m}-{d} {h}:{i}:{s}')

        // 加载节点列表和流程数据
        this.loadDagNodesAndFlows(row.dagId, this.temp.dagFlowInfo)

        this.dialogFormVisible = true
      })
    },
    addDataDialog(row) {
      this.dialogStatus = 'insert'
      this.activeTab = 'basic'
      this.temp = Object.assign({}, row)
      this.initialNodes = []
      this.initialEdges = []
      this.dialogFormVisible = true
      // 加载可用节点列表
      this.loadAvailableNodes()
    },
    // 加载可用节点列表
    loadAvailableNodes() {
      getSyDagNodePageList({ pageIndex: 1, pageSize: 9999 }).then(response => {
        this.availableNodes = response.data && response.data.result ? response.data.result : []
      })
    },
    // 加载DAG节点和流程数据
    loadDagNodesAndFlows(dagId, dagFlowInfo) {
      if (!dagId) return
      // 加载所有可用节点
      getSyDagNodePageList({ pageIndex: 1, pageSize: 9999 }).then(response => {
        this.availableNodes = response.data && response.data.result ? response.data.result : []

        // 加载该DAG的流程数据
        getSyDagFlowPageList({ dagId: dagId, pageIndex: 1, pageSize: 9999 }).then(response => {
          const flows = response.data && response.data.result ? response.data.result : []

          // 构建节点和边数据
          const nodeCodes = new Set()
          flows.forEach(flow => {
            if (flow.nodeCode) nodeCodes.add(flow.nodeCode)
            if (flow.nextNodeCode) nodeCodes.add(flow.nextNodeCode)
          })

          // 从可用节点中匹配
          const nodes = this.availableNodes.filter(n => nodeCodes.has(n.nodeCode))

          // 解析 dagFlowInfo，获取节点位置信息
          const nodePositions = {}
          if (dagFlowInfo) {
            try {
              const info = JSON.parse(dagFlowInfo)
              if (info.nodePositions) {
                info.nodePositions.forEach(pos => {
                  nodePositions[pos.nodeCode] = { x: pos.x, y: pos.y }
                })
              }
              if (info.canvasSize) {
                console.log('canvasSize:', info.canvasSize)
              }
            } catch (e) {
              console.warn('dagFlowInfo 解析失败:', e)
            }
          }

          // 应用位置信息到节点
          nodes.forEach(node => {
            if (nodePositions[node.nodeCode]) {
              node.x = nodePositions[node.nodeCode].x
              node.y = nodePositions[node.nodeCode].y
            }
          })

          const edges = flows.map(flow => ({
            source: flow.nodeCode,
            target: flow.nextNodeCode,
            ...flow
          }))

          this.initialNodes = nodes
          this.initialEdges = edges
        })
      })
    },
    // 处理节点新建事件
    handleNodeCreated(node) {
      this.availableNodes.push(node)
    },
    // 显示下次执行时间
    showNextRunTime(cronExpr) {
      if (!cronExpr) {
        this.$message.warning('表达式为空')
        return
      }
      const dates = getNextCronDates(cronExpr, 5)
      if (dates.length > 0) {
        this.nextRunTimes = dates
        this.showNextRunDialog = true
      } else {
        this.$message.warning('无法计算出下次执行时间')
      }
    },
    openCronDialog() {
      this.cronExpressionTemp = this.temp.runCron || ''
      this.showCronDialog = true
    },
    // Cron表达式选择完成回调
    crontabFill(value) {
      this.temp.runCron = value
      this.showCronDialog = false
      this.onCronInput(value)
    },
    // Cron表达式输入时解析
    onCronInput() {
      const expr = this.temp.runCron
      if (!expr || expr.trim() === '') {
        this.cronInfo = ''
        this.cronError = ''
        return
      }
      if (!validateCron(expr)) {
        this.cronInfo = ''
        this.cronError = '表达式格式错误，应为5位: 分 时 日 月 周'
        return
      }
      const next = getNextCronDate(expr)
      if (next) {
        const nextStr = parseTime(next, '{y}-{m}-{d} {h}:{i}:{s}')
        this.cronInfo = '下次执行时间: ' + nextStr
        this.cronError = ''
      } else {
        this.cronInfo = ''
        this.cronError = '无法计算出下次执行时间'
      }
    },
    parseTime: parseTime
  }
}
</script>

<style scoped>
.dag-dialog {
  height: 90vh;
}
.dag-dialog >>> .el-tabs__content {
  padding: 0;
  display: flex;
  flex-direction: column;
}
.dag-dialog >>> .el-tab-pane {
  flex: 1;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}
.dag-dialog >>> .el-tabs {
  height: 100%;
  display: flex;
  flex-direction: column;
}
.dag-dialog >>> .el-dialog__body {
  padding: 0;
  height: calc(90vh - 60px);
  overflow: hidden;
}
</style>
