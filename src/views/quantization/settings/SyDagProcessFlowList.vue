<template>
    <div class="app-container">
        <div class="filter-container">
            <el-form :inline="true" label-width="110px" label-position="right">
                                        <el-row>
                        <el-form-item label="实例流程编码:">
                            <el-input v-model="listQuery.processFlowId" placeholder="实例流程编码" style="width: 300px;" class="filter-item" @keyup.enter.native="handleFilter" />
                        </el-form-item>
                        <el-form-item label="执行实例编码:">
                            <el-input v-model="listQuery.processId" placeholder="执行实例编码" style="width: 300px;" class="filter-item" @keyup.enter.native="handleFilter" />
                        </el-form-item>
                        <el-form-item label="DAG主表编码:">
                            <el-input v-model="listQuery.dagId" placeholder="DAG主表编码" style="width: 300px;" class="filter-item" @keyup.enter.native="handleFilter" />
                        </el-form-item>
                        </el-row>
                        <el-row>
                        <el-form-item label="DAG流程编码:">
                            <el-input v-model="listQuery.dagFlowId" placeholder="DAG流程编码" style="width: 300px;" class="filter-item" @keyup.enter.native="handleFilter" />
                        </el-form-item>
                        <el-form-item label="节点编码:">
                            <el-input v-model="listQuery.nodeCode" placeholder="节点编码" style="width: 300px;" class="filter-item" @keyup.enter.native="handleFilter" />
                        </el-form-item>
                        <el-form-item label="节点名称:">
                            <el-input v-model="listQuery.nodeName" placeholder="节点名称" style="width: 300px;" class="filter-item" @keyup.enter.native="handleFilter" />
                        </el-form-item>
                        </el-row>
                        <el-row>
                        <el-form-item label="状态(0:待执行,1:执行中,2:成功,3:失败):">
                            <el-input v-model="listQuery.status" placeholder="状态(0:待执行,1:执行中,2:成功,3:失败)" style="width: 300px;" class="filter-item" @keyup.enter.native="handleFilter" />
                        </el-form-item>
                        <el-form-item label="执行参数(JSON):">
                            <el-input v-model="listQuery.runParam" placeholder="执行参数(JSON)" style="width: 300px;" class="filter-item" @keyup.enter.native="handleFilter" />
                        </el-form-item>
                        <el-form-item label="预执行时间:">
                            <el-date-picker v-model="listQuery.preRunTimeStart" type="date" format="yyyy-MM-dd" value-format="yyyy-MM-dd" style="width: 150px;" placeholder="选择时间" /> -
                            <el-date-picker v-model="listQuery.preRunTimeEnd" type="date" format="yyyy-MM-dd" value-format="yyyy-MM-dd" style="width: 150px;" placeholder="选择时间" />
                        </el-form-item>
                        </el-row>
                        <el-row>
                        <el-form-item label="执行时间:">
                            <el-date-picker v-model="listQuery.runTimeStart" type="date" format="yyyy-MM-dd" value-format="yyyy-MM-dd" style="width: 150px;" placeholder="选择时间" /> -
                            <el-date-picker v-model="listQuery.runTimeEnd" type="date" format="yyyy-MM-dd" value-format="yyyy-MM-dd" style="width: 150px;" placeholder="选择时间" />
                        </el-form-item>
                        <el-form-item label="完成时间:">
                            <el-date-picker v-model="listQuery.finishTimeStart" type="date" format="yyyy-MM-dd" value-format="yyyy-MM-dd" style="width: 150px;" placeholder="选择时间" /> -
                            <el-date-picker v-model="listQuery.finishTimeEnd" type="date" format="yyyy-MM-dd" value-format="yyyy-MM-dd" style="width: 150px;" placeholder="选择时间" />
                        </el-form-item>
                        <el-form-item label="异常信息:">
                            <el-input v-model="listQuery.exMessage" placeholder="异常信息" style="width: 300px;" class="filter-item" @keyup.enter.native="handleFilter" />
                        </el-form-item>
                        </el-row>
                        <el-row>
                        <el-form-item label="创建时间:">
                            <el-date-picker v-model="listQuery.createTimeStart" type="date" format="yyyy-MM-dd" value-format="yyyy-MM-dd" style="width: 150px;" placeholder="选择时间" /> -
                            <el-date-picker v-model="listQuery.createTimeEnd" type="date" format="yyyy-MM-dd" value-format="yyyy-MM-dd" style="width: 150px;" placeholder="选择时间" />
                        </el-form-item>
                        <el-form-item label="创建人编号:">
                            <el-input v-model="listQuery.createId" placeholder="创建人编号" style="width: 300px;" class="filter-item" @keyup.enter.native="handleFilter" />
                        </el-form-item>
                        <el-form-item label="创建人名称:">
                            <el-input v-model="listQuery.createName" placeholder="创建人名称" style="width: 300px;" class="filter-item" @keyup.enter.native="handleFilter" />
                        </el-form-item>
                        </el-row>
                        <el-row>
                        <el-form-item label="下级节点:">
                            <el-input v-model="listQuery.nextNodeCode" placeholder="下级节点" style="width: 300px;" class="filter-item" @keyup.enter.native="handleFilter" />
                        </el-form-item>
                        <el-form-item label="上级节点:">
                            <el-input v-model="listQuery.preNodeCode" placeholder="上级节点" style="width: 300px;" class="filter-item" @keyup.enter.native="handleFilter" />
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
                    <el-table-column align="center" label="实例流程编码" width="150">
                        <template slot-scope="scope">
                            {{ scope.row.processFlowId }}
                        </template>
                    </el-table-column>
                    <el-table-column align="center" label="执行实例编码" width="150">
                        <template slot-scope="scope">
                            {{ scope.row.processId }}
                        </template>
                    </el-table-column>
                    <el-table-column align="center" label="DAG主表编码" width="150">
                        <template slot-scope="scope">
                            {{ scope.row.dagId }}
                        </template>
                    </el-table-column>
                    <el-table-column align="center" label="DAG流程编码" width="150">
                        <template slot-scope="scope">
                            {{ scope.row.dagFlowId }}
                        </template>
                    </el-table-column>
                    <el-table-column align="center" label="节点编码" width="150">
                        <template slot-scope="scope">
                            {{ scope.row.nodeCode }}
                        </template>
                    </el-table-column>
                    <el-table-column align="center" label="节点名称" width="150">
                        <template slot-scope="scope">
                            {{ scope.row.nodeName }}
                        </template>
                    </el-table-column>
                    <el-table-column align="center" label="状态(0:待执行,1:执行中,2:成功,3:失败)" width="150">
                        <template slot-scope="scope">
                            {{ scope.row.status }}
                        </template>
                    </el-table-column>
                    <el-table-column align="center" label="执行参数(JSON)" width="150">
                        <template slot-scope="scope">
                            {{ scope.row.runParam }}
                        </template>
                    </el-table-column>
                    <el-table-column align="center" label="预执行时间" width="110">
                        <template slot-scope="scope">
                            <i class="el-icon-time" />
                            <span>{{ parseTime(new Date(scope.row.preRunTime) ,'{y}-{m}-{d} {h}:{i}:{s}') }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column align="center" label="执行时间" width="110">
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
                    <el-table-column align="center" label="异常信息" width="150">
                        <template slot-scope="scope">
                            {{ scope.row.exMessage }}
                        </template>
                    </el-table-column>
                    <el-table-column align="center" label="创建时间" width="110">
                        <template slot-scope="scope">
                            <i class="el-icon-time" />
                            <span>{{ parseTime(new Date(scope.row.createTime) ,'{y}-{m}-{d} {h}:{i}:{s}') }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column align="center" label="创建人编号" width="150">
                        <template slot-scope="scope">
                            {{ scope.row.createId }}
                        </template>
                    </el-table-column>
                    <el-table-column align="center" label="创建人名称" width="150">
                        <template slot-scope="scope">
                            {{ scope.row.createName }}
                        </template>
                    </el-table-column>
                    <el-table-column align="center" label="下级节点" width="150">
                        <template slot-scope="scope">
                            {{ scope.row.nextNodeCode }}
                        </template>
                    </el-table-column>
                    <el-table-column align="center" label="上级节点" width="150">
                        <template slot-scope="scope">
                            {{ scope.row.preNodeCode }}
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
        <el-dialog title="DAG执行实例流程表编辑" :visible.sync="dialogFormVisible" :close-on-click-modal="false" top="50px">
            <el-form ref="dataForm" :model="temp" label-position="right" label-width="110px" style="width: 400px; margin-left:50px;">
                        <el-form-item label="实例流程编码" prop="type">
                            <el-input v-model="temp.processFlowId" readonly disabled placeholder="实例流程编码"/>
                        </el-form-item>
                        <el-form-item label="执行实例编码" prop="type">
                            <el-input v-model="temp.processId"  placeholder="执行实例编码" />
                        </el-form-item>
                        <el-form-item label="DAG主表编码" prop="type">
                            <el-input v-model="temp.dagId"  placeholder="DAG主表编码" />
                        </el-form-item>
                        <el-form-item label="DAG流程编码" prop="type">
                            <el-input v-model="temp.dagFlowId"  placeholder="DAG流程编码" />
                        </el-form-item>
                        <el-form-item label="节点编码" prop="type">
                            <el-input v-model="temp.nodeCode"  placeholder="节点编码" />
                        </el-form-item>
                        <el-form-item label="节点名称" prop="type">
                            <el-input v-model="temp.nodeName"  placeholder="节点名称" />
                        </el-form-item>
                        <el-form-item label="状态(0:待执行,1:执行中,2:成功,3:失败)" prop="type">
                            <el-input v-model="temp.status"  placeholder="状态(0:待执行,1:执行中,2:成功,3:失败)" />
                        </el-form-item>
                        <el-form-item label="执行参数(JSON)" prop="type">
                            <el-input v-model="temp.runParam"  placeholder="执行参数(JSON)" />
                        </el-form-item>
                        <el-form-item label="预执行时间" prop="type">
                            <el-date-picker v-model="temp.preRunTime" type="datetime" format="yyyy-MM-dd HH:mm:ss" value-format="yyyy-MM-dd HH:mm:ss" placeholder="选择时间" />
                        </el-form-item>
                        <el-form-item label="执行时间" prop="type">
                            <el-date-picker v-model="temp.runTime" type="datetime" format="yyyy-MM-dd HH:mm:ss" value-format="yyyy-MM-dd HH:mm:ss" placeholder="选择时间" />
                        </el-form-item>
                        <el-form-item label="完成时间" prop="type">
                            <el-date-picker v-model="temp.finishTime" type="datetime" format="yyyy-MM-dd HH:mm:ss" value-format="yyyy-MM-dd HH:mm:ss" placeholder="选择时间" />
                        </el-form-item>
                        <el-form-item label="异常信息" prop="type">
                            <el-input v-model="temp.exMessage"  placeholder="异常信息" />
                        </el-form-item>
                        <el-form-item label="创建时间" prop="type">
                            <el-date-picker v-model="temp.createTime" type="datetime" format="yyyy-MM-dd HH:mm:ss" value-format="yyyy-MM-dd HH:mm:ss" placeholder="选择时间" />
                        </el-form-item>
                        <el-form-item label="创建人编号" prop="type">
                            <el-input v-model="temp.createId"  placeholder="创建人编号" />
                        </el-form-item>
                        <el-form-item label="创建人名称" prop="type">
                            <el-input v-model="temp.createName"  placeholder="创建人名称" />
                        </el-form-item>
                        <el-form-item label="下级节点" prop="type">
                            <el-input v-model="temp.nextNodeCode"  placeholder="下级节点" />
                        </el-form-item>
                        <el-form-item label="上级节点" prop="type">
                            <el-input v-model="temp.preNodeCode"  placeholder="上级节点" />
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
// import { get_base_data_item_map } from '@/api/quantization/settings'
import { getSyDagProcessFlowPageList, deleteSyDagProcessFlowById, insertSyDagProcessFlow, updateSyDagProcessFlow, getSyDagProcessFlowDetails } from '@/api/quantization/SyDagProcessFlowApi'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
import { parseTime, renderHeaderTip } from '@/utils/index.js'
import waves from '@/directive/waves' // waves directive
import config from '@/config'
export default {
  components: { Pagination },
  directives: { waves },
  filters: {

  },
  data() {
      return {
          empty_tip: config.table_list_empty_tip,
          list: null,
          total: 0,
          listQuery: {
            processFlowId: undefined,
            processId: undefined,
            dagId: undefined,
            dagFlowId: undefined,
            nodeCode: undefined,
            nodeName: undefined,
            status: undefined,
            runParam: undefined,
            preRunTimeStart: undefined,
            preRunTimeEnd: undefined,
            runTimeStart: undefined,
            runTimeEnd: undefined,
            finishTimeStart: undefined,
            finishTimeEnd: undefined,
            exMessage: undefined,
            createTimeStart: undefined,
            createTimeEnd: undefined,
            createId: undefined,
            createName: undefined,
            nextNodeCode: undefined,
            preNodeCode: undefined,
            pageIndex: 1,
            pageSize: 10
  },
      dialogFormVisible: false,
          temp: {
            processFlowId: undefined,
            processId: undefined,
            dagId: undefined,
            dagFlowId: undefined,
            nodeCode: undefined,
            nodeName: undefined,
            status: undefined,
            runParam: undefined,
            preRunTime: undefined,
            runTime: undefined,
            finishTime: undefined,
            exMessage: undefined,
            createTime: undefined,
            createId: undefined,
            createName: undefined,
            nextNodeCode: undefined,
            preNodeCode: undefined
      },
      dialogStatus: 'insert'
  }
  },
  created() { // 初始化界面
      this.getPageList()
  },
  methods: {
      getPageList() { // 查询列表分页
          getSyDagProcessFlowPageList(this.listQuery).then(response => {
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
              deleteSyDagProcessFlowById(row).then(response => {
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
          this.temp.preRunTime = new Date(this.temp.preRunTime)
          this.temp.runTime = new Date(this.temp.runTime)
          this.temp.finishTime = new Date(this.temp.finishTime)
          this.temp.createTime = new Date(this.temp.createTime)
          updateSyDagProcessFlow(this.temp).then(response => {
              this.dialogFormVisible = false
              this.getPageList()
          })
      },
      addData() {
          this.temp.preRunTime = new Date(this.temp.preRunTime)
          this.temp.runTime = new Date(this.temp.runTime)
          this.temp.finishTime = new Date(this.temp.finishTime)
          this.temp.createTime = new Date(this.temp.createTime)
          insertSyDagProcessFlow(this.temp).then(response => {
              this.dialogFormVisible = false
              this.getPageList()
          })
      },
      editDataDialog(row) {
          this.dialogStatus = 'update'
          getSyDagProcessFlowDetails(row).then(response => {
              this.temp = Object.assign({}, response.data === null ? row : response.data) // copy obj
              this.temp.preRunTime = parseTime(new Date(row.preRunTime), '{y}-{m}-{d} {h}:{i}:{s}')
              this.temp.runTime = parseTime(new Date(row.runTime), '{y}-{m}-{d} {h}:{i}:{s}')
              this.temp.finishTime = parseTime(new Date(row.finishTime), '{y}-{m}-{d} {h}:{i}:{s}')
              this.temp.createTime = parseTime(new Date(row.createTime), '{y}-{m}-{d} {h}:{i}:{s}')

              this.dialogFormVisible = true
          })
      },
      addDataDialog(row) {
          this.dialogStatus = 'insert'
          this.temp = Object.assign({}, row) // copy obj
          this.dialogFormVisible = true
      },
      parseTime: parseTime,
      renderHeaderTip: renderHeaderTip
  }
}
</script>
