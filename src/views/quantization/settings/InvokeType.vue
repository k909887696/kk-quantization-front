<template>
  <div class="app-container">
    <div class="filter-container">
      <el-form :inline="true" label-width="110px" label-position="right">
        <el-row>
          <el-form-item label="调用类型名称:">
            <el-input v-model="listQuery.name" placeholder="调用类型名称" style="width: 200px;" class="filter-item" />
          </el-form-item>
          <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="getList">
            查询
          </el-button>
          <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit">
            添加
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
    >
      <el-table-column align="center" label="调度类型编号(注入bean id)" width="250">
        <template slot-scope="scope">
          {{ scope.row.invokeCode }}
        </template>
      </el-table-column>
      <el-table-column label="调度类型名称" width="200">
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>
      <el-table-column label="调度类型对象" width="250" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.invokeObject }}</span>
        </template>
      </el-table-column>
      <el-table-column label="调度类型方法" width="150" align="center">
        <template slot-scope="scope">
          {{ scope.row.invokeMethod }}
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="调用参数（示例）" align="center">
        <template slot-scope="scope">
          {{ scope.row.invokeParams }}
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="创建时间" width="200">
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span>{{ scope.row.createTime }}</span>
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="total>0" :total="total" :page.sync="listQuery.pageIndex" :limit.sync="listQuery.pageSize" @pagination="getList" />
  </div>
</template>

<script>
import { get_invoke_type_page_result } from '@/api/quantization/settings'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
import waves from '@/directive/waves' // waves directive

export default {
  components: { Pagination },
  directives: { waves },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'gray',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      list: null,
      total: 0,
      listQuery: {
        name: undefined,
        pageIndex: 1,
        pageSize: 10
      },
      listLoading: true
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      get_invoke_type_page_result(this.listQuery).then(response => {
        this.list = response.data.result
        this.total = response.data.totalCount
        // this.listQuery.pageIndex = response.data.pageIndex
        // this.listLoading = false
      })
    }
  }
}
</script>
