<template>
  <div class="app-container">
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column align="center" label="InvokeId" width="250">
        <template slot-scope="scope">
          {{ scope.row.InvokeId }}
        </template>
      </el-table-column>
      <el-table-column label="Name" width="200">
        <template slot-scope="scope">
          {{ scope.row.Name }}
        </template>
      </el-table-column>
      <el-table-column label="InvokeObject" width="250" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.InvokeObject }}</span>
        </template>
      </el-table-column>
      <el-table-column label="InvokeMethod" width="150" align="center">
        <template slot-scope="scope">
          {{ scope.row.InvokeMethod }}
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="InvokeParams" align="center">
        <template slot-scope="scope">
          {{ scope.row.InvokeParams }}
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="Createtime" width="200">
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span>{{ scope.row.Createtime }}</span>
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />
  </div>
</template>

<script>
import { queryAllInvokeType } from '@/api/quantization/settings'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination

export default {
  components: { Pagination },
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
      total: null,
      listQuery: {
        page: 1,
        limit: 20
      },
      listLoading: true
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      queryAllInvokeType().then(response => {
        this.list = response.data
        this.total = response.data.length
        this.listLoading = false
      })
    }
  }
}
</script>
