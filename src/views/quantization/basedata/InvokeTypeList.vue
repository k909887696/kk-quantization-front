<template>
    <div class="app-container">
        <div class="filter-container">
            <el-form :inline="true" label-width="110px" label-position="right">
                                        <el-row>
                        <el-form-item label="調用類型編號(beanId):">
                            <el-input v-model="listQuery.invokeCode" placeholder="調用類型編號(beanId)" style="width: 300px;" class="filter-item" @keyup.enter.native="handleFilter" />
                        </el-form-item>
                        <el-form-item label="调用类型名称:">
                            <el-input v-model="listQuery.name" placeholder="调用类型名称" style="width: 300px;" class="filter-item" @keyup.enter.native="handleFilter" />
                        </el-form-item>
                        <el-form-item label="调用类型对象:">
                            <el-input v-model="listQuery.invokeObject" placeholder="调用类型对象" style="width: 300px;" class="filter-item" @keyup.enter.native="handleFilter" />
                        </el-form-item>
                        </el-row>
                        <el-row>
                        <el-form-item label="调用类型方法:">
                            <el-input v-model="listQuery.invokeMethod" placeholder="调用类型方法" style="width: 300px;" class="filter-item" @keyup.enter.native="handleFilter" />
                        </el-form-item>
                        <el-form-item label="创建时间:">
                            <el-date-picker v-model="listQuery.createTimeStart" type="date" format="yyyy-MM-dd" value-format="yyyy-MM-dd" style="width: 150px;" placeholder="选择时间" /> -
                            <el-date-picker v-model="listQuery.createTimeEnd" type="date" format="yyyy-MM-dd" value-format="yyyy-MM-dd" style="width: 150px;" placeholder="选择时间" />
                        </el-form-item>
                        <el-form-item label="调用类型参数:">
                            <el-input v-model="listQuery.invokeParams" placeholder="调用类型参数" style="width: 300px;" class="filter-item" @keyup.enter.native="handleFilter" />
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
                    <el-table-column align="center" label="調用類型編號(beanId)" width="150">
                        <template slot-scope="scope">
                            {{ scope.row.invokeCode }}
                        </template>
                    </el-table-column>
                    <el-table-column align="center" label="调用类型名称" width="150">
                        <template slot-scope="scope">
                            {{ scope.row.name }}
                        </template>
                    </el-table-column>
                    <el-table-column align="center" label="调用类型对象" width="150">
                        <template slot-scope="scope">
                            {{ scope.row.invokeObject }}
                        </template>
                    </el-table-column>
                    <el-table-column align="center" label="调用类型方法" width="150">
                        <template slot-scope="scope">
                            {{ scope.row.invokeMethod }}
                        </template>
                    </el-table-column>
                    <el-table-column align="center" label="创建时间" width="110">
                        <template slot-scope="scope">
                            <i class="el-icon-time" />
                            <span>{{ parseTime(new Date(scope.row.createTime) ,'{y}-{m}-{d} {h}:{i}:{s}') }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column align="center" label="调用类型参数" width="150">
                        <template slot-scope="scope">
                            {{ scope.row.invokeParams }}
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
        <el-dialog title="系统设置-调度类型编辑" :visible.sync="dialogFormVisible" :close-on-click-modal="false" top="50px">
            <el-form ref="dataForm" :model="temp" label-position="right" label-width="110px" style="width: 400px; margin-left:50px;">
                        <el-form-item label="調用類型編號(beanId)" prop="type">
                            <el-input v-model="temp.invokeCode" readonly disabled placeholder="調用類型編號(beanId)"/>
                        </el-form-item>
                        <el-form-item label="调用类型名称" prop="type">
                            <el-input v-model="temp.name"  placeholder="调用类型名称" />
                        </el-form-item>
                        <el-form-item label="调用类型对象" prop="type">
                            <el-input v-model="temp.invokeObject"  placeholder="调用类型对象" />
                        </el-form-item>
                        <el-form-item label="调用类型方法" prop="type">
                            <el-input v-model="temp.invokeMethod"  placeholder="调用类型方法" />
                        </el-form-item>
                        <el-form-item label="创建时间" prop="type">
                            <el-date-picker v-model="temp.createTime" type="datetime" format="yyyy-MM-dd HH:mm:ss" value-format="yyyy-MM-dd HH:mm:ss" placeholder="选择时间" />
                        </el-form-item>
                        <el-form-item label="调用类型参数" prop="type">
                            <el-input v-model="temp.invokeParams"  placeholder="调用类型参数" />
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
import { getInvokeTypePageList, deleteInvokeTypeById, insertInvokeType, updateInvokeType, getInvokeTypeDetails } from '@/api/quantization/InvokeTypeApi'
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
      invokeCode: undefined,
      name: undefined,
      invokeObject: undefined,
      invokeMethod: undefined,
              createTimeStart: undefined,
              createTimeEnd: undefined,
      invokeParams: undefined,
          pageIndex: 1,
          pageSize: 10
  },
      dialogFormVisible: false,
          temp: {
          invokeCode: undefined,
          name: undefined,
          invokeObject: undefined,
          invokeMethod: undefined,
          createTime: undefined,
          invokeParams: undefined
      },
      dialogStatus: 'insert'
  }
  },
  created() { // 初始化界面
      this.getPageList()
  },
  methods: {
      getPageList() { // 查询列表分页
          getInvokeTypePageList(this.listQuery).then(response => {
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
              deleteInvokeTypeById(row).then(response => {
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
          updateInvokeType(this.temp).then(response => {
              this.dialogFormVisible = false
              this.getPageList()
          })
      },
      addData() {
          this.temp.createTime = new Date(this.temp.createTime)
          insertInvokeType(this.temp).then(response => {
              this.dialogFormVisible = false
              this.getPageList()
          })
      },
      editDataDialog(row) {
          this.dialogStatus = 'update'
          getInvokeTypeDetails(row).then(response => {
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
