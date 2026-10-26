<template>
    <div class="app-container">
        <div class="filter-container">
            <el-form :inline="true" label-width="110px" label-position="right">
                                        <el-row>
                        <el-form-item label="任务编号:">
                            <el-input v-model="listQuery.processTaskId" placeholder="任务编号" style="width: 300px;" class="filter-item" @keyup.enter.native="handleFilter" />
                        </el-form-item>
                        <el-form-item label="任务名称:">
                            <el-input v-model="listQuery.processTaskName" placeholder="任务名称" style="width: 300px;" class="filter-item" @keyup.enter.native="handleFilter" />
                        </el-form-item>
                        <el-form-item label="执行实例编码:">
                            <el-input v-model="listQuery.processId" placeholder="执行实例编码" style="width: 300px;" class="filter-item" @keyup.enter.native="handleFilter" />
                        </el-form-item>
                        </el-row>
                        <el-row>
                        <el-form-item label="DAG主表编码:">
                            <el-input v-model="listQuery.dagId" placeholder="DAG主表编码" style="width: 300px;" class="filter-item" @keyup.enter.native="handleFilter" />
                        </el-form-item>
                        <el-form-item label="执行节点编号:">
                            <el-input v-model="listQuery.nodeCode" placeholder="执行节点编号" style="width: 300px;" class="filter-item" @keyup.enter.native="handleFilter" />
                        </el-form-item>
                        <el-form-item label="起始执行节点编号:">
                            <el-input v-model="listQuery.topNodeCode" placeholder="起始执行节点编号" style="width: 300px;" class="filter-item" @keyup.enter.native="handleFilter" />
                        </el-form-item>
                        </el-row>
                        <el-row>
                        <el-form-item label="上级执行实例任务编号:">
                            <el-input v-model="listQuery.preProcessTaskId" placeholder="上级执行实例任务编号" style="width: 300px;" class="filter-item" @keyup.enter.native="handleFilter" />
                        </el-form-item>
                        <el-form-item label="下级执行实例任务编号:">
                            <el-input v-model="listQuery.nextProcessTaskId" placeholder="下级执行实例任务编号" style="width: 300px;" class="filter-item" @keyup.enter.native="handleFilter" />
                        </el-form-item>
                        <el-form-item label="上级执行节点编号:">
                            <el-input v-model="listQuery.preNodeCode" placeholder="上级执行节点编号" style="width: 300px;" class="filter-item" @keyup.enter.native="handleFilter" />
                        </el-form-item>
                        </el-row>
                        <el-row>
                        <el-form-item label="下级执行节点编号:">
                            <el-input v-model="listQuery.nextNodeCode" placeholder="下级执行节点编号" style="width: 300px;" class="filter-item" @keyup.enter.native="handleFilter" />
                        </el-form-item>
                        <el-form-item label="执行参数:">
                            <el-input v-model="listQuery.runParam" placeholder="执行参数" style="width: 300px;" class="filter-item" @keyup.enter.native="handleFilter" />
                        </el-form-item>
                        <el-form-item label="预执行时间:">
                            <el-date-picker v-model="listQuery.preRunTimeStart" type="date" format="yyyy-MM-dd" value-format="yyyy-MM-dd" style="width: 150px;" placeholder="选择时间" /> -
                            <el-date-picker v-model="listQuery.preRunTimeEnd" type="date" format="yyyy-MM-dd" value-format="yyyy-MM-dd" style="width: 150px;" placeholder="选择时间" />
                        </el-form-item>
                        </el-row>
                        <el-row>
                        <el-form-item label="执行次数（超过20次，就挂起）:">
                            <el-input v-model="listQuery.runCount" placeholder="执行次数（超过20次，就挂起）" style="width: 300px;" class="filter-item" @keyup.enter.native="handleFilter" />
                        </el-form-item>
                        <el-form-item label="备注:">
                            <el-input v-model="listQuery.reamrk" placeholder="备注" style="width: 300px;" class="filter-item" @keyup.enter.native="handleFilter" />
                        </el-form-item>
                        <el-form-item label="创建时间:">
                            <el-date-picker v-model="listQuery.createTimeStart" type="date" format="yyyy-MM-dd" value-format="yyyy-MM-dd" style="width: 150px;" placeholder="选择时间" /> -
                            <el-date-picker v-model="listQuery.createTimeEnd" type="date" format="yyyy-MM-dd" value-format="yyyy-MM-dd" style="width: 150px;" placeholder="选择时间" />
                        </el-form-item>
                        </el-row>
                        <el-row>
                        <el-form-item label="创建人编号:">
                            <el-input v-model="listQuery.createId" placeholder="创建人编号" style="width: 300px;" class="filter-item" @keyup.enter.native="handleFilter" />
                        </el-form-item>
                        <el-form-item label="创建人名称:">
                            <el-input v-model="listQuery.createName" placeholder="创建人名称" style="width: 300px;" class="filter-item" @keyup.enter.native="handleFilter" />
                        </el-form-item>
                        <el-form-item label="完成时间:">
                            <el-date-picker v-model="listQuery.finishTimeStart" type="date" format="yyyy-MM-dd" value-format="yyyy-MM-dd" style="width: 150px;" placeholder="选择时间" /> -
                            <el-date-picker v-model="listQuery.finishTimeEnd" type="date" format="yyyy-MM-dd" value-format="yyyy-MM-dd" style="width: 150px;" placeholder="选择时间" />
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
                    <el-table-column align="center" label="任务编号" width="150">
                        <template slot-scope="scope">
                            {{ scope.row.processTaskId }}
                        </template>
                    </el-table-column>
                    <el-table-column align="center" label="任务名称" width="150">
                        <template slot-scope="scope">
                            {{ scope.row.processTaskName }}
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
                    <el-table-column align="center" label="执行节点编号" width="150">
                        <template slot-scope="scope">
                            {{ scope.row.nodeCode }}
                        </template>
                    </el-table-column>
                    <el-table-column align="center" label="起始执行节点编号" width="150">
                        <template slot-scope="scope">
                            {{ scope.row.topNodeCode }}
                        </template>
                    </el-table-column>
                    <el-table-column align="center" label="上级执行实例任务编号" width="150">
                        <template slot-scope="scope">
                            {{ scope.row.preProcessTaskId }}
                        </template>
                    </el-table-column>
                    <el-table-column align="center" label="下级执行实例任务编号" width="150">
                        <template slot-scope="scope">
                            {{ scope.row.nextProcessTaskId }}
                        </template>
                    </el-table-column>
                    <el-table-column align="center" label="上级执行节点编号" width="150">
                        <template slot-scope="scope">
                            {{ scope.row.preNodeCode }}
                        </template>
                    </el-table-column>
                    <el-table-column align="center" label="下级执行节点编号" width="150">
                        <template slot-scope="scope">
                            {{ scope.row.nextNodeCode }}
                        </template>
                    </el-table-column>
                    <el-table-column align="center" label="执行参数" width="150">
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
                    <el-table-column align="center" label="执行次数（超过20次，就挂起）" width="150">
                        <template slot-scope="scope">
                            {{ scope.row.runCount }}
                        </template>
                    </el-table-column>
                    <el-table-column align="center" label="备注" width="150">
                        <template slot-scope="scope">
                            {{ scope.row.reamrk }}
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
        <el-dialog title="DAG执行实例历史任务编辑" :visible.sync="dialogFormVisible" :close-on-click-modal="false" top="50px">
            <el-form ref="dataForm" :model="temp" label-position="right" label-width="110px" style="width: 400px; margin-left:50px;">
                        <el-form-item label="任务编号" prop="type">
                            <el-input v-model="temp.processTaskId" readonly disabled placeholder="任务编号"/>
                        </el-form-item>
                        <el-form-item label="任务名称" prop="type">
                            <el-input v-model="temp.processTaskName"  placeholder="任务名称" />
                        </el-form-item>
                        <el-form-item label="执行实例编码" prop="type">
                            <el-input v-model="temp.processId"  placeholder="执行实例编码" />
                        </el-form-item>
                        <el-form-item label="DAG主表编码" prop="type">
                            <el-input v-model="temp.dagId"  placeholder="DAG主表编码" />
                        </el-form-item>
                        <el-form-item label="执行节点编号" prop="type">
                            <el-input v-model="temp.nodeCode"  placeholder="执行节点编号" />
                        </el-form-item>
                        <el-form-item label="起始执行节点编号" prop="type">
                            <el-input v-model="temp.topNodeCode"  placeholder="起始执行节点编号" />
                        </el-form-item>
                        <el-form-item label="上级执行实例任务编号" prop="type">
                            <el-input v-model="temp.preProcessTaskId"  placeholder="上级执行实例任务编号" />
                        </el-form-item>
                        <el-form-item label="下级执行实例任务编号" prop="type">
                            <el-input v-model="temp.nextProcessTaskId"  placeholder="下级执行实例任务编号" />
                        </el-form-item>
                        <el-form-item label="上级执行节点编号" prop="type">
                            <el-input v-model="temp.preNodeCode"  placeholder="上级执行节点编号" />
                        </el-form-item>
                        <el-form-item label="下级执行节点编号" prop="type">
                            <el-input v-model="temp.nextNodeCode"  placeholder="下级执行节点编号" />
                        </el-form-item>
                        <el-form-item label="执行参数" prop="type">
                            <el-input v-model="temp.runParam"  placeholder="执行参数" />
                        </el-form-item>
                        <el-form-item label="预执行时间" prop="type">
                            <el-date-picker v-model="temp.preRunTime" type="datetime" format="yyyy-MM-dd HH:mm:ss" value-format="yyyy-MM-dd HH:mm:ss" placeholder="选择时间" />
                        </el-form-item>
                        <el-form-item label="执行次数（超过20次，就挂起）" prop="type">
                            <el-input v-model="temp.runCount" oninput="value=value.replace(/[^0-9]/g,'')" />
                        </el-form-item>
                        <el-form-item label="备注" prop="type">
                            <el-input v-model="temp.reamrk"  placeholder="备注" />
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
                        <el-form-item label="完成时间" prop="type">
                            <el-date-picker v-model="temp.finishTime" type="datetime" format="yyyy-MM-dd HH:mm:ss" value-format="yyyy-MM-dd HH:mm:ss" placeholder="选择时间" />
                        </el-form-item>
                        <el-form-item label="异常信息" prop="type">
                            <el-input v-model="temp.exMessage"  placeholder="异常信息" />
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
import { getSyDagProcessTaskHisPageList, deleteSyDagProcessTaskHisById, insertSyDagProcessTaskHis, updateSyDagProcessTaskHis, getSyDagProcessTaskHisDetails } from '@/api/quantization/SyDagProcessTaskHisApi'
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
            processTaskId: undefined,
            processTaskName: undefined,
            processId: undefined,
            dagId: undefined,
            nodeCode: undefined,
            topNodeCode: undefined,
            preProcessTaskId: undefined,
            nextProcessTaskId: undefined,
            preNodeCode: undefined,
            nextNodeCode: undefined,
            runParam: undefined,
            preRunTimeStart: undefined,
            preRunTimeEnd: undefined,
            runCount: undefined,
            reamrk: undefined,
            createTimeStart: undefined,
            createTimeEnd: undefined,
            createId: undefined,
            createName: undefined,
            finishTimeStart: undefined,
            finishTimeEnd: undefined,
            exMessage: undefined,
            pageIndex: 1,
            pageSize: 10
  },
      dialogFormVisible: false,
          temp: {
            processTaskId: undefined,
            processTaskName: undefined,
            processId: undefined,
            dagId: undefined,
            nodeCode: undefined,
            topNodeCode: undefined,
            preProcessTaskId: undefined,
            nextProcessTaskId: undefined,
            preNodeCode: undefined,
            nextNodeCode: undefined,
            runParam: undefined,
            preRunTime: undefined,
            runCount: undefined,
            reamrk: undefined,
            createTime: undefined,
            createId: undefined,
            createName: undefined,
            finishTime: undefined,
            exMessage: undefined
      },
      dialogStatus: 'insert'
  }
  },
  created() { // 初始化界面
      this.getPageList()
  },
  methods: {
      getPageList() { // 查询列表分页
          getSyDagProcessTaskHisPageList(this.listQuery).then(response => {
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
              deleteSyDagProcessTaskHisById(row).then(response => {
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
          this.temp.createTime = new Date(this.temp.createTime)
          this.temp.finishTime = new Date(this.temp.finishTime)
          updateSyDagProcessTaskHis(this.temp).then(response => {
              this.dialogFormVisible = false
              this.getPageList()
          })
      },
      addData() {
          this.temp.preRunTime = new Date(this.temp.preRunTime)
          this.temp.createTime = new Date(this.temp.createTime)
          this.temp.finishTime = new Date(this.temp.finishTime)
          insertSyDagProcessTaskHis(this.temp).then(response => {
              this.dialogFormVisible = false
              this.getPageList()
          })
      },
      editDataDialog(row) {
          this.dialogStatus = 'update'
          getSyDagProcessTaskHisDetails(row).then(response => {
              this.temp = Object.assign({}, response.data === null ? row : response.data) // copy obj
              this.temp.preRunTime = parseTime(new Date(row.preRunTime), '{y}-{m}-{d} {h}:{i}:{s}')
              this.temp.createTime = parseTime(new Date(row.createTime), '{y}-{m}-{d} {h}:{i}:{s}')
              this.temp.finishTime = parseTime(new Date(row.finishTime), '{y}-{m}-{d} {h}:{i}:{s}')

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
