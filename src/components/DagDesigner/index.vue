<template>
  <div class="dag-designer">
    <!-- 顶部工具栏 -->
    <div class="toolbar">
      <el-button-group>
        <el-button size="mini" type="primary" icon="el-icon-s-grid" @click="autoLayout">自动布局</el-button>
        <el-button size="mini" icon="el-icon-delete" @click="clearCanvas">清空画布</el-button>
        <el-button size="mini" icon="el-icon-full-screen" @click="fitView">适应视图</el-button>
        <el-button size="mini" icon="el-icon-zoom-in" @click="zoomIn">放大</el-button>
        <el-button size="mini" icon="el-icon-zoom-out" @click="zoomOut">缩小</el-button>
      </el-button-group>
      <span class="toolbar-tip">拖拽左侧节点到画布；点击两个节点连线</span>
    </div>
    <div class="content">
      <!-- 左侧节点面板 -->
      <div class="node-panel">
        <div class="panel-header">
          <span>节点列表</span>
          <el-button size="mini" type="primary" plain @click="showAddNodeDialog">+ 新建节点</el-button>
        </div>
        <div class="node-search">
          <el-input v-model="nodeSearchQuery" size="mini" prefix-icon="el-icon-search" placeholder="搜索节点名称" clearable />
        </div>
        <div class="node-list">
          <div
            v-for="node in filteredNodes"
            :key="node.nodeCode"
            class="node-item"
            draggable
            @dragstart="handleDragStart($event, node)"
          >
            <div class="node-name">{{ node.nodeName }}</div>
            <div class="node-code">{{ node.nodeCode }}</div>
          </div>
          <div v-if="filteredNodes.length === 0" class="empty-tip">
            暂无可用节点<br>请点击"新建节点"
          </div>
        </div>
      </div>
      <!-- 画布区域 -->
      <div ref="graphContainer" class="graph-container" @dragover.prevent @drop="handleDrop" />
      <!-- 节点右键下拉菜单 -->
      <div
        v-show="contextMenuVisible"
        class="node-context-menu"
        :style="{ left: contextMenuPosition.x + 'px', top: contextMenuPosition.y + 'px' }"
      >
        <div class="context-menu-item" @click="handleMenuEdit">
          <i class="el-icon-edit" /> 编辑
        </div>
        <div class="context-menu-item context-menu-item--danger" @click="handleMenuDelete">
          <i class="el-icon-delete" /> 删除
        </div>
      </div>
    </div>

    <!-- 新建/编辑节点对话框 -->
    <el-dialog :visible.sync="nodeDialogVisible" :title="nodeDialogTitle" width="800px" :close-on-click-modal="false" :append-to-body="true">
      <el-form ref="nodeFormRef" :model="nodeForm" label-width="120px">
        <!-- 新建节点模式：SyDagNode字段 -->
        <template v-if="!isEditMode">
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="节点编码" prop="nodeCode">
                <el-input v-model="nodeForm.nodeCode" placeholder="请输入节点编码" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="节点名称" prop="nodeName">
                <el-input v-model="nodeForm.nodeName" placeholder="请输入节点名称" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="执行类ID" prop="beanId">
                <el-input v-model="nodeForm.beanId" placeholder="请输入执行类ID" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="执行方法" prop="methodName">
                <el-input v-model="nodeForm.methodName" placeholder="请输入执行方法名称" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="24">
              <el-form-item label="执行参数" prop="runParam">
                <div class="run-param-wrapper">
                  <el-input v-model="nodeForm.runParam" type="textarea" :rows="6" placeholder="执行参数JSON" />
                  <el-button type="text" size="mini" icon="el-icon-view" @click="openJsonViewer">查看JSON</el-button>
                </div>
              </el-form-item>
            </el-col>
          </el-row>
        </template>
        <!-- 编辑节点模式：DAG流程参数 -->
        <template v-else>
          <!-- 第一行：DAG流程明细ID + DAG主表ID -->
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="DAG流程明细ID" prop="dagFlowId">
                <el-input v-model="nodeForm.dagFlowId" disabled placeholder="DAG流程明细ID" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="DAG主表ID" prop="dagId">
                <el-input v-model="nodeForm.dagId" disabled placeholder="DAG主表ID" />
              </el-form-item>
            </el-col>
          </el-row>
          <!-- 第二行：节点编码 + 节点名称 -->
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="节点编码" prop="nodeCode">
                <el-input v-model="nodeForm.nodeCode" disabled placeholder="节点编码" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="节点名称" prop="nodeName">
                <el-input v-model="nodeForm.nodeName" disabled placeholder="节点名称" />
              </el-form-item>
            </el-col>
          </el-row>
          <!-- 第三行：上级节点 + 下级节点 -->
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="上级节点" prop="preNodeCode">
                <el-input :value="getNodeDisplayName(nodeForm.preNodeCode)" disabled placeholder="无" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="下级节点" prop="nextNodeCode">
                <el-input :value="getNodeDisplayName(nodeForm.nextNodeCode)" disabled placeholder="无" />
              </el-form-item>
            </el-col>
          </el-row>
          <!-- 执行参数 + 分页参数 -->
          <el-row :gutter="20">
            <el-col :span="13">
              <el-form-item label="执行参数" prop="runParam">
                <div class="run-param-wrapper">
                  <el-input v-model="nodeForm.runParam" type="textarea" :rows="8" placeholder="执行参数JSON" />
                  <el-button type="text" size="mini" icon="el-icon-view" @click="openJsonViewer">查看JSON</el-button>
                </div>
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="分页索引" prop="pageIndex">
                <el-input-number v-model="nodeForm.pageIndex" :min="0" placeholder="请输入分页索引" style="width: 100%;" @change="syncPageParamsToJson" />
              </el-form-item>
              <el-form-item label="分页大小" prop="pageSize">
                <el-input-number v-model="nodeForm.pageSize" :min="1" placeholder="请输入分页大小" style="width: 100%;" @change="syncPageParamsToJson" />
              </el-form-item>
            </el-col>
          </el-row>
        </template>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="nodeDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="saveNode">确定</el-button>
      </div>
    </el-dialog>
    <!-- JSON查看器 -->
    <json-viewer ref="jsonViewer" @save="onJsonSave" />
  </div>
</template>

<script>
import G6 from '@antv/g6'
import JsonViewer from '@/components/JsonViewer'
import { insertSyDagNode } from '@/api/quantization/SyDagNodeApi'

export default {
  name: 'DagDesigner',
  components: { JsonViewer },
  props: {
    dagId: { type: String, default: '' },
    initialNodes: { type: Array, default: () => [] },
    initialEdges: { type: Array, default: () => [] },
    availableNodes: { type: Array, default: () => [] }
  },
  data() {
    return {
      graph: null,
      initializing: false,
      nodeDialogVisible: false,
      nodeDialogTitle: '新建节点',
      isEditMode: false,
      editingNodeId: null,
      nodeSearchQuery: '',
      contextMenuVisible: false,
      contextMenuPosition: { x: 0, y: 0 },
      contextMenuNodeModel: null,
      selectedNodeCode: '',
      nodeForm: {
        dagFlowId: '',
        dagId: '',
        nodeCode: '',
        nodeName: '',
        preNodeCode: '',
        nextNodeCode: '',
        runParam: '',
        pageIndex: 0,
        pageSize: 100
      }
    }
  },
  computed: {
    filteredNodes() {
      if (!this.nodeSearchQuery) {
        return this.availableNodes
      }
      const query = this.nodeSearchQuery.toLowerCase()
      return this.availableNodes.filter(node =>
        node.nodeName && node.nodeName.toLowerCase().includes(query)
      )
    },
    // 节点编码到节点名称的映射缓存
    nodeNameMap() {
      const map = {}
      this.availableNodes.forEach(node => {
        map[node.nodeCode] = node.nodeName
      })
      return map
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.initWhenVisible()
    })
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.handleResize)
    if (this.graph) {
      this.graph.destroy()
      this.graph = null
    }
  },
  methods: {
    initWhenVisible() {
      if (this.initializing || this.graph) return
      this.initializing = true
      // 轮询检查容器是否可见，可见后再初始化G6
      const check = () => {
        if (this._isDestroyed) return
        const container = this.$refs.graphContainer
        if (!container) {
          setTimeout(check, 100)
          return
        }
        if (container.offsetWidth > 0 && container.offsetHeight > 0) {
          this.initGraph()
        } else {
          setTimeout(check, 100)
        }
      }
      check()
    },
    initGraph() {
      const container = this.$refs.graphContainer
      if (!container) return

      const width = container.clientWidth || 800
      const height = container.clientHeight || 500

      this.graph = new G6.Graph({
        container,
        width,
        height,
        fitView: false,
        fitCenter: true,
        modes: {
          default: [
            'drag-canvas',
            'zoom-canvas',
            'drag-node',
            { type: 'create-edge', trigger: 'click' }
          ]
        },
        defaultNode: {
          type: 'rect',
          size: [140, 50],
          style: {
            fill: '#e6f7ff',
            stroke: '#1890ff',
            lineWidth: 2,
            radius: 6,
            cursor: 'move'
          },
          labelCfg: {
            style: {
              fill: '#333',
              fontSize: 13,
              fontWeight: 500
            }
          },
          anchorPoints: [
            [0.5, 0],
            [0.5, 1],
            [0, 0.5],
            [1, 0.5]
          ]
        },
        defaultEdge: {
          type: 'cubic-vertical',
          style: {
            stroke: '#999',
            lineWidth: 2,
            endArrow: {
              path: G6.Arrow.triangle(8, 10, 0),
              fill: '#999'
            }
          }
        },
        nodeStateStyles: {
          selected: {
            stroke: '#ff4d4f',
            lineWidth: 3
          }
        }
      })

      // 窗口大小变化时自适应
      window.addEventListener('resize', this.handleResize)

      // 加载初始数据
      this.loadInitialData()

      // 监听右键菜单 - 节点操作
      this.graph.on('node:contextmenu', (evt) => {
        evt.preventDefault()
        const node = evt.item
        const model = node.getModel()
        const { clientX, clientY } = evt.originalEvent || evt
        this.showContextMenu(clientX, clientY, model)
      })

      // 监听右键删除边
      this.graph.on('edge:contextmenu', (evt) => {
        evt.preventDefault()
        const edge = evt.item
        this.$confirm('确定删除该连线吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.graph.removeItem(edge)
        }).catch(() => {})
      })

      // 监听画布点击取消选中并关闭右键菜单
      this.graph.on('canvas:click', () => {
        this.graph.getNodes().forEach(node => {
          this.graph.setItemState(node, 'selected', false)
        })
        this.hideContextMenu()
      })
    },
    handleResize() {
      if (!this.graph || this.graph.get('destroyed')) return
      const container = this.$refs.graphContainer
      if (container) {
        this.graph.changeSize(container.clientWidth, container.clientHeight)
      }
    },
    loadInitialData() {
      if (!this.graph) return

      const nodes = this.initialNodes.map(n => ({
        id: n.nodeCode || n.id,
        label: n.nodeName || n.label || n.nodeCode || n.id,
        nodeCode: n.nodeCode || n.id,
        nodeName: n.nodeName || n.label,
        dagFlowId: n.dagFlowId || '',
        beanId: n.beanId || '',
        methodName: n.methodName || '',
        runParam: n.runParam || '',
        x: n.x,
        y: n.y
      }))

      const edges = this.initialEdges.map(e => ({
        source: e.nodeCode || e.source,
        target: e.nextNodeCode || e.target,
        ...e
      }))

      this.graph.data({ nodes, edges: edges || [] })
      this.graph.render()

      // 如果节点没有位置信息，才进行自动布局
      const hasPosition = nodes.length > 0 && nodes.every(n => n.x !== undefined && n.y !== undefined)
      if (!hasPosition && nodes.length > 0) {
        this.$nextTick(() => {
          this.autoLayout()
        })
      }
    },
    autoLayout() {
      if (!this.graph || this.graph.get('destroyed')) return
      try {
        this.graph.layout({
          type: 'dagre',
          rankdir: 'TB',
          align: 'UL',
          nodesep: 80,
          ranksep: 100,
          controlPoints: true
        })
        this.$nextTick(() => {
          this.graph.fitView(20)
        })
      } catch (e) {
        console.warn('自动布局失败:', e)
      }
    },
    fitView() {
      if (this.graph && !this.graph.get('destroyed')) {
        this.graph.fitView(20)
      }
    },
    zoomIn() {
      if (this.graph && !this.graph.get('destroyed')) {
        const zoom = this.graph.getZoom()
        this.graph.zoomTo(zoom * 1.2)
      }
    },
    zoomOut() {
      if (this.graph && !this.graph.get('destroyed')) {
        const zoom = this.graph.getZoom()
        this.graph.zoomTo(zoom * 0.8)
      }
    },
    clearCanvas() {
      if (!this.graph || this.graph.get('destroyed')) return
      this.$confirm('确定清空画布吗？此操作不可恢复。', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.graph.clear()
      }).catch(() => {})
    },
    // 获取节点显示名称（节点名称(节点编码)）
    getNodeDisplayName(nodeCode) {
      if (!nodeCode) return ''
      const nodeName = this.nodeNameMap[nodeCode]
      if (nodeName) {
        return `${nodeName}（${nodeCode}）`
      }
      return nodeCode
    },
    // 打开JSON查看器
    openJsonViewer() {
      this.$refs.jsonViewer.show(this.nodeForm.runParam, '执行参数')
    },
    // JSON查看器保存回调
    onJsonSave(jsonString) {
      this.nodeForm.runParam = jsonString
      this.$message.success('执行参数已更新')
    },
    // 同步分页参数到JSON
    syncPageParamsToJson() {
      try {
        let params = {}
        if (this.nodeForm.runParam && this.nodeForm.runParam.trim()) {
          try {
            const parsed = JSON.parse(this.nodeForm.runParam)
            if (parsed && typeof parsed === 'object' && !Array.isArray(parsed)) {
              params = parsed
            }
          } catch (e) {
            // runParam 不是有效 JSON 对象，保留原样不处理
            return
          }
        }
        params.pageIndex = this.nodeForm.pageIndex
        params.pageSize = this.nodeForm.pageSize
        this.nodeForm.runParam = JSON.stringify(params, null, 2)
      } catch (e) {
        console.warn('同步分页参数到JSON失败:', e)
      }
    },
    getPreNodeCode(nodeId) {
      if (!this.graph) return ''
      const edges = this.graph.getEdges()
      for (const edge of edges) {
        const model = edge.getModel()
        if (model.target === nodeId) {
          return model.source
        }
      }
      return ''
    },
    // 获取节点的下级节点编码
    getNextNodeCode(nodeId) {
      if (!this.graph) return ''
      const edges = this.graph.getEdges()
      for (const edge of edges) {
        const model = edge.getModel()
        if (model.source === nodeId) {
          return model.target
        }
      }
      return ''
    },
    // 显示节点右键下拉菜单
    showContextMenu(x, y, model) {
      this.contextMenuNodeModel = model
      this.contextMenuPosition = { x, y }
      this.contextMenuVisible = true
      // 点击其他地方关闭菜单
      this.$nextTick(() => {
        const closeHandler = (e) => {
          if (!e.target.closest('.node-context-menu')) {
            this.hideContextMenu()
            document.removeEventListener('click', closeHandler)
          }
        }
        setTimeout(() => {
          document.addEventListener('click', closeHandler)
        }, 0)
      })
    },
    // 隐藏右键下拉菜单
    hideContextMenu() {
      this.contextMenuVisible = false
      this.contextMenuNodeModel = null
    },
    // 处理菜单编辑
    handleMenuEdit() {
      if (this.contextMenuNodeModel) {
        this.editNode(this.contextMenuNodeModel)
      }
      this.hideContextMenu()
    },
    // 处理菜单删除
    handleMenuDelete() {
      if (this.contextMenuNodeModel) {
        const node = this.graph.findById(this.contextMenuNodeModel.id)
        if (node) {
          this.$confirm('确定删除该节点及其关联的边吗？', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.graph.removeItem(node)
          }).catch(() => {})
        }
      }
      this.hideContextMenu()
    },
    handleDragStart(e, node) {
      e.dataTransfer.setData('node', JSON.stringify(node))
    },
    handleDrop(e) {
      e.preventDefault()
      const data = e.dataTransfer.getData('node')
      if (!data) return
      try {
        const node = JSON.parse(data)
        const rect = this.$refs.graphContainer.getBoundingClientRect()
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top

        this.addNodeToGraph({
          id: node.nodeCode,
          label: node.nodeName,
          nodeCode: node.nodeCode,
          nodeName: node.nodeName,
          beanId: node.beanId || '',
          methodName: node.methodName || '',
          runParam: node.runParam || '',
          x,
          y
        })
      } catch (err) {
        console.error('拖拽添加节点失败:', err)
      }
    },
    addNodeToGraph(nodeData) {
      if (!this.graph || this.graph.get('destroyed')) return
      const existNode = this.graph.findById(nodeData.id)
      if (existNode) {
        this.$message.warning('节点已存在于画布中')
        return
      }
      this.graph.addItem('node', nodeData)
    },
    // 新建/编辑节点对话框
    showAddNodeDialog() {
      this.isEditMode = false
      this.nodeDialogTitle = '新建节点'
      this.selectedNodeCode = ''
      this.nodeForm = {
        dagFlowId: '',
        dagId: this.dagId || '',
        nodeCode: '',
        nodeName: '',
        beanId: '',
        methodName: '',
        preNodeCode: '',
        nextNodeCode: '',
        runParam: '',
        pageIndex: 0,
        pageSize: 100
      }
      this.nodeDialogVisible = true
    },
    // 选择节点后自动填充节点信息
    onSelectNodeForAdd(nodeCode) {
      if (!nodeCode) return
      const node = this.availableNodes.find(n => n.nodeCode === nodeCode)
      if (node) {
        this.nodeForm.nodeCode = node.nodeCode
        this.nodeForm.nodeName = node.nodeName
        this.nodeForm.runParam = node.runParam || ''
      }
    },
    editNode(model) {
      this.isEditMode = true
      this.editingNodeId = model.id
      this.nodeDialogTitle = '编辑节点流程参数'
      // 从 graph 中获取当前节点的上下级关系
      const preNodeCode = this.getPreNodeCode(model.id)
      const nextNodeCode = this.getNextNodeCode(model.id)
      // 从 runParam 中解析 pageIndex 和 pageSize
      let pageIndex = 0
      let pageSize = 100
      try {
        const params = JSON.parse(model.runParam || '{}')
        if (params.pageIndex !== undefined) pageIndex = params.pageIndex
        if (params.pageSize !== undefined) pageSize = params.pageSize
      } catch (e) {
        // JSON 解析失败时使用默认值
      }
      this.nodeForm = {
        dagFlowId: model.dagFlowId || '',
        dagId: this.dagId || '',
        nodeCode: model.nodeCode || model.id,
        nodeName: model.nodeName || model.label || '',
        preNodeCode: preNodeCode || '',
        nextNodeCode: nextNodeCode || '',
        runParam: model.runParam || '',
        pageIndex: pageIndex,
        pageSize: pageSize
      }
      this.nodeDialogVisible = true
    },
    async saveNode() {
      if (!this.nodeForm.nodeCode) {
        this.$message.error('节点编码不能为空')
        return
      }
      if (!this.nodeForm.nodeName) {
        this.$message.error('节点名称不能为空')
        return
      }

      if (this.isEditMode) {
        // 编辑模式：更新画布中的节点
        const node = this.graph.findById(this.editingNodeId)
        if (node) {
          this.graph.updateItem(node, {
            runParam: this.nodeForm.runParam
          })
        }
        this.nodeDialogVisible = false
      } else {
        // 新建模式：调用API创建SyDagNode节点
        const saveData = {
          nodeCode: this.nodeForm.nodeCode,
          nodeName: this.nodeForm.nodeName,
          beanId: this.nodeForm.beanId || '',
          methodName: this.nodeForm.methodName || '',
          runParam: this.nodeForm.runParam || ''
        }
        try {
          await insertSyDagNode(saveData)
          this.$message.success('节点创建成功')
          this.$emit('node-created', { ...saveData })
          this.nodeDialogVisible = false
        } catch (err) {
          this.$message.error('节点创建失败：' + (err.message || err))
        }
      }
    },
    // 获取当前DAG数据，供父组件保存
    getGraphData() {
      if (!this.graph || this.graph.get('destroyed')) {
        return { nodes: [], edges: [] }
      }

      const nodes = []
      const edges = []

      this.graph.getNodes().forEach(node => {
        const model = node.getModel()
        nodes.push({
          nodeCode: model.nodeCode || model.id,
          nodeName: model.nodeName || model.label,
          dagFlowId: model.dagFlowId || '',
          beanId: model.beanId || '',
          methodName: model.methodName || '',
          runParam: model.runParam || '',
          x: model.x,
          y: model.y
        })
      })

      this.graph.getEdges().forEach(edge => {
        const model = edge.getModel()
        edges.push({
          source: model.source,
          target: model.target
        })
      })

      const canvasSize = { width: this.graph.get('width'), height: this.graph.get('height') }

      return { nodes, edges, canvasSize }
    }
  }
}
</script>

<style scoped>
.dag-designer {
  display: flex;
  flex-direction: column;
  flex: 1;
  min-height: 400px;
}
.toolbar {
  padding: 10px 15px;
  border-bottom: 1px solid #e8e8e8;
  background: #fafafa;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.toolbar-tip {
  font-size: 12px;
  color: #999;
}
.content {
  display: flex;
  flex: 1;
  overflow: hidden;
  height: 100%;
}
.node-panel {
  width: 220px;
  border-right: 1px solid #e8e8e8;
  display: flex;
  flex-direction: column;
  background: #fff;
  overflow: hidden;
  flex-shrink: 0;
}
.panel-header {
  padding: 12px 10px;
  border-bottom: 1px solid #e8e8e8;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: bold;
  font-size: 14px;
}
.node-search {
  padding: 10px;
  border-bottom: 1px solid #e8e8e8;
}
.node-search .el-input__inner {
  border-radius: 4px;
}
.node-list {
  flex: 1;
  overflow-y: auto;
  padding: 10px;
  min-height: 0;
  max-height: calc(100vh - 380px);
}
.node-item {
  padding: 10px;
  margin-bottom: 10px;
  background: #f5f5f5;
  border: 1px solid #e8e8e8;
  border-radius: 6px;
  cursor: grab;
  transition: all 0.2s;
}
.node-item:hover {
  background: #e6f7ff;
  border-color: #1890ff;
  transform: translateY(-2px);
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}
.node-name {
  font-size: 13px;
  font-weight: 500;
  color: #333;
  margin-bottom: 4px;
}
.node-code {
  font-size: 11px;
  color: #999;
}
.empty-tip {
  text-align: center;
  padding: 20px;
  color: #999;
  font-size: 12px;
}
.graph-container {
  flex: 1;
  overflow: hidden;
  position: relative;
  background: #f8f9fa;
}
/* 节点右键下拉菜单 */
.node-context-menu {
  position: fixed;
  z-index: 2000;
  min-width: 120px;
  background: #fff;
  border: 1px solid #ebeef5;
  border-radius: 4px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  padding: 5px 0;
}
.context-menu-item {
  padding: 8px 16px;
  font-size: 14px;
  color: #606266;
  cursor: pointer;
  transition: background-color 0.2s;
  display: flex;
  align-items: center;
  gap: 6px;
}
.context-menu-item:hover {
  background-color: #f5f7fa;
  color: #409eff;
}
.context-menu-item--danger:hover {
  color: #f56c6c;
}
</style>
