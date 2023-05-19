<template>
    <div class="app-container">
        <div class="filter-container">
            <el-form :inline="true" label-width="110px" label-position="right">
                                <el-row>
                    <el-form-item label="概念代码:">
                         <el-input v-model="listQuery.code" placeholder="概念代码" style="width: 300px;" class="filter-item" @keyup.enter.native="handleFilter" />
                    </el-form-item>
                    <el-form-item label="交易日期:">
                        <el-date-picker v-model="listQuery.tradeDateStart" type="date" format="yyyyMMdd" value-format="yyyyMMdd" style="width: 150px;" placeholder="选择时间" /> -
                        <el-date-picker v-model="listQuery.tradeDateEnd" type="date" format="yyyyMMdd" value-format="yyyyMMdd" style="width: 150px;" placeholder="选择时间" />
                    </el-form-item>
                    <el-form-item label="小单买入量（手）:">
                         <el-input v-model="listQuery.buySmVol" placeholder="小单买入量（手）" style="width: 300px;" class="filter-item" @keyup.enter.native="handleFilter" />
                    </el-form-item>
                    <el-form-item label="小单买入金额（万元）:">
                         <el-input v-model="listQuery.buySmAmount" placeholder="小单买入金额（万元）" style="width: 300px;" class="filter-item" @keyup.enter.native="handleFilter" />
                    </el-form-item>
                </el-row>
                <el-row>
                    <el-form-item label="小单卖出量（手）:">
                         <el-input v-model="listQuery.sellSmVol" placeholder="小单卖出量（手）" style="width: 300px;" class="filter-item" @keyup.enter.native="handleFilter" />
                    </el-form-item>
                    <el-form-item label="小单卖出金额（万元）:">
                         <el-input v-model="listQuery.sellSmAmount" placeholder="小单卖出金额（万元）" style="width: 300px;" class="filter-item" @keyup.enter.native="handleFilter" />
                    </el-form-item>
                    <el-form-item label="中单买入量（手）:">
                         <el-input v-model="listQuery.buyMdVol" placeholder="中单买入量（手）" style="width: 300px;" class="filter-item" @keyup.enter.native="handleFilter" />
                    </el-form-item>
                    <el-form-item label="中单买入金额（万元）:">
                         <el-input v-model="listQuery.buyMdAmount" placeholder="中单买入金额（万元）" style="width: 300px;" class="filter-item" @keyup.enter.native="handleFilter" />
                    </el-form-item>
                </el-row>
                <el-row>
                    <el-form-item label="中单卖出量（手）:">
                         <el-input v-model="listQuery.sellMdVol" placeholder="中单卖出量（手）" style="width: 300px;" class="filter-item" @keyup.enter.native="handleFilter" />
                    </el-form-item>
                    <el-form-item label="中单卖出金额（万元）:">
                         <el-input v-model="listQuery.sellMdAmount" placeholder="中单卖出金额（万元）" style="width: 300px;" class="filter-item" @keyup.enter.native="handleFilter" />
                    </el-form-item>
                    <el-form-item label="大单买入量（手）:">
                         <el-input v-model="listQuery.buyLgVol" placeholder="大单买入量（手）" style="width: 300px;" class="filter-item" @keyup.enter.native="handleFilter" />
                    </el-form-item>
                    <el-form-item label="大单买入金额（万元）:">
                         <el-input v-model="listQuery.buyLgAmount" placeholder="大单买入金额（万元）" style="width: 300px;" class="filter-item" @keyup.enter.native="handleFilter" />
                    </el-form-item>
                </el-row>
                <el-row>
                    <el-form-item label="大单卖出量（手）:">
                         <el-input v-model="listQuery.sellLgVol" placeholder="大单卖出量（手）" style="width: 300px;" class="filter-item" @keyup.enter.native="handleFilter" />
                    </el-form-item>
                    <el-form-item label="大单卖出金额（万元）:">
                         <el-input v-model="listQuery.sellLgAmount" placeholder="大单卖出金额（万元）" style="width: 300px;" class="filter-item" @keyup.enter.native="handleFilter" />
                    </el-form-item>
                    <el-form-item label="特大单买入量（手）:">
                         <el-input v-model="listQuery.buyElgVol" placeholder="特大单买入量（手）" style="width: 300px;" class="filter-item" @keyup.enter.native="handleFilter" />
                    </el-form-item>
                    <el-form-item label="特大单买入金额（万元）:">
                         <el-input v-model="listQuery.buyElgAmount" placeholder="特大单买入金额（万元）" style="width: 300px;" class="filter-item" @keyup.enter.native="handleFilter" />
                    </el-form-item>
                </el-row>
                <el-row>
                    <el-form-item label="特大单卖出量（手）:">
                         <el-input v-model="listQuery.sellElgVol" placeholder="特大单卖出量（手）" style="width: 300px;" class="filter-item" @keyup.enter.native="handleFilter" />
                    </el-form-item>
                    <el-form-item label="特大单卖出金额（万元）:">
                         <el-input v-model="listQuery.sellElgAmount" placeholder="特大单卖出金额（万元）" style="width: 300px;" class="filter-item" @keyup.enter.native="handleFilter" />
                    </el-form-item>
                    <el-form-item label="净流入量（手）:">
                         <el-input v-model="listQuery.netMfVol" placeholder="净流入量（手）" style="width: 300px;" class="filter-item" @keyup.enter.native="handleFilter" />
                    </el-form-item>
                    <el-form-item label="净流入额（万元）:">
                         <el-input v-model="listQuery.netMfAmount" placeholder="净流入额（万元）" style="width: 300px;" class="filter-item" @keyup.enter.native="handleFilter" />
                    </el-form-item>
                </el-row>
                <el-row>
                    <el-form-item label="概念名称:">
                         <el-input v-model="listQuery.name" placeholder="概念名称" style="width: 300px;" class="filter-item" @keyup.enter.native="handleFilter" />
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
            <el-table-column align="center" label="概念代码" width="150">
                <template slot-scope="scope">
                    {{ scope.row.code }}
                </template>
            </el-table-column>
            <el-table-column align="center" label="交易日期" width="150">
                <template slot-scope="scope">
                    {{ scope.row.tradeDate }}
                </template>
            </el-table-column>
            <el-table-column align="center" label="小单买入量（手）" width="150">
                 <template slot-scope="scope">
                     {{ scope.row.buySmVol }}
                 </template>
            </el-table-column>
            <el-table-column align="center" label="小单买入金额（万元）" width="150">
                 <template slot-scope="scope">
                     {{ scope.row.buySmAmount }}
                 </template>
            </el-table-column>
            <el-table-column align="center" label="小单卖出量（手）" width="150">
                 <template slot-scope="scope">
                     {{ scope.row.sellSmVol }}
                 </template>
            </el-table-column>
            <el-table-column align="center" label="小单卖出金额（万元）" width="150">
                 <template slot-scope="scope">
                     {{ scope.row.sellSmAmount }}
                 </template>
            </el-table-column>
            <el-table-column align="center" label="中单买入量（手）" width="150">
                 <template slot-scope="scope">
                     {{ scope.row.buyMdVol }}
                 </template>
            </el-table-column>
            <el-table-column align="center" label="中单买入金额（万元）" width="150">
                 <template slot-scope="scope">
                     {{ scope.row.buyMdAmount }}
                 </template>
            </el-table-column>
            <el-table-column align="center" label="中单卖出量（手）" width="150">
                 <template slot-scope="scope">
                     {{ scope.row.sellMdVol }}
                 </template>
            </el-table-column>
            <el-table-column align="center" label="中单卖出金额（万元）" width="150">
                 <template slot-scope="scope">
                     {{ scope.row.sellMdAmount }}
                 </template>
            </el-table-column>
            <el-table-column align="center" label="大单买入量（手）" width="150">
                 <template slot-scope="scope">
                     {{ scope.row.buyLgVol }}
                 </template>
            </el-table-column>
            <el-table-column align="center" label="大单买入金额（万元）" width="150">
                 <template slot-scope="scope">
                     {{ scope.row.buyLgAmount }}
                 </template>
            </el-table-column>
            <el-table-column align="center" label="大单卖出量（手）" width="150">
                 <template slot-scope="scope">
                     {{ scope.row.sellLgVol }}
                 </template>
            </el-table-column>
            <el-table-column align="center" label="大单卖出金额（万元）" width="150">
                 <template slot-scope="scope">
                     {{ scope.row.sellLgAmount }}
                 </template>
            </el-table-column>
            <el-table-column align="center" label="特大单买入量（手）" width="150">
                 <template slot-scope="scope">
                     {{ scope.row.buyElgVol }}
                 </template>
            </el-table-column>
            <el-table-column align="center" label="特大单买入金额（万元）" width="150">
                 <template slot-scope="scope">
                     {{ scope.row.buyElgAmount }}
                 </template>
            </el-table-column>
            <el-table-column align="center" label="特大单卖出量（手）" width="150">
                 <template slot-scope="scope">
                     {{ scope.row.sellElgVol }}
                 </template>
            </el-table-column>
            <el-table-column align="center" label="特大单卖出金额（万元）" width="150">
                 <template slot-scope="scope">
                     {{ scope.row.sellElgAmount }}
                 </template>
            </el-table-column>
            <el-table-column align="center" label="净流入量（手）" width="150">
                 <template slot-scope="scope">
                     {{ scope.row.netMfVol }}
                 </template>
            </el-table-column>
            <el-table-column align="center" label="净流入额（万元）" width="150">
                 <template slot-scope="scope">
                     {{ scope.row.netMfAmount }}
                 </template>
            </el-table-column>
            <el-table-column align="center" label="概念名称" width="150">
                 <template slot-scope="scope">
                     {{ scope.row.name }}
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
        <el-dialog title="概念资金流向编辑" :visible.sync="dialogFormVisible" :close-on-click-modal="false" top="50px">
            <el-form ref="dataForm" :model="temp" label-position="right" label-width="110px" style="width: 400px; margin-left:50px;">
                <el-form-item label="概念代码" prop="type">
                    <el-input v-model="temp.code" readonly disabled placeholder="概念代码"/>
                </el-form-item>
                <el-form-item label="交易日期" prop="type">
                    <el-input v-model="temp.tradeDate" readonly disabled placeholder="交易日期"/>
                </el-form-item>
                <el-form-item label="小单买入量（手）" prop="type">
                    <el-input v-model="temp.buySmVol" oninput="value=value.replace(/[^0-9]/g,'')" />
                </el-form-item>
                <el-form-item label="小单买入金额（万元）" prop="type">
                     <el-input v-model="temp.buySmAmount"  placeholder="小单买入金额（万元）" />
                </el-form-item>
                <el-form-item label="小单卖出量（手）" prop="type">
                    <el-input v-model="temp.sellSmVol" oninput="value=value.replace(/[^0-9]/g,'')" />
                </el-form-item>
                <el-form-item label="小单卖出金额（万元）" prop="type">
                     <el-input v-model="temp.sellSmAmount"  placeholder="小单卖出金额（万元）" />
                </el-form-item>
                <el-form-item label="中单买入量（手）" prop="type">
                    <el-input v-model="temp.buyMdVol" oninput="value=value.replace(/[^0-9]/g,'')" />
                </el-form-item>
                <el-form-item label="中单买入金额（万元）" prop="type">
                     <el-input v-model="temp.buyMdAmount"  placeholder="中单买入金额（万元）" />
                </el-form-item>
                <el-form-item label="中单卖出量（手）" prop="type">
                    <el-input v-model="temp.sellMdVol" oninput="value=value.replace(/[^0-9]/g,'')" />
                </el-form-item>
                <el-form-item label="中单卖出金额（万元）" prop="type">
                     <el-input v-model="temp.sellMdAmount"  placeholder="中单卖出金额（万元）" />
                </el-form-item>
                <el-form-item label="大单买入量（手）" prop="type">
                    <el-input v-model="temp.buyLgVol" oninput="value=value.replace(/[^0-9]/g,'')" />
                </el-form-item>
                <el-form-item label="大单买入金额（万元）" prop="type">
                     <el-input v-model="temp.buyLgAmount"  placeholder="大单买入金额（万元）" />
                </el-form-item>
                <el-form-item label="大单卖出量（手）" prop="type">
                    <el-input v-model="temp.sellLgVol" oninput="value=value.replace(/[^0-9]/g,'')" />
                </el-form-item>
                <el-form-item label="大单卖出金额（万元）" prop="type">
                     <el-input v-model="temp.sellLgAmount"  placeholder="大单卖出金额（万元）" />
                </el-form-item>
                <el-form-item label="特大单买入量（手）" prop="type">
                    <el-input v-model="temp.buyElgVol" oninput="value=value.replace(/[^0-9]/g,'')" />
                </el-form-item>
                <el-form-item label="特大单买入金额（万元）" prop="type">
                     <el-input v-model="temp.buyElgAmount"  placeholder="特大单买入金额（万元）" />
                </el-form-item>
                <el-form-item label="特大单卖出量（手）" prop="type">
                    <el-input v-model="temp.sellElgVol" oninput="value=value.replace(/[^0-9]/g,'')" />
                </el-form-item>
                <el-form-item label="特大单卖出金额（万元）" prop="type">
                     <el-input v-model="temp.sellElgAmount"  placeholder="特大单卖出金额（万元）" />
                </el-form-item>
                <el-form-item label="净流入量（手）" prop="type">
                    <el-input v-model="temp.netMfVol" oninput="value=value.replace(/[^0-9]/g,'')" />
                </el-form-item>
                <el-form-item label="净流入额（万元）" prop="type">
                     <el-input v-model="temp.netMfAmount"  placeholder="净流入额（万元）" />
                </el-form-item>
                <el-form-item label="概念名称" prop="type">
                     <el-input v-model="temp.name"  placeholder="概念名称" />
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
import { get_concept_money_flow_page_list, deleteById, insert, update, get_details } from '@/api/quantization/concept_money_flow_api'
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
        code: undefined,
        tradeDateStart: undefined,
        tradeDateEnd: undefined,
        buySmVol: undefined,
        buySmAmount: undefined,
        sellSmVol: undefined,
        sellSmAmount: undefined,
        buyMdVol: undefined,
        buyMdAmount: undefined,
        sellMdVol: undefined,
        sellMdAmount: undefined,
        buyLgVol: undefined,
        buyLgAmount: undefined,
        sellLgVol: undefined,
        sellLgAmount: undefined,
        buyElgVol: undefined,
        buyElgAmount: undefined,
        sellElgVol: undefined,
        sellElgAmount: undefined,
        netMfVol: undefined,
        netMfAmount: undefined,
        name: undefined,
        pageIndex: 1,
        pageSize: 10
      },
      dialogFormVisible: false,
      temp: {
        code: undefined,
        tradeDate: undefined,
        buySmVol: undefined,
        buySmAmount: undefined,
        sellSmVol: undefined,
        sellSmAmount: undefined,
        buyMdVol: undefined,
        buyMdAmount: undefined,
        sellMdVol: undefined,
        sellMdAmount: undefined,
        buyLgVol: undefined,
        buyLgAmount: undefined,
        sellLgVol: undefined,
        sellLgAmount: undefined,
        buyElgVol: undefined,
        buyElgAmount: undefined,
        sellElgVol: undefined,
        sellElgAmount: undefined,
        netMfVol: undefined,
        netMfAmount: undefined,
        name: undefined
      },
      dialogStatus: 'insert'
    }
  },
  created() { // 初始化界面
    this.getPageList()
  },
  methods: {
    getPageList() { // 查询列表分页
      get_concept_money_flow_page_list(this.listQuery).then(response => {
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
