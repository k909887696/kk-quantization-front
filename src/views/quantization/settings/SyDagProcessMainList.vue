<template>
  <div class="app-container">
    <div class="filter-container">
      <el-form :inline="true" label-width="120px" label-position="right">
        <el-row>
          <el-form-item label="执行实例编码:">
            <el-input v-model="listQuery.processId" placeholder="执行实例编码" style="width: 300px;" class="filter-item" @keyup.enter.native="handleFilter" />
          </el-form-item>
          <el-form-item label="执行实例名称:">
            <el-input v-model="listQuery.processName" placeholder="执行实例名称" style="width: 300px;" class="filter-item" @keyup.enter.native="handleFilter" />
          </el-form-item>
          <el-form-item label="DAG主表编号:">
            <el-select v-model="listQuery.dagId" placeholder="请选择DAG" style="width: 300px;" clearable filterable>
              <el-option v-for="dag in dagOptions" :key="dag.dagId" :label="dag.dagName + ' (' + dag.dagId + ')'" :value="dag.dagId" />
            </el-select>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="状态:">
            <el-select v-model="listQuery.status" placeholder="请选择状态" style="width: 300px;" clearable>
              <el-option label="全部" value="" />
              <el-option v-for="item in statusOptions" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
          </el-form-item>
          <el-form-item label="执行次数:">
            <el-input-number v-model="listQuery.runCount" :min="0" controls-position="right" style="width: 300px;" class="filter-item" />
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="创建时间:">
            <el-date-picker v-model="createTimeRange" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" value-format="yyyy-MM-dd HH:mm:ss" :default-time="defaultRangeTime" :shortcuts="shortcuts" style="width: 380px;" />
          </el-form-item>
          <el-form-item label="预执行时间:">
            <el-date-picker v-model="preRunTimeRange" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" value-format="yyyy-MM-dd HH:mm:ss" :default-time="defaultRangeTime" :shortcuts="shortcuts" style="width: 380px;" />
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="执行时间:">
            <el-date-picker v-model="runTimeRange" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" value-format="yyyy-MM-dd HH:mm:ss" :default-time="defaultRangeTime" :shortcuts="shortcuts" style="width: 380px;" />
          </el-form-item>
          <el-form-item label="完成时间:">
            <el-date-picker v-model="finishTimeRange" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" value-format="yyyy-MM-dd HH:mm:ss" :default-time="defaultRangeTime" :shortcuts="shortcuts" style="width: 380px;" />
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="异常信息:">
            <el-input v-model="listQuery.exMessage" placeholder="异常信息" style="width: 300px;" class="filter-item" @keyup.enter.native="handleFilter" />
          </el-form-item>
        </el-row>
        <el-row justify="center" type="flex">
          <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
            查询
          </el-button>
          <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-document-add" @click="addDataDialog">
            添加
          </el-button>
          <el-button v-waves class="filter-item" style="margin-left: 10px;" type="warning" icon="el-icon-refresh-right" :disabled="multipleSelection.length === 0" @click="batchRestartData">
            批量重新执行<span v-if="multipleSelection.length > 0">（{{ multipleSelection.length }}）</span>
          </el-button>
          <el-button v-waves class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-download" @click="getPageList">
            导出
          </el-button>
        </el-row>
      </el-form>
    </div>
    <el-table
      ref="dataTable"
      class="dag-process-main-table"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
      row-key="processId"
      style="width: 100%;"
      @selection-change="handleSelectionChange"
    >
      <template slot="empty">
        {{ empty_tip }}
      </template>
      <el-table-column align="center" type="selection" width="50" :reserve-selection="true" />
      <el-table-column align="center" label="执行实例编码" width="160">
        <template slot-scope="scope">
          {{ scope.row.processId }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="执行实例名称" width="160">
        <template slot-scope="scope">
          {{ scope.row.processName }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="DAG主表编号" width="160">
        <template slot-scope="scope">
          {{ scope.row.dagId }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="起始执行节点编号" width="150">
        <template slot-scope="scope">
          {{ scope.row.topNodeCode }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="执行实例全局参数" width="140">
        <template slot-scope="scope">
          <el-tooltip v-if="scope.row.runParams" content="点击查看JSON" placement="top">
            <el-button type="text" size="mini" @click="$refs.jsonViewer.show(scope.row.runParams, '执行实例全局参数')">
              查看JSON
            </el-button>
          </el-tooltip>
          <span v-else>-</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="执行次数" width="90">
        <template slot-scope="scope">
          {{ scope.row.runCount }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="状态" width="100">
        <template slot-scope="scope">
          <el-tag :type="statusTagType(scope.row.status)">
            {{ statusLabel(scope.row.status) }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" label="预执行时间" width="160">
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span>{{ scope.row.preRunTime ? parseTime(new Date(scope.row.preRunTime), '{y}-{m}-{d} {h}:{i}:{s}') : '-' }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="执行时间" width="160">
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span>{{ scope.row.runTime ? parseTime(new Date(scope.row.runTime), '{y}-{m}-{d} {h}:{i}:{s}') : '-' }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="完成时间" width="160">
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span>{{ scope.row.finishTime ? parseTime(new Date(scope.row.finishTime), '{y}-{m}-{d} {h}:{i}:{s}') : '-' }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="异常信息" width="180">
        <template slot-scope="scope">
          <el-tooltip
            v-if="scope.row.exMessage"
            placement="top"
            effect="light"
            :open-delay="200"
            popper-class="dag-ex-message-tooltip"
          >
            <div class="ex-message-text">{{ scope.row.exMessage }}</div>
            <div slot="content" class="dag-ex-message-content">{{ scope.row.exMessage }}</div>
          </el-tooltip>
          <span v-else>-</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="创建时间" width="160">
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span>{{ scope.row.createTime ? parseTime(new Date(scope.row.createTime), '{y}-{m}-{d} {h}:{i}:{s}') : '-' }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="创建人编号" width="120">
        <template slot-scope="scope">
          {{ scope.row.createId }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="创建人名称" width="120">
        <template slot-scope="scope">
          {{ scope.row.createName }}
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="280" class-name="small-padding fixed-width" fixed="right">
        <template slot-scope="{row}">
          <el-button type="success" icon="el-icon-view" size="mini" style="margin-bottom: 6px;" @click="viewDetail(row)">
            查看详情
          </el-button>
          <el-button type="success" icon="el-icon-refresh-right" size="mini" style="margin-bottom: 6px;" @click="restartData(row)">
            重新执行
          </el-button>
          <el-dropdown trigger="click" size="mini" @command="(cmd) => handleCommand(cmd, row)">
            <el-button size="mini" icon="el-icon-more" style="margin-bottom: 6px;">更多</el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="editDataDialog">
                <i class="el-icon-edit" /> 编辑
              </el-dropdown-item>
              <el-dropdown-item command="deleteData" divided>
                <i class="el-icon-delete" style="color: #f56c6c;" /> 删除
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="total>0" :total="total" :page.sync="listQuery.pageIndex" :limit.sync="listQuery.pageSize" @pagination="getPageList" />

    <el-dialog
      :title="dialogStatus === 'insert' ? '添加DAG执行实例' : '编辑DAG执行实例'"
      :visible.sync="dialogFormVisible"
      :close-on-click-modal="false"
      top="50px"
      width="850px"
    >
      <el-form ref="dataForm" :model="temp" label-position="right" label-width="140px" style="margin-left: 20px; margin-right: 20px;">
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="执行实例编码" prop="processId">
              <el-input v-model="temp.processId" :disabled="dialogStatus==='update'" placeholder="执行实例编码" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="执行实例名称" prop="processName">
              <el-input v-model="temp.processName" placeholder="执行实例名称" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="DAG主表编号" prop="dagId">
              <el-input v-model="temp.dagId" placeholder="DAG主表编号" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="起始执行节点编号" prop="topNodeCode">
              <el-input v-model="temp.topNodeCode" placeholder="起始执行节点编号" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="执行实例全局参数" prop="runParams">
              <el-input v-model="temp.runParams" type="textarea" :rows="6" placeholder="执行实例全局参数" style="width: calc(100% - 80px);" />
              <el-button type="text" size="mini" icon="el-icon-view" style="margin-left: 10px; color: #409eff;" @click="$refs.jsonViewer.show(temp.runParams || '', '执行实例全局参数')">
                查看JSON
              </el-button>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="执行次数" prop="runCount">
              <el-input-number v-model="temp.runCount" :min="0" controls-position="right" placeholder="执行次数" style="width: 100%;" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="状态" prop="status">
              <el-select v-model="temp.status" placeholder="请选择状态" style="width: 100%;">
                <el-option v-for="item in statusOptions" :key="item.value" :label="item.label" :value="item.value" />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="预执行时间" prop="preRunTime">
              <el-date-picker v-model="temp.preRunTime" type="datetime" format="yyyy-MM-dd HH:mm:ss" value-format="yyyy-MM-dd HH:mm:ss" style="width: 100%;" placeholder="选择时间" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="执行时间" prop="runTime">
              <el-date-picker v-model="temp.runTime" type="datetime" format="yyyy-MM-dd HH:mm:ss" value-format="yyyy-MM-dd HH:mm:ss" style="width: 100%;" placeholder="选择时间" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="完成时间" prop="finishTime">
              <el-date-picker v-model="temp.finishTime" type="datetime" format="yyyy-MM-dd HH:mm:ss" value-format="yyyy-MM-dd HH:mm:ss" style="width: 100%;" placeholder="选择时间" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="创建人编号" prop="createId">
              <el-input v-model="temp.createId" placeholder="创建人编号" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="创建人名称" prop="createName">
              <el-input v-model="temp.createName" placeholder="创建人名称" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="异常信息" prop="exMessage">
              <el-input v-model="temp.exMessage" type="textarea" :rows="3" placeholder="异常信息" />
            </el-form-item>
          </el-col>
        </el-row>
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

    <!-- JSON查看器 -->
    <json-viewer ref="jsonViewer" @save="onJsonSave" />

    <!-- 执行实例详情（DAG图只读展示，不可编辑） -->
    <el-dialog
      title="DAG执行实例详情"
      :visible.sync="detailVisible"
      :close-on-click-modal="false"
      top="10px"
      width="90%"
      custom-class="dag-detail-dialog"
    >
      <el-tabs v-model="detailActiveTab" type="border-card">
        <el-tab-pane label="DAG执行图" name="graph">
          <div v-if="detailActiveTab === 'graph' && detailLoaded" :style="{ display: 'flex', flexDirection: 'column', flex: '1 1 auto' }">
            <dag-designer
              ref="detailDesigner"
              :readonly="true"
              :initial-nodes="detailNodes"
              :initial-edges="detailEdges"
            />
          </div>
          <div v-else-if="detailActiveTab === 'graph'" class="pm-detail-loading">
            <i class="el-icon-loading" /> 正在加载执行流程数据...
          </div>
        </el-tab-pane>
        <el-tab-pane label="基本信息" name="basic">
          <div class="pm-detail-info">
            <el-row class="pm-detail-row">
              <el-col :span="8" class="pm-detail-cell">
                <span class="pm-detail-label">执行实例编码</span><span class="pm-detail-value">{{ detailMain.processId }}</span>
              </el-col>
              <el-col :span="8" class="pm-detail-cell">
                <span class="pm-detail-label">执行实例名称</span><span class="pm-detail-value">{{ detailMain.processName }}</span>
              </el-col>
              <el-col :span="8" class="pm-detail-cell">
                <span class="pm-detail-label">DAG主表编号</span><span class="pm-detail-value">{{ detailMain.dagId }}</span>
              </el-col>
            </el-row>
            <el-row class="pm-detail-row">
              <el-col :span="8" class="pm-detail-cell">
                <span class="pm-detail-label">起始执行节点</span><span class="pm-detail-value">{{ detailMain.topNodeCode }}</span>
              </el-col>
              <el-col :span="8" class="pm-detail-cell">
                <span class="pm-detail-label">状态</span>
                <span class="pm-detail-value">
                  <el-tag :type="statusTagType(detailMain.status)" size="mini">{{ statusLabel(detailMain.status) }}</el-tag>
                </span>
              </el-col>
              <el-col :span="8" class="pm-detail-cell">
                <span class="pm-detail-label">执行次数</span><span class="pm-detail-value">{{ detailMain.runCount }}</span>
              </el-col>
            </el-row>
            <el-row class="pm-detail-row">
              <el-col :span="8" class="pm-detail-cell">
                <span class="pm-detail-label">预执行时间</span><span class="pm-detail-value">{{ formatTime(detailMain.preRunTime) }}</span>
              </el-col>
              <el-col :span="8" class="pm-detail-cell">
                <span class="pm-detail-label">执行时间</span><span class="pm-detail-value">{{ formatTime(detailMain.runTime) }}</span>
              </el-col>
              <el-col :span="8" class="pm-detail-cell">
                <span class="pm-detail-label">完成时间</span><span class="pm-detail-value">{{ formatTime(detailMain.finishTime) }}</span>
              </el-col>
            </el-row>
            <el-row class="pm-detail-row">
              <el-col :span="8" class="pm-detail-cell">
                <span class="pm-detail-label">创建时间</span><span class="pm-detail-value">{{ formatTime(detailMain.createTime) }}</span>
              </el-col>
              <el-col :span="8" class="pm-detail-cell">
                <span class="pm-detail-label">创建人编号</span><span class="pm-detail-value">{{ detailMain.createId }}</span>
              </el-col>
              <el-col :span="8" class="pm-detail-cell">
                <span class="pm-detail-label">创建人名称</span><span class="pm-detail-value">{{ detailMain.createName }}</span>
              </el-col>
            </el-row>
            <el-row class="pm-detail-row">
              <el-col :span="24" class="pm-detail-cell">
                <span class="pm-detail-label">全局参数</span>
                <span class="pm-detail-value">
                  <el-button v-if="detailMain.runParams" type="text" size="mini" icon="el-icon-view" @click="$refs.detailJsonViewer.show(detailMain.runParams, '执行实例全局参数')">
                    查看JSON
                  </el-button>
                  <span v-else>-</span>
                </span>
              </el-col>
            </el-row>
            <el-row class="pm-detail-row">
              <el-col :span="24" class="pm-detail-cell pm-detail-cell--top">
                <span class="pm-detail-label">异常信息</span><span class="pm-detail-value pm-detail-pre">{{ detailMain.exMessage || '-' }}</span>
              </el-col>
            </el-row>
          </div>
        </el-tab-pane>
      </el-tabs>
      <div slot="footer" class="dialog-footer">
        <el-button @click="detailVisible = false">
          关闭
        </el-button>
      </div>
    </el-dialog>

    <!-- 详情专用只读JSON查看器 -->
    <json-viewer ref="detailJsonViewer" :readonly="true" />
  </div>
</template>

<script>
import { getSyDagProcessMainPageList, deleteSyDagProcessMainById, insertSyDagProcessMain, updateSyDagProcessMain, getSyDagProcessMainDetails, restartSyDagProcessMain, batchRestartSyDagProcessMain } from '@/api/quantization/SyDagProcessMainApi'
import { getSyDagProcessFlowPageList } from '@/api/quantization/SyDagProcessFlowApi'
import { getSyDagMainPageList } from '@/api/quantization/SyDagMainApi'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
import JsonViewer from '@/components/JsonViewer'
import DagDesigner from '@/components/DagDesigner'
import { parseTime, renderHeaderTip } from '@/utils/index.js'
import waves from '@/directive/waves' // waves directive
import config from '@/config'

// 状态字典：0待执行 1执行中 2成功 3失败 4已挂起
const STATUS_OPTIONS = [
  { value: '0', label: '待执行', tag: 'info' },
  { value: '1', label: '执行中', tag: '' },
  { value: '2', label: '成功', tag: 'success' },
  { value: '3', label: '失败', tag: 'danger' },
  { value: '4', label: '已挂起', tag: 'warning' }
]

// 日期范围选择器快捷选项
const SHORTCUTS = [
  { text: '最近一周', onClick(picker) { const end = new Date(); const start = new Date(); start.setTime(start.getTime() - 3600 * 1000 * 24 * 7); picker.$emit('pick', [start, end]) } },
  { text: '最近一个月', onClick(picker) { const end = new Date(); const start = new Date(); start.setTime(start.getTime() - 3600 * 1000 * 24 * 30); picker.$emit('pick', [start, end]) } },
  { text: '最近三个月', onClick(picker) { const end = new Date(); const start = new Date(); start.setTime(start.getTime() - 3600 * 1000 * 24 * 90); picker.$emit('pick', [start, end]) } }
]

export default {
  components: { Pagination, JsonViewer, DagDesigner },
  directives: { waves },
  filters: {},
  data() {
    return {
      empty_tip: config.table_list_empty_tip,
      list: null,
      total: 0,
      statusOptions: STATUS_OPTIONS,
      listQuery: {
        processId: undefined,
        processName: undefined,
        dagId: undefined,
        status: '',
        runCount: undefined,
        createTimeStart: undefined,
        createTimeEnd: undefined,
        preRunTimeStart: undefined,
        preRunTimeEnd: undefined,
        runTimeStart: undefined,
        runTimeEnd: undefined,
        finishTimeStart: undefined,
        finishTimeEnd: undefined,
        exMessage: undefined,
        pageIndex: 1,
        pageSize: 10
      },
      dagOptions: [],
      shortcuts: SHORTCUTS,
      defaultRangeTime: [new Date(2000, 0, 1, 0, 0, 0), new Date(2000, 0, 1, 23, 59, 59)],
      dialogFormVisible: false,
      temp: {
        processId: undefined,
        processName: undefined,
        dagId: undefined,
        topNodeCode: undefined,
        runParams: undefined,
        runCount: undefined,
        exMessage: undefined,
        preRunTime: undefined,
        runTime: undefined,
        finishTime: undefined,
        status: '0',
        createId: undefined,
        createName: undefined
      },
      dialogStatus: 'insert',
      // 多选（批量重新执行）
      multipleSelection: [],
      // 查看详情（DAG图只读）
      detailVisible: false,
      detailActiveTab: 'graph',
      detailLoaded: false,
      detailMain: {},
      detailNodes: [],
      detailEdges: []
    }
  },
  computed: {
    createTimeRange: {
      get() { return (this.listQuery.createTimeStart && this.listQuery.createTimeEnd) ? [this.listQuery.createTimeStart, this.listQuery.createTimeEnd] : null },
      set(val) { this.listQuery.createTimeStart = val ? val[0] : undefined; this.listQuery.createTimeEnd = val ? val[1] : undefined }
    },
    preRunTimeRange: {
      get() { return (this.listQuery.preRunTimeStart && this.listQuery.preRunTimeEnd) ? [this.listQuery.preRunTimeStart, this.listQuery.preRunTimeEnd] : null },
      set(val) { this.listQuery.preRunTimeStart = val ? val[0] : undefined; this.listQuery.preRunTimeEnd = val ? val[1] : undefined }
    },
    runTimeRange: {
      get() { return (this.listQuery.runTimeStart && this.listQuery.runTimeEnd) ? [this.listQuery.runTimeStart, this.listQuery.runTimeEnd] : null },
      set(val) { this.listQuery.runTimeStart = val ? val[0] : undefined; this.listQuery.runTimeEnd = val ? val[1] : undefined }
    },
    finishTimeRange: {
      get() { return (this.listQuery.finishTimeStart && this.listQuery.finishTimeEnd) ? [this.listQuery.finishTimeStart, this.listQuery.finishTimeEnd] : null },
      set(val) { this.listQuery.finishTimeStart = val ? val[0] : undefined; this.listQuery.finishTimeEnd = val ? val[1] : undefined }
    }
  },
  created() { // 初始化界面
    this.loadDagOptions()
    this.getPageList()
  },
  methods: {
    getPageList() { // 查询列表分页
      getSyDagProcessMainPageList(this.listQuery).then(response => {
        this.list = response.data === null ? [] : response.data.result
        this.total = response.data === null ? 0 : response.data.totalCount
      })
    },
    handleFilter() {
      this.listQuery.pageIndex = 1
      this.getPageList()
    },
    handleCommand(command, row) {
      if (command === 'editDataDialog') this.editDataDialog(row)
      else if (command === 'deleteData') this.deleteData(row)
    },
    handleSelectionChange(selection) {
      this.multipleSelection = selection || []
    },
    // 重新执行：状态置待执行并清空执行次数，用于失败次数上限挂起后修复异常的人工恢复
    restartData(row) {
      this.$confirm('确认重新执行该DAG执行实例?（状态置待执行、清空异常信息和执行次数）', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        restartSyDagProcessMain({ processId: row.processId }).then(() => {
          this.$message.success('重新执行已触发')
          this.getPageList()
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消重新执行'
        })
      })
    },
    // 批量重新执行：同一事务内逐条处理，任一失败整体回滚
    batchRestartData() {
      if (this.multipleSelection.length === 0) {
        this.$message.warning('请先勾选需要重新执行的DAG执行实例')
        return
      }
      const processIds = this.multipleSelection.map(item => item.processId)
      const suspendedList = this.multipleSelection.filter(item => item.status === '4')
      let tip = `确认批量重新执行选中的 ${processIds.length} 条DAG执行实例?`
      if (suspendedList.length < processIds.length) {
        tip = `选中的 ${processIds.length} 条中有 ${processIds.length - suspendedList.length} 条不是已挂起状态，确认一并重新执行?`
      }
      this.$confirm(tip + '（状态置待执行、清空异常信息和执行次数）', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        batchRestartSyDagProcessMain({ processIds: processIds }).then(() => {
          this.$message.success(`已触发 ${processIds.length} 条实例重新执行`)
          this.$refs.dataTable.clearSelection()
          this.getPageList()
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消批量重新执行'
        })
      })
    },
    statusLabel(status) {
      const item = STATUS_OPTIONS.find(o => o.value === String(status))
      return item ? item.label : status
    },
    statusTagType(status) {
      const item = STATUS_OPTIONS.find(o => o.value === String(status))
      return item ? item.tag : 'info'
    },
    formatTime(time) {
      return time ? parseTime(new Date(time), '{y}-{m}-{d} {h}:{i}:{s}') : '-'
    },
    // 查看详情：用执行实例 + 实例流程数据初始化DAG图，只读展示
    viewDetail(row) {
      this.detailActiveTab = 'graph'
      this.detailMain = Object.assign({}, row)
      this.detailNodes = []
      this.detailEdges = []
      this.detailLoaded = false
      this.detailVisible = true

      // 基本信息取详情接口，保证字段完整
      getSyDagProcessMainDetails(row).then(response => {
        this.detailMain = Object.assign({}, row, response.data || {})
      })

      getSyDagProcessFlowPageList({ processId: row.processId, pageIndex: 1, pageSize: 9999 }).then(response => {
        const flows = response.data && response.data.result ? response.data.result : []
        // 节点：取实例流程自身的节点与执行状态，由DagDesigner按状态着色
        this.detailNodes = flows.map(flow => ({
          nodeCode: flow.nodeCode,
          nodeName: flow.nodeName || flow.nodeCode,
          status: flow.status,
          processFlowId: flow.processFlowId,
          runParam: flow.runParam,
          preRunTime: flow.preRunTime,
          runTime: flow.runTime,
          finishTime: flow.finishTime,
          exMessage: flow.exMessage
        }))
        // 边：按实例流程的下级节点关系组装
        this.detailEdges = flows
          .filter(flow => flow.nextNodeCode)
          .map(flow => ({ source: flow.nodeCode, target: flow.nextNodeCode }))
        this.detailLoaded = true
      })
    },
    deleteData(row) {
      this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteSyDagProcessMainById(row).then(response => {
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
      // 时间类字段转为Date提交，创建时间不参与更新
      this.fillSubmitTimes()
      delete this.temp.createTime
      updateSyDagProcessMain(this.temp).then(response => {
        this.dialogFormVisible = false
        this.getPageList()
      })
    },
    addData() {
      // 时间类字段转为Date提交，创建时间由后端赋值
      this.fillSubmitTimes()
      delete this.temp.createTime
      insertSyDagProcessMain(this.temp).then(response => {
        this.dialogFormVisible = false
        this.getPageList()
      })
    },
    fillSubmitTimes() {
      const timeFields = ['preRunTime', 'runTime', 'finishTime']
      timeFields.forEach(field => {
        this.temp[field] = this.temp[field] ? new Date(this.temp[field]) : undefined
      })
    },
    editDataDialog(row) {
      this.dialogStatus = 'update'
      getSyDagProcessMainDetails(row).then(response => {
        this.temp = Object.assign({}, response.data === null ? row : response.data) // copy obj
        this.temp.status = this.temp.status === null || this.temp.status === undefined ? undefined : String(this.temp.status)
        this.temp.preRunTime = this.temp.preRunTime ? parseTime(new Date(this.temp.preRunTime), '{y}-{m}-{d} {h}:{i}:{s}') : undefined
        this.temp.runTime = this.temp.runTime ? parseTime(new Date(this.temp.runTime), '{y}-{m}-{d} {h}:{i}:{s}') : undefined
        this.temp.finishTime = this.temp.finishTime ? parseTime(new Date(this.temp.finishTime), '{y}-{m}-{d} {h}:{i}:{s}') : undefined

        this.dialogFormVisible = true
      })
    },
    addDataDialog(row) {
      this.dialogStatus = 'insert'
      this.temp = Object.assign({ status: '0' }, row) // copy obj
      this.dialogFormVisible = true
    },
    // JSON查看器保存回调
    onJsonSave(jsonString) {
      this.temp.runParams = jsonString
      this.$message.success('执行实例全局参数已更新')
    },
    parseTime: parseTime,
    renderHeaderTip: renderHeaderTip,
    loadDagOptions() {
      getSyDagMainPageList({ pageIndex: 1, pageSize: 9999 }).then(response => {
        this.dagOptions = response.data && response.data.result ? response.data.result : []
      })
    }
  }
}
</script>

<style>
.dag-process-main-table .ex-message-text {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  line-height: 20px;
}
.dag-ex-message-tooltip {
  max-width: calc(100vw - 40px);
}
.dag-ex-message-content {
  max-width: 720px;
  max-height: 60vh;
  overflow: auto;
  white-space: pre-wrap;
  word-break: break-all;
  line-height: 1.5;
}

/* 详情弹框：使用非 scoped + 专前缀类，避免深度选择器失效时布局堆在一起 */
.dag-detail-dialog {
  max-height: calc(100vh - 20px);
  display: flex;
  flex-direction: column;
}
.dag-detail-dialog .el-dialog__body {
  padding: 0 10px;
  flex: 1;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}
.dag-detail-dialog .el-tabs {
  height: 100%;
  display: flex;
  flex-direction: column;
}
.dag-detail-dialog .el-tabs__content {
  padding: 0;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}
.dag-detail-dialog .el-tabs__content > .el-tab-pane {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: auto;
}

/* 基本信息：带边框的三列信息表 */
.pm-detail-info {
  margin: 12px;
  border: 1px solid #ebeef5;
  border-radius: 4px;
  background: #fff;
  overflow: hidden;
  flex-shrink: 0;
}
.pm-detail-info .pm-detail-row + .pm-detail-row {
  border-top: 1px solid #ebeef5;
}
.pm-detail-info .pm-detail-cell {
  display: flex;
  align-items: center;
  min-height: 44px;
  padding: 8px 14px;
  font-size: 13px;
}
.pm-detail-info .pm-detail-cell + .pm-detail-cell {
  border-left: 1px solid #ebeef5;
}
.pm-detail-info .pm-detail-cell--top {
  align-items: flex-start;
}
.pm-detail-info .pm-detail-label {
  flex: 0 0 120px;
  color: #909399;
}
.pm-detail-info .pm-detail-value {
  flex: 1;
  min-width: 0;
  color: #303133;
  word-break: break-all;
}
.pm-detail-info .pm-detail-pre {
  white-space: pre-wrap;
  line-height: 1.6;
}
.pm-detail-loading {
  padding: 40px;
  text-align: center;
  color: #909399;
}
</style>
