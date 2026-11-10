<template>
    <div class="app-container">
        <div class="filter-container">
            <el-form :inline="true" label-width="110px" label-position="right">
                                        <el-row>
                        <el-form-item label="节点编码:">
                            <el-input v-model="listQuery.nodeCode" placeholder="节点编码" style="width: 300px;" class="filter-item" @keyup.enter.native="handleFilter" />
                        </el-form-item>
                        <el-form-item label="下级节点编码:">
                            <el-input v-model="listQuery.nextNodeCode" placeholder="下级节点编码" style="width: 300px;" class="filter-item" @keyup.enter.native="handleFilter" />
                        </el-form-item>
                        <el-form-item label="上级节点编码:">
                            <el-input v-model="listQuery.preNodeCode" placeholder="上级节点编码" style="width: 300px;" class="filter-item" @keyup.enter.native="handleFilter" />
                        </el-form-item>
                        </el-row>
                        <el-row>
                        <el-form-item label="DAG主表ID:">
                            <el-input v-model="listQuery.dagId" placeholder="DAG主表ID" style="width: 300px;" class="filter-item" @keyup.enter.native="handleFilter" />
                        </el-form-item>
                        <el-form-item label="DAG流程明细ID:">
                            <el-input v-model="listQuery.dagFlowId" placeholder="DAG流程明细ID" style="width: 300px;" class="filter-item" @keyup.enter.native="handleFilter" />
                        </el-form-item>
                        <el-form-item label="执行参数JSON:">
                            <el-input v-model="listQuery.runParams" placeholder="执行参数JSON" style="width: 300px;" class="filter-item" @keyup.enter.native="handleFilter" />
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
                    <el-table-column align="center" label="DAG主表ID" width="150">
                        <template slot-scope="scope">
                            {{ scope.row.dagId }}
                        </template>
                    </el-table-column>
                    <el-table-column align="center" label="DAG主表名称" width="150">
                        <template slot-scope="scope">
                            {{ scope.row.dagName }}
                        </template>
                    </el-table-column>
                    <el-table-column align="center" label="DAG流程明细ID" width="150">
                        <template slot-scope="scope">
                            {{ scope.row.dagFlowId }}
                        </template>
                    </el-table-column>
                    <el-table-column align="center" label="节点编码" width="150">
                        <template slot-scope="scope">
                            {{ scope.row.nodeCode }}
                        </template>
                    </el-table-column>
                    <el-table-column align="center" label="下级节点编码" width="150">
                        <template slot-scope="scope">
                            {{ scope.row.nextNodeCode }}
                        </template>
                    </el-table-column>
                    <el-table-column align="center" label="上级节点编码" width="150">
                        <template slot-scope="scope">
                            {{ scope.row.preNodeCode }}
                        </template>
                    </el-table-column>
                    <el-table-column align="center" label="执行参数JSON" width="150">
                        <template slot-scope="scope">
                            {{ scope.row.runParams }}
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
        <el-dialog title="DAG执行流编辑" :visible.sync="dialogFormVisible" :close-on-click-modal="false" top="50px">
            <el-form ref="dataForm" :model="temp" label-position="right" label-width="110px" style="width: 400px; margin-left:50px;">
                        <el-form-item label="节点编码" prop="type">
                            <el-input v-model="temp.nodeCode"  placeholder="节点编码" />
                        </el-form-item>
                        <el-form-item label="下级节点编码" prop="type">
                            <el-input v-model="temp.nextNodeCode"  placeholder="下级节点编码" />
                        </el-form-item>
                        <el-form-item label="上级节点编码" prop="type">
                            <el-input v-model="temp.preNodeCode"  placeholder="上级节点编码" />
                        </el-form-item>
                        <el-form-item label="DAG主表ID" prop="type">
                            <el-input v-model="temp.dagId"  placeholder="DAG主表ID" />
                        </el-form-item>
                        <el-form-item label="DAG流程明细ID" prop="type">
                            <el-input v-model="temp.dagFlowId" readonly disabled placeholder="DAG流程明细ID"/>
                        </el-form-item>
                        <el-form-item label="执行参数JSON" prop="type">
                            <el-input v-model="temp.runParams"  placeholder="执行参数JSON" />
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
import { getSyDagFlowPageList, deleteSyDagFlowById, insertSyDagFlow, updateSyDagFlow, getSyDagFlowDetails } from '@/api/quantization/SyDagFlowApi'
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
            nodeCode: undefined,
            nextNodeCode: undefined,
            preNodeCode: undefined,
            dagId: undefined,
            dagFlowId: undefined,
            runParams: undefined,
            pageIndex: 1,
            pageSize: 10
  },
      dialogFormVisible: false,
          temp: {
            nodeCode: undefined,
            nextNodeCode: undefined,
            preNodeCode: undefined,
            dagId: undefined,
            dagFlowId: undefined,
            runParams: undefined
      },
      dialogStatus: 'insert'
  }
  },
  created() { // 初始化界面
      this.getPageList()
  },
  methods: {
      getPageList() { // 查询列表分页
          getSyDagFlowPageList(this.listQuery).then(response => {
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
              deleteSyDagFlowById(row).then(response => {
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
          updateSyDagFlow(this.temp).then(response => {
              this.dialogFormVisible = false
              this.getPageList()
          })
      },
      addData() {
          insertSyDagFlow(this.temp).then(response => {
              this.dialogFormVisible = false
              this.getPageList()
          })
      },
      editDataDialog(row) {
          this.dialogStatus = 'update'
          getSyDagFlowDetails(row).then(response => {
              this.temp = Object.assign({}, response.data === null ? row : response.data) // copy obj

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
