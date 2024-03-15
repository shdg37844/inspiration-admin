<script setup>
import { ref } from 'vue'
import userService from '@/services/user.js'
const data = ref([])
const columns = [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: '昵称',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '手机号',
    dataIndex: 'phone',
    key: 'phone',
  },
  {
    title: '角色',
    dataIndex: 'role',
    key: 'role',
  },
  {
    title: '操作',
    key: 'action',
  },
]

async function fetchUserInfo() {
  try {
    const userResponse = await userService.getUsers();
    data.value = userResponse.data.users
    
  } catch(e) {
    console.error(e);
  }
}
fetchUserInfo();

</script>

<template>
    <div class="body-container">
        <a-table :columns="columns" :data-source="data">
            <template #bodyCell="{ column }">
              <template v-if="column.key === 'action'">
                <span>
                  <a>编辑</a>
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

</style>

