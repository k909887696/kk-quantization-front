<template>
    <div class="app-container">
        <div class="filter-container">
            <el-form :inline="true" label-width="110px" label-position="right">
                                <el-row>
                    <el-form-item label="指数代码:">
                         <el-input v-model="listQuery.indexCode" placeholder="指数代码" style="width: 300px;" class="filter-item" @keyup.enter.native="handleFilter" />
                    </el-form-item>
                    <el-form-item label="行业名称:">
                         <el-input v-model="listQuery.industryName" placeholder="行业名称" style="width: 300px;" class="filter-item" @keyup.enter.native="handleFilter" />
                    </el-form-item>
                    <el-form-item label="父级代码:">
                         <el-input v-model="listQuery.parentCode" placeholder="父级代码" style="width: 300px;" class="filter-item" @keyup.enter.native="handleFilter" />
                    </el-form-item>
                    <el-form-item label="行业名称:">
                         <el-input v-model="listQuery.level" placeholder="行业名称" style="width: 300px;" class="filter-item" @keyup.enter.native="handleFilter" />
                    </el-form-item>
                </el-row>
                <el-row>
                    <el-form-item label="行业代码:">
                         <el-input v-model="listQuery.industryCode" placeholder="行业代码" style="width: 300px;" class="filter-item" @keyup.enter.native="handleFilter" />
                    </el-form-item>
                    <el-form-item label="	是否发布了指数:">
                         <el-input v-model="listQuery.isPub" placeholder="	是否发布了指数" style="width: 300px;" class="filter-item" @keyup.enter.native="handleFilter" />
                    </el-form-item>
                    <el-form-item label="行业分类（SW申万）:">
                         <el-input v-model="listQuery.src" placeholder="行业分类（SW申万）" style="width: 300px;" class="filter-item" @keyup.enter.native="handleFilter" />
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
            <el-table-column align="center" label="行业名称" width="150">
                 <template slot-scope="scope">
                     {{ scope.row.industryName }}
                 </template>
            </el-table-column>
            <el-table-column align="center" label="父级代码" width="150">
                 <template slot-scope="scope">
                     {{ scope.row.parentCode }}
                 </template>
            </el-table-column>
            <el-table-column align="center" label="行业名称" width="150">
                 <template slot-scope="scope">
                     {{ scope.row.level }}
                 </template>
            </el-table-column>
            <el-table-column align="center" label="行业代码" width="150">
                 <template slot-scope="scope">
                     {{ scope.row.industryCode }}
                 </template>
            </el-table-column>
            <el-table-column align="center" label="	是否发布了指数" width="150">
                 <template slot-scope="scope">
                     {{ scope.row.isPub }}
                 </template>
            </el-table-column>
            <el-table-column align="center" label="行业分类（SW申万）" width="150">
                 <template slot-scope="scope">
                     {{ scope.row.src }}
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
        <el-dialog title="申万行业分类编辑" :visible.sync="dialogFormVisible" :close-on-click-modal="false" top="50px">
            <el-form ref="dataForm" :model="temp" label-position="right" label-width="110px" style="width: 400px; margin-left:50px;">
                <el-form-item label="指数代码" prop="type">
                    <el-input v-model="temp.indexCode" readonly disabled placeholder="指数代码"/>
                </el-form-item>
                <el-form-item label="行业名称" prop="type">
                     <el-input v-model="temp.industryName"  placeholder="行业名称" />
                </el-form-item>
                <el-form-item label="父级代码" prop="type">
                     <el-input v-model="temp.parentCode"  placeholder="父级代码" />
                </el-form-item>
                <el-form-item label="行业名称" prop="type">
                     <el-input v-model="temp.level"  placeholder="行业名称" />
                </el-form-item>
                <el-form-item label="行业代码" prop="type">
                     <el-input v-model="temp.industryCode"  placeholder="行业代码" />
                </el-form-item>
                <el-form-item label="	是否发布了指数" prop="type">
                     <el-input v-model="temp.isPub"  placeholder="	是否发布了指数" />
                </el-form-item>
                <el-form-item label="行业分类（SW申万）" prop="type">
                     <el-input v-model="temp.src"  placeholder="行业分类（SW申万）" />
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
import { get_index_classify_page_list, deleteById, insert, update, get_details } from '@/api/quantization/index_classify_api'
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
        industryName: undefined,
        parentCode: undefined,
        level: undefined,
        industryCode: undefined,
        isPub: undefined,
        src: undefined,
        pageIndex: 1,
        pageSize: 10
      },
      dialogFormVisible: false,
      temp: {
        indexCode: undefined,
        industryName: undefined,
        parentCode: undefined,
        level: undefined,
        industryCode: undefined,
        isPub: undefined,
        src: undefined
      },
      dialogStatus: 'insert'
    }
  },
  created() { // 初始化界面
    this.getPageList()
  },
  methods: {
    getPageList() { // 查询列表分页
      get_index_classify_page_list(this.listQuery).then(response => {
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
