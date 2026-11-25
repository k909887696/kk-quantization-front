<template>
  <div class="app-container">
    <el-tabs v-model="activeTab" type="border-card">
      <!-- ===================== Tab 1: Excel Preview ===================== -->
      <el-tab-pane label="Excel 预览" name="preview">
        <el-upload
          ref="previewUpload"
          action=""
          :auto-upload="false"
          :on-change="handlePreviewFileChange"
          :limit="1"
          accept=".xlsx,.xls,.csv"
          :on-exceed="() => $message.warning('仅支持上传一个文件，请先移除已有文件')"
        >
          <el-button size="small" type="primary" icon="el-icon-upload2">选择 Excel 文件</el-button>
        </el-upload>

        <div v-if="preview.sheets.length" class="sheet-selector">
          <span class="label">工作表：</span>
          <el-radio-group v-model="preview.activeSheet" size="small" @change="onPreviewSheetChange">
            <el-radio-button v-for="(name, i) in preview.sheets" :key="i" :label="i">{{ name }}</el-radio-button>
          </el-radio-group>
        </div>

        <div v-if="preview.headers.length" class="preview-info">
          <el-tag size="small" type="info">共 {{ preview.data.length }} 行，{{ preview.headers.length }} 列</el-tag>
        </div>

        <el-table
          v-if="preview.headers.length"
          :data="preview.pageData"
          border
          stripe
          size="small"
          max-height="520"
          style="margin-top: 12px"
        >
          <el-table-column type="index" label="#" width="50" align="center" />
          <el-table-column
            v-for="col in preview.headers"
            :key="col"
            :prop="col"
            :label="col"
            min-width="130"
            show-overflow-tooltip
          />
        </el-table>

        <el-pagination
          v-if="preview.data.length > preview.pageSize"
          style="margin-top: 12px; text-align: right"
          layout="total, sizes, prev, pager, next"
          :total="preview.data.length"
          :page-sizes="[50, 100, 200, 500]"
          :page-size.sync="preview.pageSize"
          :current-page.sync="preview.currentPage"
          @current-change="onPreviewPageChange"
          @size-change="onPreviewSizeChange"
        />
      </el-tab-pane>

      <!-- ===================== Tab 2: Excel Join/Merge ===================== -->
      <el-tab-pane label="Excel 合并 (Join)" name="join">
        <!-- Step 1: Upload files -->
        <div class="section-title">
          <i class="el-icon-upload2" /> 1. 上传 Excel 文件（至少 2 个）
        </div>
        <el-upload
          ref="joinUpload"
          action=""
          :auto-upload="false"
          :on-change="handleJoinFileChange"
          :on-remove="handleJoinFileRemove"
          :file-list="join.fileList"
          accept=".xlsx,.xls,.csv"
          multiple
        >
          <el-button size="small" type="primary" icon="el-icon-plus">添加文件</el-button>
        </el-upload>

        <!-- File overview cards -->
        <div v-if="join.parsedFiles.length" class="file-cards">
          <el-card v-for="(f, fi) in join.parsedFiles" :key="fi" shadow="hover" class="file-card">
            <div slot="header" class="file-card-header">
              <span><i class="el-icon-document" /> {{ f.name }}</span>
              <el-tag size="mini" type="info">{{ f.rows.length }} 行</el-tag>
            </div>
            <div class="file-card-body">
              <el-tag v-for="h in f.headers" :key="h" size="mini" class="field-tag">{{ h }}</el-tag>
            </div>
          </el-card>
        </div>

        <!-- Step 2: Join config -->
        <div v-if="join.parsedFiles.length >= 2" class="join-config-section">
          <div class="section-title"><i class="el-icon-setting" /> 2. 配置 Join 条件</div>

          <el-form label-width="120px" size="small">
            <el-row :gutter="20">
              <el-col :span="10">
                <el-form-item label="左表文件">
                  <el-select v-model="join.leftFileIndex" placeholder="选择左表" style="width: 100%" @change="onLeftFileChange">
                    <el-option v-for="(f, i) in join.parsedFiles" :key="i" :label="f.name" :value="i" />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="10">
                <el-form-item label="右表文件">
                  <el-select v-model="join.rightFileIndex" placeholder="选择右表" style="width: 100%" @change="onRightFileChange">
                    <el-option v-for="(f, i) in join.parsedFiles" :key="i" :label="f.name" :value="i" />
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row :gutter="20">
              <el-col :span="10">
                <el-form-item label="左表关联字段">
                  <el-select v-model="join.leftKey" placeholder="选择左表关联字段" style="width: 100%">
                    <el-option v-for="h in leftHeaders" :key="h" :label="h" :value="h" />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="10">
                <el-form-item label="右表关联字段">
                  <el-select v-model="join.rightKey" placeholder="选择右表关联字段" style="width: 100%">
                    <el-option v-for="h in rightHeaders" :key="h" :label="h" :value="h" />
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row :gutter="20">
              <el-col :span="10">
                <el-form-item label="Join 类型">
                  <el-select v-model="join.type" style="width: 100%">
                    <el-option label="Inner Join（仅保留匹配行）" value="inner" />
                    <el-option label="Left Join（保留左表全部行）" value="left" />
                    <el-option label="Full Join（保留两表全部行）" value="full" />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="10">
                <el-form-item>
                  <el-button type="primary" :disabled="!canExecuteJoin" @click="executeJoin">
                    <i class="el-icon-video-play" /> 执行合并
                  </el-button>
                  <el-button type="success" :disabled="!joinResult.data.length" @click="exportResult">
                    <i class="el-icon-download" /> 导出结果
                  </el-button>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>

          <!-- Output field selection -->
          <div class="section-title" style="font-size: 13px"><i class="el-icon-s-grid" /> 输出字段选择</div>
          <div class="output-fields">
            <div class="field-group">
              <div class="field-group-title">左表字段</div>
              <el-checkbox-group v-model="join.selectedLeftFields">
                <el-checkbox v-for="h in leftHeaders" :key="h" :label="h" class="field-checkbox">{{ h }}</el-checkbox>
              </el-checkbox-group>
              <el-button size="mini" type="text" @click="selectAllLeft">全选</el-button>
              <el-button size="mini" type="text" @click="join.selectedLeftFields = []">清空</el-button>
            </div>
            <div class="field-group">
              <div class="field-group-title">右表字段</div>
              <el-checkbox-group v-model="join.selectedRightFields">
                <el-checkbox v-for="h in rightHeaders" :key="h" :label="h" class="field-checkbox">{{ h }}</el-checkbox>
              </el-checkbox-group>
              <el-button size="mini" type="text" @click="selectAllRight">全选</el-button>
              <el-button size="mini" type="text" @click="join.selectedRightFields = []">清空</el-button>
            </div>
          </div>
        </div>

        <!-- Step 3: Result -->
        <div v-if="joinResult.data.length" class="join-result">
          <div class="section-title"><i class="el-icon-s-data" /> 3. 合并结果</div>
          <el-tag size="small" type="success">共 {{ joinResult.data.length }} 行，{{ joinResult.headers.length }} 列</el-tag>

          <el-table
            :data="joinResult.pageData"
            border
            stripe
            size="small"
            max-height="520"
            style="margin-top: 12px"
          >
            <el-table-column type="index" label="#" width="50" align="center" />
            <el-table-column
              v-for="col in joinResult.headers"
              :key="col"
              :prop="col"
              :label="col"
              min-width="130"
              show-overflow-tooltip
            />
          </el-table>

          <el-pagination
            v-if="joinResult.data.length > joinResult.pageSize"
            style="margin-top: 12px; text-align: right"
            layout="total, sizes, prev, pager, next"
            :total="joinResult.data.length"
            :page-sizes="[50, 100, 200, 500]"
            :page-size.sync="joinResult.pageSize"
            :current-page.sync="joinResult.currentPage"
            @current-change="onResultPageChange"
            @size-change="onResultSizeChange"
          />
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import * as XLSX from 'xlsx'

export default {
  name: 'ExcelTool',
  data() {
    return {
      activeTab: 'preview',
      // --- Preview state ---
      preview: {
        workbook: null,
        sheets: [],
        activeSheet: 0,
        headers: [],
        data: [],
        pageData: [],
        pageSize: 100,
        currentPage: 1
      },
      // --- Join state ---
      join: {
        fileList: [],
        parsedFiles: [], // { name, headers, rows, workbook }
        leftFileIndex: null,
        rightFileIndex: null,
        leftKey: '',
        rightKey: '',
        type: 'inner',
        selectedLeftFields: [],
        selectedRightFields: []
      },
      joinResult: {
        headers: [],
        data: [],
        pageData: [],
        pageSize: 100,
        currentPage: 1
      }
    }
  },
  computed: {
    leftHeaders() {
      if (this.join.leftFileIndex === null || this.join.leftFileIndex === undefined) return []
      const f = this.join.parsedFiles[this.join.leftFileIndex]
      return f ? f.headers : []
    },
    rightHeaders() {
      if (this.join.rightFileIndex === null || this.join.rightFileIndex === undefined) return []
      const f = this.join.parsedFiles[this.join.rightFileIndex]
      return f ? f.headers : []
    },
    canExecuteJoin() {
      return (
        this.join.leftFileIndex !== null &&
        this.join.rightFileIndex !== null &&
        this.join.leftFileIndex !== this.join.rightFileIndex &&
        this.join.leftKey &&
        this.join.rightKey
      )
    }
  },
  methods: {
    // =================== XLSX parsing helper ===================
    parseWorkbook(file, callback) {
      const reader = new FileReader()
      reader.onload = (e) => {
        try {
          const data = new Uint8Array(e.target.result)
          const wb = XLSX.read(data, { type: 'array' })
          callback(null, wb)
        } catch (err) {
          callback(err)
        }
      }
      reader.readAsArrayBuffer(file.raw || file)
    },
    sheetToObjects(wb, sheetIndex) {
      const ws = wb.Sheets[wb.SheetNames[sheetIndex]]
      const json = XLSX.utils.sheet_to_json(ws, { defval: '' })
      if (!json.length) return { headers: [], rows: [] }
      const headers = Object.keys(json[0])
      return { headers, rows: json }
    },

    // =================== Preview handlers ===================
    handlePreviewFileChange(file) {
      this.parseWorkbook(file, (err, wb) => {
        if (err) {
          this.$message.error('文件解析失败：' + err.message)
          return
        }
        this.preview.workbook = wb
        this.preview.sheets = wb.SheetNames.slice()
        this.preview.activeSheet = 0
        this.loadPreviewSheet(0)
      })
    },
    loadPreviewSheet(index) {
      const { headers, rows } = this.sheetToObjects(this.preview.workbook, index)
      this.preview.headers = headers
      this.preview.data = rows
      this.preview.currentPage = 1
      this.updatePreviewPage()
    },
    onPreviewSheetChange(index) {
      this.loadPreviewSheet(index)
    },
    onPreviewPageChange() {
      this.updatePreviewPage()
    },
    onPreviewSizeChange() {
      this.preview.currentPage = 1
      this.updatePreviewPage()
    },
    updatePreviewPage() {
      const start = (this.preview.currentPage - 1) * this.preview.pageSize
      this.preview.pageData = this.preview.data.slice(start, start + this.preview.pageSize)
    },

    // =================== Join file handlers ===================
    handleJoinFileChange(file) {
      this.parseWorkbook(file, (err, wb) => {
        if (err) {
          this.$message.error('文件解析失败：' + err.message)
          return
        }
        const { headers, rows } = this.sheetToObjects(wb, 0)
        this.join.parsedFiles.push({
          name: file.name,
          headers,
          rows,
          workbook: wb
        })
        // auto-select first two files
        if (this.join.parsedFiles.length === 2) {
          this.join.leftFileIndex = 0
          this.join.rightFileIndex = 1
          this.join.selectedLeftFields = headers.slice()
          this.onRightFileChange()
        }
      })
    },
    handleJoinFileRemove(file) {
      const idx = this.join.fileList.indexOf(file)
      if (idx > -1) this.join.fileList.splice(idx, 1)
      // re-parse remaining files
      // Simple approach: find by name and remove
      const fi = this.join.parsedFiles.findIndex(f => f.name === file.name)
      if (fi > -1) this.join.parsedFiles.splice(fi, 1)
      // reset indices
      this.join.leftFileIndex = this.join.parsedFiles.length > 0 ? 0 : null
      this.join.rightFileIndex = this.join.parsedFiles.length > 1 ? 1 : null
      this.join.leftKey = ''
      this.join.rightKey = ''
      this.join.selectedLeftFields = []
      this.join.selectedRightFields = []
      if (this.join.leftFileIndex !== null) {
        this.join.selectedLeftFields = this.join.parsedFiles[this.join.leftFileIndex].headers.slice()
      }
      if (this.join.rightFileIndex !== null) {
        this.join.selectedRightFields = this.join.parsedFiles[this.join.rightFileIndex].headers.slice()
      }
    },
    onLeftFileChange() {
      this.join.leftKey = ''
      this.join.selectedLeftFields = this.leftHeaders.slice()
    },
    onRightFileChange() {
      this.join.rightKey = ''
      this.join.selectedRightFields = this.rightHeaders.slice()
    },
    selectAllLeft() {
      this.join.selectedLeftFields = this.leftHeaders.slice()
    },
    selectAllRight() {
      this.join.selectedRightFields = this.rightHeaders.slice()
    },

    // =================== Join execution ===================
    executeJoin() {
      const leftFile = this.join.parsedFiles[this.join.leftFileIndex]
      const rightFile = this.join.parsedFiles[this.join.rightFileIndex]
      if (!leftFile || !rightFile) {
        this.$message.error('请选择左表和右表')
        return
      }
      if (!this.join.leftKey || !this.join.rightKey) {
        this.$message.error('请选择关联字段')
        return
      }

      const lKey = this.join.leftKey
      const rKey = this.join.rightKey
      const lRows = leftFile.rows
      const rRows = rightFile.rows
      const type = this.join.type

      // Determine output fields with prefix to avoid collision
      const leftOutFields = this.join.selectedLeftFields.length
        ? this.join.selectedLeftFields
        : this.leftHeaders
      const rightOutFields = this.join.selectedRightFields.length
        ? this.join.selectedRightFields
        : this.rightHeaders

      // Build prefixed field names to avoid key collision
      const lPrefix = leftFile.name.replace(/\.[^.]+$/, '')
      const rPrefix = rightFile.name.replace(/\.[^.]+$/, '')

      // Build output headers
      const outHeaders = []
      const leftFieldMap = {} // outputName -> originalName
      const rightFieldMap = {}

      leftOutFields.forEach(f => {
        const outName = rightOutFields.includes(f) && f !== lKey
          ? `${lPrefix}.${f}`
          : f
        outHeaders.push(outName)
        leftFieldMap[outName] = f
      })
      rightOutFields.forEach(f => {
        if (f === rKey && leftOutFields.includes(lKey)) return // skip duplicate join key
        const outName = leftOutFields.includes(f)
          ? `${rPrefix}.${f}`
          : f
        outHeaders.push(outName)
        rightFieldMap[outName] = f
      })

      // Build index on right table
      const rightIndex = {}
      rRows.forEach(row => {
        const key = String(row[rKey] != null ? row[rKey] : '')
        if (!rightIndex[key]) rightIndex[key] = []
        rightIndex[key].push(row)
      })

      // Build index on left table (for full join)
      const leftIndex = {}
      if (type === 'full') {
        lRows.forEach(row => {
          const key = String(row[lKey] != null ? row[lKey] : '')
          if (!leftIndex[key]) leftIndex[key] = true
        })
      }

      const result = []
      const matchedRightKeys = new Set()

      // Left side scan
      lRows.forEach(lRow => {
        const key = String(lRow[lKey] != null ? lRow[lKey] : '')
        const matches = rightIndex[key]

        if (matches && matches.length) {
          matches.forEach(rRow => {
            matchedRightKeys.add(key)
            const outRow = {}
            outHeaders.forEach(h => {
              if (leftFieldMap[h] !== undefined) {
                outRow[h] = lRow[leftFieldMap[h]] != null ? lRow[leftFieldMap[h]] : ''
              } else if (rightFieldMap[h] !== undefined) {
                outRow[h] = rRow[rightFieldMap[h]] != null ? rRow[rightFieldMap[h]] : ''
              }
            })
            result.push(outRow)
          })
        } else if (type === 'left' || type === 'full') {
          const outRow = {}
          outHeaders.forEach(h => {
            if (leftFieldMap[h] !== undefined) {
              outRow[h] = lRow[leftFieldMap[h]] != null ? lRow[leftFieldMap[h]] : ''
            } else if (rightFieldMap[h] !== undefined) {
              outRow[h] = ''
            }
          })
          result.push(outRow)
        }
      })

      // Full join: add unmatched right rows
      if (type === 'full') {
        rRows.forEach(rRow => {
          const key = String(rRow[rKey] != null ? rRow[rKey] : '')
          if (!matchedRightKeys.has(key)) {
            const outRow = {}
            outHeaders.forEach(h => {
              if (leftFieldMap[h] !== undefined) {
                // For the join key column, fill from right
                if (leftFieldMap[h] === lKey) {
                  outRow[h] = rRow[rKey] != null ? rRow[rKey] : ''
                } else {
                  outRow[h] = ''
                }
              } else if (rightFieldMap[h] !== undefined) {
                outRow[h] = rRow[rightFieldMap[h]] != null ? rRow[rightFieldMap[h]] : ''
              }
            })
            result.push(outRow)
          }
        })
      }

      this.joinResult.headers = outHeaders
      this.joinResult.data = result
      this.joinResult.currentPage = 1
      this.updateResultPage()
      this.$message.success(`合并完成，共 ${result.length} 行`)
    },

    // =================== Result pagination ===================
    onResultPageChange() {
      this.updateResultPage()
    },
    onResultSizeChange() {
      this.joinResult.currentPage = 1
      this.updateResultPage()
    },
    updateResultPage() {
      const start = (this.joinResult.currentPage - 1) * this.joinResult.pageSize
      this.joinResult.pageData = this.joinResult.data.slice(start, start + this.joinResult.pageSize)
    },

    // =================== Export ===================
    exportResult() {
      if (!this.joinResult.data.length) return
      const ws = XLSX.utils.json_to_sheet(this.joinResult.data, { header: this.joinResult.headers })
      const wb = XLSX.utils.book_new()
      XLSX.utils.book_append_sheet(wb, ws, 'JoinResult')
      XLSX.writeFile(wb, 'join_result.xlsx')
      this.$message.success('导出成功')
    }
  }
}
</script>

<style scoped>
.app-container {
  padding: 20px;
}
.sheet-selector {
  margin-top: 16px;
}
.sheet-selector .label {
  font-size: 14px;
  color: #606266;
  margin-right: 8px;
}
.preview-info {
  margin-top: 8px;
}
.section-title {
  font-size: 15px;
  font-weight: 600;
  color: #303133;
  margin: 20px 0 12px;
  padding-bottom: 8px;
  border-bottom: 1px solid #EBEEF5;
}
.section-title i {
  margin-right: 4px;
  color: #409EFF;
}
.file-cards {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 16px;
}
.file-card {
  width: 320px;
}
.file-card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.file-card-body {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
}
.field-tag {
  margin: 2px;
}
.join-config-section {
  margin-top: 20px;
  padding: 16px;
  background: #F5F7FA;
  border-radius: 4px;
}
.output-fields {
  display: flex;
  gap: 40px;
  margin-top: 8px;
}
.field-group {
  flex: 1;
}
.field-group-title {
  font-weight: 600;
  font-size: 13px;
  color: #606266;
  margin-bottom: 8px;
}
.field-checkbox {
  display: block;
  margin-bottom: 4px;
}
.join-result {
  margin-top: 24px;
  padding-top: 16px;
  border-top: 2px solid #409EFF;
}
</style>
