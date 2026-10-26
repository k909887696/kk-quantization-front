<template>
    <div class="app-container">
        <div class="filter-container">
            <el-form :inline="true" label-width="110px" label-position="right">
                                        <el-row>
                        <el-form-item label="节点编码:">
                            <el-input v-model="listQuery.nodeCode" placeholder="节点编码" style="width: 300px;" class="filter-item" @keyup.enter.native="handleFilter" />
                        </el-form-item>
                        <el-form-item label="节点名称:">
                            <el-input v-model="listQuery.nodeName" placeholder="节点名称" style="width: 300px;" class="filter-item" @keyup.enter.native="handleFilter" />
                        </el-form-item>
                        <el-form-item label="执行类ID:">
                            <el-input v-model="listQuery.beanId" placeholder="执行类ID" style="width: 300px;" class="filter-item" @keyup.enter.native="handleFilter" />
                        </el-form-item>
                        </el-row>
                        <el-row>
                        <el-form-item label="执行方法名称:">
                            <el-input v-model="listQuery.methodName" placeholder="执行方法名称" style="width: 300px;" class="filter-item" @keyup.enter.native="handleFilter" />
                        </el-form-item>
                        <el-form-item label="执行参数:">
                            <el-input v-model="listQuery.runParam" placeholder="执行参数" style="width: 300px;" class="filter-item" @keyup.enter.native="handleFilter" />
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
                    <el-table-column align="center" label="节点编码" width="200">
                        <template slot-scope="scope">
                            {{ scope.row.nodeCode }}
                        </template>
                    </el-table-column>
                    <el-table-column align="center" label="节点名称" width="300">
                        <template slot-scope="scope">
                            {{ scope.row.nodeName }}
                        </template>
                    </el-table-column>
                    <el-table-column align="center" label="执行类ID" width="200">
                        <template slot-scope="scope">
                            {{ scope.row.beanId }}
                        </template>
                    </el-table-column>
                    <el-table-column align="center" label="执行方法名称" width="150">
                        <template slot-scope="scope">
                            {{ scope.row.methodName }}
                        </template>
                    </el-table-column>
                    <el-table-column align="center" label="执行参数" width="300">
                        <template slot-scope="scope">
                            {{ scope.row.runParam }}
                        </template>
                    </el-table-column>
                    <el-table-column align="center" label="创建时间" width="110">
                        <template slot-scope="scope">
                            <i class="el-icon-time" />
                            <span>{{ parseTime(new Date(scope.row.createTime) ,'{y}-{m}-{d} {h}:{i}:{s}') }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column align="center" label="创建人编号" width="100">
                        <template slot-scope="scope">
                            {{ scope.row.createId }}
                        </template>
                    </el-table-column>
                    <el-table-column align="center" label="创建人名称" width="100">
                        <template slot-scope="scope">
                            {{ scope.row.createName }}
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
        <el-dialog title="DAG执行节点编辑" :visible.sync="dialogFormVisible" :close-on-click-modal="false" top="50px">
            <el-form ref="dataForm" :model="temp" label-position="right" label-width="110px" style="width: 400px; margin-left:50px;">
                        <el-form-item label="节点编码" prop="type">
                            <el-input v-model="temp.nodeCode"   placeholder="节点编码"/>
                        </el-form-item>
                        <el-form-item label="节点名称" prop="type">
                            <el-input v-model="temp.nodeName"  placeholder="节点名称" />
                        </el-form-item>
                        <el-form-item label="执行类ID" prop="type">
                            <el-input v-model="temp.beanId"  placeholder="执行类ID" />
                        </el-form-item>
                        <el-form-item label="执行方法名称" prop="type">
                            <el-input v-model="temp.methodName"  placeholder="执行方法名称" />
                        </el-form-item>
                        <el-form-item label="执行参数" prop="type">
                            <el-input v-model="temp.runParam"  placeholder="执行参数" />
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
import { getSyDagNodePageList, deleteSyDagNodeById, insertSyDagNode, updateSyDagNode, getSyDagNodeDetails } from '@/api/quantization/SyDagNodeApi'
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
            nodeName: undefined,
            beanId: undefined,
            methodName: undefined,
            runParam: undefined,
            createTimeStart: undefined,
            createTimeEnd: undefined,
            createId: undefined,
            createName: undefined,
            pageIndex: 1,
            pageSize: 10
  },
      dialogFormVisible: false,
          temp: {
            nodeCode: undefined,
            nodeName: undefined,
            beanId: undefined,
            methodName: undefined,
            runParam: undefined,
            createTime: undefined,
            createId: undefined,
            createName: undefined
      },
      dialogStatus: 'insert'
  }
  },
  created() { // 初始化界面
      this.getPageList()
  },
  methods: {
      getPageList() { // 查询列表分页
          getSyDagNodePageList(this.listQuery).then(response => {
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
              deleteSyDagNodeById(row).then(response => {
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
          this.temp.createTime = new Date(this.temp.createTime)
          updateSyDagNode(this.temp).then(response => {
              this.dialogFormVisible = false
              this.getPageList()
          })
      },
      addData() {
          this.temp.createTime = new Date(this.temp.createTime)
          insertSyDagNode(this.temp).then(response => {
              this.dialogFormVisible = false
              this.getPageList()
          })
      },
      editDataDialog(row) {
          this.dialogStatus = 'update'
          getSyDagNodeDetails(row).then(response => {
              this.temp = Object.assign({}, response.data === null ? row : response.data) // copy obj
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
