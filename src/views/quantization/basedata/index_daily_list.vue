<template>
    <div class="app-container">
        <div class="filter-container">
            <el-form :inline="true" label-width="110px" label-position="right">
                                <el-row>
                    <el-form-item label="TS指数代码:">
                         <el-input v-model="listQuery.tsCode" placeholder="TS指数代码" style="width: 300px;" class="filter-item" @keyup.enter.native="handleFilter" />
                    </el-form-item>
                    <el-form-item label="交易日期:">
                        <el-date-picker v-model="listQuery.tradeDateStart" type="date" format="yyyyMMdd" value-format="yyyyMMdd" style="width: 150px;" placeholder="选择时间" /> -
                        <el-date-picker v-model="listQuery.tradeDateEnd" type="date" format="yyyyMMdd" value-format="yyyyMMdd" style="width: 150px;" placeholder="选择时间" />
                    </el-form-item>
                    <el-form-item label="	收盘点位:">
                         <el-input v-model="listQuery.close" placeholder="	收盘点位" style="width: 300px;" class="filter-item" @keyup.enter.native="handleFilter" />
                    </el-form-item>
                    <el-form-item label="	开盘点位:">
                         <el-input v-model="listQuery.open" placeholder="	开盘点位" style="width: 300px;" class="filter-item" @keyup.enter.native="handleFilter" />
                    </el-form-item>
                </el-row>
                <el-row>
                    <el-form-item label="最高点位:">
                         <el-input v-model="listQuery.high" placeholder="最高点位" style="width: 300px;" class="filter-item" @keyup.enter.native="handleFilter" />
                    </el-form-item>
                    <el-form-item label="最低点位:">
                         <el-input v-model="listQuery.low" placeholder="最低点位" style="width: 300px;" class="filter-item" @keyup.enter.native="handleFilter" />
                    </el-form-item>
                    <el-form-item label="昨日收盘点:">
                         <el-input v-model="listQuery.preClose" placeholder="昨日收盘点" style="width: 300px;" class="filter-item" @keyup.enter.native="handleFilter" />
                    </el-form-item>
                    <el-form-item label="涨跌点:">
                         <el-input v-model="listQuery.change" placeholder="涨跌点" style="width: 300px;" class="filter-item" @keyup.enter.native="handleFilter" />
                    </el-form-item>
                </el-row>
                <el-row>
                    <el-form-item label="涨跌幅（%）:">
                         <el-input v-model="listQuery.pctChg" placeholder="涨跌幅（%）" style="width: 300px;" class="filter-item" @keyup.enter.native="handleFilter" />
                    </el-form-item>
                    <el-form-item label="成交量（手）:">
                         <el-input v-model="listQuery.vol" placeholder="成交量（手）" style="width: 300px;" class="filter-item" @keyup.enter.native="handleFilter" />
                    </el-form-item>
                    <el-form-item label="成交额（千元）:">
                         <el-input v-model="listQuery.amount" placeholder="成交额（千元）" style="width: 300px;" class="filter-item" @keyup.enter.native="handleFilter" />
                    </el-form-item>
                </el-row>
                <el-row justify="center" type="flex">
                    <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="getPageList">
                        查询
                    </el-button>
                    <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="addDataDialog">
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
            <el-table-column align="center" label="TS指数代码" width="150">
                <template slot-scope="scope">
                    {{ scope.row.tsCode }}
                </template>
            </el-table-column>
            <el-table-column align="center" label="交易日期" width="150">
                <template slot-scope="scope">
                    {{ scope.row.tradeDate }}
                </template>
            </el-table-column>
            <el-table-column align="center" label="	收盘点位" width="150">
                 <template slot-scope="scope">
                     {{ scope.row.close }}
                 </template>
            </el-table-column>
            <el-table-column align="center" label="	开盘点位" width="150">
                 <template slot-scope="scope">
                     {{ scope.row.open }}
                 </template>
            </el-table-column>
            <el-table-column align="center" label="最高点位" width="150">
                 <template slot-scope="scope">
                     {{ scope.row.high }}
                 </template>
            </el-table-column>
            <el-table-column align="center" label="最低点位" width="150">
                 <template slot-scope="scope">
                     {{ scope.row.low }}
                 </template>
            </el-table-column>
            <el-table-column align="center" label="昨日收盘点" width="150">
                 <template slot-scope="scope">
                     {{ scope.row.preClose }}
                 </template>
            </el-table-column>
            <el-table-column align="center" label="涨跌点" width="150">
                 <template slot-scope="scope">
                     {{ scope.row.change }}
                 </template>
            </el-table-column>
            <el-table-column align="center" label="涨跌幅（%）" width="150">
                 <template slot-scope="scope">
                     {{ scope.row.pctChg }}
                 </template>
            </el-table-column>
            <el-table-column align="center" label="成交量（手）" width="150">
                 <template slot-scope="scope">
                     {{ scope.row.vol }}
                 </template>
            </el-table-column>
            <el-table-column align="center" label="成交额（千元）" width="150">
                 <template slot-scope="scope">
                     {{ scope.row.amount }}
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
        <el-dialog title="指数日线行情编辑" :visible.sync="dialogFormVisible" :close-on-click-modal="false" top="50px">
            <el-form ref="dataForm" :model="temp" label-position="right" label-width="110px" style="width: 400px; margin-left:50px;">
                <el-form-item label="TS指数代码" prop="type">
                    <el-input v-model="temp.tsCode" readonly disabled placeholder="TS指数代码"/>
                </el-form-item>
                <el-form-item label="交易日期" prop="type">
                    <el-input v-model="temp.tradeDate" readonly disabled placeholder="交易日期"/>
                </el-form-item>
                <el-form-item label="	收盘点位" prop="type">
                     <el-input v-model="temp.close"  placeholder="	收盘点位" />
                </el-form-item>
                <el-form-item label="	开盘点位" prop="type">
                     <el-input v-model="temp.open"  placeholder="	开盘点位" />
                </el-form-item>
                <el-form-item label="最高点位" prop="type">
                     <el-input v-model="temp.high"  placeholder="最高点位" />
                </el-form-item>
                <el-form-item label="最低点位" prop="type">
                     <el-input v-model="temp.low"  placeholder="最低点位" />
                </el-form-item>
                <el-form-item label="昨日收盘点" prop="type">
                     <el-input v-model="temp.preClose"  placeholder="昨日收盘点" />
                </el-form-item>
                <el-form-item label="涨跌点" prop="type">
                     <el-input v-model="temp.change"  placeholder="涨跌点" />
                </el-form-item>
                <el-form-item label="涨跌幅（%）" prop="type">
                     <el-input v-model="temp.pctChg"  placeholder="涨跌幅（%）" />
                </el-form-item>
                <el-form-item label="成交量（手）" prop="type">
                     <el-input v-model="temp.vol"  placeholder="成交量（手）" />
                </el-form-item>
                <el-form-item label="成交额（千元）" prop="type">
                     <el-input v-model="temp.amount"  placeholder="成交额（千元）" />
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
import { get_index_daily_page_list, deleteById, insert, update, get_details } from '@/api/quantization/index_daily_api'
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
        close: undefined,
        open: undefined,
        high: undefined,
        low: undefined,
        preClose: undefined,
        change: undefined,
        pctChg: undefined,
        vol: undefined,
        amount: undefined,
        pageIndex: 1,
        pageSize: 10
      },
      dialogFormVisible: false,
      temp: {
        tsCode: undefined,
        tradeDate: undefined,
        close: undefined,
        open: undefined,
        high: undefined,
        low: undefined,
        preClose: undefined,
        change: undefined,
        pctChg: undefined,
        vol: undefined,
        amount: undefined
      },
      dialogStatus: 'insert'
    }
  },
  created() { // 初始化界面
    this.getPageList()
  },
  methods: {
    getPageList() { // 查询列表分页
      get_index_daily_page_list(this.listQuery).then(response => {
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
        deleteById(row).then(response => {
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
      update(this.temp).then(response => {
        this.dialogFormVisible = false
        this.getPageList()
      })
    },
    addData() {
      insert(this.temp).then(response => {
        this.dialogFormVisible = false
        this.getPageList()
      })
    },
    editDataDialog(row) {
      this.dialogStatus = 'update'
      get_details(row).then(response => {
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
