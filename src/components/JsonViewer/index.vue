<template>
  <el-dialog
    :visible.sync="visible"
    :title="title"
    width="1100px"
    :close-on-click-modal="false"
    :append-to-body="true"
    custom-class="json-viewer-dialog"
  >
    <div class="json-viewer-wrapper">
      <!-- 顶部工具栏 -->
      <div class="json-toolbar">
        <div class="toolbar-left">
          <el-button size="mini" icon="el-icon-document" @click="formatJson">格式化</el-button>
          <el-button size="mini" icon="el-icon-minus" @click="compressJson">压缩</el-button>
          <el-button size="mini" icon="el-icon-refresh" @click="unescapeJson">去除转义</el-button>
          <el-button size="mini" icon="el-icon-refresh" @click="escapeJson">添加转义</el-button>
        </div>
        <div class="toolbar-right">
          <el-button size="mini" icon="el-icon-arrow-down" @click="expandAll">全展开</el-button>
          <el-button size="mini" icon="el-icon-arrow-right" @click="collapseAll">全折叠</el-button>
          <el-button size="mini" icon="el-icon-document-copy" @click="copyJson">复制</el-button>
        </div>
      </div>

      <!-- 主体区域 -->
      <div class="json-viewer-body">
        <!-- 左侧：源数据编辑区 -->
        <div class="json-panel json-panel-left">
          <div class="json-panel-header">源数据</div>
          <div class="json-panel-content">
            <div class="json-editor-wrapper">
              <div class="line-numbers">
                <div v-for="line in rawLines" :key="line" class="line-number">{{ line }}</div>
              </div>
              <textarea
                v-model="rawJson"
                class="json-textarea"
                spellcheck="false"
                @input="onRawInput"
                @scroll="syncScroll"
              />
            </div>
          </div>
        </div>

        <!-- 右侧：树形结构 -->
        <div class="json-panel json-panel-right">
          <div class="json-panel-header">树形结构</div>
          <div class="json-panel-content json-tree-content">
            <json-tree-node
              v-if="isValid && parsedData !== null"
              :data="parsedData"
              :path="'root'"
              :expanded-keys="expandedKeys"
              @toggle="toggleExpand"
              @update="onTreeUpdate"
            />
            <div v-else class="json-parse-error">
              <i class="el-icon-warning-outline" />
              <span>JSON 格式错误，请检查左侧输入</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div slot="footer" class="dialog-footer">
      <el-button @click="visible = false">关闭</el-button>
      <el-button type="primary" icon="el-icon-check" @click="saveJson">保存</el-button>
    </div>
  </el-dialog>
</template>

<script>
// 递归组件 - JSON树节点（支持编辑）
const JsonTreeNode = {
  name: 'JsonTreeNode',
  props: {
    data: { type: [Object, Array, String, Number, Boolean], required: true },
    path: { type: String, default: '' },
    propName: { type: [String, Number], default: '' },
    expandedKeys: { type: Object, default: () => ({}) },
    parentIsArray: { type: Boolean, default: false }
  },
  data() {
    return {
      editing: false,
      editValue: '',
      editingKey: false,
      editKeyValue: ''
    }
  },
  computed: {
    isObject() {
      return this.data !== null && typeof this.data === 'object'
    },
    isArray() {
      return Array.isArray(this.data)
    },
    isNull() {
      return this.data === null
    },
    isExpandable() {
      return this.isObject || this.isArray
    },
    isExpanded() {
      if (!this.isExpandable) return false
      if (this.expandedKeys['__all_expanded__']) return true
      if (this.expandedKeys['__all_collapsed__']) return false
      return !!this.expandedKeys[this.nodeKey]
    },
    nodeKey() {
      return this.path
    },
    entries() {
      if (this.data === null || typeof this.data !== 'object') return []
      return Object.entries(this.data)
    },
    entryCount() {
      if (this.data === null || typeof this.data !== 'object') return 0
      return Object.keys(this.data).length
    },
    dataType() {
      if (this.data === null) return 'null'
      if (Array.isArray(this.data)) return 'array'
      return typeof this.data
    },
    valueDisplay() {
      if (this.data === null) return 'null'
      if (typeof this.data === 'string') return `"${this.data}"`
      return String(this.data)
    }
  },
  methods: {
    toggle() {
      this.$emit('toggle', this.nodeKey)
    },
    startEditKey() {
      this.editingKey = true
      this.editKeyValue = String(this.propName)
    },
    confirmEditKey() {
      if (this.editKeyValue !== String(this.propName)) {
        this.$emit('update', { type: 'renameKey', path: this.path, oldKey: this.propName, newKey: this.editKeyValue })
      }
      this.editingKey = false
    },
    cancelEditKey() {
      this.editingKey = false
      this.editKeyValue = String(this.propName)
    },
    startEditValue() {
      this.editing = true
      this.editValue = this.data === null ? 'null' : String(this.data)
    },
    confirmEditValue() {
      let newValue = this.editValue.trim()
      // 智能类型转换
      if (newValue === 'true') newValue = true
      else if (newValue === 'false') newValue = false
      else if (newValue === 'null') newValue = null
      else if (!isNaN(newValue) && newValue !== '' && !isNaN(parseFloat(newValue))) {
        newValue = parseFloat(newValue)
      }
      this.$emit('update', { type: 'updateValue', path: this.path, value: newValue })
      this.editing = false
    },
    cancelEditValue() {
      this.editing = false
    },
    deleteNode() {
      this.$emit('update', { type: 'delete', path: this.path })
    }
  },
  render(h) {
    const isArray = this.isArray
    const isObject = this.isObject && !isArray
    const isNull = this.isNull

    // 基本类型（不可展开）
    if (!isObject && !isArray && !isNull) {
      return h('div', { class: 'json-tree-row' }, [
        // 键名（如果是数组元素则不显示键名）
        this.propName !== '' && !this.parentIsArray
          ? h('span', { class: 'json-key' }, `${this.propName}: `)
          : null,
        // 值（可编辑）
        this.editing
          ? h('span', { class: 'json-edit-wrapper' }, [
            h('input', {
              class: 'json-edit-input',
              domProps: { value: this.editValue },
              attrs: { size: Math.max(this.editValue.length, 10) },
              on: {
                input: (e) => { this.editValue = e.target.value },
                keyup: (e) => {
                  if (e.key === 'Enter') this.confirmEditValue()
                  if (e.key === 'Escape') this.cancelEditValue()
                },
                blur: this.confirmEditValue
              }
            }),
            h('span', { class: 'json-edit-hint' }, '↵')
          ])
          : h('span', {
            class: `json-value json-${this.dataType}`,
            on: { dblclick: this.startEditValue }
          }, this.valueDisplay),
        h('span', { class: 'json-separator' }, ' ,')
      ])
    }

    // null 值
    if (isNull) {
      return h('div', { class: 'json-tree-row' }, [
        this.propName !== '' && !this.parentIsArray
          ? h('span', { class: 'json-key' }, `${this.propName}: `)
          : null,
        h('span', { class: 'json-value json-null' }, 'null')
      ])
    }

    const entries = this.entries
    const openBracket = isArray ? '[' : '{'
    const closeBracket = isArray ? ']' : '}'

    // 空对象/数组
    if (entries.length === 0) {
      return h('div', { class: 'json-tree-row' }, [
        this.propName !== '' && !this.parentIsArray
          ? h('span', { class: 'json-key' }, `${this.propName}: `)
          : null,
        h('span', { class: 'json-bracket' }, `${openBracket}${closeBracket}`)
      ])
    }

    return h('div', { class: 'json-tree-row' }, [
      // 节点头部（可折叠）
      h('div', { class: 'json-tree-header' }, [
        h('span', {
          class: 'json-toggle',
          on: { click: this.toggle }
        }, this.isExpanded ? '▼' : '▶'),
        // 键名
        this.propName !== '' && !this.parentIsArray
          ? h('span', { class: 'json-key' }, `${this.propName} : `)
          : null,
        // 折叠时显示内容摘要
        !this.isExpanded
          ? h('span', { class: 'json-bracket-collapsed', on: { click: this.toggle }},
            `${openBracket} ${this.entryCount} ${closeBracket}`
          )
          : h('span', { class: 'json-bracket' }, openBracket)
      ]),
      // 展开的子节点
      this.isExpanded ? h('div', { class: 'json-children' },
        entries.map(([key, value], index) => {
          const childPath = isArray ? `${this.path}[${key}]` : `${this.path}.${key}`
          return h(JsonTreeNode, {
            props: {
              data: value,
              path: childPath,
              propName: key,
              expandedKeys: this.expandedKeys,
              parentIsArray: isArray
            },
            on: { toggle: (key) => this.$emit('toggle', key), update: (event) => this.$emit('update', event) }
          })
        })
      ) : null,
      // 闭合括号
      this.isExpanded ? h('div', { class: 'json-tree-closing' }, [
        h('span', { class: 'json-bracket' }, closeBracket),
        h('span', { class: 'json-separator' }, ' ,')
      ]) : null
    ])
  }
}

export default {
  name: 'JsonViewer',
  components: { JsonTreeNode },
  data() {
    return {
      visible: false,
      title: 'JSON 查看器',
      rawJson: '',
      parsedData: null,
      expandedKeys: {},
      isValid: true
    }
  },
  computed: {
    rawLines() {
      return this.rawJson.split('\n').map((_, index) => index + 1)
    }
  },
  methods: {
    show(data, title) {
      let raw
      if (typeof data === 'string') {
        // 尝试格式化
        try {
          raw = JSON.stringify(JSON.parse(data), null, 2)
        } catch (e) {
          raw = data
        }
      } else if (data !== null && typeof data === 'object') {
        raw = JSON.stringify(data, null, 2)
      } else {
        raw = String(data)
      }
      this.rawJson = raw
      this.title = title || 'JSON 查看器'
      this.expandedKeys = {}
      this.parseJson(this.rawJson)
      // 默认展开所有节点
      this.$nextTick(() => {
        this.expandAll()
      })
      this.visible = true
    },
    parseJson(jsonStr) {
      try {
        this.parsedData = JSON.parse(jsonStr)
        this.isValid = true
      } catch (e) {
        this.isValid = false
        this.parsedData = null
      }
    },
    onRawInput() {
      this.parseJson(this.rawJson)
    },
    syncScroll(e) {
      const lineNumbers = e.target.parentElement.querySelector('.line-numbers')
      if (lineNumbers) {
        lineNumbers.scrollTop = e.target.scrollTop
      }
    },
    // 树形结构更新处理
    onTreeUpdate(event) {
      if (!this.parsedData) return

      if (event.type === 'updateValue') {
        // 更新值
        const pathParts = event.path.replace('root.', '').split(/\.|\[(\d+)\]/).filter(Boolean)
        let current = this.parsedData
        for (let i = 0; i < pathParts.length - 1; i++) {
          const key = isNaN(pathParts[i]) ? pathParts[i] : parseInt(pathParts[i])
          current = current[key]
        }
        const lastKey = isNaN(pathParts[pathParts.length - 1]) ? pathParts[pathParts.length - 1] : parseInt(pathParts[pathParts.length - 1])
        current[lastKey] = event.value
      } else if (event.type === 'renameKey') {
        // 重命名键
        const pathParts = event.path.replace('root.', '').split(/\.|\[(\d+)\]/).filter(Boolean)
        let current = this.parsedData
        for (let i = 0; i < pathParts.length - 1; i++) {
          const key = isNaN(pathParts[i]) ? pathParts[i] : parseInt(pathParts[i])
          current = current[key]
        }
        if (current[event.oldKey] !== undefined) {
          current[event.newKey] = current[event.oldKey]
          delete current[event.oldKey]
        }
      }

      // 同步更新左侧源数据
      this.rawJson = JSON.stringify(this.parsedData, null, 2)
    },
    formatJson() {
      try {
        const parsed = JSON.parse(this.rawJson)
        this.rawJson = JSON.stringify(parsed, null, 2)
        this.parseJson(this.rawJson)
      } catch (e) {
        this.$message.warning('JSON格式错误，无法格式化')
      }
    },
    compressJson() {
      try {
        const parsed = JSON.parse(this.rawJson)
        this.rawJson = JSON.stringify(parsed)
        this.parseJson(this.rawJson)
      } catch (e) {
        this.$message.warning('JSON格式错误，无法压缩')
      }
    },
    copyJson() {
      const textarea = document.createElement('textarea')
      textarea.value = this.rawJson
      document.body.appendChild(textarea)
      textarea.select()
      document.execCommand('copy')
      document.body.removeChild(textarea)
      this.$message.success('已复制到剪贴板')
    },
    saveJson() {
      try {
        // 验证 JSON 格式
        const parsed = JSON.parse(this.rawJson)
        // 触发保存事件，将格式化后的 JSON 返回给父组件
        this.$emit('save', JSON.stringify(parsed, null, 2))
        this.$message.success('JSON 已保存')
        this.visible = false
      } catch (e) {
        this.$message.error('JSON 格式错误，无法保存')
      }
    },
    unescapeJson() {
      try {
        let str = this.rawJson
        while (str.includes('\\"')) {
          str = str.replace(/\\"/g, '"')
        }
        this.rawJson = str
        this.parseJson(this.rawJson)
      } catch (e) {
        this.$message.warning('去除转义失败')
      }
    },
    escapeJson() {
      try {
        const parsed = JSON.parse(this.rawJson)
        this.rawJson = JSON.stringify(parsed).replace(/"/g, '\\"')
        this.parseJson(this.rawJson)
      } catch (e) {
        this.$message.warning('添加转义失败')
      }
    },
    expandAll() {
      this.expandedKeys = { '__all_expanded__': true }
    },
    collapseAll() {
      this.expandedKeys = { '__all_collapsed__': true }
    },
    toggleExpand(key) {
      const newKeys = { ...this.expandedKeys }
      if (newKeys[key]) {
        delete newKeys[key]
      } else {
        newKeys[key] = true
      }
      // 移除全局状态
      delete newKeys['__all_expanded__']
      delete newKeys['__all_collapsed__']
      this.expandedKeys = newKeys
    }
  }
}
</script>

<style scoped>
.json-viewer-wrapper {
  display: flex;
  flex-direction: column;
  height: 500px;
}

.json-toolbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 15px;
  border-bottom: 1px solid #e4e7ed;
  background-color: #f5f7fa;
  flex-shrink: 0;
}

.toolbar-left, .toolbar-right {
  display: flex;
  gap: 6px;
}

.json-viewer-body {
  display: flex;
  flex: 1;
  overflow: hidden;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  margin: 0 15px 10px;
}

.json-panel {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.json-panel-left {
  border-right: 1px solid #dcdfe6;
}

.json-panel-header {
  padding: 6px 12px;
  background-color: #f5f7fa;
  border-bottom: 1px solid #e4e7ed;
  font-size: 13px;
  font-weight: bold;
  color: #606266;
  text-align: center;
  flex-shrink: 0;
}

.json-panel-content {
  flex: 1;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.json-editor-wrapper {
  display: flex;
  flex: 1;
  overflow: hidden;
}

.line-numbers {
  background-color: #fafafa;
  color: #999;
  font-family: 'Consolas', 'Monaco', 'Courier New', monospace;
  font-size: 13px;
  line-height: 1.6;
  text-align: right;
  padding: 8px 6px;
  user-select: none;
  border-right: 1px solid #e8e8e8;
  overflow: hidden;
  flex-shrink: 0;
  min-width: 36px;
}

.line-number {
  min-width: 24px;
  padding-right: 4px;
}

.json-textarea {
  flex: 1;
  background: #fff;
  border: none;
  color: #333;
  font-family: 'Consolas', 'Monaco', 'Courier New', monospace;
  font-size: 13px;
  line-height: 1.6;
  padding: 8px 10px;
  resize: none;
  outline: none;
  overflow: auto;
  white-space: pre;
  overflow-wrap: normal;
}

/* 树形节点样式 */
.json-tree-content {
  font-family: 'Consolas', 'Monaco', 'Courier New', monospace;
  font-size: 13px;
  line-height: 1.8;
  color: #333;
  padding: 8px 10px;
  overflow: auto;
  flex: 1;
  background: #fff;
}

.json-tree-row {
  cursor: default;
  white-space: nowrap;
}

.json-tree-header {
  display: flex;
  align-items: center;
}

.json-toggle {
  cursor: pointer;
  color: #999;
  margin-right: 4px;
  user-select: none;
  display: inline-block;
  width: 14px;
  text-align: center;
  font-size: 11px;
}

.json-toggle:hover {
  color: #409eff;
}

.json-key {
  color: #2196f3;
  font-weight: 500;
}

.json-value {
  margin-left: 2px;
  cursor: text;
  border-bottom: 1px dashed transparent;
  transition: all 0.2s;
  padding: 0 2px;
}

.json-value:hover {
  border-bottom-color: #409eff;
  background-color: rgba(64, 158, 255, 0.1);
}

.json-string {
  color: #e91e63;
}

.json-number {
  color: #4caf50;
}

.json-boolean {
  color: #ff9800;
}

.json-null {
  color: #9e9e9e;
  font-style: italic;
}

.json-bracket {
  color: #333;
  font-weight: bold;
}

.json-bracket-collapsed {
  color: #333;
  font-weight: bold;
  background-color: #f0f0f0;
  padding: 0 4px;
  border-radius: 3px;
  cursor: pointer;
}

.json-bracket-collapsed:hover {
  background-color: #e0e0e0;
}

.json-separator {
  color: #999;
  margin: 0 2px;
}

.json-children {
  border-left: 1px dashed #e0e0e0;
  margin-left: 6px;
  padding-left: 8px;
}

.json-tree-closing {
  margin-top: 2px;
}

.json-parse-error {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: #f56c6c;
  font-size: 14px;
  gap: 10px;
}

.json-parse-error i {
  font-size: 48px;
}

/* 编辑输入框 */
.json-edit-wrapper {
  display: inline-flex;
  align-items: center;
}

.json-edit-input {
  background: #fff;
  border: 1px solid #409eff;
  color: #333;
  font-family: 'Consolas', 'Monaco', 'Courier New', monospace;
  font-size: 13px;
  padding: 1px 4px;
  border-radius: 2px;
  outline: none;
  min-width: 50px;
}

.json-edit-hint {
  color: #999;
  font-size: 11px;
  margin-left: 2px;
}
</style>

<style>
.json-viewer-dialog .el-dialog__body {
  padding: 0;
}

.json-viewer-dialog .el-dialog__header {
  border-bottom: 1px solid #e4e7ed;
  padding: 15px 20px;
}

.json-viewer-dialog .el-dialog__footer {
  border-top: 1px solid #e4e7ed;
  padding: 10px 20px;
}
</style>
