<template>
  <div class="app-container">
    <div class="filter-container">
      <el-form :inline="true" label-width="110px" label-position="right">
        <el-row>
          <el-form-item label="股票代码:">
            <el-input v-model="listQuery.tsCode" placeholder="股票代码" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />
          </el-form-item>
          <el-form-item label="交易日期:">
            <el-date-picker v-model="listQuery.tradeDateStart" type="date" format="yyyyMMdd" value-format="yyyyMMdd" style="width: 150px;" placeholder="选择时间" /> -
            <el-date-picker v-model="listQuery.tradeDateEnd" type="date" format="yyyyMMdd" value-format="yyyyMMdd" style="width: 150px;" placeholder="选择时间" />
          </el-form-item>
          <el-form-item label="开盘价:">
            <el-input v-model="listQuery.open" placeholder="开盘价" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />
          </el-form-item>
          <el-form-item label="最高价:">
            <el-input v-model="listQuery.high" placeholder="最高价" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="最低价:">
            <el-input v-model="listQuery.low" placeholder="最低价" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />
          </el-form-item>
          <el-form-item label="收盘价:">
            <el-input v-model="listQuery.close" placeholder="收盘价" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />
          </el-form-item>
          <el-form-item label="上一日收盘价:">
            <el-input v-model="listQuery.preClose" placeholder="上一日收盘价" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />
          </el-form-item>
          <el-form-item label="涨跌额:">
            <el-input v-model="listQuery.change" placeholder="涨跌额" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="涨跌幅%:">
            <el-input v-model="listQuery.pctChg" placeholder="涨跌幅%" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />
          </el-form-item>
          <el-form-item label="成交额:">
            <el-input v-model="listQuery.vol" placeholder="成交额" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />
          </el-form-item>
          <el-form-item label="成交量:">
            <el-input v-model="listQuery.amount" placeholder="成交量" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />
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
      <el-table-column align="center" label="股票代码" width="150">
        <template slot-scope="scope">
          {{ scope.row.tsCode }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="交易日期" width="150">
        <template slot-scope="scope">
          {{ scope.row.tradeDate }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="开盘价" width="150">
        <template slot-scope="scope">
          {{ scope.row.open }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="最高价" width="150">
        <template slot-scope="scope">
          {{ scope.row.high }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="最低价" width="150">
        <template slot-scope="scope">
          {{ scope.row.low }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="收盘价" width="150">
        <template slot-scope="scope">
          {{ scope.row.close }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="上一日收盘价" width="150">
        <template slot-scope="scope">
          {{ scope.row.preClose }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="涨跌额" width="150">
        <template slot-scope="scope">
          {{ scope.row.change }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="涨跌幅%" width="150">
        <template slot-scope="scope">
          {{ scope.row.pctChg }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="成交额" width="150">
        <template slot-scope="scope">
          {{ scope.row.vol }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="成交量" width="150">
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
    <el-dialog title="个股日线行情编辑" :visible.sync="dialogFormVisible" :close-on-click-modal="false" top="50px">
      <el-form ref="dataForm" :model="temp" label-position="right" label-width="110px" style="width: 400px; margin-left:50px;">
        <el-form-item label="股票代码" prop="type">
          <el-input v-model="temp.tsCode" readonly disabled />
        </el-form-item>
        <el-form-item label="交易日期" prop="type">
          <el-input v-model="temp.tradeDate" readonly disabled />
        </el-form-item>
        <el-form-item label="开盘价" prop="type">
          <el-input v-model="temp.open"   />
        </el-form-item>
        <el-form-item label="最高价" prop="type">
          <el-input v-model="temp.high"   />
        </el-form-item>
        <el-form-item label="最低价" prop="type">
          <el-input v-model="temp.low"   />
        </el-form-item>
        <el-form-item label="收盘价" prop="type">
          <el-input v-model="temp.close"   />
        </el-form-item>
        <el-form-item label="上一日收盘价" prop="type">
          <el-input v-model="temp.preClose"   />
        </el-form-item>
        <el-form-item label="涨跌额" prop="type">
          <el-input v-model="temp.change"   />
        </el-form-item>
        <el-form-item label="涨跌幅%" prop="type">
          <el-input v-model="temp.pctChg"   />
        </el-form-item>
        <el-form-item label="成交额" prop="type">
          <el-input v-model="temp.vol"   />
        </el-form-item>
        <el-form-item label="成交量" prop="type">
          <el-input v-model="temp.amount"   />
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
import { get_daily_page_list, deleteById, insert, update, get_details } from '@/api/quantization/daily_api'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
import { parseTime, renderHeaderTip,addTime } from '@/utils/index.js'
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
        open: undefined,
        high: undefined,
        low: undefined,
        close: undefined,
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
        open: undefined,
        high: undefined,
        low: undefined,
        close: undefined,
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
    this.listQuery.tradeDateStart = (parseTime(addTime(new Date(), -2, 'month'), '{y}{m}{d}'))
    this.getPageList()
  },
  methods: {
    getPageList() { // 查询列表分页
      get_daily_page_list(this.listQuery).then(response => {
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
