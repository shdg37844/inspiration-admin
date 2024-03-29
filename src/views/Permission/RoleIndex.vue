<script setup>
import { ref } from 'vue';
import roleService from '@/services/role.js';
import { useRouter } from 'vue-router';

const router = useRouter();
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

  } catch (e) {
    console.error(e);
  }
}
fetchRoleInfo();

async function deleteRole(selectedId) {
  const isConfirmed = confirm("确认删除该角色？");

  if (!isConfirmed) {
    return;
  }

  let id = selectedId;
  try {
    const response = await roleService.deleteRole(id);
    if (response.error_code === 0) {
      const index = data.value.findIndex(item => item.id === id)
      data.value.splice(index, 1)

    } else {
      console.error(response.message)
    }
  } catch (e) {
    console.error(e);
  }
}

function handleOpenEditPage(id) {
  router.push(`/permission/role/${id}/edit`)
}

</script>

<template>
  <div class="body-container">
    <div class="body-header">
      <a-button type="primary" class="addRole-btn" @click="$router.push('/permission/role/create')">创建角色</a-button>
    </div>
    <a-table :columns="columns" :data-source="data">
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'action'">
          <span>
            <a @click="handleOpenEditPage(record.id)">查看</a>
            <a-divider type="vertical" />
            <a @click="deleteRole(record.id)">删除</a>
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
  padding-top: 15px;
  padding-right: 20px;
  margin-bottom: 15px;
}
</style>
