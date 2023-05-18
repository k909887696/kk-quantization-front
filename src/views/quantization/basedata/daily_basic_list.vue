<template>
    <div class="app-container">
        <div class="filter-container">
            <el-form :inline="true" label-width="110px" label-position="right">
                                <el-row>
                    <el-form-item label="TS代码:">
                         <el-input v-model="listQuery.tsCode" placeholder="TS代码" style="width: 300px;" class="filter-item" @keyup.enter.native="handleFilter" />
                    </el-form-item>
                    <el-form-item label="交易日期:">
                        <el-date-picker v-model="listQuery.tradeDateStart" type="date" format="yyyyMMdd" value-format="yyyyMMdd" style="width: 150px;" placeholder="选择时间" /> -
                        <el-date-picker v-model="listQuery.tradeDateEnd" type="date" format="yyyyMMdd" value-format="yyyyMMdd" style="width: 150px;" placeholder="选择时间" />
                    </el-form-item>
                    <el-form-item label="当日收盘价:">
                         <el-input v-model="listQuery.close" placeholder="当日收盘价" style="width: 300px;" class="filter-item" @keyup.enter.native="handleFilter" />
                    </el-form-item>
                    <el-form-item label="换手率（%）:">
                         <el-input v-model="listQuery.turnoverRate" placeholder="换手率（%）" style="width: 300px;" class="filter-item" @keyup.enter.native="handleFilter" />
                    </el-form-item>
                </el-row>
                <el-row>
                    <el-form-item label="换手率（自由流通股）:">
                         <el-input v-model="listQuery.turnoverRateF" placeholder="换手率（自由流通股）" style="width: 300px;" class="filter-item" @keyup.enter.native="handleFilter" />
                    </el-form-item>
                    <el-form-item label="量比:">
                         <el-input v-model="listQuery.volumeRatio" placeholder="量比" style="width: 300px;" class="filter-item" @keyup.enter.native="handleFilter" />
                    </el-form-item>
                    <el-form-item label="市盈率（总市值/净利润， 亏损的PE为空）:">
                         <el-input v-model="listQuery.pe" placeholder="市盈率（总市值/净利润， 亏损的PE为空）" style="width: 300px;" class="filter-item" @keyup.enter.native="handleFilter" />
                    </el-form-item>
                    <el-form-item label="市盈率（TTM，亏损的PE为空）:">
                         <el-input v-model="listQuery.peTtm" placeholder="市盈率（TTM，亏损的PE为空）" style="width: 300px;" class="filter-item" @keyup.enter.native="handleFilter" />
                    </el-form-item>
                </el-row>
                <el-row>
                    <el-form-item label="市净率（总市值/净资产）:">
                         <el-input v-model="listQuery.pb" placeholder="市净率（总市值/净资产）" style="width: 300px;" class="filter-item" @keyup.enter.native="handleFilter" />
                    </el-form-item>
                    <el-form-item label="市销率:">
                         <el-input v-model="listQuery.ps" placeholder="市销率" style="width: 300px;" class="filter-item" @keyup.enter.native="handleFilter" />
                    </el-form-item>
                    <el-form-item label="市销率（TTM）:">
                         <el-input v-model="listQuery.psTtm" placeholder="市销率（TTM）" style="width: 300px;" class="filter-item" @keyup.enter.native="handleFilter" />
                    </el-form-item>
                    <el-form-item label="股息率 （%）:">
                         <el-input v-model="listQuery.dvRatio" placeholder="股息率 （%）" style="width: 300px;" class="filter-item" @keyup.enter.native="handleFilter" />
                    </el-form-item>
                </el-row>
                <el-row>
                    <el-form-item label="股息率（TTM）（%）:">
                         <el-input v-model="listQuery.dvTtm" placeholder="股息率（TTM）（%）" style="width: 300px;" class="filter-item" @keyup.enter.native="handleFilter" />
                    </el-form-item>
                    <el-form-item label="总股本 （万股）:">
                         <el-input v-model="listQuery.totalShare" placeholder="总股本 （万股）" style="width: 300px;" class="filter-item" @keyup.enter.native="handleFilter" />
                    </el-form-item>
                    <el-form-item label="流通股本 （万股）:">
                         <el-input v-model="listQuery.floatShare" placeholder="流通股本 （万股）" style="width: 300px;" class="filter-item" @keyup.enter.native="handleFilter" />
                    </el-form-item>
                    <el-form-item label="自由流通股本 （万）:">
                         <el-input v-model="listQuery.freeShare" placeholder="自由流通股本 （万）" style="width: 300px;" class="filter-item" @keyup.enter.native="handleFilter" />
                    </el-form-item>
                </el-row>
                <el-row>
                    <el-form-item label="当日总市值（元）:">
                         <el-input v-model="listQuery.totalMv" placeholder="当日总市值（元）" style="width: 300px;" class="filter-item" @keyup.enter.native="handleFilter" />
                    </el-form-item>
                    <el-form-item label="流通市值（万元）:">
                         <el-input v-model="listQuery.circMv" placeholder="流通市值（万元）" style="width: 300px;" class="filter-item" @keyup.enter.native="handleFilter" />
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
            <el-table-column align="center" label="交易日期" width="150">
                <template slot-scope="scope">
                    {{ scope.row.tradeDate }}
                </template>
            </el-table-column>
            <el-table-column align="center" label="当日收盘价" width="150">
                 <template slot-scope="scope">
                     {{ scope.row.close }}
                 </template>
            </el-table-column>
            <el-table-column align="center" label="换手率（%）" width="150">
                 <template slot-scope="scope">
                     {{ scope.row.turnoverRate }}
                 </template>
            </el-table-column>
            <el-table-column align="center" label="换手率（自由流通股）" width="150">
                 <template slot-scope="scope">
                     {{ scope.row.turnoverRateF }}
                 </template>
            </el-table-column>
            <el-table-column align="center" label="量比" width="150">
                 <template slot-scope="scope">
                     {{ scope.row.volumeRatio }}
                 </template>
            </el-table-column>
            <el-table-column align="center" label="市盈率（总市值/净利润， 亏损的PE为空）" width="150">
                 <template slot-scope="scope">
                     {{ scope.row.pe }}
                 </template>
            </el-table-column>
            <el-table-column align="center" label="市盈率（TTM，亏损的PE为空）" width="150">
                 <template slot-scope="scope">
                     {{ scope.row.peTtm }}
                 </template>
            </el-table-column>
            <el-table-column align="center" label="市净率（总市值/净资产）" width="150">
                 <template slot-scope="scope">
                     {{ scope.row.pb }}
                 </template>
            </el-table-column>
            <el-table-column align="center" label="市销率" width="150">
                 <template slot-scope="scope">
                     {{ scope.row.ps }}
                 </template>
            </el-table-column>
            <el-table-column align="center" label="市销率（TTM）" width="150">
                 <template slot-scope="scope">
                     {{ scope.row.psTtm }}
                 </template>
            </el-table-column>
            <el-table-column align="center" label="股息率 （%）" width="150">
                 <template slot-scope="scope">
                     {{ scope.row.dvRatio }}
                 </template>
            </el-table-column>
            <el-table-column align="center" label="股息率（TTM）（%）" width="150">
                 <template slot-scope="scope">
                     {{ scope.row.dvTtm }}
                 </template>
            </el-table-column>
            <el-table-column align="center" label="总股本 （万股）" width="150">
                 <template slot-scope="scope">
                     {{ scope.row.totalShare }}
                 </template>
            </el-table-column>
            <el-table-column align="center" label="流通股本 （万股）" width="150">
                 <template slot-scope="scope">
                     {{ scope.row.floatShare }}
                 </template>
            </el-table-column>
            <el-table-column align="center" label="自由流通股本 （万）" width="150">
                 <template slot-scope="scope">
                     {{ scope.row.freeShare }}
                 </template>
            </el-table-column>
            <el-table-column align="center" label="当日总市值（元）" width="150">
                 <template slot-scope="scope">
                     {{ scope.row.totalMv }}
                 </template>
            </el-table-column>
            <el-table-column align="center" label="流通市值（万元）" width="150">
                 <template slot-scope="scope">
                     {{ scope.row.circMv }}
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
        <el-dialog title="个股每日指标	编辑" :visible.sync="dialogFormVisible" :close-on-click-modal="false" top="50px">
            <el-form ref="dataForm" :model="temp" label-position="right" label-width="110px" style="width: 400px; margin-left:50px;">
                <el-form-item label="TS代码" prop="type">
                    <el-input v-model="temp.tsCode" readonly disabled placeholder="TS代码"/>
                </el-form-item>
                <el-form-item label="交易日期" prop="type">
                    <el-input v-model="temp.tradeDate" readonly disabled placeholder="交易日期"/>
                </el-form-item>
                <el-form-item label="当日收盘价" prop="type">
                     <el-input v-model="temp.close"  placeholder="当日收盘价" />
                </el-form-item>
                <el-form-item label="换手率（%）" prop="type">
                     <el-input v-model="temp.turnoverRate"  placeholder="换手率（%）" />
                </el-form-item>
                <el-form-item label="换手率（自由流通股）" prop="type">
                     <el-input v-model="temp.turnoverRateF"  placeholder="换手率（自由流通股）" />
                </el-form-item>
                <el-form-item label="量比" prop="type">
                     <el-input v-model="temp.volumeRatio"  placeholder="量比" />
                </el-form-item>
                <el-form-item label="市盈率（总市值/净利润， 亏损的PE为空）" prop="type">
                     <el-input v-model="temp.pe"  placeholder="市盈率（总市值/净利润， 亏损的PE为空）" />
                </el-form-item>
                <el-form-item label="市盈率（TTM，亏损的PE为空）" prop="type">
                     <el-input v-model="temp.peTtm"  placeholder="市盈率（TTM，亏损的PE为空）" />
                </el-form-item>
                <el-form-item label="市净率（总市值/净资产）" prop="type">
                     <el-input v-model="temp.pb"  placeholder="市净率（总市值/净资产）" />
                </el-form-item>
                <el-form-item label="市销率" prop="type">
                     <el-input v-model="temp.ps"  placeholder="市销率" />
                </el-form-item>
                <el-form-item label="市销率（TTM）" prop="type">
                     <el-input v-model="temp.psTtm"  placeholder="市销率（TTM）" />
                </el-form-item>
                <el-form-item label="股息率 （%）" prop="type">
                     <el-input v-model="temp.dvRatio"  placeholder="股息率 （%）" />
                </el-form-item>
                <el-form-item label="股息率（TTM）（%）" prop="type">
                     <el-input v-model="temp.dvTtm"  placeholder="股息率（TTM）（%）" />
                </el-form-item>
                <el-form-item label="总股本 （万股）" prop="type">
                     <el-input v-model="temp.totalShare"  placeholder="总股本 （万股）" />
                </el-form-item>
                <el-form-item label="流通股本 （万股）" prop="type">
                     <el-input v-model="temp.floatShare"  placeholder="流通股本 （万股）" />
                </el-form-item>
                <el-form-item label="自由流通股本 （万）" prop="type">
                     <el-input v-model="temp.freeShare"  placeholder="自由流通股本 （万）" />
                </el-form-item>
                <el-form-item label="当日总市值（元）" prop="type">
                     <el-input v-model="temp.totalMv"  placeholder="当日总市值（元）" />
                </el-form-item>
                <el-form-item label="流通市值（万元）" prop="type">
                     <el-input v-model="temp.circMv"  placeholder="流通市值（万元）" />
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
    import { get_daily_basic_page_list, deleteById, insert, update, get_details } from '@/api/quantization/daily_basic_api'
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
                    turnoverRate: undefined,
                    turnoverRateF: undefined,
                    volumeRatio: undefined,
                    pe: undefined,
                    peTtm: undefined,
                    pb: undefined,
                    ps: undefined,
                    psTtm: undefined,
                    dvRatio: undefined,
                    dvTtm: undefined,
                    totalShare: undefined,
                    floatShare: undefined,
                    freeShare: undefined,
                    totalMv: undefined,
                    circMv: undefined,
                    pageIndex: 1,
                    pageSize: 10
                },
                dialogFormVisible: false,
                temp: {
                    tsCode: undefined,
                    tradeDate: undefined,
                    close: undefined,
                    turnoverRate: undefined,
                    turnoverRateF: undefined,
                    volumeRatio: undefined,
                    pe: undefined,
                    peTtm: undefined,
                    pb: undefined,
                    ps: undefined,
                    psTtm: undefined,
                    dvRatio: undefined,
                    dvTtm: undefined,
                    totalShare: undefined,
                    floatShare: undefined,
                    freeShare: undefined,
                    totalMv: undefined,
                    circMv: undefined
                },
                dialogStatus: 'insert'
            }
        },
        created() { // 初始化界面
            this.getPageList()
        },
        methods: {
            getPageList() { // 查询列表分页
                get_daily_basic_page_list(this.listQuery).then(response => {
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
