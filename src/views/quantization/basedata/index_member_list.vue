<!-- eslint-disable vue/html-indent -->
<template>
    <div class="app-container">
        <div class="filter-container">
            <el-form :inline="true" label-width="110px" label-position="right">
                                <el-row>
                    <el-form-item label="指数代码:">
                         <el-input v-model="listQuery.indexCode" placeholder="指数代码" style="width: 300px;" class="filter-item" @keyup.enter.native="handleFilter" />
                    </el-form-item>
                    <el-form-item label="指数名称:">
                         <el-input v-model="listQuery.indexName" placeholder="指数名称" style="width: 300px;" class="filter-item" @keyup.enter.native="handleFilter" />
                    </el-form-item>
                    <el-form-item label="成分股票代码:">
                         <el-input v-model="listQuery.conCode" placeholder="成分股票代码" style="width: 300px;" class="filter-item" @keyup.enter.native="handleFilter" />
                    </el-form-item>
                    <el-form-item label="成分股票名称:">
                         <el-input v-model="listQuery.conName" placeholder="成分股票名称" style="width: 300px;" class="filter-item" @keyup.enter.native="handleFilter" />
                    </el-form-item>
                </el-row>
                <el-row>
                    <el-form-item label="纳入日期:">
                        <el-date-picker v-model="listQuery.inDateStart" type="date" format="yyyyMMdd" value-format="yyyyMMdd" style="width: 150px;" placeholder="选择时间" /> -
                        <el-date-picker v-model="listQuery.inDateEnd" type="date" format="yyyyMMdd" value-format="yyyyMMdd" style="width: 150px;" placeholder="选择时间" />
                    </el-form-item>
                    <el-form-item label="	剔除日期:">
                        <el-date-picker v-model="listQuery.outDateStart" type="date" format="yyyyMMdd" value-format="yyyyMMdd" style="width: 150px;" placeholder="选择时间" /> -
                        <el-date-picker v-model="listQuery.outDateEnd" type="date" format="yyyyMMdd" value-format="yyyyMMdd" style="width: 150px;" placeholder="选择时间" />
                    </el-form-item>
                    <el-form-item label="是否最新Y是N否:">
                         <el-input v-model="listQuery.isNew" placeholder="是否最新Y是N否" style="width: 300px;" class="filter-item" @keyup.enter.native="handleFilter" />
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
            <el-table-column align="center" label="指数代码" width="150">
                <template slot-scope="scope">
                    {{ scope.row.indexCode }}
                </template>
            </el-table-column>
            <el-table-column align="center" label="指数名称" width="150">
                 <template slot-scope="scope">
                     {{ scope.row.indexName }}
                 </template>
            </el-table-column>
            <el-table-column align="center" label="成分股票代码" width="150">
                <template slot-scope="scope">
                    {{ scope.row.conCode }}
                </template>
            </el-table-column>
            <el-table-column align="center" label="成分股票名称" width="150">
                 <template slot-scope="scope">
                     {{ scope.row.conName }}
                 </template>
            </el-table-column>
            <el-table-column align="center" label="纳入日期" width="150">
                 <template slot-scope="scope">
                     {{ scope.row.inDate }}
                 </template>
            </el-table-column>
            <el-table-column align="center" label="	剔除日期" width="150">
                 <template slot-scope="scope">
                     {{ scope.row.outDate }}
                 </template>
            </el-table-column>
            <el-table-column align="center" label="是否最新Y是N否" width="150">
                 <template slot-scope="scope">
                     {{ scope.row.isNew }}
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
        <el-dialog title="申万行业明细编辑" :visible.sync="dialogFormVisible" :close-on-click-modal="false" top="50px">
            <el-form ref="dataForm" :model="temp" label-position="right" label-width="110px" style="width: 400px; margin-left:50px;">
                <el-form-item label="指数代码" prop="type">
                    <el-input v-model="temp.indexCode" readonly disabled placeholder="指数代码"/>
                </el-form-item>
                <el-form-item label="指数名称" prop="type">
                     <el-input v-model="temp.indexName"  placeholder="指数名称" />
                </el-form-item>
                <el-form-item label="成分股票代码" prop="type">
                    <el-input v-model="temp.conCode" readonly disabled placeholder="成分股票代码"/>
                </el-form-item>
                <el-form-item label="成分股票名称" prop="type">
                     <el-input v-model="temp.conName"  placeholder="成分股票名称" />
                </el-form-item>
                <el-form-item label="纳入日期" prop="type">
                    <el-date-picker v-model="temp.inDate" type="date" format="yyyyMMdd" value-format="yyyyMMdd" placeholder="选择时间" />
                </el-form-item>
                <el-form-item label="	剔除日期" prop="type">
                    <el-date-picker v-model="temp.outDate" type="date" format="yyyyMMdd" value-format="yyyyMMdd" placeholder="选择时间" />
                </el-form-item>
                <el-form-item label="是否最新Y是N否" prop="type">
                     <el-input v-model="temp.isNew"  placeholder="是否最新Y是N否" />
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
import { get_index_member_page_list, deleteById, insert, update, get_details } from '@/api/quantization/index_member_api'
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
        indexCode: undefined,
        indexName: undefined,
        conCode: undefined,
        conName: undefined,
        inDateStart: undefined,
        inDateEnd: undefined,
        outDateStart: undefined,
        outDateEnd: undefined,
        isNew: undefined,
        pageIndex: 1,
        pageSize: 10
      },
      dialogFormVisible: false,
      temp: {
        indexCode: undefined,
        indexName: undefined,
        conCode: undefined,
        conName: undefined,
        inDate: undefined,
        outDate: undefined,
        isNew: undefined
      },
      dialogStatus: 'insert'
    }
  },
  created() { // 初始化界面
    this.getPageList()
  },
  methods: {
    getPageList() { // 查询列表分页
      get_index_member_page_list(this.listQuery).then(response => {
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
