<template>
    <div class="app-container">
        <div class="filter-container">
            <el-form :inline="true" label-width="110px" label-position="right">
                                        <el-row>
                        <el-form-item label="股票编号:">
                            <el-input v-model="listQuery.tsCode" placeholder="股票编号" style="width: 300px;" class="filter-item" @keyup.enter.native="handleFilter" />
                        </el-form-item>
                        <el-form-item label="交易日期:">
                            <el-date-picker v-model="listQuery.tradeDateStart" type="date" format="yyyyMMdd" value-format="yyyyMMdd" style="width: 150px;" placeholder="选择时间" /> -
                            <el-date-picker v-model="listQuery.tradeDateEnd" type="date" format="yyyyMMdd" value-format="yyyyMMdd" style="width: 150px;" placeholder="选择时间" />
                        </el-form-item>
                        <el-form-item label="k值:">
                            <el-input v-model="listQuery.kValue" placeholder="k值" style="width: 300px;" class="filter-item" @keyup.enter.native="handleFilter" />
                        </el-form-item>
                        </el-row>
                        <el-row>
                        <el-form-item label="d值:">
                            <el-input v-model="listQuery.dValue" placeholder="d值" style="width: 300px;" class="filter-item" @keyup.enter.native="handleFilter" />
                        </el-form-item>
                        <el-form-item label="j值:">
                            <el-input v-model="listQuery.jValue" placeholder="j值" style="width: 300px;" class="filter-item" @keyup.enter.native="handleFilter" />
                        </el-form-item>
                        <el-form-item label="rsv值:">
                            <el-input v-model="listQuery.rsv" placeholder="rsv值" style="width: 300px;" class="filter-item" @keyup.enter.native="handleFilter" />
                        </el-form-item>
                        </el-row>
                        <el-row>
                        <el-form-item label="kdj类型（默认 9_3_3）:">
                            <el-input v-model="listQuery.kdjType" placeholder="kdj类型（默认 9_3_3）" style="width: 300px;" class="filter-item" @keyup.enter.native="handleFilter" />
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
                    <el-table-column align="center" label="股票编号" width="150">
                        <template slot-scope="scope">
                            {{ scope.row.tsCode }}
                        </template>
                    </el-table-column>
                    <el-table-column align="center" label="交易日期" width="150">
                        <template slot-scope="scope">
                            {{ scope.row.tradeDate }}
                        </template>
                    </el-table-column>
                    <el-table-column align="center" label="k值" width="150">
                        <template slot-scope="scope">
                            {{ scope.row.kValue }}
                        </template>
                    </el-table-column>
                    <el-table-column align="center" label="d值" width="150">
                        <template slot-scope="scope">
                            {{ scope.row.dValue }}
                        </template>
                    </el-table-column>
                    <el-table-column align="center" label="j值" width="150">
                        <template slot-scope="scope">
                            {{ scope.row.jValue }}
                        </template>
                    </el-table-column>
                    <el-table-column align="center" label="rsv值" width="150">
                        <template slot-scope="scope">
                            {{ scope.row.rsv }}
                        </template>
                    </el-table-column>
                    <el-table-column align="center" label="kdj类型（默认 9_3_3）" width="150">
                        <template slot-scope="scope">
                            {{ scope.row.kdjType }}
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
        <el-dialog title="个股kdj数据编辑" :visible.sync="dialogFormVisible" :close-on-click-modal="false" top="50px">
            <el-form ref="dataForm" :model="temp" label-position="right" label-width="110px" style="width: 400px; margin-left:50px;">
                        <el-form-item label="股票编号" prop="type">
                            <el-input v-model="temp.tsCode" readonly disabled placeholder="股票编号"/>
                        </el-form-item>
                        <el-form-item label="交易日期" prop="type">
                            <el-input v-model="temp.tradeDate" readonly disabled placeholder="交易日期"/>
                        </el-form-item>
                        <el-form-item label="k值" prop="type">
                            <el-input v-model="temp.kValue"  placeholder="k值" />
                        </el-form-item>
                        <el-form-item label="d值" prop="type">
                            <el-input v-model="temp.dValue"  placeholder="d值" />
                        </el-form-item>
                        <el-form-item label="j值" prop="type">
                            <el-input v-model="temp.jValue"  placeholder="j值" />
                        </el-form-item>
                        <el-form-item label="rsv值" prop="type">
                            <el-input v-model="temp.rsv"  placeholder="rsv值" />
                        </el-form-item>
                        <el-form-item label="kdj类型（默认 9_3_3）" prop="type">
                            <el-input v-model="temp.kdjType"  placeholder="kdj类型（默认 9_3_3）" />
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
import { getStockDayKdjPageList, deleteStockDayKdjById, insertStockDayKdj, updateStockDayKdj, getStockDayKdjDetails } from '@/api/quantization/StockDayKdjApi'
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
      tsCode: undefined,
              tradeDateStart: undefined,
              tradeDateEnd: undefined,
      kValue: undefined,
      dValue: undefined,
      jValue: undefined,
      rsv: undefined,
      kdjType: undefined,
          pageIndex: 1,
          pageSize: 10
  },
      dialogFormVisible: false,
          temp: {
          tsCode: undefined,
          tradeDate: undefined,
          kValue: undefined,
          dValue: undefined,
          jValue: undefined,
          rsv: undefined,
          kdjType: undefined
      },
      dialogStatus: 'insert'
  }
  },
  created() { // 初始化界面
      this.getPageList()
  },
  methods: {
      getPageList() { // 查询列表分页
          getStockDayKdjPageList(this.listQuery).then(response => {
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
              deleteStockDayKdjById(row).then(response => {
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
          updateStockDayKdj(this.temp).then(response => {
              this.dialogFormVisible = false
              this.getPageList()
          })
      },
      addData() {
          insertStockDayKdj(this.temp).then(response => {
              this.dialogFormVisible = false
              this.getPageList()
          })
      },
      editDataDialog(row) {
          this.dialogStatus = 'update'
          getStockDayKdjDetails(row).then(response => {
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
