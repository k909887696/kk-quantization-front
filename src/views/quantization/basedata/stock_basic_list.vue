<template>
  <div class="app-container">
    <div class="filter-container">
      <el-form :inline="true" label-width="110px" label-position="right">
        <el-row>
          <el-form-item label="ts股票代码:">
            <el-input v-model="listQuery.tsCode" placeholder="ts股票代码" style="width: 300px;" class="filter-item" @keyup.enter.native="handleFilter" />
          </el-form-item>
          <el-form-item label="股票代码:">
            <el-input v-model="listQuery.symbol" placeholder="股票代码" style="width: 300px;" class="filter-item" @keyup.enter.native="handleFilter" />
          </el-form-item>
          <el-form-item label="股票名称:">
            <el-input v-model="listQuery.name" placeholder="股票名称" style="width: 300px;" class="filter-item" @keyup.enter.native="handleFilter" />
          </el-form-item>
          <el-form-item label="地域:">
            <el-input v-model="listQuery.area" placeholder="地域" style="width: 300px;" class="filter-item" @keyup.enter.native="handleFilter" />
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="所属行业:">
            <el-input v-model="listQuery.industry" placeholder="所属行业" style="width: 300px;" class="filter-item" @keyup.enter.native="handleFilter" />
          </el-form-item>
          <el-form-item label="股票全称:">
            <el-input v-model="listQuery.fullname" placeholder="股票全称" style="width: 300px;" class="filter-item" @keyup.enter.native="handleFilter" />
          </el-form-item>
          <el-form-item label="英文全称:">
            <el-input v-model="listQuery.enname" placeholder="英文全称" style="width: 300px;" class="filter-item" @keyup.enter.native="handleFilter" />
          </el-form-item>
          <el-form-item label="市场类型:">
            <el-input v-model="listQuery.market" placeholder="市场类型（主板/创业板/科创板/CDR）" style="width: 300px;" class="filter-item" @keyup.enter.native="handleFilter" />
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="交易所代码:">
            <el-input v-model="listQuery.exchange" placeholder="交易所代码" style="width: 300px;" class="filter-item" @keyup.enter.native="handleFilter" />
          </el-form-item>
          <el-form-item label="交易货币:">
            <el-input v-model="listQuery.currType" placeholder="交易货币" style="width: 300px;" class="filter-item" @keyup.enter.native="handleFilter" />
          </el-form-item>
          <el-form-item label="上市状态:">
            <el-input v-model="listQuery.listStatus" placeholder="上市状态 L上市 D退市 P暂停上市" style="width: 300px;" class="filter-item" @keyup.enter.native="handleFilter" />
          </el-form-item>
          <el-form-item label="上市日期:">
            <el-date-picker v-model="listQuery.listDateStart" type="date" format="yyyyMMdd" value-format="yyyyMMdd" style="width: 150px;" placeholder="选择时间" /> -
            <el-date-picker v-model="listQuery.listDateEnd" type="date" format="yyyyMMdd" value-format="yyyyMMdd" style="width: 150px;" placeholder="选择时间" />
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="退市日期:">
            <el-date-picker v-model="listQuery.delistDateStart" type="date" format="yyyyMMdd" value-format="yyyyMMdd" style="width: 150px;" placeholder="选择时间" /> -
            <el-date-picker v-model="listQuery.delistDateEnd" type="date" format="yyyyMMdd" value-format="yyyyMMdd" style="width: 150px;" placeholder="选择时间" />
          </el-form-item>
          <el-form-item label="是否沪深港通:">
            <el-input v-model="listQuery.isHs" placeholder="是否沪深港通标的，N否 H沪股通 S深股通" style="width: 300px;" class="filter-item" @keyup.enter.native="handleFilter" />
          </el-form-item>
          <el-form-item label="拼音缩写:">
            <el-input v-model="listQuery.cnspell" placeholder="拼音缩写" style="width: 300px;" class="filter-item" @keyup.enter.native="handleFilter" />
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
      <el-table-column align="center" label="ts股票代码" width="150">
        <template slot-scope="scope">
          {{ scope.row.tsCode }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="股票代码" width="150">
        <template slot-scope="scope">
          {{ scope.row.symbol }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="股票名称" width="150">
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="地域" width="150">
        <template slot-scope="scope">
          {{ scope.row.area }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="所属行业" width="150">
        <template slot-scope="scope">
          {{ scope.row.industry }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="股票全称" width="150">
        <template slot-scope="scope">
          {{ scope.row.fullname }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="英文全称" width="150">
        <template slot-scope="scope">
          {{ scope.row.enname }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="市场类型（主板/创业板/科创板/CDR）" width="150">
        <template slot-scope="scope">
          {{ scope.row.market }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="交易所代码" width="150">
        <template slot-scope="scope">
          {{ scope.row.exchange }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="交易货币" width="150">
        <template slot-scope="scope">
          {{ scope.row.currType }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="上市状态 L上市 D退市 P暂停上市" width="150">
        <template slot-scope="scope">
          {{ scope.row.listStatus }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="上市日期" width="150">
        <template slot-scope="scope">
          {{ scope.row.listDate }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="退市日期" width="150">
        <template slot-scope="scope">
          {{ scope.row.delistDate }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="是否沪深港通标的，N否 H沪股通 S深股通" width="150">
        <template slot-scope="scope">
          {{ scope.row.isHs }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="拼音缩写" width="150">
        <template slot-scope="scope">
          {{ scope.row.cnspell }}
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
    <el-dialog title="个股基本信息	编辑" :visible.sync="dialogFormVisible" :close-on-click-modal="false" top="50px">
      <el-form ref="dataForm" :model="temp" label-position="right" label-width="110px" style="width: 400px; margin-left:50px;">
        <el-form-item label="ts股票代码" prop="type">
          <el-input v-model="temp.tsCode" readonly disabled />
        </el-form-item>
        <el-form-item label="股票代码" prop="type">
          <el-input v-model="temp.symbol"   />
        </el-form-item>
        <el-form-item label="股票名称" prop="type">
          <el-input v-model="temp.name"   />
        </el-form-item>
        <el-form-item label="地域" prop="type">
          <el-input v-model="temp.area"   />
        </el-form-item>
        <el-form-item label="所属行业" prop="type">
          <el-input v-model="temp.industry"   />
        </el-form-item>
        <el-form-item label="股票全称" prop="type">
          <el-input v-model="temp.fullname"   />
        </el-form-item>
        <el-form-item label="英文全称" prop="type">
          <el-input v-model="temp.enname"   />
        </el-form-item>
        <el-form-item label="市场类型" prop="type">
          <el-input v-model="temp.market"   />
        </el-form-item>
        <el-form-item label="交易所代码" prop="type">
          <el-input v-model="temp.exchange"   />
        </el-form-item>
        <el-form-item label="交易货币" prop="type">
          <el-input v-model="temp.currType"   />
        </el-form-item>
        <el-form-item label="上市状态" prop="type">
          <el-input v-model="temp.listStatus"   />
        </el-form-item>
        <el-form-item label="上市日期" prop="type">
          <el-date-picker v-model="temp.listDate" type="date" format="yyyyMMdd" value-format="yyyyMMdd" placeholder="选择时间" />
        </el-form-item>
        <el-form-item label="退市日期" prop="type">
          <el-date-picker v-model="temp.delistDate" type="date" format="yyyyMMdd" value-format="yyyyMMdd" placeholder="选择时间" />
        </el-form-item>
        <el-form-item label="是否沪深港通" prop="type">
          <el-input v-model="temp.isHs"   />
        </el-form-item>
        <el-form-item label="拼音缩写" prop="type">
          <el-input v-model="temp.cnspell"   />
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
import { get_stock_basic_page_list, deleteById, insert, update, get_details } from '@/api/quantization/stock_basic_api'
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
        symbol: undefined,
        name: undefined,
        area: undefined,
        industry: undefined,
        fullname: undefined,
        enname: undefined,
        market: undefined,
        exchange: undefined,
        currType: undefined,
        listStatus: undefined,
        listDateStart: undefined,
        listDateEnd: undefined,
        delistDateStart: undefined,
        delistDateEnd: undefined,
        isHs: undefined,
        cnspell: undefined,
        pageIndex: 1,
        pageSize: 10
      },
      dialogFormVisible: false,
      temp: {
        tsCode: undefined,
        symbol: undefined,
        name: undefined,
        area: undefined,
        industry: undefined,
        fullname: undefined,
        enname: undefined,
        market: undefined,
        exchange: undefined,
        currType: undefined,
        listStatus: undefined,
        listDate: undefined,
        delistDate: undefined,
        isHs: undefined,
        cnspell: undefined
      },
      dialogStatus: 'insert'
    }
  },
  created() { // 初始化界面
    this.getPageList()
  },
  methods: {
    getPageList() { // 查询列表分页
      get_stock_basic_page_list(this.listQuery).then(response => {
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
