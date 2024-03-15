<script setup>
import { ref } from 'vue';
import roleService from '@/services/role.js';
const data = ref([]);
const columns = [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: '名称',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '操作',
    key: 'action',
  },
];

async function fetchRoleInfo() {
  try {
    const roleResponse = await roleService.getRoleInfo();
    data.value = roleResponse.data.roles
    
  } catch(e) {
    console.error(e);
  }
}
fetchRoleInfo();


</script>

<template>
    <div class="body-container">
      <div class="body-header">
        <a-button type="primary" class="addRole-btn" @click="$router.push('/permission/role/create')">创建角色</a-button>
      </div>
      <a-table :columns="columns" :data-source="data">
        <template #bodyCell="{ column }">
          <template v-if="column.key === 'action'">
            <span>
              <a>查看</a>
              <a-divider type="vertical" />
              <a>删除</a>
              <a-divider type="vertical" />
            </span>
          </template>
        </template>
      </a-table>
    </div>
</template>

<style lang="less" scoped>
.body-header {
  display: flex;
  justify-content: flex-end;
  padding-top:15px;
  padding-right:20px;
  margin-bottom: 15px;
}
</style>
