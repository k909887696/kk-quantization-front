<template>
    <div class="app-container">
        <div class="filter-container">
            <el-form :inline="true" label-width="110px" label-position="right">
                                <el-row>
                    <el-form-item label="TS代码:">
                         <el-input v-model="listQuery.tsCode" placeholder="TS代码" style="width: 300px;" class="filter-item" @keyup.enter.native="handleFilter" />
                    </el-form-item>
                    <el-form-item label="简称:">
                         <el-input v-model="listQuery.name" placeholder="简称" style="width: 300px;" class="filter-item" @keyup.enter.native="handleFilter" />
                    </el-form-item>
                    <el-form-item label="指数全称:">
                         <el-input v-model="listQuery.fullname" placeholder="指数全称" style="width: 300px;" class="filter-item" @keyup.enter.native="handleFilter" />
                    </el-form-item>
                    <el-form-item label="市场:">
                         <el-input v-model="listQuery.market" placeholder="市场" style="width: 300px;" class="filter-item" @keyup.enter.native="handleFilter" />
                    </el-form-item>
                </el-row>
                <el-row>
                    <el-form-item label="	发布方:">
                         <el-input v-model="listQuery.publisher" placeholder="	发布方" style="width: 300px;" class="filter-item" @keyup.enter.native="handleFilter" />
                    </el-form-item>
                    <el-form-item label="指数风格:">
                         <el-input v-model="listQuery.indexType" placeholder="指数风格" style="width: 300px;" class="filter-item" @keyup.enter.native="handleFilter" />
                    </el-form-item>
                    <el-form-item label="指数类别:">
                         <el-input v-model="listQuery.category" placeholder="指数类别" style="width: 300px;" class="filter-item" @keyup.enter.native="handleFilter" />
                    </el-form-item>
                    <el-form-item label="基期:">
                        <el-date-picker v-model="listQuery.baseDateStart" type="date" format="yyyyMMdd" value-format="yyyyMMdd" style="width: 150px;" placeholder="选择时间" /> -
                        <el-date-picker v-model="listQuery.baseDateEnd" type="date" format="yyyyMMdd" value-format="yyyyMMdd" style="width: 150px;" placeholder="选择时间" />
                    </el-form-item>
                </el-row>
                <el-row>
                    <el-form-item label="基点:">
                         <el-input v-model="listQuery.basePoint" placeholder="基点" style="width: 300px;" class="filter-item" @keyup.enter.native="handleFilter" />
                    </el-form-item>
                    <el-form-item label="发布日期:">
                        <el-date-picker v-model="listQuery.listDateStart" type="date" format="yyyyMMdd" value-format="yyyyMMdd" style="width: 150px;" placeholder="选择时间" /> -
                        <el-date-picker v-model="listQuery.listDateEnd" type="date" format="yyyyMMdd" value-format="yyyyMMdd" style="width: 150px;" placeholder="选择时间" />
                    </el-form-item>
                    <el-form-item label="加权方式:">
                         <el-input v-model="listQuery.weightRule" placeholder="加权方式" style="width: 300px;" class="filter-item" @keyup.enter.native="handleFilter" />
                    </el-form-item>
                    <el-form-item label="描述:">
                         <el-input v-model="listQuery.desc" placeholder="描述" style="width: 300px;" class="filter-item" @keyup.enter.native="handleFilter" />
                    </el-form-item>
                </el-row>
                <el-row>
                    <el-form-item label="终止日期:">
                        <el-date-picker v-model="listQuery.expDateStart" type="date" format="yyyyMMdd" value-format="yyyyMMdd" style="width: 150px;" placeholder="选择时间" /> -
                        <el-date-picker v-model="listQuery.expDateEnd" type="date" format="yyyyMMdd" value-format="yyyyMMdd" style="width: 150px;" placeholder="选择时间" />
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
            <el-table-column align="center" label="TS代码" width="150">
                <template slot-scope="scope">
                    {{ scope.row.tsCode }}
                </template>
            </el-table-column>
            <el-table-column align="center" label="简称" width="150">
                 <template slot-scope="scope">
                     {{ scope.row.name }}
                 </template>
            </el-table-column>
            <el-table-column align="center" label="指数全称" width="150">
                 <template slot-scope="scope">
                     {{ scope.row.fullname }}
                 </template>
            </el-table-column>
            <el-table-column align="center" label="市场" width="150">
                 <template slot-scope="scope">
                     {{ scope.row.market }}
                 </template>
            </el-table-column>
            <el-table-column align="center" label="	发布方" width="150">
                 <template slot-scope="scope">
                     {{ scope.row.publisher }}
                 </template>
            </el-table-column>
            <el-table-column align="center" label="指数风格" width="150">
                 <template slot-scope="scope">
                     {{ scope.row.indexType }}
                 </template>
            </el-table-column>
            <el-table-column align="center" label="指数类别" width="150">
                 <template slot-scope="scope">
                     {{ scope.row.category }}
                 </template>
            </el-table-column>
            <el-table-column align="center" label="基期" width="150">
                 <template slot-scope="scope">
                     {{ scope.row.baseDate }}
                 </template>
            </el-table-column>
            <el-table-column align="center" label="基点" width="150">
                 <template slot-scope="scope">
                     {{ scope.row.basePoint }}
                 </template>
            </el-table-column>
            <el-table-column align="center" label="发布日期" width="150">
                 <template slot-scope="scope">
                     {{ scope.row.listDate }}
                 </template>
            </el-table-column>
            <el-table-column align="center" label="加权方式" width="150">
                 <template slot-scope="scope">
                     {{ scope.row.weightRule }}
                 </template>
            </el-table-column>
            <el-table-column align="center" label="描述" width="150">
                 <template slot-scope="scope">
                     {{ scope.row.desc }}
                 </template>
            </el-table-column>
            <el-table-column align="center" label="终止日期" width="150">
                 <template slot-scope="scope">
                     {{ scope.row.expDate }}
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
        <el-dialog title="指数基本信息编辑" :visible.sync="dialogFormVisible" :close-on-click-modal="false" top="50px">
            <el-form ref="dataForm" :model="temp" label-position="right" label-width="110px" style="width: 400px; margin-left:50px;">
                <el-form-item label="TS代码" prop="type">
                    <el-input v-model="temp.tsCode" readonly disabled placeholder="TS代码"/>
                </el-form-item>
                <el-form-item label="简称" prop="type">
                     <el-input v-model="temp.name"  placeholder="简称" />
                </el-form-item>
                <el-form-item label="指数全称" prop="type">
                     <el-input v-model="temp.fullname"  placeholder="指数全称" />
                </el-form-item>
                <el-form-item label="市场" prop="type">
                     <el-input v-model="temp.market"  placeholder="市场" />
                </el-form-item>
                <el-form-item label="	发布方" prop="type">
                     <el-input v-model="temp.publisher"  placeholder="	发布方" />
                </el-form-item>
                <el-form-item label="指数风格" prop="type">
                     <el-input v-model="temp.indexType"  placeholder="指数风格" />
                </el-form-item>
                <el-form-item label="指数类别" prop="type">
                     <el-input v-model="temp.category"  placeholder="指数类别" />
                </el-form-item>
                <el-form-item label="基期" prop="type">
                    <el-date-picker v-model="temp.baseDate" type="date" format="yyyyMMdd" value-format="yyyyMMdd" placeholder="选择时间" />
                </el-form-item>
                <el-form-item label="基点" prop="type">
                     <el-input v-model="temp.basePoint"  placeholder="基点" />
                </el-form-item>
                <el-form-item label="发布日期" prop="type">
                    <el-date-picker v-model="temp.listDate" type="date" format="yyyyMMdd" value-format="yyyyMMdd" placeholder="选择时间" />
                </el-form-item>
                <el-form-item label="加权方式" prop="type">
                     <el-input v-model="temp.weightRule"  placeholder="加权方式" />
                </el-form-item>
                <el-form-item label="描述" prop="type">
                     <el-input v-model="temp.desc"  placeholder="描述" />
                </el-form-item>
                <el-form-item label="终止日期" prop="type">
                    <el-date-picker v-model="temp.expDate" type="date" format="yyyyMMdd" value-format="yyyyMMdd" placeholder="选择时间" />
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
import { get_index_basic_page_list, deleteById, insert, update, get_details } from '@/api/quantization/index_basic_api'
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
        name: undefined,
        fullname: undefined,
        market: undefined,
        publisher: undefined,
        indexType: undefined,
        category: undefined,
        baseDateStart: undefined,
        baseDateEnd: undefined,
        basePoint: undefined,
        listDateStart: undefined,
        listDateEnd: undefined,
        weightRule: undefined,
        desc: undefined,
        expDateStart: undefined,
        expDateEnd: undefined,
        pageIndex: 1,
        pageSize: 10
      },
      dialogFormVisible: false,
      temp: {
        tsCode: undefined,
        name: undefined,
        fullname: undefined,
        market: undefined,
        publisher: undefined,
        indexType: undefined,
        category: undefined,
        baseDate: undefined,
        basePoint: undefined,
        listDate: undefined,
        weightRule: undefined,
        desc: undefined,
        expDate: undefined
      },
      dialogStatus: 'insert'
    }
  },
  created() { // 初始化界面
    this.getPageList()
  },
  methods: {
    getPageList() { // 查询列表分页
      get_index_basic_page_list(this.listQuery).then(response => {
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
