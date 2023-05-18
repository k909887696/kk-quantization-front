<template>
    <div class="app-container">
        <div class="filter-container">
            <el-form :inline="true" label-width="110px" label-position="right">
                                <el-row>
                    <el-form-item label="概念代码:">
                         <el-input v-model="listQuery.code" placeholder="概念代码" style="width: 300px;" class="filter-item" @keyup.enter.native="handleFilter" />
                    </el-form-item>
                    <el-form-item label="概念名称:">
                         <el-input v-model="listQuery.name" placeholder="概念名称" style="width: 300px;" class="filter-item" @keyup.enter.native="handleFilter" />
                    </el-form-item>
                    <el-form-item label="来源:">
                         <el-input v-model="listQuery.src" placeholder="来源 ts:tushare,ths:同花顺 90：东方财富" style="width: 300px;" class="filter-item" @keyup.enter.native="handleFilter" />
                    </el-form-item>
                    <el-form-item label="交易所:">
                         <el-input v-model="listQuery.exchange" placeholder="交易所" style="width: 300px;" class="filter-item" @keyup.enter.native="handleFilter" />
                    </el-form-item>
                </el-row>
                <el-row>
                    <el-form-item label="上市日期:">
                        <el-date-picker v-model="listQuery.listDateStart" type="date" format="yyyyMMdd" value-format="yyyyMMdd" style="width: 150px;" placeholder="选择时间" /> -
                        <el-date-picker v-model="listQuery.listDateEnd" type="date" format="yyyyMMdd" value-format="yyyyMMdd" style="width: 150px;" placeholder="选择时间" />
                    </el-form-item>
                    <el-form-item label="指数类型:">
                         <el-input v-model="listQuery.type" placeholder="N概念指数S特色指数" style="width: 300px;" class="filter-item" @keyup.enter.native="handleFilter" />
                    </el-form-item>
                    <el-form-item label="成分个数:">
                         <el-input v-model="listQuery.count" placeholder="成分个数" style="width: 300px;" class="filter-item" @keyup.enter.native="handleFilter" />
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
            <el-table-column align="center" label="概念名称" >
                 <template slot-scope="scope">
                     {{ scope.row.name }}
                 </template>
            </el-table-column>
            <el-table-column align="center" label="来源 ts:tushare,ths:同花顺 90：东方财富" width="150">
                 <template slot-scope="scope">
                     {{ scope.row.src }}
                 </template>
            </el-table-column>
            <el-table-column align="center" label="交易所" width="150">
                 <template slot-scope="scope">
                     {{ scope.row.exchange }}
                 </template>
            </el-table-column>
            <el-table-column align="center" label="上市日期" width="150">
                 <template slot-scope="scope">
                     {{ scope.row.listDate }}
                 </template>
            </el-table-column>
            <el-table-column align="center" label="N概念指数S特色指数" width="150">
                 <template slot-scope="scope">
                     {{ scope.row.type }}
                 </template>
            </el-table-column>
            <el-table-column align="center" label="成分个数" width="150">
                 <template slot-scope="scope">
                     {{ scope.row.count }}
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
        <el-dialog title="概念分类	编辑" :visible.sync="dialogFormVisible" :close-on-click-modal="false" top="50px">
            <el-form ref="dataForm" :model="temp" label-position="right" label-width="110px" style="width: 400px; margin-left:50px;">
                <el-form-item label="概念代码" prop="type">
                    <el-input v-model="temp.code" readonly disabled />
                </el-form-item>
                <el-form-item label="概念名称" prop="type">
                     <el-input v-model="temp.name"   />
                </el-form-item>
                <el-form-item label="来源"  prop="type">
                     <el-input v-model="temp.src"  placeholder="来源 ts:tushare,ths:同花顺 90：东方财富"  />
                </el-form-item>
                <el-form-item label="交易所" prop="type">
                     <el-input v-model="temp.exchange"   />
                </el-form-item>
                <el-form-item label="上市日期" prop="type">
                    <el-date-picker v-model="temp.listDate" type="date" format="yyyyMMdd" value-format="yyyyMMdd" placeholder="选择时间" />
                </el-form-item>
                <el-form-item label="N概念指数S特色指数" prop="type">
                     <el-input v-model="temp.type"   />
                </el-form-item>
                <el-form-item label="成分个数" prop="type">
                    <el-input v-model="temp.count" oninput="value=value.replace(/[^0-9]/g,'')" />
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
    import { get_concept_page_list, deleteById, insert, update, get_details } from '@/api/quantization/concept_api'
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
                    name: undefined,
                    src: undefined,
                    exchange: undefined,
                    listDateStart: undefined,
                    listDateEnd: undefined,
                    type: undefined,
                    count: undefined,
                    pageIndex: 1,
                    pageSize: 10
                },
                dialogFormVisible: false,
                temp: {
                    code: undefined,
                    name: undefined,
                    src: undefined,
                    exchange: undefined,
                    listDate: undefined,
                    type: undefined,
                    count: undefined
                },
                dialogStatus: 'insert'
            }
        },
        created() { // 初始化界面
            this.getPageList()
        },
        methods: {
            getPageList() { // 查询列表分页
                get_concept_page_list(this.listQuery).then(response => {
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
