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
        <div class="node-list">
          <div
            v-for="node in availableNodes"
            :key="node.nodeCode"
            class="node-item"
            draggable
            @dragstart="handleDragStart($event, node)"
          >
            <div class="node-name">{{ node.nodeName }}</div>
            <div class="node-code">{{ node.nodeCode }}</div>
          </div>
          <div v-if="availableNodes.length === 0" class="empty-tip">
            暂无可用节点<br>请点击"新建节点"
          </div>
        </div>
      </div>
      <!-- 画布区域 -->
      <div ref="graphContainer" class="graph-container" @dragover.prevent @drop="handleDrop" />
    </div>

    <!-- 新建/编辑节点对话框 -->
    <el-dialog :visible.sync="nodeDialogVisible" :title="nodeDialogTitle" width="500px" :close-on-click-modal="false" :append-to-body="true">
      <el-form ref="nodeFormRef" :model="nodeForm" label-width="100px">
        <el-form-item label="节点编码" prop="nodeCode" :rules="[{ required: true, message: '节点编码不能为空' }]">
          <el-input v-model="nodeForm.nodeCode" :disabled="isEditMode" placeholder="请输入节点编码" />
        </el-form-item>
        <el-form-item label="节点名称" prop="nodeName" :rules="[{ required: true, message: '节点名称不能为空' }]">
          <el-input v-model="nodeForm.nodeName" placeholder="请输入节点名称" />
        </el-form-item>
        <el-form-item label="执行类ID" prop="beanId">
          <el-input v-model="nodeForm.beanId" placeholder="请输入执行类ID" />
        </el-form-item>
        <el-form-item label="执行方法" prop="methodName">
          <el-input v-model="nodeForm.methodName" placeholder="请输入执行方法名称" />
        </el-form-item>
        <el-form-item label="执行参数" prop="runParam">
          <el-input v-model="nodeForm.runParam" type="textarea" :rows="2" placeholder="请输入执行参数" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="nodeDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="saveNode">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import G6 from '@antv/g6'

export default {
  name: 'DagDesigner',
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
      nodeForm: {
        nodeCode: '',
        nodeName: '',
        beanId: '',
        methodName: '',
        runParam: ''
      }
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

      // 监听双击节点事件 - 编辑节点
      this.graph.on('node:dblclick', (evt) => {
        const node = evt.item
        const model = node.getModel()
        this.editNode(model)
      })

      // 监听右键删除节点
      this.graph.on('node:contextmenu', (evt) => {
        evt.preventDefault()
        const node = evt.item
        this.$confirm('确定删除该节点及其关联的边吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.graph.removeItem(node)
        }).catch(() => {})
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

      // 监听画布点击取消选中
      this.graph.on('canvas:click', () => {
        this.graph.getNodes().forEach(node => {
          this.graph.setItemState(node, 'selected', false)
        })
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
    // 拖拽添加节点
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
      this.nodeForm = {
        nodeCode: '',
        nodeName: '',
        beanId: '',
        methodName: '',
        runParam: ''
      }
      this.nodeDialogVisible = true
    },
    editNode(model) {
      this.isEditMode = true
      this.editingNodeId = model.id
      this.nodeDialogTitle = '编辑节点'
      this.nodeForm = {
        nodeCode: model.nodeCode || model.id,
        nodeName: model.nodeName || model.label || '',
        beanId: model.beanId || '',
        methodName: model.methodName || '',
        runParam: model.runParam || ''
      }
      this.nodeDialogVisible = true
    },
    saveNode() {
      if (!this.nodeForm.nodeCode) {
        this.$message.error('节点编码不能为空')
        return
      }
      if (!this.nodeForm.nodeName) {
        this.$message.error('节点名称不能为空')
        return
      }

      if (this.isEditMode) {
        // 更新画布中的节点
        const node = this.graph.findById(this.editingNodeId)
        if (node) {
          this.graph.updateItem(node, {
            id: this.nodeForm.nodeCode,
            label: this.nodeForm.nodeName,
            nodeCode: this.nodeForm.nodeCode,
            nodeName: this.nodeForm.nodeName,
            beanId: this.nodeForm.beanId,
            methodName: this.nodeForm.methodName,
            runParam: this.nodeForm.runParam
          })
        }
      } else {
        // 新建节点，添加到画布
        this.addNodeToGraph({
          id: this.nodeForm.nodeCode,
          label: this.nodeForm.nodeName,
          nodeCode: this.nodeForm.nodeCode,
          nodeName: this.nodeForm.nodeName,
          beanId: this.nodeForm.beanId,
          methodName: this.nodeForm.methodName,
          runParam: this.nodeForm.runParam
        })

        // 通知父组件有新增节点
        this.$emit('node-created', { ...this.nodeForm })
      }

      this.nodeDialogVisible = false
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
</style>
