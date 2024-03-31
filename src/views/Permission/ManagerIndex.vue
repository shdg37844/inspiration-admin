<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router';
import userService from '@/services/user.js'
import roleService from '@/services/role.js';

const router = useRouter();
const data = ref([]);
const showEditForm = ref(false);
const roleValue = ref([]);
const options = ref([]);
const currentUserId = ref(null);
const formState = ref({
  name: '',
  phone: null
});
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

async function fetchRoleInfo() {
  try {
    const roleResponse = await roleService.getRoleInfo();
    options.value = roleResponse.data.roles

  } catch (e) {
    console.error(e);
  }
}
fetchRoleInfo();

async function fetchUserInfo() {
  try {
    const userResponse = await userService.getAllUsers();
    data.value = userResponse.data.usersWithRoles;

  } catch (e) {
    console.error('请求用户信息出错：', e);
  }
}
fetchUserInfo();

async function handleOpenEditForm(id) {
  currentUserId.value = id

  try {
    const response = await userService.showSelectedUser(id)
    showEditForm.value = true
    const userInfoRes = response.data.usersWithRoles

    formState.value.name = userInfoRes.name
    formState.value.phone = userInfoRes.phone
    roleValue.value = userInfoRes.roles.map(role => role.id);

  } catch (e) {
    console.error(e);
  }
}

async function handleDeleteUser(id) {
  const isConfirmed = confirm("确认删除该用户？");

  if (!isConfirmed) {
    return;
  }

  try {
    const response = await userService.deleteUserRoles(id)

    if (response.error_code === 0) {
      const index = data.value.findIndex(item => item.id === id)
      data.value.splice(index, 1)
    }
  } catch (e) {
    console.error(e);
  }
}

async function handleSaveEditUser() {
  const id = currentUserId.value;

  const name = formState.value.name;
  const phone = formState.value.phone;
  const roles = roleValue.value;

  try {
    const response = await userService.updateSelectedUser(id, name, phone, roles)
    if (response.error_code === 0) {
      alert("修改成功");
      showEditForm.value = false;

      const updatedRole = roles.map(roleId => {
        const role = options.value.find(option => option.id === roleId)
        return role ? { id: role.id, name: role.name } : undefined;
      })

      //console.log('updatedRole', updatedRole)

      const index = data.value.findIndex(item => item.id === id)
      data.value[index].name = name;
      data.value[index].phone = phone;
      data.value[index].roles = updatedRole;
    }

  } catch (e) {
    console.error(e);
  }
}

</script>

<template>
  <div class="body-container">
    <div class="body-header">
      <a-button type="primary" class="addRole-btn" @click="$router.push('/permission/manager/create')">创建管理员</a-button>
    </div>
    <a-table :columns="columns" :data-source="data">
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'role'">
          <span>
            <a-tag v-for="roleName in record.role" :key="roleName" color="blue">
              {{ roleName.toUpperCase() }}
            </a-tag>
          </span>
        </template>
        <template v-if="column.key === 'action'">
          <span>
            <a @click="handleOpenEditForm(record.id)">编辑</a>
            <a-divider type="vertical" />
            <a @click="handleDeleteUser(record.id)">删除</a>
            <a-divider type="vertical" />
          </span>
        </template>
      </template>
    </a-table>
  </div>

  <div class="edit-mask" v-if="showEditForm">
    <div class="edit-content">
      <div class="edit-header">
        <span class="header-text">编辑管理员</span>
      </div>

      <div class="edit-form">
        <a-form :model="formState" name="basic" :label-col="{ span: 2 }" :wrapper-col="{ span: 6 }" autocomplete="off">
          <a-form-item label="昵称" name="name" :rules="[{ required: true, message: '请输入昵称!' }]">
            <a-input v-model:value="formState.name" />
          </a-form-item>
          <a-form-item label="手机号" name="phone" :rules="[{ required: true, message: '请输入手机号!' }]">
            <a-input v-model:value="formState.phone" />
          </a-form-item>
        </a-form>
        <el-form-item class="select-box" label="角色">
          <el-select v-model="roleValue" multiple placeholder="请选择角色" style="width: 240px">
            <el-option v-for="item in options" :key="item.id" :label="item.name" :value="item.id" />
          </el-select>
        </el-form-item>
      </div>

      <div class="edit-btns">
        <a-button class="cancel-btn" @click="showEditForm = false">取消</a-button>
        <a-button class="create-btn" type="primary" @click="handleSaveEditUser()">确定</a-button>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
@import "@/assets/css/ManagerIndex.css";
</style>
