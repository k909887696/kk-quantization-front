<template>
    <div class="app-container">
        <div class="filter-container">
            <el-form :inline="true" label-width="110px" label-position="right">
                                        <el-row>
                        <el-form-item label="配置编号:">
                            <el-input v-model="listQuery.settingId" placeholder="配置编号" style="width: 300px;" class="filter-item" @keyup.enter.native="handleFilter" />
                        </el-form-item>
                        <el-form-item label="机器人名称:">
                            <el-input v-model="listQuery.name" placeholder="机器人名称" style="width: 300px;" class="filter-item" @keyup.enter.native="handleFilter" />
                        </el-form-item>
                        <el-form-item label="状态:">
                            <el-select v-model="listQuery.status" placeholder="请选择状态" style="width: 300px;" clearable>
                                <el-option label="全部" value="" />
                                <el-option label="启用" value="1" />
                                <el-option label="禁用" value="0" />
                            </el-select>
                        </el-form-item>
                        </el-row>
                        <el-row>
                        <el-form-item label="备注:">
                            <el-input v-model="listQuery.remark" placeholder="备注" style="width: 300px;" class="filter-item" @keyup.enter.native="handleFilter" />
                        </el-form-item>
                        <el-form-item label="创建时间:">
                            <el-date-picker v-model="listQuery.createTimeStart" type="date" format="yyyy-MM-dd" value-format="yyyy-MM-dd" style="width: 150px;" placeholder="选择时间" /> -
                            <el-date-picker v-model="listQuery.createTimeEnd" type="date" format="yyyy-MM-dd" value-format="yyyy-MM-dd" style="width: 150px;" placeholder="选择时间" />
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
                    <el-table-column align="center" label="配置编号" width="150">
                        <template slot-scope="scope">
                            {{ scope.row.settingId }}
                        </template>
                    </el-table-column>
                    <el-table-column align="center" label="机器人名称" width="150">
                        <template slot-scope="scope">
                            {{ scope.row.name }}
                        </template>
                    </el-table-column>
                    <el-table-column align="center" label="webhook地址" width="150">
                        <template slot-scope="scope">
                            {{ scope.row.webhook }}
                        </template>
                    </el-table-column>
                    <el-table-column align="center" label="加签密钥" width="150">
                        <template slot-scope="scope">
                            {{ scope.row.secret }}
                        </template>
                    </el-table-column>
                    <el-table-column align="center" label="发送配置" width="150">
                        <template slot-scope="scope">
                            <el-tooltip v-if="scope.row.sendConfig" content="点击查看JSON" placement="top">
                                <el-button type="text" size="mini" @click="$refs.jsonViewer.show(scope.row.sendConfig, '发送配置')">
                                    查看JSON
                                </el-button>
                            </el-tooltip>
                            <span v-else>-</span>
                        </template>
                    </el-table-column>
                    <el-table-column align="center" label="状态" width="150">
                        <template slot-scope="scope">
                            <el-tag :type="scope.row.status === 1 || scope.row.status === '1' ? 'success' : 'danger'">
                                {{ scope.row.status === 1 || scope.row.status === '1' ? '启用' : '禁用' }}
                            </el-tag>
                        </template>
                    </el-table-column>
                    <el-table-column align="center" label="备注" width="150">
                        <template slot-scope="scope">
                            {{ scope.row.remark }}
                        </template>
                    </el-table-column>
                    <el-table-column align="center" label="创建时间" width="110">
                        <template slot-scope="scope">
                            <i class="el-icon-time" />
                            <span>{{ parseTime(new Date(scope.row.createTime) ,'{y}-{m}-{d} {h}:{i}:{s}') }}</span>
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
        <el-dialog title="钉钉群机器人配置编辑" :visible.sync="dialogFormVisible" :close-on-click-modal="false" top="50px">
            <el-form ref="dataForm" :model="temp" label-position="right" label-width="110px" style="width: 650px; margin-left:50px;">
                        <el-form-item label="配置编号" prop="settingId">
                            <el-input v-model="temp.settingId" :disabled="dialogStatus==='update'" placeholder="配置编号"/>
                        </el-form-item>
                        <el-form-item label="机器人名称" prop="type">
                            <el-input v-model="temp.name"  placeholder="机器人名称" />
                        </el-form-item>
                        <el-form-item label="webhook地址" prop="type">
                            <el-input v-model="temp.webhook"  placeholder="webhook地址" />
                        </el-form-item>
                        <el-form-item label="加签密钥" prop="type">
                            <el-input v-model="temp.secret"  placeholder="加签密钥" />
                        </el-form-item>
                        <el-form-item label="发送配置" prop="sendConfig">
                            <el-input v-model="temp.sendConfig" type="textarea" :rows="8" placeholder="发送配置(JSON)" style="width: calc(100% - 80px);" />
                            <el-button type="text" size="mini" icon="el-icon-view" style="margin-left: 10px; color: #409eff;" @click="$refs.jsonViewer.show(temp.sendConfig || '', '发送配置')">
                                查看JSON
                            </el-button>
                        </el-form-item>
                        <el-form-item label="状态" prop="status">
                            <el-select v-model="temp.status" placeholder="请选择状态" style="width: 100%;">
                                <el-option label="启用" value="1" />
                                <el-option label="禁用" value="0" />
                            </el-select>
                        </el-form-item>
                        <el-form-item label="备注" prop="type">
                            <el-input v-model="temp.remark"  placeholder="备注" />
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
        <!-- JSON查看器 -->
        <json-viewer ref="jsonViewer" @save="onJsonSave" />
    </div>
</template>

<script>
// import { get_base_data_item_map } from '@/api/quantization/settings'
import { getDingdingSettingPageList, deleteDingdingSettingById, insertDingdingSetting, updateDingdingSetting, getDingdingSettingDetails } from '@/api/quantization/DingdingSettingApi'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
import JsonViewer from '@/components/JsonViewer'
import { parseTime, renderHeaderTip } from '@/utils/index.js'
import waves from '@/directive/waves' // waves directive
import config from '@/config'
export default {
  components: { Pagination, JsonViewer },
  directives: { waves },
  filters: {

  },
  data() {
      return {
          empty_tip: config.table_list_empty_tip,
          list: null,
          total: 0,
          listQuery: {
            settingId: undefined,
            name: undefined,
            status: '',
            remark: undefined,
            createTimeStart: undefined,
            createTimeEnd: undefined,
            pageIndex: 1,
            pageSize: 10
  },
      dialogFormVisible: false,
          temp: {
            settingId: undefined,
            name: undefined,
            webhook: undefined,
            secret: undefined,
            sendConfig: undefined,
            status: undefined,
            remark: undefined,
            createTime: undefined
      },
      dialogStatus: 'insert'
  }
  },
  created() { // 初始化界面
      this.getPageList()
  },
  methods: {
      getPageList() { // 查询列表分页
          getDingdingSettingPageList(this.listQuery).then(response => {
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
              deleteDingdingSettingById(row).then(response => {
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
          // 更新时不传 createTime，使用后端保存的数据
          delete this.temp.createTime
          updateDingdingSetting(this.temp).then(response => {
              this.dialogFormVisible = false
              this.getPageList()
          })
      },
      addData() {
          // 创建时间由后端自动赋值，不传
          delete this.temp.createTime
          insertDingdingSetting(this.temp).then(response => {
              this.dialogFormVisible = false
              this.getPageList()
          })
      },
      editDataDialog(row) {
          this.dialogStatus = 'update'
          getDingdingSettingDetails(row).then(response => {
              this.temp = Object.assign({}, response.data === null ? row : response.data) // copy obj
              this.temp.createTime = parseTime(new Date(row.createTime), '{y}-{m}-{d} {h}:{i}:{s}')

              this.dialogFormVisible = true
          })
      },
      addDataDialog(row) {
          this.dialogStatus = 'insert'
          this.temp = Object.assign({}, row) // copy obj
          this.dialogFormVisible = true
      },
      // JSON查看器保存回调
      onJsonSave(jsonString) {
          this.temp.sendConfig = jsonString
          this.$message.success('发送配置已更新')
      },
      parseTime: parseTime,
      renderHeaderTip: renderHeaderTip
  }
}
</script>
