<template>
    <div class="app-container">
        <div class="filter-container">
            <el-form :inline="true" label-width="110px" label-position="right">
                                        <el-row>
                        <el-form-item label="月份:">
                            <el-input v-model="listQuery.month" placeholder="月份" style="width: 300px;" class="filter-item" @keyup.enter.native="handleFilter" />
                        </el-form-item>
                        <el-form-item label="货币M0总量:">
                            <el-input v-model="listQuery.m0" placeholder="货币M0总量" style="width: 300px;" class="filter-item" @keyup.enter.native="handleFilter" />
                        </el-form-item>
                        <el-form-item label="货币M0同比:">
                            <el-input v-model="listQuery.m0Yoy" placeholder="货币M0同比" style="width: 300px;" class="filter-item" @keyup.enter.native="handleFilter" />
                        </el-form-item>
                        </el-row>
                        <el-row>
                        <el-form-item label="货币M0环比:">
                            <el-input v-model="listQuery.m0Mom" placeholder="货币M0环比" style="width: 300px;" class="filter-item" @keyup.enter.native="handleFilter" />
                        </el-form-item>
                        <el-form-item label="货币M1总量:">
                            <el-input v-model="listQuery.m1" placeholder="货币M1总量" style="width: 300px;" class="filter-item" @keyup.enter.native="handleFilter" />
                        </el-form-item>
                        <el-form-item label="货币M1同比:">
                            <el-input v-model="listQuery.m1Yoy" placeholder="货币M1同比" style="width: 300px;" class="filter-item" @keyup.enter.native="handleFilter" />
                        </el-form-item>
                        </el-row>
                        <el-row>
                        <el-form-item label="货币M1环比:">
                            <el-input v-model="listQuery.m1Mom" placeholder="货币M1环比" style="width: 300px;" class="filter-item" @keyup.enter.native="handleFilter" />
                        </el-form-item>
                        <el-form-item label="货币M2总量:">
                            <el-input v-model="listQuery.m2" placeholder="货币M2总量" style="width: 300px;" class="filter-item" @keyup.enter.native="handleFilter" />
                        </el-form-item>
                        <el-form-item label="货币M2同比:">
                            <el-input v-model="listQuery.m2Yoy" placeholder="货币M2同比" style="width: 300px;" class="filter-item" @keyup.enter.native="handleFilter" />
                        </el-form-item>
                        </el-row>
                        <el-row>
                        <el-form-item label="货币M2环比:">
                            <el-input v-model="listQuery.m2Mom" placeholder="货币M2环比" style="width: 300px;" class="filter-item" @keyup.enter.native="handleFilter" />
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
                    <el-table-column align="center" label="月份" width="150">
                        <template slot-scope="scope">
                            {{ scope.row.month }}
                        </template>
                    </el-table-column>
                    <el-table-column align="center" label="货币M0总量" width="150">
                        <template slot-scope="scope">
                            {{ scope.row.m0 }}
                        </template>
                    </el-table-column>
                    <el-table-column align="center" label="货币M0同比" width="150">
                        <template slot-scope="scope">
                            {{ scope.row.m0Yoy }}
                        </template>
                    </el-table-column>
                    <el-table-column align="center" label="货币M0环比" width="150">
                        <template slot-scope="scope">
                            {{ scope.row.m0Mom }}
                        </template>
                    </el-table-column>
                    <el-table-column align="center" label="货币M1总量" width="150">
                        <template slot-scope="scope">
                            {{ scope.row.m1 }}
                        </template>
                    </el-table-column>
                    <el-table-column align="center" label="货币M1同比" width="150">
                        <template slot-scope="scope">
                            {{ scope.row.m1Yoy }}
                        </template>
                    </el-table-column>
                    <el-table-column align="center" label="货币M1环比" width="150">
                        <template slot-scope="scope">
                            {{ scope.row.m1Mom }}
                        </template>
                    </el-table-column>
                    <el-table-column align="center" label="货币M2总量" width="150">
                        <template slot-scope="scope">
                            {{ scope.row.m2 }}
                        </template>
                    </el-table-column>
                    <el-table-column align="center" label="货币M2同比" width="150">
                        <template slot-scope="scope">
                            {{ scope.row.m2Yoy }}
                        </template>
                    </el-table-column>
                    <el-table-column align="center" label="货币M2环比" width="150">
                        <template slot-scope="scope">
                            {{ scope.row.m2Mom }}
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
        <el-dialog title="人民币货币总量对象编辑" :visible.sync="dialogFormVisible" :close-on-click-modal="false" top="50px">
            <el-form ref="dataForm" :model="temp" label-position="right" label-width="110px" style="width: 400px; margin-left:50px;">
                        <el-form-item label="月份" prop="type">
                            <el-input v-model="temp.month" readonly disabled placeholder="月份"/>
                        </el-form-item>
                        <el-form-item label="货币M0总量" prop="type">
                            <el-input v-model="temp.m0"  placeholder="货币M0总量" />
                        </el-form-item>
                        <el-form-item label="货币M0同比" prop="type">
                            <el-input v-model="temp.m0Yoy"  placeholder="货币M0同比" />
                        </el-form-item>
                        <el-form-item label="货币M0环比" prop="type">
                            <el-input v-model="temp.m0Mom"  placeholder="货币M0环比" />
                        </el-form-item>
                        <el-form-item label="货币M1总量" prop="type">
                            <el-input v-model="temp.m1"  placeholder="货币M1总量" />
                        </el-form-item>
                        <el-form-item label="货币M1同比" prop="type">
                            <el-input v-model="temp.m1Yoy"  placeholder="货币M1同比" />
                        </el-form-item>
                        <el-form-item label="货币M1环比" prop="type">
                            <el-input v-model="temp.m1Mom"  placeholder="货币M1环比" />
                        </el-form-item>
                        <el-form-item label="货币M2总量" prop="type">
                            <el-input v-model="temp.m2"  placeholder="货币M2总量" />
                        </el-form-item>
                        <el-form-item label="货币M2同比" prop="type">
                            <el-input v-model="temp.m2Yoy"  placeholder="货币M2同比" />
                        </el-form-item>
                        <el-form-item label="货币M2环比" prop="type">
                            <el-input v-model="temp.m2Mom"  placeholder="货币M2环比" />
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
import { getCnMPageList, deleteCnMById, insertCnM, updateCnM, getCnMDetails } from '@/api/quantization/CnMApi'
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
      month: undefined,
      m0: undefined,
      m0Yoy: undefined,
      m0Mom: undefined,
      m1: undefined,
      m1Yoy: undefined,
      m1Mom: undefined,
      m2: undefined,
      m2Yoy: undefined,
      m2Mom: undefined,
          pageIndex: 1,
          pageSize: 10
  },
      dialogFormVisible: false,
          temp: {
          month: undefined,
          m0: undefined,
          m0Yoy: undefined,
          m0Mom: undefined,
          m1: undefined,
          m1Yoy: undefined,
          m1Mom: undefined,
          m2: undefined,
          m2Yoy: undefined,
          m2Mom: undefined
      },
      dialogStatus: 'insert'
  }
  },
  created() { // 初始化界面
      this.getPageList()
  },
  methods: {
      getPageList() { // 查询列表分页
          getCnMPageList(this.listQuery).then(response => {
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
              deleteCnMById(row).then(response => {
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
          updateCnM(this.temp).then(response => {
              this.dialogFormVisible = false
              this.getPageList()
          })
      },
      addData() {
          insertCnM(this.temp).then(response => {
              this.dialogFormVisible = false
              this.getPageList()
          })
      },
      editDataDialog(row) {
          this.dialogStatus = 'update'
          getCnMDetails(row).then(response => {
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
