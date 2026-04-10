<template>
  <div class="user-container">
    <h2>用户管理</h2>
    <div class="toolbar">
      <button>新建用户</button>
      <input type="text" placeholder="搜索用户..." />
    </div>
    <table class="user-table">
      <thead>
        <tr>
          <th>姓名</th>
          <th>邮箱</th>
          <th>角色</th>
          <th>状态</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>张三</td>
          <td>zhang@example.com</td>
          <td>管理员</td>
          <td>激活</td>
          <td>
            <button>编辑</button>
            <button>删除</button>
          </td>
        </tr>
        <tr>
          <td>李四</td>
          <td>li@example.com</td>
          <td>普通用户</td>
          <td>激活</td>
          <td>
            <button>编辑</button>
            <button>删除</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
</script>

<style scoped>
.user-container {
  padding: 24px;
}

.toolbar {
  display: flex;
  gap: 12px;
  margin-bottom: 24px;
}

.user-table {
  width: 100%;
  border-collapse: collapse;
}

.user-table th,
.user-table td {
  border: 1px solid #ddd;
  padding: 12px;
  text-align: left;
}

.user-table th {
  background: #f5f5f5;
}
</style>